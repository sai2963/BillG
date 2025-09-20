import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetchProducts from "./useFetchProducts";
import useSearchProducts from "./useSearchProd";

const Bill_Form = () => {
  const navigate = useNavigate();
  const { loading, error } = useFetchProducts();
  const [inputValue, setInputValue] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [discount, setDiscount] = useState("5%");

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const filterProducts = useSearchProducts(inputValue);

  const handleProductSelect = (product) => {
    const existingProduct = selectedProducts.find((p) => p.id === product.id);

    if (existingProduct) {
      // If product exists, increase quantity
      setSelectedProducts((prev) =>
        prev.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        )
      );
    } else {
      
      setSelectedProducts((prev) => [...prev, { ...product, quantity: 1 }]);
    }

    // Clear input after selection
    setInputValue("");
  };

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

  // Calculate totals
  const totalAmount = selectedProducts.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  const discountAmount = totalAmount * (parseInt(discount) / 100);
  const finalPrice = totalAmount - discountAmount;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your submit logic here
  };

  const handleGenerateBill = () => {
    if (selectedProducts.length === 0) return;

    // Create bill data
    const billData = {
      id: Date.now(), // Simple ID generation
      customerName,
      mobileNumber,
      products: selectedProducts,
      discount,
      totalAmount,
      discountAmount,
      finalPrice,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString()
    };

    // Store bill data in localStorage (you can use a better state management solution)
    localStorage.setItem(`bill_${billData.id}`, JSON.stringify(billData));

    // Navigate to bill display page
    navigate(`/bill/${billData.id}`);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-6">
        <div className="mx-auto max-w-5xl space-y-10">
          {/* Page Title */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Create New Bill</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Search products and create customer bills</p>
          </div>

          {/* Product Search Section */}
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
                      {prod.title} - ${prod.price}
                    </li>
                  ))
                ) : inputValue.trim() !== "" ? (
                  <li className="text-red-500 p-2">No product found</li>
                ) : null}
              </ul>
            </div>
          </form>

          {/* Customer Details Form */}
          <div className="rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Customer Details</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Customer Name *
                </label>
                <input
                  type="text"
                  placeholder="Enter customer name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  placeholder="Enter mobile number"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  required
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Discount
                </label>
                <select
                  name="discount"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                >
                  <option value="0%">No Discount</option>
                  <option value="5%">5%</option>
                  <option value="10%">10%</option>
                  <option value="15%">15%</option>
                  <option value="20%">20%</option>
                </select>
              </div>
            </div>
          </div>

          {/* Table Section */}
          <div className="overflow-x-auto rounded-2xl bg-white dark:bg-gray-800 shadow-md">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Selected Products</h2>
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
                      No products selected. Search and click on products to add them.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Summary Section */}
          <div className="flex flex-col items-end rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-md">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 self-start">Bill Summary</h2>
            <div className="w-full max-w-md space-y-4 text-sm sm:text-base">
              <div className="flex justify-between">
                <span className="font-medium text-gray-600 dark:text-gray-300">
                  Total Amount:
                </span>
                <span className="font-semibold text-gray-900 dark:text-white">
                  ₹{totalAmount.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-600 dark:text-gray-300">
                  Discount ({discount}):
                </span>
                <span className="text-indigo-600 dark:text-indigo-400 font-semibold">
                  -₹{discountAmount.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between border-t border-gray-300 pt-3 dark:border-gray-700">
                <span className="font-bold text-gray-800 dark:text-gray-100">
                  Final Price:
                </span>
                <span className="text-xl font-extrabold text-green-600 dark:text-green-400">
                  ₹{finalPrice.toFixed(2)}
                </span>
              </div>

              {/* Generate Bill Button */}
              <div className="pt-4 flex justify-end">
                <button
                  onClick={handleGenerateBill}
                  disabled={selectedProducts.length === 0 || !customerName.trim() || !mobileNumber.trim()}
                  className="rounded-lg bg-indigo-600 px-6 py-2 font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Generate Bill
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Bill_Form;