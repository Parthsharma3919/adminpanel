// src/components/Auth/Signin.jsx
import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import VSFoundationLogo from "./../logo/VSFoundation.png";
import { Helmet } from "react-helmet-async";
import "./signin.css";
import Navigation from "../Navigation/navigation";

const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

function validate(values) {
  const errors = {};

  // Email
  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!emailRegex.test(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  // Password (tweak rules as you like)
  const pwd = values.password;
  if (!pwd) {
    errors.password = "Password is required.";
  } else if (pwd.length < 8) {
    errors.password = "Password must be at least 8 characters.";
  }

  return errors;
}

export default function SignIn() {
  const [form, setForm] = useState({ email: "", password: "", remember: true });
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const [showPwd, setShowPwd] = useState(false);

  const errors = useMemo(() => validate(form), [form]);
  const isInvalid = Object.keys(errors).length > 0;

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
  };

  const onBlur = (e) => {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");

    // mark all fields touched so all messages show
    setTouched({ email: true, password: true });

    if (isInvalid) return;

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email.trim(),
          password: form.password,
        }),
      });

      if (!res.ok) {
        let msg = "Unable to sign in. Please check your credentials.";
        try {
          const j = await res.json();
          if (j?.detail) msg = j.detail;
          if (j?.message) msg = j.message;
          if (j?.errors) {
            setTouched({ email: true, password: true });
          }
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
      storage.setItem("userEmail", form.email.trim());

      navigate("/app", { replace: true });
    } catch (e2) {
      setErr(e2.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <link rel="stylesheet" href="/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/css/normalize.css" />
        <link rel="stylesheet" href="/css/site.css" />
      </Helmet>
      <div>
        <Navigation />
      </div>

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

              {err && (
                <div className="auth-error" role="alert">
                  {err}
                </div>
              )}

              <form onSubmit={onSubmit} className="glass-form" noValidate>
                {/* Email */}
                <div className={`field ${touched.email && errors.email ? "has-error" : ""}`}>
                  <label htmlFor="email">Email</label>
                  <div className="input-wrap">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={onChange}
                      onBlur={onBlur}
                      required
                      autoComplete="username"
                      aria-invalid={touched.email && !!errors.email}
                      aria-describedby="email-error"
                    />
                  </div>
                  {touched.email && errors.email && (
                    <div id="email-error" className="field-error">
                      {errors.email}
                    </div>
                  )}
                </div>

                {/* Password */}
                <div className={`field ${touched.password && errors.password ? "has-error" : ""}`}>
                  <label htmlFor="password">Password</label>
                  <div className="input-wrap">
                    <input
                      id="password"
                      name="password"
                      type={showPwd ? "text" : "password"}
                      placeholder="••••••••"
                      value={form.password}
                      onChange={onChange}
                      onBlur={onBlur}
                      required
                      autoComplete="current-password"
                      aria-invalid={touched.password && !!errors.password}
                      aria-describedby="password-error"
                    />
                    <button
                      type="button"
                      className="eye"
                      onClick={() => setShowPwd((s) => !s)}
                      aria-label={showPwd ? "Hide password" : "Show password"}
                    >
                      {showPwd ? "🙈" : "👁️"}
                    </button>
                  </div>
                  {touched.password && errors.password && (
                    <div id="password-error" className="field-error">
                      {errors.password}
                    </div>
                  )}
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

                  <a className="link" href="/forgot">
                    Forgot password?
                  </a>
                </div>

                <button className="btn-brandd" disabled={loading || isInvalid} aria-busy={loading}>
                  {loading ? "Signing in..." : "Sign In"}
                </button>

                <p className="meta">
                  Don’t have an account?{" "}
                  <a href="/signup" className="link-strong">
                    Sign Up
                  </a>
                </p>
              </form>
            </div>

            <footer className="auth-foot">
              <span>© {new Date().getFullYear()} VS Foundation</span>
              <span className="sep">•</span>
              <a href="/privacy" className="foot-link">
                Privacy
              </a>
              <span className="sep">•</span>
              <a href="/terms" className="foot-link">
                Terms
              </a>
            </footer>
          </div>
        </div>
      </section>
    </>
  );
}
