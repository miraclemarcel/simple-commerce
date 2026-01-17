import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <div className="text-7xl md:text-9xl font-black mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          404
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
          Page Not Found
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
        </p>
        <Link
          to="/"
          className="inline-flex px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-background font-bold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
