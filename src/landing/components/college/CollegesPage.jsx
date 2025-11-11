import React from "react";
import "./CollegesPage.css";
import TransformCTA from "./TransformCTA";

export default function CollegesPage() {
  const leftFeatures = [
    {
      icon: "👥",
      title: "Bulk Student Onboarding",
      desc: "Upload multiple students via CSV/Excel with automatic profile creation.",
      tone: "live",
    },
    {
      icon: "📊",
      title: "Progress Monitoring",
      desc: "Track student progress, attendance, and completion rates in real-time.",
      tone: "live",
    },
    {
      icon: "📄",
      title: "Certificate Management",
      desc: "Automated certificate issuance and download for all enrolled students.",
      tone: "live",
    },
    {
      icon: "📈",
      title: "Analytics Dashboard",
      desc: "Comprehensive reports on student performance and program effectiveness.",
      tone: "soon",
    },
    {
      icon: "🔗",
      title: "API Integration",
      desc: "Seamless integration with existing college management systems.",
      tone: "soon",
    },
    {
      icon: "🎯",
      title: "Custom Workflows",
      desc: "Tailored processes to match your college's specific requirements.",
      tone: "soon",
    },
  ];

  const benefits = [
    "Zero setup cost for partner colleges",
    "Dedicated account manager",
    "Priority support and training",
    "Custom reporting and analytics",
    "UGC compliance guarantee",
    "Bulk discount packages",
  ];

  const stats = [
    {
      value: "150+",
      labelTop: "Partner Colleges",
      labelBottom: "Across India",
    },
    {
      value: "50K+",
      labelTop: "Students Enrolled",
      labelBottom: "Active users",
    },
    {
      value: "98%",
      labelTop: "Satisfaction Rate",
      labelBottom: "College feedback",
    },
    { value: "24/7", labelTop: "Support", labelBottom: "Dedicated team" },
  ];

  const integrations = [
    "ERP Systems",
    "Student Portals",
    "LMS Platforms",
    "UGC Portal",
  ];

  return (
    <>
      <div id="CollegesPage" className="text-center">
        <section className="colleges">
          <div className="container">
            <div className="text-center mb-4">
              <h2 className="colg-title">
                For{" "}
                <span className="text-gradient">Colleges & Institutions</span>
              </h2>
              <p className="colg-sub">
                Streamline UGC-mandated internship programs with our
                comprehensive management platform.
              </p>
            </div>

            <div className="row g-4 align-items-stretch">
              {/* Left: Feature grid */}
              <div className="col-lg-7">
                <h4 className="mb-3">College Dashboard Features</h4>
                <div className="row g-3">
                  {leftFeatures.map((f, i) => (
                    <div className="col-sm-6" key={i}>
                      <div
                        className={`feat-card ${
                          f.tone === "live" ? "feat-live" : "feat-soon"
                        }`}
                      >
                        <div className="d-flex align-items-center gap-2 mb-2">
                          <div className="feat-icon">{f.icon}</div>
                          <div className="feat-title mb-0">{f.title}</div>
                          {f.tone === "soon" && (
                            <span className="chip-soon">Coming Soon</span>
                          )}
                        </div>
                        <p className="feat-desc mb-0">{f.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Partnership card */}
              <div className="col-lg-5">
                <div className="partner-card h-100">
                  <h4 className="mb-3">Partnership Benefits</h4>
                  <ul className="benefits list-unstyled mb-4">
                    {benefits.map((b, i) => (
                      <li key={i}> {b}</li>
                    ))}
                  </ul>

                  <div className="cta-box">
                    <h5 className="mb-1">Ready to Partner With Us?</h5>
                    <p className="mb-3">
                      Join hundreds of colleges already using our platform for
                      UGC internship management.
                    </p>
                    <a className="cta-ghost-btn" href="/partnership">
                      Request College Partnership
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats band */}
            <div className="stats-band">
              <div className="row g-0 text-center">
                {stats.map((s, i) => (
                  <div className="col-6 col-lg-3" key={i}>
                    <div className="stat-cell">
                      <div className="stat-value">{s.value}</div>
                      <div className="stat-top">{s.labelTop}</div>
                      <div className="stat-bottom">{s.labelBottom}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Integrations */}
            <div className="text-center mt-5">
              <h3 className="mb-2">Seamless Integration with Your Systems</h3>
              <p className="colg-sub mb-4">
                Our platform integrates with popular college management systems
                and follows UGC guidelines to ensure compliance and smooth
                operations.
              </p>
              <div className="d-flex flex-wrap gap-3 justify-content-center">
                {integrations.map((tag) => (
                  <span key={tag} className="chip-pill">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
        <TransformCTA />
      </div>
    </>
  );
}
