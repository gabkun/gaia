import React from 'react';
import { useNavigate } from 'react-router-dom';


export default function Approval() {
    const navigate = useNavigate();
    const loginpage = async () =>{
        navigate ('/login');
    }
    const homepage = async () =>{
        navigate ('/');
    }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        Your account is waiting for approval
      </h1>
      <p className="text-gray-600 mb-8">
        Thank you for registering! Our team is currently reviewing your account. You will receive an email notification once your account has been approved.
      </p>
      <div className="space-y-4">
        <button
          onClick={loginpage}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Go to Login
        </button>
        <button
          onClick={homepage}
          className="w-full bg-gray-200 text-gray-800 py-2 rounded-md hover:bg-gray-300 transition-colors"
        >
          Homepage
        </button>
      </div>
    </div>
  </div>
  )
}
