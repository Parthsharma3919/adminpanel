import React from "react";
import "./policies.css";
import PolicyLayout from "./PolicyLayout";

export default function CancellationRefund() {
  return (
    <PolicyLayout title="Cancellation & Refund Policy">
      <p>Last updated: {new Date().toLocaleDateString()}</p>

      <h4>1. Scope</h4>
      <p>
        This policy applies to payments made for our internship enrollment,
        learning plans, and related digital services on VS Foundation.
      </p>

      <h4>2. Cancellations</h4>
      <ul>
        <li>
          <strong>Before program start / access granted:</strong> You can
          request a cancellation within <strong>7 days</strong> of payment if
          course access hasn’t been used (no sessions watched, no materials
          downloaded).
        </li>
        <li>
          <strong>After access is used / certificate issued:</strong>{" "}
          Cancellations aren’t eligible for refund.
        </li>
        <li>
          If a batch is postponed by us for more than 30 days, you may choose a
          full refund or free rescheduling.
        </li>
      </ul>

      <h4>3. Refunds</h4>
      <ul>
        <li>
          Eligible refunds are processed back to the original payment method
          within <strong>5–7 business days</strong> after approval. Your bank
          may take additional time to reflect the credit.
        </li>
        <li>
          <strong>Payment gateway fees, convenience charges, and taxes</strong>{" "}
          (if already remitted) are non-refundable unless the error is on our
          side.
        </li>
        <li>
          If you enrolled via a coupon/discount, the refundable amount cannot
          exceed the net amount paid.
        </li>
      </ul>

      <h4>4. Non-Refundable Situations</h4>
      <ul>
        <li>Change of mind after substantial use of content.</li>
        <li>Violation of the Code of Conduct or academic integrity policy.</li>
        <li>Requests raised beyond the applicable window.</li>
      </ul>

      <h4>5. How to Raise a Request</h4>
      <p>
        Email <a href="mailto:vardhmansrijan@gmail.com">vardhmansrijan@gmail.com</a> with:
      </p>
      <ul>
        <li>Registered name and email</li>
        <li>Payment reference/Order ID</li>
        <li>Reason for cancellation/refund</li>
        <li>Any supporting screenshots</li>
      </ul>

      <h4>6. Special Cases</h4>
      <ul>
        <li>
          Duplicate payment: verified duplicates are fully refunded (gateway
          fees waived).
        </li>
        <li>
          Technical failure on our side that prevents access for more than 72
          hours: pro-rated or full refund based on impact.
        </li>
      </ul>

      <h4>7. Jurisdiction</h4>
      <p>
        Disputes are subject to the laws and courts of India, jurisdiction
        New Delhi.
      </p>
    </PolicyLayout>
  );
}