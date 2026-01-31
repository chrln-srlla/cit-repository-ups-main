import { Link, useLocation } from "react-router-dom"
<<<<<<< HEAD
import { useState, useRef, useEffect } from "react"
import Logo from "../../assets/images/Logo CIT.png"
import AdminLogin from "../Admin/AdminLogin"

export default function Navbar({ logout }) {
  const location = useLocation()

  const active =
    location.pathname === "/home"
      ? "home"
      : location.pathname === "/capstone"
      ? "capstone"
      : location.pathname === "/submit"
      ? "submit"
      : location.pathname === "/about"
      ? "about"
      : ""

  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const profileRef = useRef(null)

  // Mock user data
  const userProfile = {
    name: "ALWYN NABOR",
    email: "alwyn.nabor@cbsua.edu.ph",
  }

  // Close profile dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-20 bg-white border-b border-gray-100 backdrop-blur-md">
        <nav className="grid items-center h-16 grid-cols-3 px-6 mx-auto max-w-7xl">
          {/* LOGO */}
          <Link to="/" className="relative flex items-center h-full w-60 md:w-72">
            <img
              src={Logo}
              alt="CIT Repository"
              className="absolute left-0 w-auto h-32 -translate-y-1/2 top-1/2 md:h-40"
            />
          </Link>

          {/* NAV LINKS */}
          <ul className="items-center justify-center hidden gap-10 text-sm font-medium md:flex">
            {["home", "capstone", "submit", "about"].map((item) => (
              <li key={item} className="relative">
                <Link
                  to={`/${item}`}
                  className={`px-1 block capitalize transition-colors ${
                    active === item
                      ? "text-indigo-600"
                      : "text-gray-700 hover:text-gray-900"
                  }`}
                >
                  {item === "about" ? "About Us" : item}
                  {active === item && (
                    <span className="absolute left-0 right-0 h-0.5 bg-indigo-600 -bottom-2" />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* LOGOUT + PROFILE */}
          <div className="flex items-center justify-end gap-35 w-full md:w-80">
 
            <button
              onClick={logout}
              className="px-8 py-2 text-sm font-semibold text-white transition bg-purple-600 rounded-full shadow-md hover:bg-purple-700 hover:shadow-lg cursor-pointer"
            >
              Log Out
            </button>

            {/* PROFILE */}
            <div ref={profileRef} className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="-ml-10 flex items-center justify-center w-11 h-11 rounded-full hover:border-[#3a0475] transition cursor-pointer"
                >
                  <img
                    src="/account.png"
                    alt="User Profile"
                    className="w-full h-full object-cover"
                  />
                </button>

              {/* DROPDOWN */}
              {isProfileOpen && (
                <div className="absolute right-0 w-72 mt-3 bg-white border border-gray-100 rounded-xl shadow-xl p-4 animate-in fade-in zoom-in duration-200">
                  <p className="text-xs font-bold tracking-wider text-gray-400 uppercase">
                    Student Profile
                  </p>
                  <p className="mt-1 text-sm font-bold text-[#4D0699]">
                    {userProfile.name}
                  </p>
                  <p className="text-xs text-gray-600 break-all">
                    {userProfile.email}
                  </p>
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>

      <AdminLogin isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  )
}
=======
import { useState } from "react"
import Logo from "../../assets/images/Logo CIT.png"
import AdminLogin from "../Admin/AdminLogin"

 export default function Navbar({logout}) {
   const location = useLocation()
   const active = location.pathname === "/home" ? "home" : location.pathname === "/capstone" ? "capstone" : location.pathname === "/about" ? "about" : location.pathname === "/submit" ? "submit" :""
   const [isLoginOpen, setIsLoginOpen] = useState(false)

   return (
        <>
        <header className="fixed inset-x-0 top-0 z-20 bg-white backdrop-blur-md ">
            <nav className="grid items-center h-12 grid-cols-3 px-6 mx-auto max-w-7xl md:h-22">
                <Link to="/" className="relative flex items-center h-full overflow-visible w-60 md:w-72">
                    <img src={Logo} alt="CIT Repository" className="absolute left-0 w-auto h-32 mt-1 -translate-y-1/2 top-1/2 md:mt-1 md:h-40" />
                 </Link>
                 <ul className="items-center justify-center hidden gap-10 text-sm font-medium text-gray-700 md:flex">
                    <li className="relative">
                      <Link to="/home" aria-current={active === "home" ? "page" : undefined} className={(active === "home" ? "text-indigo-600 " : "text-gray-700 hover:text-gray-900 ") + "transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 rounded-sm px-1 block"}>
                        Home
                        {active === "home" && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 -mb-2"></span>}
                      </Link>
                    </li>
                    <li className="relative">
                      <Link to="/capstone" aria-current={active === "capstone" ? "page" : undefined} className={(active === "capstone" ? "text-indigo-600 " : "text-gray-700 hover:text-gray-900 ") + "transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 rounded-sm px-1 block"}>
                        Capstone
                        {active === "capstone" && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 -mb-2"></span>}
                      </Link>
                    </li>
                    <li className="relative">
                      <Link to="/submit" aria-current={active === "submit" ? "page" : undefined} className={(active === "submit" ? "text-indigo-600 " : "text-gray-700 hover:text-gray-900 ") + "transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 rounded-sm px-1 block"}>
                        Submit
                        {active === "submit" && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 -mb-2"></span>}
                      </Link>
                    </li>
                    <li className="relative">
                      <Link to="/about" aria-current={active === "about" ? "page" : undefined} className={(active === "about" ? "text-indigo-600 " : "text-gray-700 hover:text-gray-900 ") + "transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 rounded-sm px-1 block"}>
                        About Us
                        {active === "about" && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 -mb-2"></span>}
                      </Link>
                    </li>
                </ul>
                <div className="items-center justify-end hidden md:flex w-60 md:w-72">
                  <button
                    onClick={logout}
                    className="px-6 py-2 font-semibold text-white transition-colors bg-purple-600 rounded-full shadow-md cursor-pointer hover:bg-purple-700 hover:shadow-lg"
                  >
                    Log Out
                  </button>
                </div>
            </nav>
        </header>
        <AdminLogin isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
        </>
    )
}


>>>>>>> upstream/main
