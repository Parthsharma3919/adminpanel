import React from "react";
import "./CTASection.css";

export const CTASection = () => {
  const stats = [
    { value: "100%", label: "UGC Compliant" },
    { value: "30 Days", label: "Program Duration" },
    { value: "7 Subjects", label: "Comprehensive Curriculum" },
    { value: "24/7", label: "Student Support" },
  ];

  return (
    <section className="cta">
      <div className="container">
        {/* Top CTA Card */}
        <div className="cta-card text-center">
          <h2 className="cta-title mb-2">Start Your Internship Journey Today</h2>
          <p className="cta-sub mb-4">
            Join thousands of students who've already completed their UGC-approved internships effortlessly.
          </p>

          <div className="row g-3 justify-content-center mb-4">
            {stats.map((s) => (
              <div key={s.value} className="col-12 col-sm-6 col-lg-3 d-flex justify-content-center">
                <div className="cta-pill">
                  <div className="pill-value">{s.value}</div>
                  <div className="pill-label">{s.label}</div>
                </div>
              </div>
            ))}
          </div>

          <a href="/signup" className="cta-btn">Register Now</a>

          <div className="cta-checks">
            <span>✅ Instant Offer Letter</span>
            <span>✅ Automated Certificate</span>
            <span>✅ Digital Signature</span>
          </div>
        </div>

        {/* Testimonial */}
        <div className="testimonial-card text-center">
          <div className="t-emoji">🎓</div>
          <blockquote className="t-quote">
            “The process was so smooth and modern! From registration to certification, everything was automated and
            stress-free. Absolutely loved it!”
          </blockquote>
          <div className="t-author">— Raj Sharma, MCA Student</div>
        </div>
      </div>
    </section>
  );
};
