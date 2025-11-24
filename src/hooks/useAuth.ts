import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import type { ApiResponse, JwtPayload, LoginResponseData } from '../types/api'

interface AuthHook {
  user: JwtPayload | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<ApiResponse>
  signup: (email: string, password: string) => Promise<ApiResponse>
  logout: () => void
}

export const useAuth = (): AuthHook => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const [user, setUser] = useState<JwtPayload | null>(() => {
    const token = localStorage.getItem('user_token')
    if (!token) return null

    try {
      const payload = jwtDecode<JwtPayload>(token)
      const isExpired = Date.now() >= payload.exp * 1000
      if (isExpired) {
        localStorage.removeItem('user_token')
        return null
      }
      return payload
    } catch {
      localStorage.removeItem('user_token')
      return null
    }
  })

  const request = async <T>(
    endpoint: string,
    payload: object,
  ): Promise<ApiResponse<T>> => {
    setIsLoading(true)
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data: ApiResponse<T> = await res.json()

      return data
    } catch (error) {
      console.error('Request Failed:', error)
      return {
        success: false,
        message: '网络连接失败，请检查您的网络设置',
        code: 'NETWORK_ERROR',
      }
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (
    email: string,
    password: string,
  ): Promise<ApiResponse> => {
    const res = await request<LoginResponseData>('/api/login', {
      email,
      password,
    })

    if (res.success && res.data?.token) {
      const token = res.data.token
      localStorage.setItem('user_token', token)

      try {
        const decoded = jwtDecode<JwtPayload>(token)
        setUser(decoded)
        navigate('/')
      } catch (e) {
        return { success: false, message: 'Token 解析失败' }
      }
    }

    return res
  }

  const signup = async (
    email: string,
    password: string,
  ): Promise<ApiResponse> => {
    const res = await request('/api/register', { email, password })

    return res
  }

  const logout = useCallback(() => {
    localStorage.removeItem('user_token')
    setUser(null)
    navigate('/login')
  }, [navigate])

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    signup,
    logout,
  }
}
