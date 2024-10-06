import React, { useState } from 'react';
import axios from 'axios';

function Addproducts({ clientId, onClose }) {
    const [type, setType] = useState("");
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [purpose, setPurpose] = useState("");
    const [price, setPrice] = useState("");
    const [notes, setNotes] = useState("");
    const [file, setFile] = useState();
    const [filePreview, setFilePreview] = useState(null); // Image preview state
    const [msg, setMsg] = useState("");

    const upload = () => {
        const formData = new FormData();
        formData.append("type", type);
        formData.append("brand", brand);
        formData.append("model", model);
        formData.append("purpose", purpose);
        formData.append("price", price);
        formData.append("notes", notes);
        formData.append('file', file);

        axios.post(`http://localhost:3001/products/${clientId}/addproduct`, formData)
            .then((response) => {
                console.log(response);
                if (response.data.status === 'Success') {
                    setMsg("File Successfully Uploaded");
                } else {
                    setMsg("Upload failed");
                }
            })
            .catch(error => console.log(error));
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setFilePreview(URL.createObjectURL(selectedFile)); // Set image preview
    };

    return (
        <div className="flex h-screen items-center justify-center bg-gray-100 p-8">
            {/* Main Container */}
            <div className="flex w-4/5 h-auto bg-white shadow-lg rounded-lg">
                {/* Left Section: Form */}
                <div className="w-1/2 p-4">
                    <h1 className="text-3xl font-bold mb-4">Add Truck Products</h1>
                    <p className="text-gray-600 mb-4">Photos: 0 / 10 - You can add up to 10 photos.</p>

                    <button onClick={onClose} className="mb-4 text-blue-500 hover:underline">← Back</button>

                    <div className="border-dashed border-2 border-gray-300 p-6 mb-6 text-center">
                        <label htmlFor="file" className="block mb-1">Upload File</label>
                        <input type="file" id="file" className="w-full px-4 py-2 border rounded" onChange={handleFileChange} />
                    </div>

                    <div className="grid gap-4">
                        <div>
                            <label htmlFor="brand" className="block mb-1">Brand</label>
                            <input type="text" id="brand" className="w-full px-4 py-2 border rounded" placeholder="Enter Brand" autoComplete="off" onChange={(e) => setBrand(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="model" className="block mb-1">Model</label>
                            <input type="text" id="model" className="w-full px-4 py-2 border rounded" placeholder="Enter Model" autoComplete="off" onChange={(e) => setModel(e.target.value)} />
                        </div>
                        <div>
                        <label htmlFor="price" className="block mb-1">Price</label>
                        <input 
                            type="text" 
                            id="price" 
                            className="w-full px-4 py-2 border rounded" 
                            placeholder="Enter price" 
                            onChange={(e) => setPrice(e.target.value)} 
                        />
                    </div>

                        <div>
                            <label htmlFor="type" className="block mb-1">Product Type</label>
                            <select id="type" className="w-full px-4 py-2 border rounded" value={type} onChange={(e) => setType(e.target.value)}>
                                <option value="">Select Product Type</option>
                                <option value="Construction">Construction</option>
                                <option value="Cargo">Cargo</option>
                                <option value="Tanker">Tanker</option>
                                <option value="Dump">Dump</option>
                                <option value="Tow Truck">Tow Truck</option>
                                <option value="Heavy Duty">Heavy Duty</option>
                                <option value="Tractor">Tractor</option>
                                <option value="Others">Others</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="purpose" className="block mb-1">Purpose</label>
                            <select
                                id="purpose"
                                className="w-full px-4 py-2 border rounded"
                                onChange={(e) => setPurpose(e.target.value)}
                            >
                                <option value="" disabled selected>Select Purpose</option>
                                <option value="RENT">FOR RENT</option>
                                <option value="SALE">FOR SALE</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="notes" className="block mb-1">Notes</label>
                            <textarea id="notes" className="w-full px-4 py-2 border rounded" placeholder="Enter Notes" autoComplete="off" onChange={(e) => setNotes(e.target.value)} />
                        </div>
                    </div>

                    <button type="button" className="block w-full px-4 py-2 mt-6 text-white bg-blue-500 rounded hover:bg-blue-600" onClick={upload}>Next</button>
                    <h1 className="text-center text-sm mt-6">{msg}</h1>
                </div>

                {/* Right Section: Preview */}
                <div className="w-1/2 p-4 bg-gray-50 shadow-inner rounded">
                    <h1 className="text-2xl font-bold mb-4">Preview</h1>
                    <div className="border border-gray-300 p-6">
                        <p className="text-gray-600 mb-4">Your listing preview</p>
                        <p>Brand: {brand}</p>
                        <p>Model: {model}</p>
                        <p>Truck Type: {type}</p>
                        <p>Price: {price}</p>
                        <p>Details: {notes}</p>
                        <p>Seller ID: {clientId}</p>

                        {/* Image Preview */}
                        {filePreview && (
                            <div className="mt-4">
                                <img src={filePreview} alt="Preview" className="w-full h-auto object-contain" />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Addproducts;