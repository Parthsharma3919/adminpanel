// src/components/policies/PolicyLayout.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./policies.css";

export default function PolicyLayout({ title, children, lastUpdated }) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1); // Go back to the previous page
    } else {
      navigate("/"); // If opened directly, go to home
    }
  };

  return (
    <section className="policy-wrap">
      <div className="policy-bg">
        <span className="orb o1" />
        <span className="orb o2" />
      </div>

      <div className="policy-container">
        <header className="policy-head">
          <button className="policy-back-btn" onClick={handleBack}>
            ← Back
          </button>

          <h1 className="policy-title">{title}</h1>
          {lastUpdated && (
            <p className="policy-updated">Last updated: {lastUpdated}</p>
          )}
        </header>

        <div className="policy-body">{children}</div>
      </div>
    </section>
  );
}