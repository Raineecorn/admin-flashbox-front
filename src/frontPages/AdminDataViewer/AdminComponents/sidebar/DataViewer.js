import React, { useState } from 'react';
import Pagination from './pagination/pagination.js';
import CreateTrackingData from './CreateTrackingData.js';
import EditForm from './DataComponents/EditForm.js';
import TableEntry from './DataComponents/TableEntry.js';
import 'bootstrap/dist/css/bootstrap.min.css';

function DataViewer() {
    // States for managing filter, data, pagination, and form visibility
    const [filter, setFilter] = useState('');
    const [data, setData] = useState([
        // Sample data entries
        { id: "1001", sender: "Alice", receiver: "Tom", items: "Electronics", date_ordered: "2021-09-01", no_of_boxes: 2, box_size: "Medium", weight: "5kg", TrackingStatus: "Fragile", date_loaded: "2021-09-02" },
        { id: "1002", sender: "Bob", receiver: "Jerry", items: "Books", date_ordered: "2021-09-03", no_of_boxes: 3, box_size: "Small", weight: "8kg", TrackingStatus: "Handle with care", date_loaded: "2021-09-04" },
        // Add more entries as needed
    ]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [editingEntry, setEditingEntry] = useState(null);
    const [creating, setCreating] = useState(false);

    // Filtered data based on search input
    const filteredData = data.filter(item => item.id.includes(filter));

    // Pagination indices
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    // Date formatting function
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // Event Handlers for Creating and Editing Entries
    const handleCreate = (newEntry) => {
        setData([...data, { ...newEntry, id: Date.now() }]);
        setCreating(false);
    };

    const handleEdit = (updatedEntry) => {
        setData(data.map(entry => entry.id === updatedEntry.id ? updatedEntry : entry));
        setEditingEntry(null);
    };

    const showCreateForm = () => setCreating(true);
    const showEditForm = (entry) => setEditingEntry(entry);
    const cancelEdit = () => setEditingEntry(null);
    const cancelCreate = () => setCreating(false);

    return (
        <div className="container-xl">
            <div className="table-responsive">
                <div className="table-wrapper">
                    {/* Table Title and Add New Entry Button */}
                    <div className="table-title">
                        <div className="row">
                            <div className="col-sm-5">
                                <h2>Data <b>Management</b></h2>
                            </div>
                            <div className="col-sm-7 text-right">
                                <button className="btn btn-secondary" onClick={showCreateForm}>
                                    <i className="material-icons">&#xE147;</i> <span>Add New Entry</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Conditional Rendering for Create or Edit Form */}
                    {creating ? (
                        <CreateTrackingData onSubmit={handleCreate} onCancel={cancelCreate} />
                    ) : editingEntry ? (
                        <EditForm initialData={editingEntry} onSubmit={handleEdit} onCancel={cancelEdit} />
                    ) : (
                        <>
                            {/* Filter/Search Input */}
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

                            {/* Display Data Entries in Table */}
                            <TableEntry
                                data={currentItems}
                                filter={filter}
                                setFilter={setFilter}
                                formatDate={formatDate}
                                onEdit={showEditForm} // Pass the edit function for each entry
                            />

                            {/* Pagination Controls */}
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
        </div>
    );
}

export default DataViewer;
