import React, { useState, useEffect } from 'react';
import './UserSearch.css';
import axios from 'axios';

const UserAccount = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const fetchuser = async () => {
    try {
      const userResponse = await axios.get("http://localhost:5000/userprofile/getuser");
      const userData = userResponse.data;
      
      // Fetch addresses for each user
      const userdetails = await Promise.all(
        userData.map(async user => {
          try {
            const addressResponse = await axios.get( `http://localhost:5000/userprofile/getaddress/${user._id}`);

            if(addressResponse){
            const addressdata=addressResponse.data
            const fullAddress = [
              addressdata.address1,
              addressdata.address2,
              addressdata.address3
            ].filter(Boolean).join(', ');

            return {
              ...user,
              address: fullAddress
            };}

          } catch (error) {
            return {
              ...user,
              address: "No address added"
            };
          }
        })
      );
      setUsers(userdetails);
      setFilteredUsers(userdetails);
    } catch (error) {
      console.error("Error occurred during fetching user data:", error);
    }
  };
  

  useEffect(() => {
    fetchuser();
  }, []);

  const handleSearch = (e) => {
    const lowercasedQuery = e.target.value.toLowerCase();
    setSearchQuery(lowercasedQuery);
    setFilteredUsers(users.filter(user =>
      user.username.toLowerCase().includes(lowercasedQuery) ||
      (user.phonenumber && user.phonenumber.includes(lowercasedQuery)) ||
      user.email.toLowerCase().includes(lowercasedQuery) ||
      user.role.toLowerCase().includes(lowercasedQuery)
    ));
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
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Role</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map(user => (
                <tr key={user._id}>
                  <td>{user.username}</td>
                  <td>{user.phonenumber ? user.phonenumber : "No phone number entered"}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.address}</td>
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
