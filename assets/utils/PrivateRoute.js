import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoutes = () => {
    // Check if the auth token exists in localStorage
    const authToken = localStorage.getItem('authToken');

    // If the authToken exists, allow access to the route (render Outlet)
    // Otherwise, redirect the user to the login page
    return authToken ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoutes;