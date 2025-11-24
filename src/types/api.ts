export interface ApiResponse<T = any> {
  success: boolean
  message: string
  code?: string
  data?: T
}

export type JwtPayload = {
  sub: string
  email: string
  exp: number
}

export interface LoginResponseData {
  token: string
}
