import React, { useEffect, useState } from 'react';
import { supabase } from '../../../../components/supabase/supabaseClient';

function DataForm() {
    const [formData, setFormData] = useState({
        senderName: '',
        senderAddress: '',
        senderContact: '',
        receiverName: '',
        receiverAddress: '',
        receiverContact: '',
        email: '',
        boxLoadWeight: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            const trackingNumber = sessionStorage.getItem('trackingNumber');
            if (!trackingNumber) {
                setError('No tracking number found in session storage');
                setLoading(false);
                return;
            }

            const { data, error } = await supabase
                .from('trackingfbt')
                .select('*')
                .eq('id', trackingNumber)
                .single();

            if (error) {
                setError(`Error fetching data: ${error.message}`);
            } else if (!data) {
                setError('No data found for this tracking number');
            } else {
                setFormData(data);
            }
            setLoading(false);
        };

        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { error } = await supabase
            .from('trackingfbt')
            .update(formData)
            .eq('id', formData.id);

        if (error) {
            setError(`Error updating data: ${error.message}`);
        } else {
            alert('Data updated successfully!');
        }
    };

    return (
        <div className="container-xl">
            <div className="table-responsive">
                <div className="table-wrapper">
                    <div className="table-title">
                        <div className="row">
                            <div className="col-sm-5">
                                <h2>Edit <b>Shipping Information</b></h2>
                            </div>
                        </div>
                    </div>
                    {loading ? (
                        <p>Loading data...</p>
                    ) : error ? (
                        <p className="text-danger">{error}</p>
                    ) : (
                        <form onSubmit={handleSubmit} className="p-4 border rounded bg-light shadow">
                            <div className="row">
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">Sender Name:</label>
                                    <input
                                        type="text"
                                        name="senderName"
                                        value={formData.senderName || ''}
                                        onChange={handleChange}
                                        className="form-control"
                                    />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">Sender Address:</label>
                                    <input
                                        type="text"
                                        name="senderAddress"
                                        value={formData.senderAddress || ''}
                                        onChange={handleChange}
                                        className="form-control"
                                    />
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">Sender Contact:</label>
                                    <input
                                        type="text"
                                        name="senderContact"
                                        value={formData.senderContact || ''}
                                        onChange={handleChange}
                                        className="form-control"
                                    />
                                </div>
                            </div>

                            {/* Add more fields as needed */}
                            <button type="submit" className="btn btn-dark btn-block mt-3">Save Changes</button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

export default DataForm;
