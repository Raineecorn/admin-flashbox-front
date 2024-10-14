import React, { useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported

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
  // Add more sample data here if needed
];

function InputForm() {
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

  const [data, setData] = useState(mockData); // Storing mock data in state for CRUD operations
  const [isEditing, setIsEditing] = useState(false); // Whether we are editing an existing entry
  const [trackingSearch, setTrackingSearch] = useState(''); // For searching tracking number
  const [error, setError] = useState(''); // Error message for not found tracking number
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false); // Show delete confirmation dialog

  // Handle Search for a tracking number
  const handleSearch = (e) => {
    e.preventDefault();
    const foundData = data.find((data) => data.trackingNumber === trackingSearch);

    if (foundData) {
      setFormData(foundData);
      setIsEditing(true);
      setError(''); // Clear error message
    } else {
      setError('Tracking number not found');
      setIsEditing(false);
    }
  };

  // Handle Input Change
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value
  //   });
  // };

  // Handle Submit for form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      alert('Customer details updated successfully!');
      // Update the state (mock data) after editing
      setData(data.map(item => item.trackingNumber === formData.trackingNumber ? formData : item));
    } else {
      alert('Customer details added successfully!');
      setData([...data, formData]); // Add new data
    }
    console.log(formData);
  };

  // Handle Delete
  const handleDelete = () => {
    const updatedData = data.filter(item => item.trackingNumber !== formData.trackingNumber);
    setData(updatedData); // Update data state after deletion
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
    });
    setIsEditing(false); // Reset editing mode
    setShowDeleteConfirm(false); // Hide delete confirmation
    alert('Tracking number deleted successfully!');
  };

  const confirmDelete = () => {
    setShowDeleteConfirm(true); // Show delete confirmation
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false); // Hide delete confirmation
  };

  return (
    <div className="container py-4 text-blue">
      <h1 className="text-center mb-4">{isEditing ? 'Edit Customer Details' : 'Add Entry Form'}</h1>

      {/* Search Form */}
      <div className="mb-4">
        <form onSubmit={handleSearch} className="d-flex justify-content-center">
          <input
            type="text"
            className="form-control w-50"
            placeholder="Enter tracking number to search"
            value={trackingSearch}
            onChange={(e) => setTrackingSearch(e.target.value)}
          />
          <button type="submit" className="btn btn-primary ms-2">Search</button>
        </form>
        {error && <p className="text-danger text-center mt-2">{error}</p>}
      </div>

      <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow-sm">
        {/* Form fields for tracking data */}
        {/* ... same code ... */}
      </form>

      {/* Delete Button and Confirmation Dialog */}
      {isEditing && (
        <div className="text-center mt-4">
          <button className="btn btn-danger" onClick={confirmDelete}>Delete</button>
        </div>
      )}

      {/* Delete Confirmation Prompt */}
      {showDeleteConfirm && (
        <div className="modal show" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button type="button" className="btn-close" onClick={cancelDelete}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this tracking number?</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={cancelDelete}>Cancel</button>
                <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Add PropTypes validation
InputForm.propTypes = {
  onClose: PropTypes.func.isRequired
};

export default InputForm;
