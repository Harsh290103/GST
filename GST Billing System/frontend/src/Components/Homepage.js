import React from "react";
import { useNavigate } from "react-router-dom";

const features = [
  { icon: "🧾", title: "GST Billing Software", description: "Create GST invoices easily and efficiently." },
  { icon: "🖥️", title: "Desktop App", description: "Access your billing data on desktop device, anytime." },
  { icon: "⚡", title: "Fast & Secure", description: "Quick processing with guaranteed data security." },
  { icon: "📊", title: "Informative Reports", description: "Good and Quick Reports of user, company and invoice data." },
];

const testimonials = [
  { name: "Dnyaneshwar Wanmare", feedback: "Gst Billing System made billing so easy and fast! Highly recommended for small businesses." },
  { name: "Vrushali Deshmukh", feedback: "The billing app syncs perfectly with desktop. Love the seamless experience." },
  { name: "Harsh Gaikwad", feedback: "Very user-friendly app. Easy to use and has all the features I need." },
];

function HomePage() {
    const navigate = useNavigate();
  return (
    <div style={{
      fontFamily: "'Open Sans', Arial, sans-serif",
      color: "#333",
      lineHeight: 1.6,
      margin: 0,
      padding: 0,
    }}>
      {/* HEADER */}
      <header style={{
        backgroundColor: "#005bb5", 
        padding: "15px 40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 9999,
        boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
      }}>
        <div style={{
          fontWeight: 700,
          fontSize: 24,
          color: "white",
          cursor: "pointer",
          userSelect: "none",
        }}>
          GST Billing System
        </div>
        <nav>
          {["Features", "Testimonials", "Contact"].map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              style={{
                color: "white",
                marginLeft: 30,
                fontWeight: 600,
                fontSize: 15,
                textDecoration: "none",
                transition: "color 0.3s",
              }}
              onMouseOver={e => e.target.style.color = "#ffa500"}
              onMouseOut={e => e.target.style.color = "white"}
            >
              {link}
            </a>
          ))}
        <button
  className="btn fw-medium"
  onClick={() => navigate("/login")}
  style={{
    backgroundColor: "#e59400",
    border: "none",
    padding: "10px 18px",  // slightly smaller
    fontSize: "16px",      // slightly smaller
    borderRadius: "15px",
    color: "#fff",
    boxShadow: "0 4px 10px rgba(233, 148, 0, 0.6)",
    marginLeft: "40px",
    textDecoration: "none",
    transition: "background-color 0.3s ease"
  }}
  onMouseEnter={e => e.target.style.backgroundColor = "#c97f00"}
  onMouseLeave={e => e.target.style.backgroundColor = "#e59400"}
>
  Start your Billing
</button>

        </nav>
      </header>

      {/* HERO SECTION */}
      <section style={{
        backgroundColor: "#d9e6f2",  
        padding: "100px 20px 80px",
        textAlign: "center",
        maxWidth: 1140,
        margin: "0 auto",
        userSelect: "none",
      }}>
        <h1 style={{
          fontSize: 48,
          fontWeight: 700,
          marginBottom: 20,
          color: "#005bb5",
          letterSpacing: "1.5px",
        }}>
          Best GST Billing Software 2025
        </h1>
        <p style={{
          fontSize: 20,
          maxWidth: 680,
          margin: "0 auto 40px",
          color: "#333",
        }}>
          Simplify your business billing with fast, easy, and GST-invoicing software!
        </p>
      <button
  className="btn fw-semibold"
  onClick={() => navigate("/login")}
  style={{
    backgroundColor: "#005bb5",
    color: "#fff",
    fontWeight: 600,
    padding: "10px 26px",  // reduced padding
    border: "none",
    borderRadius: 20,
    fontSize: "16px",      // reduced font size
    cursor: "pointer",
    boxShadow: "0 4px 10px rgba(0,91,181,0.5)",
    transition: "background-color 0.3s ease",
  }}
  onMouseEnter={e => e.target.style.backgroundColor = "#004499"}
  onMouseLeave={e => e.target.style.backgroundColor = "#005bb5"}
