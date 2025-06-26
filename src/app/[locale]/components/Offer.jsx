// components/WhatWeOfferSection.js
import {
  FaRegCalendarCheck,
  FaPenFancy,
  FaSync,
  FaFileImport,
  FaUserEdit,
  FaGlobeEurope,
} from "react-icons/fa";

const services = [
  {
    title: "Content Strategy & Planning",
    desc: "Data-driven SEO content strategy for long-term, sustainable growth—specific to your audience and goals and complete with thorough article briefs.",
    icon: FaRegCalendarCheck,
    color: "from-purple-100 to-purple-50 text-purple-600",
  },
  {
    title: "Content Production",
    desc: "Professionally edited articles written by subject-matter experts with topic-relevant qualifications and years of experience in their domain.",
    icon: FaPenFancy,
    color: "from-blue-100 to-blue-50 text-blue-600",
  },
  {
    title: "Content Updates",
    desc: "Keep content fresh with regular updates to core pages and maximise ROI. Scheduled optimally by monitoring performance.",
    icon: FaSync,
    color: "from-yellow-100 to-yellow-50 text-yellow-600",
  },
  {
    title: "Content Migration",
    desc: "Transferring thousands of articles from one CMS to another? We’ve migrated content for major global brands.",
    icon: FaFileImport,
    color: "from-indigo-100 to-indigo-50 text-indigo-600",
  },
  {
    title: "Writer Deployment",
    desc: "Go direct. Hire topic-expert writers on your own terms. Easy to start, pause, or end as needed.",
    icon: FaUserEdit,
    color: "from-pink-100 to-pink-50 text-pink-600",
  },
  {
    title: "Localisation & Translation",
    desc: "Repurpose your content for multiple regions and languages with expert multi-language content teams.",
    icon: FaGlobeEurope,
    color: "from-green-100 to-green-50 text-green-600",
  },
];

export default function Offer() {
  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-7xl mx-auto text-center mb-12 px-4">
        <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-[#1c1c1c]">
          What do we offer?
        </h2>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {services.map((service, idx) => {
          const Icon = service.icon;
          return (
            <div
              key={idx}
              className={`bg-gradient-to-br ${service.color} p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200`}
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white shadow mb-4">
                <Icon className="text-xl" />
              </div>
              <h3 className="text-lg font-semibold text-[#1c1c1c] mb-2">{service.title}</h3>
              <p className="text-sm text-gray-700">{service.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
