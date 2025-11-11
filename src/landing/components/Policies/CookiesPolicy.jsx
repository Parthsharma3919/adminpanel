import React from "react";
import PolicyLayout from "./PolicyLayout";

export default function CookiesPolicy() {
  return (
    <PolicyLayout title="Cookies Policy" lastUpdated="November 06, 2025">
      <article className="policy-article">
        <p className="lead">
          Understanding how we use cookies to improve your learning experience.
        </p>

        <h2 id="what">1. What Are Cookies?</h2>
        <p>
          Cookies are small text files placed on your device. They help us
          remember preferences, understand usage, improve performance/security,
          and personalize your experience.
        </p>

        <h2 id="types">2. Types of Cookies We Use</h2>
        <h3>2.1 Essential Cookies</h3>
        <ul>
          <li>Authentication and login sessions</li>
          <li>Security and fraud prevention</li>
          <li>Load balancing and performance</li>
          <li>Cannot be disabled</li>
        </ul>
        <h3>2.2 Functional Cookies</h3>
        <ul>
          <li>Language preferences</li>
          <li>Course progress tracking</li>
          <li>UI customization settings</li>
          <li>Can be disabled in browser settings</li>
        </ul>
        <h3>2.3 Analytics Cookies</h3>
        <ul>
          <li>User behavior insights</li>
          <li>Performance monitoring</li>
          <li>Feature usage statistics</li>
          <li>Data anonymized</li>
        </ul>
        <h3>2.4 Third-Party Cookies</h3>
        <ul>
          <li>Payment processing (Razorpay, Stripe)</li>
          <li>Video hosting/streaming</li>
          <li>Customer support</li>
          <li>Email communication tools</li>
        </ul>

        <h2 id="specific">3. Specific Cookies We Use</h2>
        <div className="cookie-table-wrap">
          <table className="cookie-table">
            <thead>
              <tr>
                <th>Cookie Name</th>
                <th>Purpose</th>
                <th>Duration</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>auth_token</td>
                <td>Maintains your login session</td>
                <td>Session</td>
                <td>Essential</td>
              </tr>
              <tr>
                <td>course_progress</td>
                <td>Tracks your learning progress</td>
                <td>1 year</td>
                <td>Functional</td>
              </tr>
              <tr>
                <td>user_preferences</td>
                <td>Stores your UI settings</td>
                <td>6 months</td>
                <td>Functional</td>
              </tr>
              <tr>
                <td>_ga</td>
                <td>Google Analytics – usage statistics</td>
                <td>2 years</td>
                <td>Analytics</td>
              </tr>
              <tr>
                <td>_gid</td>
                <td>Google Analytics – session tracking</td>
                <td>24 hours</td>
                <td>Analytics</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 id="manage">4. Managing Cookies</h2>
        <h3>4.1 Browser Settings</h3>
        <p>
          Control cookies via your browser settings. Disabling essential cookies
          may affect functionality.
        </p>
        <ul>
          <li>Chrome: Settings → Privacy and security → Cookies and other site data</li>
          <li>Firefox: Options → Privacy & Security → Cookies and Site Data</li>
          <li>Safari: Preferences → Privacy → Cookies and website data</li>
          <li>Edge: Settings → Cookies and site permissions → Cookies and data stored</li>
        </ul>
        <h3>4.2 Platform Cookie Controls</h3>
        <p>
          Manage non-essential cookies anytime via our{" "}
          <a href="/cookie-preferences">Cookie Settings</a> link in the footer.
        </p>

        <h2 id="protection">5. Data Protection</h2>
        <ul>
          <li>Cookie data is encrypted and secured</li>
          <li>Analytics data is anonymized and aggregated</li>
          <li>No cross-site tracking</li>
          <li>No unauthorized sharing</li>
          <li>Compliant with Indian IT Act</li>
        </ul>

        <h2 id="updates">6. Updates to This Policy</h2>
        <p>We may update this policy; significant changes will be notified in-app or via email.</p>

        <h2 id="contact">7. Contact Us</h2>
        <p>
          Email: <a href="mailto:vardhmansrijan@gmail.com">vardhmansrijan@gmail.com</a><br/>
          Subject: Cookie Policy Inquiry<br/>
          Response within 7 working days
        </p>
      </article>
    </PolicyLayout>
  );
}
