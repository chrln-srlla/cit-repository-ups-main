import Logo from "../assets/images/Logo CIT.png";
import { Link } from "react-router-dom";
import { useState } from "react";
function SignUp(){
    const [name, setName] = useState("");
    const [studentNumber, setStudentNumber] = useState("");
    const [ie, setIE] = useState("");
    const [year, setYear] = useState("");
    const [password, setPassword] = useState("");

    const handleSignUp = async (e) =>{
        e.preventDefault();
        try{
            const res = await fetch("http://localhost/backend/api/signup.py", {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                },
                body:JSON.stringify({
                    name,
                    studentNumber,
                    ie,
                    year,
                    password 
                })
            });
       
            const data = await res.json();
            if (data.message) {
                alert("Basta Successful");
                setName("");
                setStudentNumber(""); 
                setIE("");
                setYear("");
                setPassword("");
               
            } else {
                alert("Dae Successful");

            }
        }catch(err){
            console.error(err);
        }
        
    }

    return(
        <div className="relative flex items-center w-full h-screen">
            <div className="fixed top-0 w-full h-20 ">
                <img src={Logo} className="absolute w-40 -translate-y-1/2 left-5 top-1/2" alt="" />
                <Link to="/"  className="absolute h-9 px-8 -translate-y-1/2 flex items-center border cursor-pointer bg-white shadow-[2px_2px_2px_gray] border-[#754BA1] text-sm font-semibold right-5 top-1/2 rounded-full">Log In</Link>
            </div>
            <div className="flex flex-col items-center w-full ">
                <div className="w-full">
                     <h1 className="text-4xl poppins-medium text-center text-[#830FAD]">Create Account</h1>
                    <h3 className="text-lg text-center poppins-regular">Log In and Get Started</h3> 
                </div>
               
                <form onSubmit={handleSignUp} action="" className="flex flex-col gap-5 text-md poppins-regular w-100">
                    <div className="w-full">
                        <label className="" htmlFor="">Name</label><br />
                        <input required value={name} onChange={(e)=> setName(e.target.value)} type="text" className="w-full border-b mt-2 focus:outline-none border-[#0000004d]" placeholder="Enter Your Name" />
                    </div>
                    <div className="w-full">
                        <label className="" htmlFor="">Student Number</label><br />
                        <input required value={studentNumber} onChange={(e)=> setStudentNumber(e.target.value)} type="text" className="w-full focus:outline-none border-b mt-2 border-[#0000004d]" placeholder="Enter Your Student Number" />
                    </div>
                    <div className="w-full">
                        <label className="" htmlFor="">Institutional Email</label><br />
                        <input required value={ie} onChange={(e)=> setIE(e.target.value)} type="text" className="w-full focus:outline-none border-b mt-2 border-[#0000004d]" placeholder="Enter Your IE" />
                    </div>
                     <div className="w-full">
                        <label className="" htmlFor="">Year</label><br />
                        <input required value={year} onChange={(e)=> setYear(e.target.value)} type="text" className="w-full focus:outline-none border-b mt-2 border-[#0000004d]" placeholder="Enter Your Year" />
                    </div>
                     <div className="w-full">
                        <label className="" htmlFor="">Password</label><br />
                        <input required value={password} onChange={(e)=> setPassword(e.target.value)} type="text" className="w-full focus:outline-none border-b mt-2 border-[#0000004d]" placeholder="Enter your Password" />
                    </div>
                     <div className="w-full px-2">
                        <button type="submit" className="w-full h-12 cursor-pointer hover:scale-103 transition duration-300 hover:shadow-md  bg-[#754BA1] border rounded-full text-md poppins-semibold font-semibold text-white">Sign Up</button>
                        <p className="mt-2 text-sm text-center">Already have an account? <Link to ="/" className="text-[#830FAD]">Sign In</Link></p>
                    </div>
                </form>
            </div>
            <footer className="py-3 mt-auto absolute bottom-0 w-full text-white bg-linear-to-r from-[#CD9EFF] via-[#7A55A3] to-[#4D0699]">
                <div className="px-6 mx-auto text-center max-w-7xl">
                    <p className="text-sm md:text-base">
                        IT Capstone Repository System © 2025 College of Information Technology - All Rights Reserved.
                    </p>
                </div>
            </footer>

        </div>
    );
}
export default SignUp;