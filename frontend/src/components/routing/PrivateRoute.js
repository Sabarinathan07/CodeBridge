import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import React from 'react';

// This is a wrapper component for v6
const PrivateRoute = ({ children }) => {
    const { isAuthenticated, loading } = useSelector((state) => state.auth);

    if (loading) {
        // Optionally, render a loading indicator
        return <div>Loading...</div>;
    }

    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
