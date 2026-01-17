import { createContext, useContext } from "react";
import { useCart } from "./useCart";
import type { CartItem } from "./useCart";

interface CartContextValue {
  cart: CartItem[];
  isLoaded: boolean;
  addToCart: (
    id: string,
    name: string,
    price: number,
    image: string,
    quantity?: number
  ) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalQuantity: () => number;
}

const CartContext = createContext<CartContextValue | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const cartState = useCart();

  return (
    <CartContext.Provider value={cartState}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCartContext must be used inside CartProvider");
  }
  return ctx;
};
