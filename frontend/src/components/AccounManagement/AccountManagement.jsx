import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AccountManagement.scss'; // Import custom CSS file for styling

function AccountManagement() {
  const [users, setUsers] = useState([]);
  const [searchId, setSearchId] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const result = await axios.get('/api/users');
      setUsers(result.data.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSearch = async () => {
    try {
      const result = await axios.get(`/api/users/info/${searchId}`);
      setUsers(result.data.value ? [result.data.value] : []);
    } catch (error) {
      console.error('Error searching user:', error);
    }
  };

  const handleInputChange = (event) => {
    setSearchId(event.target.value);
  };

  return (
    <div className="account-management-container">
      <h2>Quản lý tài khoản</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter user ID"
          value={searchId}
          onChange={handleInputChange}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>
      <table className="user-table">
        <thead>
          <tr>
            <th className="table-header">ID</th>
            <th className="table-header">Name</th>
            <th className="table-header">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="table-data">{user.id}</td>
              <td className="table-data">{user.name}</td>
              <td className="table-data">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AccountManagement;
