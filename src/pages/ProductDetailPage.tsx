import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Plus, Minus, Check, ArrowRight, Shield, RefreshCw } from 'lucide-react';
import { PRODUCTS, formatPKR } from '../data/products';
import { ProductColor } from '../types/product';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/ProductCard';
import { SEO } from '../components/SEO';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = PRODUCTS.find((p) => p.id === id);

  const [activeImage, setActiveImage] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'materials' | 'dimensions'>('details');

  useEffect(() => {
    if (product) {
      setActiveImage(product.image);
      setSelectedColor(product.colors[0] || null);
      setQuantity(1);
      window.scrollTo(0, 0);
    }
  }, [product]);

  const productSchema = useMemo(() => {
    if (!product) return undefined;
    return {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      image: product.image,
      description: product.description,
      brand: {
        '@type': 'Brand',
        name: 'AURELIS'
      },
      offers: {
        '@type': 'Offer',
        priceCurrency: 'PKR',
        price: product.price.toString(),
        availability: 'https://schema.org/InStock',
        seller: {
          '@type': 'Organization',
          name: 'AURELIS Maison'
        }
      }
    };
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 py-24 text-center bg-[#FAF8F5]">
        <SEO
          title="Product Not Found | AURELIS Luxury Maison"
          description="The requested luxury handbag could not be found in our atelier collection."
        />
        <h1 className="font-serif text-3xl text-[#131B24] mb-3">Handbag Not Found</h1>
        <p className="font-sans text-xs text-stone-500 uppercase tracking-widest mb-8">
          The requested AURELIS creation does not exist in our active catalog.
        </p>
        <button
          type="button"
          onClick={() => navigate('/collections')}
          className="px-8 py-3.5 bg-[#131B24] text-white text-xs uppercase tracking-[0.2em]"
        >
          Return to Collections
        </button>
      </div>
    );
  }

  const handleAdd = () => {
    if (!selectedColor) return;
    addToCart(product, selectedColor, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2200);
  };

  // Find 3 complementary products
  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="w-full bg-[#FAF8F5] min-h-screen">
      <SEO
        title={`${product.name} — Handcrafted Leather Handbag | AURELIS`}
        description={product.description}
        image={product.image}
        type="product"
        schema={productSchema}
      />
      
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-8 pb-4">
        <nav className="text-[11px] font-sans uppercase tracking-[0.22em] text-stone-500 flex items-center gap-2">
          <Link to="/" className="hover:text-[#131B24] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link to="/collections" className="hover:text-[#131B24] transition-colors">
            Collections
          </Link>
          <span>/</span>
          <span className="text-[#131B24] font-medium truncate">{product.name}</span>
        </nav>
      </div>

      {/* Main Product Showcase Section */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-6 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          
          {/* LEFT: Product Image Gallery (7 cols) */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            
            {/* Thumbnail Stack */}
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto shrink-0 pb-2 md:pb-0">
              {product.galleryImages.map((imgUrl, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImage(imgUrl)}
                  className={`relative w-16 h-16 sm:w-20 sm:h-20 bg-stone-100 overflow-hidden border transition-all cursor-pointer ${
                    activeImage === imgUrl
                      ? 'border-[#131B24] ring-1 ring-[#131B24]'
                      : 'border-stone-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={imgUrl}
                    alt={`${product.name} angle ${idx + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Large Primary Image Preview */}
            <div className="relative flex-1 aspect-square bg-[#F3EFE9] border border-stone-200 overflow-hidden group">
              <img
                src={activeImage || product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />

              {product.editionBadge && (
                <span className="absolute top-4 left-4 bg-[#131B24] text-white text-[10px] uppercase tracking-[0.2em] font-medium px-3 py-1.5 z-10">
                  {product.editionBadge}
                </span>
              )}
            </div>

          </div>

          {/* RIGHT: Product Buy Box & Configuration (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-start text-left">
            
            <p className="font-sans text-[11px] uppercase tracking-[0.28em] text-[#A27B5C] font-semibold mb-2">
              {product.categoryLabel}
            </p>

            <h1 className="font-serif text-3xl sm:text-4xl text-[#131B24] font-light tracking-tight mb-2">
              {product.name}
            </h1>

            {product.tagline && (
              <p className="font-serif italic text-base text-stone-600 mb-4">
                {product.tagline}
              </p>
            )}

            <div className="py-3 border-y border-stone-200/80 mb-6 flex items-baseline justify-between">
              <span className="font-sans text-xl sm:text-2xl font-medium text-[#131B24] tabular-nums">
                {formatPKR(product.price)}
              </span>
              <span className="font-sans text-[11px] text-[#A27B5C] uppercase tracking-wider font-semibold">
                Complimentary Delivery
              </span>
            </div>

            {/* Short Fictional Product Description */}
            <p className="font-sans text-xs sm:text-[13px] text-stone-600 leading-relaxed mb-6 font-normal">
              {product.description}
            </p>

            {/* Color Selector */}
            <div className="mb-6">
              <div className="flex justify-between items-center text-xs mb-2.5">
                <span className="font-sans uppercase tracking-[0.2em] text-[#131B24] font-medium">
                  Leather Tone
                </span>
                <span className="font-sans text-stone-500 uppercase tracking-wider">
                  {selectedColor?.name}
                </span>
              </div>

              <div className="flex items-center gap-3">
                {product.colors.map((color) => {
                  const isSelected = selectedColor?.name === color.name;
                  return (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      aria-label={`Select ${color.name}`}
                      className={`relative p-0.5 rounded-full transition-all cursor-pointer ${
                        isSelected ? 'ring-2 ring-[#131B24] ring-offset-2' : 'hover:scale-110'
                      }`}
                    >
                      <span
                        className="block w-6 h-6 rounded-full border border-stone-300 shadow-xs"
                        style={{ backgroundColor: color.hex }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Selector & Add to Bag CTA */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4">
                {/* Stepper */}
                <div className="flex items-center border border-stone-300 bg-white">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-3 text-stone-600 hover:text-[#131B24] transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-4 py-2 text-xs font-mono tabular-nums text-[#131B24] font-medium">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-3 text-stone-600 hover:text-[#131B24] transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Add to Bag Button */}
                <button
                  type="button"
                  onClick={handleAdd}
                  className={`flex-1 py-4 text-xs font-medium uppercase tracking-[0.24em] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
                    addedAnimation
                      ? 'bg-emerald-800 text-white'
                      : 'bg-[#131B24] text-white hover:bg-[#1E2836] active:scale-[0.99]'
                  }`}
                >
                  {addedAnimation ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between text-[10.5px] font-sans text-stone-500 uppercase tracking-widest pt-2">
                <span className="flex items-center gap-1.5">
                  <Shield className="w-3 h-3 text-[#A27B5C]" /> 2-Year Atelier Guarantee
                </span>
                <span className="flex items-center gap-1.5">
                  <RefreshCw className="w-3 h-3 text-[#A27B5C]" /> 30-Day Complimentary Returns
                </span>
              </div>
            </div>

            {/* Information Accordion Tabs */}
            <div className="border-t border-stone-200 divide-y divide-stone-200 text-xs font-sans">
              
              {/* Tab 1: Details & Features */}
              <div>
                <button
                  type="button"
                  onClick={() => setActiveTab(activeTab === 'details' ? 'details' : 'details')}
                  className="w-full py-3.5 flex items-center justify-between text-left font-semibold uppercase tracking-[0.2em] text-[#131B24]"
                >
                  <span>Features & Construction</span>
                </button>
                <ul className="pb-4 space-y-1.5 text-stone-600 list-disc list-inside">
                  {product.features.map((feat, i) => (
                    <li key={i}>{feat}</li>
                  ))}
                </ul>
              </div>

              {/* Tab 2: Materials and Care Information */}
              <div>
                <button
                  type="button"
                  onClick={() => setActiveTab('materials')}
                  className="w-full py-3.5 flex items-center justify-between text-left font-semibold uppercase tracking-[0.2em] text-[#131B24]"
                >
                  <span>Materials & Care</span>
                </button>
                <div className="pb-4 space-y-2 text-stone-600">
                  <p>{product.materialsText}</p>
                  <p className="text-[11px] text-stone-500 italic">
                    Care: Gently wipe with a soft dry cloth. Store in the provided cotton flannel dust cover away from direct sunlight.
                  </p>
                </div>
              </div>

              {/* Tab 3: Dimensions */}
              <div>
                <button
                  type="button"
                  onClick={() => setActiveTab('dimensions')}
                  className="w-full py-3.5 flex items-center justify-between text-left font-semibold uppercase tracking-[0.2em] text-[#131B24]"
                >
                  <span>Dimensions & Fit</span>
                </button>
                <p className="pb-4 text-stone-600 font-mono text-[11.5px]">
                  {product.dimensions}
                </p>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* Related Products Grid */}
      <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-16 sm:py-24 border-t border-stone-200 mt-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="font-sans text-[11px] uppercase tracking-[0.26em] text-[#A27B5C] font-semibold">
              COMPLEMENTARY CREATIONS
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#131B24] font-light mt-1">
              You May Also Cherish
            </h2>
          </div>
          <Link
            to="/collections"
            className="group inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-[#131B24] hover:text-[#A27B5C] transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {relatedProducts.map((rel) => (
            <ProductCard key={rel.id} product={rel} />
          ))}
        </div>
      </section>

    </div>
  );
};
