import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

function ViewAllUsers() {
  const [userList, setUserList] = useState([]);

  const token = sessionStorage.getItem('access_token')
  // Set axios default header again for some readon
  axios.defaults.headers.common['Authorization'] = `Bearer ${sessionStorage.getItem('access_token')}`;

  // Gets all users from database
  useEffect(() => {
    if (token === null || jwtDecode(token).privilege !== 1) {
    } else {
      axios.get(`http://localhost:5000/admin/users`).then((res) => {
        setUserList(res.data);
      });
    }
  }, []); // will run each time a dependency value is changed (empty so only once)

  // Returns html showing all users in a database
  return (
    <div className="adminContainer">
      { userList.map((user, index) => {
        return (
          <div>
            <div className="user">
              <div className="id"> {user.user_id} </div>
              <div className="email"> {user.email} </div>
              <br></br>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ViewAllUsers;
