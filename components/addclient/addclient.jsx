import React, { useState } from 'react';
import axios from 'axios';

function AddClient() {
  const [formData, setFormData] = useState({
    compname: '',
    mobile: '',
    password: '',
    birthday: '',
    file: null
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataObj = new FormData();
      formDataObj.append('compname', formData.compname);
      formDataObj.append('mobile', formData.mobile);
      formDataObj.append('password', formData.password);
      formDataObj.append('birthday', formData.birthday);
      formDataObj.append('file', formData.file);

      const res = await axios.post('http://localhost:3001/account/addclient', formDataObj, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log(res.data); 

    } catch (error) {
      console.error('Error:', error);

    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-semibold mb-6">Add Client</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-4">
          <label htmlFor="compname" className="block text-gray-700">Company Name</label>
          <input type="text" id="compname" name="compname" value={formData.compname} onChange={handleChange} className="form-input mt-1 w-full" required />
        </div>
        <div className="mb-4">
          <label htmlFor="mobile" className="block text-gray-700">Mobile</label>
          <input type="text" id="mobile" name="mobile" value={formData.mobile} onChange={handleChange} className="form-input mt-1 w-full" required />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">Password</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="form-input mt-1 w-full" required />
        </div>
        <div className="mb-4">
          <label htmlFor="birthday" className="block text-gray-700">Date Created</label>
          <input type="date" id="birthday" name="birthday" value={formData.birthday} onChange={handleChange} className="form-input mt-1 w-full" required />
        </div>
        <div className="mb-4">
          <label htmlFor="file" className="block text-gray-700">Attach Document</label>
          <input type="file" id="file" name="file" onChange={handleFileChange} className="form-input mt-1 w-full" required />
        </div>
        <div className="mt-6">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default AddClient;