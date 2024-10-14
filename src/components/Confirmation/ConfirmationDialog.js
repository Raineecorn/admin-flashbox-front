import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for prop validation
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported

const ConfirmationDialog = ({
  isOpen,
  onClose,
  onConfirm,
  message,
  isSuccess,
  isFailure,
  successMessage,
  failureMessage
}) => {
  if (!isOpen) return null;

  const handleConfirmClick = () => {
    onConfirm(); // This will handle the logic to determine success or failure
  };

  return (
    <div className="confirmation-overlay d-flex justify-content-center align-items-center">
      <div className="confirmation-dialog card p-4 shadow-lg">
        <div className="mb-3">{message}</div>
        {isSuccess && <div className="alert alert-success">{successMessage}</div>}
        {isFailure && (
          <div className="alert alert-danger">
            {failureMessage}
            <button onClick={handleConfirmClick} className="btn btn-warning mt-3">Retry</button>
          </div>
        )}
        <div className="d-flex justify-content-end mt-4">
          <button onClick={handleConfirmClick} className="btn btn-primary me-2">Confirm</button>
          <button onClick={onClose} className="btn btn-secondary">Close</button>
        </div>
      </div>
    </div>
  );
};

// Add PropTypes validation
ConfirmationDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired, // isOpen must be a boolean and is required
  onClose: PropTypes.func.isRequired, // onClose must be a function and is required
  onConfirm: PropTypes.func.isRequired, // onConfirm must be a function and is required
  message: PropTypes.string.isRequired, // message must be a string and is required
  isSuccess: PropTypes.bool, // isSuccess is an optional boolean
  isFailure: PropTypes.bool, // isFailure is an optional boolean
  successMessage: PropTypes.string, // successMessage is an optional string
  failureMessage: PropTypes.string, // failureMessage is an optional string
};

// Default props in case they aren't provided
ConfirmationDialog.defaultProps = {
  isSuccess: false,
  isFailure: false,
  successMessage: '',
  failureMessage: ''
};

export default ConfirmationDialog;
