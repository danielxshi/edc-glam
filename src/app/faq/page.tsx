import Layout from "@/components/legal/layout";
import CategoryNav from "@/components/legal/faq/CategoryNav";
import FAQGroup from "@/components/legal/faq/faqGroup";
import { FAQ_DATA } from "@/components/legal/faq/data/faq";
import LegalBanner from "@/components/banner/legal-banner";

export default function FAQPage() {
  return (
    <Layout>
      <LegalBanner title="Frequently Asked Questions" />
      <div className="grid grid-cols-1 gap-10 md:grid-cols-12 pb-20">
        <aside className="md:col-span-4 lg:col-span-3">
          <CategoryNav sections={FAQ_DATA} stickyOffset={180} />
        </aside>

        <section className="md:col-span-8 lg:col-span-9 space-y-4">
          {FAQ_DATA.map((section) => (
            <FAQGroup key={section.id} section={section} />
          ))}
        </section>
      </div>
    </Layout>
  );
}
