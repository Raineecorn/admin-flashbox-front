import React, { useState } from 'react';
import UpdateTrackingData from '../UpdateTrackingData.js'; 
import ConfirmationDialog from '../../../../../components/Confirmation/ConfirmationDialog.js';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

function CreateData() {
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [operationStatus, setOperationStatus] = useState({ isSuccess: false, isFailure: false });
    const [formData, setFormData] = useState(null); // Store form data

    const handleActionConfirm = async () => {
        setOperationStatus({ isSuccess: false, isFailure: false }); // Reset status before operation
        try {
            await new Promise((resolve, reject) => {
                if (Math.random() > 0.5) resolve(); // Arbitrary success condition
                else reject(new Error('Operation Failed'));
            });
            setOperationStatus({ isSuccess: true, isFailure: false });
            console.log("Form Data Submitted:", formData); // Log form data
        } catch (error) {
            setOperationStatus({ isSuccess: false, isFailure: true });
        }
    };

    const handleFormSubmit = (data) => {
        setFormData(data); // Store form data
        setDialogOpen(true); // Open confirmation dialog
    };

    const handleClose = () => {
        setDialogOpen(false);
        setOperationStatus({ isSuccess: false, isFailure: false }); // Reset status on close
    };

    return (
        <div className="container py-5">
            <div className="card p-4 shadow">
                {/* Pass handleFormSubmit to InputForm */}
                <UpdateTrackingData onSubmit={handleFormSubmit} />
            </div>

            <ConfirmationDialog
                isOpen={isDialogOpen}
                onClose={handleClose}
                onConfirm={handleActionConfirm}
                message="Are you sure you want to submit the form?"
                isSuccess={operationStatus.isSuccess}
                isFailure={operationStatus.isFailure}
                successMessage="Form successfully submitted."
                failureMessage="Submission failed. Please try again."
            />
        </div>
    );
}

export default CreateData;
