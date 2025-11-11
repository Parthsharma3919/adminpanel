import React, { useEffect } from "react";
import "./JourneyTimeline.css";
import AnimatedBubbles from "../AnimatedBubbles";
import { CTASection } from "./CTASection";

const STEPS = [
  {
    icon: "👤",
    title: "Easy Registration",
    time: "1 min",
    desc: "Complete your profile with basic information and upload required documents in minutes.",
  },
  {
    icon: "💳",
    title: "Secure Payment",
    time: "1 min",
    desc: "Pay securely via Razorpay with multiple payment options and instant confirmation.",
  },
  {
    icon: "📚",
    title: "Access Training",
    time: "120 hours",
    desc: "Learn through 7 comprehensive subjects with materials, PPTs, and expert-led videos.",
  },
  {
    icon: "📝",
    title: "Assessment",
    time: "60 mins",
    desc: "Take quizzes and assignments to evaluate your learning, growth, and understanding.",
  },
  {
    icon: "🏆",
    title: "Get Certified",
    time: "Instant",
    desc: "Receive your UGC-compliant internship certificate instantly after completion.",
  },
];

export const JourneyTimeline = () => {
  useEffect(() => {
    const cards = document.querySelectorAll(".jt-card");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (e) => e.isIntersecting && e.target.classList.add("in-view")
        ),
      { threshold: 0.2 }
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <div id="JourneyTimeline" className="text-center">
        <section className="journey">
          <div className="journey-scrim" aria-hidden>
            <AnimatedBubbles />
          </div>
          <div className="container">
            <h2 className="journey-title text-center">
              Your Journey to <span className="jt-gradient">Certification</span>
            </h2>
            <p className="journey-sub text-center">
              A complete step-by-step experience — smooth, structured, and
              designed to help you shine.
            </p>

            <div className="jt-wrap">
              <div className="jt-line" aria-hidden />
              {STEPS.map((s, i) => {
                const side = i % 2 === 0 ? "left" : "right";
                return (
                  <div className={`jt-item ${side}`} key={s.title}>
                    <span className="jt-icon">{s.icon}</span>

                    <article className="jt-card">
                      <span className="jt-time" aria-label="duration">
                        {s.time}
                      </span>
                      <div className="jt-head">
                        <h3 className="jt-h3 mb-0">{s.title}</h3>
                      </div>
                      <p className="jt-desc mb-0">{s.desc}</p>
                    </article>
                  </div>
                );
              })}
            </div>

            <CTASection />
          </div>
        </section>
      </div>
    </>
  );
};
export default JourneyTimeline;
