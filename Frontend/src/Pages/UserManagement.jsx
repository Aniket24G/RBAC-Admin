import React, { useState } from "react";
import { useEffect } from "react";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "../Utils/localStorageUtils.js";

const UserManagement = () => {
  const [users, setUsers] = useState(() =>
    loadFromLocalStorage("users", [
      {
        id: 1,
        username: "admin",
        role: "Admin",
      },
      {
        id: 2,
        username: "user",
        role: "User",
      },
    ])
  );

  const [roles] = useState(() => 
  loadFromLocalStorage("roles", [
    {id:1, name: "Admin"},
    {id:2, name:"User"},
  ]))

  const [username,setUsername] = useState("")
  const [selectedRole,setSelectedRole] = useState("")

  useEffect(() => {
    saveToLocalStorage("users",users)
  },[users])

  const handleAddUser = () => {
    if(username && selectedRole) {
      const newUser = {
        id: users.length+1,
        username, 
        role: selectedRole
      };
      setUsers([...users, newUser])
      setUsername("");
      setSelectedRole("")
    }else{
      alert("please fill all details")
    }
  }

  const handleDeleteUser = (id) => {
    const filteredUsers = users.filter((user) => user.id!==id);
    setUsers(filteredUsers);
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">User Management</h1>

      <div className="mt-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 mr-4"
        />

        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="border p-2 mr-4"
        >
          <option value="">Select Role</option>
          {roles.map((role) => (
            <option key={role.id} value={role.name}>
              {role.name}
            </option>
          ))}
        </select>

        <button
          onClick={handleAddUser}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add User
        </button>
      </div>

      <ul className="mt-8 space-y-4">
        {users.map((user) => (
          <li
            key={user.id}
            className="flex justify-between p-4 border rounded"
          >
            <div>
              <strong>{user.username}</strong> - Role: {user.role}
            </div>
            <button
              onClick={() => handleDeleteUser(user.id)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;
