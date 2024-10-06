import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../App.css";
import axios from "axios";

export default function Sidebar() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3001/accounts/logout');
      navigate('/login', { replace: true }); 
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

    {
    return (
    
        <>

<aside id="logo-sidebar" class="fixed top-0 left-0 z-40 w-1/5 h-screen  transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 :border-gray-700" aria-label="Sidebar">
      <a href="#" class="flex h-20  items-center justify-center">
          <img src="" class="h-11 me-3" alt="logo" />
          <span class="text-black self-center text-2xl font-semibold sm:text-2xl whitespace-nowrap">Truck Hub</span>
        </a>
   
 
        <div class="h-full px-3 bg-white">
            <ul class="space-y-2 pt-10 text-xl">
              <li>
                <a href="/admindashboard" class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100">
                  <svg class="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="#2B9D3E" viewBox="0 0 22 21">
                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
                  </svg>
                  <span class="ml-3">Dashboard</span>
                </a>
              </li>
              <li>
                <a href="/userstbl" class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100">
                  <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                    <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"/>
                  </svg>
                  <span class="flex-1 ml-3 whitespace-nowrap">User Approval</span>
                </a>
              </li>
              <li>
                <a href="/clientstbl" class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100">
                  <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                    <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
                  </svg>
                  <span class="flex-1 ml-3 whitespace-nowrap">Client Approval</span>
                </a>
              </li>
              <li>
                <a href="/clients" class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100">
                  <svg class="w-6 h-6 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 12c.263 0 .524-.06.767-.175a2 2 0 0 0 .65-.491c.186-.21.333-.46.433-.734.1-.274.15-.568.15-.864a2.4 2.4 0 0 0 .586 1.591c.375.422.884.659 1.414.659.53 0 1.04-.237 1.414-.659A2.4 2.4 0 0 0 12 9.736a2.4 2.4 0 0 0 .586 1.591c.375.422.884.659 1.414.659.53 0 1.04-.237 1.414-.659A2.4 2.4 0 0 0 16 9.736c0 .295.052.588.152.861s.248.521.434.73a2 2 0 0 0 .649.488 1.809 1.809 0 0 0 1.534-.041 1.755 1.755 0 0 0 1.317-1.677v-4.6a2 2 0 0 0-2-2H4.914c-.553 0-1.083.21-1.476.585A1.96 1.96 0 0 0 3 5.414v6.728A2.017 2.017 0 0 0 5 14h10c0 1.06-.421 2.078-1.171 2.828A3.993 3.993 0 0 1 10 18h-.586c-.265 0-.52.105-.707.293L7 20H4m6.05-10h.01m4.94 0h.01"/>
                  </svg>
                  <span class="ml-3">Clients</span>
                </a>
              </li>
              <li>
            <a href="/users" class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100">
            <svg class="w-6 h-6 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
               <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 6c0 1.657-3.134 3-7 3S5 7.657 5 6m14 0c0-1.657-3.134-3-7-3S5 4.343 5 6m14 0v6M5 6v6m0 0c0 1.657 3.134 3 7 3s7-1.343 7-3M5 12v6c0 1.657 3.134 3 7 3s7-1.343 7-3v-6"/>
            </svg>

               <span class="flex-1 ms-3 whitespace-nowrap">Users</span>
            </a>
         </li>
         <li>
            <a href="/prods" class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100">
            <svg class="w-6 h-6 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
               <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 4h12M6 4v16M6 4H5m13 0v16m0-16h1m-1 16H6m12 0h1M6 20H5M9 7h1v1H9V7Zm5 0h1v1h-1V7Zm-5 4h1v1H9v-1Zm5 0h1v1h-1v-1Zm-3 4h2a1 1 0 0 1 1 1v4h-4v-4a1 1 0 0 1 1-1Z"/>
            </svg>

               <span class="flex-1 ms-3 whitespace-nowrap">Products</span>
            </a>
         </li>
         <li>
            <a href="/subscribersemail" class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100">
            <svg class="w-6 h-6 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
               <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 8h.01M9 8h.01M12 8h.01M4 11h16M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"/>
            </svg>

               <span class="flex-1 ms-3 whitespace-nowrap">Send Updates</span>
            </a>
         </li>
         {/* <li>
            <a href="/dashboard/collection" class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100">
            <svg class="w-6 h-6 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
               <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.5 8H4m0-2v13a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1h-5.032a1 1 0 0 1-.768-.36l-1.9-2.28a1 1 0 0 0-.768-.36H5a1 1 0 0 0-1 1Z"/>
            </svg>

               <span class="flex-1 ms-3 whitespace-nowrap">Collection</span>
            </a>
         </li> */}

              <li>
              <a onClick={handleLogout} class="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100">
              <svg class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M7.5 1.001a2 2 0 0 0-2-2H1.975a2 2 0 0 0-2 2v14.027a2 2 0 0 0 2 2H5.5a2 2 0 0 0 2-2V1.001Zm8 5.025L12.454 3.04a.252.252 0 0 0-.429.179v2.778H6.75a.25.25 0 0 0-.25.25v2.5c0 .138.112.25.25.25h5.275v2.776c0 .222.268.335.429.179L15.5 8.024a.253.253 0 0 0 0-.357Z"/>
                  </svg>
                  <span class="flex-1 ml-3 whitespace-nowrap">Logout</span>
                </a>
              </li>
            </ul>
          </div>

</aside>





      
        </>
    );
  }
};