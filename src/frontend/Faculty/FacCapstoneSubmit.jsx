import { useState, useRef, useEffect } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { MagnifyingGlassIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import V9Gradient from "../../assets/images/V9.svg";

export default function FacCapstoneSubmit() {
  const navigate = useNavigate();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState(""); 
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const notifRef = useRef(null);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });

  // notifications state
  const [notifications, setNotifications] = useState([
    { id: "CP001", text: "New Submission: Alwyn Nabor has uploaded their final paper for AgriLearn.", time: "10 minutes ago", type: "upload", isRead: false },
    { id: "CP002", text: "Alwyn Nabor submitted a paper for review.", time: "10 minutes ago", type: "review", isRead: false },
    { id: "CP003", text: "New Submission: Alwyn Nabor has uploaded their final paper for Project Alpha.", time: "10 minutes ago", type: "upload", isRead: false },
    { id: "CP004", text: "System Update: New review guidelines applied.", time: "15 minutes ago", type: "system", isRead: false },
    { id: "CP005", text: "New Submission: Alwyn Nabor uploaded Chapter 5.", time: "20 minutes ago", type: "upload", isRead: false },
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

  const handleNotificationClick = (id) => {
  const readNotifs = JSON.parse(localStorage.getItem("readNotifs")) || [];
  if (!readNotifs.includes(id)) {
    localStorage.setItem("readNotifs", JSON.stringify([...readNotifs, id]));
  }
  navigate(`/review/${id}`);
  setIsNotifOpen(false);
``};

  const clearNotifications = () => {
    setNotifications([]);
  };

  const handleDelete = () => {
    setDeleteModal({ isOpen: false, id: null });
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setIsNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [capstones] = useState(
    Array(32).fill({
        id: "CP001",
        title: "Capstone Project Title",
        author: "Surname et al.",
        category: "Mobile Application",
        date: "01-06-26",
        status: "Pending",
      })
      .map((item, i) => ({
        ...item,
        status: i % 3 === 0 ? "Revised" : i % 3 === 1 ? "Pending" : "Approved",
        id: `CP00${i + 1}`,
      }))
  );

  const filteredCapstones = capstones.filter(c => 
    (filter === "All" || c.status === filter) &&
    (c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
     c.id.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; 
  const totalPages = Math.ceil(filteredCapstones.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCapstones.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    setCurrentPage(1);
  }, [filter, searchQuery]);

  return (
    <div className="min-h-screen bg-[#F3F3F3] font-poppins">
      <Navbar logout={() => setIsLogoutModalOpen(true)} />

      {/* notification */}
      <div className="fixed top-4 right-8 z-50">
        <button
          onClick={() => setIsNotifOpen(!isNotifOpen)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
        >
          <img src="/notification.png" alt="Notifications" className="w-7 h-8" />
          {notifications.some((n) => !n.isRead) && (
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          )}
        </button>

        {isNotifOpen && (
          <div
            ref={notifRef}
            className="absolute right-0 mt-4 w-[400px] bg-white rounded-[2rem] shadow-2xl border border-gray-100 overflow-hidden z-50"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Notifications</h2>
                <img src="/notification.png" alt="Notifications" className="w-7 h-8" />
              </div>
              <hr className="border-gray-400 mb-2" />

              <div
                className="max-h-[380px] overflow-y-auto no-scrollbar"
                style={{
                  msOverflowStyle: "none",
                  scrollbarWidth: "none",  
                }}
              >
                <style>{`
                  .no-scrollbar::-webkit-scrollbar {
                    display: none;
                  }
                `}</style>

                {notifications.length > 0 ? (
                  notifications.map((n, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleNotificationClick(n.id, idx)}
                      className={`flex gap-4 p-4 cursor-pointer transition-colors border-b border-gray-100 last:border-0 
                        ${n.isRead ? "bg-white" : "bg-[#E9E9E9] hover:bg-gray-200"}`}
                    >
                      <div className="rounded-lg h-fit flex items-center justify-center">
                        <img src="/doc.png" alt="File" className="w-12 h-12 object-contain" />
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm ${!n.isRead ? "font-bold text-gray-800" : "text-gray-600"}`}>
                          {n.text}
                        </p>
                        <p className="text-right text-[10px] text-gray-400 italic mt-1">{n.time}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-10 text-center text-gray-400 italic">No notifications</div>
                )}
              </div>

              {notifications.length > 0 && (
                <>
                  <hr className="border-gray-400 mt-2" />
                  <button
                    onClick={clearNotifications}
                    className="w-full py-3 text-gray-700 font-bold text-lg hover:bg-red-50 transition-colors mt-2"
                  >
                    Clear All Notifications
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      <main className="max-w-[1400px] mx-auto px-8 pt-28 pb-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Capstone Submission</h1>

        {/* filters and search */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <span className="font-bold text-lg">Filter:</span>
            <div className="flex gap-2">
              {["Pending", "Revised", "Approved"].map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(filter === f ? "All" : f)}
                  className={`px-6 py-1 rounded-md border transition-all text-sm ${
                    filter === f ? "bg-purple-600 text-white border-purple-600" : "bg-white border-gray-300 text-gray-600"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="relative w-80">
            <input
              type="text"
              placeholder="Search capstone..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 pl-4 pr-10"
            />
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute right-4 top-2.5" />
          </div>
        </div>

        {/* table */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-200 overflow-hidden px-8 py-6">
          <table className="min-w-full">
            <thead>
              <tr className="text-gray-800 text-xl font-bold">
                <th className="pb-6 px-4 text-left">Capstone ID</th>
                <th className="pb-6 px-4 text-center">Title</th>
                <th className="pb-6 px-4 text-center">Author</th>
                <th className="pb-6 px-13 text-left">Category</th>
                <th className="pb-6 px-8 text-left">Date</th>
                <th className="pb-6 px-8 text-left">Status</th>
                <th className="pb-6 px-4 text-center">Action</th>
              </tr>
            </thead>
                <tbody className="text-gray-600 text-lg">
                {filteredCapstones.length > 0 ? (
                    currentItems.map((c, idx) => (
                    <tr key={idx} className={`${idx % 2 !== 0 ? 'bg-[#F9F9F9]' : 'bg-white'}`}>
                        <td className="py-3 px-12 text-left">{c.id}</td>
                        <td className="py-3 px-4 text-center">{c.title}</td>
                        <td className="py-3 px-4 text-center">{c.author}</td>
                        <td className="py-3 px-3 text-center">{c.category}</td>
                        <td className="py-3 px-3 text-center">{c.date}</td>
                        <td
                            className="py-3 px-4 text-center"
                            style={{
                                color:
                                c.status === "Pending"
                                    ? "#C8BB00"
                                    : c.status === "Revised"
                                    ? "#0700C8"
                                    : "#00B212"
                            }}
                            >
                            {c.status}
                        </td>
                       <td className="py-3 px-4">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => navigate(`/review/${c.id}`)}
                            className="p-1 border border-gray-300 rounded hover:bg-gray-100"
                          >
                            <img src="/view.png" alt="View" className="w-5 h-5" />
                          </button>

                          <button 
                            onClick={() => setDeleteModal({ isOpen: true, id: c.id })} 
                            className="p-1.5 bg-[#E33636] rounded hover:bg-[#BC1E1E] transition-colors">
                            <img src="/delete.png" alt="Delete" className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                    ))
                ) : (
                    <tr>
                    <td colSpan={7} className="py-6 text-center text-gray-500 italic">
                        No capstone found
                    </td>
                    </tr>
                )}
                </tbody>
          </table>
        </div>

        {/* pagination */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`p-1 rounded text-white transition-colors ${
                currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-[#754BA1] hover:bg-[#5a3a7d] cursor-pointer"
              }`}
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>

            <span className="text-gray-700 font-medium">
              {totalPages === 0 ? "0 of 0" : `${currentPage} of ${totalPages}`}
            </span>

            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages || totalPages === 0}
              className={`p-1 rounded text-white transition-colors ${
                currentPage === totalPages || totalPages === 0 
                  ? "bg-gray-300 cursor-not-allowed" 
                  : "bg-[#754BA1] hover:bg-[#5a3a7d] cursor-pointer"
              }`}
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>
          </div>
      </main>

      {/* del confirmation */}
      {deleteModal.isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-md p-10 relative animate-in fade-in zoom-in duration-200">
      <button 
        onClick={() => setDeleteModal({ isOpen: false, id: null })} 
        className="absolute right-8 top-6 text-black-400 hover:text-black-600 transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="text-center">
        <div className="bg-red-100 w-18 h-18 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>

        <p className="text-black-500 mb-10 leading-relaxed text-[18px]">
          Do you want to delete capstone <span className="font-bold text-black-800">{deleteModal.id}</span>? This action cannot be undone.
        </p>

        <div className="flex justify-center gap-10 items-center">
          <button 
            onClick={() => setDeleteModal({ isOpen: false, id: null })}
            className="text-gray-400 font-bold tracking-widest hover:text-gray-600 text-sm uppercase transition-colors"
          >
            CANCEL
          </button>
          <button 
            onClick={handleDelete}
            className="bg-red-600 text-white px-10 py-2.5 rounded-xl font-bold tracking-widest text-sm shadow-lg hover:bg-red-700 transition-all active:scale-95 uppercase"
          >
            DELETE
          </button>
        </div>
      </div>
    </div>
  </div>
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
                    navigate('/facultyLogIn');
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

       {/* Footer */}
            <footer className="py-3 mt-auto text-white bg-linear-to-r from-[#CD9EFF] via-[#7A55A3] to-[#4D0699]">
                <div className="px-6 mx-auto text-center max-w-7xl">
                    <p className="text-sm md:text-base">
                        IT Capstone Repository System © 2025 College of Information Technology - All Rights Reserved.
                    </p>
                </div>
            </footer>
            
    </div>
  );
}