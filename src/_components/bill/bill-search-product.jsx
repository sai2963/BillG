import useSearchProducts from "./useSearchProd";

const SearchProducts = ({
  inputValue,
  selectedProducts,
  setSelectedProducts,
  setInputValue,
  loading,
  error
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleProductSelect = (product) => {
    const existingProduct = selectedProducts.find((p) => p.id === product.id);

    if (existingProduct) {
      setSelectedProducts((prev) =>
        prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        )
      );
    } else {
      setSelectedProducts((prev) => [...prev, { ...product, quantity: 1 }]);
    }

    setInputValue("");
  };
  const filterProducts = useSearchProducts(inputValue);
  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Search Products
          </label>
          <div>
            <input
              type="text"
              value={inputValue}
              name="inputValue"
              onChange={handleChange}
              placeholder="Search Products here ..."
              className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <ul className="mt-3 space-y-1 max-h-48 overflow-y-auto">
            {loading ? (
              <li className="text-blue-500 p-2">Loading Products ...</li>
            ) : error ? (
              <li className="text-red-500 p-2">Something Went Wrong </li>
            ) : filterProducts.length > 0 ? (
              filterProducts.map((prod) => (
                <li
                  className="p-2 bg-gray-100 rounded cursor-pointer hover:bg-gray-200 transition-colors"
                  key={prod.id}
                  onClick={() => handleProductSelect(prod)}
                >
                  {prod.title} - <span>₹</span>
                  {prod.price}
                </li>
              ))
            ) : inputValue.trim() !== "" ? (
              <li className="text-red-500 p-2">No product found</li>
            ) : null}
          </ul>
        </div>
      </form>
    </>
  );
};
export default SearchProducts;