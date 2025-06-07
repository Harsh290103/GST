const mysql = require('mysql2');
const express = require('express');
const app = express.Router();

// Database connection details
const dbConnectionDetails = {  
  host: 'localhost',
  port: 3306, 
  user: 'root',
  password: 'Harsh@2913',
  database: 'gst_bill_system'
};

// Create connection and connect once
const connection = mysql.createConnection(dbConnectionDetails);

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

//------------------------User Table------------------------------------------------->
app.get('/user/current', (req, res) => {
  console.log("Session in /user/current:", req.session);  // <-- debug here

  if (!req.session.userId) {
    return res.status(401).json({ error: "Not logged in" });
  }

  const query = "SELECT id, user_email, first_name, last_name, mobile_no, last_login FROM user WHERE id = ?";

  connection.query(query, [req.session.userId], (error, results) => {
    if (error) {
      console.error("Database query error:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(results[0]);
  });
});


// GET all users
app.get("/user", (request, response) => {
  connection.query("SELECT * FROM user", (error, result) => {
    if (!error) {
      response.json(result);
    } else {
      response.status(500).json(error);
    }
  });
});

// POST new user
app.post("/user", (request, response) => {
  const now = new Date();
  const formattedDate = now.toISOString().slice(0, 19).replace('T', ' ');
  
  const queryText = `INSERT INTO user (
    user_email,
    password,
    last_login,
    first_name,
    last_name,
    mobile_no
  ) VALUES (?, ?, ?, ?, ?, ?)`;

  const values = [
    request.body.user_email,
    request.body.password,
    formattedDate,
    request.body.first_name,
    request.body.last_name,
    request.body.mobile_no
  ];

  connection.query(queryText, values, (error, result) => {
    if (!error) {
      response.json({ message: "User added successfully", userId: result.insertId });
    } else {
      response.status(500).json(error);
    }
  });
});

// PUT update user by id
app.put("/user/:id", (request, response) => {
  const userId = request.params.id;

  const queryText = `UPDATE user SET 
    user_email = ?, 
    password = ?, 
    last_login = ?, 
    first_name = ?, 
    last_name = ?, 
    mobile_no = ? 
  WHERE id = ?`;

  const values = [
    request.body.user_email,
    request.body.password,
    request.body.last_login,
    request.body.first_name,
    request.body.last_name,
    request.body.mobile_no,
    userId
  ];

  connection.query(queryText, values, (error, result) => {
    if (!error) {
      response.json({ message: "User updated successfully", affectedRows: result.affectedRows });
    } else {
      response.status(500).json(error);
    }
  });
});

// DELETE user by id
app.delete("/user/:id", (request, response) => {
  const userId = request.params.id;

  connection.query("DELETE FROM user WHERE id = ?", [userId], (error, result) => {
    if (!error) {
      if (result.affectedRows > 0) {
        response.json({ message: "User deleted successfully", affectedRows: result.affectedRows });
      } else {
        response.json({ message: "User not found or already deleted" });
      }
    } else {
      response.status(500).json(error);
    }
  });
});

//------------------------Company Table------------------------------------------------->
// GET companies by user_id (for logged-in user)
app.get("/company/user/:user_id", (req, res) => {
  const userId = req.params.user_id;

  const query = "SELECT * FROM company WHERE user_id = ?";
  connection.query(query, [userId], (error, result) => {
    if (!error) {
      res.json(result);
    } else {
      res.status(500).json(error);
    }
  });
});

// GET all companies
app.get("/company", (request, response) => {
  connection.query("SELECT * FROM company", (error, result) => {
    if (!error) {
      response.json(result);
    } else {
      response.status(500).json(error);
    }
  });
});

// POST new company
app.post("/company", (request, response) => {
  const queryText = `INSERT INTO company (
    company_name,
    country_id,
    company_address,
    business_gstno,
    business_pan,
    user_id
  ) VALUES (?, ?, ?, ?, ?, ?)`;

  const values = [
    request.body.company_name,
    request.body.country_id,
    request.body.company_address,
    request.body.business_gstno,
    request.body.business_pan,
    request.body.user_id
  ];

  connection.query(queryText, values, (error, result) => {
    if (!error) {
      response.json({ message: "Company added successfully", companyId: result.insertId });
    } else {
      response.status(500).json(error);
    }
  });
});

// PUT update company by id
app.put("/company/:id", (request, response) => {
  const companyId = request.params.id;

  const queryText = `UPDATE company SET 
    company_name = ?, 
    country_id = ?, 
    company_address = ?, 
    business_gstno = ?, 
    business_pan = ?, 
    user_id = ? 
  WHERE id = ?`;

  const values = [
    request.body.company_name,
    request.body.country_id,
    request.body.company_address,
    request.body.business_gstno,
    request.body.business_pan,
    request.body.user_id,
    companyId
  ];

  connection.query(queryText, values, (error, result) => {
    if (!error) {
      if (result.affectedRows > 0) {
        response.json({ message: "Company updated successfully", affectedRows: result.affectedRows });
      } else {
        response.json({ message: "Company not found or no changes made" });
      }
    } else {
      response.status(500).json(error);
    }
  });
});

// DELETE company by id
app.delete("/company/:id", (request, response) => {
  const companyId = request.params.id;

  connection.query("DELETE FROM company WHERE id = ?", [companyId], (error, result) => {
    if (!error) {
      if (result.affectedRows > 0) {
        response.json({ message: "Company deleted successfully", affectedRows: result.affectedRows });
      } else {
        response.json({ message: "Company not found or already deleted" });
      }
    } else {
      response.status(500).json(error);
    }
  });
});

//------------------------Country Table------------------------------------------------->

// GET all countries
app.get("/country", (request, response) => {
  connection.query("SELECT * FROM country", (error, result) => {
    if (!error) {
      response.json(result);
    } else {
      response.status(500).json(error);
    }
  });
});

// POST new country
app.post("/country", (request, response) => {
  const queryText = `INSERT INTO country (country_name) VALUES (?)`;

  connection.query(queryText, [request.body.country_name], (error, result) => {
    if (!error) {
      response.json({ message: "Country added successfully", countryId: result.insertId });
    } else {
      response.status(500).json(error);
    }
  });
});

// PUT update country by id
app.put("/country/:id", (request, response) => {
  const countryId = request.params.id;
  const queryText = `UPDATE country SET country_name = ? WHERE id = ?`;

  connection.query(queryText, [request.body.country_name, countryId], (error, result) => {
    if (!error) {
      if (result.affectedRows > 0) {
        response.json({ message: "Country updated successfully", affectedRows: result.affectedRows });
      } else {
        response.json({ message: "Country not found or no changes made" });
      }
    } else {
      response.status(500).json(error);
    }
  });
});

// DELETE country by id
app.delete("/country/:id", (request, response) => {
  const countryId = request.params.id;

  connection.query("DELETE FROM country WHERE id = ?", [countryId], (error, result) => {
    if (!error) {
      if (result.affectedRows > 0) {
        response.json({ message: "Country deleted successfully", affectedRows: result.affectedRows });
      } else {
        response.json({ message: "Country not found or already deleted" });
      }
    } else {
      response.status(500).json(error);
    }
  });
});

module.exports = app;


//------------------------Invoices Table------------------------------------------------->
// Get the next auto-generated invoice number (optional - used in frontend preview)
app.get("/invoices/next-invoice-number", (req, res) => {
  const query = `SELECT invoice_no FROM invoices ORDER BY id DESC LIMIT 1;`;

  connection.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }

    let nextInvoiceNo = "A00001";

    if (results.length > 0) {
      const lastInvoice = results[0].invoice_no;
      const numericPart = parseInt(lastInvoice.substring(1), 10);
      const padded = (numericPart + 1).toString().padStart(5, '0');
      nextInvoiceNo = `A${padded}`;
    }

    return res.json({ nextInvoiceNo });
  });
});

