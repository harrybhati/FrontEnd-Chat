import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute(){
    // protected route means if user is login or singup then user can go further routes other wise not 
    const auth=localStorage.getItem('user');
    // if data store in local store is true then user can move further routes otherwise not 
    // return auth ?<Outlet/>:<Navigate to='/'></Navigate>
        if (!auth) {
  return <Redirect to="/login" />;
}
    return(<>
    
    
    </>)
}
export default ProtectedRoute;
