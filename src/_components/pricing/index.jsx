import React from "react";
import { Check, Zap, TrendingUp, Sparkles } from "lucide-react";
import PricingHeader from "./pricing-header";
import PricingCards from "./pricing-cards";

export default function BillGPricing() {
  const plans = [
    {
      name: "Monthly Plan",
      price: "₹100",
      duration: "per month",
      billingInfo: "Billed monthly",
      features: [
        "Unlimited bill generation",
        "Basic templates",
        "Email support",
        "Mobile app access",
        "Data export",
        "Cancel anytime",
      ],
      popular: false,
      icon: <Zap className="w-6 h-6" />,
    },
    {
      name: "Annual Plan",
      price: "₹500",
      duration: "per year",
      billingInfo: "Save ₹700 per year",
      features: [
        "Everything in Monthly",
        "Premium templates",
        "Priority support",
        "Advanced analytics",
        "Custom branding",
        "API access",
        "Bulk operations",
        "Team collaboration",
      ],
      popular: true,
      icon: <TrendingUp className="w-6 h-6" />,
    },
    {
      name: "Custom Plan",
      price: "₹1",
      duration: "per bill",
      billingInfo: "Billed on 11th of every month",
      features: [
        "Pay only for what you use",
        "Perfect for occasional use",
        "All premium features",
        "No monthly commitment",
        "Flexible billing",
        "Full feature access",
        "Auto-billing on 11th",
      ],
      popular: false,
      icon: <Sparkles className="w-6 h-6" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-950 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <PricingHeader />

        <PricingCards plans={plans} />
      </div>
    </div>
  );
}
