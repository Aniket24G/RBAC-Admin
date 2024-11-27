import React from "react";
import UserManagement from "./Pages/UserManagement";
import PermissionManagment from './Pages/PermissionManagement'
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Navbar from "./Components/Navbar";
import { AuthProvider, useAuth} from './contexts/AuthContext'
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { sampleData } from "./Utils/sampleData.js";
import UserDashboard from "./Pages/UserDashboard";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

function App() {
  useEffect(() => {
    sampleData();
  },[])
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
          path="/user-dashboard"
          element={
            <PrivateRoute>
              <UserDashboard />
            </PrivateRoute>
          } 
          />
          <Route
          path="/users"
          element={
            <PrivateRoute>
              <UserManagement />
            </PrivateRoute>
          }
          />
          <Route
          path="/permissions"
          element={
            <PrivateRoute>
              <PermissionManagment />
            </PrivateRoute>
          }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;