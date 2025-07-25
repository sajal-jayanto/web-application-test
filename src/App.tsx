import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Timeline from './pages/Timeline'
import Profile from './pages/Profile'
import MurmurDetail from './pages/MurmurDetail'

const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Timeline />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/murmur/:id" element={<MurmurDetail />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
