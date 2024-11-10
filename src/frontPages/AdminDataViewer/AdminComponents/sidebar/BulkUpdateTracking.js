import React, { useState } from 'react';

const TrackingTable = () => {
  const [trackingNumbers, setTrackingNumbers] = useState([]);
  const [newTrackingNumber, setNewTrackingNumber] = useState('');
  const [commonDate, setCommonDate] = useState('');
  const [commonStatus, setCommonStatus] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Add a new tracking number to the list
  const addTrackingNumber = () => {
    if (newTrackingNumber) {
      setTrackingNumbers((prev) => [...prev, { trackingNumber: newTrackingNumber }]);
      setNewTrackingNumber('');
    }
  };

  // Remove a tracking number from the list
  const removeTrackingNumber = (index) => {
    setTrackingNumbers((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle submission (currently just shows a success message)
  const handleSubmit = () => {
    setSuccessMessage('All entries have been prepared for database submission!');
    // Reset form
    setTrackingNumbers([]);
    setCommonDate('');
    setCommonStatus('');
  };

  return (
    <div className="container">
      <h2>Tracking Table</h2>

      {/* Input for adding tracking numbers */}
      <div className="mb-3">
        <input
          type="text"
          value={newTrackingNumber}
          placeholder="Enter tracking number"
          onChange={(e) => setNewTrackingNumber(e.target.value)}
          className="form-control mb-2"
        />
        <button onClick={addTrackingNumber} className="btn btn-primary">
          Add Tracking Number
        </button>
      </div>

      {/* Display list of tracking numbers */}
      <table className="table">
        <thead>
          <tr>
            <th>Tracking Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {trackingNumbers.map((item, index) => (
            <tr key={index}>
              <td>{item.trackingNumber}</td>
              <td>
                <button onClick={() => removeTrackingNumber(index)} className="btn btn-danger btn-sm">
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Common Date and Status Inputs */}
      <div className="mb-3">
        <label>Date</label>
        <input
          type="date"
          value={commonDate}
          onChange={(e) => setCommonDate(e.target.value)}
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label>Status (Remarks)</label>
        <input
          type="text"
          value={commonStatus}
          placeholder="Enter status (e.g., Delivered, In Transit)"
          onChange={(e) => setCommonStatus(e.target.value)}
          className="form-control"
        />
      </div>

      {/* Submit Button */}
      <button onClick={handleSubmit} className="btn btn-success">
        Prepare for Submission
      </button>

      {/* Success Message */}
      {successMessage && <p className="text-success mt-3">{successMessage}</p>}
    </div>
  );
};

export default TrackingTable;
