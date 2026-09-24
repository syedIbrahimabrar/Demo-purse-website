import React from 'react';
import { ShieldCheck, Compass, Sparkles, Award } from 'lucide-react';

interface BenefitItem {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  description: string;
}

const BENEFITS: BenefitItem[] = [
  {
    icon: ShieldCheck,
    title: 'PREMIUM MATERIALS',
    description: 'Responsibly selected. Exceptionally refined.'
  },
  {
    icon: Compass,
    title: 'EXPERT CRAFTSMANSHIP',
    description: 'Thoughtfully designed with attention to every detail.'
  },
  {
    icon: Sparkles,
    title: 'TIMELESS DESIGN',
    description: 'Elegant silhouettes that never go out of style.'
  },
  {
    icon: Award,
    title: 'MADE TO LAST',
    description: 'Quality you can see. Durability you can feel.'
  }
];

export const TrustBenefitsStrip: React.FC = () => {
  return (
    <section
      aria-label="AURELIS Maison Values & Benefits"
      className="w-full bg-[#FAF7F2] border-y border-stone-200/80 py-6 sm:py-8 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 divide-stone-200/60 sm:divide-x-0">
          {BENEFITS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`flex items-start gap-4 ${idx !== 0 ? 'pt-4 sm:pt-0' : ''}`}
              >
                <div className="p-2 bg-[#F3EFE9] rounded-none shrink-0 border border-stone-200 text-[#A27B5C]">
                  <Icon className="w-5 h-5 text-[#A27B5C]" strokeWidth={1.4} />
                </div>
                <div>
                  <h3 className="font-sans text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-[#131B24]">
                    {item.title}
                  </h3>
                  <p className="font-sans text-[11px] sm:text-xs text-stone-600 leading-relaxed mt-1">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
