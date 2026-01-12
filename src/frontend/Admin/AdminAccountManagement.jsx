import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAdmin } from '../../contexts/AdminContext'
import { useAuth } from '../../contexts/AuthContext'
import V9Gradient from "../../assets/images/V9.svg"
import AdminSidebar from './AdminSidebar'

export default function AdminAccountManagement() {
  const navigate = useNavigate()
  const { logout } = useAuth()
  const { admins, addAdmin, updateAdmin, deleteAdmin } = useAdmin()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [filterType, setFilterType] = useState('All')
  const [filterRole, setFilterRole] = useState('All'); 
  const [sortBy, setSortBy] = useState('A-Z');       
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showErrorModal, setShowErrorModal] = useState(false)
  const [modalMessage, setModalMessage] = useState('')
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [deleteItem, setDeleteItem] = useState(null)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  // Sample data (REMOVED - now using Context)
  // const [admins, setAdmins] = useState([
  //   { id: '22-012', fullName: 'John Doe', email: 'example@cbsua.edu.ph', role: 'Admin', status: 'Active' },
  //   { id: '23-343', fullName: 'Evan Hansen', email: 'example@cbsua.edu.ph', role: 'Super Administrator', status: 'Active' },
  //   { id: '21-342', fullName: 'Rick Morty', email: 'example@cbsua.edu.ph', role: 'Admin', status: 'Inactive' },
  //   { id: '24-001', fullName: 'Jane Smith', email: 'jane@cbsua.edu.ph', role: 'Admin', status: 'Active' },
  //   { id: '24-002', fullName: 'Mike Johnson', email: 'mike@cbsua.edu.ph', role: 'Admin', status: 'Inactive' },
  //   { id: '24-003', fullName: 'Sarah Williams', email: 'sarah@cbsua.edu.ph', role: 'Super Administrator', status: 'Active' },
  // ])

  const [formData, setFormData] = useState({
    id: '',
    fullName: '',
    email: '',
    role: '',
    password: '',
    confirmPassword: ''
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
    setFormData({ id: '', fullName: '', email: '', role: '', password: '', confirmPassword: '' })
    setIsModalOpen(true)
  }

  // Check if form has input data
  const hasInputData = () => {
    return formData.fullName || formData.email || formData.role || formData.password || formData.confirmPassword
  }

  const handleModalClose = () => {
    if (hasInputData()) {
      return // Prevent closing if there's input data
    }
    setIsModalOpen(false)
    setFormData({ id: '', fullName: '', email: '', role: '', password: '', confirmPassword: '' })
  }

  const handleEdit = (admin) => {
    setFormData({ ...admin, password: '', confirmPassword: '' })
    setIsModalOpen(true)
  }

  const handleDelete = (id) => {
    const admin = admins.find(a => a.id === id)
    setDeleteItem({ id, name: admin?.fullName || 'this admin account', type: 'admin', role: admin?.role })
    setIsDeleteModalOpen(true)
  }

  const confirmDelete = () => {
    if (deleteItem) {
      // PERMISSION CHECK (Mock: Prevent deleting Super Admin for demo purposes)
      if (deleteItem.role === 'Super Administrator') {
        alert("Action Denied: You cannot delete a Super Administrator.")
        setIsDeleteModalOpen(false)
        setDeleteItem(null)
        return
      }

      setIsRefreshing(true)
      setIsDeleteModalOpen(false)
      setDeleteItem(null)

      // Simulate delete operation with skeleton loading
      setTimeout(() => {
        // setAdmins(admins.filter(a => a.id !== deleteItem.id)) -- Replaced by Context
        deleteAdmin(deleteItem.id)
        setIsRefreshing(false)
        setModalMessage('Admin account deleted successfully!')
        setShowSuccessModal(true)
        setTimeout(() => setShowSuccessModal(false), 3000)
      }, 1000)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      if (!formData.id && formData.password !== formData.confirmPassword) {
        setModalMessage('Passwords do not match!')
        setShowErrorModal(true)
        setTimeout(() => setShowErrorModal(false), 3000)
        return
      }

      setIsRefreshing(true)
      setIsModalOpen(false)

      // Simulate save operation with skeleton loading
      setTimeout(() => {
        if (formData.id) {
          // Edit existing
          // setAdmins(admins.map(a => a.id === formData.id ? { ...formData, status: a.status } : a))
          updateAdmin(formData)
          setModalMessage('Admin account updated successfully!')
        } else {
          // Add new
          const newId = `24-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}` // Simple ID gen
          // setAdmins([...admins, { ...formData, id: newId, status: 'Active' }])
          addAdmin({ ...formData, id: newId })
          setModalMessage('Admin account added successfully!')
        }
        setFormData({ id: '', fullName: '', email: '', role: '', password: '', confirmPassword: '' })
        setIsRefreshing(false)
        setShowSuccessModal(true)
        setTimeout(() => setShowSuccessModal(false), 3000)
      }, 1000)
    } catch (error) {
      setIsRefreshing(false)
      setModalMessage('Failed to save admin account. Please try again.')
      setShowErrorModal(true)
      setTimeout(() => setShowErrorModal(false), 3000)
    }
  }

  const filteredAdmins = admins
  .filter(admin => {
    const matchesStatus = filterType === 'All' || admin.status === filterType;
    const matchesRole = filterRole === 'All' || admin.role === filterRole;
    const matchesSearch = !searchQuery ||
      admin.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      admin.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      admin.role.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesRole && matchesSearch;
  })
  .sort((a, b) => {

    if (sortBy === 'A-Z') {
      return a.fullName.localeCompare(b.fullName);
    } else {
      return b.fullName.localeCompare(a.fullName);
    }
  });

  const totalFilteredPages = Math.ceil(filteredAdmins.length / itemsPerPage) || 1
  const paginatedAdmins = filteredAdmins.slice(
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
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent"></div>
    </div>
  )

  const SkeletonRow = () => (
    <tr className="border-b border-gray-100">
      {[1, 2, 3, 4, 5, 6].map((num) => (
        <td key={num} className="px-4 py-3">
          <div className="relative h-4 overflow-hidden rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200">
            <SkeletonShimmer />
          </div>
        </td>
      ))}
    </tr>
  )

  const SkeletonControls = () => (
    <div className="flex flex-wrap items-center gap-4 mb-6">
      <div className="flex items-center gap-3">
        <div className="relative w-12 h-4 overflow-hidden rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200">
          <SkeletonShimmer />
        </div>
        <div className="relative w-24 h-10 overflow-hidden rounded-lg bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200">
          <SkeletonShimmer />
        </div>
      </div>
      <div className="flex items-center gap-3 ml-auto">
        <div className="relative w-10 h-10 overflow-hidden rounded-lg bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200">
          <SkeletonShimmer />
        </div>
        <div className="relative w-64 h-10 overflow-hidden rounded-lg bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200">
          <SkeletonShimmer />
        </div>
      </div>
    </div>
  )

  const handleClearFilters = () => {
  setFilterType('All');    
  setFilterRole('All');    
  setSearchQuery('');      
  setSortBy('A - Z');     
  setCurrentPage(1);      
  };

return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 p-8 ml-20">
        <div className="mb-6">
          <h1 className="text-4xl font-extrabold md:text-5xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-600 to-purple-800">Admin Account</span>{' '}
            <span className="text-gray-900">Management</span>
          </h1>
        </div>

        <div className="p-6 bg-white shadow-md rounded-xl">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex items-center gap-3">
              <label className="text-sm font-bold text-gray-700">Filter:</label>
              <button
                onClick={handleClearFilters}
                className={`px-4 py-2 text-sm border rounded-lg transition-all duration-200 
                  ${(filterType === 'All' && filterRole === 'All' && searchQuery === '') 
                    ? 'bg-purple-100 border-purple-400 text-purple-700 font-bold' 
                    : 'bg-gray-50 border-gray-300 text-gray-600 hover:bg-gray-200 active:scale-95'}`}
              >
                All
              </button>
            </div>

            <select value={filterRole} onChange={(e) => setFilterRole(e.target.value)} className="px-4 py-2 text-sm border border-gray-300 rounded-lg">
              <option value="All">Role</option>
              <option value="Admin">Admin</option>
              <option value="Super Administrator">Super Administrator</option>
            </select>

            <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="px-4 py-2 text-sm border border-gray-300 rounded-lg">
              <option value="All">Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-4 py-2 text-sm border border-gray-300 rounded-lg">
              <option value="A - Z">A - Z</option>
              <option value="Z - A">Z - A</option>
            </select>

            <div className="flex items-center gap-3 ml-auto">
              <button onClick={handleAdd} className="bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 transition-colors cursor-pointer">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" strokeWidth={2} strokeLinecap="round"/></svg>
              </button>
              <div className="relative">
                <input type="text" placeholder="Search users..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-64 py-2 pl-4 pr-10 border border-gray-300 rounded-full text-sm" />
                <svg className="absolute w-5 h-5 text-gray-400 right-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeWidth={2}/></svg>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 text-left">
                  <th className="px-4 py-3 text-sm font-semibold text-gray-700">Admin ID</th>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-700">Full Name</th>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-700">Email</th>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-700">Role</th>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {isLoading || isRefreshing ? (
                  <>
                    <SkeletonRow /><SkeletonRow /><SkeletonRow />
                  </>
                ) : (
                  paginatedAdmins.map((admin) => (
                    <tr key={admin.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-sm text-gray-900">{admin.id}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{admin.fullName}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{admin.email}</td>
                      <td className="px-4 py-3 text-sm text-gray-700">{admin.role}</td>
                      <td className="px-4 py-3 text-sm">
                        <span className={admin.status === 'Active' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>{admin.status}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-3">
                          <button onClick={() => handleEdit(admin)} className="text-purple-600 hover:text-purple-800 cursor-pointer"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" strokeWidth={2}/></svg></button>
                          <button onClick={() => handleDelete(admin.id)} className="text-red-500 hover:text-red-700 cursor-pointer"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeWidth={2}/></svg></button>
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

        {/* Add/Edit Modal */}
        {isModalOpen && (
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
                  {formData.id ? 'Edit' : 'Add'} Admin Account
                </h2>
                <button
                  onClick={handleModalClose}
                  disabled={hasInputData()}
                  className={`cursor-pointer text-gray - 400 hover: text - gray - 600 transition - colors ${hasInputData() ? 'opacity-50 cursor-not-allowed' : ''} `}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter Full Name"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter Email"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Role <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select</option>
                    <option value="Admin">Admin</option>
                    <option value="Super Administrator">Super Administrator</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Password {!formData.id && <span className="text-red-500">*</span>}
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter password"
                      required={!formData.id}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute text-gray-400 -translate-y-1/2 right-3 top-1/2 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Confirm Password {!formData.id && <span className="text-red-500">*</span>}
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Confirm password"
                      required={!formData.id}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute text-gray-400 -translate-y-1/2 right-3 top-1/2 hover:text-gray-600"
                    >
                      {showConfirmPassword ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-2 text-gray-700 transition-colors border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 text-white transition-colors rounded-lg shadow-md bg-violet-600 cursor-pointer hover:bg-violet-700 hover:shadow-lg"
                  >
                    Save
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
              <h2 className="mb-2 text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-600 to-purple-800">Confirm Logout</h2>
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

                    // Call logout from AuthContext to clear authentication
                    logout()

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
              <h2 className="mb-2 text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-600 to-purple-800 handleAdd">Success</h2>
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
              <h2 className="mb-2 text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-600 to-purple-800">Error</h2>
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
              <h2 className="mb-2 text-2xl font-bold text-center text-gray-900 cursor-pointer">Confirm Delete</h2>
              <p className="mb-6 text-center text-gray-600 cursor-pointer">Are you sure you want to delete <strong>{deleteItem?.name}</strong>? This action cannot be undone.</p>
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

      </main>
    </div>
  )
}