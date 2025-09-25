const ViewSearch = ({searchTerm,setSearchTerm}) => {
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  return (
    <>
      <div className="w-full sm:w-auto">
        <input
          type="text"
          placeholder="Search products, categories, brands..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full sm:w-80 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
        />
      </div>
    </>
  );
};
export default ViewSearch;