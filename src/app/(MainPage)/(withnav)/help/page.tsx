import type { Metadata } from "next";
import Link from "next/link";
import {
  FaSearch,
  FaQuestionCircle,
  FaEnvelope,
  FaPhone,
  FaComments,
  FaUserPlus,
  FaUserCheck,
  FaSearchPlus,
  FaHandsHelping,
  FaShieldAlt,
  FaFileAlt,
  FaUserCog,
  FaHeartbeat,
  FaClinicMedical,
  FaMapMarkerAlt,
  FaClock,
  FaExclamationTriangle,
  FaLock,
  FaMobileAlt,
  FaGlobe,
  FaBell,
  FaDownload,
} from "react-icons/fa";

export const metadata: Metadata = {
  title: "Help Center | BloodFlow",
  description:
    "Find answers to common questions about BloodFlow - the blood donation management platform.",
};

// FAQ Data
const faqs = [
  {
    category: "Getting Started",
    icon: FaUserPlus,
    questions: [
      {
        q: "How do I create an account?",
        a: "Click the 'Sign Up' button in the top right corner. Fill in your name, email, and create a password. Verify your email address, and you're ready to go!",
      },
      {
        q: "How do I find blood donors near me?",
        a: "After logging in, use the search bar to filter donors by blood group and location. The map view shows available donors in your area.",
      },
      {
        q: "Is BloodFlow free to use?",
        a: "Yes! BloodFlow is completely free for both donors and recipients. We believe in saving lives without barriers.",
      },
    ],
  },
  {
    category: "Donor Features",
    icon: FaHandsHelping,
    questions: [
      {
        q: "How do I register as a donor?",
        a: "Go to your dashboard and click 'Become a Donor'. Fill in your blood type, availability, and location details. You can update your status anytime.",
      },
      {
        q: "How do I update my availability?",
        a: "In your donor profile, toggle the 'Available to Donate' switch. You can also set specific days and times when you're available.",
      },
      {
        q: "What happens when someone needs my blood?",
        a: "You'll receive a notification via email and in-app alert. You can accept or decline the request based on your current availability.",
      },
      {
        q: "Can I track my donation history?",
        a: "Yes! Your dashboard includes a donation history section showing all your past donations, including dates and recipient details.",
      },
    ],
  },
  {
    category: "Recipient Features",
    icon: FaHeartbeat,
    questions: [
      {
        q: "How do I request blood?",
        a: "Log in, click 'Request Blood' from your dashboard. Fill in the required blood type, quantity, and urgency level. Hospitals can also make requests for patients.",
      },
      {
        q: "What information do I need to provide?",
        a: "You'll need to provide the required blood group, number of units needed, location, urgency level, and any special notes about the patient.",
      },
      {
        q: "How quickly will I find a donor?",
        a: "Response times vary based on blood group availability and location. On average, requests get matched within 2-4 hours.",
      },
      {
        q: "Can I track my request status?",
        a: "Yes! You'll receive real-time updates on your request status: Pending → Matched → Accepted → Completed.",
      },
    ],
  },
  {
    category: "Account & Security",
    icon: FaShieldAlt,
    questions: [
      {
        q: "How do I reset my password?",
        a: "Click 'Forgot Password' on the login page. We'll send a password reset link to your registered email address.",
      },
      {
        q: "How do I update my profile information?",
        a: "Go to Settings > Profile. You can update your name, email, phone number, and location details there.",
      },
      {
        q: "Is my personal information safe?",
        a: "Absolutely! We use industry-standard encryption, secure servers, and strict privacy policies to protect your data.",
      },
      {
        q: "How do I delete my account?",
        a: "Contact our support team at help@bloodflow.com with your account details, and we'll assist you with the deletion process.",
      },
    ],
  },
];

// Quick Help Topics
const quickHelpTopics = [
  { icon: FaUserPlus, label: "How to Register", href: "/help/register" },
  { icon: FaSearchPlus, label: "Finding Donors", href: "/help/find-donors" },
  { icon: FaHandsHelping, label: "Donor Guide", href: "/help/donor-guide" },
  {
    icon: FaClinicMedical,
    label: "Hospital Requests",
    href: "/help/hospital-requests",
  },
  { icon: FaFileAlt, label: "Privacy Policy", href: "/privacy" },
  { icon: FaUserCog, label: "Account Settings", href: "/settings" },
];

// Support Options
const supportOptions = [
  {
    icon: FaEnvelope,
    title: "Email Support",
    description: "Get help via email",
    action: "help@bloodflow.com",
    href: "mailto:help@bloodflow.com",
    badge: "24-48 hours",
  },
  {
    icon: FaComments,
    title: "Live Chat",
    description: "Chat with our support team",
    action: "Start Chat",
    href: "#chat",
    badge: "Available 24/7",
  },
  {
    icon: FaPhone,
    title: "Phone Support",
    description: "Speak with a representative",
    action: "+1 (555) 123-4567",
    href: "tel:+15551234567",
    badge: "Mon-Fri, 9 AM - 6 PM",
  },
];

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <FaQuestionCircle className="text-5xl mx-auto mb-4 opacity-80" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            How can we help you?
          </h1>
          <p className="text-lg text-red-100 max-w-2xl mx-auto">
            Find answers to common questions or get in touch with our support
            team.
          </p>

          {/* Search Bar */}
          <div className="mt-8 max-w-2xl mx-auto">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search for help articles, topics, or questions..."
                className="w-full pl-12 pr-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-red-100 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Help Topics */}
      <section className="max-w-6xl mx-auto px-4 -mt-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickHelpTopics.map((topic, index) => (
            <Link
              key={index}
              href={topic.href}
              className="bg-white rounded-xl shadow-md p-4 text-center hover:shadow-lg transition-all hover:-translate-y-1"
            >
              <topic.icon className="text-2xl text-red-500 mx-auto mb-2" />
              <span className="text-sm font-medium text-gray-700">
                {topic.label}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Quick answers to the most common questions about BloodFlow
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-red-50 rounded-lg">
                  <faq.icon className="text-red-500 text-xl" />
                </div>
                <h3 className="text-lg font-semibold">{faq.category}</h3>
              </div>
              <div className="space-y-4">
                {faq.questions.map((item, idx) => (
                  <details key={idx} className="group">
                    <summary className="flex justify-between items-center cursor-pointer text-sm font-medium text-gray-800 hover:text-red-600 transition-colors">
                      <span>{item.q}</span>
                      <span className="text-gray-400 group-open:rotate-180 transition-transform">
                        ▼
                      </span>
                    </summary>
                    <p className="mt-2 text-sm text-gray-600 pl-0 border-l-2 border-red-400 pl-3">
                      {item.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Support Options */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">
            Still need help?
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Choose the support option that works best for you
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {supportOptions.map((option, index) => (
              <a
                key={index}
                href={option.href}
                className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="inline-flex p-3 bg-red-50 rounded-full mb-4">
                  <option.icon className="text-2xl text-red-500" />
                </div>
                <h3 className="font-semibold text-gray-800">{option.title}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  {option.description}
                </p>
                <span className="inline-block mt-2 text-sm font-medium text-red-600 hover:underline">
                  {option.action}
                </span>
                <div className="mt-2">
                  <span className="inline-block text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    {option.badge}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
