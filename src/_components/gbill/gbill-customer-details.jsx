const BillCustomerDetails = ({billData}) => {
  return (
    <>
      <div>
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Customer Details
        </h2>
        <div className="space-y-2 text-sm sm:text-base flex gap-5">
          <div className="flex gap-3">
            <span className="font-medium text-gray-600 dark:text-gray-300">
              Name  :
            </span>
            <span className="font-semibold text-gray-900 dark:text-white">
              {billData.customer.name.toUpperCase()}
            </span>
          </div>
          <div className="flex gap-3">
            <span className="font-medium text-gray-600 dark:text-gray-300">
              Phone:
            </span>
            <span className="font-semibold text-gray-900 dark:text-white">
              {billData.customer.mobileNumber}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
export default BillCustomerDetails;