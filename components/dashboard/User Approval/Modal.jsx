import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Modal = ({ show, onClose, user }) => {
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    if (user && user.document) {
      const fetchImage = async () => {
        try {
          // Construct the URL for the document
          const documentUrl = `http://localhost:3001/${user.document}`;

          // Set the URL directly
          setImageSrc(documentUrl);
        } catch (error) {
          console.error('Error fetching image:', error);
          setImageSrc(null);  // Clear the image source on error
        }
      };

      fetchImage();
    }
  }, [user]);

  if (!show || !user) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3 p-6">
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="text-xl font-semibold text-gray-800">User Information</h2>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          <p><strong className="text-gray-600">First Name:</strong> {user.fname}</p>
          <p><strong className="text-gray-600">Last Name:</strong> {user.lname}</p>
          <p><strong className="text-gray-600">Email:</strong> {user.email}</p>
          <p><strong className="text-gray-600">Contact Number:</strong> {user.contact}</p>
          <p><strong className="text-gray-600">Telephone:</strong> {user.telephone}</p>
          <p><strong className="text-gray-600">Valid ID Attached:</strong> 
          <div className="flex justify-center mt-2">
              {imageSrc ? (
                <img 
                  src={imageSrc} 
                  alt="Client Document" 
                  className="max-w-full max-h-60 object-contain"
                />
              ) : (
                <p className="text-gray-600">Loading image...</p>
              )}
            </div>
            </p>
          <p><strong className="text-gray-600">Status:</strong> {user.status}</p>
        </div>

        <div className="mt-6 flex justify-end">
          <button 
            onClick={onClose} 
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;