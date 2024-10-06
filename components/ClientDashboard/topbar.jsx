import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BellIcon, SearchIcon } from '@heroicons/react/solid';
import axios from 'axios';

export default function TopBar() {
  const { clientId } = useParams();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [imageSrc, setImageSrc] = useState('');
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const [appointments, setAppointments] = useState([]); // State for appointments
  const [newRequests, setNewRequests] = useState(0); // State for tracking new requests
  const [requestingUsers, setRequestingUsers] = useState([]); // State for storing requesting users
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/'); // Replace with your desired home page route
  };

  const toggleNotification = () => {
    setIsNotificationVisible((prev) => !prev); // Toggle visibility of the notification card
    if (isNotificationVisible) {
      setNewRequests(0); // Reset the count when the notification is viewed
      setRequestingUsers([]); // Reset the users list when the notification is viewed
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/users/getuser/${clientId}`);
        setUserData(response.data);

        if (response.data.profilePicture) {
          const documentUrl = `http://localhost:3001/${response.data.profilePicture}`;
          setImageSrc(documentUrl);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();  
  }, [clientId]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/reports/getrequest/user/${clientId}`);
        setAppointments(response.data);

        // Update the new requests count and requesting users
        if (response.data.length > 0) {
          setNewRequests(response.data.length); // Count of new requests
          
          // Fetch first names of the users who made the requests
          const usersPromises = response.data.map(async (appointment) => {
            const userResponse = await axios.get(`http://localhost:3001/users/getuser/${appointment.requestingclientId}`);
            return userResponse.data.firstName; // Assuming `firstName` is the field in user data
          });
          
          const usersFirstNames = await Promise.all(usersPromises);
          setRequestingUsers(usersFirstNames); // Store first names
        }
      } catch (error) {
        console.error('Error fetching appointments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();  
  }, [clientId]);

  return (
    <div className="bg-blue-600 p-4 flex justify-between items-center">
      {/* Left side content (logo, etc.) */}
      <div>
        <h1 className="text-white text-2xl font-bold">TruckHub Enterprise</h1>
      </div>

      {/* Right side content */}
      <div className="flex items-center space-x-4">
        {/* Notifications Icon */}
        <div className="relative" onClick={toggleNotification}>
          <BellIcon className="w-6 h-6 text-white cursor-pointer" />
          {/* Notification Badge */}
          {newRequests > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {newRequests}
            </span>
          )}
        </div>

        {/* Notification Card */}
        {isNotificationVisible && newRequests > 0 && (
          <div className="absolute top-14 right-10 bg-white text-black border rounded shadow-lg p-2">
            <p>
              {newRequests} new Appointment{newRequests > 1 ? 's' : ''} from user(s):
            </p>
            <ul className="list-disc pl-5">
              {requestingUsers.map((user, index) => (
                <li key={index}>{user}</li> // Display each user's name on a new line
              ))}
            </ul>
          </div>
        )}

        {/* Search Icon */}
        <SearchIcon className="w-6 h-6 text-white cursor-pointer" />

        {/* Logout Button */}
        <div className="flex items-center">
          <div className="w-10 h-10">
            <img
              src={imageSrc || 'https://via.placeholder.com/150'}
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
