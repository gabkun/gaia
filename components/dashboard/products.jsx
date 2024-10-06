import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from "./sidebar";

function ProdTbl() {
  const [products, setProducts] = useState([]);
  const [editedProduct, setEditedProduct] = useState({
      id: '',
      product: '',
      brand: '',
      model: '',
      price: ''
  });
  const [showEditForm, setShowEditForm] = useState(false);

  useEffect(() => {
      axios.get('http://localhost:3001/products/getproducts')
          .then(res => setProducts(res.data))
          .catch(err => console.log(err));
  }, []);

  const handleDelete = (productId) => {
      axios.delete(`http://localhost:3001/products/deleteproduct/${productId}`)
          .then(res => {
              if (res.status === 200) {

                  setProducts(prevProducts => prevProducts.filter(product => product.id !== productId));
              } else {
                  console.error('Failed to delete product');
              }
          })
          .catch(err => console.log(err));
  };

  const handleEdit = (product) => {
      setEditedProduct(product);
      setShowEditForm(true);
  };

  const handleInputChange = (e) => {
      const { name, value } = e.target;
      setEditedProduct(prevProduct => ({
          ...prevProduct,
          [name]: value
      }));
  };

  const handleSubmit = () => {
      axios.put(`http://localhost:3001/products/updateproduct/${editedProduct.id}`, editedProduct)
          .then(res => {
              if (res.status === 200) {

                  axios.get('http://localhost:3001/products/getproducts')
                      .then(res => setProducts(res.data))
                      .catch(err => console.log(err));
                  setShowEditForm(false);
                  setEditedProduct({
                      id: '',
                      product: '',
                      brand: '',
                      model: '',
                      price: ''
                  });
              } else {
                  console.error('Failed to update product');
              }
          })
          .catch(err => console.log(err));
  };
    return (
      <>
        <div class="flex flex-row">
          <Sidebar />
          <div class ="w-full overflow-x-auto shadow rounded-md">
          <div class=" w-full h-20  text-2xl font-semibold  text-black bg-gray-200 flex items-center">
                   PRODUCTS TABLE
                </div>
            <table class="w-full min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Brand</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Model</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th> 
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
              {products.map((data, i) => (
                  <tr  key={i} class="bg-white hover:bg-gray-100"> 
                    <td class="px-6 py-4 whitespace-nowrap">{data.product}</td>
                    <td class="px-6 py-4 whitespace-nowrap">{data.brand}</td>
                    <td class="px-6 py-4 whitespace-nowrap">{data.model}</td>
                    <td class="px-6 py-4 whitespace-nowrap">{data.price}</td>
                    <td class="px-6 py-4 whitespace-nowrap flex space-x-2"> 
                      <button class="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out" onClick={() => handleEdit(data)}>Edit</button>
                      <button class="px-4 py-2 text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-700 transition duration-150 ease-in-out" onClick={() => handleDelete(data.id)}>Delete</button>
                    </td>
                  </tr>
            ))}
              </tbody>
            </table>

            {showEditForm && (
                    <div className="mt-4">
                        <h2 className="text-xl font-bold mb-2">Edit Product</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Product Name</label>
                                <input type="text" name="product" value={editedProduct.product} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Brand</label>
                                <input type="text" name="brand" value={editedProduct.brand} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Model</label>
                                <input type="text" name="model" value={editedProduct.model} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Price</label>
                                <input type="text" name="price" value={editedProduct.price} onChange={handleInputChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                            </div>
                            <div className="flex items-center justify-between">
                                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                    Update
                                </button>
                                <button type="button" className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => setShowEditForm(false)}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}
          </div>
        </div>
      </>
    );
  }


export default ProdTbl;
