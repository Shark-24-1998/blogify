import {
  FaCogs,
  FaRocket,
  FaChartLine,
  FaChartPie,
  FaProjectDiagram,
  FaSyncAlt,
} from "react-icons/fa";

const features = [
  { icon: FaCogs, label: "Above-And-Beyond Account Management", color: "bg-yellow-100 text-yellow-600" },
  { icon: FaRocket, label: "Publish-Ready Articles", color: "bg-purple-100 text-purple-600" },
  { icon: FaChartLine, label: "Data-Driven Strategy", color: "bg-blue-100 text-blue-600" },
  { icon: FaChartPie, label: "Analytics, Graphics & More", color: "bg-sky-100 text-sky-600" },
  { icon: FaProjectDiagram, label: "Bespoke Workflows and Tailored Solutions", color: "bg-green-100 text-green-600" },
  { icon: FaSyncAlt, label: "Content Update", color: "bg-pink-100 text-pink-600" },
];

export default function TrustPartner() {
  return (
    <section className="bg-white py-10 sm:py-12 md:py-16 lg:py-20">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Features */}
          <div className="relative order-2 lg:order-1">
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
              {/* Background Circle */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 bg-gray-100 rounded-full opacity-30"></div>
              </div>
              
              {features.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="relative z-10 bg-white shadow-sm p-3 sm:p-4 rounded-xl flex items-center gap-2 sm:gap-3 transform transition-transform hover:scale-105 hover:shadow-md"
                  >
                    <div className={`p-1.5 sm:p-2 rounded-full ${item.color}`}>
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-gray-700">
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Text */}
          <div className="text-center lg:text-left order-1 lg:order-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 leading-snug">
              Everything you need from{" "}
              <span className="lg:block">one trusted partner</span>
            </h2>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-lg mx-auto lg:mx-0">
              Tailored to your unique goals and needs, our comprehensive
              solutions include SEO content strategy, topic-expert writing,
              professional editing, performance monitoring, content updates, and
              more.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}