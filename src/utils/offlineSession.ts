/** Local sign-in while the fleet admin has no backend. */
export const OFFLINE_DEMO = true

export const DEMO_EMAIL = 'mehdee@yaklimousine.ae'
export const DEMO_PASSWORD = 'mehdee123'

function encodeTokenPart(value: object): string {
  const json = JSON.stringify(value)
  return btoa(json).replace(/=/g, '')
}

function sessionToken(payload: object): string {
  const header = encodeTokenPart({ alg: 'none', typ: 'JWT' })
  const body = encodeTokenPart(payload)
  return `${header}.${body}.local`
}

export function matchesDemoLogin(email: string, password: string): boolean {
  return (
    email.trim().toLowerCase() === DEMO_EMAIL && password === DEMO_PASSWORD
  )
}

export function saveOfflineSession(): void {
  const exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30
  const user = {
    Email: DEMO_EMAIL,
    Role: 'staff',
    FirstName: 'Mehdee',
    LastName: '',
  }

  localStorage.setItem(
    'jwtToken',
    sessionToken({ exp, email: DEMO_EMAIL, role: 'staff' })
  )
  localStorage.setItem(
    'validationToken',
    sessionToken({ exp, name: 'SUPER_ADMIN', permissions: [] })
  )
  localStorage.setItem('user', JSON.stringify(user))
}
