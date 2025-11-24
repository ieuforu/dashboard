// src/hooks/useAuth.ts
import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import type { JwtPayload, LoginResponseData, ApiResponse } from '../types/api'
import { api } from '../lib/api'

interface AuthHook {
  user: JwtPayload | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (
    email: string,
    password: string,
  ) => Promise<ApiResponse<LoginResponseData>>
  signup: (email: string, password: string) => Promise<ApiResponse>
  logout: () => void
}

export const useAuth = (): AuthHook => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  // 初始化时解析本地 token
  const [user, setUser] = useState<JwtPayload | null>(() => {
    const token = localStorage.getItem('user_token')
    if (!token) return null

    try {
      const payload = jwtDecode<JwtPayload>(token)
      if (Date.now() >= payload.exp * 1000) {
        localStorage.removeItem('user_token')
        return null
      }
      return payload
    } catch {
      localStorage.removeItem('user_token')
      return null
    }
  })

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const res = await api<ApiResponse<LoginResponseData>>('/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      })

      if (res.success && res.data?.token) {
        const token = res.data.token
        localStorage.setItem('user_token', token)
        const decoded = jwtDecode<JwtPayload>(token)
        setUser(decoded)
        navigate('/')
      }

      return res
    } catch (error) {
      // api.ts 已经处理了 401，这里只处理网络错误
      return {
        success: false,
        message: '网络连接失败，请检查网络后重试',
        code: 'NETWORK_ERROR',
      }
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const res = await api<ApiResponse>('/users/register', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      })
      return res
    } catch {
      return {
        success: false,
        message: '注册失败，请检查网络',
        code: 'NETWORK_ERROR',
      }
    } finally {
      setIsLoading(false)
    }
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
