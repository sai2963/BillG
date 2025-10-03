import { Routes, Route, Navigate } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  useAuth,
} from "@clerk/clerk-react";
import "./App.css";
import Landing from "./_components/landing";
import BillGPricing from "./_components/pricing";

import Bill_Form from "./_components/bill/form";
import BillD from "./_components/gbill/billD";
import Form from "./_components/pAdd/form";
import View from "./_components/pView/view";
import BillHistory from "./_components/billH/bill-history";
import Header from "./_components/header/header";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/pricing" element={<BillGPricing />} />

        {/* Login route - redirect to /bill if already signed in */}
        <Route
          path="/login"
          element={
            <>
              <SignedIn>
                <Navigate to="/bill" replace />
              </SignedIn>
              <SignedOut>
                <Navigate to="/login" replace />
              </SignedOut>
            </>
          }
        />

        {/* Protected routes */}
        <Route
          path="/bill"
          element={
            <>
              <SignedIn>
                <Bill_Form />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/bill/:billId"
          element={
            <>
              <SignedIn>
                <BillD />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/products/add"
          element={
            <>
              <SignedIn>
                <Form />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/products/view"
          element={
            <>
              <SignedIn>
                <View />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/billh"
          element={
            <>
              <SignedIn>
                <BillHistory />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
