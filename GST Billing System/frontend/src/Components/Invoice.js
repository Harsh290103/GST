import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRef } from "react";
import api from "./axiosConfig"; // ✅ Use Axios instance with credentials

// GST Modal Component
const GstModal = ({ isOpen, onClose }) => {
  const [taxType, setTaxType] = useState("");
  const [gstType, setGstType] = useState("");

  const handleSubmit = () => {
    if (!gstType) {
      alert("Please select a GST type.");
      return;
    }
    alert(`Tax Type: ${taxType}\nGST Type: ${gstType}`);
    onClose();
  };

  return (
    isOpen && (
      <div style={styles.modal}>
        <span style={styles.closeBtn} onClick={onClose}>✖</span>
        <h5>Select Tax Type</h5>
        <select className="form-control mb-3" value={taxType} onChange={(e) => setTaxType(e.target.value)}>
          <option value="">Select</option>
          <option value="CGST">GST(India)</option>
        </select>

        <h5>Select GST Type</h5>
        <div className="form-check">
          <input type="radio" className="form-check-input" name="gstType" value="SGST" onChange={(e) => setGstType(e.target.value)} />
          <label className="form-check-label">SGST</label>
        </div>
        <div className="form-check mb-3">
          <input type="radio" className="form-check-input" name="gstType" value="SGST&CGST" onChange={(e) => setGstType(e.target.value)} />
          <label className="form-check-label">SGST&CGST</label>
        </div>

        <button className="btn btn-success" onClick={handleSubmit}>Submit</button>
      </div>
    )
  );
};

