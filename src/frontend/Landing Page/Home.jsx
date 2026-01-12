import { useState } from 'react'
import Hero from './Hero'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import V9Gradient from "../../assets/images/V9.svg"

export default function Home() {
  const navigate = useNavigate()
  const { logout } = useAuth()
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar logout={() => setIsLogoutModalOpen(true)} />
      <Hero />
      {/* Log out  Modal */}
      {isLogoutModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm"
          onClick={() => setIsLogoutModalOpen(false)}
        >
          <div
            className="w-full max-w-md p-8 bg-white shadow-2xl rounded-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-center mb-4">
              <div className="flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            </div>
            <h2 className="mb-2 text-2xl font-bold text-center text-transparent bg-clip-text bg-linear-to-r from-purple-400 via-purple-600 to-purple-800">Confirm Logout</h2>
            <p className="mb-6 text-center text-gray-600">Are you sure you want to logout?</p>
            <div className="flex gap-3">
              <button
                onClick={() => setIsLogoutModalOpen(false)}
                className="flex-1 px-4 py-2 text-gray-700 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsLoggingOut(true)
                  setIsLogoutModalOpen(false)

                  // Call logout from AuthContext to clear authentication
                  logout()

                  setTimeout(() => {
                    navigate('/')
                  }, 1500)
                }}
                className="flex-1 px-4 py-2 text-white transition-colors bg-purple-600 rounded-lg hover:bg-purple-700 cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Redirecting */}
      {isLoggingOut && (
        <div className="fixed inset-0 flex items-center justify-center min-h-screen z-60">
          <div className="absolute inset-0 bg-white" aria-hidden />
          <div
            className="absolute inset-0 opacity-100"
            style={{
              backgroundImage: `url(${V9Gradient})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
            aria-hidden
          />
          <div className="relative z-10 text-center">
            <div className="inline-flex flex-col items-center gap-4">
              <div className="relative">
                <svg className="w-12 h-12 text-purple-600 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <div className="absolute inset-0 rounded-full bg-purple-600/20 blur-xl"></div>
              </div>
              <div className="space-y-1">
                <span className="block text-2xl font-bold text-transparent bg-linear-to-r from-purple-600 to-indigo-600 bg-clip-text">Logging out...</span>
                <span className="block text-sm text-gray-500">Redirecting to login page</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-3 mt-auto text-white bg-linear-to-r from-[#CD9EFF] via-[#7A55A3] to-[#4D0699]">
        <div className="px-6 mx-auto text-center max-w-7xl">
          <p className="text-sm md:text-base">
            IT Capstone Repository System © 2025 College of Information Technology - All Rights Reserved.
          </p>
        </div>
      </footer>

    </div>
  )
}
