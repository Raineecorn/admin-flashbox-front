import React, { useState, useEffect } from 'react';
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

    useEffect(() => {
        const fetchData = async () => {
            const { data: fetchedData, error } = await supabase
                .from('trackingfbt')
                .select('*');

            if (error) {
                console.error('Error fetching data:', error);
            } else {
                setData(fetchedData);
            }
        };

        fetchData();
    }, []);

    // Filter data by 'id' as a string (displayed exactly as it is)
    const filteredData = data.filter(item => item.id.includes(filter));

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const handleCreate = async (newEntry) => {
        const { data: createdEntry, error } = await supabase
            .from('trackingfbt')
            .insert([{ ...newEntry }])
            .single();

        if (error) {
            console.error('Error creating entry:', error);
        } else {
            setData([...data, createdEntry]);
            setCreating(false);
        }
    };

    const handleEdit = async (updatedEntry) => {
        const { data: updatedData, error } = await supabase
            .from('trackingfbt')
            .update(updatedEntry)
            .eq('id', updatedEntry.id)
            .single();

        if (error) {
            console.error('Error updating entry:', error);
        } else {
            setData(data.map(entry => (entry.id === updatedData.id ? updatedData : entry)));
            setEditingEntry(null);
        }
    };

    const showCreateForm = () => setCreating(true);
    const showEditForm = (entry) => setEditingEntry(entry);
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
                                <button className="btn btn-danger" onClick={showCreateForm}>
                                    <i className="material-icons"> </i> <span>Add New Entry</span>
                                </button>
                            </div>
                        </div>
                    </div>


                    {creating ? (
                        <CreateTrackingData onSubmit={handleCreate} onCancel={cancelCreate} />
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

                            {/* Display data exactly as is */}
                            <TableEntry
                                data={currentItems}
                                filter={filter}
                                setFilter={setFilter}
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
        </div>
    );
}

export default DataViewer;
