const ProductsList = ({ selectedProducts, setSelectedProducts, discount }) => {
  const handleQuantityIncrease = (productId) => {
    setSelectedProducts((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, quantity: p.quantity + 1 } : p
      )
    );
  };

  const handleQuantityDecrease = (productId) => {
    setSelectedProducts((prev) =>
      prev
        .map((p) =>
          p.id === productId
            ? { ...p, quantity: Math.max(1, p.quantity - 1) }
            : p
        )
        .filter((p) => p.quantity > 0)
    );
  };

  const handleRemoveProduct = (productId) => {
    setSelectedProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  
  
  return (
    <>
      <div className="overflow-x-auto rounded-2xl bg-white dark:bg-gray-800 shadow-md">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Selected Products
          </h2>
        </div>
        <table className="min-w-full text-sm text-gray-700 dark:text-gray-200">
          <thead className="bg-gray-100 text-left text-gray-600 dark:bg-gray-700 dark:text-gray-300">
            <tr>
              <th className="px-6 py-3">SNO</th>
              <th className="px-6 py-3">Product Name</th>
              <th className="px-6 py-3">Quantity</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Total</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {selectedProducts.length > 0 ? (
              selectedProducts.map((product, index) => (
                <tr
                  key={product.id}
                  className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                  <td className="px-6 py-3">{index + 1}</td>
                  <td className="px-6 py-3">{product.title}</td>
                  <td className="px-6 py-3">{product.quantity}</td>
                  <td className="px-6 py-3">₹{product.price}</td>
                  <td className="px-6 py-3">
                    ₹{(product.price * product.quantity).toFixed(2)}
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleQuantityIncrease(product.id)}
                        className="rounded-lg bg-green-600 px-3 py-1 text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                        title="Increase quantity"
                      >
                        +
                      </button>
                      <button
                        onClick={() => handleQuantityDecrease(product.id)}
                        className="rounded-lg bg-yellow-600 px-3 py-1 text-white shadow-sm hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        title="Decrease quantity"
                      >
                        -
                      </button>
                      <button
                        onClick={() => handleRemoveProduct(product.id)}
                        className="rounded-lg bg-red-600 px-3 py-1 text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                        title="Remove product"
                      >
                        ×
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="px-6 py-8 text-center text-gray-500 dark:text-gray-400"
                >
                  No products selected. Search and click on products to add
                  them.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
  
};
export default ProductsList;
