import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for prop validation

function TableEntry({ data, formatDate }) {
    return (
        <table className="table table-striped table-hover">
            <thead className="thead-dark">
                <tr>
                    <th>#</th>
                    <th>Sender</th>
                    <th>Receiver</th>
                    <th>Items</th>
                    <th>Date Ordered</th>
                    <th>No. of Boxes</th>
                    <th>Box Size</th>
                    <th>Weight</th>
                    <th>Status</th>
                    <th>Date Loaded</th>
                </tr>
            </thead>
            <tbody>
                {data.map((entry, index) => (
                    <tr key={entry.id}>
                        <td>{index + 1}</td>
                        <td>{entry.sender}</td>
                        <td>{entry.receiver}</td>
                        <td>{entry.items}</td>
                        <td>{formatDate(entry.date_ordered)}</td>
                        <td>{entry.no_of_boxes}</td>
                        <td>{entry.box_size}</td>
                        <td>{entry.weight}</td>
                        <td>{entry.TrackingStatus}</td>
                        <td>{formatDate(entry.date_loaded)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

// Adding PropTypes validation
TableEntry.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
            sender: PropTypes.string.isRequired,
            receiver: PropTypes.string.isRequired,
            items: PropTypes.string.isRequired,
            date_ordered: PropTypes.string.isRequired,
            no_of_boxes: PropTypes.number.isRequired,
            box_size: PropTypes.string.isRequired,
            weight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
            TrackingStatus: PropTypes.string.isRequired,
            date_loaded: PropTypes.string.isRequired,
        })
    ).isRequired,
    formatDate: PropTypes.func.isRequired, // Ensure formatDate is a function and is required
};

export default TableEntry;
