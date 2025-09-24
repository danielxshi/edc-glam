'use client'
import LegalBanner from '@/components/banner/legal-banner'
import Paragraph from '@/components/legal/paragraph'
import Layout from '@/components/legal/layout'

export default function TermsOfService() {
  return (
    <Layout>
      <LegalBanner title="Terms of Service" />

      <Paragraph
        title="Acceptance of Terms"
        content="By accessing or using our website and services, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, do not use the website."
      />

      <Paragraph
        title="Eligibility"
        content="You must be at least the age of majority in your jurisdiction to use our services or make purchases. By using the website, you represent that you meet this requirement."
      />

      <Paragraph
        title="Accounts"
        content="You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. Notify us immediately of any unauthorized use."
      />

      <Paragraph
        title="Purchases and Payments"
        content="When you place an order, you agree to provide current, complete, and accurate purchase and account information. Prices are subject to change without notice. We may refuse or cancel orders suspected of fraud or unauthorized activity."
      />

      <Paragraph
        title="Shipping, Returns, and Exchanges"
        content="Shipping timelines and return or exchange eligibility are described on our Shipping Policy and Return & Exchange Policy pages. By purchasing, you acknowledge those policies form part of these Terms."
      />

      <section>
        <h2 className="text-xl font-medium mt-8 mb-4">Prohibited Activities</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Using the site for any unlawful purpose</li>
          <li>Interfering with or circumventing security features</li>
          <li>Copying, distributing, or exploiting site content without permission</li>
          <li>Introducing viruses, bots, or malicious code</li>
          <li>Harassing, abusing, or harming other users</li>
        </ul>
      </section>

      <Paragraph
        title="Intellectual Property"
        content="All content, trademarks, logos, product names, and software on the website are owned by us or our licensors and are protected by applicable intellectual property laws. You may not reproduce, modify, or create derivative works without prior written consent."
      />

      <Paragraph
        title="User Content"
        content="If you submit reviews or other content, you grant us a non-exclusive, worldwide, royalty-free license to use, reproduce, modify, publish, translate, and display such content in connection with the website and our business."
      />

      <Paragraph
        title="Disclaimer of Warranties"
        content="The website and services are provided on an as-is and as-available basis. We disclaim all warranties, express or implied, including merchantability, fitness for a particular purpose, and non-infringement."
      />

      <Paragraph
        title="Limitation of Liability"
        content="To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, arising from your use of the website or services."
      />

      <Paragraph
        title="Indemnification"
        content="You agree to defend, indemnify, and hold us harmless from any claims, damages, liabilities, and expenses arising out of your use of the website, your violation of these Terms, or your violation of any rights of a third party."
      />

      <Paragraph
        title="Changes to These Terms"
        content="We may update these Terms from time to time. Changes are effective when posted to the website. Your continued use after changes are posted constitutes acceptance of the revised Terms."
      />

      <Paragraph
        title="Governing Law"
        content="These Terms are governed by the laws of the jurisdiction of our principal place of business, without regard to conflict of laws principles. Venue for disputes will be exclusively in the courts located in that jurisdiction."
      />

      <section>
        <h2 className="text-xl font-medium mt-8 mb-4">Contact Us</h2>
        <p>
          Questions about these Terms can be sent to{' '}
          <a href="mailto:support@example.com" className="text-blue-600 underline">
            support@example.com
          </a>
          .
        </p>
      </section>
    </Layout>
  )
}
