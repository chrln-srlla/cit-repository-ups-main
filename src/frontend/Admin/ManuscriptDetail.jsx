import { useNavigate, useParams } from 'react-router-dom'
import { useCapstoneContext } from '../../contexts/CapstoneProjectsContext'
import AdminSidebar from './AdminSidebar'
import { useState, useEffect } from 'react'

export default function ManuscriptDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { capstones, updateCapstoneStatus } = useCapstoneContext()
    const [capstone, setCapstone] = useState(null)
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)

    // Find the capstone matches the ID
    useEffect(() => {
        // In a real app, this might be an API call
        // For now we look up from context
        if (capstones) {
            const found = capstones.find(c => c.id === id)
            setCapstone(found)
        }
    }, [id, capstones])

    if (!capstone) {
        return (
            <div className="flex min-h-screen bg-gray-50">
                <AdminSidebar />
                <main className="flex-1 p-8 ml-20 flex items-center justify-center">
                    <div className="animate-pulse flex flex-col items-center">
                        <div className="h-4 bg-gray-200 rounded w-48 mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded w-32"></div>
                    </div>
                </main>
            </div>
        )
    }



    const handleInitialApprove = () => {
        setIsConfirmModalOpen(true)
    }

    const handleConfirmApprove = async () => {
        await updateCapstoneStatus(capstone.id, 'Approved')
        setIsConfirmModalOpen(false)
        setIsSuccessModalOpen(true)
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            <AdminSidebar />

            <main className="flex-1 p-8 ml-20 relative">
                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">{capstone.title}</h1>
                    <div className="flex items-center gap-4 text-sm">
                        <span className={`px-4 py-1.5 rounded-full font-medium ${capstone.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                            capstone.status === 'Approved' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'
                            }`}>
                            {capstone.status === 'Pending' ? 'Pending Approval' : capstone.status}
                        </span>
                        <span className="text-gray-500">Capstone ID: <span className="font-medium text-gray-700 uppercase">{capstone.id}</span></span>
                        <span className="text-gray-300">|</span>
                        <span className="text-gray-500">Submitted on: <span className="font-medium text-gray-700">Jan. 6 2026</span></span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column: Metadata & Abstract */}
                    <div className="space-y-6">
                        {/* Metadata Summary Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 pb-4 border-b border-gray-100">Metadata Summary</h3>

                            <div className="space-y-4 text-sm">
                                <div className="grid grid-cols-[100px_1fr]">
                                    <span className="font-bold text-gray-900">Authors:</span>
                                    <span className="text-gray-600">{capstone.author}</span>
                                </div>
                                <div className="grid grid-cols-[100px_1fr]">
                                    <span className="font-bold text-gray-900">Adviser:</span>
                                    <span className="text-gray-600">Prof. Juan Dela Cruz</span>
                                </div>
                                <div className="grid grid-cols-[100px_1fr]">
                                    <span className="font-bold text-gray-900">Section:</span>
                                    <span className="text-gray-600">3A</span>
                                </div>
                                <div className="grid grid-cols-[100px_1fr]">
                                    <span className="font-bold text-gray-900">Program:</span>
                                    <span className="text-gray-600">BS Information Technology</span>
                                </div>
                                <div className="grid grid-cols-[100px_1fr] items-baseline">
                                    <span className="font-bold text-gray-900">Keywords:</span>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">{capstone.category}</span>
                                        <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">research</span>
                                        <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">system</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Abstract Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex-1">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 pb-4 border-b border-gray-100">ABSTRACT</h3>
                            <p className="text-gray-600 leading-relaxed text-sm text-justify">
                                Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. . Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu.
                            </p>
                        </div>
                    </div>

                    {/* Right Column: PDF Viewer */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-[600px] flex items-center justify-center bg-gray-50/50">
                        <div className="text-center">
                            <h2 className="text-4xl font-semibold text-gray-900 mb-2">PDF VIEWER</h2>
                            <p className="text-gray-500">Document preview area</p>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="flex justify-end gap-4 mt-8 pt-8 border-t border-gray-200">
                    <button
                        onClick={() => navigate('/admin/manuscript-uploads')}
                        className="px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Back to List
                    </button>
                    <button
                        onClick={handleInitialApprove}
                        className="px-6 py-2.5 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2 shadow-sm"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Approve and Publish
                    </button>
                </div>

                {/* Confirmation Modal */}
                {isConfirmModalOpen && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 shadow-xl transform transition-all">
                            <h3 className="text-lg font-semibold text-center text-gray-900 mb-8">
                                Are you sure you want to approve the paper?
                            </h3>
                            <div className="flex items-center justify-center gap-4">
                                <button
                                    onClick={() => setIsConfirmModalOpen(false)}
                                    className="px-6 py-2.5 text-gray-500 font-medium hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                                >
                                    CANCEL
                                </button>
                                <button
                                    onClick={handleConfirmApprove}
                                    className="px-8 py-2.5 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors shadow-sm"
                                >
                                    APPROVE
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Success Modal */}
                {isSuccessModalOpen && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-xl p-10 max-w-lg w-full mx-4 shadow-xl transform transition-all text-center">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                Manuscript approved and<br />published successfully!
                            </h3>
                            <p className="text-gray-500 mb-8 text-sm">
                                An email notification has been successfully sent to the<br />author.
                            </p>

                            <button
                                onClick={() => navigate('/admin/manuscript-uploads')}
                                className="text-purple-600 hover:text-purple-700 font-medium flex items-center justify-center gap-2 mx-auto"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Back to Manuscript Uploads List
                            </button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    )
}
