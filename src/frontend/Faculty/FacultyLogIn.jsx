import Logo from "../assets/images/Logo CIT.png";
import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useAnimatedToggle from "./useAnimatedToogle";
import ForgotPassword from "./ForgotPassword";
import VerificationCode from "./VerificationCode";
import ResetPassword from "./ResetPassword";
import "./animate.css";

function FacultyLogIn() {
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("faculty");
    const [email, setEmail] = useState("");

    const forgotPassword = useAnimatedToggle();
    const forgotPasswordRef = useRef(null);

    const verification = useAnimatedToggle();
    const verificationRef = useRef(null);

    const resetPassword = useAnimatedToggle();
    const resetPasswordRef = useRef(null);

    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();

    const handleLogIn = async (e) => {
        e.preventDefault()
        if (email && password) {
            setIsLoading(true)
            await new Promise(resolve => setTimeout(resolve, 1500))
            setIsLoading(false)
            if (role === "ad") {
                navigate('/admin/dashboard');
            } else {
                navigate('/facHome');
            }
        }
    }

    return (
        <>
            {forgotPassword.isVisible && (
                <div className="inset-0 fixed flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm">
                    <ForgotPassword 
                        emailToSend={setEmail} 
                        reset={resetPassword.toggle} 
                        ref={forgotPasswordRef} 
                        onAnimationEnd={forgotPassword.handleEnd} 
                        animate={forgotPassword.animation} 
                        onClose={() => forgotPassword.setAnimation("fade-out")} 
                    />
                </div>
            )}
            {verification.isVisible && (
                <div className="inset-0 fixed flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm">
                    <VerificationCode 
                        resend={forgotPassword.toggle} 
                        email={email} 
                        ref={verificationRef} 
                        onAnimationEnd={verification.handleEnd} 
                        animate={verification.animation} 
                        onClose={() => verification.setAnimation("fade-out")} 
                    />
                </div>
            )}
            {resetPassword.isVisible && (
                <div className="inset-0 fixed flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm">
                    <ResetPassword 
                        verification={verification.toggle} 
                        ref={resetPasswordRef} 
                        onAnimationEnd={resetPassword.handleEnd} 
                        animate={resetPassword.animation} 
                        onClose={() => resetPassword.setAnimation("fade-out")} 
                    />
                </div>
            )}

            <div className="relative flex items-center w-full h-screen bg-white">
                <header className="fixed inset-x-0 top-0 z-20 bg-white/0 ">
                    <nav className="grid items-center h-12 grid-cols-3 px-6 mx-auto max-w-7xl md:h-22">
                        <div className="relative flex items-center h-full overflow-visible w-60 md:w-72">
                            <img src={Logo} alt="CIT Repository" className="absolute left-0 w-auto h-32 mt-1 -translate-y-1/2 top-1/2 md:mt-1 md:h-40" />
                        </div>
                        <div className="hidden md:block"></div>
                        <div className="flex items-center justify-end w-full col-start-3 ml-auto md:flex">
                            <Link to="/facultySignUp" className="flex items-center justify-center h-9 px-8 border cursor-pointer bg-white poppins-medium border-[#754BA1] text-sm font-semibold rounded-full hover:bg-purple-50 transition-colors">Sign Up</Link>
                        </div>
                    </nav>
                </header>

                <div className="flex flex-col items-center w-full ">
                    <div className="w-full">
                        <h1 className="text-4xl poppins-medium text-center text-[#830FAD]">Log In Your Account</h1>
                        <h3 className="text-lg text-center poppins-regular">Welcome back!</h3>
                    </div>

                    <form onSubmit={handleLogIn} className="flex flex-col gap-8 mt-10 text-md poppins-regular w-full max-w-md px-6">
                        <div className="w-full">
                            <label>Institutional Email</label><br />
                            <input value={email} required onChange={(e) => setEmail(e.target.value)} type="email" className="w-full border-b mt-2 focus:outline-none border-[#0000004d]" placeholder="Enter your Institutional Email"/>
                        </div>
                        <div className="w-full">
                            <label>Password</label><br />
                            <input value={password} required onChange={(e) => setPassword(e.target.value)} type="password" className="w-full border-b mt-2 focus:outline-none border-[#0000004d]" placeholder="Enter your Password" />
                            <p onClick={forgotPassword.toggle} className="mt-2 text-xs  text-end poppins-regular text-[#830FAD] cursor-pointer hover:text-black transition duration-300 ">Forgot Password?</p>
                        </div>
                        <div className="w-full px-2">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-[#754BA1] text-white py-3 rounded-full cursor-pointer font-semibold transition-all duration-300 shadow-lg hover:shadow-purple-500/50 disabled:opacity-50 transform hover:scale-[1.02]">
                                {isLoading ? "Logging in..." : "Login"}
                            </button>
                            <p className="mt-2 text-sm text-center poppins-regular">Don't have an account? <Link to="/facultySignUp" className="text-[#830FAD]">Sign Up</Link></p>
                        </div>
                    </form>
                </div>

                <footer className="py-3 z-30 mt-auto absolute bottom-0 w-full text-white bg-gradient-to-r from-[#CD9EFF] via-[#7A55A3] to-[#4D0699]">
                    <div className="px-6 mx-auto text-center max-w-7xl">
                        <p className="text-sm md:text-base">
                            IT Capstone Repository System © 2025 College of Information Technology - All Rights Reserved.
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}

export default FacultyLogIn;