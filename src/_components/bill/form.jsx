import { useState } from "react";

import useFetchProducts from "./useFetchProducts";
import useSearchProducts from "./useSearchProd";
import ProductsList from "./productsList";
import CustomerDetails from "./customerDetails";
import Summary from "./summary";

const Bill_Form = () => {
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
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your submit logic here
  };

  // Calculate totals

  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-6">
        <div className="mx-auto max-w-5xl space-y-10">
          {/* Page Title */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Create New Bill
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Search products and create customer bills
            </p>
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

          <CustomerDetails
            customerName={customerName}
            setCustomerName={setCustomerName}
            mobileNumber={mobileNumber}
            setMobileNumber={setMobileNumber}
            discount={discount}
            setDiscount={setDiscount}
          />
          {/* Table Section */}

          <ProductsList
            selectedProducts={selectedProducts}
            setSelectedProducts={setSelectedProducts}
            discount={discount}
          />
          {/* Summary Section */}
          <Summary
            selectedProducts={selectedProducts}
            discount={discount}
            customerName={customerName}
            mobileNumber={mobileNumber}
          />
        </div>
      </div>
    </>
  );
};

export default Bill_Form;
