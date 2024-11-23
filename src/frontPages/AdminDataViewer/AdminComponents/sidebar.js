import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for prop validation
import { Link } from 'react-router-dom';
import { BsPersonAdd, BsPeopleFill, BsMenuButtonWideFill } from 'react-icons/bs';
import { IoIosExit } from "react-icons/io";
import { LuFileSearch } from "react-icons/lu";
import { GrDocumentUpdate } from "react-icons/gr";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap

function Sidebar({ openSidebarToggle }) {
  const sidebarStyles = {
    backgroundColor: '#052c4c',
    height: '100%',
    transition: 'all 0.5s',
    WebkitTransition: 'all 0.5s',
    overflowY: 'auto',
    position: openSidebarToggle ? 'absolute' : 'relative',
    zIndex: openSidebarToggle ? 12 : 'auto',
  };

  const listItemStyles = {
    padding: '20px',
    fontSize: '18px',
  };

  // Removed 'listItemHoverStyles' since it was not used
  return (
    <aside id="sidebar" className={`d-flex flex-column ${openSidebarToggle ? 'sidebar-responsive' : ''}`} style={sidebarStyles}>
      <ul className="list-unstyled p-0">
        
        <li className="sidebar-list-item" style={listItemStyles}>
          <Link to="/add-customer" className="text-white d-flex align-items-center">
            <BsPersonAdd className="me-2" /> Add Customer
          </Link>
        </li>
        <li className="sidebar-list-item" style={listItemStyles}>
          <Link to="/update-tracking" className="text-white d-flex align-items-center">
            <GrDocumentUpdate className="me-2" /> Update Tracking
          </Link>
        </li>
        <li className="sidebar-list-item" style={listItemStyles}>
          <Link to="/customer-lists" className="text-white d-flex align-items-center">
            <BsPeopleFill className="me-2" /> Customers Lists
          </Link>
        </li>
        <li className="sidebar-list-item" style={listItemStyles}>
          <Link to="/update-page" className="text-white d-flex align-items-center">
            <BsMenuButtonWideFill className="me-2" /> Update Customer Data
          </Link>
        </li>
        <li className="sidebar-list-item" style={listItemStyles}>
          <Link to="/tracking-status" className="text-white d-flex align-items-center">
            <LuFileSearch className="me-2" /> Check Tracking Status
          </Link>
        </li>

        <li className="sidebar-list-item" style={listItemStyles}>
          <Link to="/login-admin" className="text-white d-flex align-items-center">
            <IoIosExit className="me-2" /> Logout
          </Link>
        </li>
      </ul>
    </aside>
  );
}

// Adding PropTypes validation
Sidebar.propTypes = {
  openSidebarToggle: PropTypes.bool.isRequired, // Prop validation for openSidebarToggle
};

export default Sidebar;
