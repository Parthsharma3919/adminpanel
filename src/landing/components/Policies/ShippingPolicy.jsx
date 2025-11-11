import React from "react";
import "./policies.css";
import PolicyLayout from "./PolicyLayout";

export default function ShippingPolicy() {
  return (
    <PolicyLayout title="Shipping & Delivery Policy">
      <p>Last updated: {new Date().toLocaleDateString()}</p>

      <h4>1. Nature of Service</h4>
      <p>
        VS Foundation provides <strong>digital</strong> programs and
        certifications. No physical goods are shipped by default.
      </p>

      <h4>2. Digital Delivery</h4>
      <ul>
        <li>
          Access to the learning dashboard is granted immediately after
          successful payment and account verification.
        </li>
        <li>
          Digital certificates are issued via the portal and/or email within{" "}
          <strong>3–10 business days</strong> after successful completion and
          evaluation.
        </li>
        <li>
          If you don’t receive access or a certificate in the expected window,
          email <a href="mailto:vardhmansrijan@gmail.com">vardhmansrijan@gmail.com</a> with your Order ID.
        </li>
      </ul>

      <h4>3. Physical Shipments (If Applicable)</h4>
      <ul>
        <li>
          If you opt for a printed certificate or kit, shipping fees and
          timelines will be shown at checkout.
        </li>
        <li>
          Typical delivery time within India: <strong>5–10 business days</strong> after dispatch.
        </li>
        <li>
          We’ll share a tracking ID via email/SMS once dispatched.
        </li>
      </ul>

      <h4>4. Undeliverable / Delayed</h4>
      <ul>
        <li>
          Incorrect address, missed delivery, or unavailability may lead to
          re-delivery charges.
        </li>
        <li>
          Delays due to courier or force majeure are outside our control, but
          we’ll assist with escalation.
        </li>
      </ul>

      <h4>5. Contact</h4>
      <p>
        For delivery questions, reach us at{" "}
        <a href="mailto:vardhmansrijan@gmail.com">vardhmansrijan@gmail.com</a> or
        helpline +91-9060155550.
      </p>
    </PolicyLayout>
  );
}