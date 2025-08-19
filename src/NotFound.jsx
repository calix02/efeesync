// src/pages/Unauthorized.jsx
import { Link } from "react-router-dom";
import { ShieldAlert } from "lucide-react";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
      <div className="text-center p-10 bg-white dark:bg-gray-900 shadow-xl rounded-2xl max-w-lg">
        <div className="flex justify-center mb-6">
          <ShieldAlert className="w-20 h-20 text-red-500" />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Page not found
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          The page you are requesting does not exists.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-lg transition"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;