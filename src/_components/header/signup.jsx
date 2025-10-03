import { Link } from "react-router-dom";

const SignUp = ({ isActive, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  return (
    <>
      {isMobileMenuOpen ? (
        <Link
          to="/signup"
          onClick={() => setIsMobileMenuOpen(false)}
          className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            isActive("/signup")
              ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200"
              : "text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
          }`}
        >
          Signup
        </Link>
      ) : (
        <Link
          to="/signup"
          className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            isActive("/signup")
              ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200"
              : "text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
          }`}
        >
          Signup
        </Link>
      )}
    </>
  );
};
export default SignUp;
