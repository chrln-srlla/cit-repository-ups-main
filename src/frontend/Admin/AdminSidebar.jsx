import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import V9Gradient from "../../assets/images/V9.svg"

export default function AdminSidebar() {
    const navigate = useNavigate()
    const location = useLocation()
    const { logout } = useAuth()
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)
    const [isLoggingOut, setIsLoggingOut] = useState(false)

    const isActive = (path) => location.pathname === path

    const handleLogout = () => {
        setIsLoggingOut(true)
        setIsLogoutModalOpen(false)
        logout()
        setTimeout(() => {
            navigate('/')
        }, 1500)
    }

    return (
        <>
            <aside className="fixed top-0 left-0 flex flex-col items-center w-20 h-screen gap-6 py-6 overflow-hidden bg-purple-900 z-50">
                {/* Dashboard Icon */}
                <div
                    onClick={() => navigate('/admin/dashboard')}
                    className={`flex items-center justify-center w-8 h-8 transition-colors rounded-lg cursor-pointer ${isActive('/admin/dashboard') ? 'bg-purple-700 text-white' : 'text-white/70 hover:bg-purple-800 hover:text-white'}`}
                    title="Dashboard"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                </div>

<<<<<<< HEAD
                {/* Capstone Icon - Changed to Folder/Library style to differentiate */}
                <div
                    onClick={() => navigate('/admin/capstone-projects')}
                    className={`flex items-center justify-center w-8 h-8 transition-colors rounded-lg cursor-pointer ${isActive('/admin/capstone-projects') ? 'bg-purple-700 text-white' : 'text-white/70 hover:bg-purple-800 hover:text-white'}`}
                    title="Capstone Projects"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
                    </svg>
                </div>

                {/* Manuscript Icon */}
=======
                {/* Manuscript Icon (New) */}
>>>>>>> upstream/main
                <div
                    onClick={() => navigate('/admin/manuscript-uploads')}
                    className={`flex items-center justify-center w-8 h-8 transition-colors rounded-lg cursor-pointer ${isActive('/admin/manuscript-uploads') ? 'bg-purple-700 text-white' : 'text-white/70 hover:bg-purple-800 hover:text-white'}`}
                    title="Manuscript Uploads"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                </div>

<<<<<<< HEAD
                {/* Publish Icon */}
                <div
                onClick={() => navigate('/admin/publish-manuscript')}
                className={`flex items-center justify-center w-8 h-8 transition-colors rounded-lg cursor-pointer ${isActive('/admin/publish-manuscript') ? 'bg-purple-700 text-white' : 'text-white/70 hover:bg-purple-800 hover:text-white'}`}
                >
                <img 
                    src="/publish.png" 
                    alt="Upload Manuscript" 
                className="w-6 h-6 object-contain opacity-70"
                />
=======
                {/* Capstone Icon - Changed to Folder/Library style to differentiate */}
                <div
                    onClick={() => navigate('/admin/capstone-projects')}
                    className={`flex items-center justify-center w-8 h-8 transition-colors rounded-lg cursor-pointer ${isActive('/admin/capstone-projects') ? 'bg-purple-700 text-white' : 'text-white/70 hover:bg-purple-800 hover:text-white'}`}
                    title="Capstone Projects"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
                    </svg>
>>>>>>> upstream/main
                </div>

                {/* Users/People Icon */}
                <div
                    onClick={() => navigate('/admin/account-management')}
                    className={`flex items-center justify-center w-8 h-8 transition-colors rounded-lg cursor-pointer ${isActive('/admin/account-management') ? 'bg-purple-700 text-white' : 'text-white/70 hover:bg-purple-800 hover:text-white'}`}
                    title="Account Management"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                </div>

                {/* User Settings Icon */}
                <div
                    onClick={() => navigate('/admin/settings')}
                    className={`relative flex items-center justify-center w-8 h-8 transition-colors rounded-lg cursor-pointer ${isActive('/admin/settings') ? 'bg-purple-700 text-white' : 'text-white/70 hover:bg-purple-800 hover:text-white'}`}
                    title="Settings"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <svg className="absolute bottom-0 right-0 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                </div>

                {/* Logout Icon */}
                <div
                    className="flex items-center justify-center w-8 h-8 mt-auto text-white transition-colors rounded-lg cursor-pointer hover:bg-purple-800 hover:text-white"
                    onClick={() => setIsLogoutModalOpen(true)}
                    title="Logout"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                </div>
            </aside>

            {/* Logout Confirmation Modal */}
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
                                className="flex-1 px-4 py-2 text-gray-700 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleLogout}
                                className="flex-1 px-4 py-2 text-white transition-colors bg-purple-600 rounded-lg hover:bg-purple-700"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Logout Loading Overlay */}
            {isLoggingOut && (
                <div className="fixed inset-0 z-[60] min-h-screen flex items-center justify-center">
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
                                <span className="block text-sm text-gray-500">Redirecting to landing page</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