// Get all invoices
app.get("/invoices", (request, response) => {
  connection.query("SELECT * FROM invoices", (error, result) => {
    if (!error) {
      response.json(result);
    } else {
      response.status(500).json(error);
    }
  });
});

// Add invoice (auto-generate and store invoice_no)
app.post("/invoices", (request, response) => {
  const fetchLastQuery = `
    SELECT invoice_no FROM invoices ORDER BY id DESC LIMIT 1;
  `;

  connection.query(fetchLastQuery, (err, results) => {
    if (err) {
      return response.status(500).json({ error: "Failed to fetch last invoice" });
    }

    let nextInvoiceNo = "A00001";
    if (results.length > 0) {
      const lastInvoice = results[0].invoice_no;
      const numericPart = parseInt(lastInvoice.substring(1), 10);
      const nextNumericPart = numericPart + 1;
      const padded = nextNumericPart.toString().padStart(5, '0');
      nextInvoiceNo = `A${padded}`;
    }

    const insertQuery = `
      INSERT INTO invoices (invoice_no, invoice_date, due_date, company_id)
      VALUES (?, ?, ?, ?)
    `;

    const values = [
      nextInvoiceNo,
      request.body.invoice_date,
      request.body.due_date,
      request.body.company_id
    ];

    connection.query(insertQuery, values, (insertErr, result) => {
      if (!insertErr) {
        response.json({
          message: "Invoice added successfully",
          invoiceId: result.insertId,
          invoice_no: nextInvoiceNo
        });
      } else {
        response.status(500).json({ error: "Failed to insert invoice", details: insertErr });
      }
    });
  });
});

