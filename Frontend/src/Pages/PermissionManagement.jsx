import React, { useState, useEffect } from "react";

const initialPermissions = {
  dashboard: true,
  userManagement: false,
  roleManagement: false,
  permissionManagement: false,
};

const PermissionManagement = () => {
  const [permissions, setPermissions] = useState({});
  const [selectedUser, setSelectedUser] = useState("");

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    if (storedUsers.length > 0) {
      setSelectedUser(storedUsers[0].username);
      setPermissions(
        JSON.parse(localStorage.getItem(`permissions-${storedUsers[0].username}`)) ||
          initialPermissions
      );
    }
  }, []);

  const handleUserChange = (username) => {
    setSelectedUser(username);
    const userPermissions =
      JSON.parse(localStorage.getItem(`permissions-${username}`)) || initialPermissions;
    setPermissions(userPermissions);
  };

  const togglePermission = (permission) => {
    const updatedPermissions = { ...permissions, [permission]: !permissions[permission] };
    setPermissions(updatedPermissions);
    localStorage.setItem(`permissions-${selectedUser}`, JSON.stringify(updatedPermissions));
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Permission Management</h1>
      <select
        onChange={(e) => handleUserChange(e.target.value)}
        className="border px-4 py-2 mb-4"
      >
        {JSON.parse(localStorage.getItem("users")).map((user) => (
          <option key={user.username} value={user.username}>
            {user.username}
          </option>
        ))}
      </select>
      <div className="grid grid-cols-1 gap-4">
        {Object.keys(initialPermissions).map((permission) => (
          <div key={permission} className="flex items-center">
            <input
              type="checkbox"
              checked={permissions[permission]}
              onChange={() => togglePermission(permission)}
              className="mr-2"
            />
            <label>{permission}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PermissionManagement;
