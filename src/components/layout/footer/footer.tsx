"use client";

import FooterMessages from "./FooterItems";
import Link from "next/link";
import React from "react";
import styles from "./footer.module.scss";

type ContactItem = { text: string; link: string };
type EducationItem = { school: string; certification?: string; reward?: string };
type ExperienceItem = { company: string; position?: string; date?: string };
type SocialItem = { url: string; link: string };

type FooterItem = {
  contact?: { link: ContactItem[] };
  education?: { link: EducationItem[] };
  experience?: { link: ExperienceItem[] };
  socials?: { link: SocialItem[] };
};

export const renderSwitch = (params: FooterItem) => {
  if ("contact" in params && params.contact) {
    return (
      <div className="footer-contact-container mb-6 md:mb-0 footer-subobject-container">
        <h3 className="mb-4">Contact Us</h3>
        <ul>
          {params.contact.link.map((item, index) => (
            <li className="underscore-cta" key={index}>
              <Link href="mailto:danielxshi@hotmail.com">email</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if ("education" in params && params.education) {
    return (
      <div className="education-container mb-6 md:mb-0 footer-subobject-container">
        <h3 className="mb-8">Collections</h3>
        <ul>
          {params.education.link.map((item, index) => (
            <li className="mb-2" key={index}>
              <p className="whitespace-nowrap">{item.school}</p>
              {item.certification && (
                <p className="opacity-50">{item.certification}</p>
              )}
              {item.reward && (
                <p className="opacity-50 text-base">{item.reward}</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if ("experience" in params && params.experience) {
    return (
      <div className="experience-container mb-6 md:mb-0 footer-subobject-container">
        <h3 className="mb-8">Legal Notices</h3>
        <ul>
          {params.experience.link.map((item, index) => (
            <li className="mb-2" key={index}>
              <p className="md:whitespace-nowrap">{item.company}</p>
              {item.position && (
                <p className="md:whitespace-nowrap opacity-50">
                  {item.position}
                </p>
              )}
              {item.date && (
                <p className="whitespace-nowrap opacity-50">{item.date}</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if ("socials" in params && params.socials) {
    return (
      <div className="social-container mb-6 md:mb-0 footer-subobject-container">
        <h3 className="mb-8">Social</h3>
        <ul>
          {params.socials.link.map((item, index) => (
            <li className="underscore-cta" key={index}>
              <a href={item.url}>{item.link}</a>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return null;
};

const Footer: React.FC = () => {
  return (
    <footer className="px-8 pb-8">
      <div className="footer-container gap-x-8">
        {FooterMessages.FooterItems.map((item, index) => (
          <React.Fragment key={index}>{renderSwitch(item)}</React.Fragment>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
