import { useState } from "react";
import emailjs from "emailjs-com";
import Footer from "../footer/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Contact.css";

const initialState = {
  name: "",
  email: "",
  message: "",
  subject: "",
  audience: "General Inquiry",
};

export const Contact = () => {
  const [{ name, email, message, subject, audience }, setState] = useState(initialState);
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const clearState = () => setState({ ...initialState });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    try {
      await emailjs.sendForm(
        "service_5eg9v3w",
        "template_6xbeovg",
        e.target,
        "us2YAuVHvmkEyNR7A"
      );
      toast.success("✅ Message sent successfully!", {
        position: "bottom-right",
        autoClose: 3000,
      });
      clearState();
    } catch (err) {
      console.error(err?.text || err);
      toast.error("❌ Failed to send message. Please try again.", {
        position: "bottom-right",
        autoClose: 4000,
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <div id="contact">
        <section className="contact-wrap">
          <div className="c-bg" aria-hidden>
            <span className="orb o1" />
            <span className="orb o2" />
          </div>

          <div className="container">
            <header className="c-head text-center">
              <h2 className="c-title" style={{ color: "#0b1324" }}>
                Get in <span className="brand-gradient">Touch</span>
              </h2>
              <p className="c-sub">
                We’d love to hear from you. Share a few details and our team
                will get back to you shortly.
              </p>
            </header>

            <div className="row g-4 align-items-stretch">
              <div className="col-lg-7">
                <div className="card form-card h-100">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="field">
                          <label htmlFor="name">Full Name</label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter your name"
                            value={name}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="field">
                          <label htmlFor="email">Email</label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="name@email.com"
                            value={email}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-sm-6">
                        <div className="field">
                          <label htmlFor="audience">I am a *</label>
                          <select
                            id="audience"
                            name="audience"
                            value={audience}
                            onChange={handleChange}
                            required
                          >
                            <option>General Inquiry</option>
                            <option>College/Institution</option>
                            <option>Student</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="field">
                          <label htmlFor="subject">Subject</label>
                          <input
                            type="text"
                            id="subject"
                            name="subject"
                            placeholder="How can we help?"
                            value={subject}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="field">
                      <label htmlFor="message">Message</label>
                      <textarea
                        id="message"
                        name="message"
                        rows="5"
                        placeholder="Write your message here…"
                        value={message}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="d-flex flex-column flex-md-row align-items-md-center gap-3">
                      <button
                        type="submit"
                        className="btn-brand"
                        disabled={sending}
                      >
                        {sending ? "Sending…" : "Send Message"}
                      </button>
                      <p className="reply-note">
                        We typically respond within <strong>2–4 hours</strong>{" "}
                        on business days.
                      </p>
                    </div>
                  </form>
                </div>
              </div>

              {/* Contact Info */}
              <div className="col-lg-5">
                <aside className="card info-card h-100">
                  <div className="info-head">
                    <h3>Contact Information</h3>
                    <p>Reach us via your preferred channel — we’re here to help.</p>
                  </div>

                  <div className="info-grid">
                    <a className="info-tile" href="mailto:vardhmansrijan@gmail.com">
                      <span className="it-icon">📧</span>
                      <span className="it-title">Email Us</span>
                      <span className="it-sub">vardhmansrijan@gmail.com</span>
                    </a>

                    <a className="info-tile" href="tel:+91-9060155550">
                      <span className="it-icon">📞</span>
                      <span className="it-title">Call Us</span>
                      <span className="it-sub">+91-9060155550</span>
                    </a>

                    <a
                      className="info-tile"
                      href="https://wa.me/9060155550"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span className="it-icon">💬</span>
                      <span className="it-title">WhatsApp</span>
                      <span className="it-sub">+91-9060155550</span>
                    </a>

                    <div className="info-tile no-link">
                      <span className="it-icon">🏢</span>
                      <span className="it-title">Office</span>
                      <span className="it-sub">
                        Tara villa, indrapuri, new station road, Barh-803213
                      </span>
                    </div>
                  </div>

                  <div className="hours">
                    <span className="dot" /> Mon–Sat, 9:00 AM – 6:00 PM IST
                  </div>
                </aside>
              </div>
            </div>

            <div className="social-row">
              <ul className="socials">
                <li><a href="/" aria-label="Facebook"><i className="fa fa-facebook" /></a></li>
                <li><a href="/" aria-label="Twitter"><i className="fa fa-twitter" /></a></li>
                <li><a href="/" aria-label="YouTube"><i className="fa fa-youtube" /></a></li>
              </ul>
            </div>
          </div>
        </section>

        <Footer />
      </div>
      <ToastContainer />
    </>
  );
};
