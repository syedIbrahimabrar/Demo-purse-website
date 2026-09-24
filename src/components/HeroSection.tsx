import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { useNavigate } from 'react-router-dom';

interface HeroSectionProps {
  onExplore?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExplore }) => {
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleExploreClick = () => {
    if (onExplore) {
      onExplore();
    } else {
      navigate('/collections');
    }
  };

  return (
    <section
      id="hero"
      aria-label="AURELIS Luxury Handbag Hero Showcase"
      className="relative w-full min-h-[92vh] md:min-h-screen flex flex-col justify-between overflow-hidden bg-[#F8F6F2]"
    >
      {/* 1. Full-Width Approved Gallery Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-none bg-[#EFECE6]">
        <img
          src="/image.png"
          alt="AURELIS Gallery Showroom Interior with Pedestal"
          className="w-full h-full object-cover object-[58%_center] sm:object-[56%_center] md:object-[57%_center] lg:object-center"
          referrerPolicy="no-referrer"
          loading="eager"
        />
        {/* Subtle architectural gradient scrim on mobile to guarantee typography legibility */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#F8F6F2]/50 via-[#F8F6F2]/20 to-transparent md:bg-none"
        />
      </div>

      {/* Top Navigation Bar */}
      <Navbar onExploreClick={handleExploreClick} />

      {/* 2. Hero Text Container — Positioned on the LEFT side with refined spacing */}
      <div className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex items-center">
        <div className="w-full md:w-[48%] lg:w-[44%] xl:w-[40%] pt-10 sm:pt-14 md:pt-12 lg:pt-14 pb-16 sm:pb-20 md:pb-14 text-left">
          
          {/* Small brand name */}
          <div className="mb-4 sm:mb-6 flex items-center gap-3">
            <span className="font-sans text-[11px] sm:text-xs font-semibold tracking-[0.32em] uppercase text-[#131B24]/75">
              AURELIS
            </span>
          </div>

          {/* Main heading in refined luxury serif font */}
          <h1 className="font-serif text-[#131B24] text-4xl sm:text-5xl md:text-6xl lg:text-[4.35rem] xl:text-[4.75rem] font-light leading-[1.06] tracking-[-0.015em] text-balance">
            <span>Designed</span>
            <br />
            <span>To Stay</span>
            <br />
            <span>Beautiful.</span>
          </h1>

          {/* Subtitle in clean uppercase sans-serif with generous letter-spacing */}
          <p className="font-sans text-[11px] sm:text-xs md:text-[12.5px] font-medium tracking-[0.2em] sm:tracking-[0.24em] uppercase text-[#1E2630]/85 leading-relaxed mt-6 sm:mt-8 md:mt-10 mb-8 sm:mb-10 max-w-md">
            TIMELESS BAGS. THOUGHTFUL DESIGN.
            <br className="hidden sm:inline" />
            {' '}MADE FOR A LIFETIME.
          </p>

          {/* Single elegant button */}
          <div className="relative inline-block">
            <button
              type="button"
              onClick={handleExploreClick}
              className="group relative inline-flex items-center justify-center px-8 sm:px-10 py-4 text-xs font-medium uppercase tracking-[0.24em] text-white bg-[#131B24] hover:bg-[#1E2836] active:scale-[0.99] transition-all duration-300 shadow-sm cursor-pointer whitespace-nowrap"
            >
              <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5">
                EXPLORE COLLECTIONS
              </span>
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-[#253342] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </button>

            {/* Subtle feedback toast */}
            {feedbackMessage && (
              <div
                role="status"
                aria-live="polite"
                className="absolute left-0 top-full mt-3 p-3 bg-white/95 backdrop-blur-sm border border-stone-200/80 shadow-md rounded-none text-[11px] font-sans tracking-wide text-[#131B24] w-72 z-30 animate-in fade-in slide-in-from-top-1 duration-200"
              >
                {feedbackMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
