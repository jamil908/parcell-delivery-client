






import { Home } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'

const NotFound = () => {
  return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center px-4">
        <h1 className="text-9xl font-bold text-gray-900">404</h1>
        <p className="text-2xl text-gray-600 mt-4 mb-8">Page not found</p>
        <p className="text-gray-500 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          <Home className="w-5 h-5" />
          <span>Go back home</span>
        </Link>
      </div>
    </div>
  )
}

export default NotFound