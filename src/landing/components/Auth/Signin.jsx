// src/components/Auth/Signin.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import VSFoundationLogo from "./../logo/VSFoundation.png";
import "./signin.css";
import Navigation from "../Navigation/navigation";

const API_BASE = "http://127.0.0.1:8000";

export default function SignIn() {
  const [form, setForm] = useState({ email: "", password: "", remember: true });
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");       
  const navigate = useNavigate();

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email.trim(), password: form.password }),
      });

      if (!res.ok) {
        let msg = "Unable to sign in. Please check your credentials.";
        try {
          const j = await res.json();
          if (j?.detail) msg = j.detail;
          if (j?.message) msg = j.message;
        } catch {}
        throw new Error(msg);
      }

      const data = await res.json();
      const { token } = data || {};
      if (!token?.access || !token?.refresh) {
        throw new Error("Invalid login response.");
      }

      const storage = form.remember ? window.localStorage : window.sessionStorage;
      storage.setItem("accessToken", token.access);
      storage.setItem("refreshToken", token.refresh);

      // optional: persist a tiny user flag/email
      storage.setItem("userEmail", form.email.trim());
      navigate("/", { replace: true });
    } catch (e2) {
      setErr(e2.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div><Navigation /></div>

      <section className="auth-page">
        <div className="auth-orbs">
          <span className="orb o1" />
          <span className="orb o2" />
          <span className="orb o3" />
        </div>

        <div className="container">
          <div className="auth-wrap">
            <header className="auth-brand">
              <img src={VSFoundationLogo} alt="VS Foundation" className="auth-logo" />
              <div className="brand-text">
                <h1 className="brand-name">VS Foundation</h1>
                <p className="brand-tag">Your Digital Internship Platform</p>
              </div>
            </header>

            <div className="glass-card">
              <div className="glass-head">
                <h2 className="glass-title">Welcome back</h2>
                <p className="glass-sub">Sign in to continue your internship journey</p>
              </div>

              {/* inline error */}
              {err && <div className="auth-error" role="alert">{err}</div>}

              <form onSubmit={onSubmit} className="glass-form" noValidate>
                <div className="field">
                  <label htmlFor="email">Email</label>
                  <div className="input-wrap">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={onChange}
                      required
                      autoComplete="username"
                    />
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="password">Password</label>
                  <div className="input-wrap">
                    <input
                      id="password"
                      name="password"
                      type={showPwd ? "text" : "password"}
                      placeholder="••••••••"
                      value={form.password}
                      onChange={onChange}
                      required
                      autoComplete="current-password"
                    />
                    <button type="button" className="eye" onClick={() => setShowPwd(!showPwd)}>
                      {showPwd ? "🙈" : "👁️"}
                    </button>
                  </div>
                </div>

                <div className="row-between">
                  <label className="remember">
                    <input
                      type="checkbox"
                      name="remember"
                      checked={form.remember}
                      onChange={onChange}
                    />
                    <span>Remember me</span>
                  </label>

                  <a className="link" href="/forgot">Forgot password?</a>
                </div>

                <button className="btn-brandd" disabled={loading}>
                  {loading ? "Signing in..." : "Sign In"}
                </button>

                <p className="meta">
                  Don’t have an account? <a href="/signup" className="link-strong">Sign Up</a>
                </p>
              </form>
            </div>

            <footer className="auth-foot">
              <span>© {new Date().getFullYear()} VS Foundation</span>
              <span className="sep">•</span>
              <a href="/privacy" className="foot-link">Privacy</a>
              <span className="sep">•</span>
              <a href="/terms" className="foot-link">Terms</a>
            </footer>
          </div>
        </div>
      </section>
    </>
  );
}
