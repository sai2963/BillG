const FormButtons = ({loading}) => {
  const handleCancel = () => {
    navigate("/");
  };
  return (
    <>
      <div className="flex space-x-4">
        <button
          type="button"
          onClick={handleCancel}
          className="flex-1 rounded-lg border border-gray-300 px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 rounded-lg bg-indigo-600 px-6 py-2 text-sm font-medium text-white shadow-md transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </div>
    </>
  );
};
export default FormButtons;
