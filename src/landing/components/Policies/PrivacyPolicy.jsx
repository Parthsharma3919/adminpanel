import React from "react";
import PolicyLayout from "./PolicyLayout";

export default function PrivacyPolicy() {
  return (
    <PolicyLayout title="Privacy Policy" lastUpdated="November 06, 2025">
      <article className="policy-article">
        <h2 id="intro">1. Introduction</h2>
        <p>
          Welcome to <strong>VSfoundation</strong> (“we,” “our,” or “us”). We
          operate the <strong>VSfoundation.in</strong> website and the{" "}
          <strong>VSfoundation UGC Internship LMS</strong>. We’re committed to
          protecting your privacy. This policy explains how we collect, use,
          disclose, and safeguard your information when you use our platform as
          a student enrolled in UGC-compliant internship programs.
        </p>

        <h2 id="collect">2. Information We Collect</h2>
        <h3>Personal Information</h3>
        <ul>
          <li>Full name, email address, phone number</li>
          <li>Educational details (college, course, year of study)</li>
          <li>University/College identification details</li>
          <li>Payment information (via secure payment gateways)</li>
          <li>Government ID proofs for verification</li>
        </ul>
        <h3>Academic Information</h3>
        <ul>
          <li>Course progress and completion data</li>
          <li>Assessment scores and performance metrics</li>
          <li>Assignment submissions and project work</li>
          <li>Certificate issuance records</li>
        </ul>
        <h3>Technical Information</h3>
        <ul>
          <li>IP address, browser type, device information</li>
          <li>Usage patterns and platform interaction data</li>
          <li>Login timestamps and session duration</li>
        </ul>

        <h2 id="use">3. How We Use Your Information</h2>
        <ul>
          <li>Provide and maintain UGC-compliant internship services</li>
          <li>Process your ₹1000 course registration fee</li>
          <li>Track academic progress and issue certificates</li>
          <li>Communicate important internship updates</li>
          <li>Comply with UGC reporting and verification requirements</li>
          <li>Improve our platform and user experience</li>
          <li>Prevent fraud and ensure platform security</li>
        </ul>

        <h2 id="share">4. Data Sharing and Disclosure</h2>
        <h3>With Educational Authorities</h3>
        <ul>
          <li>UGC for compliance verification</li>
          <li>Your educational institution for academic coordination</li>
          <li>Government authorities as required by law</li>
        </ul>
        <h3>With Service Providers</h3>
        <ul>
          <li>Payment processors (Razorpay, Stripe, etc.)</li>
          <li>Cloud hosting and storage providers</li>
          <li>Email and communication service providers</li>
          <li>Analytics and performance monitoring tools</li>
        </ul>
        <p><strong>We never sell</strong> your personal information.</p>

        <h2 id="security">5. Data Security</h2>
        <ul>
          <li>SSL encryption for data transmission</li>
          <li>Secure servers with regular updates</li>
          <li>Access controls and authentication mechanisms</li>
          <li>Security audits and vulnerability assessments</li>
          <li>Backups and disaster recovery procedures</li>
        </ul>

        <h2 id="rights">6. Your Data Protection Rights</h2>
        <ul>
          <li>Access, rectify, or delete your personal data</li>
          <li>Restrict or object to processing</li>
          <li>Data portability</li>
          <li>Withdraw consent at any time</li>
        </ul>

        <h2 id="retention">7. Data Retention</h2>
        <ul>
          <li>Provide our educational services</li>
          <li>Comply with UGC record-keeping (minimum 5 years)</li>
          <li>Maintain academic and certification records</li>
          <li>Resolve disputes and enforce agreements</li>
        </ul>

        <h2 id="contact">8. Contact Us</h2>
        <p>
          Email: <a href="mailto:vardhmansrijan@gmail.com">vardhmansrijan@gmail.com</a><br />
          Address: VSfoundation Educational Services, India<br />
          Response Time: Within 7 working days
        </p>

        <h2 id="updates">9. Updates to This Policy</h2>
        <p>
          We may update this policy and will indicate the new “Last updated”
          date. Please review periodically.
        </p>
      </article>
    </PolicyLayout>
  );
}
