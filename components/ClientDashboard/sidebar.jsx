import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { TruckIcon, ChartSquareBarIcon, UserIcon, LogoutIcon, CashIcon, ChartBarIcon } from '@heroicons/react/outline'; // Importing icons

export default function Sidebar({ user_id }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3001/accounts/logout');
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <aside
      id="logo-sidebar"
      aria-label="Sidebar"
      onMouseEnter={() => setIsSidebarOpen(true)}
      onMouseLeave={() => setIsSidebarOpen(false)}
      className={`sticky top-0 h-screen ${
        isSidebarOpen ? 'w-60' : 'w-20'
      } transition-all duration-300 px-3 py-4 overflow-y-auto bg-gray-800 text-white`}
      style={{ position: 'sticky', top: 0 }}
    >
      {/* Logo section */}
      <Link to="/" className="flex items-center justify-center mb-5">
        {/* Add Logo if necessary */}
      </Link>

      {/* Navigation menu */}
      <ul className="space-y-2 font-medium">

        {/* Analytics link */}
        <li>
          <Link
            to={`/analytics/${user_id}`} // Use actual clientId
            className="flex items-center p-2 text-white-900 rounded-lg hover:bg-gray-700 group"
          >
            <ChartBarIcon className="w-8 h-8" /> {/* Analytics Icon */}
            {isSidebarOpen && <span className="ml-3 text-xl">Analytics</span>}
          </Link>
        </li>

        {/* Rental link */}
        <li>
          <Link
            to={`/rent/${user_id}`} // Use actual clientId
            className="flex items-center p-2 text-white-900 rounded-lg hover:bg-gray-700 group"
          >
            <CashIcon className="w-8 h-8" /> {/* Truck Rent Icon */}
            {isSidebarOpen && <span className="ml-3 text-xl">Rental</span>}
          </Link>
        </li>

        {/* Products link */}
        <li>
          <Link
            to={`/clientdashboard/${user_id}`}
            className="flex items-center p-2 text-white-900 rounded-lg hover:bg-gray-700 group"
          >
            <TruckIcon className="w-8 h-8" /> {/* Truck Icon */}
            {isSidebarOpen && <span className="ml-3 text-xl">Products</span>}
          </Link>
        </li>

        {/* Plan link */}
        <li>
          <Link
            to={`/subscription/${user_id}`}
            className="flex items-center p-2 text-white-900 rounded-lg hover:bg-gray-700 group"
          >
            <ChartSquareBarIcon className="w-8 h-8" /> {/* Plan Icon */}
            {isSidebarOpen && <span className="ml-3 text-xl">Plan</span>}
          </Link>
        </li>

        {/* Requests link */}
        <li>
          <Link
            to={`/request/${user_id}`}
            className="flex items-center p-2 text-white-900 rounded-lg hover:bg-gray-700 group"
          >
            <UserIcon className="w-8 h-8" /> {/* Request Icon */}
            {isSidebarOpen && <span className="ml-3 text-xl">Requests</span>}
          </Link>
        </li>

        {/* Logout button */}
        <li>
          <button
            onClick={handleLogout}
            className="flex items-center p-2 text-white-900 rounded-lg hover:bg-gray-700 group"
          >
            <LogoutIcon className="w-8 h-8" /> {/* Logout Icon */}
            {isSidebarOpen && <span className="ml-3 text-xl">Logout</span>}
          </button>
        </li>
      </ul>
    </aside>
  );
}
