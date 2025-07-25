import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { FaRegUser } from 'react-icons/fa'

interface LayoutProps {
  children: ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-12 w-12 bg-blue-900 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                M
              </div>
              <span className="text-xl font-bold text-blue-900">
                Murmur Verse
              </span>
            </Link>
            <div className="flex items-center space-x-2">
              <Link
                to="/profile/1"
                className="px-3 py-1 rounded text-lg font-medium flex gap-2"
              >
                <FaRegUser className="mt-1" />
                Profile
              </Link>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-4 py-6">{children}</main>
    </div>
  )
}
