import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = () => {
  return (
    <div className="container mt-4">
      {/* Header */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand fw-bold" href="#">GST Billing Dashboard</a>
        </div>
      </nav>

      {/* Main Dashboard */}
      <h2 className="text-center fw-bold my-4">Dashboard Overview</h2>
      <div className="row">
        <div className="col-md-4">
          <div className="card bg-success text-white text-center p-3">
            <h4>Total Sales</h4>
            <p className="fs-3 fw-bold">₹ 1,25,000</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-info text-white text-center p-3">
            <h4>GST Collected</h4>
            <p className="fs-3 fw-bold">₹ 18,750</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-warning text-dark text-center p-3">
            <h4>Pending Invoices</h4>
            <p className="fs-3 fw-bold">₹ 30,000</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <h3 className="mt-4">Quick Actions</h3>
      <div className="row">
        <div className="col-md-3">
          <button className="btn btn-primary w-100">Create Invoice</button>
        </div>
        <div className="col-md-3">
          <button className="btn btn-secondary w-100">Generate GST Report</button>
        </div>
        <div className="col-md-3">
          <button className="btn btn-danger w-100">View Transactions</button>
        </div>
        <div className="col-md-3">
          <button className="btn btn-warning w-100">Manage Customers</button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-light text-center p-3 mt-4">
        <p className="mb-0">© 2025 GST Billing System | Designed for Businesses</p>
      </footer>
    </div>
  );
};

export default Dashboard;