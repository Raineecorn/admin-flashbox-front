import React, { useState } from 'react';
import PropTypes from 'prop-types';

function TableEntry({ data, formatDate, onEdit, onDelete }) {
    const [expandedRowId, setExpandedRowId] = useState(null);

    // Default formatDate function
    formatDate = formatDate || ((dateString) => {
        return new Date(dateString).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
    });

    const toggleRow = (id) => {
        setExpandedRowId(expandedRowId === id ? null : id);
    };

    return (
        <table className="table table-striped table-hover">
            <thead className="thead-dark">
                <tr>
                    <th>#</th>
                    <th>Tracking Number (ID)</th>
                    <th>Sender</th>
                    <th>Receiver</th>
                    <th>Items</th>
                    <th>Date Ordered</th>
                    <th>No. of Boxes</th>
                    <th>Box Size</th>
                    <th>Weight</th>
                    <th>Address</th>
                    <th>Destination</th>
                    <th>Date Loaded</th>
                </tr>
            </thead>
            <tbody>
                {data.map((entry, index) => (
                    <React.Fragment key={entry.id}>
                        <tr onClick={() => toggleRow(entry.id)}>
                            <td>{index + 1}</td>
                            <td>{entry.id}</td>
                            <td>{entry.sender}</td>
                            <td>{entry.receiver}</td>
                            <td>{entry.items}</td>
                            <td>{formatDate(entry.date_ordered)}</td>
                            <td>{entry.no_of_box}</td>
                            <td>{entry.box_size}</td>
                            <td>{entry.weight}</td>
                            <td>{entry.address}</td>
                            <td>{entry.destination}</td>
                            <td>{formatDate(entry.date_loaded)}</td>
                        </tr>
                        {expandedRowId === entry.id && (
                            <tr key={`actions-${entry.id}`}>
                                <td colSpan={12}>
                                    <button className="btn btn-sm btn-primary" onClick={(e) => { e.stopPropagation(); onEdit(entry); }}>Edit</button>
                                    <button className="btn btn-sm btn-danger" onClick={(e) => { e.stopPropagation(); onDelete(entry.id); }}>Delete</button>
                                </td>
                            </tr>
                        )}
                    </React.Fragment>
                ))}
            </tbody>
        </table>
    );
}

TableEntry.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        sender: PropTypes.string,
        receiver: PropTypes.string,
        items: PropTypes.string,
        date_ordered: PropTypes.string,
        no_of_box: PropTypes.number,
        box_size: PropTypes.string,
        weight: PropTypes.string,
        address: PropTypes.string,
        destination: PropTypes.string,
        date_loaded: PropTypes.string,
    })).isRequired,
    formatDate: PropTypes.func,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default TableEntry;
