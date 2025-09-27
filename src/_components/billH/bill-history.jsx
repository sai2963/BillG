import { useState, useEffect } from "react";
import useFetchBills from "./useFetchBills";

import BillLoading from "./billh-loading";
import BillNotFound from "./billh-not-found";

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

  //  console.log(bills);

  // Group bills by date
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

  // Format time
  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString();
  };

  const handleNewBill = () => {
    navigate("/");
  };
  // Format currency
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
        <BillNotFound handleNewBill={handleNewBill}/>
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
          .sort((a, b) => new Date(b) - new Date(a)) // Latest first
          .map((date) => (
            <div key={date} className="mb-8">
              {/* Date Header */}
              <h2 className="text-lg font-semibold mb-4 text-blue-600">
                {date} ({billsByDate[date].length} bills)
              </h2>

              {/* Bills for this date */}
              {billsByDate[date].map((bill) => (
                <div
                  key={bill.id}
                  className="bg-white border rounded-lg p-4 mb-4 shadow-sm"
                >
                  {/* Bill Header */}
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <h3 className="font-semibold">{bill.billNumber}</h3>
                      <p className="text-sm text-gray-500">
                        {formatTime(bill.createdAt)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">
                        {formatMoney(bill.finalAmount)}
                      </p>
                    </div>
                  </div>

                  {/* Customer Info */}
                  {bill.customer && (
                    <div className="mb-3">
                      <p>
                        <strong>Customer:</strong> {bill.customer.name}
                      </p>
                      <p>
                        <strong>Phone:</strong> {bill.customer.mobileNumber}
                      </p>
                    </div>
                  )}

                  {/* Items */}
                  {bill.items && bill.items.length > 0 && (
                    <div className="mb-3">
                      <p className="font-semibold mb-2">Items:</p>
                      <div className="bg-gray-50 p-2 rounded">
                        {bill.items.map((item, index) => (
                          <div
                            key={index}
                            className="flex justify-between text-sm mb-1"
                          >
                            <span>
                              {item.product.title || item.productName} ×{" "}
                              {item.quantity}
                            </span>
                            <span>
                              {formatMoney(
                                (item.product.price || item.rate) *
                                  item.quantity
                              )}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Bill Summary */}
                  <div className="border-t pt-3 text-sm">
                    <div className="flex justify-between mb-1">
                      <span>Subtotal:</span>
                      <span>{formatMoney(bill.totalAmount)}</span>
                    </div>
                    {bill.tax > 0 && (
                      <div className="flex justify-between mb-1">
                        <span>Tax:</span>
                        <span>{formatMoney(bill.tax)}</span>
                      </div>
                    )}
                    {bill.discountAmount > 0 && (
                      <div className="flex justify-between mb-1">
                        <span>Discount:</span>
                        <span className="text-green-600">
                          -{formatMoney(bill.discountAmount)}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between font-bold border-t pt-1">
                      <span>Total:</span>
                      <span>{formatMoney(bill.finalAmount)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))
      )}
    </div>
  );
};

export default BillHistory;