// Update invoice
app.put("/invoices/:id", (request, response) => {
  const invoiceId = request.params.id;
  const queryText = `
    UPDATE invoices
    SET invoice_no = ?, invoice_date = ?, due_date = ?, company_id = ?
    WHERE id = ?
  `;

  const values = [
    request.body.invoice_no,
    request.body.invoice_date,
    request.body.due_date,
    request.body.company_id,
    invoiceId
  ];

  connection.query(queryText, values, (error, result) => {
    if (!error) {
      if (result.affectedRows > 0) {
        response.json({ message: "Invoice updated successfully", affectedRows: result.affectedRows });
      } else {
        response.status(404).json({ message: "Invoice not found or no changes made" });
      }
    } else {
      response.status(500).json(error);
    }
  });
});

// Delete invoice
app.delete("/invoices/:id", (request, response) => {
  const invoiceId = request.params.id;
  connection.query("DELETE FROM invoices WHERE id = ?", [invoiceId], (error, result) => {
    if (!error) {
      if (result.affectedRows > 0) {
        response.json({ message: "Invoice deleted successfully", affectedRows: result.affectedRows });
      } else {
        response.status(404).json({ message: "Invoice not found or already deleted" });
      }
    } else {
      response.status(500).json(error);
    }
  });
});


//------------------------Customer Table------------------------------------------------->

//GET API for customer table
app.get("/customers", (request, response) => {
    connection.query("SELECT * FROM customer", (error, result) => {
        if (!error) {
            response.json(result); // Returning the customer data as JSON
        } else {
            response.status(500).json(error); // Sending the error message
        }
    });
});

//POST API for customer table
app.post("/customers", (request, response) => {
    const queryText = `INSERT INTO customer (company_name, client_industry, country_id, company_id, category_id, business_gstno, business_pan) 
                       VALUES (?, ?, ?, ?, ?, ?, ?)`;

    const values = [
        request.body.company_name,
        request.body.client_industry,
        request.body.country_id,
        request.body.company_id,
        request.body.category_id,
        request.body.business_gstno,
        request.body.business_pan
    ];

    connection.query(queryText, values, (error, result) => {
        if (!error) {
            response.json({ message: "Customer added successfully", customerId: result.insertId });
        } else {
            response.status(500).json(error);
        }
    });
});

//PUT API for customer table
app.put("/customers/:id", (request, response) => {
    const customerId = request.params.id;
    const queryText = `UPDATE customer SET 
        company_name = ?, 
        client_industry = ?, 
        country_id = ?, 
        company_id = ?, 
        category_id = ?, 
        business_gstno = ?, 
        business_pan = ? 
    WHERE id = ?`;

    const values = [
        request.body.company_name,
        request.body.client_industry,
        request.body.country_id,
        request.body.company_id,
        request.body.category_id,
        request.body.business_gstno,
        request.body.business_pan,
        customerId
    ];

    connection.query(queryText, values, (error, result) => {
        if (!error) {
            if (result.affectedRows > 0) {
                response.json({ message: "Customer updated successfully", affectedRows: result.affectedRows });
            } else {
                response.status(404).json({ message: "Customer not found or no changes made" });
            }
        } else {
            response.status(500).json(error);
        }
    });
});

//DELETE API for customer table
app.delete("/customers/:id", (request, response) => {
    const customerId = request.params.id;

    connection.query("DELETE FROM customer WHERE id = ?", [customerId], (error, result) => {
        if (!error) {
            if (result.affectedRows > 0) {
                response.json({ message: "Customer deleted successfully", affectedRows: result.affectedRows });
            } else {
                response.status(404).json({ message: "Customer not found or already deleted" });
            }
        } else {
            response.status(500).json(error);
        }
    });
});
//------------------------ConfigureTax Table------------------------------------------------->

