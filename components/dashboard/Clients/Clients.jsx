import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../sidebar';

export default function Clients() {
  const [clients, setClients] = useState([]); // State to store the clients data
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors

  // Fetch clients data from the backend
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get('http://localhost:3001/client/getallclients'); // Adjust the URL if necessary
        setClients(response.data); // Store the fetched data
        setLoading(false); // Set loading to false after data is fetched
      } catch (err) {
        console.error('Error fetching clients:', err);
        setError('Failed to fetch client data'); // Handle error
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
     <div className="flex flex-row">
        <Sidebar />
        <div className="bg-gray-300 p-4 w-full ml-[20%] flex flex-col justify-around gap-2 p-2 lg:p-0">
          <div className="w-full h-20 text-2xl font-semibold text-black bg-gray-200 flex items-center">
            CLIENTS
          </div>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className='text-xs text-gray-700 uppercase bg-gray-50'> 
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Password</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                  <td className="px-6 py-4 whitespace-nowrap">{client.user_id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{client.username}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{client.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{client.CONTACT}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{client.ADDRESS}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{client.PASSWORD}</td>
                  <td className="px-6 py-4 whitespace-nowrap flex space-x-2"> 

                    <button 
                      className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out" 
                    //   onClick={() => handleView(client)}
                    >
                      Edit
                    </button>
                    <button 
                      className="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-700 transition duration-150 ease-in-out" 
                    //   onClick={() => handleDecline(client.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          </div>

  );
}