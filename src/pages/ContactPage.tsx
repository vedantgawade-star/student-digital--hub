import React, { useState } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs.tsx';
import { Mail, MessageSquare, Send, CheckCircle2, HelpCircle, MapPin, Clock } from 'lucide-react';

interface ContactPageProps {
  onNavigate: (path: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    university: '',
    topic: 'General Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const faqs = [
    {
      q: 'Can students submit guest articles or case studies?',
      a: 'Yes! We actively welcome guest analyses from university students on topics relating to business analytics, AI toolkits, and student career strategies.'
    },
    {
      q: 'How are articles vetted for editorial and SEO accuracy?',
      a: 'All pieces undergo a two-step peer review: first checking empirical and citation accuracy, followed by an on-page SEO audit ensuring proper heading hierarchy, keyword optimization, and accessibility tags.'
    },
    {
      q: 'Is this website accessible as an open learning resource?',
      a: 'All 10 comprehensive guides are free and publicly accessible without paywalls or restrictive tracking.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12">
      
      {/* Header */}
      <div>
        <Breadcrumbs items={[{ label: 'Contact Desk' }]} onNavigate={onNavigate} />
        
        <div className="mt-4 pb-6 border-b border-stone-200">
          <span className="text-xs uppercase tracking-widest text-stone-500 font-semibold block mb-2">
            Editorial Desk & Support
          </span>
          <h1 className="text-3xl sm:text-5xl font-editorial font-medium text-stone-900 tracking-tight">
            Get in Touch
          </h1>
          <p className="text-base text-stone-600 mt-3 leading-relaxed max-w-2xl">
            Have a question about the SEO methodology, want to recommend a digital student tool, or have feedback on our articles? We would love to hear from you.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        
        {/* Left: Contact Form (md:col-span-7) */}
        <div className="md:col-span-7 bg-white p-6 sm:p-8 border border-stone-200 rounded-xl shadow-2xs">
          {submitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-editorial font-medium text-stone-900">
                Message Dispatched Successfully
              </h3>
              <p className="text-xs text-stone-600 max-w-xs mx-auto leading-relaxed">
                Thank you, <strong>{formData.name}</strong>. Your feedback has been forwarded to the editorial desk. We typically respond within 24 hours.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', university: '', topic: 'General Inquiry', message: '' });
                }}
                className="mt-4 px-4 py-2 text-xs font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-md transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-lg font-editorial font-medium text-stone-900 mb-2">
                Send an Editorial Inquiry
              </h2>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Full Name <span className="text-amber-800">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Henderson"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-300 rounded-md text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Email Address <span className="text-amber-800">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="student@university.edu"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-300 rounded-md text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    University / College
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. University of Mumbai"
                    value={formData.university}
                    onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-300 rounded-md text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Subject Topic
                </label>
                <select
                  value={formData.topic}
                  onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-300 rounded-md text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900 focus:bg-white"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="SEO Project Question">Fundamentals of SEO Course Inquiry</option>
                  <option value="Article Suggestion">Article or Tool Suggestion</option>
                  <option value="Editorial Correction">Editorial Feedback or Correction</option>
                  <option value="Student Collaboration">Student Collaboration / Case Study</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Your Message <span className="text-amber-800">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Type your message, feedback, or question here..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-300 rounded-md text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-900 focus:bg-white resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-md transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Sending message...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Inquiry</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Right: Info & FAQ (md:col-span-5) */}
        <div className="md:col-span-5 space-y-6">
          
          {/* Quick Info Card */}
          <div className="p-6 bg-stone-100 border border-stone-200 rounded-xl space-y-3 text-xs">
            <h3 className="font-semibold text-stone-900 uppercase tracking-wider text-xs">
              Project Headquarters
            </h3>
            
            <div className="space-y-2.5 text-stone-700">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
                <span>Department of Information Systems & Digital Marketing, University Campus</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
                <span>vedantgawade0407@gmail.com</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
                <span>Academic Office Hours: Mon–Fri, 10:00 AM – 5:00 PM</span>
              </div>
            </div>
          </div>

          {/* Quick FAQs */}
          <div className="p-6 bg-white border border-stone-200 rounded-xl space-y-4 text-xs">
            <h3 className="font-semibold text-stone-900 uppercase tracking-wider text-xs flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-amber-700" />
              <span>Frequently Asked Questions</span>
            </h3>

            <div className="space-y-3">
              {faqs.map((faq, idx) => (
                <div key={idx} className="space-y-1 pb-2 border-b border-stone-100 last:border-0 last:pb-0">
                  <h4 className="font-medium text-stone-900">
                    {faq.q}
                  </h4>
                  <p className="text-stone-600 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
