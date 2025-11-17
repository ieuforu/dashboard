import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuth()
  const location = useLocation()

  if (!auth) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}
