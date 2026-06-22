import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ImageProvider } from './context/ImageContext'
import AppLayout from './components/layout/AppLayout'
import Images    from './pages/Images'
import Videos    from './pages/Videos'
import Documents from './pages/Documents'
import AllFiles  from './pages/AllFiles'
import Trash     from './pages/Trash'
import Dashboard from './pages/Dashboard'
import './index.css'

export default function App() {
  return (
    <BrowserRouter>
      <ImageProvider>
        <Routes>
          <Route path="/file-manager" element={<AppLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard"  element={<Dashboard />} />
            <Route path="images"     element={<Images />} />
            <Route path="videos"     element={<Videos />} />
            <Route path="documents"  element={<Documents />} />
            <Route path="all-files"  element={<AllFiles />} />
            <Route path="trash"      element={<Trash />} />
          </Route>
          <Route path="*" element={<Navigate to="/file-manager/images" replace />} />
        </Routes>
      </ImageProvider>
    </BrowserRouter>
  )
}
