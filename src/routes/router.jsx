import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import ProtectedRoute from '../components/ProtectedRoute';
// import ChangePassword from '../components/dashboard/user/ChangePassword';
import Dashboard from '../components/dashboard/admin/Dashboard';
import DashboardLayout from '../layout/DashboardLayout';
import ForgotPswd from '../pages/ForgotPswd';
import ResetPaswd from '../pages/ResetPaswd';
import AuthForm from '../components/AuthForm';
import CreateBlog from '../components/dashboard/user/CreateBlog';
import MyBlogs from '../components/dashboard/user/MyBlogs';
import BlogDetail from '../components/BlogDetail';
import Blogs from '../components/dashboard/admin/Blogs';
import Users from '../components/dashboard/admin/Users';
import BlogsPage from '../pages/Blog';
import AboutPage from '../pages/About';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: (
                    <Home />
                ),
            },

            {
                path: 'forgot-password',
                element: (
                    <ForgotPswd />
                ),
            },
            {
                path: 'reset-password/:token',
                element: (
                    <ResetPaswd />
                ),
            },
            {
                path: 'blogs',
                element: (
                    <BlogsPage />
                ),
            },
            {
                path: 'blog/:id',
                element: <BlogDetail />

            },
            {
                path: 'about',
                element: (
                    <AboutPage />
                ),
            },



        ],
    },

    ////////// Dashboard 

    {
        path: 'dashboard',
        element: (
            <ProtectedRoute>
                <DashboardLayout />
            </ProtectedRoute>),
        children: [
            {
                index: true,
                element: (
                    <h1>Profile Page</h1>
                ),
            },
            {
                path: 'create-blog',
                element: <CreateBlog />

            },

            {
                path: 'my-blog',
                element: <MyBlogs />

            },

            {
                path: 'blog/:id',
                element: <BlogDetail />

            },





        ],
    },


    ////////// ADMIN 

    {
        path: 'admin',
        element: (
            <ProtectedRoute role="admin">
                <DashboardLayout />
            </ProtectedRoute>
        ),
        children: [
            {
                index: true,
                element: (
                    <Dashboard />
                ),
            },
            {
                path: "dashboard", element: (
                    <Dashboard />
                ),
            },
            {
                path: 'create-blog',
                element: <CreateBlog />

            },

            {
                path: 'my-blog',
                element: <MyBlogs />

            },
            {
                path: 'blogs',
                element: <Blogs />

            },
             {
                path: 'blog/:id',
                element: <BlogDetail />

            },

            {
                path: 'users',
                element: <Users />

            },
        ]
    },

    { path: '/auth', element: <AuthForm /> }
]);

export default router;