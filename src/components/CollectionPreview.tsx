import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { PRODUCTS, HOMEPAGE_COLLECTION_IDS } from '../data/products';

export const CollectionPreview: React.FC = () => {
  const navigate = useNavigate();

  // Exactly four preview bags as mandated
  const previewProducts = HOMEPAGE_COLLECTION_IDS.map((id) =>
    PRODUCTS.find((p) => p.id === id)
  ).filter((p): p is typeof PRODUCTS[0] => Boolean(p));

  return (
    <section
      id="collections-preview"
      aria-label="AURELIS Timeless Collections"
      className="w-full bg-[#FAF8F5] py-16 sm:py-20 lg:py-28 border-b border-stone-200/80"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-14 gap-4">
          <div>
            <div className="mb-2 sm:mb-3 flex items-center gap-2.5">
              <span className="h-[1px] w-5 bg-[#A27B5C]" aria-hidden="true" />
              <span className="font-sans text-[11px] sm:text-xs font-semibold tracking-[0.28em] uppercase text-[#A27B5C]">
                TIMELESS COLLECTIONS
              </span>
            </div>
            <h2 className="font-serif text-[#131B24] text-3xl sm:text-4xl md:text-5xl font-light tracking-tight">
              Styles That Endure.
            </h2>
          </div>

          <Link
            to="/collections"
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] font-medium text-[#131B24] hover:text-[#A27B5C] transition-colors self-start sm:self-end"
          >
            <span>VIEW ALL COLLECTIONS</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* EXACTLY FOUR Handbag Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6 lg:gap-8">
          {previewProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Centered Button to Navigate to /collections */}
        <div className="mt-12 sm:mt-16 flex justify-center">
          <button
            type="button"
            onClick={() => navigate('/collections')}
            className="group relative inline-flex items-center justify-center px-10 sm:px-12 py-4 text-xs font-medium uppercase tracking-[0.24em] text-white bg-[#131B24] hover:bg-[#1E2836] active:scale-[0.99] transition-all duration-300 shadow-sm cursor-pointer"
          >
            <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5">
              VIEW MORE BAGS
            </span>
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-[#243345] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
          </button>
        </div>

      </div>
    </section>
  );
};
