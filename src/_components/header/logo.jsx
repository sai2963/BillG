import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <>
      <div className="flex-shrink-0">
        <Link
          to="/"
          className="text-xl font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
        >
          BillG
        </Link>
      </div>
    </>
  );
};
export default Logo;