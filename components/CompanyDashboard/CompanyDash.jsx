import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Nav from '../nav/nav';
import { Link } from 'react-router-dom';

export default function CompanyDash() {
    const { compname } = useParams();
    const [products, setProducts] = useState([]);
    const [companyData, setCompanyData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [imageSrc, setImageSrc] = useState(null);

    useEffect(() => {
        const fetchCompanyData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/client/getclient/company/${compname}`);
                setCompanyData(response.data);

                if (response.data.dashboardimage) {
                    const documentUrl = `http://localhost:3001/${response.data.dashboardimage}`;
                    setImageSrc(documentUrl);
                }
            } catch (error) {
                console.error('Error fetching company data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCompanyData();
    }, [compname]);

    useEffect(() => {
        axios.get(`http://localhost:3001/products/getproducts/company/${compname}`)
            .then(res => setProducts(res.data))
            .catch(err => console.error('Error fetching products:', err));
    }, [compname]);

    if (loading) {
        return <div className="flex justify-center items-center h-screen text-lg font-semibold">Loading...</div>;
    }

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <Nav />

            <header className={`relative text-white min-h-[450px] flex items-center ${imageSrc ? 'bg-gradient-to-r from-blue-700 to-blue-500' : 'bg-gray-400'}`}>
                {imageSrc && (
                    <img
                        src={imageSrc.replace(/\\/g, '/')}
                        alt="Company background"
                        className="absolute inset-0 w-full h-full object-cover opacity-40"
                    />
                )}
                <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
                    <h1 className="text-5xl font-extrabold mb-4">Welcome to {companyData?.compname}</h1>
                    <p className="text-lg font-medium mb-6">
                        {companyData?.address} - Contact us at {companyData?.compemail} or {companyData?.mobile}
                    </p>
                    <a 
                        href="#products"
                        className="inline-block bg-white text-blue-700 px-8 py-3 rounded-full text-lg font-semibold shadow-lg transition transform hover:scale-105"
                    >
                        Explore Products
                    </a>
                </div>
            </header>
            {/* Products Section */}
            <main className="flex-1 p-10" id="products">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold text-gray-800 mb-8">Our Products</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {products.map((product, index) => (
                            <div
                                key={index}
                                className="group relative bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden transition-all transform hover:shadow-lg hover:scale-105"
                            >
                                <Link to={`/product/${product.id}`} className="block">
                                    <div className="h-56 w-full overflow-hidden">
                                        <img
                                            src={`http://localhost:3001/products/images/${product.image}`}
                                            alt={product.product}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold text-gray-800 truncate group-hover:text-blue-500">
                                            {product.product}
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            {product.brand} - {product.model}
                                        </p>
                                        <p className="text-lg font-bold text-blue-700 mt-2">
                                            PHP {Number(product.price).toLocaleString('en-US')}
                                        </p>
                                    </div>
                                </Link>
                                <div className="absolute top-2 right-2 bg-blue-600 text-white rounded-full px-3 py-1 text-xs">
                                    {product.company}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
