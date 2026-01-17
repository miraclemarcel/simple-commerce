import "./global.css";

import { Toaster } from "./components/constants/toaster";
import { Toaster as Sonner } from "./components/constants/sonner";
import { TooltipProvider } from "./components/constants/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { Index } from "./pages/Index";
import { ProductDetails } from "./pages/ProductDetails";
import NotFound from "./pages/NotFound";
import { Navigation } from "./components/Navigation";
import { ShoppingCart } from "./components/ShoppingCart";
import { CartProvider } from "./hooks/CartContext";


if (!document.documentElement.classList.contains("dark")) {
  document.documentElement.classList.add("dark");
}

const queryClient = new QueryClient();

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <Navigation onOpenCart={() => setIsCartOpen(true)} />
      <ShoppingCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      {children}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider> {/* 🔥 THIS WAS MISSING */}
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);


export default App;

