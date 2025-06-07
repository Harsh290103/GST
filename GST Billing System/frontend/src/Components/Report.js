import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const Report = () => {
  const reportData = {
    totalSales: 125000,
    gstCollected: 18750,
    pendingInvoices: 30000,
    transactions: [
      { invoiceNo: "INV-1001", customer: "ABC Pvt Ltd", amount: 5000, gst: 18 },
      { invoiceNo: "INV-1002", customer: "XYZ Ltd", amount: 12000, gst: 12 },
    ],
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center fw-bold">GST Report</h2>

      {/* Summary Cards */}
      <div className="row">
        <div className="col-md-4">
          <div className="card bg-success text-white text-center p-3">
            <h4>Total Sales</h4>
            <p className="fs-3 fw-bold">₹ {reportData.totalSales}</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-info text-white text-center p-3">
            <h4>GST Collected</h4>
            <p className="fs-3 fw-bold">₹ {reportData.gstCollected}</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-warning text-dark text-center p-3">
            <h4>Pending Invoices</h4>
            <p className="fs-3 fw-bold">₹ {reportData.pendingInvoices}</p>
          </div>
        </div>
      </div>

      {/* Transaction Table */}
      <h3 className="mt-4">Transaction Details</h3>
      <table className="table table-bordered mt-3">
        <thead className="table-dark">
          <tr>
            <th>Invoice No</th>
            <th>Customer</th>
            <th>Amount</th>
            <th>GST %</th>
          </tr>
        </thead>
        <tbody>
          {reportData.transactions.map((transaction, index) => (
            <tr key={index}>
              <td>{transaction.invoiceNo}</td>
              <td>{transaction.customer}</td>
              <td>₹ {transaction.amount}</td>
              <td>{transaction.gst}%</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Export Buttons */}
      <div className="text-center mt-3">
        <button className="btn btn-primary mx-2">Download PDF</button>
        <button className="btn btn-success mx-2">Export to Excel</button>
      </div>
    </div>
  );
};

export default Report;