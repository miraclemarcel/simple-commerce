export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  description: string;
  longDescription: string;
  features: string[];
  inStock: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    name: "NeoVision Pro",
    price: 899,
    originalPrice: 1099,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
    category: "Electronics",
    rating: 4.8,
    reviews: 324,
    description: "Advanced AR-enabled smartwatch with holographic display",
    longDescription: "Experience the future with our NeoVision Pro smartwatch. Featuring cutting-edge AR technology, holographic display, and advanced health monitoring capabilities. Perfect for tech enthusiasts and professionals.",
    features: [
      "Holographic AMOLED Display",
      "AR Navigation",
      "Health Monitoring Suite",
      "7-day Battery Life",
      "Water Resistant",
      "AI Assistant"
    ],
    inStock: true
  },
  {
    id: "2",
    name: "Quantum Headphones X",
    price: 599,
    originalPrice: 799,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop&q=80",
    category: "Audio",
    rating: 4.9,
    reviews: 567,
    description: "Noise-canceling headphones with spatial audio and AI adaptation",
    longDescription: "Immerse yourself in premium sound with Quantum Headphones X. Features adaptive noise cancellation that learns your environment, spatial audio support, and seamless multi-device connectivity.",
    features: [
      "AI Noise Cancellation",
      "Spatial Audio",
      "40-hour Battery",
      "Touch Controls",
      "Premium Materials",
      "Active Sound Profile"
    ],
    inStock: true
  },
  {
    id: "3",
    name: "CyberGlow Monitor",
    price: 1299,
    originalPrice: 1599,
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop",
    category: "Computing",
    rating: 4.7,
    reviews: 201,
    description: "32-inch curved gaming monitor with quantum dot technology",
    longDescription: "The ultimate gaming companion. 144Hz refresh rate, quantum dot technology for incredible colors, and customizable RGB zone lighting. Perfect for competitive gaming and content creation.",
    features: [
      "144Hz Refresh Rate",
      "Quantum Dot Technology",
      "1440p Resolution",
      "RGB Zone Lighting",
      "Curved Design",
      "1ms Response Time"
    ],
    inStock: true
  },
  {
    id: "4",
    name: "FutureGrip Controller",
    price: 249,
    originalPrice: 349,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop",
    category: "Gaming",
    rating: 4.6,
    reviews: 443,
    description: "Haptic feedback controller with adaptive triggers and AI learning",
    longDescription: "Next-generation gaming controller with advanced haptic feedback, adaptive triggers, and built-in AI that learns your gaming style. Compatible with all major gaming platforms.",
    features: [
      "Advanced Haptics",
      "Adaptive Triggers",
      "AI Learning System",
      "24-hour Battery",
      "Wireless & USB-C",
      "Multi-platform Compatible"
    ],
    inStock: true
  },
  {
    id: "5",
    name: "PrismCamera Z",
    price: 2499,
    originalPrice: 3299,
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&h=500&fit=crop",
    category: "Photography",
    rating: 4.9,
    reviews: 156,
    description: "Professional mirrorless camera with AI-powered imaging system",
    longDescription: "Capture the extraordinary. 61MP sensor, 8K video recording, advanced AI scene recognition, and integrated gimbal stabilization. Professional-grade tool for creators and photographers.",
    features: [
      "61MP Full Frame Sensor",
      "8K Video Recording",
      "AI Scene Recognition",
      "Gimbal Stabilization",
      "12-bit RAW",
      "Advanced Autofocus System"
    ],
    inStock: true
  },
  {
    id: "6",
    name: "SynthWave Speaker",
    price: 449,
    originalPrice: 599,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop",
    category: "Audio",
    rating: 4.5,
    reviews: 289,
    description: "AI-enhanced portable speaker with visual light show",
    longDescription: "The ultimate party companion. Omnidirectional sound, AI-powered beat detection, synchronized LED light show, and 30-hour battery. Perfect for any occasion.",
    features: [
      "360° Sound",
      "AI Beat Detection",
      "Synchronized LED Show",
      "30-hour Battery",
      "Waterproof Design",
      "Smart EQ Technology"
    ],
    inStock: true
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};
