import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAdmin } from '../../contexts/AdminContext'
import { useAuth } from '../../contexts/AuthContext'
import V9Gradient from "../../assets/images/V9.svg"
import AdminSidebar from './AdminSidebar'

export default function AdminSettings() {
    const navigate = useNavigate()
    const { logout } = useAuth()
    const { settings, addCategory, removeCategory, updateSystemConfig } = useAdmin()
    const [newCategory, setNewCategory] = useState('')
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)
    const [isLoggingOut, setIsLoggingOut] = useState(false)

    const handleAddCategory = (e) => {
        e.preventDefault()
        if (newCategory.trim() && !settings.categories.includes(newCategory.trim())) {
            addCategory(newCategory.trim())
            setNewCategory('')
        }
    }

    const handleRemoveCategory = (category) => {
        if (confirm(`Are you sure you want to delete category "${category}"?`)) {
            removeCategory(category)
        }
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <AdminSidebar />

            {/* Main Content */}
            <main className="flex-1 p-8 ml-20">
                <div className="mb-6">
                    <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-600 to-purple-800">System</span>{' '}
                        <span className="text-gray-900">Settings</span>
                    </h1>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Categories Management */}
                    <div className="p-6 bg-white shadow-md rounded-xl">
                        <h3 className="mb-4 text-xl font-bold text-gray-800">Manage Categories</h3>
                        <form onSubmit={handleAddCategory} className="flex gap-2 mb-4">
                            <input
                                type="text"
                                value={newCategory}
                                onChange={(e) => setNewCategory(e.target.value)}
                                placeholder="New Category Name"
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                            <button type="submit" className="px-4 py-2 text-white bg-purple-600 rounded-lg hover:bg-purple-700">Add</button>
                        </form>
                        <div className="flex flex-wrap gap-2">
                            {settings.categories.map((cat, idx) => (
                                <div key={idx} className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full">
                                    <span className="text-sm text-gray-700">{cat}</span>
                                    <button onClick={() => handleRemoveCategory(cat)} className="text-gray-400 hover:text-red-500">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* System Configuration */}
                    <div className="p-6 bg-white shadow-md rounded-xl">
                        <h3 className="mb-4 text-xl font-bold text-gray-800">System Configuration</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-gray-900">Allow Downloads</p>
                                    <p className="text-sm text-gray-500">Enable file downloads for visitors</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={settings.allowDownloads}
                                        onChange={(e) => updateSystemConfig('allowDownloads', e.target.checked)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                                </label>
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-gray-900">Maintenance Mode</p>
                                    <p className="text-sm text-gray-500">Disable site access for visitors</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={settings.maintenanceMode}
                                        onChange={(e) => updateSystemConfig('maintenanceMode', e.target.checked)}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
