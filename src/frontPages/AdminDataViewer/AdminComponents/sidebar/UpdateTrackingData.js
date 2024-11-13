import React, { useState, useEffect } from 'react';
import { supabase } from '../../../../components/supabase/config.js';

const TrackingTable = () => {
  const [trackingNumbers, setTrackingNumbers] = useState([]);
  const [allTrackingNumbers, setAllTrackingNumbers] = useState([]);
  const [newTrackingNumber, setNewTrackingNumber] = useState('');
  const [commonDate, setCommonDate] = useState('');
  const [commonStatus, setCommonStatus] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  // Fetch all tracking numbers from the database for dropdown suggestions
  useEffect(() => {
    const fetchTrackingNumbers = async () => {
      const { data, error } = await supabase
        .from('trackingfbt_audit')
        .select('tracking_id');
      if (error) {
        console.error('Error fetching tracking numbers:', error);
      } else {
        setAllTrackingNumbers(data.map(item => item.tracking_id));
      }
    };
    fetchTrackingNumbers();
  }, []);

  // Filter suggestions based on input
  const handleInputChange = (e) => {
    const userInput = e.target.value;
    setNewTrackingNumber(userInput);
    const filtered = allTrackingNumbers.filter(trackingNumber =>
      trackingNumber.toLowerCase().includes(userInput.toLowerCase())
    );
    setFilteredSuggestions(filtered);
  };

  // Add a new tracking number to the list
  const addTrackingNumber = (trackingNumber) => {
    if (trackingNumber && !trackingNumbers.find(item => item.trackingNumber === trackingNumber)) {
      setTrackingNumbers((prev) => [...prev, { trackingNumber }]);
      setNewTrackingNumber('');
      setFilteredSuggestions([]);
    }
  };

  // Handle selection from dropdown
  const handleSuggestionClick = (suggestion) => {
    addTrackingNumber(suggestion);
  };

  // Remove a tracking number from the list
  const removeTrackingNumber = (index) => {
    setTrackingNumbers((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle submission to Supabase
  const handleSubmit = async () => {
    const { data: maxAuditIdData, error: fetchError } = await supabase
      .from('trackingfbt_audit')
      .select('audit_id')
      .order('audit_id', { ascending: false })
      .limit(1);

    if (fetchError) {
      console.error('Error fetching max audit_id:', fetchError);
      return;
    }

    let nextAuditId = maxAuditIdData.length > 0 ? maxAuditIdData[0].audit_id + 1 : 1;

    const dataToInsert = trackingNumbers.map(item => ({
      tracking_id: item.trackingNumber,
      audit_id: nextAuditId++,
      date_loaded: commonDate,
      remarks: commonStatus
    }));

    const { data, error } = await supabase
      .from('trackingfbt_audit')
      .insert(dataToInsert)
      .select();

    if (error) {
      console.error('Error inserting data:', error);
    } else {
      setSuccessMessage('All entries have been submitted to the database!');
      setTrackingNumbers([]);
      setCommonDate('');
      setCommonStatus('');
    }
  };

  return (
    <div className="container">
      <h2>Tracking Table</h2>

      {/* Input for adding tracking numbers */}
      <div className="mb-3">
        <input
          type="text"
          value={newTrackingNumber}
          placeholder="Enter or search tracking number"
          onChange={handleInputChange}
          className="form-control mb-2"
        />
        <button onClick={() => addTrackingNumber(newTrackingNumber)} className="btn btn-primary">
          Add Tracking Number
        </button>

        {/* Dropdown Suggestions */}
        {filteredSuggestions.length > 0 && (
          <ul className="list-group mt-2">
            {filteredSuggestions.map((suggestion, index) => (
              <li key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="list-group-item list-group-item-action"
                style={{ cursor: 'pointer' }}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
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
        Submit to Database
      </button>

      {/* Success Message */}
      {successMessage && <p className="text-success mt-3">{successMessage}</p>}
    </div>
  );
};

export default TrackingTable;
