/* eslint-disable no-param-reassign */
import axios from 'axios'
import {
  applyAdminAuthHeaders,
  clearAuthSession,
  isJwtExpired,
  isValidationTokenExpired,
} from '../utils/authSession'

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'X-Tenant': '',
  },
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwtToken')
    if (token && isJwtExpired(token)) {
      clearAuthSession()
      window.location.reload()
      throw new axios.Cancel('Token expired')
    }

    const validationToken = localStorage.getItem('validationToken')
    if (validationToken && isValidationTokenExpired()) {
      clearAuthSession()
      window.location.reload()
      throw new axios.Cancel('Validation token expired')
    }

    return applyAdminAuthHeaders(config)
  },
  (error) => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      clearAuthSession()
      if (window.location.pathname !== '/login') {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error.response)
  }
)

export default axiosInstance