//GET API for configure_tax table
app.get("/configure_tax", (request, response) => {
    connection.query("SELECT * FROM configure_tax", (error, result) => {
        if (!error) {
            response.json(result);
        } else {
            response.status(500).json(error);
        }
    });
});

//POST API for ConfigureTax table
app.post("/configure_tax", (request, response) => {
    const queryText = `INSERT INTO configure_tax (category_id, invoice_id, select_tax_type, gst_type) VALUES (?, ?, ?, ?)`;

    const values = [
        request.body.category_id,
        request.body.invoice_id,
        request.body.select_tax_type,
        request.body.gst_type
    ];

    connection.query(queryText, values, (error, result) => {
        if (!error) {
            response.status(201).json({ message: "Tax configuration added successfully", taxId: result.insertId });
        } else {
            response.status(500).json(error);
        }
    });
});

//PUT API for ConfigureTax table
app.put("/configure_tax/:id", (request, response) => {
    const taxId = request.params.id;
    const queryText = `UPDATE configure_tax SET 
        category_id = ?, 
        invoice_id = ?, 
        select_tax_type = ?, 
        gst_type = ? 
    WHERE id = ?`;

    const values = [
        request.body.category_id,
        request.body.invoice_id,
        request.body.select_tax_type,
        request.body.gst_type,
        taxId
    ];

    connection.query(queryText, values, (error, result) => {
        if (!error) {
            if (result.affectedRows > 0) {
                response.json({ message: "Tax configuration updated successfully", affectedRows: result.affectedRows });
            } else {
                response.status(404).json({ message: "Tax configuration not found or no changes made" });
            }
        } else {
            response.status(500).json(error);
        }
    });
});

//DELETE API for ConfigureTax table
app.delete("/configure_tax/:id", (request, response) => {
    const taxId = request.params.id;

    connection.query("DELETE FROM configure_tax WHERE id = ?", [taxId], (error, result) => {
        if (!error) {
            if (result.affectedRows > 0) {
                response.json({ message: "Tax configuration deleted successfully", affectedRows: result.affectedRows });
            } else {
                response.status(404).json({ message: "Tax configuration not found or already deleted" });
            }
        } else {
            response.status(500).json(error);
        }
    });
});

//------------------------Invoice Product Table------------------------------------------------->

//GET API for Invoice Product
app.get("/invoice_product", (request, response) => {
    connection.query("SELECT * FROM invoice_product", (error, result) => {
        if (!error) {
            response.json(result);
        } else {
            response.status(500).json(error);
        }
    });
});

