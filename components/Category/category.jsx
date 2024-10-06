import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ReactComponent as CargoIcon } from '../../assets/imgs/cargotruck.svg';
import { ReactComponent as DumpIcon } from '../../assets/imgs/dumptruck.svg';
import { ReactComponent as TankerIcon } from '../../assets/imgs/tankertruck.svg';
import { ReactComponent as TowIcon } from '../../assets/imgs/towtruck.svg';
import { ReactComponent as HeavyIcon } from '../../assets/imgs/heavydutytruck.svg';
import { ReactComponent as ConstructionIcon } from '../../assets/imgs/constructiontruck.svg';
import { ReactComponent as OtherIcon } from '../../assets/imgs/othertruck.svg';
import { ReactComponent as TractorIcon } from '../../assets/imgs/tractortruck.svg';
import Nav from '../nav/nav';

const categories = [
  { name: 'All', icon: null },
  { name: 'Construction', icon: ConstructionIcon },
  { name: 'Cargo', icon: CargoIcon },
  { name: 'Tanker', icon: TankerIcon },
  { name: 'Dump', icon: DumpIcon },
  { name: 'Tow Truck', icon: TowIcon },
  { name: 'Heavy Duty', icon: HeavyIcon },
  { name: 'Tractor', icon: TractorIcon },
  { name: 'Others', icon: OtherIcon },
];

const Category = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [products, setProducts] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/products/getproducts')
      .then(response => {
        const productsByCategory = response.data.reduce((acc, product) => {
          if (!acc[product.type]) {
            acc[product.type] = [];
          }
          acc[product.type].push(product);
          return acc;
        }, {});
        setProducts(productsByCategory);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredProducts = selectedCategory === 'All'
    ? Object.values(products).flat().filter((product) =>
        product.brand.toLowerCase().includes(searchTerm) ||
        product.model.toLowerCase().includes(searchTerm) ||
        product.company.toLowerCase().includes(searchTerm)
      )
    : products[selectedCategory]?.filter((product) =>
        product.brand.toLowerCase().includes(searchTerm) ||
        product.model.toLowerCase().includes(searchTerm) ||
        product.company.toLowerCase().includes(searchTerm)
      );

  return (
    <div>
      <Nav />
      {/* Search bar */}
<div className="bg-gray-100 py-6">
  <div className="container mx-auto">
    {/* Search bar */}
    <input
      type="text"
      placeholder="Search by brand, model, or company"
      className="w-full max-w-md p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={searchTerm}
      onChange={handleSearchChange}
    />
  </div>

  {/* Categories */}
  <div className="container mx-auto flex flex-wrap justify-center gap-6 mt-8">
    {categories.map((category, index) => (
      <div
        key={index}
        className={`flex flex-col items-center p-5 w-28 h-28 bg-white shadow-lg rounded-full hover:bg-blue-50 hover:shadow-xl transition-all duration-300 transform hover:scale-105 ${
          selectedCategory === category.name ? 'border-4 border-blue-500' : 'border border-gray-200'
        } cursor-pointer`}
        onClick={() => handleCategoryClick(category.name)}
      >
        {category.icon && (
          <category.icon
            className="h-10 w-10 mb-2"
            style={{
              width: '40px',
              height: '40px',
              objectFit: 'contain', // Ensures the SVG scales without distortion
              flexShrink: 0,        // Prevents shrinking of the icon if flex is used
            }}
            fill={selectedCategory === category.name ? '#39B54A' : '#3D3D3D'} // Dynamic color fill
          />
        )}
        <span className="text-neutral-700 font-medium text-xs text-center">{category.name}</span>
      </div>
    ))}
  </div>
</div>

{/* Product Listings */}
<div className="container mx-auto p-6">
  <div className="bg-white p-8 shadow-lg rounded-lg">
    <h2 className="text-3xl font-extrabold text-gray-900 mb-6">
      {selectedCategory || 'Select a Category'}
    </h2>
    {selectedCategory ? (
      filteredProducts?.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product, index) => (
            <div
              key={index}
              className="bg-gray-50 border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <Link to={`/product/${product.id}`} className="block">
                <div className="h-64 w-full mb-4 overflow-hidden rounded-t-lg">
                  <img
                    src={`http://localhost:3001/products/images/${product.image}`}
                    alt={product.product}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.product}</h3>
                  <div className="text-lg text-neutral-700 mb-2">
                    <div><strong>Brand:</strong> {product.brand}</div>
                    <div><strong>Model:</strong> {product.model}</div>
                    <div><strong>Price:</strong> PHP {Number(product.price).toLocaleString('en-US')}</div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-lg text-gray-700">No products found for this category</p>
      )
    ) : (
      <p className="text-lg text-gray-700">Please select a category to see the products.</p>
    )}
  </div>
</div>
    </div>
  );
};

export default Category;