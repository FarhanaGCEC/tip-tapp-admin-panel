import axios from 'axios'
import {
  applyAdminAuthHeaders,
  clearAuthSession,
  diagnoseForbiddenAccess,
  isJwtExpired,
  isValidationTokenExpired,
} from '../utils/authSession'
import { API_BASE_URL } from './api-origin'
import { OFFLINE_DEMO } from '../utils/offlineSession'

const authFetch = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

function assertValidSession(url?: string): void {
  const isLogin = url?.includes('/auth/login')
  const token = localStorage.getItem('jwtToken')

  if (token && isJwtExpired(token)) {
    clearAuthSession()
    window.location.reload()
    throw new axios.Cancel('Token expired')
  }

  if (!isLogin) {
    const validationToken = localStorage.getItem('validationToken')
    if (validationToken && isValidationTokenExpired()) {
      clearAuthSession()
      window.location.reload()
      throw new axios.Cancel('Validation token expired')
    }
  }
}

authFetch.interceptors.request.use(
  (config) => {
    if (OFFLINE_DEMO) {
      config.adapter = async () => ({
        data: { data: { items: [], meta: {} } },
        status: 200,
        statusText: 'OK',
        headers: {},
        config,
      })
      return config
    }
    assertValidSession(config.url)
    return applyAdminAuthHeaders(config)
  },
  (error) => Promise.reject(error)
)

authFetch.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status

    if (status === 401) {
      clearAuthSession()
      if (window.location.pathname !== '/login') {
        window.location.href = '/login'
      }
      return Promise.reject(error)
    }

    if (status === 403) {
      const diagnostics = diagnoseForbiddenAccess()
      const apiMessage = error?.response?.data?.message
      error.forbiddenDiagnostics = diagnostics
      error.userMessage =
        apiMessage ||
        diagnostics.reason ||
        'Access denied. Check your role permissions and tokens.'
    }

    return Promise.reject(error)
  }
)

export default authFetch
