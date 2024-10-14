import React, { useState } from 'react';
import Pagination from './pagination/pagination.js';
import CreateData from './DataComponents/CreateData.js';
import EditForm from './DataComponents/EditForm.js';
import TableEntry from './DataComponents/TableEntry.js';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS

function DataViewer() {
    const [filter, setFilter] = useState('');
    const [data, setData] = useState([
        { id: "1001", sender: "Alice", receiver: "Tom", items: "Electronics", date_ordered: "2021-09-01", no_of_boxes: 2, box_size: "Medium", weight: "5kg", TrackingStatus: "Fragile", date_loaded: "2021-09-02" },
        { id: "1002", sender: "Bob", receiver: "Jerry", items: "Books", date_ordered: "2021-09-03", no_of_boxes: 3, box_size: "Small", weight: "8kg", TrackingStatus: "Handle with care", date_loaded: "2021-09-04" },
        { id: "1003", sender: "Charlie", receiver: "Leo", items: "Clothes", date_ordered: "2021-09-05", no_of_boxes: 1, box_size: "Large", weight: "2kg", TrackingStatus: "Urgent", date_loaded: "2021-09-06" },
        { id: "1004", sender: "Dana", receiver: "Max", items: "Furniture", date_ordered: "2021-09-07", no_of_boxes: 2, box_size: "Extra Large", weight: "20kg", TrackingStatus: "No rush", date_loaded: "2021-09-08" },
        { id: "1005", sender: "Eve", receiver: "Nora", items: "Garden supplies", date_ordered: "2021-09-09", no_of_boxes: 2, box_size: "Medium", weight: "15kg", TrackingStatus: "Waterproof", date_loaded: "2021-09-10" },
        { id: "1006", sender: "Frank", receiver: "Olive", items: "Sporting goods", date_ordered: "2021-09-11", no_of_boxes: 1, box_size: "Large", weight: "12kg", TrackingStatus: "Handle with care", date_loaded: "2021-09-12" },
        { id: "1007", sender: "Grace", receiver: "Peter", items: "Art supplies", date_ordered: "2021-09-13", no_of_boxes: 4, box_size: "Small", weight: "9kg", TrackingStatus: "Fragile", date_loaded: "2021-09-14" },
        { id: "1008", sender: "Henry", receiver: "Quinn", items: "Home appliances", date_ordered: "2021-09-15", no_of_boxes: 1, box_size: "Extra Large", weight: "25kg", TrackingStatus: "Urgent", date_loaded: "2021-09-16" },
        { id: "1009", sender: "Ivy", receiver: "Rachel", items: "Musical instruments", date_ordered: "2021-09-17", no_of_boxes: 2, box_size: "Medium", weight: "10kg", TrackingStatus: "No rush", date_loaded: "2021-09-18" },
        { id: "1010", sender: "Jack", receiver: "Steve", items: "Computer hardware", date_ordered: "2021-09-19", no_of_boxes: 3, box_size: "Large", weight: "18kg", TrackingStatus: "Handle with care", date_loaded: "2021-09-20" },
        { id: "1011", sender: "Kara", receiver: "Tim", items: "Office supplies", date_ordered: "2021-09-21", no_of_boxes: 2, box_size: "Small", weight: "6kg", TrackingStatus: "Fragile", date_loaded: "2021-09-22" },
        { id: "1012", sender: "Liam", receiver: "Uma", items: "Toys", date_ordered: "2021-09-23", no_of_boxes: 2, box_size: "Medium", weight: "7kg", TrackingStatus: "Waterproof", date_loaded: "2021-09-24" },
        { id: "1013", sender: "Mona", receiver: "Vince", items: "Kitchenware", date_ordered: "2021-09-25", no_of_boxes: 1, box_size: "Large", weight: "5kg", TrackingStatus: "Urgent", date_loaded: "2021-09-26" },
        { id: "1014", sender: "Ned", receiver: "Walt", items: "Decorations", date_ordered: "2021-09-27", no_of_boxes: 3, box_size: "Extra Large", weight: "20kg", TrackingStatus: "No rush", date_loaded: "2021-09-28" },
        { id: "1015", sender: "Ola", receiver: "Xena", items: "Automotive parts", date_ordered: "2021-09-29", no_of_boxes: 2, box_size: "Medium", weight: "13kg", TrackingStatus: "Handle with care", date_loaded: "2021-09-30" },
        { id: "1016", sender: "Pablo", receiver: "Yolanda", items: "Healthcare products", date_ordered: "2021-10-01", no_of_boxes: 2, box_size: "Small", weight: "3kg", TrackingStatus: "Fragile", date_loaded: "2021-10-02" },
        { id: "1017", sender: "Quincy", receiver: "Zane", items: "Building materials", date_ordered: "2021-10-03", no_of_boxes: 1, box_size: "Extra Large", weight: "30kg", TrackingStatus: "Urgent", date_loaded: "2021-10-04" },
        { id: "1018", sender: "Rita", receiver: "Andy", items: "Fashion accessories", date_ordered: "2021-10-05", no_of_boxes: 3, box_size: "Medium", weight: "8kg", TrackingStatus: "Waterproof", date_loaded: "2021-10-06" },
        { id: "1019", sender: "Sam", receiver: "Bella", items: "Photography equipment", date_ordered: "2021-10-07", no_of_boxes: 2, box_size: "Large", weight: "11kg", TrackingStatus: "Handle with care", date_loaded: "2021-10-08" },
        { id: "1020", sender: "Tina", receiver: "Carlos", items: "Food products", date_ordered: "2021-10-09", no_of_boxes: 1, box_size: "Small", weight: "2kg", TrackingStatus: "Fragile", date_loaded: "2021-10-10" }
    ]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [editingEntry, setEditingEntry] = useState(null);
    const [creating, setCreating] = useState(false);

    const filteredData = data.filter(item => item.id.includes(filter));
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const handleCreate = (newEntry) => {
        setData([...data, { ...newEntry, id: Date.now() }]);
        setCreating(false);
    };

    const handleEdit = (updatedEntry) => {
        setData(data.map(entry => entry.id === updatedEntry.id ? updatedEntry : entry));
        setEditingEntry(null);
    };

    const showCreateForm = () => setCreating(true);
    //const showEditForm = (entry) => setEditingEntry(entry);
    const cancelEdit = () => setEditingEntry(null);
    const cancelCreate = () => setCreating(false);

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
                            <button className="btn btn-secondary" onClick={showCreateForm}>
                                <i className="material-icons">&#xE147;</i> <span>Add New Entry</span>
                            </button>
                        </div>
                    </div>
                </div>

                {creating ? (
                    <CreateData onSubmit={handleCreate} onCancel={cancelCreate} />
                ) : editingEntry ? (
                    <EditForm initialData={editingEntry} onSubmit={handleEdit} onCancel={cancelEdit} />
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

                        <TableEntry data={currentItems} filter={filter} setFilter={setFilter} formatDate={formatDate} />

                        <div className="clearfix">
                            <div className="hint-text">Showing <b>{currentItems.length}</b> out of <b>{filteredData.length}</b> entries</div>
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
