import { X, Trash2, Plus, Minus } from "lucide-react";
// import { useCart } from "../hooks/useCart";
import type { CartItem } from "../hooks/useCart";
import { useEffect, useState } from "react";
import { useCartContext as useCart } from "../hooks/CartContext";

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShoppingCart = ({ isOpen, onClose }: ShoppingCartProps) => {
  const { cart, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!mounted) return null;

  const total = getTotalPrice();
  const shipping = cart.length > 0 ? 10 : 0;
  const tax = total * 0.08;
  const grandTotal = total + shipping + tax;

  const renderCartItem = (item: CartItem) => (
    <div
      key={item.id}
      className="flex gap-4 p-4 border border-border rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors duration-300 animate-scale-in"
    >
      {/* Image */}
      <div className="w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden bg-background flex-shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-semibold text-foreground line-clamp-1">
            {item.name}
          </h3>
          <p className="text-sm text-orange-500 font-medium">
            ${item.price.toFixed(2)} each
          </p>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="p-1 hover:bg-border rounded transition-colors"
            aria-label="Decrease quantity"
          >
            <Minus className="w-4 h-4 text-muted-foreground" />
          </button>
          <input
            type="number"
            min="1"
            value={item.quantity}
            onChange={(e) => updateQuantity(item.id, Math.max(1, parseInt(e.target.value) || 1))}
            className="w-12 text-center bg-background border border-border rounded px-2 py-1 text-sm font-medium text-foreground"
          />
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="p-1 hover:bg-border rounded transition-colors"
            aria-label="Increase quantity"
          >
            <Plus className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Price & Delete */}
      <div className="flex flex-col items-end justify-between">
        <button
          onClick={() => removeFromCart(item.id)}
          className="p-1.5 hover:bg-destructive/20 rounded transition-colors group"
          aria-label="Remove from cart"
        >
          <Trash2 className="w-4 h-4 text-destructive group-hover:text-pink-400 transition-colors" />
        </button>
        <p className="font-bold text-foreground">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-full md:w-96 bg-background border-l border-border z-50 flex flex-col transition-transform duration-300 transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-border">
          <h2 className="text-xl md:text-2xl font-bold text-foreground">
            Shopping Cart
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-muted rounded transition-colors"
            aria-label="Close cart"
          >
            <X className="w-6 h-6 text-foreground" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <div className="text-6xl mb-4">🛒</div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Your cart is empty
              </h3>
              <p className="text-muted-foreground text-sm">
                Start shopping to add items to your cart
              </p>
            </div>
          ) : (
            cart.map(renderCartItem)
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t border-border p-4 md:p-6 space-y-4 bg-muted/30">
            {/* Pricing Breakdown */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span className="text-orange-500">${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-border pt-2 flex justify-between font-bold text-foreground">
                <span>Total</span>
                <span className="text-orange-500">
                  ${grandTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div className="space-y-3">
              <button className="w-full px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors duration-200">
                Proceed to Checkout
              </button>
              <button
                onClick={clearCart}
                className="w-full px-4 py-2 border border-border text-foreground hover:bg-muted rounded-lg transition-colors duration-200"
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
