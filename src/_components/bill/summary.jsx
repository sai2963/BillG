import { useNavigate } from "react-router-dom";
const Summary = ({
  selectedProducts,
  discount,
  customerName,
  mobileNumber,
}) => {
  const navigate = useNavigate();
  const totalAmount = selectedProducts.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  const discountAmount = totalAmount * (parseInt(discount) / 100);
  const finalPrice = totalAmount - discountAmount;

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
      time: new Date().toLocaleTimeString(),
    };

    // Store bill data in localStorage (you can use a better state management solution)
    localStorage.setItem(`bill_${billData.id}`, JSON.stringify(billData));

    // Navigate to bill display page
    navigate(`/bill/${billData.id}`);
  };
  return (
    <>
      <div className="flex flex-col items-end rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-md">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 self-start">
          Bill Summary
        </h2>
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
              disabled={
                selectedProducts.length === 0 ||
                !customerName.trim() ||
                !mobileNumber.trim()
              }
              className="rounded-lg bg-indigo-600 px-6 py-2 font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Generate Bill
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Summary;
