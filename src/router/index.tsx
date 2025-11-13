import { Navigate, Route, Routes } from 'react-router-dom'
import MainLayout from '../components/Layout/MainLayout'
import Home from '../pages/Home'
import Histogram from '../pages/Histogram'
import Setting from '../pages/Setting'
import Login from '../pages/Login'
import Signup from '../pages/Signup'

export const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route element={<MainLayout />}>
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/histogram" element={<Histogram />} />
      <Route path="/setting" element={<Setting />} />
    </Route>
  </Routes>
)
