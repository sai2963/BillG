import "./App.css";
import { Routes, Route } from "react-router-dom";
import Bill_Form from "./_components/bill/form";
import BillD from "./_components/gbill/billD";
import Header from "./_components/header/header";
import Form from "./_components/pAdd/form";
import View from "./_components/pView/view";
import BillHistory from "./_components/billH/bill-history";
import Landing from "./_components/landing";
import BillGPricing from "./_components/pricing";
import Authe from "./_components/authentication";

function App() {
  return (
    <div className="App">
      
      <Header/>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/pricing" element={<BillGPricing />} />
        <Route path="/auth" element={<Authe />} />
        <Route path="/bill" element={<Bill_Form />} />

        <Route path="/bill/:billId" element={<BillD />} />

        <Route path="/products/add" element={<Form />} />
        <Route path="/products/view" element={<View />} />

        <Route path="/billh" element={<BillHistory />} />

        <Route path="*" element={<Bill_Form />} />
      </Routes>
    </div>
  );
}

export default App;
