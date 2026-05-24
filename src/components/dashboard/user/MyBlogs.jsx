import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditBlogModal from '../EditBlogModal';
import { getToken } from '../../../utils/auth';
import { useNavigate } from 'react-router-dom';

const MyBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // --- State for Modal Control ---
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState(null);

    const fetchMyBlogs = async () => {
        try {
            setLoading(true);
            const token = getToken();
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/blog/my-blogs`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setBlogs(response.data.blogs);
        } catch (error) {
            console.error("Error fetching blogs:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyBlogs();
    }, []);

    const handleEditClick = (blog) => {
        setSelectedBlog(blog);
        setIsModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-16">
            <div className="max-w-7xl mx-auto">

                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-200 pb-5 mb-10 gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">My Published Blogs</h1>
                        <p className="mt-2 text-sm text-gray-500">Manage and view all the articles you have created.</p>
                    </div>
                    <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                        Total: {blogs.length}
                    </span>
                </div>

                {/* Loading & Empty States */}
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
                    </div>
                ) : blogs.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100 max-w-md mx-auto">
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No blogs found</h3>
                    </div>
                ) : (
                    /* Blogs Grid Layout */
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogs.map((blog) => (
                            <article key={blog._id} className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                                <div className="h-48 w-full overflow-hidden relative bg-gray-200">
                                    <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                                    {/* Badges Layout */}
                                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                                        {blog?.isPaid && (
                                            <span className="bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-semibold px-2.5 py-1 rounded-md shadow-sm w-fit">
                                                Paid
                                            </span>
                                        )}

                                        {/* 👇 Red Badge for Blocked Blogs */}
                                        {blog?.isBlocked && (
                                            <span className="bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-sm w-fit flex items-center gap-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd" />
                                                </svg>
                                                Blocked by Admin
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="flex flex-col flex-1 p-6">
                                    <div className="flex-1">
                                        <h2 className="text-xl font-bold text-gray-900 line-clamp-2 mb-3">{blog.title}</h2>
                                        <p className="text-gray-600 text-sm line-clamp-3 mb-4">{blog.content}</p>
                                    </div>
                                    <div className="flex justify-between items-center pt-4 border-t border-gray-100 mt-auto">
                                        <button onClick={() => navigate(`/dashboard/blog/${blog._id}`)} className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">
                                            Read More &rarr;
                                        </button>

                                        <button
                                            onClick={() => handleEditClick(blog)}
                                            className="inline-flex items-center px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>

            {/* ==================== CLEAN IMPLEMENTATION OF MODAL ==================== */}
            <EditBlogModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                blogData={selectedBlog}
                onUpdateSuccess={fetchMyBlogs} // 👈 Success par data dobara reload karne ke liye function pass kiya
            />
        </div>
    );
};

export default MyBlogs;