import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BillHeader from "./gbill-header";
import BillCustomerDetails from "./gbill-customer-details";
import ProductsTable from "./gbill-products-table";
import BillSummary from "./gbill-summary";
import BillFooter from "./gbill-footer";
import BillLoading from "./gbill-loading";
import BillNotFound from "./gbill-not-found";
import axios from "axios";

const BillD = () => {
  const { billId } = useParams();
  const navigate = useNavigate();
  const [billData, setBillData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBill = async () => {
      try {
        // Make API request
        const res = await axios.get(
          `https://bill-g-bd.vercel.app/api/bills/${billId}`
        );

        // Extract bill data
        const bill = res.data.bill;
        

        if (bill) {
          setBillData(bill);
        } else {
          // Redirect if bill not found
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching bill:", error);
        navigate("/"); // optional redirect on error
      } finally {
        setLoading(false);
      }
    };

    fetchBill();
  }, [billId, navigate]);

  const handleNewBill = () => {
    navigate("/");
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
        <BillNotFound handleNewBill={handleNewBill} />
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
