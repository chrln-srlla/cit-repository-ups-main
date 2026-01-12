import { useState, useRef } from 'react';
import Hero from './Hero';
import Navbar from './Navbar';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Upload from "../../assets/images/upload.svg";
import AddAuthor from "../../assets/images/add-author.svg";
import V9Gradient from "../../assets/images/V9.svg";

export default function Submit() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const view = searchParams.get('view') || 'dashboard';
  const setView = (newView) => setSearchParams({ view: newView });

  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [authors, setAuthors] = useState([""]);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isConfirmUploadModalOpen, setIsConfirmUploadModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [isEditingAbstract, setIsEditingAbstract] = useState(false);
  const [filterStatus, setFilterStatus] = useState('ALL');

  const [formData, setFormData] = useState({
    title: "AgriLearn: A Web-based Production Planning System for High-Value Crops",
    adviser: "Gilda J. Taupa",
    section: "3A",
    program: "BS Information Technology",
    abstract: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat..."
  });

  const addAuthor = () => setAuthors([...authors, ""]);
  const updateAuthor = (index, value) => {
    const updatedAuthors = [...authors];
    updatedAuthors[index] = value;
    setAuthors(updatedAuthors);
  };
  const removeAuthor = (index) => setAuthors(authors.filter((_, i) => i !== index));

  const projects = [
    { id: 1, title: "AgriLearn: A Web-based Production Planning System for High-Value Crops", status: "Pending", capstoneId: "CP001", submittedOn: "Jan. 6, 2026" },
    { id: 2, title: "AgriLearn: A Web-based Production Planning System for High-Value Crops", status: "Approved", capstoneId: "CP002", submittedOn: "Jan. 6, 2026" }
  ];

  const filteredProjects = projects.filter(project => 
    (filterStatus === 'ALL' || project.status === filterStatus) &&
    project.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-[#F3F3F3]">
      <Navbar logout={() => setIsLogoutModalOpen(true)} />

      <div className="flex-grow w-full px-10 py-8">
        {view === 'dashboard' ? (
          /* --- DASHBOARD --- */
          <div className="max-w-7xl mx-auto">
            <h1 className='text-4xl mt-14 mb-2 poppins-semibold text-[#1a1a1a]'>My Capstone Project</h1>
            <p className='text-black-400 poppins-regular mb-5'>Track your project approval status</p>

            {/* FILTER AND SEARCH */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
              <div className="flex items-center gap-3">
                <span className="text-[14px] poppins-medium">Filter:</span>
                <div className="flex gap-2">
                  {['ALL', 'Pending', 'Approved'].map((status) => (
                    <button
                      key={status}
                      onClick={() => setFilterStatus(status)}
                      className={`px-5 py-1 text-sm rounded-lg transition-colors cursor-pointer ${
                        filterStatus === status
                          ? "bg-[#754BA1] font-bold text-white"
                          : "bg-white border border-gray-300 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {status.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setView('form')}
                  className="flex items-center gap-2 px-6 py-2 bg-[#754BA1] text-white rounded-lg poppins-medium hover:bg-[#623a87] transition shadow-md cursor-pointer"
                >
                  Submit a Manuscript <span className="text-xl">+</span>
                </button>

                <input 
                  type="text" 
                  placeholder="Search capstone..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 px-4 py-2 bg-white border border-gray-300 rounded-full text-sm outline-none focus:ring-2 focus:ring-purple-300"
                />
              </div>
            </div>

            {/* PROJECT LIST */}
            <div className="flex flex-col gap-8">
              {filteredProjects.length === 0 ? (
                <p className="text-center text-gray-500">No projects found.</p>
              ) : (
                filteredProjects.map((project) => (
                  <div key={project.id} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                      {/* Project Details */}
                      <div className="flex justify-between items-start mb-4">
                        <h2 className="text-xl font-bold poppins-semibold pr-4">{project.title}</h2>
                        <button 
                          onClick={() => setView(project.status === "Pending" ? 'view-pending' : 'view-approved')} 
                          className="text-xs border border-gray-300 px-3 py-1 rounded-md poppins-medium text-gray-600 hover:bg-gray-50 whitespace-nowrap cursor-pointer"
                        >
                          View Submission
                        </button>
                      </div>

                      <div className="flex gap-4 mb-6 text-xs poppins-regular">
                        <span className={`px-3 py-1 rounded-md font-bold flex items-center gap-1 ${
                          project.status === "Pending" ? "bg-[#D1944B] text-white" : "bg-[#007F1E] text-white"
                        }`}>
                          <span style={{ color: project.status === "Pending" ? '#FFF690' : '#A3FF98' }}>●</span>
                          {project.status === "Pending" ? "Pending Approval" : "Approved & Published"}
                        </span>
                        <span className="text-gray-400">Capstone ID: <span className="text-gray-800">{project.capstoneId}</span></span>
                        <span className="text-gray-400">Submitted on: <span className="text-gray-800">{project.submittedOn}</span></span>
                      </div>

                      <div className={`${project.status === "Pending" ? "bg-[#EBE38C80] text-[#854D0E]" : "bg-[#A3FF98] text-[#000000]"} p-4 rounded-xl text-sm mb-8`}>
                        {project.status === "Pending" 
                          ? "Your capstone has been submitted for approval. You will receive an email notification once the review is complete."
                          : "Your capstone has been approved and published. It is now viewable in the repository."}
                      </div>

                      {/* STEPPER */}
                      <div className="flex items-center justify-center gap-4">
                        <div className="flex items-center gap-2 text-green-600 text-sm">
                          <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center text-white text-[10px]">✓</div>
                          Submitted
                        </div>
                        <div className={`w-16 h-px ${project.status === "Pending" ? 'bg-orange-300' : 'bg-green-600'}`}></div>
                        <div className={`flex items-center gap-2 text-sm ${project.status === "Pending" ? 'text-[#D1944B]' : 'text-[#E6A23C]'}`}>
                          <div className={`w-3 h-3 rounded-full ${project.status === "Pending" ? 'bg-[#D1944B]' : 'bg-[#E6A23C]'}`}></div>
                          Under Review
                        </div>
                        <div className={`w-16 h-px ${project.status === "Pending" ? 'bg-orange-300' : 'bg-green-600'}`}></div>
                        <div className="flex items-center gap-2 text-sm">
                          <div className={`w-5 h-5 flex items-center justify-center rounded-full border-2 ${
                            project.status === "Approved" 
                              ? 'bg-green-600 border-green-600 text-white' 
                              : 'bg-white border-gray-300 text-gray-300'
                          }`}>
                            {project.status === "Approved" ? (
                              <span className="text-[10px]">✓</span>
                            ) : (
                              <img 
                                src="https://img.icons8.com/material-rounded/24/cccccc/checkmark.png" 
                                alt="check" 
                                className="w-3 h-3"
                              />
                            )}
                          </div>
                          <span className={`${project.status === "Approved" ? 'text-green-600' : 'text-gray-400'}`}>Approved</span>
                        </div>
                      </div>
                    </div>

                    {/* METADATA SUMMARY */}
                    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm h-fit">
                      <h3 className="text-sm font-bold border-b border-gray-400 pb-2 mb-4">Metadata Summary</h3>
                      <div className="space-y-3 text-[13px] poppins-regular">
                        <p><span className="text-black-400">Authors:</span> <span className="underline text-gray-500">Surname et al.</span></p>
                        <p><span className="text-black-400">Adviser:</span> <span className="text-gray-500">Gilda J. Taupa</span></p>
                        <p><span className="text-black-400">Section:</span> <span className="text-gray-500">3A</span></p>
                        <p><span className="text-black-400">Category:</span> <span className="text-gray-500">Web System</span></p>
                        <div className="flex gap-1 flex-wrap">
                          <span className="text-black-400">Keywords:</span>
                          <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-600">Agriculture</span>
                          <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-600">crops</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ) : view === 'form' ? (
          /* --- MANUSCRIPT SUBMISSION FORM --- */
          <div className="animate-in slide-in-from-bottom-4 duration-500">
            <h1 className='text-3xl mt-14 text-center poppins-semibold'>Manuscript Submission</h1>
            <p className='mt-3 text-sm text-center poppins-regular'>Submit your research paper for adviser evaluation and comments</p>
            {/* Form */}
            <div className="flex justify-center w-full ">
              <div className="mt-5 w-200">
                <p className='poppins-medium text-md'>Paper Submission Information</p>
                <div className="w-full mt-3 text-md poppins-regular">
                  <label>Title</label> <br />
                  <input required className='w-full px-3 h-10 border bg-white border-[#00000066] rounded-md' type="text" />   
                </div>

                <div className="flex w-full gap-5 mt-3 text-md poppins-regular">
                  <div className="w-full">
                    <label>Group Name</label> <br />
                    <input required className='w-full px-3 h-10 border bg-white border-[#00000066] rounded-md' type="text" />   
                  </div>
                  <div className="w-full">
                    <label>Section</label> <br />
                    <input required className='w-full px-3 h-10 border bg-white border-[#00000066] rounded-md' type="text" />   
                  </div>
                </div>

                <div className="flex justify-between w-full mt-3 text-md poppins-regular">
                  <label>Author/s</label>
                  <button type="button" onClick={addAuthor} className="transition cursor-pointer poppins-medium hover:bg-purple-50">
                    <img src={AddAuthor} className='w-6' alt="" />
                  </button>
                </div>

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

                <div className="w-full mt-3 text-md poppins-regular">
                  <label>Research Paper</label> <br />
                  <div className="w-full mt-3 text-md poppins-regular">
                    <div className="w-full flex flex-col items-center justify-center bg-white border-2 border-dashed border-[#00000066] h-40 rounded-2xl">
                      <img src={Upload} className="w-14" alt="Upload" />
                      <p className="mt-2 text-sm text-gray-600 poppins-regular">{selectedFile ? selectedFile.name : "Upload your research paper here"}</p>
                      <input
                        required
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className="hidden"
                        onChange={(e) => setSelectedFile(e.target.files[0])}
                      />
                      <button type="button" onClick={() => fileInputRef.current.click()} className="mt-3 cursor-pointer h-10 px-6 rounded-2xl bg-[#754BA1] text-white poppins-semibold hover:bg-[#623a87] transition">
                        Select File
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-10 flex justify-end gap-3">
                  <button onClick={() => setView('dashboard')} className="px-6 py-2 border border-gray-300 rounded-lg poppins-medium text-gray-500 hover:bg-gray-50 transition-colors cursor-pointer">Back to List</button>
                  <button onClick={() => setIsReviewModalOpen(true)} className="px-8 py-2 bg-[#754BA1] text-white rounded-lg poppins-bold shadow-lg cursor-pointer">Submit Manuscript</button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* --- VIEW SUBMISSION PAGE --- */
          <div className="max-w-7xl mx-auto mt-14 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className='text-4xl mb-2 poppins-semibold text-[#1a1a1a]'>My Capstone Project</h1>
            <p className='text-gray-500 mb-8'>Track your project approval status</p>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                            {/* Details */}
                            <div className="lg:col-span-7 space-y-6">
                                <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                                    <h2 className="text-xl font-bold mb-4">{formData.title}</h2>
                                    <div className="flex gap-4 mb-6 text-xs">
                                        {view === 'view-pending' ? (
                                            <span className="bg-[#D1944B] text-white px-3 py-1 rounded-md font-bold">● Pending Approval</span>
                                        ) : (
                                            <span className="bg-[#007F1E] text-white px-3 py-1 rounded-md font-bold">● Approved & Published</span>
                                        )}
                                        <span className="text-gray-400">Capstone ID: <span className="text-gray-800">CP001</span></span>
                                        <span className="text-gray-400">|</span>
                                        <span className="text-gray-400">Submitted on: <span className="text-gray-800">Jan. 6, 2026</span></span>
                                    </div>
                                    <div className={`${view === 'view-pending' ? 'bg-[#FFF9C4]' : 'bg-[#E8F5E9]'} p-4 rounded-xl text-sm text-black-700`}>
                                        {view === 'view-pending' 
                                            ? "Your capstone has been submitted for approval. You will receive an email notification once the review is complete."
                                            : "Your capstone has been approved and published. It is now viewable in the repository."}
                                    </div>
                                </div>

                                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                                    <h3 className="text-sm font-bold border-b border-gray-300 pb-2 mb-4 uppercase tracking-wider">Metadata Summary</h3>
                                    <div className="space-y-3 text-sm">
                                        <p><span className="text-gray-500">Authors:</span> <span className="underline decoration-gray-300">Surname et al.</span></p>
                                        <p><span className="text-gray-500">Adviser:</span> {formData.adviser}</p>
                                        <p><span className="text-gray-500">Section:</span> {formData.section}</p>
                                        <p><span className="text-gray-500">Program:</span> {formData.program}</p>
                                        <p><span className="text-gray-500">Keywords:</span> <span className="bg-gray-100 px-2 py-1 rounded text-xs ml-2">Agriculture, crops, web</span></p>
                                    </div>
                                </div>

                                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                                    <h3 className="text-sm font-bold border-b border-gray-300 pb-2 mb-4 uppercase tracking-wider">Abstract</h3>
                                    <p className="text-sm text-gray-600 leading-relaxed text-justify">{formData.abstract}</p>
                                </div>
                            </div>

                            {/* PDF Viewer */}
                            <div className="lg:col-span-5 flex flex-col gap-4">
                                <div className="bg-white border border-gray-200 rounded-2xl flex flex-col items-center justify-center min-h-[600px] shadow-sm relative">
                                    <h2 className="text-6xl font-black text-black tracking-tighter">PDF VIEWER</h2>
                                    <p className="text-gray-400 mt-2 font-bold uppercase tracking-widest text-xs">Read-Only</p>
                                    
                                    {view === 'view-pending' && (
                                        <div className="absolute bottom-6 left-6 right-6 bg-[#FFF9C4] p-4 rounded-xl border border-[#F0E68C]">
                                            <p className="font-bold text-sm">What happens next?</p>
                                            <p className="text-xs text-gray-600 mt-1">An administrator will review your submission. This may take a few days. Email notification will be sent once a decision is made.</p>
                                        </div>
                                    )}
                                </div>
                                  <div className="flex justify-end gap-3">
                                    <button
                                      onClick={() => setView('dashboard')}
                                      className="px-6 py-2 bg-white border border-gray-300 rounded-lg text-sm font-bold text-gray-500 cursor-pointer">
                                      Back to List
                                    </button>
                                    {view === 'view-approved' && (
                                      <button
                                        onClick={() =>
                                          navigate("/capstone", {
                                            state: {
                                              openCapstoneId: 1
                                            }
                                          })
                                        }
                                        className="px-6 py-2 rounded-lg text-sm font-bold flex items-center gap-2 cursor-pointer
                                                  bg-[#754BA1] text-white hover:bg-[#63378E] transition-colors duration-200" >
                                        <img src="/view.png" alt="View" className="w-5 h-5" />
                                        View Public Page
                                      </button>
                                    )}
                                  </div>
                            </div>
                        </div>
                    </div>
                   )}
                </div>

       {/* MODALS */}
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
                  <button onClick={() => setIsLogoutModalOpen(false)} className="flex-1 px-4 py-2 text-gray-700 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">Cancel</button>
                    <button onClick={() => { setIsLoggingOut(true); setIsLogoutModalOpen(false); setTimeout(() => navigate('/'), 1500); }} className="flex-1 px-4 py-2 text-white transition-colors bg-purple-600 rounded-lg hover:bg-purple-700 cursor-pointer">Logout</button>
                </div>
              </div>
              </div>
            )}

            {isLoggingOut && (
                <div className="fixed inset-0 flex items-center justify-center min-h-screen z-60">
                  <div className="absolute inset-0 bg-white" aria-hidden />
                  <div className="absolute inset-0 opacity-100" style={{ backgroundImage: `url(${V9Gradient})`, backgroundSize: 'cover' }} aria-hidden />
                  <div className="relative z-10 text-center">
                    <div className="inline-flex flex-col items-center gap-4">
                      <svg className="w-12 h-12 text-purple-600 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span className="block text-2xl font-bold text-transparent bg-linear-to-r from-purple-600 to-indigo-600 bg-clip-text">Logging out...</span>
                    </div>
                  </div>
                </div>
              )}

          {isReviewModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                <div 
                    className="bg-white rounded-3xl p-10 max-w-3xl w-full shadow-2xl relative overflow-y-auto max-h-[90vh]"
                    style={{ 
                        msOverflowStyle: 'none',   
                        scrollbarWidth: 'none',    
                        WebkitOverflowScrolling: 'touch' 
                    }}      >
                    <style>{`
                        div::-webkit-scrollbar {
                            display: none;
                        }
                    `}</style>
                    <h2 className="text-3xl font-bold -mt-2 text-center poppins-semibold mb-2">Manuscript Submission</h2>
                    <p className="text-center text-gray-500 text-sm mb-8 italic">Please review the details below. Click on the icons to edit fields.</p>

                    <div className="border border-gray-200 rounded-2xl p-6 space-y-4 mb-6">
    
                  <div className="flex justify-between items-start border-b border-gray-300 pb-2">
                      <div className="flex-1 flex items-center gap-2">
                          <span className="font-bold text-sm whitespace-nowrap">Title:</span>
                          {isEditingInfo ? (
                              <input 
                                  className="flex-1 border font-bold rounded px-2 py-1 text-sm outline-none focus:ring-1 focus:ring-purple-400" 
                                  value={formData.title} 
                                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                              />
                          ) : (
                              <p className="text-sm font-bold">{formData.title}</p>
                          )}
                      </div>
                      <button onClick={() => setIsEditingInfo(!isEditingInfo)} className="ml-4 text-gray-400 hover:text-purple-600 transition-colors">
                          {isEditingInfo ? "💾" : "✎"}
                      </button>
                  </div>

                  <div className="grid grid-cols-1 gap-3 text-sm">
                      
                      <div className="flex items-center gap-2">
                          <span className="font-bold whitespace-nowrap">Authors:</span>
                          {isEditingInfo ? (
                              <input 
                                  className="flex-1 border rounded px-2 py-1 text-xs outline-none focus:ring-1 focus:ring-purple-400" 
                                  value={authors.join(", ")} 
                                  onChange={(e) => setAuthors(e.target.value.split(", "))}
                              />
                          ) : (
                              <span className="text-gray-500 italic">{authors.join(", ") || "Surname et al."}</span>
                          )}
                      </div>

                      <div className="flex items-center gap-2">
                          <span className="font-bold whitespace-nowrap">Adviser:</span>
                          {isEditingInfo ? (
                              <input 
                                  className="flex-1 border rounded px-2 py-1 text-xs outline-none focus:ring-1 focus:ring-purple-400" 
                                  value={formData.adviser} 
                                  onChange={(e) => setFormData({...formData, adviser: e.target.value})}
                              />
                          ) : (
                              <span className="text-gray-500 italic">{formData.adviser}</span>
                          )}
                      </div>
                      
                      <div className="flex items-center gap-2">
                          <span className="font-bold whitespace-nowrap">Section:</span>
                          {isEditingInfo ? (
                              <input 
                                  className="w-24 border rounded px-2 py-1 text-xs outline-none focus:ring-1 focus:ring-purple-400" 
                                  value={formData.section} 
                                  onChange={(e) => setFormData({...formData, section: e.target.value})}
                              />
                          ) : (
                              <span className="text-gray-500">{formData.section}</span>
                          )}
                      </div>

                      <div className="flex items-center gap-2">
                          <span className="font-bold whitespace-nowrap">Program:</span>
                          <span className="text-gray-500">{formData.program}</span>
                      </div>
                  </div>
              </div>

              <div className="border border-gray-200 rounded-2xl p-6 mb-6">
                  <div className="flex justify-between items-center border-b border-gray-300 pb-2 mb-3">
                      <h3 className="font-bold text-sm uppercase tracking-wider">Abstract</h3>
                      <button onClick={() => setIsEditingAbstract(!isEditingAbstract)} className="text-gray-400 hover:text-purple-600">
                          {isEditingAbstract ? "💾" : "✎"}
                      </button>
                  </div>
                  {isEditingAbstract ? (
                      <textarea 
                          className="w-full border rounded p-2 text-xs italic h-32 focus:ring-1 focus:ring-purple-400 outline-none" 
                          value={formData.abstract}
                          onChange={(e) => setFormData({...formData, abstract: e.target.value})}
                      />
                  ) : (
                      <p className="text-xs text-gray-500 leading-relaxed italic">{formData.abstract}</p>
                  )}
              </div>

            <div className="border border-purple-200 bg-purple-50/30 p-4 rounded-xl flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <span className="text-purple-600 text-xl">📁</span>
                    <span className="text-purple-700 font-medium text-sm underline">{selectedFile ? selectedFile.name : "AgriLearn.pdf"}</span>
                </div>
                <button onClick={() => {setIsReviewModalOpen(false); setView('form');}} className="text-xs text-purple-600 font-bold hover:underline">Change File</button>
            </div>

            <div className="flex items-center gap-3 mb-8">
                <input 
                    type="checkbox" 
                    id="certify" 
                    className="accent-purple-600 h-4 w-4 cursor-pointer shrink-0" 
                />
                <label htmlFor="certify" className="text-xs text-gray-600 leading-snug cursor-pointer">
                    I certify that the information provided is complete and correct, and that all listed authors are accurate.
                </label>
            </div>
          <div className="flex justify-end gap-3 -mt-3">
              <button 
                  onClick={() => setIsReviewModalOpen(false)} 
                  className="px-6 py-2 border border-gray-300 rounded-xl text-gray-500 hover:bg-gray-50 transition-all text-sm cursor-pointer"
              >
                  Back
              </button>
              <button 
                  onClick={() => { setIsReviewModalOpen(false); setIsConfirmUploadModalOpen(true); }}
                  className="px-8 py-2 bg-[#754BA1] text-white rounded-xl font-bold shadow-md hover:bg-[#623a87] transition-all text-sm cursor-pointer"
              >
                  Upload Manuscript
              </button>
          </div>
        </div>
    </div>
)}

{isConfirmUploadModalOpen && (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40">
        <div className="bg-white rounded-3xl p-10 max-w-md w-full shadow-2xl text-center">
            <h2 className="text-xl font-bold mb-8">Are you sure you want to upload the paper?</h2>
            <div className="flex justify-center items-center gap-10">
                <button onClick={() => setIsConfirmUploadModalOpen(false)} className="text-gray-400 font-bold hover:text-gray-600 text-lg cursor-pointer">CANCEL</button>
                <button 
                    onClick={() => { setIsConfirmUploadModalOpen(false); setIsSuccessModalOpen(true); }}
                    className="bg-[#754BA1] text-white px-10 py-3 rounded-2xl font-bold shadow-lg hover:bg-[#623a87] cursor-pointer"
                >
                    UPLOAD
                </button>
            </div>
        </div>
    </div>
)}

{isSuccessModalOpen && (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
        <div className="bg-white rounded-3xl p-10 max-w-lg w-full shadow-2xl text-center">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white text-3xl mx-auto mb-6">✓</div>
            <h2 className="text-2xl font-bold mb-2">Capstone Manuscript Submitted Successfully!</h2>
            
            <div className="flex justify-center my-6">
                <span className="bg-[#D1944B] text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2">
                    <span className="text-[#FFF690]">●</span> Pending Approval
                </span>
            </div>
            
            <p className="text-gray-500 text-sm mb-8 leading-relaxed">
                Your capstone has been submitted for approval. You will receive an email notification once the review is complete.
            </p>

            <div className="flex items-center justify-center gap-3 mb-10">
                <div className="flex items-center gap-1 text-green-600 text-xs font-bold">
                    <div className="w-5 h-5 bg-green-600 rounded-full flex items-center justify-center text-white text-[10px]">✓</div> Submitted
                </div>
                <div className="w-8 h-px bg-gray-300"></div>
                <div className="flex items-center gap-1 text-[#D1944B] text-xs font-bold">
                    <div className="w-3 h-3 bg-[#D1944B] rounded-full"></div> Under Review
                </div>
                <div className="w-8 h-px bg-gray-300"></div>
                  <div className="flex items-center gap-1 text-gray-300 text-xs font-bold">
                  <div className="w-5 h-5 border-2 border-gray-300 rounded-full flex items-center justify-center bg-white">
                      <img 
                          src="https://img.icons8.com/material-rounded/24/cccccc/checkmark.png" 
                          alt="check" 
                          className="w-3 h-3" 
                      />
                  </div> 
                  Approved
              </div>
            </div>

            <button 
                onClick={() => { setIsSuccessModalOpen(false); setView('dashboard'); }}
                className="text-purple-600 font-bold hover:underline cursor-pointer"
            >
                ← Back to My Capstone Project Dashboard
            </button>
        </div>
    </div>
)}

      {/* FOOTER */}
      <footer className="py-3 mt-10 text-white bg-linear-to-r from-[#CD9EFF] via-[#7A55A3] to-[#4D0699]">
        <div className="px-6 mx-auto text-center max-w-7xl">
          <p className="text-sm md:text-base poppins-regular">IT Capstone Repository System © 2025 College of Information Technology - All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}