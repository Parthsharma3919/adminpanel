import React, { useMemo, useState } from "react";
import "./TestimonialsPage.css";

const ALL_TESTIMONIALS = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Computer Science Student",
    org: "Delhi University",
    type: "student",
    quote:
      "“The platform made my internship process incredibly smooth. From registration to certificate, everything was automated. The 7-subject curriculum was comprehensive and the support team was very helpful throughout the 30-day program.”",
    stars: 5,
    badge: "Student",
  },
  {
    id: 2,
    name: "Dr. Rajesh Kumar",
    role: "Head of Department",
    org: "IIT Mumbai",
    type: "college",
    quote:
      "“As a college administrator, this platform has revolutionized how we manage UGC internships. Bulk onboarding and automated certificate generation saved us countless hours. The analytics help us track student progress effectively.”",
    stars: 5,
    badge: "College",
  },
  {
    id: 3,
    name: "Amit Patel",
    role: "Engineering Student",
    org: "VTU Bengaluru",
    type: "student",
    quote:
      "“I was skeptical about online internships, but the structured curriculum and regular assessments made it engaging. Getting my certificate instantly after completion was amazing! Highly recommended for all students.”",
    stars: 5,
    badge: "Student",
  },
  // add more if you like…
];

export default function TestimonialsPage() {
  const [tab, setTab] = useState("all"); // all | students | colleges

  const testimonials = useMemo(() => {
    if (tab === "students")
      return ALL_TESTIMONIALS.filter((t) => t.type === "student");
    if (tab === "colleges")
      return ALL_TESTIMONIALS.filter((t) => t.type === "college");
    return ALL_TESTIMONIALS;
  }, [tab]);

  const stats = [
    { value: "10,000+", label: "Students Certified" },
    { value: "150+", label: "Partner Colleges" },
    { value: "98%", label: "Satisfaction Rate" },
    { value: "4.9/5", label: "Average Rating" },
  ];

  return (
    <>
      {/* Heading */}
      <div className="text-center">
        <h2 className="tp-title">
          What Our <span className="tp-grad">Community</span> Says
        </h2>
        <p className="tp-sub">
          Hear from students and colleges who have transformed their internship
          experience with our platform.
        </p>
      </div>

      {/* Stats row */}
      <div className="row g-3 tp-stats">
        {stats.map((s) => (
          <div className="col-12 col-sm-6 col-lg-3" key={s.label}>
            <div className="tp-stat-card">
              <div className="tp-stat-value">{s.value}</div>
              <div className="tp-stat-label">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filter pills */}
      <div className="tp-pills">
        <button
          className={`tp-pill ${tab === "all" ? "active" : ""}`}
          onClick={() => setTab("all")}
        >
          All Testimonials
        </button>
        <button
          className={`tp-pill ${tab === "students" ? "active" : ""}`}
          onClick={() => setTab("students")}
        >
          Students
        </button>
        <button
          className={`tp-pill ${tab === "colleges" ? "active" : ""}`}
          onClick={() => setTab("colleges")}
        >
          Colleges
        </button>
      </div>

      {/* Testimonials grid */}
      <div className="row g-4">
        {testimonials.map((t) => (
          <div className="col-12 col-lg-4" key={t.id}>
            <article className="tp-card h-100">
              <div className="tp-stars" aria-label={`${t.stars} stars`}>
                {"★★★★★".slice(0, t.stars)}
              </div>
              <p className="tp-quote">{t.quote}</p>

              <div className="tp-user">
                <div className="tp-avatar" aria-hidden>
                  🧑‍🎓
                </div>
                <div className="tp-user-meta">
                  <div className="tp-name">{t.name}</div>
                  <div className="tp-role">{t.role}</div>
                  <div className="tp-org">{t.org}</div>
                </div>
                <span
                  className={`tp-badge ${
                    t.type === "college" ? "tp-badge-college" : ""
                  }`}
                >
                  {t.badge}
                </span>
              </div>
            </article>
          </div>
        ))}
      </div>
      {/* Trusted by section */}
      <div className="tp-trust mt-5">
        <p className="tp-trust-title">
          Trusted by Educational Institutions Across India
        </p>

        <div className="tp-trust-grid">
          <div className="tp-trust-item">
            <span className="tp-trust-icon">🎓</span>
            <span>UGC Compliant</span>
          </div>
          <div className="tp-trust-item">
            <span className="tp-trust-icon">📜</span>
            <span>ISO Certified</span>
          </div>
          <div className="tp-trust-item">
            <span className="tp-trust-icon">🔐</span>
            <span>Data Secure</span>
          </div>
          <div className="tp-trust-item">
            <span className="tp-trust-icon">🕐</span>
            <span>24/7 Support</span>
          </div>
        </div>
      </div>
    </>
  );
}
