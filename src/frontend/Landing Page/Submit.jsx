import { useState , useRef} from 'react'
import Hero from './Hero'
import Navbar from './Navbar'
import { useNavigate } from 'react-router-dom';
import Upload from "../../assets/images/upload.svg"
import AddAuthor from "../../assets/images/add-author.svg"

import V9Gradient from "../../assets/images/V9.svg"


export default function Submit() {
      const navigate = useNavigate()
      const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
      const [isLoggingOut, setIsLoggingOut] = useState(false);
      const fileInputRef = useRef(null)
      const [selectedFile, setSelectedFile] = useState(null)
      const [authors, setAuthors] = useState([""])
    
        const addAuthor = () => {
        setAuthors([...authors, ""])
        }

        const updateAuthor = (index, value) => {
        const updatedAuthors = [...authors]
        updatedAuthors[index] = value
        setAuthors(updatedAuthors)
        }

        const removeAuthor = (index) => {
        setAuthors(authors.filter((_, i) => i !== index))
        }


    
	return (
        <div className="flex flex-col min-h-screen  bg-[#F3F3F3]">
            <Navbar logout={()=>setIsLogoutModalOpen(true)}/>
             <div className="w-full h-screen ">
                <h1 className='text-3xl text-center poppins-semibold mt-30'>Manuscript Submission</h1>
                <p className='mt-3 text-sm text-center poppins-regular'>Submit your research paper for adviser evaluation and comments</p>
                <div className="flex justify-center w-full ">
                    <div className="mt-5 w-200">
                        <p className='poppins-medium text-md'>Paper Submission Information</p>
                        <div className="w-full mt-3 text-md poppins-regular">
                            <label className='' htmlFor="">Title</label> <br />
                            <input required className='w-full px-3 h-10 border bg-white border-[#00000066] rounded-md' type="text" />   
                        </div>
                        <div className="flex w-full gap-5 mt-3 text-md poppins-regular">
                             <div className="w-full mt-3 text-md poppins-regular">
                            <label className='' htmlFor="">Group Name</label> <br />
                            <input required className='w-full px-3 h-10 border bg-white border-[#00000066] rounded-md' type="text" />   
                        </div>
                         <div className="w-full mt-3 text-md poppins-regular">
                            <label className='' htmlFor="">Section</label> <br />
                            <input required className='w-full px-3 h-10 border bg-white border-[#00000066] rounded-md' type="text" />   
                        </div>
                            
                        </div>
                         <div className="flex justify-between w-full mt-3 text-md poppins-regular">
                        <label>Author/s</label>
                        <button 
                            type="button"
                            onClick={addAuthor}
                            className="transition cursor-pointer poppins-medium hover:bg-purple-50"
                        >
                            <img src={AddAuthor} className='w-6' alt="" />
                        </button>
                        </div>
                        <div>

                        {authors.map((author, index) => (
                            <div key={index} className="flex items-center gap-3 mt-3">
                            <input
                                required
                                type="text"
                                value={author}
                                onChange={(e) => updateAuthor(index, e.target.value)}
                                placeholder={`Author ${index + 1}`}
                                className="w-full  h-10 border bg-white border-[#00000066] rounded-md px-3"
                            />
                            </div>
                        ))}

                        
                        </div>

                        <div className="w-full mt-3 text-md poppins-regular">
                            <label className='' htmlFor="">Research Paper</label> <br />
                        <div className="w-full mt-3 text-md poppins-regular">

                        <div className="w-full flex flex-col items-center justify-center bg-white border-2 border-dashed border-[#00000066] h-40 rounded-2xl">
                            <img src={Upload} className="w-14" alt="Upload" />

                            <p className="mt-2 text-sm text-gray-600 poppins-regular">
                            {selectedFile ? selectedFile.name : "Upload your research paper here"}
                            </p>

                            {/* Hidden file input */}
                            <input
                            required
                            ref={fileInputRef}
                            type="file"
                            accept=".pdf,.doc,.docx"
                            className="hidden"
                            onChange={(e) => setSelectedFile(e.target.files[0])}
                            />

                            {/* Button triggers input */}
                            <button
                            type="button"
                            onClick={() => fileInputRef.current.click()}
                            className="mt-3 cursor-pointer h-10 px-6 rounded-2xl bg-[#754BA1] text-white poppins-semibold hover:bg-[#623a87] transition"
                            >
                            Select File
                            </button>
                        </div>
                        </div>

                        </div>

                        
                    </div>
                    
                    
                </div>
             </div>
             {/* Log out  Modal */}
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
                      onClick={() => {
                        setIsLoggingOut(true)
                        setIsLogoutModalOpen(false)
                        setTimeout(() => {
                          navigate('/')
                        }, 1500)
                      }}
                      className="flex-1 px-4 py-2 text-white transition-colors bg-purple-600 rounded-lg hover:bg-purple-700"
                    >
                      Logout
                    </button>
                </div>
              </div>
              </div>
            )}
             {/* Redirecting */}
           {isLoggingOut && (
                <div className="fixed inset-0 flex items-center justify-center min-h-screen z-60">
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
                        <span className="block text-sm text-gray-500">Redirecting to login page</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            
            {/* Footer */}
            
             <footer className="py-3 mt-30  text-white bg-linear-to-r from-[#CD9EFF] via-[#7A55A3] to-[#4D0699]">
                <div className="px-6 mx-auto text-center max-w-7xl">
                    <p className="text-sm md:text-base">
                        IT Capstone Repository System © 2025 College of Information Technology - All Rights Reserved.
                    </p>
                </div>
            </footer>
        </div>
	)
}
