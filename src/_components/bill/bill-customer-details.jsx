import { useState } from "react";

const CustomerDetails = ({
  customerName,
  mobileNumber,
  discount,
  inputHandleChange,
}) => {
  return (
    <>
      <div className="rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-md">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Customer Details
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Customer Name *
            </label>
            <input
              type="text"
              placeholder="Enter customer name"
              name="customerName"
              value={customerName}
              onChange={inputHandleChange}
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
              name="mobileNumber"
              value={mobileNumber}
              onChange={inputHandleChange}
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
              onChange={inputHandleChange}
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
    </>
  );
};
export default CustomerDetails;
