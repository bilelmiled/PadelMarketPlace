import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({children}) => {
 const {isAuthenticated, isAdmin, loading} = useContext(AuthContext);

    if(loading){
        return <div>Loading...</div>;
    }
    if(!isAuthenticated || !isAdmin){
        return <Navigate to="/login" replace />;
    }
   

  return children;
}

export default AdminRoute