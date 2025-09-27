import { useNavigate } from "react-router-dom";
import axios from "axios";
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

  const handleGenerateBill = async () => {
    if (selectedProducts.length === 0) return;

    const BillData = {
      id: Date.now(),
      customerName,
      mobileNumber,
      items: selectedProducts.map((p) => ({
        productId: p.id, 
        quantity: p.quantity, 
      })),
      discountPercent: parseInt(discount) || 0, 
      paymentMethod: "CASH",
      paymentStatus: "PENDING",
    };

    try {
      const res = await axios.post(
        "https://bill-g-bd.vercel.app/api/bills",
        BillData
      );
      console.log("Bill created:", res.data);
      navigate(`/bill/${BillData.id}`);
    } catch (error) {
      console.error(
        "Error creating bill:",
        error.response?.data || error.message
      );
    }

    
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
