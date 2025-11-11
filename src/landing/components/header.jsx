import React from "react";
// import { useNavigate } from "react-router-dom";


export const Header = () => {
  // const navigate = useNavigate();

  // const handleStartClick = () => {
  //   navigate("/signup");
  // };

  const handleLearnMoreClick = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  return (
    <header id="header" className="hero">
      <div className="container">
        <div className="row align-items-center">
          {/* LEFT */}
          <div className="col-lg-7">
            <div className="hero-badge">
              🎓 UGC Mandated Internship Program As Per NEP 2020
            </div>

            <h1 className="hero-title">
              Your Digital Key to <br />
              <span className="text-gradient">Your Internship Journey</span>
            </h1>

            <p className="hero-sub">
              Streamlined platform for UGC-mandated internships. Register, learn, and get
              certified seamlessly. Join thousands of students and colleges across India.
            </p>

            <div className="notice-card">
              <div className="notice-icon">📢</div>
              <div>
                <div className="notice-title">Internship Classes Notification</div>
                <p className="mb-1">
                  Registration will be continued till <strong>10 Nov 2025</strong>.
                </p>
                <p className="mb-1">
                  Online class has been started, Students are advised to select Internship Topic.
                </p>
                <p className="mb-1">
                  Physical / Offline workshop will be started on{" "}
                  <strong>07.11.25 to 12.11.25</strong> – Timing will be{" "}
                  <strong>10.00 am to 3 pm</strong>
                </p>
                <p className="mb-0">
                  Dates for offline classes will be shared <strong>shortly</strong>.
                </p>
              </div>
            </div>

            <div className="stats">
              <div className="stat">
                <div className="stat-num">10K+</div>
                <div className="stat-label">Students Certified</div>
              </div>
              <div className="stat">
                <div className="stat-num">100+</div>
                <div className="stat-label">Partner Colleges</div>
              </div>
              <div className="stat">
                <div className="stat-num">99%</div>
                <div className="stat-label">Success Rate</div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="col-lg-5 d-none d-lg-block">
            <div className="card-tilt">
              <div className="card-shadow"></div>
              <div className="certificate-card">
                <div className="cert-badge">🎓</div>
                <h3>Internship Certificate</h3>
                <p className="mb-4">
                  Complete your 30-day internship and receive UGC-compliant certification
                </p>
                <div className="cert-meta">
                  <span>
                    Status: <strong>Ready</strong>
                  </span>
                  <span>
                    Duration: <strong>30 Days/120 Hours</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="cta-buttons mt-4">
              <button className="btn-start" >
                🚀 Start Your Internship Journey
              </button>
              <button className="btn-learn" >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
