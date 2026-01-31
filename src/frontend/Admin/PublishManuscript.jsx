import { useState, useEffect, useRef } from 'react'; 
import { useNavigate, useLocation } from 'react-router-dom';
import AdminSidebar from './AdminSidebar'

export default function PublishManuscript() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const capstone = state?.capstone || { title: "Untitled Manuscript" };

  const [step, setStep] = useState(1);
  const [category, setCategory] = useState('');
  const [selectedFile, setSelectedFile] = useState(null); 
  const [progress, setProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const fileInputRef = useRef(null); 

  useEffect(() => {
    let interval;
    if (isProcessing && progress < 100) {
      interval = setInterval(() => {
        setProgress((prev) => {
          const nextValue = prev + 5;
          if (nextValue >= 100) {
            clearInterval(interval);
            setIsProcessing(false);
            return 100;
          }
          return nextValue;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isProcessing, progress]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleStartStep2 = () => {
    if (!category || !selectedFile) return alert("Please upload a file and select a category.");
    setStep(2);
  };

  const handleFinalPublish = () => {
    setShowConfirmModal(false);
    setShowSuccessModal(true);
  };

  const categories = [
    "Web Application",
    "Mobile Application",
    "IoT (Internet of Things)",
    "Artificial Intelligence",
    "Machine Learning",
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      <AdminSidebar />

      <main className="flex-1 p-8 ml-20 bg-gray-50 min-h-screen mb-5">
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-600 to-purple-800">Publish</span>{' '}
            <span className="text-gray-900">Manuscript</span>
          </h1>
          <p className="text-gray-500 text-lg mt-2">Complete the steps below to finalize and publish the capstone.</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">

          {/* STEP 1: UPLOAD & CATEGORY */}
          <section className={`bg-white p-8 rounded-[32px] border transition-all ${step === 1 ? 'border-purple-500 shadow-md' : 'border-gray-200 opacity-60'}`}>
            <div className="flex gap-6">
              <div className="w-10 h-10 rounded-full bg-purple-700 text-white flex items-center justify-center font-bold shrink-0">1</div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-black-800 mb-2">Step 1: Upload & Categorize</h2>
                <p className="text-black-500 text-sm mb-6">Upload the final manuscript file and select the most appropriate category based on the manuscript’s keywords and scope.</p>
                
                <div className="max-w-xl space-y-6">
                 
                  <div>
                    <label className="block text-sm font-bold text-black-700 mb-2">
                      Upload Manuscript (PDF/DOCX) <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="file" 
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden" 
                      accept=".pdf,.docx"
                    />
                    <div 
                      onClick={() => step === 1 && fileInputRef.current.click()}
                      className={`group border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center transition-all cursor-pointer
                        ${selectedFile ? 'border-emerald-500 bg-emerald-50' : 'border-gray-300 hover:border-purple-400 bg-gray-50'}
                        ${step !== 1 ? 'cursor-not-allowed opacity-50' : ''}`}
                    >
                      <svg className={`w-8 h-8 mb-2 ${selectedFile ? 'text-emerald-600' : 'text-gray-400 group-hover:text-purple-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <span className="text-sm font-medium text-gray-600">
                        {selectedFile ? selectedFile.name : "Click to upload or drag and drop"}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-black-700 mb-2">
                      Capstone Category <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        disabled={step !== 1}
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none appearance-none cursor-pointer text-gray-600 font-medium focus:ring-2 focus:ring-purple-500 transition-all"
                      >
                        <option value="" disabled>Select a category...</option>
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                      </div>
                    </div>
                  </div>
                </div>

                {step === 1 && (
                  <div className="flex justify-end mt-8">
                    <button 
                      onClick={handleStartStep2}
                      disabled={!category || !selectedFile}
                      className="bg-purple-700 text-white px-10 py-3 rounded-xl font-bold hover:bg-purple-800 transition-all disabled:bg-gray-200 disabled:text-gray-400 cursor-pointer"
                    >
                      Continue
                    </button>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* STEP 2: PROCESS CONTENT */}
          <section className={`bg-white p-6 rounded-[32px] border transition-all ${step === 2 ? 'border-purple-500 shadow-md' : 'border-gray-200 opacity-60'}`}>
            <div className="flex gap-6">
              <div className="w-10 h-10 rounded-full bg-purple-700 text-white flex items-center justify-center font-bold shrink-0">2</div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-black-800 mb-2">Step 2: Process Capstone Content</h2>
                <p className="text-black-500 text-sm mb-6">This process analyzes the manuscript and generates embeddings.</p>
                
                <div className="flex justify-between text-sm font-bold mb-2">
                  <span className="text-black-800">
                    {progress === 0 ? 'Ready to process' : progress < 100 ? 'Processing manuscript...' : 'Processing Complete'}
                  </span>
                  <span className="text-black-400">{progress}%</span>
                </div>
                
                <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden mb-4">
                  <div className="bg-emerald-500 h-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                </div>

                {step === 2 && (
                  <div className="flex justify-end mt-4">
                    {progress < 100 ? (
                      <button 
                        onClick={() => setIsProcessing(true)} 
                        disabled={isProcessing}
                        className="bg-purple-700 text-white px-8 py-3 rounded-xl font-bold hover:bg-purple-800 transition-all cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed"
                      >
                        {isProcessing ? 'Processing...' : 'Process Capstone'}
                      </button>
                    ) : (
                      <button 
                        onClick={() => setStep(3)} 
                        className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-all cursor-pointer shadow-lg shadow-emerald-100 flex items-center gap-2"
                      >
                        Done Processing
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* STEP 3: PUBLISH */}
          <section className={`bg-white p-6 rounded-[32px] border transition-all ${step === 3 ? 'border-purple-500 shadow-md' : 'border-gray-200 opacity-60'}`}>
            <div className="flex gap-6">
              <div className="w-10 h-10 rounded-full bg-purple-700 text-white flex items-center justify-center font-bold shrink-0">3</div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-black-800 mb-2">Step 3: Publish Capstone</h2>
                <p className="text-black-500 text-sm mb-6">Publishing will make this capstone publicly accessible in the repository.</p>
                <div className="flex gap-4">
                  <input 
                    type="text" 
                    disabled 
                    placeholder={selectedFile ? `Final Manuscript: ${selectedFile.name}` : "Please complete steps 1 and 2 before publishing"} 
                    className="flex-1 p-3 text-black-300 bg-gray-50 border border-gray-200 rounded-xl text-sm italic" 
                  />
                  <button 
                    disabled={step !== 3}
                    onClick={() => setShowConfirmModal(true)}
                    className={`cursor-pointer px-10 py-3 rounded-xl font-bold transition-all ${step === 3 ? 'bg-purple-700 text-white hover:bg-purple-800 shadow-lg' : 'bg-gray-200 text-black-400'}`}
                  >
                    Publish
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* --- CONFIRM MODAL --- */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[32px] p-12 max-w-lg w-full text-center shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">Are you sure you want to publish the capstone?</h3>
            <p className="text-black-400 mb-10 font-medium">This action is final and cannot be undone.</p>
            <div className="flex justify-center items-center gap-10">
              <button onClick={() => setShowConfirmModal(false)} className="text-gray-400 font-bold tracking-widest text-sm hover:text-gray-600 cursor-pointer">CANCEL</button>
              <button onClick={handleFinalPublish} className="bg-purple-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-purple-700 shadow-lg cursor-pointer">Confirm & Publish</button>
            </div>
          </div>
        </div>
      )}

      {/* --- SUCCESS MODAL --- */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[32px] p-12 max-w-lg w-full text-center shadow-2xl">
            <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
               <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">Published successfully!</h3>
            <p className="text-black-400 mb-8 font-medium">An email notification has been sent to the author.</p>
            <button onClick={() => navigate('/admin/manuscript-uploads')} className="text-purple-600 font-bold flex items-center justify-center gap-2 mx-auto hover:underline cursor-pointer">
               ← Back to Manuscript Uploads List
            </button>
          </div>
        </div>
      )}
    </div>
  );
}