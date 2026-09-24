import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types/product';
import { formatPKR } from '../data/products';
import { useCart } from '../context/CartContext';
import { ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  showCategory?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, showCategory = true }) => {
  const { addToCart } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, product.colors[0], 1);
  };

  return (
    <div className="group relative flex flex-col bg-[#FAF8F5] border border-stone-200/70 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-stone-300">
      
      {/* Product Image Stage */}
      <Link
        to={`/product/${product.id}`}
        className="relative aspect-square w-full bg-[#F3EFE9] overflow-hidden block"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-106"
        />

        {/* Edition badge if present */}
        {product.editionBadge && (
          <span className="absolute top-3 left-3 bg-[#131B24] text-white text-[9.5px] uppercase tracking-[0.2em] font-medium px-2.5 py-1 z-10">
            {product.editionBadge}
          </span>
        )}

        {/* Quick Add to Bag on Hover */}
        <div className="absolute inset-x-3 bottom-3 z-10 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 pointer-events-auto">
          <button
            type="button"
            onClick={handleQuickAdd}
            className="w-full py-2.5 bg-white/95 backdrop-blur-sm text-[#131B24] text-[10.5px] uppercase tracking-[0.2em] font-medium border border-stone-300 shadow hover:bg-[#131B24] hover:text-white transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Quick Add</span>
          </button>
        </div>
      </Link>

      {/* Product Details */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between text-left">
        <div>
          {showCategory && (
            <p className="font-sans text-[10px] tracking-[0.22em] uppercase text-stone-500 mb-1.5">
              {product.categoryLabel}
            </p>
          )}

          <Link
            to={`/product/${product.id}`}
            className="font-serif text-base sm:text-lg text-[#131B24] hover:underline block leading-snug line-clamp-1"
          >
            {product.name}
          </Link>
        </div>

        <div className="mt-3 pt-2.5 border-t border-stone-200/60 flex items-center justify-between">
          <span className="font-sans text-xs sm:text-[13px] font-semibold text-[#131B24] tabular-nums">
            {formatPKR(product.price)}
          </span>

          {/* Color swatches */}
          <div className="flex items-center gap-1">
            {product.colors.map((c, i) => (
              <span
                key={i}
                title={c.name}
                className="w-2.5 h-2.5 rounded-full border border-stone-300"
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
