import React, { useState } from 'react';
import { RiDeleteBin6Fill } from "react-icons/ri";
import './UserSearch.css';

const UserAccount = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([
    { id: 1, fullName: 'John Doe', phone: '123-456-7890', email: 'john@example.com' },
    { id: 2, fullName: 'Jane Smith', phone: '987-654-3210', email: 'jane@example.com' },
    { id: 3, fullName: 'Jane Smith', phone: '987-654-3210', email: 'jane@example.com' },
    { id: 4, fullName: 'Jane Smith', phone: '987-654-3210', email: 'jane@example.com' },
    { id: 5, fullName: 'Jane Smith', phone: '987-654-3210', email: 'jane@example.com' },
    { id: 6, fullName: 'Jane Smith', phone: '987-654-3210', email: 'jane@example.com' },
    { id: 7, fullName: 'Jane Smith', phone: '987-654-3210', email: 'jane@example.com' },
    { id: 8, fullName: 'Jane Smith', phone: '987-654-3210', email: 'jane@example.com' },
    { id: 9, fullName: 'Jane Smith', phone: '987-654-3210', email: 'jane@example.com' },
    { id: 10, fullName: 'Jane Smith', phone: '987-654-3210', email: 'jane@example.com' },
    { id: 11, fullName: 'Jane Smith', phone: '987-654-3210', email: 'jane@example.com' }
  ]);
  const [filteredUsers, setFilteredUsers] = useState(users);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    const lowercasedQuery = e.target.value.toLowerCase();
    setFilteredUsers(users.filter(user =>
      user.fullName.toLowerCase().includes(lowercasedQuery) ||
      user.phone.includes(lowercasedQuery) ||
      user.email.toLowerCase().includes(lowercasedQuery)
    ));
  };

  const handleDelete = (id) => {
    setUsers(users.filter(user => user.id !== id));
    setFilteredUsers(filteredUsers.filter(user => user.id !== id));
  };

  return (
    <div className="useraccount-container">
      <div className='useraccount-header'>
        <h2>User Account</h2>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search users..."
          className="search-input"
        />
      </div>
      
      <div className='table-container'>
        <table className="user-table">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map(user => (
                <tr key={user.id}>
                  <td>{user.fullName}</td>
                  <td>{user.phone}</td>
                  <td>{user.email}</td>
                  <td className="action-buttons">
                    <button className="delete-button1" onClick={() => handleDelete(user.id)}>
                      <RiDeleteBin6Fill className='icon' /> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="4">No data</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserAccount;
