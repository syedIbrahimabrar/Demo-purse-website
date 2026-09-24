import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { PRODUCTS } from '../data/products';
import { ProductCategory } from '../types/product';

type SortOption = 'featured' | 'price-asc' | 'price-desc';

const CATEGORIES: { label: string; value: 'all' | ProductCategory }[] = [
  { label: 'ALL BAGS', value: 'all' },
  { label: 'TOTE BAGS', value: 'tote' },
  { label: 'SHOULDER BAGS', value: 'shoulder' },
  { label: 'CROSSBODY', value: 'crossbody' },
  { label: 'MINI BAGS', value: 'mini' }
];

export const CollectionsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | ProductCategory>('all');
  const [sortOption, setSortOption] = useState<SortOption>('featured');

  // Filter and sort products
  const displayedProducts = useMemo(() => {
    let list = [...PRODUCTS];

    if (selectedCategory !== 'all') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    if (sortOption === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    }

    return list;
  }, [selectedCategory, sortOption]);

  return (
    <div className="w-full bg-[#FAF8F5] min-h-screen">
      
      {/* Compact Editorial Banner */}
      <div className="w-full bg-[#F2EDE4] border-b border-stone-200/80 py-14 sm:py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <nav className="text-[11px] font-sans uppercase tracking-[0.24em] text-stone-500 mb-4">
            <Link to="/" className="hover:text-[#131B24] transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-[#131B24] font-semibold">Collections</span>
          </nav>

          <span className="inline-block font-sans text-[11px] sm:text-xs font-semibold tracking-[0.3em] uppercase text-[#A27B5C] mb-2">
            SHOP ALL
          </span>

          <h1 className="font-serif text-[#131B24] text-3xl sm:text-4xl md:text-5xl font-light tracking-tight mb-4">
            Discover the AURELIS Collection
          </h1>

          <p className="font-sans text-xs sm:text-sm text-stone-600 max-w-xl mx-auto leading-relaxed">
            Explore timeless handbags designed for everyday elegance and special moments.
          </p>
        </div>
      </div>

      {/* Control Bar: Categories & Sorting */}
      <div className="sticky top-0 z-20 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200 px-6 sm:px-10 lg:px-16 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Category Filter Pills / Tabs */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <SlidersHorizontal className="w-4 h-4 text-stone-400 mr-2 shrink-0 hidden sm:inline" />
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.value;
              return (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setSelectedCategory(cat.value)}
                  className={`px-3.5 py-2 text-[11px] uppercase tracking-[0.2em] font-medium transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-[#131B24] text-white'
                      : 'bg-white border border-stone-200 text-stone-600 hover:border-stone-400 hover:text-[#131B24]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Sorting Dropdown & Product Counter */}
          <div className="flex items-center justify-between md:justify-end gap-4 text-xs">
            <span className="font-sans text-stone-500 tracking-wider text-[11.5px]">
              Showing {displayedProducts.length} of {PRODUCTS.length} Bags
            </span>

            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-3.5 h-3.5 text-stone-400" />
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortOption)}
                aria-label="Sort handbags"
                className="bg-white border border-stone-300 text-stone-800 py-1.5 px-3 text-[11.5px] uppercase tracking-wider font-medium focus:outline-none focus:border-[#131B24]"
              >
                <option value="featured">Featured Order</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

        </div>
      </div>

      {/* Handbags Product Grid */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-12 sm:py-16">
        {displayedProducts.length === 0 ? (
          <div className="py-20 text-center">
            <p className="font-serif text-2xl text-[#131B24] mb-2">No Handbags in this Category</p>
            <p className="text-xs font-sans text-stone-500 uppercase tracking-widest mb-6">
              Please select another category or reset filters.
            </p>
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className="px-6 py-3 bg-[#131B24] text-white text-xs uppercase tracking-[0.2em]"
            >
              Show All Bags
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6 lg:gap-8">
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
