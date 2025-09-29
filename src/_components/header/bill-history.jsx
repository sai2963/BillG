import { Link } from "react-router-dom";

const BillHistory = ({isActive, isMobileMenuOpen, setIsMobileMenuOpen}) => {
  return (
    <>
      {isMobileMenuOpen ? (
        <Link
          to="/billh"
          onClick={() => setIsMobileMenuOpen(false)}
          className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            isActive("/billh")
              ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200"
              : "text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
          }`}
        >
          Bill History
        </Link>
      ) : (
        <Link
          to="/billh"
          className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            isActive("/billh")
              ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200"
              : "text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
          }`}
        >
          Bill History
        </Link>
      )}
    </>
  );
};
export default BillHistory;