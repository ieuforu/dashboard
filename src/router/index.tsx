import { Navigate, Route, Routes } from 'react-router-dom'
import MainLayout from '../components/Layout/MainLayout'
import Home from '../pages/Home'
import Histogram from '../pages/Histogram'
import Setting from '../pages/Setting'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import { ProtectedRoute } from '../components/ProtectedRoute'

export const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />

    {/* 保护整个 MainLayout 区域 */}
    <Route
      element={
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      }
    >
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/histogram" element={<Histogram />} />
      <Route path="/setting" element={<Setting />} />
    </Route>
  </Routes>
)
