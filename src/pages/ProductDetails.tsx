import { useParams, Link, useNavigate } from "react-router-dom";
import { getProductById } from "../data/products";
import { Star, ChevronLeft, ShoppingCart, Check, Trash2 } from "lucide-react";
// import { useCart } from "../hooks/useCart";
import { useState } from "react";
import { useCartContext as useCart } from "../hooks/CartContext";

export const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = id ? getProductById(id) : null;
  const { cart, addToCart, removeFromCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);


  // Check if product is in cart
  const itemInCart = cart.find(item => item.id === id);
  const isInCart = !!itemInCart;

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Product Not Found
          </h1>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    if (isInCart) {
      removeFromCart(product.id);
      setIsAdded(false);
    } else {
      addToCart(product.id, product.name, product.price, product.image, quantity);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 2000);
    }
  };

  const rating = Math.floor(product.rating);
  const hasDecimal = product.rating % 1 !== 0;

  return (
    <div className="min-h-screen bg-background py-6 md:py-12">
      <div className="container mx-auto px-4 md:px-6">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-orange-500 hover:text-orange-600 transition-colors mb-8 font-medium"
        >
          <ChevronLeft className="w-5 h-5" />
          Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Image Section */}
          <div className="flex items-center justify-center">
            <div className="relative w-full aspect-square rounded-lg overflow-hidden border border-border bg-muted group">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />

              {/* Discount Badge */}
              {discount > 0 && (
                <div className="absolute top-4 right-4 bg-orange-500 px-3 py-1 rounded text-sm font-bold text-white">
                  Save {discount}%
                </div>
              )}
            </div>
          </div>

          {/* Details Section */}
          <div className="flex flex-col justify-center">
            {/* Category & Title */}
            <span className="text-xs md:text-sm font-medium text-muted-foreground uppercase mb-2 block">
              {product.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 transition-colors ${
                      i < rating || (i === rating && hasDecimal)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <span className="text-foreground font-medium">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Description */}
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              {product.longDescription}
            </p>

            {/* Pricing */}
            <div className="flex items-baseline gap-4 mb-8">
              <span className="text-4xl md:text-5xl font-bold text-orange-500">
              {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2 mb-8">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
              <span className="text-green-400 font-medium">In Stock</span>
            </div>

            {/* Quantity Selector */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-foreground mb-3">
                Quantity
              </label>
              <div className="flex items-center gap-4 w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center border border-border rounded-lg hover:bg-muted transition-colors"
                >
                  −
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 h-10 text-center bg-muted border border-border rounded-lg font-semibold text-foreground focus:outline-none focus:border-cyan-500"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center border border-border rounded-lg hover:bg-muted transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className={`flex items-center justify-center gap-3 w-full px-6 py-4 font-semibold rounded-lg transition-colors duration-200 mb-4 text-base ${
                isInCart
                  ? "bg-red-500 hover:bg-red-600 text-white"
                  : isAdded
                    ? "bg-green-500 text-white"
                    : "bg-orange-500 hover:bg-orange-600 text-white"
              }`}
            >
              {isInCart ? (
                <>
                  <Trash2 className="w-5 h-5" />
                  Remove from Cart
                </>
              ) : isAdded ? (
                <>
                  <Check className="w-5 h-5" />
                  Added to Cart!
                </>
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </>
              )}
            </button>

            {/* Features */}
            <div className="mt-12 pt-8 border-t border-border/50">
              <h2 className="text-xl font-bold text-foreground mb-6">Key Features</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3"
                  >
                    <Check className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
