import React from "react";
import "./FeaturesSection.css";

export const FeaturesSection = () => {
  const features = [
    { icon: "🧾", title: "Student Registration",
      desc: "Simple and secure registration process with document upload and verification.",
      badge: { text: "Live Now", tone: "success" } },
    { icon: "💳", title: "Payment Integration",
      desc: "Secure Razorpay payment gateway for course modules fee collection.",
      badge: { text: "Live Now", tone: "success" } },
    { icon: "📊", title: "Progress Tracking",
      desc: "Real-time progress bar showing 30-day internship completion status.",
      badge: { text: "Live Now", tone: "success" } },
    { icon: "📱", title: "Assessment System",
      desc: "Quizzes and assignments to evaluate student learning and progress.",
      badge: { text: "Coming Soon", tone: "info" } },
    { icon: "🎓", title: "Learning Management",
      desc: "7 comprehensive subjects with PPTs, videos, and study materials.",
      badge: { text: "Coming Soon", tone: "info" } },
    { icon: "🏆", title: "Certificate Generation",
      desc: "Automated PDF certificate generation after successful internship completion.",
      badge: { text: "Live Now", tone: "success" } },
    { icon: "🏛️", title: "College Dashboard",
      desc: "Bulk student upload, progress monitoring, and certificate management.",
      badge: { text: "Phase 3", tone: "purple" } },
    { icon: "📈", title: "Analytics & Reports",
      desc: "Comprehensive analytics on student performance and completion rates.",
      badge: { text: "Phase 3", tone: "purple" } },
  ];

  return (
    <section id="features" className="features py-5">
      <div className="container">
        <h2 className="features-title text-center mb-2">
          Powerful Features for{" "}
          <span className="text-gradient">Seamless Internship Management</span>
        </h2>
        <p className="features-sub text-center mb-5">
          Everything you need to manage UGC-mandated internships efficiently, from registration to certification.
        </p>

        <div className="row g-4 g-lg-4">
          {features.map((f, i) => (
            <div key={i} className="col-12 col-sm-6 col-lg-3">
              <article className="feature-card h-100">
                <span className={`feature-badge badge-${f.badge.tone}`}>{f.badge.text}</span>

                <div className="d-flex align-items-start gap-3 mb-3">
                  <div className="feature-icon" aria-hidden>{f.icon}</div>
                  <h3 className="feature-title mb-0">{f.title}</h3>
                </div>

                <p className="feature-desc mb-0">{f.desc}</p>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
