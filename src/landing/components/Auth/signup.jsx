import React, { useState, useEffect } from "react";
import "./Signup.css";
import axiosClient from "../axiosClient";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navigation from "../Navigation/navigation";

export default function Signup() {
  const [tab, setTab] = useState("student");
  const navigate = useNavigate();

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

  const [sLoading, setSLoading] = useState(false);
  const [sErr, setSErr] = useState("");
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

        // set default selected IDs only if empty
        setStudent((p) => ({
          ...p,
          gender: p.gender || g.data?.[0]?.id || "",
          degree: p.degree || d.data?.[0]?.id || "",
          department: p.department || dept.data?.[0]?.id || "",
          semester: p.semester || sem.data?.[0]?.id || "",
          relationship: p.relationship || rel.data?.[0]?.id || "",
        }));
      } catch (err) {
        console.error("Dropdown load failed", err);
        toast.warn("Couldn’t load student dropdowns.", { theme: "colored" });
      }
    })();
  }, []);

  /* ---------------- College state ---------------- */
  const [college, setCollege] = useState({
    college_name: "",
    affiliated_university: "",
    college_type: 1,
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
  const [cLoading, setCLoading] = useState(false);
  const [cErr, setCErr] = useState("");
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

        // sort college types by a friendly order
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

        // sort ranges by numeric lower bound (handles "5000+")
        const ranges = (aRes.data || []).slice().sort((a, b) => {
          const low = (s) =>
            s.includes("+") ? parseInt(s, 10) : parseInt(s.split("-")[0], 10);
          return low(a.value) - low(b.value);
        });

        setCollegeTypeOpts(types);
        setApproxOpts(ranges);

        // set defaults only if empty
        setCollege((p) => ({
          ...p,
          college_type: p.college_type ?? types[0]?.id ?? "",
          approx_students_per_year:
            p.approx_students_per_year ?? ranges[0]?.id ?? "",
        }));
      } catch (e) {
        console.error("Dropdown load failed:", e);
        toast.warn("Couldn’t load dropdown options.", { theme: "colored" });
      }
    })();
  }, []);

  /* ---------------- Handlers ---------------- */
  const onStudentChange = (e) => {
    const { name, type, checked, value } = e.target;
    setStudent((p) => ({
      ...p,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const onCollegeChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCollege((p) => ({
      ...p,
      [name]:
        type === "checkbox"
          ? checked
          : name === "college_type" || name === "approx_students_per_year"
          ? Number(value)
          : value,
    }));
  };

  // console.log("collegeTypeOpts:", collegeTypeOpts);
  // console.log("approxOpts:", approxOpts);
  // console.log("selected college_type:", college.college_type);
  // console.log("selected approx:", college.approx_students_per_year);

  const submitStudent = async (e) => {
    e.preventDefault();
    setSErr("");
    setSOk("");

    // block if options not loaded yet
    if (
      !genderOpts.length ||
      !degreeOpts.length ||
      !departmentOpts.length ||
      !semesterOpts.length ||
      !relationshipOpts.length
    ) {
      toast.warn("Please wait, loading options…", { theme: "colored" });
      return;
    }

    // sanitize phones
    const contactDigits = String(student.contact || "")
      .replace(/\D/g, "")
      .slice(-10);
    const emgDigits = String(student.emgPhone || "")
      .replace(/\D/g, "")
      .slice(-10);

    if (contactDigits.length !== 10) {
      toast.error("Contact number must be exactly 10 digits.", {
        theme: "colored",
      });
      return setSErr("Contact number must be exactly 10 digits.");
    }
    if (emgDigits && emgDigits.length !== 10) {
      toast.error("Emergency contact must be 10 digits.", { theme: "colored" });
      return setSErr("Emergency contact must be 10 digits.");
    }

    // basic checks
    if (!student.agree) {
      toast.warn(
        "Please accept the Terms & Privacy Policy before continuing.",
        { theme: "colored" }
      );
      return setSErr("Please accept the Terms and Privacy Policy.");
    }
    if (!student.fullName || !student.email || !student.pwd || !student.pwd2) {
      toast.error("Please fill all required fields.", { theme: "colored" });
      return setSErr("Please fill the required fields.");
    }
    if (student.pwd.length < 8) {
      toast.error("Password must be at least 8 characters.", {
        theme: "colored",
      });
      return setSErr("Password must be at least 8 characters.");
    }
    if (student.pwd !== student.pwd2) {
      toast.error("Passwords do not match.", { theme: "colored" });
      return setSErr("Passwords do not match.");
    }

    // Must be numeric IDs now
    const payload = {
      full_name: student.fullName,
      gender: Number(student.gender),
      parent_name: student.parentName,
      contact_number: contactDigits,
      email: student.email,
      university_name: student.university,
      college_name: student.college,
      degree: Number(student.degree),
      department: Number(student.department),
      class_semester: Number(student.semester),
      university_roll_number: student.roll,
      emergency_contact_name: student.emgName,
      emergency_contact_number: emgDigits,
      relationship_with_contact: Number(student.relationship),
      password: student.pwd,
      confirm_password: student.pwd2,
    };

    // sanity log
    console.log("Submit payload:", payload, {
      types: {
        gender: typeof payload.gender,
        degree: typeof payload.degree,
        department: typeof payload.department,
        class_semester: typeof payload.class_semester,
        relationship_with_contact: typeof payload.relationship_with_contact,
      },
    });

    setSLoading(true);
    try {
      const { data } = await axiosClient.post("/api/register/", payload, {
        headers: { "Content-Type": "application/json" },
      });
      toast.success(data?.message || "Registration successful!", {
        theme: "colored",
      });
      setSOk(data?.message || "Registration successful!");
      setTimeout(() => navigate("/signin"), 1500);
    } catch (e1) {
      // flatten backend errors
      const resp = e1?.response?.data;
      let msg = "";
      if (resp && typeof resp === "object") {
        const lines = [];
        for (const [k, v] of Object.entries(resp)) {
          if (Array.isArray(v)) lines.push(`${k}: ${v.join(", ")}`);
          else if (typeof v === "string") lines.push(`${k}: ${v}`);
        }
        msg = lines.join(" | ");
      }
      const finalMsg =
        msg ||
        e1?.response?.data?.message ||
        e1?.response?.data?.detail ||
        e1?.message ||
        "Registration failed.";
      console.error("Register error:", e1?.response || e1);
      toast.error(finalMsg, { theme: "colored" });
      setSErr(finalMsg);
    } finally {
      setSLoading(false);
    }
  };
  const submitCollege = async (e) => {
    e.preventDefault();
    setCErr("");
    setCOk("");

    // 0) Ensure options are loaded (avoid sending ""/undefined)
    if (!collegeTypeOpts.length || !approxOpts.length) {
      const m = "Please wait, loading dropdown options…";
      setCErr(m);
      toast.warn(m, { theme: "colored" });
      return;
    }

    // 1) Required field check
    const required = [
      "college_name",
      "affiliated_university",
      "college_type",
      "contact_person",
      "official_email",
      "phone_number",
      "college_address",
      "city",
      "state",
      "pin_code",
    ];
    const missing = required.filter((k) => !college[k] && college[k] !== 0);
    if (missing.length) {
      const msg = "Please complete all required fields (*) before submitting.";
      setCErr(msg);
      toast.error(msg, { theme: "colored" });
      return;
    }

    // 2) Terms
    if (!college.agree) {
      const msg = "Please accept the Terms & Privacy Policy.";
      setCErr(msg);
      toast.warn(msg, { theme: "colored" });
      return;
    }

    // 3) Validate FKs are real numbers (not "", not 0)
    const ct = Number(college.college_type);
    if (!Number.isInteger(ct) || ct <= 0) {
      const msg = "Please select a valid College Type.";
      setCErr(msg);
      toast.error(msg, { theme: "colored" });
      return;
    }

    // approx_students_per_year looks optional in your UI;
    // if provided, it MUST be a valid PK (>0). If not provided, omit it.
    const asp =
      college.approx_students_per_year !== ""
        ? Number(college.approx_students_per_year)
        : null;
    if (asp !== null && (!Number.isInteger(asp) || asp <= 0)) {
      const msg = "Please select a valid 'Approx. Students / Year' range.";
      setCErr(msg);
      toast.error(msg, { theme: "colored" });
      return;
    }

    // 4) Build payload WITHOUT coercing to 0
    const payload = {
      college_name: college.college_name,
      affiliated_university: college.affiliated_university,
      college_type: ct,
      contact_person: college.contact_person,
      designation: college.designation,
      official_email: college.official_email,
      phone_number: String(college.phone_number || "").replace(/\D/g, ""),
      college_address: college.college_address,
      city: college.city,
      state: college.state,
      pin_code: String(college.pin_code || "").replace(/\D/g, ""),
      additional_message: college.additional_message,
    };

    // Only include approx_students_per_year if selected
    if (asp !== null) payload.approx_students_per_year = asp;

    // sanity log
    console.groupCollapsed(
      "%c[College Register] Payload",
      "color:#006;padding:2px"
    );
    console.log(payload);
    console.groupEnd();

    setCLoading(true);
    try {
      const { data } = await axiosClient.post(
        "/api/college-register/",
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.info("[College Register] Success:", data);
      const okMsg = data?.message || "College registration submitted!";
      setCOk(okMsg);
      toast.success(okMsg, { theme: "colored" });
    } catch (err) {
      console.groupCollapsed("%c[College Register] API Error", "color:#b00020");
      if (err.response) {
        console.log("Status:", err.response.status);
        console.log("Data:", err.response.data);
        console.log("Config:", err.config);
      } else if (err.request) {
        console.log("No response:", err.request);
      } else {
        console.log("Setup error:", err.message);
      }
      console.groupEnd();

      // Flatten errors for UI
      const resp = err?.response?.data;
      let msg = "";
      if (resp && typeof resp === "object") {
        const parts = [];
        for (const [k, v] of Object.entries(resp)) {
          if (Array.isArray(v)) parts.push(`${k}: ${v.join(", ")}`);
          else if (typeof v === "string") parts.push(`${k}: ${v}`);
        }
        msg = parts.join(" | ");
      }
      msg = msg || err?.message || "Submission failed.";
      setCErr(msg);
      toast.error(msg, { theme: "colored" });
    } finally {
      setCLoading(false);
    }
  };

  return (
    <>
      <div>
        <Navigation />
      </div>

      <section className="signup-page">
        {/* bg orbs kept by your theme */}
        <div className="su-orbs">
          <span className="orb o1" />
          <span className="orb o2" />
        </div>

        <div className="su-container">
          {/* Tabs */}
          <div className="su-tabs">
            <button
              className={`su-tab ${tab === "student" ? "active" : ""}`}
              onClick={() => setTab("student")}
              type="button"
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
              onClick={() => setTab("college")}
              type="button"
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

          {/* ==================== STUDENT FORM ==================== */}
          {tab === "student" && (
            <form onSubmit={submitStudent} className="su-form">
              <header className="su-head">
                <h2 className="su-title">Student Registration</h2>
                <p className="su-sub">
                  Complete your registration for UGC-mandated internship program
                </p>
              </header>

              {/* {sErr && <div className="su-alert error">{sErr}</div>} */}
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
                      placeholder="Enter your full name as per official records"
                    />
                  </div>

                  <div className="su-field">
                    <label htmlFor="gender">Gender *</label>
                    <select
                      id="gender"
                      name="gender"
                      value={student.gender}
                      onChange={onStudentChange}
                    >
                      <option value="">Select Gender</option>
                      {genderOpts.map((g) => (
                        <option key={g.id} value={g.id}>
                          {g.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="su-field">
                    <label htmlFor="parentName">Parent/Guardian Name *</label>
                    <input
                      id="parentName"
                      name="parentName"
                      value={student.parentName}
                      onChange={onStudentChange}
                      type="text"
                      placeholder="Enter parent or guardian name"
                    />
                  </div>

                  <div className="su-field">
                    <label htmlFor="contact">Contact Number *</label>
                    <input
                      id="contact"
                      name="contact"
                      value={student.contact}
                      onChange={onStudentChange}
                      type="tel"
                      placeholder="Enter your phone number"
                    />
                    <small className="su-help">10 digit mobile number</small>
                  </div>

                  <div className="su-field">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      id="email"
                      name="email"
                      value={student.email}
                      onChange={onStudentChange}
                      type="email"
                      placeholder="Enter your email address"
                    />
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
                      placeholder="Enter your university full name"
                    />
                  </div>

                  <div className="su-field su-col-12">
                    <label htmlFor="college">College Name *</label>
                    <input
                      id="college"
                      name="college"
                      value={student.college}
                      onChange={onStudentChange}
                      type="text"
                      placeholder="Enter your college full name"
                    />
                  </div>

                  <div className="su-field">
                    <label htmlFor="degree">Degree *</label>
                    <select
                      id="degree"
                      name="degree"
                      value={student.degree}
                      onChange={onStudentChange}
                    >
                      <option value="">Select Degree</option>
                      {degreeOpts.map((d) => (
                        <option key={d.id} value={d.id}>
                          {d.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="su-field">
                    <label htmlFor="department">Department/Stream *</label>
                    <select
                      id="department"
                      name="department"
                      value={student.department}
                      onChange={onStudentChange}
                    >
                      <option value="">Select Department</option>
                      {departmentOpts.map((d) => (
                        <option key={d.id} value={d.id}>
                          {d.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="su-field">
                    <label htmlFor="semester">Class/Semester *</label>
                    <select
                      id="semester"
                      name="semester"
                      value={student.semester}
                      onChange={onStudentChange}
                    >
                      <option value="">Select Semester</option>
                      {semesterOpts.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="su-field">
                    <label htmlFor="roll">University Roll Number *</label>
                    <input
                      id="roll"
                      name="roll"
                      value={student.roll}
                      onChange={onStudentChange}
                      type="text"
                      placeholder="Enter your college roll number"
                    />
                  </div>
                </div>
              </fieldset>

              {/* 3. Emergency */}
              <fieldset className="su-section">
                <legend className="su-legend">
                  <span className="su-step">3</span> Emergency Contact
                  Information
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
                      placeholder="Full name of emergency contact"
                    />
                  </div>

                  <div className="su-field">
                    <label htmlFor="emgPhone">Emergency Contact Number *</label>
                    <input
                      id="emgPhone"
                      name="emgPhone"
                      value={student.emgPhone}
                      onChange={onStudentChange}
                      type="tel"
                      placeholder="Emergency contact phone number"
                    />
                  </div>
                  <div className="su-field su-col-12">
                    <label htmlFor="relationship">
                      Relationship with Emergency Contact *
                    </label>
                    <select
                      id="relationship"
                      name="relationship"
                      value={student.relationship}
                      onChange={onStudentChange}
                    >
                      <option value="">Select Relationship</option>
                      {relationshipOpts.map((r) => (
                        <option key={r.id} value={r.id}>
                          {r.name}
                        </option>
                      ))}
                    </select>
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
                      />
                      <button
                        type="button"
                        className="su-eye"
                        aria-label="toggle password"
                      >
                        👁️
                      </button>
                    </div>
                    <small className="su-help">Minimum 8 characters</small>
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
                      />
                      <button
                        type="button"
                        className="su-eye"
                        aria-label="toggle password"
                      >
                        👁️
                      </button>
                    </div>
                  </div>
                </div>
              </fieldset>

              {/* Agreement + Submit */}
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
              </div>

              <div className="su-actions">
                <button
                  type="button"
                  className="su-btn ghost"
                  onClick={() => window.history.back()}
                >
                  Back
                </button>

                <button
                  type="submit"
                  className="su-btn primary"
                  disabled={sLoading}
                >
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

          {/* ==================== COLLEGE FORM ==================== */}
          {tab === "college" && (
            <form onSubmit={submitCollege} className="su-form">
              <header className="su-head">
                <h2 className="su-title">College Registration</h2>
                <p className="su-sub">
                  Partner with us to streamline UGC-mandated internship
                  management
                </p>
              </header>

              {/* {cErr && <div className="su-alert error">{cErr}</div>} */}
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
                    />
                  </div>

                  <div className="su-field su-col-12">
                    <label htmlFor="affiliated_university">
                      Affiliated University *
                    </label>
                    <input
                      id="affiliated_university"
                      name="affiliated_university"
                      value={college.affiliated_university}
                      onChange={onCollegeChange}
                      type="text"
                      placeholder="Delhi University"
                    />
                  </div>

                  <div className="su-field">
                    <label htmlFor="college_type">College Type *</label>
                    <select
                      id="college_type"
                      name="college_type"
                      value={college.college_type || ""}
                      onChange={onCollegeChange}
                      disabled={!collegeTypeOpts.length}
                    >
                      <option value="" disabled>
                        {collegeTypeOpts.length
                          ? "Select college type"
                          : "Loading..."}
                      </option>
                      {collegeTypeOpts.map((ct) => (
                        <option key={ct.id} value={ct.id}>
                          {ct.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="su-field">
                    <label htmlFor="approx_students_per_year">
                      Approx. Students / Year
                    </label>
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
                      placeholder="Dr. Ramesh Kumar"
                    />
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
                      placeholder="name@college.edu.in"
                    />
                  </div>

                  <div className="su-field">
                    <label htmlFor="phone_number">Phone Number *</label>
                    <input
                      id="phone_number"
                      name="phone_number"
                      value={college.phone_number}
                      onChange={onCollegeChange}
                      type="tel"
                      placeholder="9876543210"
                    />
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
                      placeholder="Sector 10, Dwarka"
                    />
                  </div>

                  <div className="su-field">
                    <label htmlFor="city">City *</label>
                    <input
                      id="city"
                      name="city"
                      value={college.city}
                      onChange={onCollegeChange}
                      type="text"
                      placeholder="New Delhi"
                    />
                  </div>

                  <div className="su-field">
                    <label htmlFor="state">State *</label>
                    <input
                      id="state"
                      name="state"
                      value={college.state}
                      onChange={onCollegeChange}
                      type="text"
                      placeholder="Delhi"
                    />
                  </div>

                  <div className="su-field">
                    <label htmlFor="pin_code">PIN Code *</label>
                    <input
                      id="pin_code"
                      name="pin_code"
                      value={college.pin_code}
                      onChange={onCollegeChange}
                      type="text"
                      placeholder="110075"
                    />
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

              {/* Agreement + Submit */}
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
                    <a href="/terms">Terms</a> &{" "}
                    <a href="/privacy">Privacy Policy</a>.
                  </span>
                </label>
              </div>

              <div className="su-actions">
                <button
                  type="button"
                  className="su-btn ghost"
                  onClick={() => window.history.back()}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="su-btn primary"
                  disabled={cLoading}
                >
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
