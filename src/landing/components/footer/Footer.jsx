import { Link } from "react-router-dom";
import React from "react";
import "./Footer.css";
import VSFoundationLogo from "./../logo/VSFoundationcopy.png";

export default function Footer() {
  return (
    <>
      {/* Support banner */}
      <section className="support-banner">
        <div className="container">
          <div className="support-inner">
            <h3 className="mb-2">24/7 Student Support</h3>
            <p className="mb-3" style={{ color: "whitesmoke" }}>
              Our dedicated support team is available round the clock to assist students with any
              platform-related queries.
            </p>
            <div className="support-contacts">
              <span>
                <i className="fa fa-envelope-o" /> &nbsp; vardhmansrijan@gmail.com
              </span>
              <span>
                <i className="fa fa-phone" /> &nbsp; Student Helpline: &nbsp;+91-9060155550
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main footer */}
      <footer className="site-footer">
        <div className="container">
          <div className="row gy-4">
            {/* brand */}
            <div className="col-lg-4">
              <div className="footer-brand">
                <img src={VSFoundationLogo} alt="VS Foundation Logo" className="footer-logo" />
                <div className="brand">
                  <div className="brand-tag">Your Digital Internship Platform</div>
                </div>
              </div>

              <p className="footer-lead">
                Empowering students across India with UGC-mandated internship certification. A
                seamless digital platform for registration, learning, and certification.
              </p>

              <ul className="social-list">
                <li>
                  <a
                    href="https://facebook.com/vsfoundation"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa-brands fa-facebook"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com/vsfoundation"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa-brands fa-instagram"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com/vsfoundation"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa-brands fa-x-twitter"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://youtube.com/@vsfoundation"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa-brands fa-youtube"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://linkedin.com/company/vsfoundation"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa-brands fa-linkedin"></i>
                  </a>
                </li>
                <li>
                  <a href="mailto:vardhmansrijan@gmail.com">
                    <i className="fa-solid fa-envelope"></i>
                  </a>
                </li>
                <li>
                  <a href="tel:+91 9060155550">
                    <i className="fa-solid fa-phone"></i>
                  </a>
                </li>
              </ul>
            </div>

            {/* nav columns */}
            <div className="col-6 col-lg-2">
              <h6 className="foot-head">Platform</h6>
              <ul className="foot-nav">
                <li>
                  <a href="/#JourneyTimeline">For Students</a>
                </li>
                <li>
                  <a href="/#CollegesPage">For Colleges</a>
                </li>
              </ul>
            </div>

            <div className="col-6 col-lg-2">
              <h6 className="foot-head">Support</h6>
              <ul className="foot-nav">
                <li>
                  <a href="/#contact">Help Center</a>
                </li>
                <li>
                  <a href="/#contact">Contact Us</a>
                </li>
                <li>
                  <a href="/#contact">Internship Guide</a>
                </li>
              </ul>
            </div>

            <div className="col-6 col-lg-2">
              <h6 className="foot-head">Legal</h6>
              <ul className="foot-nav">
                <li>
                  <Link to="/privacy">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="/terms">Terms of Service</Link>
                </li>
                <li>
                  <Link to="/cookies">Cookie Policy</Link>
                </li>
                <li>
                  <Link to="/shipping">Shipping Policy</Link>
                </li>
                <li>
                  <Link to="/refunds">Cancellation Refund</Link>
                </li>
              </ul>
            </div>
          </div>

          <hr className="foot-divider" />

          <div className="foot-bottom">
            <div className="copy">
              © {new Date().getFullYear()} VSfoundation. All rights reserved.
            </div>

            <div className="powered">
              <span className="badge-org" aria-hidden>
                🛡️
              </span>
              <span>Powered by&nbsp;</span>
              <a className="link-faint">Codeमित्र</a>
            </div>

            <div className="compliance">Compliant with UGC Internship Guidelines</div>
          </div>
        </div>
      </footer>
    </>
  );
}
