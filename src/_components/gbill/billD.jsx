import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BillHeader from "./billHeader";
import BillCustomerDetails from "./billCustomerDetails";
import ProductsTable from "./productsTable";
import BillSummary from "./billSummary";
import BillFooter from "./billFooter";
import BillLoading from "./loading";
import BillNotFount from "./not-found";

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
      navigate("/");
    }
    setLoading(false);
  }, [billId, navigate]);

  const handleNewBill = () => {
    navigate("/");
    localStorage.clear();
  };

  if (loading) {
    return (
      <>
        <BillLoading />
      </>
    );
  }

  if (!billData) {
    return (
      <>
        <BillNotFount handleNewBill={handleNewBill} />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-6">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Header Section */}
        <div className="rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-md print:shadow-none">
          <BillHeader billData={billData} />

          <BillCustomerDetails billData={billData} />
        </div>

        {/* Table Section */}
        <ProductsTable billData={billData} />

        {/* Summary Section */}
        <BillSummary billData={billData} handleNewBill={handleNewBill} />

        {/* Thank You Section */}
        <BillFooter />
      </div>
    </div>
  );
};

export default BillD;
