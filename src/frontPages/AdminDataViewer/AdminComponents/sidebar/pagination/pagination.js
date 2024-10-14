import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
    const pageNumbers = [];
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    const handleClick = (number, e) => {
        e.preventDefault(); // Prevent the default anchor link behavior
        if (number !== currentPage) { // Only paginate if it's not the current page
            paginate(number);  // Call the paginate function passed from the parent component
        }
    };

    const paginationStyle = {
        display: 'flex',
        listStyle: 'none',
        justifyContent: 'center',
        padding: 0,
        marginTop: '20px'
    };

    const linkStyle = {
        color: 'white',
        float: 'left',
        padding: '8px 16px',
        textDecoration: 'none',
        border: '1px solid #ddd',
        margin: '0 2px',
        transition: 'background-color 0.3s ease',
    };

    const activeLinkStyle = {
        backgroundColor: '#007bff',
        color: 'white',
        borderColor: '#007bff'
    };

    const disabledLinkStyle = {
        color: '#ccc',
        pointerEvents: 'none',
        borderColor: '#ddd'
    };

    const arrowStyle = {
        verticalAlign: 'middle',
        fontSize: '1.2rem'
    };

    return (
        <nav>
            <ul className="text-white" style={paginationStyle}>
                {/* Previous Button */}
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <a
                        href="#"
                        onClick={(e) => currentPage > 1 && handleClick(currentPage - 1, e)}
                        className='page-link'
                        style={currentPage === 1 ? { ...linkStyle, ...disabledLinkStyle } : linkStyle}
                    >
                        <MdKeyboardDoubleArrowLeft style={arrowStyle} />
                    </a>
                </li>

                {/* Page Numbers */}
                {pageNumbers.map(number => (
                    <li key={number} className={`page-item text-white ${number === currentPage ? 'active' : ''}`}>
                        <a
                            onClick={(e) => handleClick(number, e)}
                            href="#"
                            className='page-link'
                            style={number === currentPage ? { ...linkStyle, ...activeLinkStyle } : linkStyle}
                        >
                            {number}
                        </a>
                    </li>
                ))}

                {/* Next Button */}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <a
                        href="#"
                        onClick={(e) => currentPage < totalPages && handleClick(currentPage + 1, e)}
                        className='page-link'
                        style={currentPage === totalPages ? { ...linkStyle, ...disabledLinkStyle } : linkStyle}
                    >
                        <MdKeyboardDoubleArrowRight style={arrowStyle} />
                    </a>
                </li>
            </ul>
        </nav>
    );
};

// Add PropTypes validation
Pagination.propTypes = {
    itemsPerPage: PropTypes.number.isRequired,
    totalItems: PropTypes.number.isRequired,
    paginate: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired
};

export default Pagination;
