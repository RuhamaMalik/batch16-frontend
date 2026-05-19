import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BlogDetail = () => {
    const { id } = useParams(); // 👈 URL se blog ki unique ID nikalne ke liye
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogDetail = async () => {
            try {
                setLoading(true);
                // Apni API ke mutabiq URL check kar lein (e.g., /blog/get-blog/${id} ya /blog/${id})
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/blog/${id}`);
                if (response.data.success) {
                    setBlog(response.data.blog);
                }
            } catch (error) {
                console.error("Error fetching blog details:", error);
                alert("Blog load karne mein masla hua!");
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchBlogDetail();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (!blog) {
        return (
            <div className="text-center py-20 bg-gray-50 min-h-screen flex flex-col items-center justify-center">
                <h3 className="text-xl font-semibold text-gray-900">Blog not found!</h3>
                <button onClick={() => navigate(-1)} className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm">
                   Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-16">
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                
                {/* Back Button */}
                <div className="p-6 pb-0">
                    <button 
                        onClick={() => navigate(-1)} 
                        className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-indigo-600 transition-colors"
                    >
                        ← Back to Blogs
                    </button>
                </div>

                {/* Main Content Area */}
                <div className="p-6 sm:p-8">
                    {/* Title */}
                    <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-4">
                        {blog.title}
                    </h1>

                    {/* Meta Info (Author & Date) */}
                    <div className="flex items-center space-x-4 mb-6 pb-6 border-b border-gray-100 text-sm text-gray-500">
                        <div className="flex items-center space-x-2">
                            {/* Dummy Avatar Group */}
                            <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-semibold text-xs uppercase">
                                {blog.author?.name ? blog.author.name.substring(0, 2) : 'AU'}
                            </div>
                            <span className="font-medium text-gray-700">
                                {blog.author?.name || "Unknown Author"}
                            </span>
                        </div>
                        <span>•</span>
                        <span>
                            {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric', month: 'long', day: 'numeric'
                            }) : "No Date"}
                        </span>
                    </div>

                    {/* Big Cover Image */}
                    {blog.image && (
                        <div className="w-full aspect-[16/9] rounded-xl overflow-hidden mb-8 bg-gray-100 shadow-inner">
                            <img 
                                src={blog.image} 
                                alt={blog.title} 
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}

                    {/* Long Description / Content */}
                    <div className="prose max-w-none text-gray-700 text-base sm:text-lg leading-relaxed whitespace-pre-line">
                        {blog.content}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default BlogDetail;