import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      setNewsletterStatus('error');
      setErrorMessage('Please enter an email address.');
      return;
    }
    if (!emailRegex.test(email.trim())) {
      setNewsletterStatus('error');
      setErrorMessage('Please enter a valid email format.');
      return;
    }

    setNewsletterStatus('success');
    setErrorMessage('');
    setEmail('');
  };

  return (
    <footer id="contact" className="bg-[#0B121C] text-[#F8F6F2] pt-16 sm:pt-20 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* Top Tier: Brand, Tagline & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-14 border-b border-stone-800/80">
          
          {/* Brand Col */}
          <div className="lg:col-span-5 text-left">
            <Link
              to="/"
              className="font-serif text-3xl sm:text-4xl tracking-[0.26em] uppercase text-[#FAF8F5] block hover:opacity-90 transition-opacity"
            >
              AURELIS
            </Link>
            <p className="font-serif italic text-base sm:text-lg text-[#C5A880] mt-2 mb-4 font-light">
              Timeless bags. Thoughtful design.
            </p>
            <p className="font-sans text-xs text-stone-400 leading-relaxed max-w-sm">
              Artisanal luxury handbags handcrafted with uncompromising dedication to silhouette, tactile leather, and heirloom durability.
            </p>

            {/* Fictional Contact Info */}
            <div className="mt-6 space-y-2 text-xs font-sans text-stone-400">
              <div className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 text-[#C5A880]" />
                <a href="mailto:hello@aurelis.example" className="hover:text-white transition-colors">
                  hello@aurelis.example
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>+92 300 0000000</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>Clifton, Karachi, Pakistan (fictional demonstration)</span>
              </div>
            </div>
          </div>

          {/* Newsletter Box */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left lg:pl-6">
            <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.24em] text-[#C5A880] mb-2">
              STAY IN THE KNOW
            </h3>
            <p className="font-sans text-xs text-stone-300 mb-5 max-w-md">
              Be the first to discover new collections and exclusive offers.
            </p>

            <form onSubmit={handleSubscribe} className="max-w-md w-full">
              <div className="flex items-stretch border border-stone-700 bg-stone-900/60 focus-within:border-[#C5A880] transition-colors">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (newsletterStatus === 'error') setNewsletterStatus('idle');
                  }}
                  placeholder="Enter your email address"
                  className="w-full bg-transparent px-4 py-3 text-xs tracking-wider text-white placeholder:text-stone-500 focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to newsletter"
                  className="px-5 bg-[#C5A880] text-[#0B121C] hover:bg-[#d6bc96] transition-colors flex items-center justify-center cursor-pointer shrink-0 font-medium"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {newsletterStatus === 'error' && (
                <p className="text-[11px] text-rose-400 mt-2 font-sans">{errorMessage}</p>
              )}

              {newsletterStatus === 'success' && (
                <div className="flex items-center gap-2 text-[11.5px] text-emerald-400 mt-2 font-sans">
                  <Check className="w-3.5 h-3.5" />
                  <span>Thank you for subscribing (Demo simulation mode).</span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Middle Tier: 4 Columns Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-stone-800/80 text-left">
          
          {/* SHOP */}
          <div>
            <h4 className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-[#C5A880] mb-4">
              SHOP
            </h4>
            <ul className="space-y-2.5 text-xs font-sans text-stone-400">
              <li>
                <Link to="/collections" className="hover:text-[#FAF8F5] transition-colors">
                  New In
                </Link>
              </li>
              <li>
                <Link to="/collections" className="hover:text-[#FAF8F5] transition-colors">
                  All Bags
                </Link>
              </li>
              <li>
                <Link to="/collections" className="hover:text-[#FAF8F5] transition-colors">
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link to="/collections" className="hover:text-[#FAF8F5] transition-colors">
                  Gift Cards
                </Link>
              </li>
            </ul>
          </div>

          {/* ABOUT */}
          <div>
            <h4 className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-[#C5A880] mb-4">
              ABOUT
            </h4>
            <ul className="space-y-2.5 text-xs font-sans text-stone-400">
              <li>
                <Link to="/collections" className="hover:text-[#FAF8F5] transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <a href="#craftsmanship" className="hover:text-[#FAF8F5] transition-colors">
                  Craftsmanship
                </a>
              </li>
              <li>
                <a href="#materials" className="hover:text-[#FAF8F5] transition-colors">
                  Materials
                </a>
              </li>
            </ul>
          </div>

          {/* CUSTOMER CARE */}
          <div>
            <h4 className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-[#C5A880] mb-4">
              CUSTOMER CARE
            </h4>
            <ul className="space-y-2.5 text-xs font-sans text-stone-400">
              <li>
                <a href="mailto:hello@aurelis.example" className="hover:text-[#FAF8F5] transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <span className="cursor-default hover:text-[#FAF8F5] transition-colors">Complimentary Shipping</span>
              </li>
              <li>
                <span className="cursor-default hover:text-[#FAF8F5] transition-colors">Easy Returns</span>
              </li>
              <li>
                <span className="cursor-default hover:text-[#FAF8F5] transition-colors">FAQs</span>
              </li>
            </ul>
          </div>

          {/* ATELIER SERVICES */}
          <div>
            <h4 className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-[#C5A880] mb-4">
              ATELIER SERVICES
            </h4>
            <ul className="space-y-2.5 text-xs font-sans text-stone-400">
              <li>
                <span className="cursor-default hover:text-[#FAF8F5] transition-colors">Bespoke Orders</span>
              </li>
              <li>
                <span className="cursor-default hover:text-[#FAF8F5] transition-colors">Personal Assistance</span>
              </li>
              <li>
                <span className="cursor-default hover:text-[#FAF8F5] transition-colors">Boutique Inquiries</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Tier: Demo Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-sans text-stone-500 gap-4">
          <p>© 2026 AURELIS Demo. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Fictional Luxury Showcase</span>
            <span>·</span>
            <span>Demonstration E-commerce</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
