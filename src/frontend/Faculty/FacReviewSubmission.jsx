import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { 
  MagnifyingGlassIcon, 
  SparklesIcon,
  XMarkIcon 
} from "@heroicons/react/24/outline";

const CommentField = ({ initialValue, onSave, onCancel }) => {
  const [localText, setLocalText] = useState(initialValue);
  return (
    <>
      <textarea 
        autoFocus
        value={localText}
        onChange={(e) => setLocalText(e.target.value)}
        className="w-full h-64 p-5 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-purple-500 outline-none resize-none mb-8 text-gray-700"
        placeholder="Enter your comment here..."
      />
      <div className="flex justify-center gap-12 items-center">
        <button onClick={onCancel} className="text-gray-400 font-bold tracking-widest hover:text-gray-600 text-sm">CANCEL</button>
        <button onClick={() => onSave(localText)} className="bg-[#6B46C1] text-white px-8 py-2.5 rounded-xl font-bold tracking-widest text-sm shadow-lg hover:bg-[#5a3aa5]">NOTIFY STUDENT</button>
      </div>
    </>
  );
};

export default function FacReviewSubmission() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // --- notification states ---
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const notifRef = useRef(null);
  const [notifications, setNotifications] = useState([
    { id: "CP001", text: "New Submission: Alwyn Nabor has uploaded their final paper for AgriLearn.", time: "10 minutes ago", isRead: false },
    { id: "CP002", text: "Alwyn Nabor submitted a paper for review.", time: "10 minutes ago", isRead: false },
    { id: "CP003", text: "New Submission: Alwyn Nabor has uploaded their final paper for [Project Name].", time: "10 minutes ago", isRead: false },
    { id: "CP004", text: "System Update: New review guidelines applied.", time: "15 minutes ago", isRead: false },
    { id: "CP005", text: "New Submission: Maria Clara uploaded Chapter 5.", time: "20 minutes ago", isRead: false },
  ]);

    useEffect(() => {
    const readNotifs = JSON.parse(localStorage.getItem("readNotifs")) || [];
    setNotifications((prev) =>
        prev.map((n) => ({
        ...n,
        isRead: readNotifs.includes(n.id),
        }))
    );
    }, []);

  // --- review states ---
  const [comment, setComment] = useState("");
  const [activeModal, setActiveModal] = useState(null); 
  const isFullscreenView = location.pathname.endsWith("/view");
  const [isClicked, setIsClicked] = useState(location.pathname.includes("version"));

  // --- notification ---
  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setIsNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNotificationClick = (notifId, index) => {
    const updatedNotifs = [...notifications];
    updatedNotifs[index].isRead = true;
    setNotifications(updatedNotifs);
    setIsNotifOpen(false);
    navigate(`/review/${notifId}`);
  };

  const capstones = [
    {
      id: "CP001",
      title: "AgriLearn: A Web-based Production Planning System for High-Value Crops",
      author: "Alipante et. al.",
      category: "Web App",
      status: "Pending",
      date: "January 3, 2026",
      version: "4",
      abstract: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. . Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos."
    },
  ];

  const currentCapstone = capstones.find(c => c.id === id) || capstones[0];

  const [showAISummary, setShowAISummary] = useState(false);

  const revisionHistory = [
    { version: "Version 1", title: `${currentCapstone.title} (Chapter 1 - 2)`, date: "12-01-25" },
    { version: "Version 2", title: `${currentCapstone.title} (Chapter 3)`, date: "12-16-25" },
    { version: "Version 3", title: `${currentCapstone.title} (Chapter 4)`, date: "01-2-26" },
    { version: "Version 4", title: `${currentCapstone.title} (Chapter 1 - 2)`, date: "12-01-25" },
    { version: "Version 5", title: `${currentCapstone.title} (Chapter 3)`, date: "12-16-25" },
    { version: "Version 6", title: `${currentCapstone.title} (Chapter 4)`, date: "01-2-26" },
  ];

  const Modal = ({ children, onClose }) => (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-xl p-10 relative animate-in fade-in zoom-in duration-200">
        <button onClick={onClose} className="absolute right-8 top-5 text-gray-400 hover:text-gray-600 transition-colors">
          <XMarkIcon className="w-7 h-7" />
        </button>
        {children}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F3F3F3] font-poppins flex flex-col relative">
      <Navbar logout={() => setIsLogoutModalOpen(true)} />

      <div className="fixed top-4 right-8 z-50">
        <button onClick={() => setIsNotifOpen(!isNotifOpen)} className="p-2 hover:bg-gray-100 rounded-full transition-colors relative">
          <img src="/notification.png" alt="Notifications" className="w-7 h-8" />
          {notifications.some(n => !n.isRead) && (
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          )}
        </button>

        {isNotifOpen && (
  <div ref={notifRef} className="absolute right-0 mt-4 w-[400px] bg-white rounded-[2rem] shadow-2xl border border-gray-100 overflow-hidden">
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Notifications</h2>
        <img src="/notification.png" alt="Notifications" className="w-7 h-8" />
      </div>
      <hr className="border-gray-400 mb-2" />
      
        <div 
            className="max-h-[360px] overflow-y-auto hide-scrollbar"
            style={{
            msOverflowStyle: 'none', 
            scrollbarWidth: 'none',   
            }}
        >
            <style>{`
            .hide-scrollbar::-webkit-scrollbar {
                display: none;
            }
            `}</style>

            {notifications.map((n, idx) => (
            <div 
                key={idx} 
                onClick={() => handleNotificationClick(n.id, idx)} 
                className={`flex gap-4 p-4 cursor-pointer transition-colors border-b border-gray-100 last:border-0 ${
                n.isRead ? 'bg-white' : 'bg-[#E9E9E9] hover:bg-gray-200'
                }`}
            >
                <div className="rounded-lg h-fit flex items-center justify-center">
                <img src="/doc.png" alt="File" className="w-12 h-12 object-contain" />
                </div>
                <div className="flex-1">
                <p className={`text-sm ${!n.isRead ? 'font-bold text-gray-800' : 'text-gray-600'}`}>
                    {n.text}
                </p>
                <p className="text-right text-[10px] text-gray-400 italic mt-1">{n.time}</p>
                </div>
            </div>
            ))}
        </div>

        <hr className="border-gray-400 mt-2" />
        <button 
            onClick={() => setNotifications([])} 
            className="w-full py-3 text-gray-700 font-bold text-lg hover:bg-red-50 transition-colors mt-2"
        >
            Clear All Notifications
        </button>
        </div>
    </div>
    )}
      </div>

      <main className="max-w-[1400px] mx-auto w-full px-8 pt-28 pb-12 flex-grow">
        
        {isFullscreenView ? (
           <nav className="flex text-sm text-gray-500 mb-6 gap-2 items-center">
             <span className="cursor-pointer hover:underline" onClick={() => navigate(-1)}>Capstone Submission</span>
             <span className="text-gray-400">&gt;</span>
             <span className="cursor-pointer hover:underline" onClick={() => navigate(-1)}>Review Submission</span>
             <span className="text-gray-400">&gt;</span>
             <span className="font-semibold text-gray-800 line-clamp-1">{currentCapstone.title}</span>
           </nav>
        ) : (
           <h1 className="text-3xl font-bold text-gray-800 mb-6">Review Submission</h1>
        )}

        {/* filter and search */}
        {!isFullscreenView && (
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <span className="font-bold text-lg">Filter:</span>
              <div className="flex gap-2">
                {["Pending", "Revised", "Approved"].map((f) => (
                  <button
                    key={f}
                    className={`px-6 py-1 rounded-md border transition-all text-sm font-medium ${currentCapstone.status === f ? "bg-[#4D0699] text-white border-[#4D0699]" : "bg-white border-gray-300 text-gray-600"}`}
                  >{f}</button>
                ))}
              </div>
            </div>
            <div className="relative w-80">
              <input type="text" placeholder="Search capstone..." className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 pl-4 pr-10" />
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute right-4 top-2.5" />
            </div>
          </div>
        )}

        <div className={`bg-white rounded-[2rem] shadow-sm border border-gray-200 overflow-hidden ${isFullscreenView ? 'p-8 md:p-12' : 'p-10 flex flex-col md:flex-row gap-10'}`}>
          <div className="flex-1 space-y-6">
            <div>
              <h2 className={`font-bold text-gray-900 leading-tight ${isFullscreenView ? 'text-3xl -mt-3' : 'text-2xl'}`}>
                {currentCapstone.title} {!isFullscreenView && `(Version ${currentCapstone.version})`}
              </h2>
              <div className="space-y-1 mt-5 text-lg">
                <p><span className="font-bold">Authors:</span> {currentCapstone.author}</p>
                <p><span className="font-bold">{isFullscreenView ? 'Submission Date:' : 'Date Submitted:'}</span> {currentCapstone.date}</p>
              </div>
            </div>
            <div className="flex gap-2 -mt-3"><span className="px-4 py-1 bg-[#A16FD6] text-[#FFFFFF] rounded-full text-xs font-semibold">{currentCapstone.category}</span></div>
            
            <div className="flex gap-2 text-sm font-medium text-black-600 -mt-3">
                <button className="flex items-center gap-2 transition-colors font-bold">
                    <span>Cite</span><img src="/cite.png" alt="Cite" className="w-3 h-3 object-contain" />
                </button>
                <img src="/line.png" alt="" className="h-5 w-1 object-contain" />
                <button className="flex items-center gap-2 transition-colors font-bold">
                    <span>Share</span><img src="/share.png" alt="Share" className="w-4 h-4 object-contain" />
                </button>
                <img src="/line.png" alt="" className="h-5 w-1 object-contain" />
                <button className="flex items-center gap-2 transition-colors font-bold">
                    <span>Bookmark</span><img src="/bookmark.png" alt="Bookmark" className="w-5 h-5 object-contain" />
                </button>
            </div>

            <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            
                <h3 className="text-2xl font-bold text-black-900 uppercase tracking-wide mt-3">
                {showAISummary ? "AI Summary" : "Abstract"}
                </h3>
                
                {isFullscreenView && (
                <button className="bg-[#8A2BE2] hover:bg-[#7324BD] text-white px-8 py-2 rounded-lg font-bold shadow-md cursor-pointer">
                    Download PDF
                </button>
                )}
            </div>

            <p className="text-black-600 text-justify leading-relaxed">
                {showAISummary 
                ? "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. . Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos."
                : currentCapstone.abstract
                }
            </p>
            </div>

            {!isFullscreenView && (
            <div className="flex gap-4 pt-4">
                <button onClick={() => navigate(`${location.pathname}/view`)} style={{ background: 'linear-gradient(to bottom, #AE49D3, #820DAC, #500F68)' }} className="px-8 py-2 text-white rounded-lg font-bold hover:opacity-90 transition-all shadow-md cursor-pointer">View Fullscreen</button>
                <button style={{ background: 'linear-gradient(to bottom, #AE49D3, #820DAC, #500F68)' }} className="px-8 py-2 text-white rounded-lg font-bold hover:opacity-90 transition-all shadow-md cursor-pointer">Download PDF</button>
            </div>
            )}

            {isFullscreenView && (
                <button 
                    onClick={() => setShowAISummary(!showAISummary)}
                    style={{ 
                    background: 'linear-gradient(to right, #AE49D3, #500F68)',
                    cursor: 'pointer' }} 
                    className="mt-12 px-8 py-3 text-white rounded-full font-bold flex items-center gap-2 shadow-lg hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)] /* Deep custom shadow */hover:scale-105 active:scale-95 transition-all duration-300 ease-in-outtransform">
                    {showAISummary ? (<><span>Show Abstract</span> <SparklesIcon className="w-5 h-5" /></>) : (<><span>Generate AI Summary</span><SparklesIcon className="w-5 h-5" /></>)}
                </button>
                )}
          </div>

          {!isFullscreenView && (
            <>
              <div className="hidden md:block w-px bg-gray-200"></div>
              <div className="flex-1 space-y-8">
                <div>
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <h3 className="text-2xl font-bold text-gray-800">Reviews and Feedback</h3>
                    <span className="text-red-500 text-2xl font-bold">*</span>
                  </div>
                  <textarea 
                    readOnly
                    onClick={() => setActiveModal('comment')}
                    value={comment}
                    placeholder="Enter your comment here..." 
                    className="w-full h-48 p-4 border border-gray-300 rounded-xl bg-white focus:outline-none cursor-pointer resize-none"
                  ></textarea>
                  <div className="flex justify-between items-center mt-3">
                    <div className="flex gap-4">
                        <button onClick={() => setActiveModal('approve')} style={{ background: 'linear-gradient(to bottom, #44C267, #07A42E, #094C12)' }} className="px-6 py-2 text-white rounded-lg font-bold hover:opacity-90 shadow-md text-sm cursor-pointer">Approve Submission</button>
                        <button onClick={() => setActiveModal('revision')} style={{ background: 'linear-gradient(to bottom, #AE49D3, #820DAC, #500F68)' }} className="px-6 py-2 text-white rounded-lg font-bold hover:opacity-90 shadow-md text-sm cursor-pointer">Request Revision</button>
                    </div>
                    <button onClick={() => setActiveModal('reject')} style={{ background: 'linear-gradient(to bottom, #FF4242, #BC1E1E, #5D0000)' }} className="px-10 py-2 text-white rounded-lg font-bold hover:opacity-90 shadow-md text-sm cursor-pointer">Reject</button>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-black-800 mb-4">Revision History</h3>
                  <div className="border border-gray-300 rounded-[1.2rem] overflow-hidden bg-white shadow-sm">
                    <div className="max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                      {revisionHistory.length > 0 ? (
                        revisionHistory.map((rev, i) => (
                          <div 
                            key={i} 
                            className={`flex items-center px-6 py-3 border-b border-gray-200 last:border-b-0 transition-all ${i % 2 === 0 ? "bg-[#EEEEEE]" : "bg-white"}`}>
                            <div className="w-1/4 font-bold text-black-800 text-sm">{rev.version}</div>
                            <div className="w-2/4 text-black-600 font-semibold text-xs leading-tight pr-4">{rev.title}</div>
                            <div className="w-1/4 text-gray-500 italic text-right text-[10px] font-medium">{rev.date}</div>
                          </div>
                        ))
                      ) : (
                        <div className="p-6 text-center text-gray-500 italic">No revision history found for this project.</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      {/* modals */}
      {activeModal === 'comment' && (
        <Modal onClose={() => setActiveModal(null)}>
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Comments for Revisions</h3>
          <CommentField initialValue={comment} onSave={(val) => { setComment(val); setActiveModal(null); }} onCancel={() => setActiveModal(null)} />
        </Modal>
      )}

      {(activeModal === 'approve' || activeModal === 'revision' || activeModal === 'reject') && (
        <Modal onClose={() => setActiveModal(null)}>
          <div className="text-center pt-4">
            <h3 className="text-2xl font-bold text-gray-800 mb-12 px-4 leading-tight">
              {activeModal === 'approve' && "Are you sure you want to approve the paper?"}
              {activeModal === 'revision' && `Are you sure you want to Request Revision for "${currentCapstone.title}"?`}
              {activeModal === 'reject' && "Are you sure you want to Reject the paper?"}
            </h3>
            <div className="flex justify-center gap-12 items-center">
              <button onClick={() => setActiveModal(null)} className="text-gray-400 font-bold tracking-widest hover:text-gray-600 text-sm uppercase">CANCEL</button>
              <button
                onClick={() => {
                    setActiveModal(null);
                }}
                className="bg-[#6B46C1] text-white px-10 py-2.5 rounded-xl font-bold tracking-widest text-sm shadow-lg hover:bg-[#5a3aa5] uppercase"
                >
                {activeModal === 'approve'
                    ? 'APPROVE'
                    : activeModal === 'revision'
                    ? 'REQUEST REVISION'
                    : 'REJECT'}
                </button>
            </div>
          </div>
        </Modal>
      )}

      {isLogoutModalOpen && (
              <div 
                className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm"
                onClick={() => setIsLogoutModalOpen(false)}
              >
                <div 
                  className="w-full max-w-md p-8 bg-white shadow-2xl rounded-[2rem]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-center mb-4">
                    <div className="flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full">
                      <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                  </div>
                  <h2 className="mb-2 text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-600 to-purple-800">Confirm Logout</h2>
                  <p className="mb-6 text-center text-gray-600">Are you sure you want to logout?</p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setIsLogoutModalOpen(false)}
                      className="flex-1 px-4 py-2 text-gray-700 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50 font-bold"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        setIsLoggingOut(true);
                        setIsLogoutModalOpen(false);
                        setTimeout(() => {
                          navigate('/');
                        }, 1500);
                      }}
                      className="flex-1 px-4 py-2 text-white transition-colors bg-purple-600 rounded-lg hover:bg-purple-700 font-bold"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            )}
      
            {isLoggingOut && (
              <div className="fixed inset-0 flex items-center justify-center min-h-screen z-[120]">
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
                      <span className="block text-2xl font-bold text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text">Logging out...</span>
                      <span className="block text-sm text-gray-500">Redirecting to login page</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

      <footer className="py-3 mt-auto text-white bg-gradient-to-r from-[#CD9EFF] via-[#7A55A3] to-[#4D0699]">
        <div className="px-6 mx-auto text-center max-w-7xl">
          <p className="text-sm md:text-base">IT Capstone Repository System © 2025 College of Information Technology – All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}