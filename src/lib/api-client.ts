import { clearAccessToken, getAccessToken, setAccessToken } from '@/lib/auth-store'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080'

interface ApiEnvelope<T> {
  data: T
}

interface ApiErrorEnvelope {
  error: {
    code: string
    message: string
    details?: Record<string, unknown>
  }
}

export class ApiError extends Error {
  code: string
  details?: Record<string, unknown>

  constructor(code: string, message: string, details?: Record<string, unknown>) {
    super(message)
    this.code = code
    this.details = details
  }
}

export function apiUrl(path: string) {
  return `${API_URL}${path}`
}

async function refreshAccessToken() {
  const response = await fetch(apiUrl('/v1/auth/refresh'), {
    method: 'POST',
    credentials: 'include',
  })

  if (!response.ok) {
    clearAccessToken()
    throw new ApiError('UNAUTHORIZED', 'Sessão expirada.')
  }

  const body = (await response.json()) as ApiEnvelope<{ access_token: string }>
  setAccessToken(body.data.access_token)
  return body.data.access_token
}

export async function apiRequest<T>(path: string, init?: RequestInit, retry = true): Promise<T> {
  const token = getAccessToken()
  const response = await fetch(apiUrl(path), {
    ...init,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init?.headers,
    },
  })

  if (response.status === 401 && retry && path !== '/v1/auth/login' && path !== '/v1/auth/refresh') {
    await refreshAccessToken()
    return apiRequest<T>(path, init, false)
  }

  if (!response.ok) {
    const body = (await response.json()) as ApiErrorEnvelope
    throw new ApiError(body.error.code, body.error.message, body.error.details)
  }

  const body = (await response.json()) as ApiEnvelope<T>
  return body.data
}