//POST API for Invoice Product
app.post("/invoice_product", (request, response) => {
    const { invoice_id, category_id, product_name, quantity, product_rate, amount, total } = request.body;

    const query = `
        INSERT INTO invoice_product (invoice_id, category_id, product_name, quantity, product_rate, amount, total) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    connection.query(query, [invoice_id, category_id, product_name, quantity, product_rate, amount, total], (error, result) => {
        if (!error) {
            response.status(201).json({ message: "Invoice product added successfully", productId: result.insertId });
        } else {
            response.status(500).json({ error: error.message });
        }
    });
});

//PUT API for Invoice Product
app.put("/invoice_product/:id", (request, response) => {
    const { id } = request.params;
    const { invoice_id, category_id, product_name, quantity, product_rate, amount, total } = request.body;

    const query = `
        UPDATE invoice_product 
        SET invoice_id = ?, category_id = ?, product_name = ?, quantity = ?, product_rate = ?, amount = ?, total = ? 
        WHERE id = ?
    `;

    connection.query(query, [invoice_id, category_id, product_name, quantity, product_rate, amount, total, id], (error, result) => {
        if (!error) {
            if (result.affectedRows === 0) {
                response.status(404).json({ message: "Invoice product not found" });
            } else {
                response.json({ message: "Invoice product updated successfully" });
            }
        } else {
            response.status(500).json({ error: error.message });
        }
    });
});

//DELETE API for Invoice Product
app.delete("/invoice_product/:id", (request, response) => {
    const { id } = request.params;
    const query = "DELETE FROM invoice_product WHERE id = ?";

    connection.query(query, [id], (error, result) => {
        if (!error) {
            if (result.affectedRows === 0) {
                response.status(404).json({ message: "Invoice product not found" });
            } else {
                response.json({ message: "Invoice product deleted successfully" });
            }
        } else {
            response.status(500).json({ error: error.message });
        }
    });
});

//------------------------category Product Table------------------------------------------------->

// API for GET Category table
app.get("/category", (request, response) => {
    const query = "SELECT * FROM category";
    connection.query(query, (error, result) => {
        if (error) {
            response.status(500).json({ error: error.message });
        } else {
            response.json(result);
        }
    });
});

// API for POST Category table
app.post("/category", (request, response) => {
    const { category_name, gst_value } = request.body;
    const query = "INSERT INTO category (category_name, gst_value) VALUES (?, ?)";
    connection.query(query, [category_name, gst_value], (error, result) => {
        if (error) {
            response.status(500).json({ error: error.message });
        } else {
            response.status(201).json({ message: "Category added successfully", categoryId: result.insertId });
        }
    });
});

// API for PUT Category table
app.put("/category/:id", (request, response) => {
    const { id } = request.params;
    const { category_name, gst_value } = request.body;
    const query = "UPDATE category SET category_name = ?, gst_value = ? WHERE id = ?";
    connection.query(query, [category_name, gst_value, id], (error, result) => {
        if (error) {
            response.status(500).json({ error: error.message });
        } else if (result.affectedRows === 0) {
            response.status(404).json({ message: "Category not found" });
        } else {
            response.json({ message: "Category updated successfully" });
        }
    });
});

// API for DELETE Category table
app.delete("/category/:id", (request, response) => {
    const { id } = request.params;
    const query = "DELETE FROM category WHERE id = ?";
    connection.query(query, [id], (error, result) => {
        if (error) {
            response.status(500).json({ error: error.message });
        } else if (result.affectedRows === 0) {
            response.status(404).json({ message: "Category not found" });
        } else {
            response.json({ message: "Category deleted successfully" });
        }
    });
});

//-----------------LOGIN Table---------------------------------->
// POST /emps/login - Login user and create session
// Assuming you have express, mysql connection, and express-session already set up

app.post('/login', (req, res) => {
  const { user_email, password } = req.body;

  if (!user_email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const query = "SELECT * FROM user WHERE user_email = ?";

  connection.query(query, [user_email], (error, results) => {
    if (error) {
      console.error("Database query error:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const user = results[0];

    // Simple password check (replace with bcrypt in production)
    if (password !== user.password) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Save user ID in session
    req.session.userId = user.id;

    console.log("Session after login:", req.session); // <-- debug here

    // Update last_login timestamp
    const now = new Date();
    connection.query('UPDATE user SET last_login = ? WHERE id = ?', [now, user.id], (err) => {
      if (err) console.error('Failed to update last_login:', err);
    });

    res.json({ message: "Login successful", userId: user.id });
  });
});


//API For POST LOGIN  table
// app.post("/login", (req, res) => {

//     connection.connect();
//   const { Email_id, password } = req.body;

//   if (!Email_id || !password) {
//     return res.status(400).json({ error: "Email and password are required" });
//   }

//   const query = "INSERT INTO Login (Email_id, password) VALUES (?, ?)";

//   connection.query(query, [Email_id, password], (error, result) => {
//     if (error) return res.status(500).json({ error: "Database error" });
    
//     res.status(201).json({ message: "User registered successfully!", userId: result.insertId });
//   });
//});



// app.put("/:No",(request, response)=>
// {
//     connection.connect();

//     var queryText = `update Emp set Name = '${request.body.name}', 
//                                     Address = '${request.body.address}' 
//                                     where No = ${request.params.No};`;

//     console.log("query generated is ");
//     console.log(queryText);
    
//     connection.query(queryText,(error, result)=>
//     {
//        // console.log(result);
//         if(error==null)
//         {
//              response.write(JSON.stringify(result));
//         }
//         else
//         {
//              response.write(JSON.stringify(error));
//         }
//         connection.end();
//         response.end();
//     });
// });

// app.delete("/:No",(request, response)=>
// {
//     connection.connect();

//     var queryText = `delete from Emp where No = ${request.params.No};`;

//     console.log("query generated is ");
//     console.log(queryText);
    
//     connection.query(queryText,(error, result)=>
//     {
//        // console.log(result);
//         if(error==null)
//         {
//              response.write(JSON.stringify(result));
//         }
//         else
//         {
//              response.write(JSON.stringify(error));
//         }
//         connection.end();
//         response.end();
//     });
//});

module.exports = app;