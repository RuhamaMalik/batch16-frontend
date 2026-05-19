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
                path:'create-blog',
                element:<CreateBlog/>
                
            },
              
            {
                path:'my-blog',
                element:<MyBlogs/>
                
            },
              
            {
                path:'blog/:id',
                element:<BlogDetail/>
                
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
        ]
    },

    { path: '/auth', element: <AuthForm /> }
]);

export default router;