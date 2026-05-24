import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getToken } from '../../utils/auth';

const EditBlogModal = ({ isOpen, onClose, blogData, onUpdateSuccess }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(''); 
    const [updateLoading, setUpdateLoading] = useState(false);

    // --- New States for Premium Control ---
    const [isPaid, setIsPaid] = useState(false);
    const [price, setPrice] = useState('');

    useEffect(() => {
        if (blogData) {
            setTitle(blogData.title || '');
            setContent(blogData.content || '');
            setImageFile(null); 
            setPreviewUrl(blogData.image || '');
            
            // Populate old status directly from active database schema info
            setIsPaid(blogData.isPaid || false);
            setPrice(blogData.price || '');
        }
    }, [blogData]);

    // Handle dynamic checkbox action with safety clear logic
    const handleToggleChange = (e) => {
        const checked = e.target.checked;
        setIsPaid(checked);
        if (!checked) {
            setPrice(''); // Clear pricing information directly on state drop
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setPreviewUrl(URL.createObjectURL(file)); 
        }
    };

    if (!isOpen || !blogData) return null;

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        try {
            setUpdateLoading(true);
            const token = getToken();

            const formData = new FormData();
            formData.append('title', title);
            formData.append('content', content);
            formData.append('isPaid', isPaid);
            formData.append('price', isPaid ? price : 0); // Send zero if toggle was explicitly removed
            
            if (imageFile) {
                formData.append('image', imageFile); 
            }

            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/blog/update/${blogData._id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            if (response.data.success) {
                alert("Blog updated successfully! 🎉");
                onUpdateSuccess(); 
                onClose();  
            }
        } catch (error) {
            console.error("Update failed:", error);
            alert(error.response?.data?.message || "Something went wrong");
        } finally {
            setUpdateLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                
                {/* Modal Header */}
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h3 className="text-lg font-bold text-gray-900">Edit Blog Post</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 font-bold text-xl">
                        &times;
                    </button>
                </div>
                
                {/* Modal Form */}
                <form onSubmit={handleUpdateSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Blog Title</label>
                        <input 
                            type="text" 
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                        <textarea 
                            rows="4"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                        ></textarea>
                    </div>

                    {/* ==================== PREMIUM CONTROLS WITHIN EDIT HOOK ==================== */}
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                        <div className="flex items-center justify-between">
                            <div>
                                <label htmlFor="editIsPaid" className="text-sm font-semibold text-slate-800 block">
                                    Premium Article (Paid)
                                </label>
                                <p className="text-[11px] text-slate-500">Stripe authorization rules look at this checkpoint status flag.</p>
                            </div>
                            
                            <label className="inline-flex items-center cursor-pointer relative select-none">
                                <input
                                    id="editIsPaid"
                                    type="checkbox"
                                    name="isPaid"
                                    checked={isPaid}
                                    onChange={handleToggleChange}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                            </label>
                        </div>

                        {isPaid && (
                            <div className="pt-2 border-t border-slate-200 animate-fadeIn">
                                <label className="block text-sm font-semibold text-slate-700 mb-1">
                                    Price (USD $)
                                </label>
                                <input
                                    type="number"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    placeholder="Enter premium tier price"
                                    min="1"
                                    step="0.01"
                                    required={isPaid}
                                    className="w-full sm:w-1/2 px-3 py-1.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                        )}
                    </div>
                    {/* =========================================================================== */}

                    {/* Image Section with Preview */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Blog Cover Image
                        </label>
                        
                        {previewUrl && (
                            <div className="mb-3 relative rounded-lg overflow-hidden border border-gray-200 bg-gray-50 h-36 w-full flex items-center justify-center">
                                <img 
                                    src={previewUrl} 
                                    alt="Blog Preview" 
                                    className="h-full w-full object-cover"
                                />
                                <span className="absolute top-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded">
                                    {imageFile ? "New Image Preview" : "Current Image"}
                                </span>
                            </div>
                        )}

                        <input 
                            type="file" 
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                        />
                        <p className="text-[11px] text-gray-400 mt-1">Agar image tabdeel nahi karni, to is field ko khali chor dein.</p>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
                        <button 
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            disabled={updateLoading}
                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors disabled:bg-indigo-400"
                        >
                            {updateLoading ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditBlogModal;