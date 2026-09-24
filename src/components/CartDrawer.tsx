import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, CheckCircle2, PackageCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPKR } from '../data/products';
import { Link } from 'react-router-dom';
import { CartItem } from '../types/product';

export const CartDrawer: React.FC = () => {
  const { isCartOpen, closeCart, items, updateQuantity, removeFromCart, clearCart, subtotal, totalItems } =
    useCart();

  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<{
    orderId: string;
    items: CartItem[];
    total: number;
    date: string;
  } | null>(null);

  const handleProceedToCheckout = () => {
    // Generate unique luxury order reference code
    const orderId = `AUR-${Math.floor(100000 + Math.random() * 900000)}`;
    const snapshotItems = [...items];
    const snapshotTotal = subtotal;

    setCompletedOrder({
      orderId,
      items: snapshotItems,
      total: snapshotTotal,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    });

    // Mark order as confirmed / done
    setOrderConfirmed(true);

    // Empty the shopping bag completely so count becomes 0
    clearCart();
  };

  const handleCloseOrderSuccess = () => {
    setOrderConfirmed(false);
    setCompletedOrder(null);
    closeCart();
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="cart-heading" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#131B24]/40 backdrop-blur-sm transition-opacity duration-300"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] text-[#131B24] flex flex-col shadow-2xl border-l border-stone-200">
          
          {/* Header */}
          <div className="px-6 py-5 border-b border-stone-200/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-[#131B24]" strokeWidth={1.5} />
              <h2 id="cart-heading" className="font-serif text-xl tracking-wide uppercase">
                Shopping Bag <span className="font-sans text-xs text-stone-500 font-normal">({totalItems})</span>
              </h2>
            </div>
            <button
              type="button"
              onClick={closeCart}
              aria-label="Close bag"
              className="p-1.5 text-stone-500 hover:text-[#131B24] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-6 py-6 divide-y divide-stone-200/60">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 mb-4">
                  <ShoppingBag className="w-8 h-8" strokeWidth={1.2} />
                </div>
                <h3 className="font-serif text-xl text-[#131B24] mb-2">Your Bag is Empty</h3>
                <p className="font-sans text-xs text-stone-500 tracking-wider uppercase mb-8 max-w-xs">
                  Discover timeless silhouettes crafted with exquisite materials.
                </p>
                <Link
                  to="/collections"
                  onClick={closeCart}
                  className="px-6 py-3.5 bg-[#131B24] text-white text-xs uppercase tracking-[0.2em] hover:bg-[#1E2836] transition-colors"
                >
                  Explore Collections
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedColor.name}`}
                  className="py-4 flex gap-4 items-start"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-20 h-20 object-cover bg-stone-100 shrink-0 border border-stone-200"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <Link
                        to={`/product/${item.product.id}`}
                        onClick={closeCart}
                        className="font-serif text-base text-[#131B24] hover:underline truncate"
                      >
                        {item.product.name}
                      </Link>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.product.id, item.selectedColor.name)}
                        className="text-stone-400 hover:text-red-700 transition-colors p-1 cursor-pointer"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className="w-2.5 h-2.5 rounded-full border border-stone-300"
                        style={{ backgroundColor: item.selectedColor.hex }}
                      />
                      <span className="font-sans text-[11px] text-stone-600 uppercase tracking-wider">
                        {item.selectedColor.name}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-stone-300 bg-white">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.id, item.selectedColor.name, -1)}
                          className="px-2 py-1 text-stone-600 hover:text-[#131B24] transition-colors cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 py-1 text-xs font-mono tabular-nums text-[#131B24]">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product.id, item.selectedColor.name, 1)}
                          className="px-2 py-1 text-stone-600 hover:text-[#131B24] transition-colors cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-sans text-xs font-semibold text-[#131B24] tabular-nums">
                        {formatPKR(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer / Summary */}
          {items.length > 0 && (
            <div className="p-6 border-t border-stone-200 bg-white space-y-4">
              <div className="space-y-1.5 text-xs font-sans">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#131B24] tabular-nums">
                    {formatPKR(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Shipping & Handling</span>
                  <span className="text-[#A25929] uppercase tracking-wider text-[11px] font-semibold">
                    Complimentary
                  </span>
                </div>
                <div className="border-t border-stone-200 pt-2 flex justify-between text-sm font-semibold text-[#131B24]">
                  <span>Total</span>
                  <span className="tabular-nums">{formatPKR(subtotal)}</span>
                </div>
              </div>

              <p className="text-[10.5px] text-stone-500 tracking-wide uppercase text-center">
                Presented in signature AURELIS presentation box & dust bag
              </p>

              <button
                type="button"
                onClick={handleProceedToCheckout}
                className="w-full py-4 bg-[#131B24] text-white text-xs uppercase tracking-[0.24em] font-medium hover:bg-[#1E2836] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Realistic Order Confirmed Modal */}
      {orderConfirmed && completedOrder && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/55 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#FAF8F5] max-w-lg w-full p-6 sm:p-8 border border-stone-300 shadow-2xl relative text-left">
            <button
              type="button"
              onClick={handleCloseOrderSuccess}
              className="absolute top-4 right-4 text-stone-400 hover:text-[#131B24] cursor-pointer"
              aria-label="Close confirmation"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Done / Checkmark Indicator */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#131B24] text-white flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <span className="font-sans text-[10px] uppercase tracking-[0.24em] text-[#A27B5C] font-semibold">
                  STATUS: CONFIRMED &amp; DONE
                </span>
                <h3 className="font-serif text-2xl text-[#131B24] font-light">Order Placed Successfully</h3>
              </div>
            </div>

            <p className="font-sans text-xs text-stone-600 leading-relaxed mb-6">
              Thank you for your order. Your purchase has been verified and registered. Our master artisans are preparing your handbag in our signature presentation packaging.
            </p>

            {/* Order Receipt Box */}
            <div className="bg-white border border-stone-200 p-4 rounded-xs mb-6 text-xs font-sans space-y-3">
              <div className="flex justify-between items-center pb-2 border-b border-stone-100">
                <span className="text-stone-500 uppercase tracking-wider text-[11px]">Order Reference</span>
                <span className="font-mono font-semibold text-[#131B24] tracking-wider text-[12px]">
                  {completedOrder.orderId}
                </span>
              </div>

              <div className="flex justify-between items-center pb-2 border-b border-stone-100">
                <span className="text-stone-500">Date</span>
                <span className="text-[#131B24] font-medium">{completedOrder.date}</span>
              </div>

              <div className="flex justify-between items-center pb-2 border-b border-stone-100">
                <span className="text-stone-500">Shipping</span>
                <span className="text-emerald-700 font-medium">Complimentary Express</span>
              </div>

              {/* Items List */}
              <div className="pt-1 space-y-2">
                <span className="text-stone-500 block uppercase tracking-wider text-[10px]">Purchased Items</span>
                {completedOrder.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <span className="text-[#131B24] truncate max-w-[240px]">
                      {it.quantity}x {it.product.name} ({it.selectedColor.name})
                    </span>
                    <span className="font-medium text-[#131B24] tabular-nums">
                      {formatPKR(it.product.price * it.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-stone-200 flex justify-between items-center text-sm font-semibold text-[#131B24]">
                <span>Total Amount</span>
                <span className="tabular-nums">{formatPKR(completedOrder.total)}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={handleCloseOrderSuccess}
                className="flex-1 py-3.5 bg-[#131B24] text-white text-xs uppercase tracking-[0.24em] font-medium hover:bg-[#1E2836] transition-colors text-center cursor-pointer shadow-sm flex items-center justify-center gap-2"
              >
                <PackageCheck className="w-4 h-4 text-emerald-400" />
                <span>Done &bull; Continue Shopping</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
