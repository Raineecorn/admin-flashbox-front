import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap'; 
import Pagination from './pagination/pagination.js';
import CreateTrackingData from './CreateTrackingData.js';
import EditForm from './DataComponents/EditForm.js';
import TableEntry from './DataComponents/TableEntry.js';
import { supabase } from '../../../../components/supabase/config.js';
import 'bootstrap/dist/css/bootstrap.min.css';

function DataViewer() {
    const [filter, setFilter] = useState('');
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [editingEntry, setEditingEntry] = useState(null);
    const [creating, setCreating] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const { data: fetchedData, error } = await supabase.from('trackingfbt').select('*');
            if (error) {
                console.error('Error fetching data:', error);
            } else {
                setData(fetchedData);
            }
        };
        fetchData();
    }, []);

    const filteredData = data.filter(item => item.id.includes(filter));

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const showEditForm = (entry) => {
        setEditingEntry(entry);
        setShowModal(true);
    };

    const handleEdit = async () => {
        const { data: updatedData, error } = await supabase
            .from('trackingfbt')
            .update(editingEntry)
            .eq('id', editingEntry.id)
            .single();

        if (error) {
            console.error('Error updating entry:', error);
        } else {
            setData(data.map(entry => (entry.id === updatedData.id ? updatedData : entry)));
            setShowModal(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditingEntry(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="container-xl">
            <div className="table-responsive">
                <div className="table-wrapper">
                    <div className="table-title">
                        <div className="row">
                            <div className="col-sm-5">
                                <h2>Data <b>Management</b></h2>
                            </div>
                            <div className="col-sm-7 text-right">
                                <button className="btn btn-danger" onClick={() => setCreating(true)}>
                                    <i className="material-icons">&#xE147;</i> <span>Add New Entry</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {creating ? (
                        <CreateTrackingData onSubmit={handleEdit} onCancel={() => setCreating(false)} />
                    ) : (
                        <>
                            <div className="row mb-4 justify-content-center">
                                <div className="col-sm-6">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search by ID"
                                        value={filter}
                                        onChange={(e) => setFilter(e.target.value)}
                                    />
                                </div>
                            </div>
                            <TableEntry
                                data={currentItems}
                                formatDate={formatDate}
                                onEdit={showEditForm}
                            />
                            <div className="clearfix">
                                <div className="hint-text">
                                    Showing <b>{currentItems.length}</b> out of <b>{filteredData.length}</b> entries
                                </div>
                                <Pagination
                                    itemsPerPage={itemsPerPage}
                                    totalItems={filteredData.length}
                                    paginate={setCurrentPage}
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>

            {editingEntry && (
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Entry</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Sender</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="sender"
                                    value={editingEntry.sender || ''}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Receiver</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="receiver"
                                    value={editingEntry.receiver || ''}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Items</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="items"
                                    value={editingEntry.items || ''}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Date Ordered</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="date_ordered"
                                    value={editingEntry.date_ordered || ''}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>No. of Boxes</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="no_of_box"
                                    value={editingEntry.no_of_box || ''}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
                        <Button variant="primary" onClick={handleEdit}>Save Changes</Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
}

export default DataViewer;
