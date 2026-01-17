import { useState } from "react";
import { products } from "../data/products";
import { ProductCard } from "../components/ProductCard";

export const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = ["All", ...new Set(products.map(p => p.category))];
  const filteredProducts = selectedCategory && selectedCategory !== "All"
    ? products.filter(p => p.category === selectedCategory)
    : products;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="py-16 md:py-28 px-4 md:px-6 border-b border-border/50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Quality Tech,
              <span className="block text-orange-500 mt-2">Real Prices</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              We bring you the best electronics and gadgets at fair prices. Simple, reliable, and honest shopping.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors duration-200">
                Shop Now
              </button>
              <button className="px-8 py-3.5 border border-border text-foreground hover:bg-muted font-semibold rounded-lg transition-colors duration-200">
                Browse Categories
              </button>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mt-16 pt-16 border-t border-border/50">
            {[
              { label: "Verified Products", value: "500+" },
              { label: "Happy Customers", value: "10K+" },
              { label: "Fast Delivery", value: "2-3 Days" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-4xl font-bold text-orange-500 mb-2">
                  {stat.value}
                </p>
                <p className="text-muted-foreground text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="py-16 md:py-24 px-4 md:px-6">
        <div className="container mx-auto">
          {/* Section Header */}
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Featured Products
            </h2>
            <p className="text-muted-foreground">
              Handpicked selection of quality tech products
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 md:gap-4 overflow-x-auto pb-6 md:pb-8 mb-12 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category === "All" ? null : category)}
                className={`px-4 md:px-6 py-2 rounded-full font-medium text-sm md:text-base whitespace-nowrap transition-colors duration-200 flex-shrink-0 ${
                  (category === "All" && selectedCategory === null) ||
                  selectedCategory === category
                    ? "bg-orange-500 text-white"
                    : "border border-border text-foreground hover:border-orange-500/50 hover:text-orange-500"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* No Products Message */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-2xl font-bold text-foreground mb-4">
                No products found
              </p>
              <button
                onClick={() => setSelectedCategory(null)}
                className="px-6 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
              >
                View All Products
              </button>
            </div>
          )}
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 md:py-24 px-4 md:px-6 border-t border-border/50">
        <div className="container mx-auto text-center max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Start Shopping Today
          </h2>
          <p className="text-muted-foreground mb-8">
            Browse our collection of quality products and find exactly what you need.
          </p>
          <button className="px-8 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors duration-200">
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
};
