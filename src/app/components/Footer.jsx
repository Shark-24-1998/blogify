import {  Mail, Phone, MapPin, Github, Twitter, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-white to-gray-50 border-t border-gray-200/60">
      {/* Main Footer Content */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand Section */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
                Blogify
              </span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Creating beautiful, modern web experiences with cutting-edge technology and thoughtful design.
            </p>
            
            {/* Social Media Links */}
            <div className="flex space-x-3">
              <SocialLink href="#" icon={<Twitter size={18} />} />
              <SocialLink href="#" icon={<Github size={18} />} />
              <SocialLink href="#" icon={<Linkedin size={18} />} />
              <SocialLink href="#" icon={<Instagram size={18} />} />
            </div>
          </div>

          {/* Quick Links */}
          <div className="sm:col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <FooterLink href="/" text="Home" />
              <FooterLink href="/about" text="About Us" />
              <FooterLink href="/blog" text="Blog" />
              <FooterLink href="/create-post" text="Create Post" />
            </ul>
          </div>

          {/* Legal */}
          <div className="sm:col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-3">
              <FooterLink href="/privacy" text="Privacy Policy" />
              <FooterLink href="/terms" text="Terms of Service" />
              <FooterLink href="/cookies" text="Cookie Policy" />
              <FooterLink href="/contact" text="Contact" />
            </ul>
          </div>

          {/* Contact Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Get in Touch</h3>
            <div className="space-y-3">
              <ContactItem icon={<Mail size={16} />} text="hello@blogify.com" />
              <ContactItem icon={<Phone size={16} />} text="+1 (555) 123-4567" />
              <ContactItem icon={<MapPin size={16} />} text="San Francisco, CA" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Social Media Link Component
function SocialLink({ href, icon }) {
  return (
    <a
      href={href}
      className="flex items-center justify-center w-9 h-9 text-gray-500 bg-white rounded-full border border-gray-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all duration-200 transform hover:scale-105"
    >
      {icon}
    </a>
  );
}

// Footer Link Component
function FooterLink({ href, text }) {
  return (
    <li>
      <a
        href={href}
        className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm relative group"
      >
        {text}
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
      </a>
    </li>
  );
}

// Contact Info Component
function ContactItem({ icon, text }) {
  return (
    <div className="flex items-center space-x-3 text-sm text-gray-600">
      <div className="flex-shrink-0 text-gray-400">
        {icon}
      </div>
      <span>{text}</span>
    </div>
  );
}