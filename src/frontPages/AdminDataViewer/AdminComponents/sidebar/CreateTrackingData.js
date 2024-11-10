import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';

function CreateTrackingData() {
  const [formData, setFormData] = useState({
    trackingNumber: '',
    date: '',
    senderName: '',
    SendercontactNumber: '',
    recieverName: '',
    ReceivercontactNumber: '',
    senderEmail: '',
    receiverEmail: '',
    items: '',
    senderAddress: '',
    receiverAddress: '',
    noOfBox: '',
    boxSize: '',
    noOfKg: '',
    dateLoaded: '',
    remarks: ''
  });

  const [data, setData] = useState([]); // Store the added entries

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle Submit for form
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Customer details added successfully!');
    setData([...data, formData]); // Add new data
    setFormData({
      trackingNumber: '',
      date: '',
      senderName: '',
      SendercontactNumber: '',
      recieverName: '',
      ReceivercontactNumber: '',
      senderEmail: '',
      receiverEmail: '',
      items: '',
      senderAddress: '',
      receiverAddress: '',
      noOfBox: '',
      boxSize: '',
      noOfKg: '',
      dateLoaded: '',
      remarks: ''
    }); // Clear form after submission
  };

  return (
    <div className="container py-4 ">
      <h1 className="text-center mb-4">Add Entry Form</h1>

      <form onSubmit={handleSubmit} className="text-dark bg-light p-4 rounded shadow-sm">
        <div className="mb-3">
          <label htmlFor="trackingNumber" className="form-label">Tracking Number</label>
          <input
            type="text"
            id="trackingNumber"
            name="trackingNumber"
            value={formData.trackingNumber}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="date" className="form-label">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="senderName" className="form-label">Sender Name</label>
          <input
            type="text"
            id="senderName"
            name="senderName"
            value={formData.senderName}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="SendercontactNumber" className="form-label">Sender Contact Number</label>
          <input
            type="text"
            id="SendercontactNumber"
            name="SendercontactNumber"
            value={formData.SendercontactNumber}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="recieverName" className="form-label">Receiver Name</label>
          <input
            type="text"
            id="recieverName"
            name="recieverName"
            value={formData.recieverName}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="ReceivercontactNumber" className="form-label">Receiver Contact Number</label>
          <input
            type="text"
            id="ReceivercontactNumber"
            name="ReceivercontactNumber"
            value={formData.ReceivercontactNumber}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="senderEmail" className="form-label">Sender Email</label>
          <input
            type="email"
            id="senderEmail"
            name="senderEmail"
            value={formData.senderEmail}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="receiverEmail" className="form-label">Receiver Email</label>
          <input
            type="email"
            id="receiverEmail"
            name="receiverEmail"
            value={formData.receiverEmail}
            onChange={handleChange}
            className="form-control"
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
          <label htmlFor="senderAddress" className="form-label">Sender Address</label>
          <input
            type="text"
            id="senderAddress"
            name="senderAddress"
            value={formData.senderAddress}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="receiverAddress" className="form-label">Receiver Address</label>
          <input
            type="text"
            id="receiverAddress"
            name="receiverAddress"
            value={formData.receiverAddress}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="noOfBox" className="form-label">Number of Boxes</label>
          <input
            type="number"
            id="noOfBox"
            name="noOfBox"
            value={formData.noOfBox}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="boxSize" className="form-label">Box Size</label>
          <input
            type="text"
            id="boxSize"
            name="boxSize"
            value={formData.boxSize}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="noOfKg" className="form-label">Number of Kilograms</label>
          <input
            type="number"
            id="noOfKg"
            name="noOfKg"
            value={formData.noOfKg}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="dateLoaded" className="form-label">Date Loaded</label>
          <input
            type="date"
            id="dateLoaded"
            name="dateLoaded"
            value={formData.dateLoaded}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="remarks" className="form-label">Remarks</label>
          <textarea
            id="remarks"
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-primary">Add Data</button>
      </form>
    </div>
  );
}

// Correct PropTypes assignment
CreateTrackingData.propTypes = {
  onClose: PropTypes.func
};

export default CreateTrackingData;
