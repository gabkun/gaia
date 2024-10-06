import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../sidebar';
import TopBar from '../topbar';

export default function Request() {
    const { clientId } = useParams();  
    const [appointments, setAppointments] = useState([]);  
    const [loading, setLoading] = useState(true);  
    const [error, setError] = useState(null);  
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/reports/getrequest/client/${clientId}`);
                setAppointments(response.data);  
            } catch (error) {
                console.error('Error fetching appointments:', error);
                setError('Failed to fetch appointments');
            } finally {
                setLoading(false);  
            }
        };

        fetchAppointments();  
    }, [clientId]);  

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-GB', options).format(date);  
    };

    const formatTime = (timeString) => {
        const [hour, minute] = timeString.split(':');
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const formattedHour = hour % 12 || 12;  
        return `${formattedHour}:${minute} ${ampm}`;
    };

    const handleLogout = async () => {
        try {
          await axios.post('http://localhost:3001/accounts/logout');
          navigate('/login', { replace: true }); 
        } catch (error) {
          console.error('Error logging out:', error);
        }
      };

    if (loading) return <p className="text-center text-gray-500">Loading...</p>; 
    if (error) return <p className="text-center text-red-500">{error}</p>;  

    return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <TopBar handleLogout={handleLogout} /> 
      <div className="flex flex-1">
        <Sidebar clientId={clientId} /> 


        <div className="flex-1 p-8 bg-gray-100 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Truck Appointments</h1>

                {appointments.length === 0 ? (
                    <p className="text-center text-gray-600">No appointments found for this client.</p>
                ) : (
                    <div className="overflow-x-auto shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="bg-gray-50 text-xs uppercase text-gray-700">
                                <tr>
                                    <th scope="col" className="px-6 py-3">ID</th>
                                    <th scope="col" className="px-6 py-3">Product ID</th>
                                    <th scope="col" className="px-6 py-3">Company</th>
                                    <th scope="col" className="px-6 py-3">Name</th>
                                    <th scope="col" className="px-6 py-3">Phone</th>
                                    <th scope="col" className="px-6 py-3">Email</th>
                                    <th scope="col" className="px-6 py-3">Date</th>
                                    <th scope="col" className="px-6 py-3">Time</th>
                                    <th scope="col" className="px-6 py-3">Message</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointments.map(appointment => (
                                    <tr key={appointment.id} className="bg-white border-b hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-gray-900">{appointment.id}</td>
                                        <td className="px-6 py-4">{appointment.productid}</td>
                                        <td className="px-6 py-4">{appointment.company}</td>
                                        <td className="px-6 py-4">{appointment.name}</td>
                                        <td className="px-6 py-4">{appointment.phone}</td>
                                        <td className="px-6 py-4">{appointment.email}</td>
                                        <td className="px-6 py-4">{formatDate(appointment.date)}</td>
                                        <td className="px-6 py-4">{formatTime(appointment.time)}</td>
                                        <td className="px-6 py-4">{appointment.message}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            </div>
        </div>
      </div>
    );
}