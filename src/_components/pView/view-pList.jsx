import axios from "axios";
const ViewPList = ({ filteredProducts, setProducts, searchTerm }) => {
  const handleDeleteCustomProduct = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(
          `https://bill-g-bd.vercel.app/api/products/${productId}`
        );

        setProducts((prev) => prev.filter((p) => p.id !== productId));
      } catch (error) {
        console.log(error);
        alert("Failed To Delete Product");
      }
    }
  };
  return (
    <>
      <div className="overflow-x-auto rounded-2xl bg-white dark:bg-gray-800 shadow-md">
        <table className="min-w-full text-sm text-gray-700 dark:text-gray-200">
          {/* Table Head */}
          <thead className="bg-gray-100 text-left text-gray-600 dark:bg-gray-700 dark:text-gray-300">
            <tr>
              <th className="px-6 py-3 font-medium">SNO</th>
              <th className="px-6 py-3 font-medium">Product Name</th>
              <th className="px-6 py-3 font-medium">Category</th>
              <th className="px-6 py-3 font-medium">Brand</th>
              <th className="px-6 py-3 font-medium">Stock</th>
              <th className="px-6 py-3 font-medium">Price</th>
              <th className="px-6 py-3 font-medium">Type</th>
              <th className="px-6 py-3 font-medium">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <tr
                  key={product.id}
                  className={`border-b dark:border-gray-700 ${
                    index % 2 === 0
                      ? "bg-gray-50 dark:bg-gray-900"
                      : "bg-white dark:bg-gray-800"
                  } hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors`}
                >
                  <td className="px-6 py-3 font-medium">{index + 1}</td>
                  <td className="px-6 py-3">
                    <div className="font-medium text-gray-900 dark:text-gray-100">
                      {product.title}
                    </div>
                    {product.description && (
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate max-w-xs">
                        {product.description}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300">
                      {product.category || "Uncategorized"}
                    </span>
                  </td>
                  <td className="px-6 py-3">{product.brand || "No Brand"}</td>
                  <td className="px-6 py-3">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        (product.stock || 0) > 10
                          ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
                          : (product.stock || 0) > 0
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300"
                          : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
                      }`}
                    >
                      {product.stock || product.quantity || 0}
                    </span>
                  </td>
                  <td className="px-6 py-3 font-semibold">
                    ₹{product.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                      API
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDeleteCustomProduct(product.id)}
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 font-medium text-xs"
                        title="Delete custom product"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="px-6 py-12 text-center">
                  <div className="text-gray-500 dark:text-gray-400">
                    {searchTerm ? (
                      <>
                        <p className="text-lg font-medium mb-2">
                          No products found
                        </p>
                        <p>Try adjusting your search terms</p>
                      </>
                    ) : (
                      <>
                        <p className="text-lg font-medium mb-2">
                          No products available
                        </p>
                        <p>Add some products to get started</p>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default ViewPList;
