import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center px-4">
        <h1 className="text-5xl font-extrabold text-blue-600 mb-6">404</h1>
        <p className="text-2xl text-gray-700 mb-4">
          Resource Not Found
        </p>
        <p className="text-md text-gray-500 mb-8">
          The page you are looking for does not exist. Please return to the Home page.
        </p>
        <a
          href="/"
          className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          Go to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
