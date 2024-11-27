import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <div className="flex justify-between">
        <p className="mr-4 font-bold text-xl">Access Board</p>
        
        {user?.role === "Admin" && (
          <>
            <Link to="/dashboard" className="mr-4">Dashboard</Link>
            <Link to="/users" className="mr-4">User Management</Link>
            <Link to="/permissions" className="mr-4">Permission Management</Link>
          </>
        )}
        {user?.role === "User" && <Link to="/user-dashboard" className="mr-4">Dashboard</Link>}
      </div>
      {user && (
        <button onClick={logout} className="bg-blue-500 px-4 py-2 rounded hover:bg-slate-200 hover:text-blue-500 font-bold duration-200">Logout</button>
      )}
      
    </nav>
  );
};

export default Navbar;
