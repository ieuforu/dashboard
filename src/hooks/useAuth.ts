import { jwtDecode } from 'jwt-decode'

type JwtPayload = {
  sub: string
  email: string
  exp: number
}

export const useAuth = () => {
  const token = localStorage.getItem('user_token')
  if (!token) return null

  try {
    const payload = jwtDecode<JwtPayload>(token)
    const isExpired = Date.now() >= payload.exp * 1000
    return isExpired ? null : payload
  } catch {
    return null
  }
}
