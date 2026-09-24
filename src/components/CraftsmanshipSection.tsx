import React from 'react';

export const CraftsmanshipSection: React.FC = () => {
  return (
    <section
      id="craftsmanship"
      aria-label="AURELIS Atelier Craftsmanship"
      className="relative w-full bg-[#0E1622] text-[#F8F6F2] overflow-hidden border-b border-stone-800"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row min-h-[500px] lg:min-h-[580px]">
          
          {/* LEFT SIDE: 55% Text Area with Deep Dark Navy Background */}
          <div className="w-full lg:w-[55%] px-8 sm:px-12 lg:px-16 py-16 sm:py-20 lg:py-24 flex flex-col justify-center text-left">
            
            {/* Small label */}
            <div className="mb-4 sm:mb-6 flex items-center gap-3">
              <span className="h-[1px] w-6 bg-[#C5A880]" aria-hidden="true" />
              <span className="font-sans text-[11px] sm:text-xs font-semibold tracking-[0.3em] uppercase text-[#C5A880]">
                CRAFTSMANSHIP
              </span>
            </div>

            {/* Heading in elegant serif */}
            <h2 className="font-serif text-[#FAF8F5] text-3xl sm:text-4xl md:text-5xl lg:text-[3.4rem] font-light leading-[1.08] tracking-tight mb-8">
              Where Craft
              <br />
              Becomes Art.
            </h2>

            {/* Supporting text */}
            <div className="space-y-4 max-w-lg">
              <p className="font-sans text-xs sm:text-sm text-stone-300 leading-relaxed font-normal">
                Every AURELIS bag is a result of thoughtful design, careful detailing, and a passion for timeless craftsmanship.
              </p>
              <p className="font-sans text-xs sm:text-sm text-stone-400 leading-relaxed font-normal">
                Skilled hands, refined techniques, and an uncompromising eye for detail.
              </p>
            </div>

            {/* Atelier Metric Chips */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-10 mt-10 border-t border-stone-800/80">
              <div>
                <p className="font-serif text-2xl sm:text-3xl text-[#FAF8F5] font-light">48+</p>
                <p className="font-sans text-[10.5px] uppercase tracking-[0.2em] text-[#C5A880] mt-1">
                  Hand Assembly Steps
                </p>
              </div>
              <div>
                <p className="font-serif text-2xl sm:text-3xl text-[#FAF8F5] font-light">100%</p>
                <p className="font-sans text-[10.5px] uppercase tracking-[0.2em] text-[#C5A880] mt-1">
                  Full-Grain Leather
                </p>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <p className="font-serif text-2xl sm:text-3xl text-[#FAF8F5] font-light">5-Coat</p>
                <p className="font-sans text-[10.5px] uppercase tracking-[0.2em] text-[#C5A880] mt-1">
                  Lacquered Edges
                </p>
              </div>
            </div>

          </div>

          {/* RIGHT SIDE: 45% Image Area with realistic leather stitching photograph */}
          <div className="w-full lg:w-[45%] relative min-h-[320px] sm:min-h-[420px] lg:min-h-full bg-stone-900 overflow-hidden">
            <img
              src="/src/assets/images/craftsmanship_stitch_1790236606450.jpg"
              alt="Artisan master craftsperson meticulously stitching cognac-brown luxury leather on an atelier sewing machine"
              className="w-full h-full object-cover object-center select-none"
              referrerPolicy="no-referrer"
              loading="lazy"
            />
            {/* Subtle shadow gradient overlay to blend smoothly into the dark navy left container */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#0E1622] via-transparent to-transparent opacity-60"
            />
          </div>

        </div>
      </div>
    </section>
  );
};
