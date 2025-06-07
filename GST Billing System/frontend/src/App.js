import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Dashboard from "./Components/Dashbord";
import Home from "./Components/Home";
import Invoice from "./Components/Invoice";
import Report from "./Components/Report";
import Login from "./Components/Login";
import Register from "./Components/Registration";
import UserProfile from "./Components/UserProfile";
import BusinessForm from "./Components/bussiness";
import HomePage from "./Components/Homepage";
function App() {
  return (

    
    <Router>
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
         <Route path="/invoice" element={<Invoice />} />
          <Route path="/report" element={<Report />} />
          <Route path="/login" element={<Login />} />
           <Route path="/register" element={<Register />} />
            <Route path="/userprofile" element={<UserProfile />} />
            <Route path="/bussiness" element={<BusinessForm />} />
          <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}



export default App;