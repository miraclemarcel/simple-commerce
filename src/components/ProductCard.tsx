import { Link } from "react-router-dom";
import { ShoppingCart, Trash2, Heart } from "lucide-react";
import { useState } from "react";
import type { Product } from "../data/products";
import { useCartContext as useCart } from "../hooks/CartContext";

interface ProductCardProps {
  product: Product;
  onAddToCart?: () => void;
}

export const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const { cart, addToCart, removeFromCart } = useCart();
  const [isFavorite, setIsFavorite] = useState(false);

  // Check if product is in cart
  const itemInCart = cart.find(item => item.id === product.id);
  const isInCart = !!itemInCart;

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);



  return (
    <Link to={`/product/${product.id}`}>
      <div className="group h-full rounded-lg border border-border bg-card overflow-hidden hover:shadow-md hover:border-orange-500/50 transition-all duration-200 cursor-pointer flex flex-col">
        {/* Image Container */}
        <div className="relative w-full aspect-square overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
          />

          {/* Heart/Wishlist Icon */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsFavorite(!isFavorite);
            }}
            className="absolute top-3 right-3 p-1.5 bg-white rounded-full transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <Heart
              className={`w-4 h-4 ${
                isFavorite
                  ? "fill-orange-500 text-orange-500"
                  : "text-gray-400"
              }`}
            />
          </button>

          {/* Quick Add Button (on hover) */}
          {isInCart ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                removeFromCart(product.id);
              }}
              className="absolute bottom-3 left-3 right-3 px-3 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Remove
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addToCart(product.id, product.name, product.price, product.image, 1);
                onAddToCart?.();
              }}
              className="absolute bottom-3 left-3 right-3 px-3 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </button>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-3 md:p-4">
          {/* Category & Seller */}
          <span className="text-xs text-muted-foreground mb-1">
            Electronics
          </span>

          {/* Product Name */}
          <h3 className="font-semibold text-sm text-foreground mb-3 line-clamp-2">
            {product.name}
          </h3>

          {/* Price */}
       <div className="flex items-baseline gap-2 mb-3 mt-auto">
          <span className="text-base font-bold text-foreground">
            {formatPrice(product.price)}
          </span>

          {product.originalPrice && (
            <span className="text-xs text-muted-foreground line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>


          {/* Status Badge */}
          <div className="flex items-center justify-between text-xs border-t border-border/50 pt-2">
            <span className="text-orange-600 font-medium">
              Brand New
            </span>
            <span className="text-green-600 font-medium">In Stock</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
