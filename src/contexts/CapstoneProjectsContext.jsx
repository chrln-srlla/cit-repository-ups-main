import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useAdmin } from './AdminContext';

const CapstoneProjectsContext = createContext(null);

export const CapstoneProjectsProvider = ({ children }) => {
    const [capstones, setCapstones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const { user } = useAuth();
    const { capstones: adminCapstones, addCapstone: adminAddCapstone, updateCapstoneStatus: adminUpdateCapstoneStatus, updateCapstone: adminUpdateCapstone, deleteCapstone: adminDeleteCapstone } = useAdmin();

    useEffect(() => {
        // Sync with AdminContext capstones
        setCapstones(adminCapstones);
        setLoading(false);
    }, [adminCapstones]);

    const fetchCapstones = async (search = '') => {
        setLoading(true);

        // Filter capstones based on search query
        if (search) {
            const filtered = adminCapstones.filter(capstone =>
                capstone.title.toLowerCase().includes(search.toLowerCase()) ||
                capstone.author.toLowerCase().includes(search.toLowerCase()) ||
                capstone.category.toLowerCase().includes(search.toLowerCase())
            );
            setCapstones(filtered);
        } else {
            setCapstones(adminCapstones);
        }

        setLoading(false);
    };

    const uploadDocx = async (file) => {
        try {
            setUploading(true);

            // Mock upload - in real app, this would upload to backend
            console.log('Mock upload of file:', file.name);

            // Simulate upload delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            return true;
        } catch (e) {
            console.error('Upload error', e);
            return false;
        } finally {
            setUploading(false);
        }
    };

    const addCapstone = async (form) => {
        try {
            setLoading(true);

            // Extract form data
            const formData = new FormData(form);
            const newCapstone = {
                id: `CP${String(adminCapstones.length + 1).padStart(3, '0')}`,
                title: formData.get('title'),
                author: formData.get('author'),
                category: formData.get('category'),
                year: formData.get('year') || new Date().getFullYear().toString(),
                status: 'Pending',
                file: formData.get('file')?.name || 'doc.pdf'
            };

            // Use AdminContext to add capstone
            adminAddCapstone(newCapstone);

            return true;
        } catch (e) {
            console.error('Add capstone error', e);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const updateCapstone = async (id, form) => {
        try {
            setLoading(true);

            // Extract form data
            const formData = new FormData(form);
            const updatedCapstone = {
                id,
                title: formData.get('title'),
                author: formData.get('author'),
                category: formData.get('category'),
                year: formData.get('year'),
                status: formData.get('status'),
                file: formData.get('file')?.name || adminCapstones.find(c => c.id === id)?.file || 'doc.pdf'
            };

            // Use AdminContext to update capstone
            adminUpdateCapstone(updatedCapstone);

            return true;
        } catch (e) {
            console.error('Update capstone error', e);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const deleteCapstone = async (id) => {
        try {
            setLoading(true);

            // Use AdminContext to delete capstone
            adminDeleteCapstone(id);

            return true;
        } catch (e) {
            console.error('Delete capstone error', e);
            return false;
        } finally {
            setLoading(false);
        }
    };

    const updateCapstoneStatus = async (id, status) => {
        try {
            setLoading(true);
            adminUpdateCapstoneStatus(id, status);
            return true;
        } catch (e) {
            console.error('Update status error', e);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return (
        <CapstoneProjectsContext.Provider
            value={{
                capstones,
                uploading,
                fetchCapstones,
                uploadDocx,
                addCapstone,
                updateCapstone,
                updateCapstoneStatus,
                deleteCapstone,
            }}
        >
            {children}
        </CapstoneProjectsContext.Provider>
    );
};

export const useCapstoneContext = () => {
    return useContext(CapstoneProjectsContext);
};
