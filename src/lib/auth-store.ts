type Listener = () => void

let accessToken: string | null = null
const listeners = new Set<Listener>()

export function getAccessToken() {
  return accessToken
}

export function setAccessToken(token: string | null) {
  accessToken = token
  listeners.forEach((listener) => listener())
}

export function clearAccessToken() {
  setAccessToken(null)
}

export function subscribeToAuth(listener: Listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}
