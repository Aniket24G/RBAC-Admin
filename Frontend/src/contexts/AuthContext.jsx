import React, { createContext, useEffect, useState } from 'react';
import { useContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser):null
    });

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("loggenInUser",JSON.stringify(userData));
    }

    const logout = () => {
        localStorage.removeItem('loggenInUser');
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{user,login,logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);