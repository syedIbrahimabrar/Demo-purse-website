import React, { useState } from 'react';
import { ArrowRight, Sparkles, Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import materialsLeatherMacro from '../assets/images/materials_leather_macro_1790236625928.jpg';

export const MaterialsSection: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section
        id="materials"
        aria-label="AURELIS Material Stories"
        className="relative w-full bg-[#FAF8F5] border-b border-stone-200/80 py-16 sm:py-20 lg:py-28 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 xl:gap-20">
            
            {/* LEFT SIDE: 45% Visual Area showcasing rich leather texture */}
            <div className="w-full lg:w-[46%] xl:w-[45%]">
              <div className="relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-square w-full rounded-none overflow-hidden shadow-sm border border-stone-200/90 bg-[#EFECE6] group">
                
                {/* Warm cognac leather-inspired visual atmosphere */}
                <img
                  src={materialsLeatherMacro}
                  alt="AURELIS tactile cognac leather grain and polished gold hardware"
                  className="w-full h-full object-cover select-none transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />

                {/* Subtle warm luxury vignette */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-tr from-[#241711]/30 via-transparent to-[#FDFBF7]/20 pointer-events-none"
                />

                {/* Refined corner caption badge */}
                <div className="absolute bottom-4 left-4 z-20 bg-white/90 backdrop-blur-sm px-3.5 py-1.5 border border-stone-200/60 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#A27B5C]" />
                  <span className="font-sans text-[10.5px] uppercase tracking-[0.2em] font-medium text-[#131B24]">
                    Vegetable-Tanned Finish
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: Material Stories Editorial Content */}
            <div className="w-full lg:w-[54%] xl:w-[55%] flex flex-col items-start text-left lg:pl-4">
              
              {/* Small eyebrow label */}
              <div className="mb-3 sm:mb-4 flex items-center gap-2.5">
                <span className="h-[1px] w-6 bg-[#A27B5C]" aria-hidden="true" />
                <span className="font-sans text-[11px] sm:text-xs font-semibold tracking-[0.28em] uppercase text-[#A27B5C]">
                  MATERIAL STORIES
                </span>
              </div>

              {/* Main heading in refined luxury serif font */}
              <h2 className="font-serif text-[#131B24] text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-light leading-[1.12] tracking-tight">
                The Finest Materials.
                <br />
                Beautifully Chosen.
              </h2>

              {/* Body text */}
              <p className="font-sans text-xs sm:text-sm md:text-[14px] text-stone-600 leading-relaxed max-w-xl mt-6 sm:mt-8 mb-8 sm:mb-10 font-normal">
                From supple vegan leather to carefully selected textures, every AURELIS bag is thoughtfully designed with attention to detail, timeless beauty, and everyday elegance.
              </p>

              {/* Editorial Feature Bullets */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg mb-8 sm:mb-10 pt-4 border-t border-stone-200">
                <div className="flex items-start gap-2.5 text-xs text-[#131B24]">
                  <Check className="w-4 h-4 text-[#A27B5C] shrink-0 mt-0.5" />
                  <span>Full-grain leather with natural grain retention</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-[#131B24]">
                  <Check className="w-4 h-4 text-[#A27B5C] shrink-0 mt-0.5" />
                  <span>Solid brass hardware with micro-lacquer</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-[#131B24]">
                  <Check className="w-4 h-4 text-[#A27B5C] shrink-0 mt-0.5" />
                  <span>Microfiber velvet interior lining</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-[#131B24]">
                  <Check className="w-4 h-4 text-[#A27B5C] shrink-0 mt-0.5" />
                  <span>Hand-burnished five-coat lacquer edges</span>
                </div>
              </div>

              {/* Discover Our Materials Button with small arrow icon */}
              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  className="group inline-flex items-center gap-3 px-7 sm:px-8 py-4 bg-[#131B24] text-white text-xs uppercase tracking-[0.22em] font-medium hover:bg-[#1E2836] active:scale-[0.99] transition-all cursor-pointer shadow-sm"
                >
                  <span>DISCOVER OUR MATERIALS</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>

                <Link
                  to="/collections"
                  className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-[#131B24] font-medium py-3 px-4 hover:underline"
                >
                  View Collection
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Materials Atelier Detail Dialog */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-[#FAF8F5] max-w-2xl w-full p-8 sm:p-10 border border-stone-200 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="absolute top-6 right-6 text-stone-400 hover:text-[#131B24]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="font-sans text-xs tracking-[0.24em] uppercase text-[#A27B5C] font-semibold">
                AURELIS Sourcing Standard
              </span>
              <h3 className="font-serif text-3xl text-[#131B24] mt-1">
                The Heritage of Pure Textures
              </h3>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-stone-600 leading-relaxed font-sans mb-8">
              <p>
                Every skin and textile selected for an AURELIS handbag undergoes rigorous testing for suppleness, tensile resistance, and tactile warmth. We partner with historic tanneries in Tuscany and Northern Italy adhering strictly to ISO 14001 environmental protocols.
              </p>
              <p>
                Our metal hardware—from turn-lock clasps to curb link chains—is custom-cast in solid brass and coated with an electrolytic micro-lacquer that prevents tarnishing, ensuring that the hardware ages gracefully alongside the patina of the leather.
              </p>
            </div>

            <div className="border-t border-stone-200 pt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-6 py-3 bg-[#131B24] text-white text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#1E2836]"
              >
                Close Story
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
