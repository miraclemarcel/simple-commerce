import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
// import { useCart } from "../hooks/useCart";
import { useCartContext as useCart } from "../hooks/CartContext";


interface NavigationProps {
  onOpenCart?: () => void;
}

export const Navigation = ({ onOpenCart }: NavigationProps) => {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-40 border-b border-border/50 bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="font-bold text-xl text-foreground hover:text-orange-500 transition-colors"
          >
            Miracle Marcel
          </Link>

          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:border-orange-500 hover:text-orange-500 text-foreground transition-colors duration-200"
          >
            <ShoppingCart className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-orange-500 text-xs font-bold text-white absolute -top-2 -right-2">
                {totalItems}
              </span>
            )}
            <span className="hidden md:inline text-sm font-medium">
              Cart
            </span>
          </button>
        </div>
      </div>
    </nav> 
  );
};
