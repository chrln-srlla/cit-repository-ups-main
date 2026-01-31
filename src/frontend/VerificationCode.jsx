import { useState } from "react";
import React from "react";
<<<<<<< HEAD

const VerificationCode = React.forwardRef(({ onAnimationEnd, animate, email, resend, onClose }, ref) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false); 

    const handleVerify = async (e) => {
        e.preventDefault();
        if (email) {
            setIsLoading(true);
            await new Promise(resolve => setTimeout(resolve, 1500));
            setIsLoading(false);
            setIsSuccess(true); 
        }
    };

    const handleResend = async (e) => {
        e.preventDefault();
        resend();
    };

    return (
        <div ref={ref} onAnimationEnd={onAnimationEnd} className={`relative flex ${animate} items-center justify-center bg-white shadow-md w-100 h-100 rounded-2xl p-6`}>
            
            <button onClick={onClose} className="absolute top-5 right-5 text-gray-400 hover:text-[#830FAD] transition-colors">
                <i className="fa-solid fa-xmark text-xl"></i>
            </button>

            <div className="text-center w-full">
                {!isSuccess ? (
                    // --- VERIFICATION FORM VIEW ---
                    <div className="flex flex-col items-center">
                        <div className="text-[#830FAD] text-3xl">
                            <i className="fa-solid fa-envelope-circle-check"></i>
                        </div>
                        <h1 className="mt-3 text-2xl text-black poppins-medium">Enter Verification Code</h1>
                        <p className="text-xs text-black poppins-regular">
                            We've sent a code to <span className="text-[#830FAD] font-bold">{email}</span>
                        </p>
                        
                        <form onSubmit={handleVerify} className="flex flex-col gap-5 mt-6 text-sm text-start w-80 poppins-regular">
                            <div className="flex w-full gap-2 text-black">
                                {[...Array(6)].map((_, i) => (
                                    <input 
                                        key={i} 
                                        required 
                                        type="text" 
                                        maxLength="1" 
                                        className="w-full text-center h-12 border border-[#00000040] rounded-md focus:border-[#830FAD] focus:outline-none" 
                                    />
                                ))}
                            </div>
                            
                            <div className="w-full text-black">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-[#754BA1] text-white py-3 rounded-full cursor-pointer font-semibold transition-all duration-300 shadow-lg disabled:opacity-50"
                                >
                                    {isLoading ? 'Verifying...' : 'Verify Email'}
                                </button>
                                <p className="mt-3 text-xs text-center">
                                    Didn't get the code? <span onClick={handleResend} className="text-[#754BA1] cursor-pointer font-bold hover:underline"> Resend</span>
                                </p>
                            </div>
                        </form>
                    </div>
                ) : (
                    // --- SUCCESS VIEW ---
                    <div className="flex flex-col items-center animate-in fade-in zoom-in duration-300">
                        <div className="text-green-500 text-6xl mb-4">
                            <i className="fa-solid fa-circle-check"></i>
                        </div>
                        <h1 className="text-2xl text-black poppins-medium">Password Changed!</h1>
                        <p className="text-sm text-gray-500 mt-2 mb-8 poppins-regular text-center px-4">
                            Your password has been successfully reset. You can now log in with your new password.
                        </p>
                        <button
                            onClick={onClose}
                            className="w-full max-w-[200px] bg-[#754BA1] text-white py-3 rounded-full font-semibold shadow-lg hover:bg-[#830FAD] transition-all cursor-pointer"
                        >
                            Back to Login
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
});

=======
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
>>>>>>> upstream/main
export default VerificationCode;