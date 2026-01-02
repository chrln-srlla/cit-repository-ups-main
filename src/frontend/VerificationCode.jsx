import { useState } from "react";
import React from "react";
const VerificationCode = React.forwardRef(({onAnimationEnd, animate, email, resend, onClose},ref)=>{
    const [isLoading, setIsLoading] = useState(false)

      
    const handleSendEmail = async (e) => {
    e.preventDefault()
    if (email) {
      setIsLoading(true)
      await new Promise(resolve => setTimeout(resolve, 1500))
      setIsLoading(false)
     onClose();
    }
  }
  const handleResend = async (e) => {
    e.preventDefault();
    resend();
    onClose();
    
  }
    return(
        <div ref={ref} onAnimationEnd={onAnimationEnd} className={`flex ${animate} items-center justify-center bg-white shadow-md w-100 h-100 rounded-2xl`}>
            <div className="text-[#830FAD] text-center  text-3xl">
                <i className="fa-solid fa-envelope-circle-check"></i>
                <h1 className="mt-3 text-2xl text-center text-black poppins-medium">Enter Verification Code</h1>
                <p className="text-xs text-center text-black poppins-regular">We've sent a code to <span className="text-[#830FAD]">{email}</span></p>
                <form onSubmit={handleSendEmail} action="" className="flex flex-col gap-5 mt-6 text-sm text-start w-80 poppins-regular">
                     <div className="flex w-full gap-3 text-black" >
                        <input required type="text" className="w-full text-center h-12 border border-[#00000040] rounded-md" />
                        <input required type="text" className="w-full text-center h-12 border border-[#00000040] rounded-md" />
                        <input required type="text" className="w-full text-center h-12 border border-[#00000040] rounded-md" />
                        <input required type="text" className="w-full text-center h-12 border border-[#00000040] rounded-md" />
                        <input required type="text" className="w-full text-center h-12 border border-[#00000040] rounded-md" />
                        <input required type="text" className="w-full text-center h-12 border border-[#00000040] rounded-md" />
                      
                    </div>
                     <div className="w-full text-black" >
                         <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-[#754BA1] hover:from-purple-700 hover:via-purple-800 hover:to-purple-900 text-white py-3 rounded-full cursor-pointer font-semibold transition-all duration-300 shadow-lg hover:shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02]">
                            {isLoading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="w-5 h-5 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Verifying ...
                            </span>
                            ) : (
                            'Verify Email'
                            )}
                        </button>
                        <p className="mt-3 text-xs text-center">Didn't get the code?<span onClick={handleResend} className="text-[#754BA1] cursor-pointer "> Resend</span></p>
                    </div>
                    
                </form>
            </div>
            
        </div>
    );
})
export default VerificationCode;