import { useState } from "react";

import useFetchProducts from "./useFetchProducts";
import useSearchProducts from "./useSearchProd";
import ProductsList from "./bill-products-list";
import CustomerDetails from "./bill-customer-details";
import Summary from "./bill-summary";
import CreateBill from "./bill-createbill-header";
import SearchProducts from "./bill-search-product";

const Bill_Form = () => {
  const { loading, error } = useFetchProducts();
  const [inputValue, setInputValue] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [formData, setFormData] = useState({
    customerName: "",
    mobileNumber: "",
    discount: "5%",
  });
  const { customerName, mobileNumber, discount } = formData;

  const inputHandleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-6">
        <div className="mx-auto max-w-5xl space-y-10">
          <CreateBill />

          <SearchProducts
            inputValue={inputValue}
            selectedProducts={selectedProducts}
            setSelectedProducts={setSelectedProducts}
            setInputValue={setInputValue}
            loading={loading}
            error={error}
            
          />
          <CustomerDetails
            customerName={customerName}
            mobileNumber={mobileNumber}
            discount={discount}
            inputHandleChange={inputHandleChange}
          />

          <ProductsList
            selectedProducts={selectedProducts}
            setSelectedProducts={setSelectedProducts}
            discount={discount}
          />

          <Summary
            selectedProducts={selectedProducts}
            discount={discount}
            customerName={customerName}
            mobileNumber={mobileNumber}
          />
        </div>
      </div>
    </>
  );
};

export default Bill_Form;
