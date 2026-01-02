import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import V9Gradient from "../../assets/images/V9.svg"

export default function CapstoneProjects() {
  const navigate = useNavigate()
  const [isChoiceModalOpen, setIsChoiceModalOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [uploadType, setUploadType] = useState(null) // 'manual' or 'bulk'
  const [currentPage, setCurrentPage] = useState(1)
  const [filterType, setFilterType] = useState('All')
  const [categoryFilter, setCategoryFilter] = useState('Category')
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [uploadedFile, setUploadedFile] = useState(null)
  const [bulkFiles, setBulkFiles] = useState([])
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showErrorModal, setShowErrorModal] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [deleteItem, setDeleteItem] = useState(null)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  
  // Sample data
  const [capstones, setCapstones] = useState([
    { id: 'CP001', title: 'Capstone Title', author: 'Surname et al.', category: 'Mobile Application', year: '2021' },
    { id: 'CP002', title: 'Capstone Title', author: 'Surname et al.', category: 'Mobile Application', year: '2021' },
    { id: 'CP003', title: 'Capstone Title', author: 'Surname et al.', category: 'Web Application', year: '2022' },
    { id: 'CP004', title: 'Capstone Title', author: 'Surname et al.', category: 'IoT', year: '2021' },
    { id: 'CP005', title: 'Capstone Title', author: 'Surname et al.', category: 'Networking', year: '2023' },
  ])

  const [formData, setFormData] = useState({
    id: '',
    title: '',
    author: '',
    category: '',
    year: '',
    file: null
  })

  const itemsPerPage = 5

    useEffect(() => {
    // Add shimmer animation styles
    const style = document.createElement('style')
    style.textContent = `
      @keyframes shimmer {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
      }
      .animate-shimmer {
        animation: shimmer 2s infinite;
      }
      @keyframes slide-in {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      .animate-slide-in {
        animation: slide-in 0.3s ease-out;
      }
    `
    document.head.appendChild(style)

    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => {
      clearTimeout(timer)
      document.head.removeChild(style)
    }
  }, [])

  const handleAdd = () => {
    setFormData({ id: '', title: '', author: '', category: '', year: '', file: null })
    setUploadedFile(null)
    setBulkFiles([])
    setUploadType(null)
    setIsChoiceModalOpen(true)
  }

  const handleChoiceSelect = (type) => {
    setUploadType(type)
    setIsChoiceModalOpen(false)
    setIsModalOpen(true)
  }

  const handleBulkFileChange = (e) => {
    const files = Array.from(e.target.files)
    setBulkFiles(files)
  }


  const handleEdit = (capstone) => {
    setFormData({ ...capstone, file: null })
    setUploadedFile(null)
    setUploadType(null)
    setIsModalOpen(true)
  }

  // Check if form has input data
  const hasInputData = () => {
    if (uploadType === 'manual') {
      return formData.title || formData.author || formData.category || formData.year || uploadedFile
    } else if (uploadType === 'bulk') {
      return bulkFiles.length > 0
    } else {
      return formData.title || formData.author || formData.category || formData.year || uploadedFile
    }
  }

  const handleModalClose = () => {
    if (hasInputData()) {
      return // Prevent closing if there's input data
    }
    setIsModalOpen(false)
    setUploadType(null)
    setFormData({ id: '', title: '', author: '', category: '', year: '', file: null })
    setUploadedFile(null)
    setBulkFiles([])
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setUploadedFile(file)
      setFormData({ ...formData, file: file })
    }
  }

  const handleDelete = (id) => {
    const capstone = capstones.find(c => c.id === id)
    setDeleteItem({ id, title: capstone?.title || 'this capstone project', type: 'capstone' })
    setIsDeleteModalOpen(true)
  }

  const confirmDelete = () => {
    if (deleteItem) {
      setIsRefreshing(true)
      setIsDeleteModalOpen(false)
      setDeleteItem(null)
      
      // Simulate delete operation with skeleton loading
      setTimeout(() => {
        setCapstones(capstones.filter(c => c.id !== deleteItem.id))
        setIsRefreshing(false)
        setModalMessage('Capstone project deleted successfully!')
        setShowSuccessModal(true)
        setTimeout(() => setShowSuccessModal(false), 3000)
      }, 1000)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      setIsRefreshing(true)
      setIsModalOpen(false)
      
      // Simulate save operation with skeleton loading
      setTimeout(() => {
        if (formData.id) {
          // Edit existing
          setCapstones(capstones.map(c => c.id === formData.id ? { ...formData, file: uploadedFile ? uploadedFile.name : c.file } : c))
          setModalMessage('Capstone project updated successfully!')
        } else {
          // Add new
          const newId = `CP${String(capstones.length + 1).padStart(3, '0')}`
          setCapstones([...capstones, { ...formData, id: newId, file: uploadedFile ? uploadedFile.name : null }])
          setModalMessage('Capstone project added successfully!')
        }
        setFormData({ id: '', title: '', author: '', category: '', year: '', file: null })
        setUploadedFile(null)
        setUploadType(null)
        setIsRefreshing(false)
        setShowSuccessModal(true)
        setTimeout(() => setShowSuccessModal(false), 3000)
      }, 1000)
    } catch (error) {
      setIsRefreshing(false)
      setModalMessage('Failed to save capstone project. Please try again.')
      setShowErrorModal(true)
      setTimeout(() => setShowErrorModal(false), 3000)
    }
  }

  const handleBulkSubmit = (e) => {
    e.preventDefault()
    try {
      if (bulkFiles.length === 0) {
        setModalMessage('Please select files to upload.')
        setShowErrorModal(true)
        setTimeout(() => setShowErrorModal(false), 3000)
        return
      }
      // Handle bulk upload logic here
      console.log('Bulk files:', bulkFiles)
      setIsModalOpen(false)
      setBulkFiles([])
      setUploadType(null)
      setModalMessage('Files uploaded successfully!')
      setShowSuccessModal(true)
      setTimeout(() => setShowSuccessModal(false), 3000)
    } catch (error) {
      setModalMessage('Failed to upload files. Please try again.')
      setShowErrorModal(true)
      setTimeout(() => setShowErrorModal(false), 3000)
    }
  }

  const filteredCapstones = capstones.filter(capstone => {
    const matchesCategory = categoryFilter === 'Category' || capstone.category === categoryFilter
    const matchesSearch = !searchQuery || 
      capstone.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      capstone.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      capstone.author.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesCategory && matchesSearch
  })

  const totalFilteredPages = Math.ceil(filteredCapstones.length / itemsPerPage) || 1
  const paginatedCapstones = filteredCapstones.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  // Reset to page 1 when filters change
  useEffect(() => {
    if (currentPage > totalFilteredPages && totalFilteredPages > 0) {
      setCurrentPage(1)
    }
  }, [totalFilteredPages, currentPage])

  // Skeleton Components
  const SkeletonShimmer = ({ className = "" }) => (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-linear-to-r from-transparent via-white/60 to-transparent"></div>
    </div>
  )

  const SkeletonRow = () => (
    <tr className="border-b border-gray-100">
      {[1, 2, 3, 4, 5, 6].map((num) => (
        <td key={num} className="px-4 py-3">
          <div className="relative h-4 overflow-hidden rounded bg-linear-to-r from-gray-200 via-gray-100 to-gray-200">
            <SkeletonShimmer />
          </div>
        </td>
      ))}
    </tr>
  )

  const SkeletonControls = () => (
    <div className="flex flex-wrap items-center gap-4 mb-6">
      <div className="flex items-center gap-3">
        <div className="relative w-12 h-4 overflow-hidden rounded bg-linear-to-r from-gray-200 via-gray-100 to-gray-200">
          <SkeletonShimmer />
        </div>
        <div className="relative w-24 h-10 overflow-hidden rounded-lg bg-linear-to-r from-gray-200 via-gray-100 to-gray-200">
          <SkeletonShimmer />
        </div>
        <div className="relative w-32 h-10 overflow-hidden rounded-lg bg-linear-to-r from-gray-200 via-gray-100 to-gray-200">
          <SkeletonShimmer />
        </div>
      </div>
      <div className="flex items-center gap-3 ml-auto">
        <div className="relative w-10 h-10 overflow-hidden rounded-lg bg-linear-to-r from-gray-200 via-gray-100 to-gray-200">
          <SkeletonShimmer />
        </div>
        <div className="relative w-64 h-10 overflow-hidden rounded-lg bg-linear-to-r from-gray-200 via-gray-100 to-gray-200">
          <SkeletonShimmer />
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed top-0 left-0 flex flex-col items-center w-20 h-screen gap-6 py-6 overflow-hidden bg-purple-900">
        {/* Dashboard Icon */}
        <div 
          onClick={() => navigate('/admin/dashboard')}
          className="flex items-center justify-center w-8 h-8 text-white transition-colors rounded-lg cursor-pointer hover:bg-purple-800"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
        </div>

        {/* Document Icon */}
        <div 
          onClick={() => navigate('/admin/capstone-projects')}
          className="flex items-center justify-center w-8 h-8 text-white transition-colors bg-purple-800 rounded-lg cursor-pointer hover:bg-purple-800"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>

        {/* Users/People Icon */}
        <div 
          onClick={() => navigate('/admin/account-management')}
          className="flex items-center justify-center w-8 h-8 text-white transition-colors rounded-lg cursor-pointer hover:bg-purple-800"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>

        {/* User Settings Icon */}
        <div className="relative flex items-center justify-center w-8 h-8 text-white transition-colors rounded-lg cursor-pointer hover:bg-purple-800">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <svg className="absolute bottom-0 right-0 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>

        {/* Logout Icon */}
        <div className="flex items-center justify-center w-8 h-8 mt-auto text-white transition-colors rounded-lg cursor-pointer hover:bg-purple-800" onClick={() => setIsLogoutModalOpen(true)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 ml-20">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">
            <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 via-purple-600 to-purple-800">Capstone</span>{' '}
            <span className="text-gray-900">Projects</span>
          </h1>
        </div>

        {/* Controls and Table Container */}
        <div className="p-6 bg-white shadow-md rounded-xl">
          {/* Filters and Search */}
          {isLoading ? (
            <SkeletonControls />
          ) : (
            <div className="flex flex-wrap items-center gap-4 mb-6">
              {/* Filters */}
              <div className="flex items-center gap-3">
                <label className="text-sm font-medium text-gray-700">Filter:</label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="All">All</option>
                  <option value="Recent">Recent</option>
                  <option value="Popular">Popular</option>
                </select>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="Category">Category</option>
                  <option value="Web Application">Web Application</option>
                  <option value="Mobile Application">Mobile Application</option>
                  <option value="Networking">Networking</option>
                  <option value="IoT">IoT</option>
                </select>
              </div>

              {/* Add Button and Search */}
              <div className="flex items-center gap-3 ml-auto">
                <button
                  onClick={handleAdd}
                  className="flex items-center justify-center w-10 h-10 text-white transition-colors bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 hover:shadow-lg"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search capstone..."
                    className="w-64 py-2 pl-4 pr-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <svg className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 right-3 top-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
          )}

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-3 text-sm font-semibold text-left text-gray-700">Capstone ID</th>
                  <th className="px-4 py-3 text-sm font-semibold text-left text-gray-700">Title</th>
                  <th className="px-4 py-3 text-sm font-semibold text-left text-gray-700">Author</th>
                  <th className="px-4 py-3 text-sm font-semibold text-left text-gray-700">Category</th>
                  <th className="px-4 py-3 text-sm font-semibold text-left text-gray-700">Year</th>
                  <th className="px-4 py-3 text-sm font-semibold text-left text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {isLoading || isRefreshing ? (
                  <>
                    <SkeletonRow />
                    <SkeletonRow />
                    <SkeletonRow />
                    <SkeletonRow />
                    <SkeletonRow />
                  </>
                ) : (
                  paginatedCapstones.map((capstone, index) => (
                    <tr key={capstone.id} className="transition-colors border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900">{capstone.id}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{capstone.title}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{capstone.author}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{capstone.category}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{capstone.year}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleEdit(capstone)}
                            className="text-purple-600 transition-colors hover:text-purple-700"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDelete(capstone.id)}
                            className="text-red-500 transition-colors hover:text-red-600"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {!isLoading && (
            <div className="flex items-center justify-center gap-2 mt-6">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-2 text-purple-600 transition-colors hover:text-purple-700 disabled:text-gray-400 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <span className="px-4 text-sm text-gray-700">
                {currentPage} of {totalFilteredPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalFilteredPages, prev + 1))}
                disabled={currentPage >= totalFilteredPages}
                className="p-2 text-purple-600 transition-colors hover:text-purple-700 disabled:text-gray-400 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Choice Modal - Manual Input or Bulk Upload */}
        {isChoiceModalOpen && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm"
            onClick={() => setIsChoiceModalOpen(false)}
          >
            <div 
              className="w-full max-w-md p-8 bg-white shadow-2xl rounded-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-purple-400 via-purple-600 to-purple-800">
                  Add Capstone
                </h2>
                <button
                  onClick={() => setIsChoiceModalOpen(false)}
                  className="text-gray-400 transition-colors hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => handleChoiceSelect('manual')}
                  className="flex items-center w-full gap-3 px-6 py-4 text-white transition-colors bg-purple-600 shadow-md hover:bg-purple-700 rounded-xl hover:shadow-lg"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  <span className="font-semibold">Manual Input</span>
                </button>
                <button
                  onClick={() => handleChoiceSelect('bulk')}
                  className="flex items-center w-full gap-3 px-6 py-4 text-white transition-colors bg-purple-600 shadow-md hover:bg-purple-700 rounded-xl hover:shadow-lg"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <span className="font-semibold">Bulk Upload</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Manual Input Modal */}
        {isModalOpen && uploadType === 'manual' && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm"
            onClick={handleModalClose}
          >
            <div 
              className="w-full max-w-lg p-8 bg-white shadow-2xl rounded-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Manual Upload
                </h2>
                <button
                  onClick={handleModalClose}
                  disabled={hasInputData()}
                  className={`text-gray-400 hover:text-gray-600 transition-colors ${hasInputData() ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Add title here."
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Authors <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Add authors here."
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select</option>
                      <option value="Web Application">Web Application</option>
                      <option value="Mobile Application">Mobile Application</option>
                      <option value="Networking">Networking</option>
                      <option value="IoT">IoT</option>
                    </select>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Year <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select</option>
                      <option value="2021">2021</option>
                      <option value="2022">2022</option>
                      <option value="2023">2023</option>
                      <option value="2024">2024</option>
                    </select>
                  </div>
                </div>

                {/* File Upload */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    File <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-upload"
                      accept=".pdf,.doc,.docx"
                    />
                    <label
                      htmlFor="file-upload"
                      className="flex flex-col items-center justify-center w-full gap-2 px-4 py-8 transition-colors border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:border-purple-500 hover:bg-purple-50"
                    >
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <span className="text-sm font-medium text-gray-600">Upload Here</span>
                    </label>
                  </div>
                  {uploadedFile && (
                    <p className="mt-2 text-sm text-gray-600">Selected: {uploadedFile.name}</p>
                  )}
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false)
                      setUploadType(null)
                    }}
                    className="px-6 py-2 text-gray-700 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 text-white transition-colors bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 hover:shadow-lg"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Bulk Upload Modal */}
        {isModalOpen && uploadType === 'bulk' && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm"
            onClick={handleModalClose}
          >
            <div 
              className="w-full max-w-lg p-8 bg-white shadow-2xl rounded-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Bulk Upload
                </h2>
                <button
                  onClick={handleModalClose}
                  disabled={hasInputData()}
                  className={`text-gray-400 hover:text-gray-600 transition-colors ${hasInputData() ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleBulkSubmit} className="space-y-4">
                <div>
                  <input
                    type="file"
                    onChange={handleBulkFileChange}
                    className="hidden"
                    id="bulk-file-upload"
                    accept=".pdf,.csv"
                    multiple
                  />
                  <label
                    htmlFor="bulk-file-upload"
                    className="flex flex-col items-center justify-center w-full gap-4 px-4 py-16 transition-colors border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:border-purple-500 hover:bg-purple-50"
                  >
                    <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-700">Drag and Drop files here.</p>
                      <p className="mt-1 text-xs text-gray-500">Only accept PDF & CSV files.</p>
                    </div>
                  </label>
                  {bulkFiles.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <p className="text-sm font-medium text-gray-700">Selected files ({bulkFiles.length}):</p>
                      {bulkFiles.map((file, index) => (
                        <div key={index} className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 rounded bg-gray-50">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span>{file.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false)
                      setUploadType(null)
                    }}
                    className="px-6 py-2 text-gray-700 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 text-white transition-colors bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 hover:shadow-lg"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Add/Edit Modal (for editing existing capstones) */}
        {isModalOpen && !uploadType && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm"
            onClick={handleModalClose}
          >
            <div 
              className="w-full max-w-lg p-8 bg-white shadow-2xl rounded-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {formData.id ? 'Edit' : 'Add'} Capstone Project
                </h2>
                <button
                  onClick={handleModalClose}
                  disabled={hasInputData()}
                  className={`text-gray-400 hover:text-gray-600 transition-colors ${hasInputData() ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Author <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Surname et al."
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select Category</option>
                      <option value="Web Application">Web Application</option>
                      <option value="Mobile Application">Mobile Application</option>
                      <option value="Networking">Networking</option>
                      <option value="IoT">IoT</option>
                    </select>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Year <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="2021"
                      required
                    />
                  </div>
                </div>

                {/* File Upload */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Upload File <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-upload"
                      accept=".pdf,.doc,.docx"
                    />
                    <label
                      htmlFor="file-upload"
                      className="flex items-center justify-center w-full gap-2 px-4 py-3 transition-colors border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:border-purple-500 hover:bg-purple-50"
                    >
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <span className="text-sm text-gray-600">
                        {uploadedFile ? uploadedFile.name : 'Click to upload or drag and drop'}
                      </span>
                    </label>
                  </div>
                  {uploadedFile && (
                    <div className="flex items-center gap-2 mt-2 text-sm text-green-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>File selected: {uploadedFile.name}</span>
                      <button
                        type="button"
                        onClick={() => {
                          setUploadedFile(null)
                          setFormData({ ...formData, file: null })
                          document.getElementById('file-upload').value = ''
                        }}
                        className="ml-2 text-red-500 hover:text-red-600"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  )}
                  <p className="mt-1 text-xs text-gray-500">PDF, DOC, DOCX (Max 10MB)</p>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false)
                      setUploadType(null)
                    }}
                    className="px-6 py-2 text-gray-700 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 text-white transition-colors bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 hover:shadow-lg"
                  >
                    {formData.id ? 'Update' : 'Add'} Project
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Logout Confirmation Modal */}
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

        {/* Success Modal */}
        {showSuccessModal && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm"
            onClick={() => setShowSuccessModal(false)}
          >
            <div 
              className="w-full max-w-md p-8 bg-white shadow-2xl rounded-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-center mb-4">
                <div className="flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <h2 className="mb-2 text-2xl font-bold text-center text-transparent bg-clip-text bg-linear-to-r from-purple-400 via-purple-600 to-purple-800">Success</h2>
              <p className="mb-6 text-center text-gray-600">{modalMessage}</p>
              <button
                onClick={() => setShowSuccessModal(false)}
                className="w-full px-4 py-2 text-white transition-colors bg-purple-600 rounded-lg hover:bg-purple-700"
              >
                OK
              </button>
            </div>
          </div>
        )}

        {/* Error Modal */}
        {showErrorModal && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm"
            onClick={() => setShowErrorModal(false)}
          >
            <div 
              className="w-full max-w-md p-8 bg-white shadow-2xl rounded-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-center mb-4">
                <div className="flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              </div>
              <h2 className="mb-2 text-2xl font-bold text-center text-transparent bg-clip-text bg-linear-to-r from-purple-400 via-purple-600 to-purple-800">Error</h2>
              <p className="mb-6 text-center text-gray-600">{modalMessage}</p>
              <button
                onClick={() => setShowErrorModal(false)}
                className="w-full px-4 py-2 text-white transition-colors bg-purple-600 rounded-lg hover:bg-purple-700"
              >
                OK
              </button>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {isDeleteModalOpen && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm"
            onClick={() => {
              setIsDeleteModalOpen(false)
              setDeleteItem(null)
            }}
          >
            <div 
              className="w-full max-w-md p-8 bg-white shadow-2xl rounded-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-center mb-4">
                <div className="flex items-center justify-center w-16 h-16 bg-red-100 border-2 border-red-300 rounded-full">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
              </div>
              <h2 className="mb-2 text-2xl font-bold text-center text-gray-900">Confirm Delete</h2>
              <p className="mb-6 text-center text-gray-600">Are you sure you want to delete <strong>{deleteItem?.title}</strong>? This action cannot be undone.</p>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setIsDeleteModalOpen(false)
                    setDeleteItem(null)
                  }}
                  className="flex-1 px-4 py-2 text-gray-700 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 px-4 py-2 text-white transition-colors bg-red-600 rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Logout Loading Overlay */}
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
                  <span className="block text-sm text-gray-500">Redirecting to landing page</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

