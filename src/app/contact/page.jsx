"use client";
import { useState } from "react";
import { Send, CheckCircle, User, Mail, Phone, MessageSquare } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    query: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Form data submitted:", formData);
      setIsSubmitted(true);
      setIsLoading(false);

      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          contact: "",
          query: "",
        });
        setIsSubmitted(false);
      }, 3000);
    }, 1000);
  };

  return (
    <div className=" min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8 mt-10">
      <div className="max-w-2xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Get in <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">Touch</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-lg mx-auto">
            {`Have a question or want to work together? We'd love to hear from you. 
            Send us a message and we'll respond as soon as possible.`}
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 lg:p-10">
          {/* Success Message */}
          {isSubmitted && (
            <div className="mb-8 p-4 rounded-xl bg-green-50 border border-green-200 flex items-center space-x-3">
              <CheckCircle className="text-green-600" size={20} />
              <p className="text-green-800 font-medium">
                {`Thank you for your message! We'll be in touch soon.`}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div className="space-y-2">
              <label htmlFor="name" className="flex items-center text-sm font-semibold text-gray-700">
                <User size={16} className="mr-2 text-gray-500" />
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-400"
              />
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="flex items-center text-sm font-semibold text-gray-700">
                <Mail size={16} className="mr-2 text-gray-500" />
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email address"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-400"
              />
            </div>

            {/* Contact Field */}
            <div className="space-y-2">
              <label htmlFor="contact" className="flex items-center text-sm font-semibold text-gray-700">
                <Phone size={16} className="mr-2 text-gray-500" />
                Phone Number
              </label>
              <input
                type="tel"
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                required
                placeholder="Enter your contact number"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-400"
              />
            </div>

            {/* Query Field */}
            <div className="space-y-2">
              <label htmlFor="query" className="flex items-center text-sm font-semibold text-gray-700">
                <MessageSquare size={16} className="mr-2 text-gray-500" />
                Your Message
              </label>
              <textarea
                id="query"
                name="query"
                value={formData.query}
                onChange={handleChange}
                required
                rows="5"
                placeholder="Tell us about your inquiry..."
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-400 resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || isSubmitted}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send size={18} />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>

          {/* Additional Info */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="flex flex-col items-center p-4 rounded-lg bg-gray-50">
                <Mail size={20} className="text-blue-600 mb-2" />
                <p className="text-sm font-medium text-gray-900">Email</p>
                <p className="text-xs text-gray-600">hello@blogify.com</p>
              </div>
              <div className="flex flex-col items-center p-4 rounded-lg bg-gray-50">
                <Phone size={20} className="text-blue-600 mb-2" />
                <p className="text-sm font-medium text-gray-900">Phone</p>
                <p className="text-xs text-gray-600">+1 (555) 123-4567</p>
              </div>
              <div className="flex flex-col items-center p-4 rounded-lg bg-gray-50">
                <MessageSquare size={20} className="text-blue-600 mb-2" />
                <p className="text-sm font-medium text-gray-900">Response</p>
                <p className="text-xs text-gray-600">Within 24 hours</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}