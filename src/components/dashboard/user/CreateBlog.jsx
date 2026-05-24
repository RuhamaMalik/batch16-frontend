import React, { useState } from 'react';
import Api from '../../../services/api';

const CreateBlog = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: null,
    isPaid: false,  
    price: '',
  });
  const [preview, setPreview] = useState('');

const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

 const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = new FormData();
      dataToSend.append('title', formData.title);
      dataToSend.append('content', formData.content);
      dataToSend.append('image', formData.image);
      dataToSend.append('isPaid', formData.isPaid);
      
      if (formData.isPaid) {
        dataToSend.append('price', formData.price);
      }

      const response = await Api.post('/blog/create', dataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Form reset logic
      setFormData({
        title: '',
        content: '',
        image: null,
        isPaid: false,
        price: '',
      });
      setPreview("");
      
    } catch (error) {
      console.log("Error dynamic creation:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md border border-slate-100">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Create New Blog Post</h2>

    <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            Blog Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter a catchy title"
            required
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            Content
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Write your story here..."
            rows="6"
            required
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
          />
        </div>

        {/* ==================== STRIPE PREMIUM CONTROLS ==================== */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label htmlFor="isPaid" className="text-sm font-semibold text-slate-800 block">
                Premium Article (Paid)
              </label>
              <p className="text-xs text-slate-500">Enable this option to lock this blog via Stripe paywall.</p>
            </div>
            
            {/* Smooth Tailwind Toggle Switch */}
            <label className="inline-flex items-center cursor-pointer relative select-none">
              <input
                id="isPaid"
                type="checkbox"
                name="isPaid"
                checked={formData.isPaid}
                onChange={handleChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          {/* Conditional Animation/Rendering for Price Input */}
          {formData.isPaid && (
            <div className="pt-2 border-t border-slate-200 animate-fadeIn">
              <label className="block text-sm font-semibold text-slate-700 mb-1">
                Set Price (USD $)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Minimum $1.00"
                min="1"
                step="0.01"
                required={formData.isPaid} // Agar isPaid true hai, tabhi required hoga
                className="w-full sm:w-1/2 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
          )}
        </div>
        {/* ================================================================= */}

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">
            Cover Image
          </label>
          <div className="mt-1 flex flex-col items-center justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-lg hover:bg-slate-50 transition cursor-pointer relative">
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              required
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            {preview ? (
              <div className="w-full text-center">
                <img
                  src={preview}
                  alt="Preview"
                  className="mx-auto max-h-48 object-cover rounded-lg mb-2"
                />
                <p className="text-xs text-slate-500">Click or drag to replace</p>
              </div>
            ) : (
              <div className="space-y-1 text-center pointer-events-none">
                <svg
                  className="mx-auto h-12 w-12 text-slate-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4-4m4-4h8m-4-4v8m-12 4h.02"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    value=""
                  />
                </svg>
                <div className="text-sm text-slate-600">
                  <span className="text-blue-600 font-medium">Upload a file</span> or drag and drop
                </div>
                <p className="text-xs text-slate-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm hover:shadow transition-colors duration-200"
        >
          Publish Post
        </button>
      </form>


    </div>
  );
};

export default CreateBlog;
