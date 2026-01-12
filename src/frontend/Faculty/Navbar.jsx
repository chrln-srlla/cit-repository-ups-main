import { Link, useLocation, useNavigate } from "react-router-dom"
import { useState } from "react"
import Logo from "../../assets/images/Logo CIT.png"
import AdminLogin from "../Admin/AdminLogin"
import V9Gradient from "../../assets/images/V9.svg"

export default function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)

  const active = location.pathname === "/facHome" ? "home" : 
                 location.pathname === "/facCapstone" ? "capstone" : 
                 location.pathname === "/facAbout" ? "about" : 
                 (location.pathname === "/facCapstoneSubmit" || location.pathname.startsWith("/review")) ? "submit" : ""

  const handleLogoutAction = () => {
    setIsLoggingOut(true)
    setIsLogoutModalOpen(false)
    setTimeout(() => {
      navigate('/facultyLogIn')
    }, 1500)
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-20 bg-white backdrop-blur-md border-b border-gray-100">
        <nav className="grid items-center h-12 grid-cols-3 px-6 mx-auto max-w-7xl md:h-22">
          <Link to="/facHome" className="relative flex items-center h-full overflow-visible w-60 md:w-72">
            <img src={Logo} alt="CIT Repository" className="absolute left-0 w-auto h-32 mt-1 -translate-y-1/2 top-1/2 md:mt-1 md:h-40" />
          </Link>
          
          <ul className="items-center justify-center hidden gap-10 text-sm font-medium text-gray-700 md:flex">
            {/* Home, Capstone, Submit, About Us ... */}
            <li className="relative">
              <Link to="/facHome" className={(active === "home" ? "text-indigo-600 " : "text-gray-700 hover:text-gray-900 ") + "transition-colors px-1 block"}>
                Home
                {active === "home" && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 -mb-2"></span>}
              </Link>
            </li>
            <li className="relative">
              <Link to="/facCapstone" className={(active === "capstone" ? "text-indigo-600 " : "text-gray-700 hover:text-gray-900 ") + "transition-colors px-1 block"}>
                Capstone
                {active === "capstone" && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 -mb-2"></span>}
              </Link>
            </li>
            <li className="relative">
              <Link to="/facCapstoneSubmit" className={(active === "submit" ? "text-indigo-600 " : "text-gray-700 hover:text-gray-900 ") + "transition-colors px-1 block"}>
                Submit
                {active === "submit" && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 -mb-2"></span>}
              </Link>
            </li>
            <li className="relative">
              <Link to="/facAboutUs" className={(active === "about" ? "text-indigo-600 " : "text-gray-700 hover:text-gray-900 ") + "transition-colors px-1 block"}>
                About Us
                {active === "about" && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 -mb-2"></span>}
              </Link>
            </li>
          </ul>

          <div className="items-center justify-end hidden md:flex w-60 md:w-72">
            <button
              onClick={() => setIsLogoutModalOpen(true)}
              className="px-6 py-2 font-semibold text-white transition-colors bg-purple-600 rounded-full shadow-md cursor-pointer hover:bg-purple-700 hover:shadow-lg"
            >
              Log Out
            </button>
          </div>
        </nav>
      </header>

      {isLogoutModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm"
          onClick={() => setIsLogoutModalOpen(false)}
        >
          <div 
            className="w-full max-w-md p-8 bg-white shadow-2xl rounded-xl animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-center mb-4">
              <div className="flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            </div>
            <h2 className="mb-2 text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-600 to-purple-800">Confirm Logout</h2>
            <p className="mb-6 text-center text-gray-600">Are you sure you want to logout?</p>
            <div className="flex gap-3">
              <button
                onClick={() => setIsLogoutModalOpen(false)}
                className="flex-1 px-4 py-2 text-gray-700 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleLogoutAction}
                className="flex-1 px-4 py-2 text-white transition-colors bg-purple-600 rounded-lg hover:bg-purple-700 cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* logging out */}
      {isLoggingOut && (
        <div className="fixed inset-0 flex items-center justify-center min-h-screen z-[60]">
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
                <span className="block text-2xl font-bold text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text">Logging out...</span>
                <span className="block text-sm text-gray-500">Redirecting to login page</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <AdminLogin isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  )
}