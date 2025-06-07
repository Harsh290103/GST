import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// GST Modal Component (unchanged)
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
        <span style={styles.closeBtn} onClick={onClose}>
          ✖
        </span>
        <h5>Select Tax Type</h5>
        <select
          className="form-control mb-3"
          value={taxType}
          onChange={(e) => setTaxType(e.target.value)}
        >
          <option value="">Select</option>
          <option value="GST(India)">GST(India)</option>
        </select>

        <h5>Select GST Type</h5>
        <div className="form-check">
          <input
            type="radio"
            className="form-check-input"
            name="gstType"
            value="IGST"
            onChange={(e) => setGstType(e.target.value)}
            id="igst"
          />
          <label className="form-check-label" htmlFor="igst">
            IGST
          </label>
        </div>
        <div className="form-check mb-3">
          <input
            type="radio"
            className="form-check-input"
            name="gstType"
            value="CGST+SGST"
            onChange={(e) => setGstType(e.target.value)}
            id="cgstSgst"
          />
          <label className="form-check-label" htmlFor="cgstSgst">
            CGST + SGST
          </label>
        </div>

        <button className="btn btn-success" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    )
  );
};

const Invoice = () => {
  const [invoiceNo] = useState("A00002");
  const [invoiceDate, setInvoiceDate] = useState("2025-05-25");
  const [dueDate, setDueDate] = useState("2025-06-09");

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Billed By company details
  const [companyName, setCompanyName] = useState("");
  const [businessGstNo, setBusinessGstNo] = useState("");
  const [businessPan, setBusinessPan] = useState("");

  // Current logged-in user ID
  const [currentUserId, setCurrentUserId] = useState(null);

  // Billed To details
  const [businessName, setBusinessName] = useState("");
  const [billedIndustry, setBilledIndustry] = useState("");
  const [country, setCountry] = useState("");
  const [billedGstNo, setBilledGstNo] = useState("");
  const [billedPan, setBilledPan] = useState("");
  const [billedCategory, setBilledCategory] = useState("");

  // Invoice items and item fields
  const [itemList, setItemList] = useState([]);
  const [item, setItem] = useState("");
  const [gstRate, setGstRate] = useState("");
  const [quantity, setQuantity] = useState("");
  const [rate, setRate] = useState("");

  // Fetch current user ID on component mount
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await fetch("http://127.0.0.1:9000/emps/user/current", {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch current user");
        const user = await res.json();
        if (user && user.id) {
          setCurrentUserId(user.id);
        }
      } catch (err) {
        console.error("Error fetching current user:", err);
      }
    };
    fetchCurrentUser();
  }, []);

  // Fetch company data after getting current user ID
  useEffect(() => {
    if (!currentUserId) return;

    const fetchCompany = async () => {
      try {
        const res = await fetch("http://127.0.0.1:9000/emps/company", {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch company data");
        const companies = await res.json();

        // Find company matching current user
        const myCompany = companies.find(
          (comp) => comp.user_id === currentUserId
        );

        if (myCompany) {
          setCompanyName(myCompany.company_name || "");
          setBusinessGstNo(myCompany.business_gstno || "");
          setBusinessPan(myCompany.business_pan || "");
        } else {
          // No company found for user - clear fields
          setCompanyName("");
          setBusinessGstNo("");
          setBusinessPan("");
        }
      } catch (err) {
        console.error("Error fetching company data:", err);
      }
    };

    fetchCompany();
  }, [currentUserId]);

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

  return (
    <div className="container mt-4">
      <h2 className="text-center fw-bold">Invoice</h2>
      <div className="card p-4">
        <div className="row">
          <div className="col-md-6">
            <label className="form-label">Invoice Number</label>
            <input
              type="text"
              className="form-control fw-bold"
              value={invoiceNo}
              readOnly
            />
            <small className="text-muted">Last invoice: A00001 (May 8, 2025)</small>
          </div>
          <div className="col-md-3">
            <label className="form-label">Invoice Date</label>
            <input
              type="date"
              className="form-control"
              value={invoiceDate}
              onChange={(e) => setInvoiceDate(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Due Date</label>
            <input
              type="date"
              className="form-control"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
        </div>

        {/* Billed By */}
        <div className="row mt-4">
          <div className="col-md-6">
            <h5 className="fw-bold">Billed By</h5>
            <label className="form-label">Company Name</label>
            <input
              type="text"
              className="form-control"
              value={companyName}
              readOnly
            />
            <label className="form-label">GST Number</label>
            <input
              type="text"
              className="form-control"
              value={businessGstNo}
              readOnly
            />
            <label className="form-label">PAN</label>
            <input
              type="text"
              className="form-control"
              value={businessPan}
              readOnly
            />
            <button
              className="btn btn-secondary mt-3"
              onClick={() => setIsModalOpen(true)}
            >
              Add GST
            </button>
          </div>

          {/* Billed To */}
          <div className="col-md-6">
            <h5 className="fw-bold">Billed To</h5>
            <label className="form-label">Business Name</label>
            <input
              type="text"
              className="form-control"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
            />
            <label className="form-label">GST Number</label>
            <input
              type="text"
              className="form-control"
              value={billedGstNo}
              onChange={(e) => setBilledGstNo(e.target.value)}
            />
            <label className="form-label">PAN</label>
            <input
              type="text"
              className="form-control"
              value={billedPan}
              onChange={(e) => setBilledPan(e.target.value)}
            />
            <label className="form-label">Country</label>
            <select
              className="form-control"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="">Select Country</option>
              <option value="India">India</option>
              <option value="USA">USA</option>
              <option value="UK">UK</option>
            </select>
            <label className="form-label mt-2">Business Category</label>
            <select
              className="form-control"
              value={billedCategory}
              onChange={(e) => setBilledCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              <option value="IT Services">IT Services</option>
              <option value="Retail">Retail</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="Finance">Finance</option>
              <option value="Education">Education</option>
            </select>
          </div>
        </div>

        {/* Add item and item table (can add your existing code here) */}
      </div>

      <GstModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

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
    width: "300px",
  },
  closeBtn: {
    float: "right",
    fontSize: "20px",
    cursor: "pointer",
    color: "#888",
  },
};

export default Invoice;
