import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Timeline from './pages/Timeline'
import Profile from './pages/Profile'
import MurmurDetail from './pages/MurmurDetail'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Timeline />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/murmur/:id" element={<MurmurDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