const Invoice = () => {
  const [invoiceNo] = useState("A00002");
  const [invoiceDate, setInvoiceDate] = useState("2025-05-25");
  const [dueDate, setDueDate] = useState("2025-06-09");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [companyName, setCompanyName] = useState("");
  const [businessGstNo, setBusinessGstNo] = useState("");
  const [businessPan, setBusinessPan] = useState("");
  const [companyId, setCompanyId] = useState(null); // store company_id for billed by

  const [businessName, setBusinessName] = useState("");
  const [billedIndustry, setBilledIndustry] = useState("");
  const [country, setCountry] = useState("");
  const [billedGstNo, setBilledGstNo] = useState("");
  const [billedPan, setBilledPan] = useState("");
  const [billedCategory, setBilledCategory] = useState("");

  const [itemList, setItemList] = useState([]);
  const [item, setItem] = useState("");
  const [gstRate, setGstRate] = useState("");
  const [quantity, setQuantity] = useState("");
  const [rate, setRate] = useState("");

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const userRes = await api.get("/emps/user/current");
        const userId = userRes.data.id;

        const companyRes = await api.get("/emps/company");
        const company = companyRes.data.find(c => c.user_id === userId);

        if (company) {
          setCompanyName(company.company_name);
          setBusinessGstNo(company.business_gstno);
          setBusinessPan(company.business_pan);
          setCompanyId(company.id); // Save company id
        } else {
          console.warn("No matching company found for user_id:", userId);
        }
      } catch (err) {
        console.error("Error fetching billed by company:", err);
      }
    };

    fetchCompanyData();
  }, []);

  const handleAddItem = () => {
    if (!item || !gstRate || !quantity || !rate) {
      alert("Please fill all item fields.");
      return;
    }

    const baseAmount = quantity * rate;
    const gstAmount = (baseAmount * gstRate) / 100;
    const totalAmount = baseAmount + gstAmount;

    const newItem = {
      item,
      gstRate,
      quantity,
      rate,
      baseAmount,
      gstAmount,
      totalAmount,
    };

    setItemList([...itemList, newItem]);
    setItem("");
    setGstRate("");
    setQuantity("");
    setRate("");
  };

  // Simple mapping for country name to country_id (adjust as per your DB)
  const countryMap = {
    India: 1,
    USA: 2,
    UK: 3,
  };

  // Simple mapping for category name to category_id (adjust as per your DB)
  const categoryMap = {
    "IT Services": 1,
    Retail: 2,
    Manufacturing: 3,
    Finance: 4,
    Education: 5,
  };

  const handleSubmitInvoice = async () => {
    if (!businessName || !billedGstNo || !billedPan || !country || !billedCategory) {
      alert("Please fill all Billed To fields.");
      return;
    }

    try {
      // POST Billed To data to /customers (adjust endpoint if needed)
      const payload = {
        Company_name: businessName,
        client_industry: billedIndustry,
        country_id: countryMap[country] || null,
        company_id: companyId, // Billed By company id
        category_id: categoryMap[billedCategory] || null,
        business_gstno: billedGstNo,
        business_pan: billedPan,
      };

      const response = await api.post("/customers", payload);
      alert("Billed To data saved successfully! ID: " + response.data.id);
    } catch (error) {
      console.error("Error saving Billed To data:", error);
      alert("Failed to save Billed To data");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center fw-bold">Invoice</h2>

      <div className="card p-4">
        <div className="row">
          <div className="col-md-6">
            <label className="form-label">Invoice Number</label>
            <input type="text" className="form-control fw-bold" value={invoiceNo} readOnly />
            <small className="text-muted">Last invoice: A00001 (May 8, 2025)</small>
          </div>
          <div className="col-md-3">
            <label className="form-label">Invoice Date</label>
            <input type="date" className="form-control" value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} />
          </div>
          <div className="col-md-3">
            <label className="form-label">Due Date</label>
            <input type="date" className="form-control" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-md-6">
            <h5 className="fw-bold">Billed By</h5>
            <label className="form-label">Company Name</label>
            <input type="text" className="form-control" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />

            <label className="form-label">GST Number</label>
            <input type="text" className="form-control" value={businessGstNo} onChange={(e) => setBusinessGstNo(e.target.value)} />

            <label className="form-label">PAN</label>
            <input type="text" className="form-control" value={businessPan} onChange={(e) => setBusinessPan(e.target.value)} />

            <div className="mt-3">
              <button className="btn btn-secondary" onClick={() => setIsModalOpen(true)}>Add GST</button>
            </div>
          </div>

          <div className="col-md-6">
            <h5 className="fw-bold">Billed To</h5>
            <label className="form-label">Business Name</label>
            <input type="text" className="form-control" value={businessName} onChange={(e) => setBusinessName(e.target.value)} />

            <label className="form-label">Industry</label>
            <input type="text" className="form-control" value={billedIndustry} onChange={(e) => setBilledIndustry(e.target.value)} />

            <label className="form-label">GST Number</label>
            <input type="text" className="form-control" value={billedGstNo} onChange={(e) => setBilledGstNo(e.target.value)} />

            <label className="form-label">PAN</label>
            <input type="text" className="form-control" value={billedPan} onChange={(e) => setBilledPan(e.target.value)} />

            <label className="form-label">Country</label>
            <select className="form-control" value={country} onChange={(e) => setCountry(e.target.value)}>
              <option value="">Select Country</option>
              <option value="India">India</option>
              <option value="USA">USA</option>
              <option value="UK">UK</option>
            </select>

            <label className="form-label mt-2">Business Category</label>
            <select className="form-control" value={billedCategory} onChange={(e) => setBilledCategory(e.target.value)}>
              <option value="">Select Category</option>
              <option value="IT Services">IT Services</option>
              <option value="Retail">Retail</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="Finance">Finance</option>
              <option value="Education">Education</option>
            </select>
          </div>
        </div>

        {/* Add Invoice Item Section */}
        <div className="mt-4">
          <h5 className="fw-bold">Add Invoice Item</h5>
          <div className="row align-items-end">
            <div className="col-md-3">
              <label className="form-label">Item</label>
              <input type="text" className="form-control" placeholder="Item Name" value={item} onChange={(e) => setItem(e.target.value)} />
            </div>
            <div className="col-md-2">
              <label className="form-label">GST Rate (%)</label>
              <input type="number" className="form-control" placeholder="e.g. 18" value={gstRate} onChange={(e) => setGstRate(e.target.value)} />
            </div>
            <div className="col-md-2">
              <label className="form-label">Quantity</label>
              <input type="number" className="form-control" placeholder="e.g. 5" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
            </div>
            <div className="col-md-2">
              <label className="form-label">Rate</label>
              <input type="number" className="form-control" placeholder="e.g. 1000" value={rate} onChange={(e) => setRate(e.target.value)} />
            </div>
            <div className="col-md-2">
              <label className="form-label">Amount</label>
              <input type="text" className="form-control" value={`₹ ${quantity && rate ? quantity * rate : 0}`} disabled />
            </div>
            <div className="col-md-1">
              <button className="btn btn-primary mt-2" onClick={handleAddItem}>Add</button>
            </div>
          </div>
        </div>

        {/* Invoice Items Table */}
        <div className="invoice-container mt-4">
          <h5 className="fw-bold mb-3">Invoice Items</h5>
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>Item Name</th>
                <th>GST Rate (%)</th>
                <th>Quantity</th>
                <th>Rate</th>
                <th>Amount</th>
                <th>GST Amount</th>
                <th>Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {itemList.map((it, index) => (
                <tr key={index}>
                  <td>{it.item}</td>
                  <td>{it.gstRate}%</td>
                  <td>{it.quantity}</td>
                  <td>₹{it.rate}</td>
                  <td>₹{it.baseAmount.toFixed(2)}</td>
                  <td>₹{it.gstAmount.toFixed(2)}</td>
                  <td>₹{it.totalAmount.toFixed(2)}</td>
                </tr>
              ))}

              <tr className="fw-bold">
                <td colSpan="6" className="text-end">Total Amount</td>
                <td>₹{itemList.reduce((sum, item) => sum + item.baseAmount, 0).toFixed(2)}</td>
              </tr>
              <tr className="fw-bold">
                <td colSpan="6" className="text-end">Total GST</td>
                <td>₹{itemList.reduce((sum, item) => sum + item.gstAmount, 0).toFixed(2)}</td>
              </tr>
              <tr className="fw-bold table-success">
                <td colSpan="6" className="text-end">Grand Total</td>
                <td>₹{itemList.reduce((sum, item) => sum + item.totalAmount, 0).toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Submit Button to save Billed To */}
        <div className="mt-4 text-center">
          <button className="btn btn-success btn-lg" onClick={handleSubmitInvoice}>
            Submit Invoice (Save Billed To)
          </button>
        </div>
      </div>

      <GstModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

// Modal styles
const styles = {
  modal: {
    position: "fixed",
    zIndex: 1000,
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    background: "#fff",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.3)",
    width: "300px"
  },
  closeBtn: {
    float: "right",
    fontSize: "20px",
    cursor: "pointer",
    color: "#888",
  },
};

export default Invoice;
