import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getUser } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

const BlogsPage = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentUserId, setCurrentUserId] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        setCurrentUserId(getUser()._id);
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/blog/all`);
            if (response.data.success) {
                setBlogs(response.data.blogs);
            }
        } catch (error) {
            console.error("Error fetching blogs:", error);
        } finally {
            setLoading(false);
        }
    };

  const handleViewDetail = (blog) => {
    if (!blog.isPaid) {
        navigate(`/blog/${blog._id}`); 
        return;
    }

    if (!currentUserId) {
        alert("🔒 Please login first to access premium blogs!");
        return;
    }

    const hasPaid = blog.purchasedBy && blog.purchasedBy.includes(currentUserId);

    if (hasPaid) {
        navigate(`/blog/${blog._id}`); 
    } else {
        alert(`🔒 This is a Premium Post!\n\nAapko is blog ko parhne ke liye $${blog.price} pay karna hoga.`);
        // Yahan aap apna Stripe checkout handler call kar sakte hain
    }
};

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Latest Blog Posts</h2>
                    <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500">
                        Explore our free and premium articles.
                    </p>
                </div>

                {/* Blogs Grid */}
                {blogs.length === 0 ? (
                    <div className="text-center text-gray-500 py-12 text-lg">No blogs posted yet.</div>
                ) : (
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {blogs.map((blog) => {
                            // Check if current logged-in user unlocked this specific blog
                            const isUnlocked = blog.purchasedBy && blog.purchasedBy.includes(currentUserId);

                            return (
                                <div
                                    key={blog._id}
                                    className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                                >
                                    {/* Image with Dynamic Badge */}
                                    <div className="relative h-48 w-full bg-gray-100">
                                        <img
                                            src={blog.image}
                                            alt={blog.title}
                                            className="w-full h-full object-cover"
                                        />

                                        {blog.isPaid ? (
                                            <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold shadow-sm text-white ${isUnlocked ? 'bg-emerald-600' : 'bg-amber-500'}`}>
                                                {isUnlocked ? "Unlocked 🔓" : `Premium $${blog.price}`}
                                            </span>
                                        ) : (
                                            <span className="absolute top-3 right-3 bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
                                                Free
                                            </span>
                                        )}
                                    </div>

                                    {/* Info Content */}
                                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                                        <div className="space-y-2">
                                            <h3 className="text-xl font-bold text-gray-900 line-clamp-1">
                                                {blog.title}
                                            </h3>
                                            <p className="text-gray-500 text-sm line-clamp-3">
                                                {blog.content}
                                            </p>
                                        </div>

                                        {/* Actions */}
                                        <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                                            <span className="text-xs text-gray-400 font-medium">
                                                By: {blog.author?.name || "Author"}
                                            </span>

                                            <button
                                                onClick={() => handleViewDetail(blog)}
                                                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 ${blog.isPaid && !isUnlocked
                                                    ? 'bg-amber-500 hover:bg-amber-600 text-white'
                                                    : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                                                    }`}
                                            >
                                                {blog.isPaid && !isUnlocked ? "Unlock Post" : "View Details"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogsPage;