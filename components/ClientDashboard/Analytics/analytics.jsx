import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import Sidebar from '../sidebar';
import TopBar from '../topbar';

export default function Analytics() {
  const { clientId } = useParams();
  const [userData, setUserData] = useState(null);
  const [products, setProducts] = useState([]);
  const [appointments, setAppointments] = useState([]);  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch User Data
        const userResponse = await axios.get(`http://localhost:3001/client/getclient/${clientId}`);
        setUserData(userResponse.data);

        // Fetch Products
        const productsResponse = await axios.get(`http://localhost:3001/products/getproducts/client/${clientId}`);
        setProducts(productsResponse.data);

        // Fetch Appointments
        const appointmentsResponse = await axios.get(`http://localhost:3001/reports/getrequest/client/${clientId}`);
        setAppointments(appointmentsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [clientId]);

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

  if (error) {
    return <div>{error}</div>;
  }

  // Prepare data for charts
  const productData = products.map(product => ({
    brand: product.brand,  
    name: product.model,    
    price: product.price     
  }));
  const appointmentData = appointments.map(appointment => ({ date: appointment.date, product: appointment.productid }));

  // Function to format numbers with commas
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const formatCurrency = (num) => {
    return `₱${num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <TopBar handleLogout={handleLogout} /> 
      <div className="flex flex-1">
        <Sidebar clientId={clientId} /> 

        <div className="flex-1 bg-white py-12 px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl font-semibold mb-4 text-center text-blue-600">TruckHub Analysis</h2>
          {userData && (
            <div className="text-xl">
              <p><strong>Name:</strong> {userData.compname}</p>
              <p><strong>Subscription:</strong> {userData.subscription}</p>
              <p><strong>Account Type:</strong> ENTERPRISE</p>
              {/* Add more user data fields as needed */}
            </div>
          )}

          {/* Products Chart */}
          <h2 className="text-2xl font-semibold mb-4 mt-8">Total Products: {userData.product}</h2>
          {products.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={productData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="brand" fontSize={12} /> {/* Adjust font size */}
                <YAxis tickFormatter={formatCurrency} fontSize={12} label={{ value: '', angle: -90, position: 'insideLeft', fontSize: 12 }} /> {/* Adjust font size */}
                <Tooltip formatter={(value) => [formatCurrency(value), 'Price']} />
                <Bar dataKey="price" fill="#2864ec" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p>No products found.</p>
          )}
          
          {/* Appointments Chart */}
          <h2 className="text-2xl font-semibold mb-4 mt-8">Appointments</h2>
          {appointments.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={appointmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis tickFormatter={formatNumber} label={{ value: '', angle: -90, position: 'insideLeft' }} />
                <Tooltip formatter={(value) => [formatNumber(value), 'Appointments']} />
                <Bar dataKey="product" fill="#fc0303" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p>No appointments found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
