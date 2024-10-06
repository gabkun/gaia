import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../sidebar';
import TopBar from '../topbar';

export default function Rental() {
  const { clientId } = useParams();
  const [userData, setUserData] = useState(null);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentRenters, setCurrentRenters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    selectedProduct: '',
    rate: '',
    renter: '',
    borrowed: '',
    returned: '',
    file: null
  });
  const [returnData, setReturnData] = useState({
    rentId: null,
    returnedDate: ''
  });
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3001/accounts/logout');
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/client/getclient/${clientId}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [clientId]);

  useEffect(() => {
    const fetchCurrentRenters = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/products/${clientId}/current-renters`);
        setCurrentRenters(response.data.renters);
      } catch (error) {
        console.error('Error fetching current renters:', error);
      }
    };
    fetchCurrentRenters();
  }, [clientId]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/products/getproducts/client/${clientId}`);
        setProducts(response.data);

        const filtered = response.data.filter(product => product.purpose === 'RENT');
        setFilteredProducts(filtered);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [clientId]);

  const handleAddProductClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setReturnData({ rentId: null, returnedDate: '' });
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: files ? files[0] : value
    }));
  };

  const handleProductChange = (e) => {
    setFormData(prevData => ({
      ...prevData,
      selectedProduct: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.selectedProduct) {
      alert("Please select a product.");
      return;
    }

    const selectedProduct = filteredProducts.find(
      (p) => p.id === parseInt(formData.selectedProduct)
    );

    if (!selectedProduct) {
      alert("Selected product not found!");
      return;
    }

    if (!formData.file) {
      alert("Please upload a document.");
      return;
    }

    const data = new FormData();
    data.append('brand', selectedProduct.brand);
    data.append('model', selectedProduct.model);
    data.append('rate', formData.rate);
    data.append('renter', formData.renter);
    data.append('borrowed', formData.borrowed);
    data.append('returned', formData.returned);
    data.append('file', formData.file);

    try {
      const response = await axios.post(
        `http://localhost:3001/products/${clientId}/addrent`, 
        data, 
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      console.log("Server Response:", response.data);
      alert('Rent added successfully!');
      handleCloseModal();
    } catch (error) {
      console.error('Error adding rent:', error);
      alert('Failed to add rent. Please try again.');
    }
  };

  const handleReturnClick = (rentId) => {
    setReturnData({ rentId, returnedDate: '' });
    setIsReturnModalOpen(true);
  };

  const handleReturnChange = (e) => {
    setReturnData(prevData => ({
      ...prevData,
      returnedDate: e.target.value
    }));
  };

  const handleReturnSubmit = async (e) => {
    e.preventDefault();
    
    if (!returnData.returnedDate) {
      alert("Please select a returned date.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:3001/products/${clientId}/return-rent/${returnData.rentId}`,
        { returnedDate: returnData.returnedDate }
      );
      console.log("Return Response:", response.data);
      alert('Return updated successfully!');
      handleCloseModal();
      const fetchCurrentRenters = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/products/${clientId}/current-renters`);
          setCurrentRenters(response.data.renters);
        } catch (error) {
          console.error('Error fetching current renters:', error);
        }
      };
      fetchCurrentRenters();
    } catch (error) {
      console.error('Error updating return:', error);
      alert('Failed to update return. Please try again.');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <TopBar handleLogout={handleLogout} /> 
      <div className="flex flex-1">
        <Sidebar clientId={clientId} /> 
      <div className="flex-1 bg-white py-12 px-4 sm:px-6 lg:px-8">
        <button 
          onClick={handleAddProductClick} 
          className="bg-blue-500 text-white px-4 py-2 rounded mb-6 shadow hover:bg-blue-600 transition"
        >
          Add Rental
        </button>

        <div className="overflow-x-auto">
          <h2 className="text-2xl font-bold mb-6">Current Truck Renters</h2>
          {currentRenters.length > 0 ? (
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-3 px-4">Rent ID</th>
                  <th className="py-3 px-4">Company</th>
                  <th className="py-3 px-4">Brand</th>
                  <th className="py-3 px-4">Model</th>
                  <th className="py-3 px-4">Rate</th>
                  <th className="py-3 px-4">Renter</th>
                  <th className="py-3 px-4">Borrowed Date</th>
                  <th className="py-3 px-4">Returned Date</th>
                  <th className="py-3 px-4">Document</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentRenters.map((renter) => (
                  <tr key={renter.rentid} className="border-t">
                    <td className="py-3 px-4">{renter.rentid}</td>
                    <td className="py-3 px-4">{renter.company}</td>
                    <td className="py-3 px-4">{renter.brand}</td>
                    <td className="py-3 px-4">{renter.model}</td>
                    <td className="py-3 px-4">{renter.rate}</td>
                    <td className="py-3 px-4">{renter.renter}</td>
                    <td className="py-3 px-4">{renter.borrowed}</td>
                    <td className="py-3 px-4">{renter.returned}</td>
                    <td className="py-3 px-4">{renter.document}</td>
                    <td className="py-3 px-4">{renter.status}</td>
                    <td className="py-3 px-4">
                      {renter.status === 'ACTIVE' && (
                        <button 
                          onClick={() => handleReturnClick(renter.rentid)} 
                          className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                        >
                          Return
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-600">No current renters.</p>
          )}
        </div>

        {/* Add Rental Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
              <h3 className="text-xl font-bold mb-4">Add Rental</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-700">Select Product</label>
                  <select
                    value={formData.selectedProduct}
                    onChange={handleProductChange}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  >
                    <option value="">-- Select a product --</option>
                    {filteredProducts.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.brand} {product.model}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700">Rate</label>
                  <input
                    type="text"
                    name="rate"
                    value={formData.rate}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Renter</label>
                  <input
                    type="text"
                    name="renter"
                    value={formData.renter}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Borrowed Date</label>
                  <input
                    type="date"
                    name="borrowed"
                    value={formData.borrowed}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Expected Return Date</label>
                  <input
                    type="date"
                    name="returned"
                    value={formData.returned}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Upload Document</label>
                  <input
                    type="file"
                    name="file"
                    onChange={handleChange}
                    className="w-full"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button 
                    type="button" 
                    onClick={handleCloseModal} 
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Return Modal */}
        {isReturnModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
              <h3 className="text-xl font-bold mb-4">Return Product</h3>
              <form onSubmit={handleReturnSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-700">Return Date</label>
                  <input
                    type="date"
                    name="returnedDate"
                    value={returnData.returnedDate}
                    onChange={handleReturnChange}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button 
                    type="button" 
                    onClick={handleCloseModal} 
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                  >
                    Return
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}