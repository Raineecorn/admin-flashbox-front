import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap

const App = () => {
  const initialData = [
    {
      trackingNumber: "FB24000",
      statuses: [
        { status: "Ordered", timestamp: "2023-08-01" },
        { status: "In Transit", timestamp: "2023-08-05" },
      ]
    },
    {
      trackingNumber: "FB24001",
      statuses: [
        { status: "Ordered", timestamp: "2023-08-02" },
        { status: "Arrived at Facility", timestamp: "2023-08-06" },
      ]
    },
    {
      trackingNumber: "FB24002",
      statuses: [
        { status: "Ordered", timestamp: "2023-08-03" },
        { status: "Delivered", timestamp: "2023-08-07" },
      ]
    }
  ];

  const [data, setData] = useState(initialData); // Data state for tracking numbers
  const [selectedTracking, setSelectedTracking] = useState(null); // State for selected tracking number
  const [newStatus, setNewStatus] = useState(''); // State for new status
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [editingStatusTimestamp, setEditingStatusTimestamp] = useState(null); // State for editing a status

  // Search for tracking number
  const handleSearch = () => {
    const found = data.find(item => item.trackingNumber === searchQuery);
    setSelectedTracking(found ? found : null);
  };

  // Handle adding a new status
  const handleAddStatus = () => {
    if (newStatus && selectedTracking) {
      const updatedData = data.map(item => 
        item.trackingNumber === selectedTracking.trackingNumber
          ? {
              ...item,
              statuses: [
                ...item.statuses,
                { status: newStatus, timestamp: new Date().toISOString() }
              ]
            }
          : item
      );
      setData(updatedData);
      setNewStatus('');
      alert('New status added');
    }
  };

  // Handle deleting a specific status
  const handleDeleteStatus = (timestamp) => {
    const updatedData = data.map(item =>
      item.trackingNumber === selectedTracking.trackingNumber
        ? {
            ...item,
            statuses: item.statuses.filter(status => status.timestamp !== timestamp)
          }
        : item
    );
    setData(updatedData);
    alert('Status deleted');
  };

  // Handle editing a status
  const handleEditStatus = (timestamp, updatedStatus) => {
    const updatedData = data.map(item =>
      item.trackingNumber === selectedTracking.trackingNumber
        ? {
            ...item,
            statuses: item.statuses.map(status =>
              status.timestamp === timestamp
                ? { ...status, status: updatedStatus }
                : status
            )
          }
        : item
    );
    setData(updatedData);
    setEditingStatusTimestamp(null); // Reset editing state after updating
    alert('Status updated');
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Tracking Number CRUD System</h1>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search by tracking number"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className="btn btn-primary mt-2"
          onClick={handleSearch}
        >
          Search Tracking Number
        </button>
      </div>

      {/* Conditionally render tracking info and status history */}
      {selectedTracking ? (
        <div>
          <h3 className="mt-4">Tracking Number: {selectedTracking.trackingNumber}</h3>
          
          {/* Add New Status */}
          <div className="mb-4">
            <h4>Add New Status</h4>
            <input
              type="text"
              className="form-control w-50"
              placeholder="Enter new status"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
            />
            <button
              className="btn btn-success mt-2"
              onClick={handleAddStatus}
            >
              Add Status
            </button>
          </div>

          {/* Status History */}
          <h4>Status History</h4>
          <ul className="list-group">
            {selectedTracking.statuses.map((status, index) => (
              <li key={index} className="list-group-item">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>Status:</strong> {status.status} | <strong>Timestamp:</strong> {new Date(status.timestamp).toLocaleString()}
                  </div>
                  <div>
                    {/* If editing, show the select dropdown */}
                    {editingStatusTimestamp === status.timestamp ? (
                      <>
                        <select
                          className="form-control w-50"
                          onChange={(e) => handleEditStatus(status.timestamp, e.target.value)}
                        >
                          <option value="Loaded">Loaded</option>
                          <option value="Shipping">Shipping</option>
                          <option value="On Delivery">On Delivery</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </>
                    ) : (
                      <>
                        <button
                          className="btn btn-warning btn-sm mr-2"
                          onClick={() => setEditingStatusTimestamp(status.timestamp)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDeleteStatus(status.timestamp)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-center">Please search for a valid tracking number.</p>
      )}
    </div>
  );
};

export default App;
