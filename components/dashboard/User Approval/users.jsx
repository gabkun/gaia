import React, { useEffect, useState } from 'react';
import Sidebar from "../sidebar.jsx";
import axios from 'axios';
import Modal from './Modal.jsx'; 

export default function UsersTbl() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3001/users/getusers')
      .then(res => setUsers(res.data))
      .catch(err => console.log(err));
  }, []);


  const handleApprove = (userId) => {
    setIsButtonDisabled(true);
    axios.post(`http://localhost:3001/users/approve/${userId}`)
      .then(res => {
        if (res.status === 200) {
          setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
          console.log('User approved successfully');
        } else {
          console.error('Failed to approve user');
        }
      })
      .catch(err => {
        console.log(err);
        setIsButtonDisabled(false);  
      });
  };

  const handleView = async (user) => {
    try {
      const response = await axios.get(`http://localhost:3001/users/getuser/${user.user_id}`);
      setSelectedUser(response.data); // Set the detailed client data
      setShowModal(true); // Show the modal
    } catch (error) {
      console.error('Error fetching client details:', error);
    }
  };
  const handleDecline = (userId) => {
    setIsButtonDisabled(true);
    axios.post(`http://localhost:3001/users/decline/${userId}`)
      .then(res => {
        if (res.status === 200) {
          setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
          console.log('User declined');
        } else {
          console.error('Failed to Decline user');
        }
      })
      .catch(err => {
        console.log(err);
        setIsButtonDisabled(false);  
      });
  };

  return (
    <>
      <div className="flex flex-row">
        <Sidebar />
        <div className="bg-gray-300 p-4 w-full ml-[20%] flex flex-col justify-around gap-2 p-2 lg:p-0">
          <div className="w-full h-20 text-2xl font-semibold text-black bg-gray-200 flex items-center">
            USER APPROVAL
          </div>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className='text-xs text-gray-700 uppercase bg-gray-50'> 
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Password</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID Attached</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
            {users
                .filter(user => user.status === 1) // Only show users with status 'ON HOLD'
                .map((user, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                  <td className="px-6 py-4 whitespace-nowrap">{user.user_id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.fname}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.lname}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.password}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.document}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                      {user.status === 1 && 'ON HOLD'}
                    </td>
                  <td className="px-6 py-4 whitespace-nowrap flex space-x-2"> 
                  <button
                        disabled={isButtonDisabled}
                        className={`px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={() => handleApprove(user.user_id)}
                      >
                        Approve
                      </button>
                    <button className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out" onClick={() => handleView(user)}>View</button>
                    <button
                      disabled={isButtonDisabled}
                      className={`px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-700 transition duration-150 ease-in-out ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                      onClick={() => handleDecline(user.user_id)}
                    >
                      Decline
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>


          {showModal && selectedUser && (
            <Modal
              show={showModal}
              onClose={() => setShowModal(false)}
              user={selectedUser}
            >
              <div>
                <h2>User Information</h2>
                <p><strong>First Name:</strong> {selectedUser.firstname}</p>
                <p><strong>Last Name:</strong> {selectedUser.lastname}</p>
                <p><strong>Username:</strong> {selectedUser.username}</p>
                <p><strong>Email:</strong> {selectedUser.email}</p>
                <p><strong>ID Attached:</strong> 
                  <a href={selectedUser.document} target="_blank" rel="noopener noreferrer">
                    View Document
                  </a>
                </p>
                <p><strong>Status:</strong> {selectedUser.status}</p>
              </div>
            </Modal>
          )}
        </div>
      </div>
    </>
  );
}