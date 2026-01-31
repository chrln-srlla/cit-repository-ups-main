import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCapstoneContext } from '../../contexts/CapstoneProjectsContext'
import AdminSidebar from './AdminSidebar'

<<<<<<< HEAD
=======

>>>>>>> upstream/main
export default function ManuscriptUploads() {
    const navigate = useNavigate()
    const { capstones, updateCapstoneStatus, deleteCapstone } = useCapstoneContext()
    const [searchTerm, setSearchTerm] = useState('')
    const [filterCategory, setFilterCategory] = useState('Category')
    const [filterStatus, setFilterStatus] = useState('All')
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 8

<<<<<<< HEAD
    const handleDownload = (capstone) => {
        if (!capstone.fileUrl) {
            alert("No file available for download.");
            return;
        }
        
        const link = document.createElement('a');
        link.href = capstone.fileUrl;
        link.setAttribute('download', `${capstone.title}.pdf`); // Sets the filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

=======
>>>>>>> upstream/main
    // Filter Logic
    const filteredCapstones = capstones.filter(capstone => {
        const matchesSearch = capstone.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            capstone.id?.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = filterCategory === 'Category' || capstone.category === filterCategory
        const matchesStatus = filterStatus === 'All' || capstone.status === filterStatus
        return matchesSearch && matchesCategory && matchesStatus
    })

    // Pagination Logic
    const totalPages = Math.ceil(filteredCapstones.length / itemsPerPage)
    const paginatedCapstones = filteredCapstones.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    )

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'approved': return 'text-green-500'
            case 'pending': return 'text-yellow-500'
            case 'archived': return 'text-gray-500'
            case 'declined': return 'text-red-500'
            default: return 'text-gray-500'
        }
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            <AdminSidebar />

            <main className="flex-1 p-8 ml-20">
                <div className="mb-6">
                    <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-600 to-purple-800">Manuscript</span>{' '}
                        <span className="text-gray-900">Uploads</span>
                    </h1>
                </div>

                <div className="p-6 bg-white shadow-md rounded-xl">
<<<<<<< HEAD
                    {/* Controls (Search/Filter) */}
=======
                    {/* Controls */}
>>>>>>> upstream/main
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                        <div className="flex items-center gap-3">
                            <span className="font-semibold text-gray-700">Filter:</span>
                            <select
                                className="px-3 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                            >
                                <option value="All">All</option>
                                <option value="Approved">Approved</option>
                                <option value="Pending">Pending</option>
                                <option value="Declined">Declined</option>
                            </select>
                            <select
                                className="px-3 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-purple-500"
                                value={filterCategory}
                                onChange={(e) => setFilterCategory(e.target.value)}
                            >
                                <option value="Category">Category</option>
                                <option value="Web Application">Web Application</option>
                                <option value="Mobile Application">Mobile Application</option>
                                <option value="IoT">IoT</option>
                            </select>
                        </div>

                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search capstone..."
                                className="w-64 pl-4 pr-10 py-2 text-sm border border-gray-300 rounded-full outline-none focus:ring-2 focus:ring-purple-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <svg className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 right-3 top-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="py-4 text-sm font-bold text-left text-gray-900">Capstone ID</th>
                                    <th className="py-4 text-sm font-bold text-left text-gray-900">Title</th>
                                    <th className="py-4 text-sm font-bold text-left text-gray-900">Author</th>
                                    <th className="py-4 text-sm font-bold text-left text-gray-900">Category</th>
                                    <th className="py-4 text-sm font-bold text-center text-gray-900">Status</th>
                                    <th className="py-4 text-sm font-bold text-center text-gray-900">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedCapstones.map((capstone, index) => (
                                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                        <td className="py-4 text-sm text-gray-600">{capstone.id}</td>
                                        <td className="py-4 text-sm font-medium text-gray-900">
                                            <button
                                                onClick={() => navigate(`/admin/manuscript-uploads/${capstone.id}`)}
<<<<<<< HEAD
                                                className="hover:text-purple-600 hover:underline text-left cursor-pointer"
=======
                                                className="hover:text-purple-600 hover:underline text-left"
>>>>>>> upstream/main
                                            >
                                                {capstone.title}
                                            </button>
                                        </td>
                                        <td className="py-4 text-sm text-gray-600">{capstone.author}</td>
                                        <td className="py-4 text-sm text-gray-600">{capstone.category}</td>
                                        <td className={`py-4 text-sm text-center font-medium ${getStatusColor(capstone.status)}`}>
                                            {capstone.status}
                                        </td>
                                        <td className="py-4">
                                            <div className="flex justify-center gap-2">
<<<<<<< HEAD
                                            {/* Edit Button */}
                                                <button
                                                    onClick={() => navigate(`/admin/manuscript-uploads/${capstone.id}`)}
                                                    className="text-purple-600 hover:text-purple-800 transition-colors cursor-pointer"
                                                    title="Edit"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </button>

                                                {/* Delete Button */}
                                                <button
                                                    onClick={() => deleteCapstone(capstone.id)}
                                                    className="text-red-500 hover:text-red-700 transition-colors cursor-pointer"
                                                    title="Delete"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </button>

                                                {/* Download Button (Matching Style) */}
                                                <button
                                                    onClick={() => handleDownload(capstone)}
                                                    className="text-blue-500 hover:text-blue-700 transition-colors cursor-pointer"
                                                    title="Download Manuscript"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
=======
                                                <button
                                                    onClick={() => navigate(`/admin/manuscript-uploads/${capstone.id}`)}
                                                    className="p-2 text-purple-600 transition-colors bg-purple-100 rounded-lg hover:bg-purple-200"
                                                    title="Edit"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={() => deleteCapstone(capstone.id)}
                                                    className="p-2 text-red-600 transition-colors bg-red-100 rounded-lg hover:bg-red-200"
                                                    title="Delete"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
>>>>>>> upstream/main
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {paginatedCapstones.length === 0 && (
                                    <tr>
                                        <td colSpan="6" className="py-8 text-center text-gray-500">
                                            No capstones found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-center gap-2 mt-6">
                        <button
                            className="p-1 text-white bg-purple-600 rounded disabled:opacity-50"
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <span className="text-sm text-gray-600">
                            {currentPage} of {totalPages || 1}
                        </span>
                        <button
                            className="p-1 text-white bg-purple-600 rounded disabled:opacity-50"
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </main>
        </div>
    )
<<<<<<< HEAD
}
=======
}
>>>>>>> upstream/main
