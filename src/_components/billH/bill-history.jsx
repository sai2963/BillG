import { useState, useEffect } from "react";
import useFetchBills from "./useFetchBills";

import BillLoading from "./billh-loading";
import BillNotFound from "./billh-not-found";
import DateHeader from "./billh-date-header";
import BillHeader from "./billh-bill-header";
import CustomerInfo from "./billh-customer-info";
import ItemsInfo from "./billh-items-info";
import BillhSummary from "./billh-summary";

const BillHistory = () => {
  const { state, loading, error } = useFetchBills();
  const [bills, setBills] = useState();
  useEffect(() => {
    if (Array.isArray(state)) {
      setBills(state);
    } else {
      setBills([]);
    }
  }, [state]);

  const groupBillsByDate = () => {
    const grouped = {};
    bills.forEach((bill) => {
      const date = new Date(bill.createdAt).toDateString();
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(bill);
    });
    console.log(grouped);

    return grouped;
  };

  const formatMoney = (amount) => {
    return `₹${amount?.toLocaleString() || 0}`;
  };

  if (loading) {
    return (
      <>
        <BillLoading />
      </>
    );
  }

  if (error) {
    return (
      <>
        <BillNotFound />
      </>
    );
  }

  const billsByDate = groupBillsByDate();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Bill History</h1>

      {billsByDate.length === 0 ? (
        <div className="text-center text-gray-500 py-8">No bills found</div>
      ) : (
        Object.keys(billsByDate)
          .sort((a, b) => new Date(b) - new Date(a))
          .map((date) => (
            <div key={date} className="mb-8">
              <DateHeader date={date} billsByDate={billsByDate} />

              {billsByDate[date].map((bill) => (
                <div
                  key={bill.id}
                  className="bg-white border rounded-lg p-4 mb-4 shadow-sm"
                >
                  <BillHeader bill={bill} formatMoney={formatMoney} />

                  <CustomerInfo bill={bill} />

                  <ItemsInfo bill={bill} formatMoney={formatMoney} />

                  {/* Bill Summary */}
                  <BillhSummary bill={bill} formatMoney={formatMoney} />
                </div>
              ))}
            </div>
          ))
      )}
    </div>
  );
};

export default BillHistory;
