import React, { useEffect, useState } from 'react';
import Sidebar from "../sidebar.jsx";
import axios from 'axios';
import Modal from './Modal.jsx'; 

export default function ClientsTbl() {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  // Fetch the list of clients when the component is mounted
  useEffect(() => {
    axios.get('http://localhost:3001/client/getclients')
      .then(res => setClients(res.data.filter(client => client.status !== 'declined' && client.status !== 'APPROVED')))
      .catch(err => console.log(err));
  }, []);

  // Handle the decline functionality
  const handleDecline = (userId) => {
    setIsButtonDisabled(true);
    axios.post(`http://localhost:3001/client/decline/${userId}`)
      .then(res => {
        if (res.status === 200) {
          setClients(prevUsers => prevUsers.filter(user => user.id !== userId));
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


  // Handle the view functionality to fetch detailed client information
  const handleView = async (client) => {
    try {
      const response = await axios.get(`http://localhost:3001/client/getclient/${client.user_id}`);
      setSelectedClient(response.data); // Set the detailed client data
      setShowModal(true); // Show the modal
    } catch (error) {
      console.error('Error fetching client details:', error);
    }
  };

  // Handle the approve functionality
  const handleApprove = (userId) => {
    setIsButtonDisabled(true);
    axios.post(`http://localhost:3001/client/approve/${userId}`)
      .then(res => {
        if (res.status === 200) {
          setClients(prevUsers => prevUsers.filter(user => user.id !== userId));
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


  return (
    <>
      <div className="flex flex-row">
        <Sidebar />
        <div className="bg-gray-300 p-4 w-full ml-[20%] flex flex-col justify-around gap-2 p-2 lg:p-0">
          <div className="w-full h-20 text-2xl font-semibold text-black bg-gray-200 flex items-center">
            CLIENT APPROVAL
          </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Password</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document Attached</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {clients
                .filter(client => client.status === 1) // Only show users with status 'ON HOLD'
                .map((client, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                    <td className="px-6 py-4 whitespace-nowrap">{client.user_id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{client.username}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{client.compemail}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{client.password}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{client.document}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {client.status === 1 && 'ON HOLD'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap flex space-x-2">
                      <button
                        disabled={isButtonDisabled}
                        className={`px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={() => handleApprove(client.user_id)}
                      >
                        Approve
                      </button>
                      <button
                        className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out"
                        onClick={() => handleView(client)}
                      >
                        View
                      </button>
                      <button
                        disabled={isButtonDisabled}
                        className={`px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-700 transition duration-150 ease-in-out ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={() => handleDecline(client.user_id)}
                      >
                        Decline
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          {showModal && selectedClient && (
            <Modal
              show={showModal}
              onClose={() => setShowModal(false)}
              client={selectedClient}
            >
 
            </Modal>
          )}
        </div>
      </div>
    </>
  );
}
