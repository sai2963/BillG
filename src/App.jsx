import './App.css';
import { Routes, Route } from 'react-router-dom';
import Bill_Form from './_components/bill/form';
import BillD from './_components/gbill/billD';
import Header from './_components/header';
import Form from './_components/pAdd/form';
import View from './_components/pView/view';

function App() {
  return (
    <div className="App">
      
      <Header />
      <Routes>
        {/* Bill Creation Form */}
        <Route path="/" element={<Bill_Form />} />
        
        {/* Generated Bill Display */}
        <Route path="/bill/:billId" element={<BillD/>} />
        
        {/* Product Management */}
        <Route path="/products/add" element={<Form/>} />
        <Route path="/products/view" element={<View/>} />
        
        {/* Fallback route */}
        <Route path="*" element={<Bill_Form />} />
      </Routes>
    </div>
  );
}

export default App;