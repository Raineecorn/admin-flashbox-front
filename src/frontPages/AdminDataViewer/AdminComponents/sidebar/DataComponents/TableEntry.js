import React from 'react';
import PropTypes from 'prop-types';

function TableEntry({ data, formatDate }) {
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
                    <tr key={entry.id}>
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
                ))}
            </tbody>
        </table>
    );
}

// Adding PropTypes validation based on your Supabase schema
TableEntry.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired, // tracking ID
            sender: PropTypes.string, // Optional, can be empty
            receiver: PropTypes.string, // Optional
            items: PropTypes.string, // Optional
            date_ordered: PropTypes.string, // Optional date as string
            no_of_box: PropTypes.number, // Number of boxes
            box_size: PropTypes.string, // Optional, can be empty
            weight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Optional
            address: PropTypes.string, // Optional, could be null
            destination: PropTypes.string, // Optional, could be null
            date_loaded: PropTypes.string, // Optional date as string
        })
    ).isRequired,
    formatDate: PropTypes.func.isRequired, // Ensure formatDate is passed as a function
};

export default TableEntry;