>
  Start your Billing
</button>

      </section>

      {/* FEATURES SECTION */}
      <section id="features" style={{
        maxWidth: 1140,
        margin: "auto",
        padding: "40px 20px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
        gap: 40,
        userSelect: "none",
      }}>
        {features.map(({ icon, title, description }) => (
          <div key={title} style={{
            backgroundColor: "white",
            padding: 30,
            boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
            borderRadius: 8,
            textAlign: "center",
            transition: "transform 0.3s ease",
            cursor: "default",
          }}
            onMouseEnter={e => e.currentTarget.style.transform = "translateY(-10px)"}
            onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
          >
            <div style={{
              fontSize: 56,
              marginBottom: 15,
              color: "#005bb5",
              userSelect: "none",
            }} role="img" aria-label={`${title} icon`}>
              {icon}
            </div>
            <h3 style={{ fontSize: 22, marginBottom: 15, fontWeight: 700, color: "#222" }}>
              {title}
            </h3>
            <p style={{ fontSize: 16, color: "#555", lineHeight: 1.4 }}>
              {description}
            </p>
          </div>
        ))}
      </section>

      {/* TESTIMONIALS SECTION */}
      <section id="testimonials" style={{
        maxWidth: 1140,
        margin: "80px auto",
        padding: "40px 20px",
        backgroundColor: "#cfdcea",  // slightly darker grey-blue
        borderRadius: 10,
        userSelect: "none",
      }}>
        <h2 style={{
          fontSize: 36,
          marginBottom: 40,
          color: "#005bb5",
          textAlign: "center",
        }}>
          Testimonials
        </h2>
        <div style={{
          display: "flex",
          gap: 30,
          justifyContent: "center",
          flexWrap: "wrap",
        }}>
          {testimonials.map(({ name, feedback }) => (
            <div key={name} style={{
              backgroundColor: "white",
              padding: 25,
              borderRadius: 8,
              boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
              maxWidth: 320,
              flex: "1 1 300px",
              fontStyle: "italic",
              color: "#555",
              cursor: "default",
              userSelect: "none",
            }}>
              <p style={{ marginBottom: 20, fontSize: 16 }}>"{feedback}"</p>
              <p style={{
                fontWeight: 700,
                fontSize: 18,
                color: "#005bb5",
                textAlign: "right",
                marginBottom: 0,
              }}>
                - {name}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" style={{
        maxWidth: 600,
        margin: "80px auto",
        padding: "40px 20px",
        backgroundColor: "#cfdcea",  
        borderRadius: 8,
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        textAlign: "center",
      }}>
        <h2 style={{
          fontSize: 32,
          color: "#005bb5",
          marginBottom: 20,
        }}>
          Contact Us
        </h2>
        <p style={{ fontSize: 18, marginBottom: 10, fontWeight: 600, color: "#333" }}>
          📞 Phone: <span style={{ fontWeight: "normal" }}>+91 1234567890</span>
        </p>
        <p style={{ fontSize: 18, marginBottom: 10, fontWeight: 600, color: "#333" }}>
          📧 Email:{" "}
          <a href="mailto:support@gstbilling.com" style={{ color: "#005bb5" }}>
            support@gstbilling.com
          </a>
        </p>
        <p style={{ fontSize: 18, marginBottom: 10, fontWeight: 600, color: "#333" }}>
          🏢 Address:
          <br />
          <span style={{ fontWeight: "normal" }}>
            123, ABC Street, Pune, Maharashtra – 411001
          </span>
        </p>
      </section>

      {/* FOOTER */}
      <footer style={{
        backgroundColor: "#005bb5",
        color: "white",
        textAlign: "center",
        padding: "25px 20px",
        userSelect: "none",
        fontWeight: 600,
      }}>
        &copy; {new Date().getFullYear()} GST Billing System. All rights reserved.
      </footer>
    </div>
  );
}

export default HomePage;