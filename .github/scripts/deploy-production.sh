#!/usr/bin/env bash
set -euo pipefail

: "${DEPLOY_HOST:?DEPLOY_HOST is required}"
: "${DEPLOY_PORT:?DEPLOY_PORT is required}"
: "${DEPLOY_USER:?DEPLOY_USER is required}"
: "${GITHUB_SHA:?GITHUB_SHA is required}"

APP_DIR="${1:?app directory is required}"
SERVICE="${2:?service is required}"
HEALTH_HOST="${3:?health host is required}"
ROOT="${DEPLOY_ROOT:-/home/ubuntu/apps/oportunidades}"
ARCHIVE="$(mktemp)"
REMOTE_ARCHIVE="/tmp/oportunidades-${SERVICE}-${GITHUB_SHA}.tar.gz"
trap 'rm -f "$ARCHIVE"' EXIT

git archive --format=tar.gz --output="$ARCHIVE" HEAD
scp -q -P "$DEPLOY_PORT" "$ARCHIVE" "$DEPLOY_USER@$DEPLOY_HOST:$REMOTE_ARCHIVE"

ssh -p "$DEPLOY_PORT" "$DEPLOY_USER@$DEPLOY_HOST" bash -s -- "$ROOT" "$APP_DIR" "$SERVICE" "$HEALTH_HOST" "$GITHUB_SHA" "$REMOTE_ARCHIVE" <<'REMOTE'
set -euo pipefail

root="$1"
app_dir="$2"
service="$3"
health_host="$4"
revision="$5"
archive="$6"
app="$root/$app_dir"
stage="$app.next-$revision"
previous="$app.previous"

compose() {
	timeout 900 docker compose --project-directory "$root" --env-file "$root/.env.production" -f "$root/compose.production.yml" -f "$root/oportunidades-docker.override.yml" "$@"
}

start_service() {
	compose build "$service" || return 1
	if [ "$service" = "api" ]; then
		compose run --rm migrate || return 1
	fi
	compose up -d --no-deps "$service"
}

restore_service() {
	compose build "$service" || return 1
	compose up -d --no-deps "$service"
}

healthy() {
	local path="/"
	if [ "$service" = "api" ]; then
		path="/health"
	fi
	for _ in $(seq 1 30); do
		if curl --fail --silent --show-error -H "Host: $health_host" "http://127.0.0.1:8081$path" >/dev/null; then
			return 0
		fi
		sleep 2
	done
	return 1
}

exec 9>"$root/.deploy.lock"
flock -w 900 9
cleanup() {
	rm -rf "$stage"
	rm -f "$archive"
	if [ ! -e "$app" ] && [ -e "$previous" ]; then
		mv "$previous" "$app"
	fi
}
trap cleanup EXIT HUP INT TERM

for required in "$root/.env.production" "$root/compose.production.yml" "$root/oportunidades-docker.override.yml"; do
	test -f "$required" || { echo "Missing production file: $required" >&2; exit 1; }
done
compose config --services | grep -Fxq "$service" || { echo "Unknown production service: $service" >&2; exit 1; }

if [ -e "$previous" ]; then
	if [ ! -e "$app" ]; then
		mv "$previous" "$app"
	elif healthy; then
		rm -rf "$previous"
	else
		rm -rf "$app"
		mv "$previous" "$app"
		restore_service
		healthy || { echo "Previous $service release is unhealthy." >&2; exit 1; }
	fi
fi

test -e "$app" || { echo "Missing application directory: $app" >&2; exit 1; }
rm -rf "$stage"
mkdir -p "$stage"
tar -xzf "$archive" -C "$stage"
printf '%s\n' "$revision" > "$stage/REVISION"

if [ "$service" = "api" ]; then
	compose run --rm -e BACKUP_ONCE=1 backup
fi

mv "$app" "$previous"
mv "$stage" "$app"

if ! start_service || ! healthy; then
	echo "Deployment failed; restoring the previous $service source." >&2
	rm -rf "$app"
	mv "$previous" "$app"
	restore_service || true
	healthy || true
	exit 1
fi

rm -rf "$previous"
compose ps "$service"
echo "Deployed $service at $revision"
REMOTE
