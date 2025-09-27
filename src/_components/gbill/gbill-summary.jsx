const BillSummary = ({ billData, handleNewBill }) => {
  const handlePrint = () => {
    window.print();
  };
  return (
    <>
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
              ₹{billData.finalAmount.toFixed(2)}
            </span>
          </div>

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
    </>
  );
};
export default BillSummary;
