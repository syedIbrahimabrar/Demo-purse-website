import React, { useState } from 'react';
import { Menu, X, ShoppingBag, Search, ArrowRight } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';

export interface NavbarProps {
  onExploreClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { totalItems, openCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavScroll = (anchorId: string) => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate(`/#${anchorId}`);
      setTimeout(() => {
        const el = document.getElementById(anchorId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      const el = document.getElementById(anchorId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const filteredSearchResults = searchQuery.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <>
      <header className="relative z-30 w-full px-6 sm:px-10 lg:px-16 py-5 sm:py-6 border-b border-stone-200/40 bg-[#F8F6F2]/85 backdrop-blur-md transition-colors">
        {/* 3-Column Strict Grid: Guarantees NO text collisions or overlapping under any viewport */}
        <div className="grid grid-cols-3 items-center w-full">
          
          {/* Left Column (1/3): Menu Trigger & Clean Desktop Nav */}
          <div className="flex items-center justify-start gap-4 sm:gap-6 min-w-0">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="flex items-center gap-2 p-1.5 text-[#131B24] hover:opacity-75 transition-opacity cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              <span className="hidden md:inline font-sans text-[11px] uppercase tracking-[0.24em] font-medium text-[#131B24]">
                Menu
              </span>
            </button>

            {/* Desktop Quick Nav: Only shown on extra-large screens where space permits without touching center */}
            <nav className="hidden xl:flex items-center gap-6 text-[11px] uppercase tracking-[0.22em] font-medium text-[#131B24]/80">
              <Link
                to="/collections"
                className="hover:text-[#131B24] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#131B24] hover:after:w-full after:transition-all after:duration-200"
              >
                Shop All
              </Link>
              <button
                type="button"
                onClick={() => handleNavScroll('materials')}
                className="hover:text-[#131B24] transition-colors relative py-1 uppercase after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#131B24] hover:after:w-full after:transition-all after:duration-200 cursor-pointer"
              >
                Materials
              </button>
              <button
                type="button"
                onClick={() => handleNavScroll('craftsmanship')}
                className="hover:text-[#131B24] transition-colors relative py-1 uppercase after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#131B24] hover:after:w-full after:transition-all after:duration-200 cursor-pointer"
              >
                Craftsmanship
              </button>
            </nav>
          </div>

          {/* Center Column (1/3): Perfectly Isolated Brand Wordmark */}
          <div className="flex items-center justify-center text-center">
            <Link
              to="/"
              className="font-serif text-2xl sm:text-3xl tracking-[0.28em] font-normal uppercase text-[#131B24] hover:opacity-85 transition-opacity inline-block select-none"
            >
              AURELIS
            </Link>
          </div>

          {/* Right Column (1/3): Search, Bag */}
          <div className="flex items-center justify-end gap-3 sm:gap-5">
            <button
              type="button"
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search collections"
              className="p-1.5 text-[#131B24]/80 hover:text-[#131B24] transition-colors cursor-pointer"
            >
              <Search className="w-4 h-4 sm:w-4.5 sm:h-4.5" strokeWidth={1.5} />
            </button>

            <button
              type="button"
              onClick={openCart}
              aria-label="Open Shopping Bag"
              className="flex items-center gap-1.5 p-1.5 text-xs tracking-[0.16em] uppercase font-medium text-[#131B24] hover:opacity-80 transition-opacity cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 sm:w-4.5 sm:h-4.5" strokeWidth={1.5} />
              <span className="text-[11px] font-mono tabular-nums text-[#131B24] font-semibold">
                ({totalItems})
              </span>
            </button>
          </div>

        </div>

        {/* Slide-Down Navigation Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-[#FAF8F5]/98 backdrop-blur-md border-b border-stone-200 shadow-xl px-8 py-8 flex flex-col gap-6 z-40 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="max-w-md mx-auto w-full flex flex-col gap-5 text-left">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs tracking-[0.24em] uppercase font-medium text-[#131B24] hover:text-[#A27B5C] transition-colors pb-2 border-b border-stone-200/60"
              >
                Home
              </Link>
              <Link
                to="/collections"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs tracking-[0.24em] uppercase font-medium text-[#131B24] hover:text-[#A27B5C] transition-colors pb-2 border-b border-stone-200/60"
              >
                Shop All Handbags
              </Link>
              <button
                type="button"
                onClick={() => handleNavScroll('materials')}
                className="text-left text-xs tracking-[0.24em] uppercase font-medium text-[#131B24] hover:text-[#A27B5C] transition-colors pb-2 border-b border-stone-200/60 cursor-pointer"
              >
                Materials &amp; Textures
              </button>
              <button
                type="button"
                onClick={() => handleNavScroll('craftsmanship')}
                className="text-left text-xs tracking-[0.24em] uppercase font-medium text-[#131B24] hover:text-[#A27B5C] transition-colors pb-2 border-b border-stone-200/60 cursor-pointer"
              >
                Artisanal Craftsmanship
              </button>
              <button
                type="button"
                onClick={() => handleNavScroll('contact')}
                className="text-left text-xs tracking-[0.24em] uppercase font-medium text-[#131B24] hover:text-[#A27B5C] transition-colors cursor-pointer"
              >
                Contact Atelier
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Search Overlay Bar */}
      {searchOpen && (
        <div className="relative z-20 w-full bg-[#F3EFE9] border-b border-stone-300 px-6 sm:px-12 py-5 shadow-inner">
          <div className="max-w-3xl mx-auto">
            <div className="relative flex items-center">
              <Search className="absolute left-3 w-4 h-4 text-stone-500" strokeWidth={1.5} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by handbag name, category, or material (e.g. Tote, Luna, Cognac)..."
                autoFocus
                className="w-full pl-10 pr-10 py-2.5 bg-white border border-stone-300 text-xs tracking-wider uppercase placeholder:normal-case placeholder:text-stone-400 focus:outline-none focus:border-[#131B24]"
              />
              <button
                type="button"
                onClick={() => {
                  setSearchOpen(false);
                  setSearchQuery('');
                }}
                className="absolute right-3 text-stone-400 hover:text-[#131B24]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Results */}
            {searchQuery.trim() && (
              <div className="mt-3 bg-white border border-stone-200 max-h-72 overflow-y-auto divide-y divide-stone-100">
                {filteredSearchResults.length === 0 ? (
                  <div className="p-4 text-xs text-stone-500 text-center">
                    No handbags match &ldquo;{searchQuery}&rdquo;. Try &ldquo;Tote&rdquo; or &ldquo;Luna&rdquo;.
                  </div>
                ) : (
                  filteredSearchResults.map((prod) => (
                    <Link
                      key={prod.id}
                      to={`/product/${prod.id}`}
                      onClick={() => {
                        setSearchOpen(false);
                        setSearchQuery('');
                      }}
                      className="p-3 flex items-center justify-between hover:bg-stone-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={prod.image}
                          alt={prod.name}
                          referrerPolicy="no-referrer"
                          className="w-10 h-10 object-cover bg-stone-100 border border-stone-200"
                        />
                        <div>
                          <p className="font-serif text-sm text-[#131B24]">{prod.name}</p>
                          <p className="text-[11px] text-stone-500 uppercase tracking-wider">
                            {prod.categoryLabel}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-medium text-[#131B24]">
                        <span>PKR {prod.price.toLocaleString()}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
                      </div>
                    </Link>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
