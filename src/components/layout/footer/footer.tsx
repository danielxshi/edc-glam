"use client";

import FooterMessages from "./FooterItems";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import SignupBanner from "@/components/signup-banner";

type EducationItem = {
  school: string;
  certification?: string;
  reward?: string;
};
type ExperienceItem = { company: string; position?: string; date?: string };
type SocialItem = { url: string; link: string };

type FooterItem = {
  education?: { link: EducationItem[] };
  experience?: { link: ExperienceItem[] };
  socials?: { link: SocialItem[] };
};

export const renderSwitch = (params: FooterItem) => {
  if ("education" in params && params.education) {
    // Collections can be long → split into 4 sub-columns on lg
    return (
      <div className="education-container footer-subobject-container">
        <h3 className="mb-4">Collections</h3>
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-2">
          {params.education.link.map((item, index) => (
            <li className="mb-1" key={index}>
              <p>{item.school}</p>
              {item.certification && (
                <p className="opacity-50">{item.certification}</p>
              )}
              {item.reward && <p className="opacity-50">{item.reward}</p>}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if ("experience" in params && params.experience) {
    // Legal might also be long → split into 4 sub-columns on lg
    return (
      <div className="experience-container footer-subobject-container">
        <h3 className="mb-4">Legal Notices</h3>
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-2">
          {params.experience.link.map((item, index) => (
            <li className="mb-1" key={index}>
              <p>{item.company}</p>
              {item.position && <p className="opacity-50">{item.position}</p>}
              {item.date && <p className="opacity-50">{item.date}</p>}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if ("socials" in params && params.socials) {
    return (
      <div className="social-container footer-subobject-container">
        <h3 className="mb-4">Social</h3>
        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-2">
          {params.socials.link.map((item, index) => (
            <li className="mb-1" key={index}>
              <p>{item.link}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return null;
};

const Footer: React.FC = () => {
  const pathname = usePathname();

  // Hide footer on /password
  if (pathname === "/password") {
    return null;
  }

  // Ensure four columns at lg and nice stacking below
  return (
    <footer className="px-4 py-4 bg-[#eeeeee] text-[#33383CFF]">
      <div className="footer-container bg-white px-6 py-8 rounded-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <SignupBanner />
        {FooterMessages.FooterItems.map((item, index) => (
          <React.Fragment key={index}>{renderSwitch(item)}</React.Fragment>
        ))}
        <div className="w-full items-center justify-center text-center pt-8 mt-8 border-t border-neutral-200">
          <small>Copyright EDC&GLAM</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
