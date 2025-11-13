import React, { useState, useEffect } from "react";
import "./Signup.css";
import axiosClient from "../axiosClient";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Navigation from "../Navigation/navigation";
import { Helmet } from "react-helmet-async";

/* ---------------- helpers ---------------- */
const onlyDigits = (s = "") => String(s || "").replace(/\D/g, "");
const isEmail = (s = "") => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(s || "").trim());
const isTenDigitPhone = (s = "") => /^\d{10}$/.test(String(s || "").trim());
const isPin = (s = "") => /^\d{6}$/.test(String(onlyDigits(s || "")));
const toIntOrNull = (v) => {
  const n = Number(v);
  return Number.isInteger(n) ? n : null;
};

/* Mapping backend field names -> frontend state keys */
const backendToFrontMap = {
  full_name: "fullName",
  gender: "gender",
  parent_name: "parentName",
  contact_number: "contact",
  email: "email",
  university_name: "university",
  college_name: "college",
  degree: "degree",
  department: "department",
  class_semester: "semester",
  university_roll_number: "roll",
  emergency_contact_name: "emgName",
  emergency_contact_number: "emgPhone",
  relationship_with_contact: "relationship",
  password: "pwd",
  confirm_password: "pwd2",
};

export default function Signup() {
  const location = useLocation();
  const navigate = useNavigate();
  const [tab, setTab] = useState(() => {
    const params = new URLSearchParams(location.search);
    return params.get("tab") === "college" ? "college" : "student";
  });

  // keep tab in sync when URL changes externally
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const urlTab = params.get("tab") === "college" ? "college" : "student";
    if (urlTab !== tab) setTab(urlTab);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  const handleTabChange = (newTab) => {
    setTab(newTab);
    const params = new URLSearchParams(location.search);
    if (newTab === "student") params.delete("tab");
    else params.set("tab", "college");
    navigate({ pathname: location.pathname, search: params.toString() }, { replace: true });
  };

  /* ---------------- Student state ---------------- */
  const [student, setStudent] = useState({
    fullName: "",
    gender: "",
    parentName: "",
    contact: "",
    email: "",
    university: "",
    college: "",
    degree: "",
    department: "",
    semester: "",
    roll: "",
    emgName: "",
    emgPhone: "",
    relationship: "",
    pwd: "",
    pwd2: "",
    agree: false,
  });
  const [sErrors, setSErrors] = useState({});
  const [sLoading, setSLoading] = useState(false);
  const [sOk, setSOk] = useState("");

  const [genderOpts, setGenderOpts] = useState([]);
  const [degreeOpts, setDegreeOpts] = useState([]);
  const [departmentOpts, setDepartmentOpts] = useState([]);
  const [semesterOpts, setSemesterOpts] = useState([]);
  const [relationshipOpts, setRelationshipOpts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const [g, d, dept, sem, rel] = await Promise.all([
          axiosClient.get("/api/genders/"),
          axiosClient.get("/api/degrees/"),
          axiosClient.get("/api/departments/"),
          axiosClient.get("/api/class-semesters/"),
          axiosClient.get("/api/relationships/"),
        ]);

        setGenderOpts(g.data || []);
        setDegreeOpts(d.data || []);
        setDepartmentOpts(dept.data || []);
        setSemesterOpts(sem.data || []);
        setRelationshipOpts(rel.data || []);
      } catch (err) {
        console.error("Dropdown load failed", err);
        toast.warn("Couldn’t load student dropdowns.", { theme: "colored" });
      }
    })();
  }, []);

  /* ----------------Student Validation ---------------- */
  const validateStudent = (vals) => {
    const e = {};
    if (!String(vals.fullName || "").trim()) e.fullName = "Full name is required.";
    if (!String(vals.gender)) e.gender = "Select your gender.";
    if (!String(vals.parentName || "").trim()) e.parentName = "Parent/Guardian name is required.";

    if (!String(vals.contact || "").trim()) e.contact = "Mobile number is required.";
    else if (!isTenDigitPhone(vals.contact)) e.contact = "Enter a valid 10 digit mobile number.";

    if (!String(vals.email || "").trim()) e.email = "Email is required.";
    else if (!isEmail(vals.email)) e.email = "Enter a valid email address.";

    if (!String(vals.university || "").trim()) e.university = "University name is required.";
    if (!String(vals.college || "").trim()) e.college = "College name is required.";

    if (!String(vals.degree)) e.degree = "Select your degree.";
    if (!String(vals.department)) e.department = "Select your department.";
    if (!String(vals.semester)) e.semester = "Select your semester.";

    if (!String(vals.roll || "").trim()) e.roll = "Roll number is required.";

    if (!String(vals.emgName || "").trim()) e.emgName = "Emergency contact name is required.";
    if (!String(vals.emgPhone || "").trim()) e.emgPhone = "Emergency contact number is required.";
    else if (!isTenDigitPhone(vals.emgPhone)) e.emgPhone = "Emergency contact must be 10 digits.";

    if (!String(vals.relationship)) e.relationship = "Select the relationship.";

    if (!vals.pwd) e.pwd = "Password is required.";
    else if (vals.pwd.length < 8) e.pwd = "Minimum 8 characters.";
    if (!vals.pwd2) e.pwd2 = "Confirm your password.";
    else if (vals.pwd2 !== vals.pwd) e.pwd2 = "Passwords do not match.";

    if (!vals.agree) e.agree = "Please accept Terms & Privacy Policy.";
    return e;
  };

  /* ---------------- Handlers ---------------- */
  const onStudentChange = (e) => {
    const { name, type, checked, value } = e.target;
    setStudent((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
    setSErrors((prev) => ({ ...prev, [name]: "" }));
  };
  /* ---------------- Submit: Student ---------------- */
  const submitStudent = async (e) => {
    e.preventDefault();
    setSOk("");
    setSErrors({});
    const errs = validateStudent(student);
    setSErrors(errs);

    if (Object.keys(errs).length) {
      toast.error("Please fix the highlighted fields.", { theme: "colored" });
      return;
    }

    const payload = {
      full_name: student.fullName.trim(),
      gender: toIntOrNull(student.gender),
      parent_name: student.parentName.trim(),
      contact_number: onlyDigits(student.contact),
      email: student.email.trim(),
      university_name: student.university.trim(),
      college_name: student.college.trim(),
      degree: toIntOrNull(student.degree),
      department: toIntOrNull(student.department),
      class_semester: toIntOrNull(student.semester),
      university_roll_number: student.roll.trim(),
      emergency_contact_name: student.emgName.trim(),
      emergency_contact_number: onlyDigits(student.emgPhone),
      relationship_with_contact: toIntOrNull(student.relationship),
      password: student.pwd,
      confirm_password: student.pwd2,
    };

    setSLoading(true);
    try {
      const { data } = await axiosClient.post("/api/register/", payload);
      setSOk(data?.message || "Registration successful!");
      toast.success(data?.message || "Registration successful!", { theme: "colored" });
      setTimeout(() => navigate("/signin"), 1200);
    } catch (err) {
      const resp = err?.response?.data;
      const nextFieldErrors = {};

      if (resp && typeof resp === "object" && !Array.isArray(resp)) {
        Object.entries(resp).forEach(([key, val]) => {
          const frontKey = backendToFrontMap[key] || key;
          if (frontKey === "detail" || key === "non_field_errors") {
          } else {
            nextFieldErrors[frontKey] = Array.isArray(val) ? val.join(", ") : String(val);
          }
        });

        if (Object.keys(nextFieldErrors).length) {
          setSErrors((prev) => ({ ...prev, ...nextFieldErrors }));
        }

        let toastMsg = "";
        if (resp.detail) toastMsg = resp.detail;
        else if (resp.non_field_errors) {
          toastMsg = Array.isArray(resp.non_field_errors)
            ? resp.non_field_errors.join(", ")
            : resp.non_field_errors;
        } else {
          toastMsg =
            Object.entries(resp)
              .slice(0, 3)
              .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : v}`)
              .join(" | ") ||
            err.message ||
            "Registration failed.";
        }
        toast.error(toastMsg, { theme: "colored" });
      } else {
        const message = Array.isArray(resp)
          ? resp.join(", ")
          : resp?.toString?.() || err.message || "Registration failed.";
        toast.error(message, { theme: "colored" });
      }
    } finally {
      setSLoading(false);
    }
  };
  /* ---------------- College state ---------------- */
  const [college, setCollege] = useState({
    college_name: "",
    affiliated_university: "",
    college_type: "",
    approx_students_per_year: "",
    contact_person: "",
    designation: "",
    official_email: "",
    phone_number: "",
    college_address: "",
    city: "",
    state: "",
    pin_code: "",
    additional_message: "",
    agree: false,
  });
  const [cErrors, setCErrors] = useState({});
  const [cLoading, setCLoading] = useState(false);
  const [cOk, setCOk] = useState("");
  const [collegeTypeOpts, setCollegeTypeOpts] = useState([]);
  const [approxOpts, setApproxOpts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const [tRes, aRes] = await Promise.all([
          axiosClient.get("/api/college-types/"),
          axiosClient.get("/api/approx-students/"),
        ]);

        const typeOrder = [
          "Government College",
          "Private College",
          "Deemed College",
          "IIT",
          "NIT",
          "Others",
        ];
        const types = (tRes.data || []).slice().sort((a, b) => {
          const ia = typeOrder.indexOf(a.name);
          const ib = typeOrder.indexOf(b.name);
          return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib);
        });

        const ranges = (aRes.data || []).slice().sort((a, b) => {
          const low = (s) => (s.includes("+") ? parseInt(s, 10) : parseInt(s.split("-")[0], 10));
          return low(a.value) - low(b.value);
        });

        setCollegeTypeOpts(types);
        setApproxOpts(ranges);
      } catch (e) {
        console.error("Dropdown load failed:", e);
        toast.warn("Couldn’t load dropdown options.", { theme: "colored" });
      }
    })();
  }, []);

  const onCollegeChange = (e) => {
    const { name, value, type, checked } = e.target;
    const v = type === "checkbox" ? checked : value;
    setCollege((p) => ({ ...p, [name]: v }));
    setCErrors((prev) => ({ ...prev, [name]: "" }));
  };

  /* ----------------College Validation ---------------- */
  const validateCollege = (vals) => {
    const e = {};
    if (!String(vals.college_name || "").trim()) e.college_name = "College name is required.";
    if (!String(vals.affiliated_university || "").trim())
      e.affiliated_university = "Affiliated university is required.";
    if (!vals.college_type) e.college_type = "Select college type.";

    if (!String(vals.contact_person || "").trim())
      e.contact_person = "Contact person name is required.";

    if (!String(vals.official_email || "").trim()) e.official_email = "Official email is required.";
    else if (!isEmail(vals.official_email)) e.official_email = "Enter a valid email.";

    if (!String(vals.phone_number || "").trim()) e.phone_number = "Phone number is required.";
    else if (!isTenDigitPhone(vals.phone_number))
      e.phone_number = "Phone number must be 10 digits.";

    if (!String(vals.college_address || "").trim())
      e.college_address = "College address is required.";
    if (!String(vals.city || "").trim()) e.city = "City is required.";
    if (!String(vals.state || "").trim()) e.state = "State is required.";

    if (!String(vals.pin_code || "").trim()) e.pin_code = "PIN code is required.";
    else if (!isPin(vals.pin_code)) e.pin_code = "PIN code must be 6 digits.";

    if (!vals.agree) e.agree = "Please accept Terms & Privacy Policy.";
    return e;
  };

  const collegeBackendToFrontMap = {
    college_name: "college_name",
    affiliated_university: "affiliated_university",
    college_type: "college_type",
    approx_students_per_year: "approx_students_per_year",
    contact_person: "contact_person",
    designation: "designation",
    official_email: "official_email",
    phone_number: "phone_number",
    college_address: "college_address",
    city: "city",
    state: "state",
    pin_code: "pin_code",
    additional_message: "additional_message",
  };

  const safeInt = (v) => {
    const n = Number(v);
    return Number.isInteger(n) ? n : null;
  };

  /* ---------------- Submit: College ---------------- */
  const submitCollege = async (e) => {
    e.preventDefault();
    setCOk("");
    setCErrors({});
    const errs = validateCollege(college);
    setCErrors(errs);

    if (Object.keys(errs).length) {
      toast.error("Please fix the highlighted fields.", { theme: "colored" });
      return;
    }

    const payload = {
      college_name: college.college_name.trim(),
      affiliated_university: college.affiliated_university.trim(),
      college_type: safeInt(college.college_type),
      contact_person: college.contact_person.trim(),
      designation: college.designation.trim(),
      official_email: college.official_email.trim(),
      phone_number: onlyDigits(college.phone_number),
      college_address: college.college_address.trim(),
      city: college.city.trim(),
      state: college.state.trim(),
      pin_code: onlyDigits(college.pin_code),
      additional_message: college.additional_message.trim(),
    };

    if (college.approx_students_per_year)
      payload.approx_students_per_year = safeInt(college.approx_students_per_year);

    setCLoading(true);

    try {
      const { data } = await axiosClient.post("/api/college-register/", payload);
      const okMsg = data?.message || "College registration submitted!";
      setCOk(okMsg);
      toast.success(okMsg, { theme: "colored" });
    } catch (err) {
      const resp = err?.response?.data;
      const nextErrors = {};

      if (resp && typeof resp === "object") {
        Object.entries(resp).forEach(([key, val]) => {
          const frontKey = collegeBackendToFrontMap[key] || key;
          nextErrors[frontKey] = Array.isArray(val) ? val.join(", ") : String(val);
        });

        if (Object.keys(nextErrors).length) setCErrors((p) => ({ ...p, ...nextErrors }));

        const msg =
          resp.detail ||
          Object.values(resp)
            .map((v) => (Array.isArray(v) ? v.join(", ") : v))
            .join(" | ");

        toast.error(msg || "Submission failed.", { theme: "colored" });
      } else {
        toast.error(err.message || "Submission failed.", { theme: "colored" });
      }
    } finally {
      setCLoading(false);
    }
  };

  /* ---------------- UI ---------------- */
  const FieldError = ({ msg }) => (msg ? <small className="su-err">{msg}</small> : null);

  return (
    <>
      <Helmet>
        <link rel="stylesheet" href="/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/css/normalize.css" />
        <link rel="stylesheet" href="/css/site.css" />
      </Helmet>
      <Navigation />

      <section className="signup-page">
        <div className="su-orbs">
          <span className="orb o1" />
          <span className="orb o2" />
        </div>

        <div className="su-container">
          {/* Tabs */}
          <div className="su-tabs" role="tablist" aria-label="Registration type">
            <button
              className={`su-tab ${tab === "student" ? "active" : ""}`}
              onClick={() => handleTabChange("student")}
              type="button"
              role="tab"
              aria-selected={tab === "student"}
            >
              <span className="su-tab-ico" role="img" aria-label="student">
                🎓
              </span>
              <div>
                <div className="su-tab-title">Student Registration</div>
                <div className="su-tab-sub">Individual student account</div>
              </div>
            </button>

            <button
              className={`su-tab ${tab === "college" ? "active" : ""}`}
              onClick={() => handleTabChange("college")}
              type="button"
              role="tab"
              aria-selected={tab === "college"}
            >
              <span className="su-tab-ico" role="img" aria-label="college">
                🏫
              </span>
              <div>
                <div className="su-tab-title">College Registration</div>
                <div className="su-tab-sub">Partner with VS Foundation</div>
              </div>
            </button>
          </div>

          {/* ======= STUDENT FORM ======= */}
          {tab === "student" && (
            <form onSubmit={submitStudent} className="su-form" noValidate>
              <header className="su-head">
                <h2 className="su-title">Student Registration</h2>
                <p className="su-sub">
                  Complete your registration for UGC-mandated internship program
                </p>
              </header>

              {sOk && <div className="su-alert ok">{sOk}</div>}

              {/* 1. Personal */}
              <fieldset className="su-section">
                <legend className="su-legend">
                  <span className="su-step">1</span> Personal Information
                </legend>
                <div className="su-grid">
                  <div className="su-field">
                    <label htmlFor="fullName">Full Name *</label>
                    <input
                      id="fullName"
                      name="fullName"
                      value={student.fullName}
                      onChange={onStudentChange}
                      type="text"
                      placeholder="Enter your full name"
                      aria-invalid={!!sErrors.fullName}
                    />
                    <FieldError msg={sErrors.fullName} />
                  </div>

                  <div className="su-field">
                    <label htmlFor="gender">Gender *</label>
                    <select
                      id="gender"
                      name="gender"
                      value={student.gender}
                      onChange={onStudentChange}
                      aria-invalid={!!sErrors.gender}
                    >
                      <option value="">Select Gender</option>
                      {genderOpts.map((g) => (
                        <option key={g.id} value={g.id}>
                          {g.name}
                        </option>
                      ))}
                    </select>
                    <FieldError msg={sErrors.gender} />
                  </div>

                  <div className="su-field">
                    <label htmlFor="parentName">Parent/Guardian Name *</label>
                    <input
                      id="parentName"
                      name="parentName"
                      value={student.parentName}
                      onChange={onStudentChange}
                      type="text"
                      placeholder="Parent or guardian name"
                      aria-invalid={!!sErrors.parentName}
                    />
                    <FieldError msg={sErrors.parentName} />
                  </div>

                  <div className="su-field">
                    <label htmlFor="contact">Contact Number *</label>
                    <input
                      id="contact"
                      name="contact"
                      value={student.contact}
                      onChange={onStudentChange}
                      type="tel"
                      placeholder="10 digit mobile number"
                      aria-invalid={!!sErrors.contact}
                    />
                    <FieldError msg={sErrors.contact} />
                  </div>

                  <div className="su-field">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      id="email"
                      name="email"
                      value={student.email}
                      onChange={onStudentChange}
                      type="email"
                      placeholder="you@example.com"
                      aria-invalid={!!sErrors.email}
                    />
                    <FieldError msg={sErrors.email} />
                  </div>
                </div>
              </fieldset>

              {/* 2. Academic */}
              <fieldset className="su-section">
                <legend className="su-legend">
                  <span className="su-step">2</span> Academic Information
                </legend>
                <div className="su-grid">
                  <div className="su-field su-col-12">
                    <label htmlFor="university">University Name *</label>
                    <input
                      id="university"
                      name="university"
                      value={student.university}
                      onChange={onStudentChange}
                      type="text"
                      placeholder="Your university"
                      aria-invalid={!!sErrors.university}
                    />
                    <FieldError msg={sErrors.university} />
                  </div>

                  <div className="su-field su-col-12">
                    <label htmlFor="college">College Name *</label>
                    <input
                      id="college"
                      name="college"
                      value={student.college}
                      onChange={onStudentChange}
                      type="text"
                      placeholder="Your college"
                      aria-invalid={!!sErrors.college}
                    />
                    <FieldError msg={sErrors.college} />
                  </div>

                  <div className="su-field">
                    <label htmlFor="degree">Degree *</label>
                    <select
                      id="degree"
                      name="degree"
                      value={student.degree}
                      onChange={onStudentChange}
                      aria-invalid={!!sErrors.degree}
                    >
                      <option value="">Select Degree</option>
                      {degreeOpts.map((d) => (
                        <option key={d.id} value={d.id}>
                          {d.name}
                        </option>
                      ))}
                    </select>
                    <FieldError msg={sErrors.degree} />
                  </div>

                  <div className="su-field">
                    <label htmlFor="department">Department/Stream *</label>
                    <select
                      id="department"
                      name="department"
                      value={student.department}
                      onChange={onStudentChange}
                      aria-invalid={!!sErrors.department}
                    >
                      <option value="">Select Department</option>
                      {departmentOpts.map((d) => (
                        <option key={d.id} value={d.id}>
                          {d.name}
                        </option>
                      ))}
                    </select>
                    <FieldError msg={sErrors.department} />
                  </div>

                  <div className="su-field">
                    <label htmlFor="semester">Class/Semester *</label>
                    <select
                      id="semester"
                      name="semester"
                      value={student.semester}
                      onChange={onStudentChange}
                      aria-invalid={!!sErrors.semester}
                    >
                      <option value="">Select Semester</option>
                      {semesterOpts.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                    <FieldError msg={sErrors.semester} />
                  </div>

                  <div className="su-field">
                    <label htmlFor="roll">University Roll Number *</label>
                    <input
                      id="roll"
                      name="roll"
                      value={student.roll}
                      onChange={onStudentChange}
                      type="text"
                      placeholder="Your roll number"
                      aria-invalid={!!sErrors.roll}
                    />
                    <FieldError msg={sErrors.roll} />
                  </div>
                </div>
              </fieldset>

              {/* 3. Emergency */}
              <fieldset className="su-section">
                <legend className="su-legend">
                  <span className="su-step">3</span> Emergency Contact
                </legend>
                <div className="su-grid">
                  <div className="su-field">
                    <label htmlFor="emgName">Emergency Contact Name *</label>
                    <input
                      id="emgName"
                      name="emgName"
                      value={student.emgName}
                      onChange={onStudentChange}
                      type="text"
                      placeholder="Full name"
                      aria-invalid={!!sErrors.emgName}
                    />
                    <FieldError msg={sErrors.emgName} />
                  </div>

                  <div className="su-field">
                    <label htmlFor="emgPhone">Emergency Contact Number *</label>
                    <input
                      id="emgPhone"
                      name="emgPhone"
                      value={student.emgPhone}
                      onChange={onStudentChange}
                      type="tel"
                      placeholder="10 digit number"
                      aria-invalid={!!sErrors.emgPhone}
                    />
                    <FieldError msg={sErrors.emgPhone} />
                  </div>

                  <div className="su-field su-col-12">
                    <label htmlFor="relationship">Relationship *</label>
                    <select
                      id="relationship"
                      name="relationship"
                      value={student.relationship}
                      onChange={onStudentChange}
                      aria-invalid={!!sErrors.relationship}
                    >
                      <option value="">Select Relationship</option>
                      {relationshipOpts.map((r) => (
                        <option key={r.id} value={r.id}>
                          {r.name}
                        </option>
                      ))}
                    </select>
                    <FieldError msg={sErrors.relationship} />
                  </div>
                </div>
              </fieldset>

              {/* 4. Security */}
              <fieldset className="su-section">
                <legend className="su-legend">
                  <span className="su-step">4</span> Account Security
                </legend>
                <div className="su-grid">
                  <div className="su-field">
                    <label htmlFor="pwd">Password *</label>
                    <div className="su-input-wrap">
                      <input
                        id="pwd"
                        name="pwd"
                        value={student.pwd}
                        onChange={onStudentChange}
                        type="password"
                        placeholder="Create a strong password"
                        aria-invalid={!!sErrors.pwd}
                      />
                      <button type="button" className="su-eye" aria-label="toggle password">
                        👁️
                      </button>
                    </div>
                    <small className="su-help">Minimum 8 characters</small>
                    <FieldError msg={sErrors.pwd} />
                  </div>

                  <div className="su-field">
                    <label htmlFor="pwd2">Confirm Password *</label>
                    <div className="su-input-wrap">
                      <input
                        id="pwd2"
                        name="pwd2"
                        value={student.pwd2}
                        onChange={onStudentChange}
                        type="password"
                        placeholder="Confirm your password"
                        aria-invalid={!!sErrors.pwd2}
                      />
                      <button type="button" className="su-eye" aria-label="toggle password">
                        👁️
                      </button>
                    </div>
                    <FieldError msg={sErrors.pwd2} />
                  </div>
                </div>
              </fieldset>

              <div className="su-agree">
                <label className="su-check">
                  <input
                    type="checkbox"
                    name="agree"
                    checked={student.agree}
                    onChange={onStudentChange}
                  />
                  <span>
                    I agree to the <a href="/terms">Terms of Service</a> and{" "}
                    <a href="/privacy">Privacy Policy</a>.
                  </span>
                </label>
                <FieldError msg={sErrors.agree} />
              </div>

              <div className="su-actions">
                <button
                  type="button"
                  className="su-btn ghost"
                  onClick={() => window.history.back()}
                >
                  Back
                </button>
                <button type="submit" className="su-btn primary" disabled={sLoading}>
                  {sLoading ? (
                    <>
                      <span className="btn-spinner"></span> Processing...
                    </>
                  ) : (
                    "Complete Registration"
                  )}
                </button>
              </div>
            </form>
          )}

          {/* ======= COLLEGE FORM ======= */}
          {tab === "college" && (
            <form onSubmit={submitCollege} className="su-form" noValidate>
              <header className="su-head">
                <h2 className="su-title">College Registration</h2>
                <p className="su-sub">
                  Partner with us to streamline UGC-mandated internship management
                </p>
              </header>

              {cOk && <div className="su-alert ok">{cOk}</div>}

              {/* 1. Institute details */}
              <fieldset className="su-section">
                <legend className="su-legend">
                  <span className="su-step">1</span> Institute Details
                </legend>
                <div className="su-grid">
                  <div className="su-field su-col-12">
                    <label htmlFor="college_name">College Name *</label>
                    <input
                      id="college_name"
                      name="college_name"
                      value={college.college_name}
                      onChange={onCollegeChange}
                      type="text"
                      placeholder="ABC Institute of Technology"
                      aria-invalid={!!cErrors.college_name}
                    />
                    <FieldError msg={cErrors.college_name} />
                  </div>

                  <div className="su-field su-col-12">
                    <label htmlFor="affiliated_university">Affiliated University *</label>
                    <input
                      id="affiliated_university"
                      name="affiliated_university"
                      value={college.affiliated_university}
                      onChange={onCollegeChange}
                      type="text"
                      // placeholder="Delhi University"
                      aria-invalid={!!cErrors.affiliated_university}
                    />
                    <FieldError msg={cErrors.affiliated_university} />
                  </div>

                  <div className="su-field">
                    <label htmlFor="college_type">College Type *</label>
                    <select
                      id="college_type"
                      name="college_type"
                      value={college.college_type || ""}
                      onChange={onCollegeChange}
                      aria-invalid={!!cErrors.college_type}
                      disabled={!collegeTypeOpts.length}
                    >
                      <option value="" disabled>
                        {collegeTypeOpts.length ? "Select college type" : "Loading..."}
                      </option>
                      {collegeTypeOpts.map((ct) => (
                        <option key={ct.id} value={ct.id}>
                          {ct.name}
                        </option>
                      ))}
                    </select>
                    <FieldError msg={cErrors.college_type} />
                  </div>

                  <div className="su-field">
                    <label htmlFor="approx_students_per_year">Approx. Students / Year</label>
                    <select
                      id="approx_students_per_year"
                      name="approx_students_per_year"
                      value={college.approx_students_per_year || ""}
                      onChange={onCollegeChange}
                      disabled={!approxOpts.length}
                    >
                      <option value="" disabled>
                        {approxOpts.length ? "Select range" : "Loading..."}
                      </option>
                      {approxOpts.map((opt) => (
                        <option key={opt.id} value={opt.id}>
                          {opt.value}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </fieldset>

              {/* 2. Contact person */}
              <fieldset className="su-section">
                <legend className="su-legend">
                  <span className="su-step">2</span> Primary Contact
                </legend>
                <div className="su-grid">
                  <div className="su-field">
                    <label htmlFor="contact_person">Contact Person *</label>
                    <input
                      id="contact_person"
                      name="contact_person"
                      value={college.contact_person}
                      onChange={onCollegeChange}
                      type="text"
                      // placeholder="Dr. Ramesh Kumar"
                      aria-invalid={!!cErrors.contact_person}
                    />
                    <FieldError msg={cErrors.contact_person} />
                  </div>

                  <div className="su-field">
                    <label htmlFor="designation">Designation</label>
                    <input
                      id="designation"
                      name="designation"
                      value={college.designation}
                      onChange={onCollegeChange}
                      type="text"
                      placeholder="Principal / HOD / TPO"
                    />
                  </div>

                  <div className="su-field">
                    <label htmlFor="official_email">Official Email *</label>
                    <input
                      id="official_email"
                      name="official_email"
                      value={college.official_email}
                      onChange={onCollegeChange}
                      type="email"
                      // placeholder="name@college.edu.in"
                      aria-invalid={!!cErrors.official_email}
                    />
                    <FieldError msg={cErrors.official_email} />
                  </div>

                  <div className="su-field">
                    <label htmlFor="phone_number">Phone Number *</label>
                    <input
                      id="phone_number"
                      name="phone_number"
                      value={college.phone_number}
                      onChange={onCollegeChange}
                      type="tel"
                      // placeholder="9876543210"
                      aria-invalid={!!cErrors.phone_number}
                    />
                    <FieldError msg={cErrors.phone_number} />
                  </div>
                </div>
              </fieldset>

              {/* 3. Address */}
              <fieldset className="su-section">
                <legend className="su-legend">
                  <span className="su-step">3</span> Address
                </legend>
                <div className="su-grid">
                  <div className="su-field su-col-12">
                    <label htmlFor="college_address">Address *</label>
                    <input
                      id="college_address"
                      name="college_address"
                      value={college.college_address}
                      onChange={onCollegeChange}
                      type="text"
                      // placeholder="Sector 10, Dwarka"
                      aria-invalid={!!cErrors.college_address}
                    />
                    <FieldError msg={cErrors.college_address} />
                  </div>

                  <div className="su-field">
                    <label htmlFor="city">City *</label>
                    <input
                      id="city"
                      name="city"
                      value={college.city}
                      onChange={onCollegeChange}
                      type="text"
                      // placeholder="New Delhi"
                      aria-invalid={!!cErrors.city}
                    />
                    <FieldError msg={cErrors.city} />
                  </div>

                  <div className="su-field">
                    <label htmlFor="state">State *</label>
                    <input
                      id="state"
                      name="state"
                      value={college.state}
                      onChange={onCollegeChange}
                      type="text"
                      // placeholder="Delhi"
                      aria-invalid={!!cErrors.state}
                    />
                    <FieldError msg={cErrors.state} />
                  </div>

                  <div className="su-field">
                    <label htmlFor="pin_code">PIN Code *</label>
                    <input
                      id="pin_code"
                      name="pin_code"
                      value={college.pin_code}
                      onChange={onCollegeChange}
                      type="text"
                      // placeholder="110075"
                      aria-invalid={!!cErrors.pin_code}
                    />
                    <FieldError msg={cErrors.pin_code} />
                  </div>
                </div>
              </fieldset>

              {/* 4. Notes */}
              <fieldset className="su-section">
                <legend className="su-legend">
                  <span className="su-step">4</span> Additional Info
                </legend>
                <div className="su-grid">
                  <div className="su-field su-col-12">
                    <label htmlFor="additional_message">Message</label>
                    <textarea
                      id="additional_message"
                      name="additional_message"
                      rows="3"
                      value={college.additional_message}
                      onChange={onCollegeChange}
                      placeholder="We are interested in collaborating on internships."
                    />
                  </div>
                </div>
              </fieldset>

              <div className="su-agree">
                <label className="su-check">
                  <input
                    type="checkbox"
                    name="agree"
                    checked={college.agree}
                    onChange={onCollegeChange}
                  />
                  <span>
                    I confirm the above details are accurate and agree to the{" "}
                    <a href="/terms">Terms</a> & <a href="/privacy">Privacy Policy</a>.
                  </span>
                </label>
                <FieldError msg={cErrors.agree} />
              </div>

              <div className="su-actions">
                <button
                  type="button"
                  className="su-btn ghost"
                  onClick={() => window.history.back()}
                >
                  Back
                </button>
                <button type="submit" className="su-btn primary" disabled={cLoading}>
                  {cLoading ? (
                    <>
                      <span className="btn-spinner"></span> Submitting...
                    </>
                  ) : (
                    "Submit Registration"
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
