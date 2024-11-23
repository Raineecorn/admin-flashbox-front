import React, { useState, useEffect } from 'react';
import { supabase } from '../../../../components/supabase/config';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [data, setData] = useState([]); // Data fetched from Supabase
  const [selectedTracking, setSelectedTracking] = useState(null); // Selected tracking number details
  const [searchQuery, setSearchQuery] = useState(''); // Search query for tracking number
  const [editingStatusId, setEditingStatusId] = useState(null); // ID of the status being edited
  const [updatedStatus, setUpdatedStatus] = useState(''); // Updated status input
  const [updatedDate, setUpdatedDate] = useState(''); // Updated date input
  const [newStatus, setNewStatus] = useState(''); // New status input
  const [newDate, setNewDate] = useState(''); // New date input

  // Fetch all tracking numbers and their details from Supabase
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('trackingfbt_audit')
        .select('tracking_id, date_loaded, remarks, audit_id');
      if (error) {
        console.error('Error fetching data:', error);
      } else {
        // Group statuses by tracking_id
        const groupedData = data.reduce((acc, item) => {
          const { tracking_id, date_loaded, remarks, audit_id } = item;
          if (!acc[tracking_id]) {
            acc[tracking_id] = { trackingNumber: tracking_id, statuses: [] };
          }
          acc[tracking_id].statuses.push({
            id: audit_id, // Unique ID for the status
            status: remarks || 'No status available',
            timestamp: date_loaded || 'No date available',
          });
          return acc;
        }, {});

        // Convert the grouped data to an array
        setData(Object.values(groupedData));
      }
    };
    fetchData();
  }, []);

  // Search for a tracking number
  const handleSearch = () => {
    const found = data.find(item => item.trackingNumber === searchQuery);
    setSelectedTracking(found || null); // Set the found tracking number or null if not found
  };

  // Handle editing a status and date
  const handleEditStatus = (status) => {
    setEditingStatusId(status.id); // Set the ID of the status being edited
    setUpdatedStatus(status.status); // Set the current status as the initial value
    setUpdatedDate(status.timestamp); // Set the current date as the initial value
  };

  const saveEditedStatus = async () => {
    if (!editingStatusId) return;

    const { error } = await supabase
      .from('trackingfbt_audit')
      .update({ remarks: updatedStatus, date_loaded: updatedDate })
      .eq('audit_id', editingStatusId);

    if (error) {
      console.error('Error updating status:', error);
    } else {
      const updatedStatuses = selectedTracking.statuses.map(s =>
        s.id === editingStatusId
          ? { ...s, status: updatedStatus, timestamp: updatedDate }
          : s
      );

      setSelectedTracking({ ...selectedTracking, statuses: updatedStatuses });
      setEditingStatusId(null);
      setUpdatedStatus('');
      setUpdatedDate('');
      alert('Status and date updated successfully.');
    }
  };

  // Handle deleting a status
  const handleDeleteStatus = async (statusId) => {
    const { error } = await supabase
      .from('trackingfbt_audit')
      .delete()
      .eq('audit_id', statusId);

    if (error) {
      console.error('Error deleting status:', error);
    } else {
      const updatedStatuses = selectedTracking.statuses.filter(s => s.id !== statusId);

      setSelectedTracking({ ...selectedTracking, statuses: updatedStatuses });
      alert('Status deleted successfully.');
    }
  };

  // Handle adding a new status
  const handleAddStatus = async () => {
    if (!newStatus || !newDate || !selectedTracking) {
      alert('Please fill out both the status and date fields.');
      return;
    }

    try {
      const { data: maxAuditIdData, error: maxAuditIdError } = await supabase
        .from('trackingfbt_audit')
        .select('audit_id')
        .order('audit_id', { ascending: false })
        .limit(1);

      if (maxAuditIdError) {
        console.error('Error fetching max audit_id:', maxAuditIdError);
        alert('Failed to add status. Please try again.');
        return;
      }

      const nextAuditId = maxAuditIdData.length > 0 ? maxAuditIdData[0].audit_id + 1 : 1;

      const { data: insertedData, error } = await supabase
        .from('trackingfbt_audit')
        .insert({
          audit_id: nextAuditId,
          tracking_id: selectedTracking.trackingNumber,
          remarks: newStatus,
          date_loaded: newDate,
        })
        .select();

      if (error) {
        console.error('Error adding status:', error);
        alert('Failed to add status. Please try again.');
      } else {
        const newStatusEntry = {
          id: insertedData[0].audit_id,
          status: newStatus,
          timestamp: newDate,
        };

        const updatedStatuses = [...selectedTracking.statuses, newStatusEntry];

        setSelectedTracking({ ...selectedTracking, statuses: updatedStatuses });
        setNewStatus('');
        setNewDate('');
        alert('New status added successfully.');
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  
  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Search Tracking Number</h1>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Enter tracking number"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className="btn btn-primary mt-2"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      {/* Conditionally render status history */}
      {selectedTracking ? (
        <div>
          <h3 className="mt-4">Tracking Number: {selectedTracking.trackingNumber}</h3>
          <h4>Status History</h4>
          <ul className="list-group">
            {selectedTracking.statuses.map((status) => (
              <li key={status.id} className="list-group-item">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>Status:</strong> {editingStatusId === status.id ? (
                      <input
                        type="text"
                        className="form-control mb-2"
                        value={updatedStatus}
                        onChange={(e) => setUpdatedStatus(e.target.value)}
                      />
                    ) : (
                      status.status
                    )}
                    {' | '}
                    <strong>Date:</strong> {editingStatusId === status.id ? (
                      <input
                        type="date"
                        className="form-control"
                        value={updatedDate}
                        onChange={(e) => setUpdatedDate(e.target.value)}
                      />
                    ) : (
                      new Date(status.timestamp).toLocaleDateString()
                    )}
                  </div>
                  <div>
                    {editingStatusId === status.id ? (
                      <>
                        <button
                          className="btn btn-success btn-sm mr-2"
                          onClick={saveEditedStatus}
                        >
                          Save
                        </button>
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => setEditingStatusId(null)}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="btn btn-warning btn-sm mr-2"
                          onClick={() => handleEditStatus(status)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDeleteStatus(status.id)}
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

          {/* Add New Status */}
          <div className="mt-4">
            <h4>Add New Status</h4>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Enter new status"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
            />
            <input
              type="date"
              className="form-control mb-2"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
            />
            <button className="btn btn-success" onClick={handleAddStatus}>
              Add Status
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center">Please search for a valid tracking number.</p>
      )}
    </div>
  );
};

export default App;
