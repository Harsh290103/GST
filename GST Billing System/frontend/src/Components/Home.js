import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min'; // Important for dropdowns to work!

const HorizontalSidebar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <a className="navbar-brand fw-bold text-white" href="#">GST Billing System</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mx-auto">
          {/* Dashboard Dropdown */}
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle text-white fw-bold" href="dashbopard" id="dashboardDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Dashboard
            </a>
          </li>

          {/* Invoices Dropdown */}
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle text-white fw-bold" href="#" id="invoicesDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Invoices
            </a>
            <ul className="dropdown-menu" aria-labelledby="invoicesDropdown">
              <li><a className="dropdown-item" href="invoice">Add Invoice</a></li>
              <li><a className="dropdown-item" href="#">List Invoices</a></li>
            </ul>
          </li>

          {/* Reports Section */}
          <li className="nav-item"><a className="nav-link text-white fw-bold" href="#">Reports</a></li>

          {/* Other Navigation Items */}
          <li className="nav-item"><a className="nav-link text-white fw-bold" href="userprofile">User Profile</a></li>
          <li className="nav-item"><a className="nav-link text-white fw-bold" href="bussiness">Business Profile</a></li>

          {/* Logout Button */}
          <li className="nav-item">
            <a className="nav-link btn btn-warning text-dark fw-bold ms-3" 
            href="/login">Logout</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default HorizontalSidebar;