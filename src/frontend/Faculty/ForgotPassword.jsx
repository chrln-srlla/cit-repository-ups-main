import { useState } from "react";
import React from "react";

const ForgotPassword = React.forwardRef(({ onAnimationEnd, animate, reset, emailToSend, onClose }, ref) => {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSendEmail = async (e) => {
        e.preventDefault();
        if (email) {
            setIsLoading(true);
            await new Promise(resolve => setTimeout(resolve, 1500));
            setIsLoading(false);
            emailToSend(email);
            onClose();
            reset();
        }
    };

    return (
        <div 
            ref={ref} 
            onAnimationEnd={onAnimationEnd} 
            className={`relative flex ${animate} items-center justify-center bg-white shadow-md w-100 h-100 rounded-2xl`}
        >
            <button 
                onClick={onClose}
                className="absolute top-5 right-5 text-gray-400 hover:text-[#830FAD] transition-colors duration-300 cursor-pointer"
                aria-label="Close"
            >
                <i className="fa-solid fa-xmark text-xl"></i>
            </button>

            <div className="text-[#830FAD] text-center text-3xl">
                <i className="fa-solid fa-lock"></i>
                <h1 className="mt-3 text-2xl text-center text-black poppins-medium">Forgot Password</h1>
                <p className="text-xs text-center text-black mx-auto w-70 poppins-regular">
                    Enter your email below to receive password reset instructions
                </p>

                <form onSubmit={handleSendEmail} className="flex flex-col gap-5 text-sm mt-8 text-start mx-auto w-70 poppins-regular">
                    <div className="w-full text-black">
                        <label className="text-start">Email</label><br />
                        <input 
                            value={email} 
                            required 
                            onChange={(e) => setEmail(e.target.value)} 
                            type="email" 
                            className="w-full border-b mt-2 focus:outline-none border-[#0000004d]" 
                            placeholder="Enter Your Email" 
                        />
                    </div>
                    <div className="w-full text-black">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-[#754BA1] hover:bg-[#5a3a7d] text-white py-3 rounded-full cursor-pointer font-semibold transition-all duration-300 shadow-lg hover:shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02]"
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="w-5 h-5 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Loading ...
                                </span>
                            ) : (
                                'Send'
                            )}
                        </button>
                        <p className="mt-3 text-xs text-center text-gray-500">
                            Didn't get the code? <span className="text-[#754BA1] cursor-pointer hover:underline">Resend</span>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
});

export default ForgotPassword;