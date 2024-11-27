import React, { useEffect, useState } from "react";
import Modal from "../Components/Modal";
import Table from "../Components/Table";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    username: "",
    role: "User",
    password: "",
  });

  const [editUser, setEditUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  //handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  //pagination logic
  const totalItems = users.length;
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
    if (editUser) {
      setEditUser({ ...editUser, [name]: value });
    }
  };

  const addUser = () => {
    const userWithDefaultPassword = {
      ...newUser,
      password: `${newUser.username}123`,
    };

    const updatedUsers = [...users, userWithDefaultPassword];
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setShowModal(false);
    setNewUser({ username: "", role: "User", password: "" });
  };

  const deleteUser = (username) => {
    const updatedUsers = users.filter((u) => u.username !== username);
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const handleEditUser = (user) => {
    setEditUser({ ...user });
    setShowModal(true);
  };

  const saveEdits = () => {
    const updateUsers = users.map((user) =>
      user.username === editUser.username ? editUser : user
    );
    setUsers(updateUsers);
    localStorage.setItem("users", JSON.stringify(updateUsers));
    setShowModal(false);
    setEditUser(null);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditUser(null);
  };

  const tableHeaders = ["Username", "Role"];

  const tableActions = (user) => (
    <>
      <button
        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 mr-2"
        onClick={() => deleteUser(user.username)}
      >
        Delete
      </button>
      <button
        className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
        onClick={() => handleEditUser(user)}
      >
        Edit
      </button>
    </>
  );

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={() => setShowModal(true)}
      >
        Add User
      </button>
      {/* Table of users */}
      <Table
        headers={tableHeaders}
        data={currentUsers.map((user) => ({
          username: user.username,
          role: user.role,
        }))}
        actions={tableActions}
        currentPage={currentPage}
        itemspPerPage={itemsPerPage}
        totalItems={totalItems}
        onPageChange={handlePageChange}
      ></Table>

      {/* Add/Edit user modal */}
      <Modal
        showModal={showModal}
        closeModal={closeModal}
        onSubmit={editUser ? saveEdits : addUser}
        title={editUser ? "Save changes" : "Add User"}
      >
        <input
          type="text"
          name="username"
          value={editUser ? editUser.username : newUser.username}
          onChange={handleInputChange}
          className="border px-4 py-2 w-full mb-4"
        />
        <select
          name="role"
          value={editUser ? editUser.role : newUser.role}
          onChange={handleInputChange}
          className="border px-4 py-2 w-full mb-4"
        >
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </select>
      </Modal>
    </div>
  );
};

export default Dashboard;
