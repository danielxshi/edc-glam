"use client";
import LegalBanner from "@/components/banner/legal-banner";
import Paragraph from "@/components/legal/paragraph";
import Layout from "@/components/legal/layout";

export default function PrivacyPolicy() {
  return (
    <Layout>
      <LegalBanner title="Privacy Policy" />
      <Paragraph
        title="Introduction"
        content="Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you visit our website or use our services."
      />
      <Paragraph
        title="Information We Collect"
        content="We may collect personal information such as your name, email address, phone number, and payment details when you make a purchase or sign up for our newsletter. We also collect non-personal information such as your IP address, browser type, and browsing behavior through cookies and similar technologies."
      />

      <section>
        <h2 className="text-xl font-medium mt-8 mb-4">
          How We Use Your Information
        </h2>
        <ul className="list-disc list-inside space-y-2">
          <li>To provide and improve our services</li>
          <li>To process payments and fulfill orders</li>
          <li>To send you updates, offers, or service notices</li>
          <li>To comply with legal obligations</li>
        </ul>
      </section>

      <Paragraph
        title="Data Security"
        content="We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is completely secure."
      />

      <section>
        <h2 className="text-xl font-medium mt-8 mb-4">Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us
          at{" "}
          <a
            href="mailto:support@example.com"
            className="text-blue-600 underline"
          >
            support@example.com
          </a>
          .
        </p>
      </section>
    </Layout>
  );
}
