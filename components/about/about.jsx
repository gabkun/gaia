import React from 'react'
import Nav from '../nav/nav';

export default function About() {
  return (
    <div>
    <Nav/>
    <section className="bg-white py-16">

      <div className="container mx-auto px-4">
        {/* About Us Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center">
          {/* Text Section */}
          <div className="lg:w-1/2 m-5">
            <h2 className="text-6xl font-bold mb-4">About Us</h2>
            <p className="text-2xl   text-gray-600 mb-4">
              Our project GAIAS TECH is a leading marketplace for buying, selling,
              and renting heavy machineries. We cater to agriculture and industrial business, equipment sellers, and buyers
              by providing a platform to showcase their machinery and connect with
              the right customers.
            </p>
            <p className="text-2xl text-gray-600 mb-6">
              We prioritize data privacy and transparency in our processes, allowing
              trusted businesses to showcase their trucks while ensuring safe transactions
              at the company's premises.
            </p>
            <div className="flex space-x-4">
              <button className="bg-green-600 text-white px-44 py-4 rounded hover:bg-green-700">
                Become a Seller
              </button>
              <button className="border border-green-600 text-green-600 px-6 py-2 rounded hover:bg-green-50">
                View Our Pricing
              </button>
            </div>
          </div>

          {/* Image Section */}
          <div className="lg:w-1/2 mt-8 lg:mt-0">
            <img
              src="/path/to/image.png" // Replace with your image path
              alt="About Us"
              className="max-w-full"
            />
          </div>
        </div>

        {/* Statistics Section
        <div className="flex justify-around mt-12 text-center">
          <div>
            <p className="text-2xl font-bold">4,000,000+</p>
            <p className="text-gray-600">visitors per month</p>
          </div>
          <div>
            <p className="text-2xl font-bold">2,500+</p>
            <p className="text-gray-600">sellers</p>
          </div>
          <div>
            <p className="text-2xl font-bold">36</p>
            <p className="text-gray-600">language versions</p>
          </div>
          <div>
            <p className="text-2xl font-bold">21</p>
            <p className="text-gray-600">years on market</p>
          </div>
        </div> */}
      </div>
    </section>
    </div>
  );
}
