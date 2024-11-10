import React, { useState } from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';

const initialFormState = {
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
};

const mockData = [
  {
    trackingNumber: 'FB24000',
    date: '2023-09-10',
    senderName: 'John Doe',
    SendercontactNumber: '123456789',
    recieverName: 'Jane Doe',
    ReceivercontactNumber: '987654321',
    senderEmail: 'johndoe@example.com',
    receiverEmail: 'janedoe@example.com',
    items: 'Electronics',
    senderAddress: '123 Main St',
    receiverAddress: '456 Elm St',
    noOfBox: '2',
    boxSize: 'Medium',
    noOfKg: '5',
    dateLoaded: '2023-09-12',
    remarks: 'Fragile'
  },
  // Additional mock data as needed
];

function InputForm({ onClose }) {
  const [formData, setFormData] = useState(initialFormState);
  const [data, setData] = useState(mockData);
  const [isEditing, setIsEditing] = useState(false);
  const [trackingSearch, setTrackingSearch] = useState('');
  const [error, setError] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Handle search by tracking number
  const handleSearch = (e) => {
    e.preventDefault();
    const foundData = data.find((item) => item.trackingNumber === trackingSearch);
    if (foundData) {
      setFormData(foundData);
      setIsEditing(true);
      setError('');
    } else {
      setError('Tracking number not found');
      setIsEditing(false);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle form submission for adding or updating data
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setData(data.map(item => item.trackingNumber === formData.trackingNumber ? formData : item));
      alert('Customer details updated successfully!');
    } else {
      setData([...data, formData]);
      alert('Customer details added successfully!');
    }
    setFormData(initialFormState);
    setIsEditing(false);
  };

  // Handle deletion of an entry
  const handleDelete = () => {
    setData(data.filter(item => item.trackingNumber !== formData.trackingNumber));
    setFormData(initialFormState);
    setIsEditing(false);
    setShowDeleteConfirm(false);
    alert('Tracking number deleted successfully!');
  };

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4"> Edit Customer Details </h1>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-4 d-flex justify-content-center">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Enter tracking number to search"
          value={trackingSearch}
          onChange={(e) => setTrackingSearch(e.target.value)}
        />
        <button type="submit" className="btn btn-primary ms-2">Search</button>
      </form>
      {error && <p className="text-danger text-center">{error}</p>}

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="text-dark bg-light p-4 rounded shadow-sm">
        <div className="row">
          {Object.keys(initialFormState).map((field, index) => (
            <div className="col-md-6 mb-3" key={index}>
              <label className="form-label" htmlFor={field}>{field.replace(/([A-Z])/g, ' $1')}</label>
              <input
                type="text"
                id={field}
                name={field}
                className="form-control"
                value={formData[field] || ''}
                onChange={handleChange}
              />
            </div>
          ))}
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-success me-2">{isEditing ? 'Update' : 'Add Entry'}</button>
          {isEditing && (
            <button type="button" className="btn btn-danger" onClick={() => setShowDeleteConfirm(true)}>
              Delete
            </button>
          )}
        </div>
      </form>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="modal show" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button type="button" className="btn-close" onClick={() => setShowDeleteConfirm(false)}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this tracking number?</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
                <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

InputForm.propTypes = {
  onClose: PropTypes.func
};

export default InputForm;
