import React from "react";
import PolicyLayout from "./PolicyLayout";

export default function Terms() {
  return (
    <PolicyLayout title="Terms & Conditions" lastUpdated="November 06, 2025">
      <article className="policy-article">
        <p className="lead">Governing your use of VSfoundation UGC Internship Platform</p>
        <p><strong>Important:</strong> By registering on VSfoundation, you agree to these terms.</p>

        <h2 id="accept">1. Acceptance of Terms</h2>
        <p>
          By accessing and using VSfoundation (“the Platform”), you agree to be bound
          by these Terms. If you disagree with any part, you may not access the platform.
        </p>

        <h2 id="eligibility">2. Eligibility</h2>
        <ul>
          <li>At least 16 years of age</li>
          <li>Currently enrolled in a recognized educational institution</li>
          <li>Provide accurate educational and personal information</li>
          <li>Parental consent if under 18</li>
          <li>Comply with UGC internship guidelines</li>
        </ul>

        <h2 id="account">3. Registration and Account</h2>
        <h3>3.1 Account Creation</h3>
        <ul>
          <li>Provide accurate and complete information</li>
          <li>Maintain account confidentiality</li>
          <li>Notify us of any unauthorized access</li>
          <li>Accounts may be disabled for violations</li>
        </ul>
        <h3>3.2 Account Responsibilities</h3>
        <ul>
          <li>One account per student</li>
          <li>You’re responsible for activities under your account</li>
          <li>Keep profile information updated</li>
        </ul>

        <h2 id="payments">4. Payments and Fees</h2>
        <h3>4.1 Course Fee</h3>
        <ul>
          <li>Internship course fee: ₹1000 (inclusive of taxes)</li>
          <li>Covers course access, mentorship, and certificate</li>
          <li>Payment required before access is granted</li>
          <li>Processed via secure gateways</li>
        </ul>
        <h3>4.2 Refund Policy</h3>
        <p><strong>No Refund Policy.</strong> Once payment is processed and access is provided, fees are non-refundable.</p>
        <h3>4.3 Payment Issues</h3>
        <ul>
          <li>Failed payments may suspend access</li>
          <li>Chargebacks lead to termination</li>
          <li>Payment verification may take up to 24 hours</li>
        </ul>

        <h2 id="completion">5. Course Completion & Certification</h2>
        <h3>5.1 Completion Requirements</h3>
        <ul>
          <li>Complete all modules and assignments/projects</li>
          <li>Score at least 60% in assessments</li>
          <li>Complete within the stipulated timeframe</li>
          <li>Follow academic integrity policies</li>
        </ul>
        <h3>5.2 Certificate Issuance</h3>
        <ul>
          <li>Digital certificate upon successful completion</li>
          <li>UGC-compliant and verifiable</li>
          <li>Includes student and course details</li>
          <li>Replacement certificates may incur charges</li>
        </ul>
        <h3>5.3 Certificate Validity</h3>
        <ul>
          <li>Certificates are permanently valid</li>
          <li>Verification available on the platform</li>
        </ul>

        <h2 id="conduct">6. User Conduct and Prohibited Activities</h2>
        <h3>6.1 Academic Integrity</h3>
        <ul>
          <li>No plagiarism or impersonation</li>
          <li>No sharing assessment answers</li>
          <li>No unauthorized collaboration where prohibited</li>
        </ul>
        <h3>6.2 Platform Usage</h3>
        <ul>
          <li>No reverse engineering or hacking attempts</li>
          <li>No spamming or abusive behavior</li>
          <li>No unauthorized commercial use</li>
          <li>No malicious content</li>
        </ul>

        <h2 id="ip">7. Intellectual Property</h2>
        <h3>7.1 Our Content</h3>
        <ul>
          <li>All course materials are proprietary</li>
          <li>No unauthorized distribution</li>
          <li>Design and code protected by copyright</li>
        </ul>
        <h3>7.2 Your Content</h3>
        <ul>
          <li>You retain rights to your original submissions</li>
          <li>You grant us a license for educational use</li>
          <li>We may use anonymized data for improvement</li>
        </ul>

        <h2 id="termination">8. Termination</h2>
        <p>We may terminate or suspend accounts for violations, academic dishonesty, non-payment, illegal activities, or misuse.</p>

        <h2 id="liability">9. Limitation of Liability</h2>
        <p>
          VSfoundation provides educational services and cannot guarantee employment outcomes or admissions.
          Our liability is limited to the course fee paid.
        </p>

        <h2 id="law">10. Governing Law</h2>
        <p>These terms are governed by the laws of India. Disputes fall under the exclusive jurisdiction of courts in India.</p>

        <h2 id="changes">11. Changes to Terms</h2>
        <p>We may modify these terms at any time. Continued use after changes constitutes acceptance.</p>

        <h2 id="contact">12. Contact Information</h2>
        <p>
          Platform: VSfoundation UGC Internship LMS<br/>
          Website: <a href="https://vardhmansrijan.in/" target="_blank" rel="noreferrer">https://vardhmansrijan.in/</a><br/>
          Email: <a href="mailto:vardhmansrijan@gmail.com">vardhmansrijan@gmail.com</a><br/>
          Grievance Officer: Available via contact form
        </p>
      </article>
    </PolicyLayout>
  );
}
