import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for prop validation
import UpdateTrackingData from '../UpdateTrackingData.js';

function EditData({ initialData, onSubmit, onCancel }) {
  return (
    <UpdateTrackingData 
      initialData={initialData}
      onSubmit={onSubmit}
      isEditing={true}
      onCancel={onCancel}
    />
  );
}

// Adding PropTypes validation
EditData.propTypes = {
  initialData: PropTypes.object.isRequired, // Ensure initialData is an object and is required
  onSubmit: PropTypes.func.isRequired,      // Ensure onSubmit is a function and is required
  onCancel: PropTypes.func.isRequired,      // Ensure onCancel is a function and is required
};

export default EditData;
