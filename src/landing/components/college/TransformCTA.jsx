import React from "react";
import "./TransformCTA.css";
import { Link } from "react-router-dom";

export default function TransformCTA() {
  const trustItems = [
    { icon: "🎯", title: "UGC Compliant" },
    { icon: "🔐", title: "Secure & Reliable" },
    { icon: "⚡", title: "Instant Processing" },
    { icon: "📞", title: "Dedicated Support" },
  ];

  return (
    <section className="transform-cta">
      {/* Star layers */}
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>

      <div className="container text-center tcta-content">
        <h2 className="tcta-title">
          Ready to Transform Your <span className="text-fade">Internship Program?</span>
        </h2>
        <p className="tcta-sub">
          Join thousands of students and colleges already using our platform for UGC-mandated
          internship management and certification.
        </p>

        {/* Trust Panel */}
        <div className="trust-panel">
          <div className="trust-heading">Trusted by Educational Institutions Across India</div>
          <div className="trust-grid">
            {trustItems.map((it) => (
              <div key={it.title} className="trust-item">
                <div className="trust-icon">{it.icon}</div>
                <div className="trust-text">{it.title}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="tcta-divider" />
        <p className="tcta-help">Have questions? We’re here to help you get started.</p>

        <div className="btn-row">
          <a href="#sales" className="btn-ghost">
            Contact Sales
          </a>
          {/* <a href="#demo" className="btn-primary">Request Demo</a> */}
          <Link className="cta-ghost-btn" to="/signup?tab=student">
            Request Demo
          </Link>
        </div>
      </div>
    </section>
  );
}
