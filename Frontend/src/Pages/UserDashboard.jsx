import React from 'react'
import { useAuth } from '../contexts/AuthContext'

function UserDashboard() {
    const { user } = useAuth();
  return (
    <>
    <div className='p-8'>
        <h2>Welcome, {user.username}</h2>
        <p>Your role: {user.role}</p>
        <p>Permissions: {user.role==="admin" ? "Full access":"View only"}</p>
    </div>
    </>
  )
}

export default UserDashboard