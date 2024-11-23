import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { supabase } from '../../../../components/supabase/config'; // Ensure this path is correct

function CreateTrackingData() {
  const [formData, setFormData] = useState({
    id: '',
    sender: '',
    receiver: '',
    items: '',
    date_ordered: '',
    no_of_box: '',
    box_size: '',
    weight: '',
    address: '',
    destination: '',
    date_loaded: ''
  });

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  // Handle Submit for form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('trackingfbt')
      .insert([formData]);

    if (error) {
      alert('Failed to add data: ' + error.message);
    } else {
      alert('Customer details added successfully!');
      setFormData({
        id: '',
        sender: '',
        receiver: '',
        items: '',
        date_ordered: '',
        no_of_box: '',
        box_size: '',
        weight: '',
        address: '',
        destination: '',
        date_loaded: ''
      }); // Clear form after submission
    }
  };

  return (
    <div className="container py-4 ">
      <h1 className="text-center mb-4">Add Entry Form</h1>
      <form onSubmit={handleSubmit} className="text-dark bg-light p-4 rounded shadow-sm">
        <div className="mb-3">
          <label htmlFor="id" className="form-label">Tracking Number</label>
          <input
            type="text"
            id="id"
            name="id"
            value={formData.id}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="sender" className="form-label">Sender</label>
          <input
            type="text"
            id="sender"
            name="sender"
            value={formData.sender}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="receiver" className="form-label">Receiver</label>
          <input
            type="text"
            id="receiver"
            name="receiver"
            value={formData.receiver}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="items" className="form-label">Items</label>
          <input
            type="text"
            id="items"
            name="items"
            value={formData.items}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="date_ordered" className="form-label">Date Ordered</label>
          <input
            type="date"
            id="date_ordered"
            name="date_ordered"
            value={formData.date_ordered}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="no_of_box" className="form-label">Number of Boxes</label>
          <input
            type="number"
            id="no_of_box"
            name="no_of_box"
            value={formData.no_of_box}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="box_size" className="form-label">Box Size</label>
          <input
            type="text"
            id="box_size"
            name="box_size"
            value={formData.box_size}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="weight" className="form-label">Weight</label>
          <input
            type="text"
            id="weight"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="destination" className="form-label">Destination</label>
          <input
            type="text"
            id="destination"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="date_loaded" className="form-label">Date Loaded</label>
          <input
            type="date"
            id="date_loaded"
            name="date_loaded"
            value={formData.date_loaded}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Data</button>
      </form>
    </div>
  );
}

export default CreateTrackingData;
