import { Routes, Route, Navigate } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  RedirectToSignUp,
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
import SubscriptionDashboard from "./_components/subscription/subscription-dashboard";
import SubscriptionGuard from "./_components/subscription/subscription-gaurd";
import { SubscriptionProvider } from "./_components/contexts/subscription-context";


function App() {
  return (
    <SubscriptionProvider>
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
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          />

          <Route
            path="/signup"
            element={
              <>
                <SignedIn>
                  <Navigate to="/bill" replace />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignUp />
                </SignedOut>
              </>
            }
          />

          {/* Subscription Dashboard - Protected */}
          <Route
            path="/subscription/dashboard"
            element={
              <>
                <SignedIn>
                  <SubscriptionDashboard />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          />

          {/* Protected routes with Subscription Guard */}
          <Route
            path="/bill"
            element={
              <>
                <SignedIn>
                  <SubscriptionGuard>
                    <Bill_Form />
                  </SubscriptionGuard>
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
                  <SubscriptionGuard>
                    <BillD />
                  </SubscriptionGuard>
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
                  <SubscriptionGuard>
                    <Form />
                  </SubscriptionGuard>
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
                  <SubscriptionGuard>
                    <View />
                  </SubscriptionGuard>
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
                  <SubscriptionGuard>
                    <BillHistory />
                  </SubscriptionGuard>
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
    </SubscriptionProvider>
  );
}

export default App;