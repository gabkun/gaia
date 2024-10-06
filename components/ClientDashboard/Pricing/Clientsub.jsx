import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Sidebar from '../sidebar';
import TopBar from '../topbar';
import { useNavigate } from 'react-router-dom';

export default function Clientsub() {
  const { user_id } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
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
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <TopBar handleLogout={handleLogout} />

      <div className="flex flex-1">
        <Sidebar user_id={user_id} />

        {/* Main Content Section */}
        <main className="flex-1 py-12 px-6 bg-white overflow-auto">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">TruckHub Subscription Plans</h2>
              <p className="text-lg text-gray-500 mt-4">Choose the best plan that suits your business needs</p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Free Plan */}
              <div className={`flex flex-col items-center p-8 bg-blue-50 rounded-lg shadow-lg transition-transform hover:scale-105 ${userData.subscriptionType === 1 ? 'border-4 border-blue-600' : 'border'}`}>
                <h3 className="text-2xl font-semibold">Free Plan</h3>
                <p className="text-5xl font-bold mt-4">PHP 0</p>
                <p className="text-sm text-gray-600">/ month</p>

                <ul className="mt-6 space-y-3 text-gray-700">
                  <li className="flex items-center">
                    <svg className="w-6 h-6 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    3 Truck Products
                  </li>
                  <li className="flex items-center">
                    <svg className="w-6 h-6 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Personalized Dashboard
                  </li>
                  <li className="flex items-center">
                    <svg className="w-6 h-6 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Semi-Full Access
                  </li>
                </ul>

                {userData.subscriptionType === 1 ? (
                  <a
                    href={`/manage/freeplan/${user_id}`}
                    className="mt-8 w-full text-center py-3 px-4 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  >
                    Manage Plan
                  </a>
                ) : (
                  <a
                    href={`/checkout/freeplan/${user_id}`}
                    className="mt-8 w-full text-center py-3 px-4 text-blue-600 bg-transparent border border-blue-600 rounded-md hover:bg-blue-600 hover:text-white"
                  >
                    Start Now
                  </a>
                )}
              </div>

              {/* Silver Plan */}
              <div className={`flex flex-col items-center p-8 bg-blue-50 rounded-lg shadow-lg transition-transform hover:scale-105 ${userData.subscriptionType === 2 ? 'border-4 border-blue-600' : 'border'}`}>
                <h3 className="text-2xl font-semibold">Silver Plan</h3>
                <p className="text-5xl font-bold mt-4">PHP 499</p>
                <p className="text-sm text-gray-600">/ month</p>

                <ul className="mt-6 space-y-3 text-gray-700">
                  <li className="flex items-center">
                    <svg className="w-6 h-6 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    10 Truck Products
                  </li>
                  <li className="flex items-center">
                    <svg className="w-6 h-6 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Semi-Customized Dashboard
                  </li>
                  <li className="flex items-center">
                    <svg className="w-6 h-6 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Full Access
                  </li>
                </ul>

                {userData.subscriptionType === 2 ? (
                  <a
                    href={`/manage/silverplan/${user_id}`}
                    className="mt-8 w-full text-center py-3 px-4 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  >
                    Manage Plan
                  </a>
                ) : (
                  <a
                    href={`/checkout/silverplan/${user_id}`}
                    className="mt-8 w-full text-center py-3 px-4 text-blue-600 bg-transparent border border-blue-600 rounded-md hover:bg-blue-600 hover:text-white"
                  >
                    Start Now
                  </a>
                )}
              </div>

              {/* Gold Plan */}
              <div className={`flex flex-col items-center p-8 bg-blue-50 rounded-lg shadow-lg transition-transform hover:scale-105 ${userData.subscriptionType === 3 ? 'border-4 border-blue-600' : 'border'}`}>
                <h3 className="text-2xl font-semibold">Gold Plan</h3>
                <p className="text-5xl font-bold mt-4">PHP 799</p>
                <p className="text-sm text-gray-600">/ month</p>

                <ul className="mt-6 space-y-3 text-gray-700">
                  <li className="flex items-center">
                    <svg className="w-6 h-6 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    15 Truck Products
                  </li>
                  <li className="flex items-center">
                  <svg className="w-6 h-6 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    </li>
                <li className="flex items-center">
                    <svg className="w-6 h-6 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Customized Dashboard
                  </li>
                  <li className="flex items-center">
                    <svg className="w-6 h-6 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Complete Access
                  </li>
                </ul>

                {userData.subscriptionType === 3 ? (
                  <a
                    href={`/manage/goldplan/${user_id}`}
                    className="mt-8 w-full text-center py-3 px-4 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                  >
                    Manage Plan
                  </a>
                ) : (
                  <a
                    href={`/checkout/goldplan/${user_id}`}
                    className="mt-8 w-full text-center py-3 px-4 text-blue-600 bg-transparent border border-blue-600 rounded-md hover:bg-blue-600 hover:text-white"
                  >
                    Start Now
                  </a>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
