const BillCustomerDetails = ({billData}) => {
  return (
    <>
      <div>
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
    </>
  );
};
export default BillCustomerDetails;