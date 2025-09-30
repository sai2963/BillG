const BillNotFound = () => {
  const handleNewBill = () => {
    navigate("/");
  };
  return (
    <>
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
    </>
  );
};
export default BillNotFound;
