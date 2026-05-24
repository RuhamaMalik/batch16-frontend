import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    
    const blogId = searchParams.get('blogId');
    const userId = searchParams.get('userId');

    useEffect(() => {
        const unlockBlog = async () => {
            try {
                // save user entry in db
                await axios.post(`${import.meta.env.VITE_BACKEND_URL}/payment-success-webhook`, {
                    blogId,
                    userId
                });
                
                alert("🎉 Payment Successful! Blog Unlocked.");
                // navigate to unlocked blog 
                navigate(`/blog/${blogId}`);
            } catch (error) {
                console.error(error);
                alert("Error unlocking your blog. Please contact support.");
            }
        };

        if (blogId && userId) {
            unlockBlog();
        }
    }, [blogId, userId]);

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2>Processing your payment...</h2>
            <p>Please do not close or refresh this page.</p>
        </div>
    );
};

export default PaymentSuccess;