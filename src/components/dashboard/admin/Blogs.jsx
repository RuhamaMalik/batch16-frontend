import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../../../utils/auth';


const Blogs = () => {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // --- Pagination States ---
    const [currentPage, setCurrentPage] = useState(1);
    const [blogsPerPage] = useState(5); // Ek page par 5 entries dikhane ke liye

    useEffect(() => {
        fetchAdminBlogs();
    }, []);

    const fetchAdminBlogs = async () => {
        try {
            setLoading(true);
            const token = getToken();
            // Admin endpoint jahan se blocked aur active saare blogs milte hain
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/admin/blog/all`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.data.success) {
                setBlogs(response.data.blogs);
            }
        } catch (error) {
            console.error("Failed to fetch admin data:", error);
            alert("Error loading admin blogs panel");
        } finally {
            setLoading(false);
        }
    };

    // --- 1. Toggle Block / Unblock ---
    const handleToggleBlock = async (blogId, currentStatus) => {
        try {
            const token = getToken();
            const response = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/blog/toggle-block/${blogId}`,
                { isBlocked: !currentStatus },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.data.success) {
                // Local state updates directly to prevent hard reloads
                setBlogs(blogs.map(blog => 
                    blog._id === blogId ? { ...blog, isBlocked: !currentStatus } : blog
                ));
            }
        } catch (error) {
            alert(error.response?.data?.message || "Action failed");
        }
    };

    // --- 2. Delete Blog Handler ---
    const handleDeleteBlog = async (blogId) => {
        if (!window.confirm("Are you absolute sure you want to delete this blog post permanently?")) return;
        
        try {
            const token = getToken();
            const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/blog/delete/${blogId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.data.success) {
                alert("Blog deleted successfully! 🗑️");
                setBlogs(blogs.filter(blog => blog._id !== blogId));
            }
        } catch (error) {
            alert("Failed to delete the blog");
        }
    };

    // --- Pagination Logic Hooks ---
    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
    const totalPages = Math.ceil(blogs.length / blogsPerPage);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-6">
                
                {/* Panel Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-6 rounded-2xl border border-slate-100 shadow-sm gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Admin Control Center</h1>
                        <p className="text-sm text-slate-500">Manage all system blogs, visibility status, and premium parameters.</p>
                    </div>
                    <div className="bg-indigo-50 text-indigo-700 text-xs font-semibold px-3 py-1.5 rounded-lg border border-indigo-100">
                        Total System Entries: {blogs.length}
                    </div>
                </div>

                {/* Main Data Table */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-100 text-slate-600 text-xs uppercase font-semibold tracking-wider">
                                    <th className="px-6 py-4">Cover / Info</th>
                                    <th className="px-6 py-4">Author</th>
                                    <th className="px-6 py-4">Access Tier</th>
                                    <th className="px-6 py-4">Status Flag</th>
                                    <th className="px-6 py-4 text-right">Operations</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                                {currentBlogs.map((blog) => (
                                    <tr key={blog._id} className="hover:bg-slate-50/50 transition-colors">
                                        
                                        {/* Cover / Info */}
                                        <td className="px-6 py-4 flex items-center space-x-3">
                                            <img src={blog.image} alt="" className="w-12 h-12 rounded-lg object-cover bg-slate-100 flex-shrink-0" />
                                            <div className="max-w-xs sm:max-w-md">
                                                <div className="font-semibold text-slate-900 truncate">{blog.title}</div>
                                                <div className="text-xs text-slate-400 line-clamp-1">{blog.content}</div>
                                            </div>
                                        </td>

                                        {/* Author */}
                                        <td className="px-6 py-4">
                                            <span className="font-medium text-slate-800 block">{blog.author?.name || "Unknown Author"}</span>
                                            <span className="text-xs text-slate-400">{blog.author?.email || "No email available"}</span>
                                        </td>

                                        {/* Access Tier */}
                                        <td className="px-6 py-4">
                                            {blog.isPaid ? (
                                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                                                    Premium (${blog.price})
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-200">
                                                    Standard (Free)
                                                </span>
                                            )}
                                        </td>

                                        {/* Status Toggle Block / Unblock */}
                                        <td className="px-6 py-4">
                                            <label className="inline-flex items-center cursor-pointer relative select-none">
                                                <input 
                                                    type="checkbox" 
                                                    checked={!blog.isBlocked} 
                                                    onChange={() => handleToggleBlock(blog._id, blog.isBlocked)}
                                                    className="sr-only peer"
                                                />
                                                <div className="w-9 h-5 bg-rose-500 rounded-full peer peer-focus:outline-none peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
                                                <span className="text-xs font-semibold ml-2 text-slate-600 min-w-[50px]">
                                                    {blog.isBlocked ? "Blocked" : "Live"}
                                                </span>
                                            </label>
                                        </td>

                                        {/* Operations (Eye / Delete Icons) */}
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end space-x-3">
                                                
                                                {/* Eye Icon (View Details Directly without payment validation) */}
                                                <button 
                                                    onClick={() => navigate(`/admin/blog/${blog._id}`)}
                                                    className="p-1.5 hover:bg-slate-100 text-slate-500 hover:text-indigo-600 rounded-lg transition-colors group"
                                                    title="View Details"
                                                >
                                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                </button>

                                                {/* Delete Icon */}
                                                <button 
                                                    onClick={() => handleDeleteBlog(blog._id)}
                                                    className="p-1.5 hover:bg-rose-50 text-slate-500 hover:text-rose-600 rounded-lg transition-colors"
                                                    title="Delete Permanently"
                                                >
                                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>

                                            </div>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* --- Pagination Footer Controller --- */}
                    {totalPages > 1 && (
                        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                            <span className="text-xs text-slate-500">
                                Showing {indexOfFirstBlog + 1} to {Math.min(indexOfLastBlog, blogs.length)} of {blogs.length} records
                            </span>
                            <div className="inline-flex space-x-1">
                                <button 
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    className="px-3 py-1 bg-white border border-slate-200 text-slate-600 rounded-md text-xs font-medium hover:bg-slate-50 disabled:opacity-50 disabled:hover:bg-white transition-colors"
                                >
                                    Previous
                                </button>
                                
                                {[...Array(totalPages)].map((_, index) => (
                                    <button
                                        key={index + 1}
                                        onClick={() => setCurrentPage(index + 1)}
                                        className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                                            currentPage === index + 1 
                                            ? 'bg-indigo-600 text-white border border-indigo-600' 
                                            : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                                        }`}
                                    >
                                        {index + 1}
                                    </button>
                                ))}

                                <button 
                                    disabled={currentPage === totalPages}
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    className="px-3 py-1 bg-white border border-slate-200 text-slate-600 rounded-md text-xs font-medium hover:bg-slate-50 disabled:opacity-50 disabled:hover:bg-white transition-colors"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Blogs;