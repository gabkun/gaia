import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import axios from 'axios';

export default function Checkout({ subscriptionType }) {
  const { user_id } = useParams(); 
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Added navigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true); // Show loading state

    try {
      const response = await axios.post('http://localhost:3001/subscribe/subscription', {
        user_id,
        cardNumber,
        expiry,
        cvv,
        cardHolder,
        subscription: subscriptionType, 
      });
      alert(response.data.message);
      navigate(`/clientdashboard/${user_id}`); // Navigate to the user dashboard
    } catch (error) {
      console.error('There was an error submitting the subscription!', error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); 
    value = value.match(/.{1,4}/g)?.join(' ') || value; 
    setCardNumber(value);
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); 
    if (value.length > 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4); 
    }
    setExpiry(value);
  };

  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); 
    setCvv(value.slice(0, 3)); 
  };

  return (
    <div className="w-full max-w-lg mx-auto p-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-medium mb-6">Payment Information for {subscriptionType}</h2> 
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-6">
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-2">
                Card Number
              </label>
              <input
                type="text"
                name="cardNumber"
                id="cardNumber"
                placeholder="0000 0000 0000 0000"
                className="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
                value={cardNumber}
                onChange={handleCardNumberChange}
                maxLength="19" 
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-2">
                Expiration Date
              </label>
              <input
                type="text"
                name="expiry"
                id="expiry"
                placeholder="MM/YY"
                className="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
                value={expiry}
                onChange={handleExpiryChange}
                maxLength="5" 
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-2">
                CVV
              </label>
              <input
                type="text"
                name="cvv"
                id="cvv"
                placeholder="000"
                className="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
                value={cvv}
                onChange={handleCvvChange}
                maxLength="3" 
              />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label htmlFor="cardHolder" className="block text-sm font-medium text-gray-700 mb-2">
                Card Holder
              </label>
              <input
                type="text"
                name="cardHolder"
                id="cardHolder"
                placeholder="Full Name"
                className="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"
                value={cardHolder}
                onChange={(e) => setCardHolder(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-8">
            <button 
              type="submit" 
              className="w-full bg-green-500 hover:bg-blue-600 text-white font-medium py-3 rounded-lg focus:outline-none"
              disabled={loading} // Disable button when loading
            >
              {loading ? 'Processing...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
