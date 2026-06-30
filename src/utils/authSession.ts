import { jwtDecode } from 'jwt-decode'
import type { InternalAxiosRequestConfig } from 'axios'

const JWT_KEY = 'jwtToken'
const VALIDATION_KEY = 'validationToken'

export interface ForbiddenDiagnostics {
  reason: string
  hasJwt: boolean
  hasValidationToken: boolean
  permissions: string[]
  role: string | null
}

export function clearAuthSession(): void {
  localStorage.removeItem(JWT_KEY)
  localStorage.removeItem(VALIDATION_KEY)
  localStorage.removeItem('user')
  localStorage.removeItem('userType')
  localStorage.removeItem('userId')
  localStorage.removeItem('email')
  localStorage.removeItem('notification_token')
  localStorage.removeItem('userEmail')
  localStorage.removeItem('selectedCurrency')
  localStorage.removeItem('preferredCurrency')
}

export function getStoredUserRole(): string | null {
  try {
    const user = localStorage.getItem('user')
    if (!user) return null
    const parsed = JSON.parse(user) as { Role?: string }
    return parsed.Role?.toLowerCase() ?? null
  } catch {
    return null
  }
}

export function getValidationPermissions(): string[] {
  const validationToken = localStorage.getItem(VALIDATION_KEY)
  if (!validationToken) return []

  try {
    const payload = JSON.parse(
      atob(validationToken.split('.')[1])
    ) as { permissions?: string[] }
    return Array.isArray(payload.permissions) ? payload.permissions : []
  } catch {
    return []
  }
}

export function isValidationTokenExpired(): boolean {
  const validationToken = localStorage.getItem(VALIDATION_KEY)
  if (!validationToken) return true

  try {
    const decoded = jwtDecode<{ exp?: number }>(validationToken)
    if (decoded.exp == null) return false
    return decoded.exp < Date.now() / 1000
  } catch {
    return true
  }
}

export function isJwtExpired(token: string): boolean {
  try {
    const decoded = jwtDecode<{ exp?: number }>(token)
    if (decoded.exp == null) return false
    return decoded.exp < Date.now() / 1000
  } catch {
    return true
  }
}

export function diagnoseForbiddenAccess(): ForbiddenDiagnostics {
  const hasJwt = Boolean(localStorage.getItem(JWT_KEY))
  const hasValidationToken = Boolean(localStorage.getItem(VALIDATION_KEY))
  const permissions = getValidationPermissions()
  const role = getStoredUserRole()

  if (!hasJwt) {
    return {
      reason: 'Missing access token. Please log in again.',
      hasJwt,
      hasValidationToken,
      permissions,
      role,
    }
  }

  if (!hasValidationToken) {
    return {
      reason: 'Missing validation token. Please log in again.',
      hasJwt,
      hasValidationToken,
      permissions,
      role,
    }
  }

  if (isValidationTokenExpired()) {
    return {
      reason: 'Validation token expired. Please log in again.',
      hasJwt,
      hasValidationToken,
      permissions,
      role,
    }
  }

  if (role && role !== 'staff') {
    return {
      reason: 'Access denied. Staff role is required for admin APIs.',
      hasJwt,
      hasValidationToken,
      permissions,
      role,
    }
  }

  if (permissions.length === 0) {
    return {
      reason:
        'Access denied. No permissions are assigned to your validation token.',
      hasJwt,
      hasValidationToken,
      permissions,
      role,
    }
  }

  return {
    reason:
      'Access denied. Your role permissions do not allow this action.',
    hasJwt,
    hasValidationToken,
    permissions,
    role,
  }
}

function isPublicAuthRoute(url?: string): boolean {
  if (!url) return false
  return url.includes('/auth/login')
}

export function applyAdminAuthHeaders(
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig {
  const token = localStorage.getItem(JWT_KEY)
  const validationToken = localStorage.getItem(VALIDATION_KEY)
  const isLogin = isPublicAuthRoute(config.url)

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  if (!isLogin && validationToken) {
    config.headers.validation_token = validationToken
  }

  return config
}

export function isValidNumericUserId(id: string): boolean {
  return /^\d+$/.test(id)
}

export function isAuthErrorStatus(status?: number): boolean {
  return status === 401 || status === 403 || status === 404
}
