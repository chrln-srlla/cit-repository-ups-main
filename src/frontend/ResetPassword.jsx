import { useState } from "react";
import React from "react";
<<<<<<< HEAD

const ResetPassword = React.forwardRef(({ onAnimationEnd, animate, verification, onClose }, ref) => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (newPassword === confirmPassword) {
            setIsLoading(true);
            await new Promise(resolve => setTimeout(resolve, 1500));
            setIsLoading(false);
            onClose();
            verification();
        } else {
            alert("Passwords do not match");
        }
    };

    return (
        <div 
            ref={ref} 
            onAnimationEnd={onAnimationEnd} 
            className={`relative flex ${animate} items-center justify-center bg-white shadow-md w-100 h-100 rounded-2xl`}
        >
            {/* Close Button (X) */}
            <button 
                type="button"
                onClick={onClose}
                className="absolute top-5 right-5 text-gray-400 hover:text-[#830FAD] transition-colors duration-300 cursor-pointer"
                aria-label="Close"
            >
                <i className="fa-solid fa-xmark text-xl"></i>
            </button>

            <div className="text-[#830FAD] text-center text-3xl">
                <i className="fa-solid fa-lock"></i>
                <h1 className="mt-3 text-2xl text-center text-black poppins-medium">Reset Password</h1>
                <p className="text-xs text-center text-black mx-auto w-70 poppins-regular">
                    Create a new password for your account
                </p>

                <form onSubmit={handleResetPassword} className="flex flex-col gap-5 mt-10 text-sm text-start mx-auto w-70 poppins-regular">
                    <div className="w-full text-black">
                        <label className="text-start">New Password</label><br />
                        <input 
                            value={newPassword} 
                            required 
                            onChange={(e) => setNewPassword(e.target.value)} 
                            type="password" 
                            className="w-full border-b mt-2 focus:outline-none border-[#0000004d]" 
                            placeholder="Enter your new password" 
                        />
                    </div>
                    <div className="w-full text-black">
                        <label className="text-start">Confirm Password</label><br />
                        <input 
                            value={confirmPassword} 
                            required 
                            onChange={(e) => setConfirmPassword(e.target.value)} 
                            type="password" 
                            className="w-full border-b mt-2 focus:outline-none border-[#0000004d]" 
                            placeholder="Confirm your password" 
                        />
                    </div>
                    <div className="w-full text-black mt-3 mb-1">
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
                                'Reset Password'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
});

=======
const ResetPassword= React.forwardRef(({onAnimationEnd, animate, verification, onClose},ref)=>{
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
    const [isLoading, setIsLoading] = useState(false)
    
    const handleResetPassword = async (e)=> {
        e.preventDefault();
        if(newPassword === confirmPassword){
            setIsLoading(true);
            await new Promise(resolve => setTimeout(resolve, 1500))
            setIsLoading(false);
            onClose();
            verification();
            
            
        }
        else{
            alert("Incorrect Password");
        }
    }

    return(
        <div ref={ref} onAnimationEnd={onAnimationEnd} className={`flex ${animate} items-center justify-center bg-white shadow-md w-100 h-100 rounded-2xl`}>
            <div className="text-[#830FAD] text-center  text-3xl">
                <i className="fa-solid fa-lock"></i>
                <h1 className="mt-3 text-2xl text-center text-black poppins-medium">Reset Password</h1>
                <p className="text-xs text-center text-black w-70 poppins-regular">Create a new password for your account
                    
                </p>
                <form onSubmit={handleResetPassword}  action="" className="flex flex-col gap-5 mt-10 text-sm text-start w-70 poppins-regular">
                    <div className="w-full text-black" >
                        <label className="text-start" htmlFor="">New Password</label><br />
                        <input value={newPassword} required onChange={(e)=> setNewPassword(e.target.value)} type="password" className="w-full border-b mt-2 focus:outline-none border-[#0000004d]" placeholder="Enter your new password" />
                    </div>
                    <div className="w-full text-black" >
                        <label className="text-start" htmlFor="">Confirm Password</label><br />
                        <input value={confirmPassword} required onChange={(e)=> setConfirmPassword(e.target.value)} type="password" className="w-full border-b mt-2 focus:outline-none border-[#0000004d]" placeholder="Enter your password" />
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
                                Loading ...
                            </span>
                            ) : (
                            'Reset Password'
                            )}
                        </button>
                    </div>
                    
                </form>
            </div>
            
        </div>
    );
})
>>>>>>> upstream/main
export default ResetPassword;