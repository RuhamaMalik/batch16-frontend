import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setToken, setUser } from "../utils/auth";
import axios from "axios";

const AuthForm = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("login");
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/signin`, formData);

            if (data.success) {
                setUser(data.user)
                setToken(data.token)
                setFormData({
                    email: "",
                    password: "",
                })
                navigate("/")
            }


        } catch (error) {
            console.log('SginIn ERROR: ', error.message);
        }


    };

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/signup`, formData);

            if (data.success) {
                setUser(data.user);
                setToken(data.token);
                setFormData({
                    email: "",
                    password: "",
                })
                navigate("/");
            }



        } catch (error) {
            console.log('Signup ERROR: ', error);
        }


    };

    const handleSubmit = (e) => {
        if (activeTab === "login") {
            handleLogin(e);
        } else {
            handleSignup(e);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">

                {/* Tabs */}
                <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
                    <button
                        onClick={() => setActiveTab("login")}
                        className={`w-1/2 py-2 rounded-lg font-medium transition ${activeTab === "login"
                            ? "bg-purple-500 text-white"
                            : "text-gray-600"
                            }`}
                    >
                        Login
                    </button>

                    <button
                        onClick={() => setActiveTab("signup")}
                        className={`w-1/2 py-2 rounded-lg font-medium transition ${activeTab === "signup"
                            ? "bg-purple-500 text-white"
                            : "text-gray-600"
                            }`}
                    >
                        Signup
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400"
                    />



                    <Link className="m-3 text-purple-500 block"  to={"/forgot-password"} >Forgot Password?</Link>

                    <button
                        type="submit"
                        className="w-full bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-600 transition"
                    >
                        {activeTab === "login" ? "Login" : "Signup"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AuthForm