import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { Modal, Button } from 'react-bootstrap';
import { supabase } from '../../../../components/supabase/config.js';

function UpdatePage() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingRow, setEditingRow] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const { data: trackingData, error } = await supabase
                .from('trackingfbt')
                .select('*');

            if (error) {
                console.error('Error fetching data:', error);
            } else {
                setData(trackingData);
            }
            setLoading(false);
        };

        fetchData();
    }, []);

    const handleEdit = (row) => {
        setEditingRow(row);
        setShowModal(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditingRow((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        const { error } = await supabase
            .from('trackingfbt')
            .update(editingRow)
            .eq('id', editingRow.id);

        if (error) {
            console.error('Error updating row:', error);
        } else {
            setData(data.map(row => (row.id === editingRow.id ? editingRow : row)));
            setShowModal(false);
            setEditingRow(null);
        }
    };

    const handleDelete = async (id) => {
        const { error } = await supabase
            .from('trackingfbt')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting row:', error);
        } else {
            setData(data.filter(row => row.id !== id));
        }
    };

    const columns = [
        { name: "ID", selector: row => row.id, sortable: true },
        { name: "Sender", selector: row => row.sender, sortable: true },
        { name: "Receiver", selector: row => row.receiver, sortable: true },
        { name: "Items", selector: row => row.items, sortable: true },
        { name: "Date Ordered", selector: row => row.date_ordered, sortable: true },
        { name: "No. of Boxes", selector: row => row.no_of_box },
        { name: "Box Size", selector: row => row.box_size },
        { name: "Weight", selector: row => row.weight },
        { name: "Address", selector: row => row.address },
        { name: "Destination", selector: row => row.destination },
        { name: "Date Loaded", selector: row => row.date_loaded, sortable: true },
        {
            name: "Actions",
            cell: row => (
                <div>
                    <Button
                        onClick={() => handleEdit(row)}
                        variant="primary"
                        size="sm"
                        className="mr-2"
                    >
                        Edit
                    </Button>
                    <Button
                        onClick={() => handleDelete(row.id)}
                        variant="danger"
                        size="sm"
                    >
                        Delete
                    </Button>
                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        }
    ];

    return (
        <div className="container-xl">
            <div className="table-responsive">
                <div className="table-wrapper">
                    <div className="table-title">
                        <div className="row">
                            <div className="col-sm-6">
                                <h2>Data <b>Management</b></h2>
                            </div>
                        </div>
                    </div>

                    <DataTable
                        title="Tracking Information"
                        columns={columns}
                        data={data}
                        progressPending={loading}
                        pagination
                        highlightOnHover
                        customStyles={{
                            header: { style: { minHeight: '56px' } },
                            headRow: { style: { backgroundColor: '#e3f2fd' } },
                            rows: { highlightOnHoverStyle: { backgroundColor: '#f1f8e9' } },
                        }}
                    />

                    {/* Modal for editing row */}
                    <Modal show={showModal} onHide={() => setShowModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit Shipping Information</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form>
                                <div className="mb-3">
                                    <label className="form-label">Sender</label>
                                    <input
                                        type="text"
                                        name="sender"
                                        value={editingRow?.sender || ''}
                                        onChange={handleChange}
                                        className="form-control"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Receiver</label>
                                    <input
                                        type="text"
                                        name="receiver"
                                        value={editingRow?.receiver || ''}
                                        onChange={handleChange}
                                        className="form-control"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Items</label>
                                    <input
                                        type="text"
                                        name="items"
                                        value={editingRow?.items || ''}
                                        onChange={handleChange}
                                        className="form-control"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Date Ordered</label>
                                    <input
                                        type="date"
                                        name="date_ordered"
                                        value={editingRow?.date_ordered || ''}
                                        onChange={handleChange}
                                        className="form-control"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">No. of Boxes</label>
                                    <input
                                        type="number"
                                        name="no_of_box"
                                        value={editingRow?.no_of_box || ''}
                                        onChange={handleChange}
                                        className="form-control"
                                    />
                                </div>
                                {/* Additional Fields */}
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowModal(false)}>
                                Cancel
                            </Button>
                            <Button variant="primary" onClick={handleSave}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </div>
    );
}

export default UpdatePage;
