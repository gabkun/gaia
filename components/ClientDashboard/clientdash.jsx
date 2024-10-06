import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Addproducts from './Selling/addproducts'; 
import Sidebar from './sidebar';
import TopBar from './topbar';

export default function ClientDashboard() {
  const { user_id } = useParams();
  const [userData, setUserData] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/client/getclient/${user_id}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, [user_id]);


  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3001/accounts/logout');
      navigate('/login', { replace: true }); 
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };


  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <TopBar handleLogout={handleLogout} /> 
      <div className="flex flex-1">
        <Sidebar user_id={user_id} /> 

      <div className="flex-1 bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-6">Client's Dashboard</h1>
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex items-center">
              <div className="w-24 h-24 mr-6">
                <img
                  src={userData?.profilePicture || 'https://via.placeholder.com/150'}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
              <p className="text-lg font-semibold">User ID: {user_id}</p>
                  {userData && (
                    <div className="mt-4">
                      <p className="text-lg font-semibold">Full Name: {userData.fname}</p>
                      <p className="text-lg font-semibold">
                        Subscription: {userData.subscriptionType === 1 
                          ? 'Free Plan' 
                          : userData.subscriptionType === 2 
                          ? 'Silver Plan' 
                          : userData.subscriptionType === 3 
                          ? 'Gold Plan' 
                          : 'No Subscription'}
                      </p>
                    <button
                      className={`font-bold py-2 px-4 rounded mb-4 ${
                        userData.subscription_id
                          ? "bg-green-500 hover:bg-green-600 text-white"
                          : "bg-gray-400 text-white cursor-not-allowed"
                      }`}
                      disabled={!userData.subscription_id}
                    >
                      Add +
                    </button>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
        <div className="product-data">
          <h2 className="text-2xl font-bold mt-8 mb-4">Truck Products</h2>
          {products.length === 0 ? (
            <p>No products. Add products now.</p>
          ) : (
            <table className="w-full border-collapse border border-gray-600">
              <thead>
                <tr>
                  <th className="py-2 px-4 border border-gray-600">Product Type</th>
                  <th className="py-2 px-4 border border-gray-600">Product Brand</th>
                  <th className="py-2 px-4 border border-gray-600">Product Model</th>
                  <th className="py-2 px-4 border border-gray-600">Purpose</th>
                  <th className="py-2 px-4 border border-gray-600">Price</th>
                  <th className="py-2 px-4 border border-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border border-gray-600">{product.type}</td>
                    <td className="py-2 px-4 border border-gray-600">{product.brand}</td>
                    <td className="py-2 px-4 border border-gray-600">{product.model}</td>
                    <td className="py-2 px-4 border border-gray-600">{product.purpose}</td>
                    <td className="py-2 px-4 border border-gray-600">{product.price}</td>
                    <td className="py-2 px-4 border border-gray-600">
                      <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded mr-2">Edit</button>
                      <button 
                        className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded"
                        // onClick={() => handleDeleteProduct(product.id)}
                      >Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        </div>
      </div>
    </div>
  );
}