import { createContext, useContext, useState, useEffect } from 'react';

const AdminContext = createContext();

export const useAdmin = () => useContext(AdminContext);

export const AdminProvider = ({ children }) => {
    // --- MOCK DATA INITIALIZATION ---
    const initialCapstones = [
        { id: 'CP001', title: 'AgriLearn: Production Planning', author: 'Alipante et al.', category: 'Web Application', year: '2021', status: 'Approved', file: 'doc.pdf' },
        { id: 'CP002', title: 'Automated Trash Bin', author: 'Cruz et al.', category: 'IoT', year: '2022', status: 'Pending', file: 'doc.pdf' },
        { id: 'CP003', title: 'Network Security Analysis', author: 'Santos et al.', category: 'Networking', year: '2023', status: 'Approved', file: 'doc.pdf' },
        { id: 'CP004', title: 'Old Project Archive', author: 'Rizal et al.', category: 'Mobile Application', year: '2019', status: 'Archived', file: 'doc.pdf' },
    ];

    const initialSettings = {
        categories: ['Web Application', 'Mobile Application', 'IoT', 'Networking', 'Machine Learning'],
        allowDownloads: true,
        maintenanceMode: false,
        academicYears: ['2020-2021', '2021-2022', '2022-2023', '2023-2024', '2024-2025']
    };

    const initialAdmins = [
        { id: '23-343', fullName: 'Evan Hansen', email: 'evan@cbsua.edu.ph', role: 'Super Administrator', status: 'Active' },
        { id: '22-012', fullName: 'John Doe', email: 'john@cbsua.edu.ph', role: 'Admin', status: 'Active' },
    ];

    // --- STATE ---
    const [capstones, setCapstones] = useState(initialCapstones);
    const [settings, setSettings] = useState(initialSettings);
    const [admins, setAdmins] = useState(initialAdmins);

    // --- CAPSTONE ACTIONS ---
    const addCapstone = (newCapstone) => {
        // Default to 'Pending' if not specified
        const capstone = { ...newCapstone, status: newCapstone.status || 'Pending' };
        setCapstones(prev => [...prev, capstone]);
    };

    const updateCapstoneStatus = (id, newStatus) => {
        setCapstones(prev => prev.map(c =>
            c.id === id ? { ...c, status: newStatus } : c
        ));
    };

    const updateCapstone = (updatedCapstone) => {
        setCapstones(prev => prev.map(c =>
            c.id === updatedCapstone.id ? updatedCapstone : c
        ));
    };

    const deleteCapstone = (id) => {
        setCapstones(prev => prev.filter(c => c.id !== id));
    };

    // --- SETTINGS ACTIONS ---
    const addCategory = (category) => {
        setSettings(prev => ({
            ...prev,
            categories: [...prev.categories, category]
        }));
    };

    const removeCategory = (category) => {
        setSettings(prev => ({
            ...prev,
            categories: prev.categories.filter(c => c !== category)
        }));
    };

    const updateSystemConfig = (key, value) => {
        setSettings(prev => ({
            ...prev,
            [key]: value
        }));
    };

    // --- ADMIN ACTIONS ---
    const addAdmin = (newAdmin) => {
        setAdmins(prev => [...prev, newAdmin]);
    };

    const updateAdmin = (updatedAdmin) => {
        setAdmins(prev => prev.map(a =>
            a.id === updatedAdmin.id ? updatedAdmin : a
        ));
    };

    const deleteAdmin = (id) => {
        setAdmins(prev => prev.filter(a => a.id !== id));
    };

    const value = {
        capstones,
        settings,
        admins,
        addCapstone,
        updateCapstoneStatus,
        updateCapstone,
        deleteCapstone,
        addCategory,
        removeCategory,
        updateSystemConfig,
        addAdmin,
        updateAdmin,
        deleteAdmin
    };

    return (
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    );
};

export default AdminContext;
