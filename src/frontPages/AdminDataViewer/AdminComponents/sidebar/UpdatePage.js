import React, { useState, useEffect } from 'react';
import Pagination from './pagination/pagination.js'; // Ensure this is the correct path
import CreateTrackingData from './CreateTrackingData.js';
import EditForm from './DataComponents/EditForm.js';
import TableEntry from './DataComponents/TableEntry.js';
import { supabase } from '../../../../components/supabase/config.js';
import 'bootstrap/dist/css/bootstrap.min.css';

function DataViewer() {
    const [filter, setFilter] = useState('');
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); // Define how many items you want per page
    const [editingEntry, setEditingEntry] = useState(null);
    const [creating, setCreating] = useState(false);

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

    const handleCreate = async (newEntry) => {
        const { data: createdEntry, error } = await supabase.from('trackingfbt').insert([newEntry]).single();
        if (error) {
            console.error('Error creating entry:', error);
        } else {
            setData([...data, createdEntry]);
            setCreating(false);
        }
    };

    const handleEdit = async (updatedEntry) => {
        const { data: updatedData, error } = await supabase.from('trackingfbt').update(updatedEntry).eq('id', updatedEntry.id).single();
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

    const filteredData = data.filter(item => item.id.includes(filter));
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

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
                            <TableEntry
                                data={currentItems}
                                onEdit={showEditForm}
                            />
                            <Pagination
                                currentPage={currentPage}
                                itemsPerPage={itemsPerPage}
                                totalItems={filteredData.length}
                                paginate={setCurrentPage}
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default DataViewer;
