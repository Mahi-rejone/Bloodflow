import Link from "next/link";
import { Droplet, MapPin, Phone, Mail } from "lucide-react";

// lucide-react v1 dropped brand/logo icons, so social icons are inline SVGs
function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.9 2H22l-7.6 8.7L23.3 22h-7.1l-5.6-7.3L4.2 22H1l8.1-9.3L.9 2H8l5 6.6L18.9 2Zm-1.2 18.2h1.9L6.4 3.7H4.4l13.3 16.5Z" />
    </svg>
  );
}

const quickLinks = [
  { label: "Find Donors", href: "/donors" },
  { label: "Donation Camps", href: "/camps" },
  { label: "Blood Banks", href: "/blood-banks" },
  { label: "Become a Donor", href: "/register" },
];

const support = [
  { label: "My Account", href: "user/profile" },
  { label: "Privacy Policy", href: "/privacy&policy" },
  { label: "Terms of Service", href: "/terms_of_sevice" },
  { label: "Eligibility Guide", href: "/eligibility" },
  { label: "Help Center", href: "/help" },
];

export default function Footer() {
  return (
    <footer className="w-full bg-app-text text-white">
      <div className="mx-auto max-w-360 px-8 py-16 lg:px-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-16">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <Droplet
                className="h-6 w-6 text-app-primary"
                fill="currentColor"
                strokeWidth={0}
              />
              <span className="text-lg font-bold">BloodFlow</span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-white/60">
              Connecting willing donors with people in need, one drop at a time.
              Every donation is a chance to save a life.
            </p>
            <div className="mt-5 flex gap-3">
              {[FacebookIcon, XIcon, InstagramIcon].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition hover:bg-app-primary"
                >
                  <Icon className="h-4 w-4" width={16} height={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/50">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              {quickLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-white/70 transition hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/50">
              Support
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              {support.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-white/70 transition hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/50">
              Contact Us
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-app-primary" />
                <span>Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-app-primary" />
                <span>+880 1XXX-XXXXXX</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-app-primary" />
                <span>support@bloodflow.app</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} BloodFlow. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
