import { Link } from "react-router-dom";

const ViewProducts = ({isActive, isMobileMenuOpen, setIsMobileMenuOpen}) => {
  return (
    <>
      {isMobileMenuOpen ? (
        <Link
          to="/products/view"
          onClick={() => setIsMobileMenuOpen(false)}
          className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            isActive("/products/view")
              ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200"
              : "text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
          }`}
        >
          View Products
        </Link>
      ) : (
        <Link
          to="/products/view"
          className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            isActive("/products/view")
              ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200"
              : "text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
          }`}
        >
          View Products
        </Link>
      )}
    </>
  );
};
export default ViewProducts;