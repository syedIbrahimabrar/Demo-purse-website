import React from 'react';
import { Truck, RotateCcw } from 'lucide-react';

export const ServiceAssuranceStrip: React.FC = () => {
  return (
    <section className="w-full bg-[#FAF8F5] border-b border-stone-200/80 py-8">
      <div className="max-w-4xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-12 justify-center items-center text-center sm:text-left divide-y sm:divide-y-0 sm:divide-x divide-stone-200">
          
          {/* Complimentary Shipping */}
          <div className="flex items-center justify-center sm:justify-start gap-4">
            <div className="p-2.5 bg-[#F2EDE5] text-[#A27B5C] border border-stone-200">
              <Truck className="w-5 h-5" strokeWidth={1.4} />
            </div>
            <div className="text-left">
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#131B24]">
                COMPLIMENTARY SHIPPING
              </p>
              <p className="font-sans text-[11px] text-stone-500 mt-0.5">
                On all orders worldwide
              </p>
            </div>
          </div>

          {/* Easy Return */}
          <div className="flex items-center justify-center sm:justify-start gap-4 pt-4 sm:pt-0 sm:pl-12">
            <div className="p-2.5 bg-[#F2EDE5] text-[#A27B5C] border border-stone-200">
              <RotateCcw className="w-5 h-5" strokeWidth={1.4} />
            </div>
            <div className="text-left">
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#131B24]">
                EASY RETURN
              </p>
              <p className="font-sans text-[11px] text-stone-500 mt-0.5">
                30-day effortless return policy
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
