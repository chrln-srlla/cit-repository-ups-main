import { Link, useLocation } from "react-router-dom"
import { useState } from "react"
import Logo from "../../assets/images/Logo CIT.png"
import AdminLogin from "../Admin/AdminLogin"

 export default function Navbar({logout}) {
   const location = useLocation()
   const active = location.pathname === "/home" ? "home" : location.pathname === "/capstone" ? "capstone" : location.pathname === "/about" ? "about" : ""
   const [isLoginOpen, setIsLoginOpen] = useState(false)

   return (
        <>
        <header className="fixed inset-x-0 top-0 z-50 bg-white backdrop-blur-md ">
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


