import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const BillD = () => {
  const { billId } = useParams();
  const navigate = useNavigate();
  const [billData, setBillData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch bill data from localStorage
    const storedBill = localStorage.getItem(`bill_${billId}`);
    if (storedBill) {
      setBillData(JSON.parse(storedBill));
    } else {
      // Redirect to home if bill not found
      navigate('/');
    }
    setLoading(false);
  }, [billId, navigate]);

  const handlePrint = () => {
    window.print();
  };

  const handleNewBill = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-6 flex items-center justify-center">
        <div className="text-xl text-gray-600 dark:text-gray-400">Loading bill...</div>
      </div>
    );
  }

  if (!billData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-6 flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl text-red-600 mb-4">Bill not found</div>
          <button 
            onClick={handleNewBill}
            className="rounded-lg bg-indigo-600 px-6 py-2 font-medium text-white shadow-sm transition-colors hover:bg-indigo-700"
          >
            Create New Bill
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-6">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Header Section */}
        <div className="rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-md print:shadow-none">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                INVOICE
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Bill ID: #{billData.id}
              </p>
            </div>
            <div className="text-right text-sm text-gray-600 dark:text-gray-400">
              <p>Date: {billData.date}</p>
              <p>Time: {billData.time}</p>
            </div>
          </div>

          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            Customer Details
          </h2>
          <div className="space-y-2 text-sm sm:text-base">
            <div className="flex justify-between">
              <span className="font-medium text-gray-600 dark:text-gray-300">
                Name:
              </span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {billData.customerName}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600 dark:text-gray-300">
                Phone:
              </span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {billData.mobileNumber}
              </span>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto rounded-2xl bg-white dark:bg-gray-800 shadow-md print:shadow-none">
          <table className="min-w-full text-sm text-gray-700 dark:text-gray-200">
            <thead className="bg-gray-100 text-left text-gray-600 dark:bg-gray-700 dark:text-gray-300">
              <tr>
                <th className="px-6 py-3">SNO</th>
                <th className="px-6 py-3">Product Name</th>
                <th className="px-6 py-3">Quantity</th>
                <th className="px-6 py-3">Unit Price</th>
                <th className="px-6 py-3">Total Price</th>
              </tr>
            </thead>
            <tbody>
              {billData.products.map((product, index) => (
                <tr
                  key={product.id}
                  className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="px-6 py-3">{index + 1}</td>
                  <td className="px-6 py-3">{product.title}</td>
                  <td className="px-6 py-3">{product.quantity}</td>
                  <td className="px-6 py-3">₹{product.price.toFixed(2)}</td>
                  <td className="px-6 py-3">₹{(product.price * product.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary Section */}
        <div className="flex flex-col items-end rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-md print:shadow-none">
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4 w-full">
            Invoice Summary
          </h2>
          <div className="w-full max-w-md space-y-4 text-sm sm:text-base">
            <div className="flex justify-between">
              <span className="font-medium text-gray-600 dark:text-gray-300">
                Subtotal:
              </span>
              <span className="font-semibold text-gray-900 dark:text-white">
                ₹{billData.totalAmount.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-600 dark:text-gray-300">
                Discount ({billData.discount}):
              </span>
              <span className="text-indigo-600 dark:text-indigo-400 font-semibold">
                -₹{billData.discountAmount.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between border-t border-gray-300 pt-3 dark:border-gray-700">
              <span className="font-bold text-gray-800 dark:text-gray-100">
                Final Amount:
              </span>
              <span className="text-xl font-extrabold text-green-600 dark:text-green-400">
                ₹{billData.finalPrice.toFixed(2)}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex gap-4 justify-end print:hidden">
              <button 
                onClick={handleNewBill}
                className="rounded-lg bg-gray-600 px-6 py-2 font-medium text-white shadow-sm transition-colors hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                New Bill
              </button>
              <button 
                onClick={handlePrint}
                className="rounded-lg bg-indigo-600 px-6 py-2 font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Print Invoice
              </button>
            </div>
          </div>
        </div>

        {/* Thank You Section */}
        <div className="text-center rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-md print:shadow-none">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
            Thank You for Your Business!
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            We appreciate your trust in our services.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BillD;