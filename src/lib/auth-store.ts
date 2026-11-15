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

// Lets code that cannot render a dialog (for example useBookmark) ask the app shell to open sign-in.
// The Header subscribes and opens its AuthDialog. Returns false when nothing is listening.
export type SignInMode = 'login' | 'signup'
type SignInListener = (mode: SignInMode) => void
const signInListeners = new Set<SignInListener>()

export function requestSignIn(mode: SignInMode = 'login') {
  signInListeners.forEach((listener) => listener(mode))
  return signInListeners.size > 0
}

export function subscribeToSignInRequests(listener: SignInListener) {
  signInListeners.add(listener)
  return () => {
    signInListeners.delete(listener)
  }
}
