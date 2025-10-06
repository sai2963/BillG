import { useState } from "react";
import { Check, Zap, TrendingUp, Sparkles } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

import { SignedIn, SignedOut, useAuth } from "@clerk/clerk-react";
import { useSubscription } from "../contexts/subscription-context";

export default function BillGPricing() {
  const navigate = useNavigate();
  const location = useLocation();
  const { getToken } = useAuth(); // ADD THIS
  const { createSubscription, subscription } = useSubscription();
  const [loading, setLoading] = useState(null);

  const message = location.state?.message;

  const plans = [
    {
      name: "Monthly Plan",
      price: "₹100",
      duration: "per month",
      billingInfo: "Billed monthly",
      planType: "MONTHLY",
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
      planType: "ANNUAL",
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
      planType: "CUSTOM",
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

  const handleSelectPlan = async (planType) => {
    setLoading(planType);

    try {
      // Get the token first
      const token = await getToken();

      if (!token) {
        alert("Authentication error. Please login again.");
        setLoading(null);
        return;
      }

      const result = await createSubscription(planType);

      if (result.success) {
        alert("Subscription created successfully!");
        navigate("/bill");
      } else {
        alert(result.error || "Failed to create subscription");
      }
    } catch (error) {
      console.error("Error details:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Message Alert */}
        {message && (
          <div className="mb-8 bg-yellow-900/20 border border-yellow-500 text-yellow-200 px-4 py-3 rounded-lg">
            {message}
          </div>
        )}

        {/* Current Subscription Alert */}
        <SignedIn>
          {subscription && (
            <div className="mb-8 bg-blue-900/20 border border-blue-500 text-blue-200 px-4 py-3 rounded-lg">
              You currently have an active{" "}
              <strong>{subscription.planType}</strong> plan.
              <button
                onClick={() => navigate("/subscription/dashboard")}
                className="ml-4 underline hover:text-blue-100"
              >
                View Dashboard
              </button>
            </div>
          )}
        </SignedIn>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            It's easy to get started
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Choose the perfect plan for your business needs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-gray-900 rounded-2xl p-8 border transition-all duration-300 hover:scale-105 ${
                plan.popular
                  ? "border-purple-500 shadow-lg shadow-purple-500/20"
                  : "border-gray-800 hover:border-gray-700"
              }`}
            >
              {plan.popular && (
                <div className="bg-purple-500 text-white text-xs font-semibold px-3 py-1 rounded-full inline-block mb-4">
                  MOST POPULAR
                </div>
              )}

              <div
                className={`inline-flex p-3 rounded-lg mb-6 ${
                  plan.popular
                    ? "bg-purple-500 text-white"
                    : "bg-gray-800 text-gray-400"
                }`}
              >
                {plan.icon}
              </div>

              <h3 className="text-xl font-semibold text-white mb-4">
                {plan.name}
              </h3>

              <div className="mb-1">
                <span className="text-4xl font-bold text-white">
                  {plan.price}
                </span>
                <span className="text-gray-400 ml-2">{plan.duration}</span>
              </div>

              <p className="text-sm text-gray-500 mb-6">{plan.billingInfo}</p>

              <SignedOut>
                <button
                  onClick={() => navigate("/signup")}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 mb-8 ${
                    plan.popular
                      ? "bg-purple-500 text-white hover:bg-purple-600"
                      : "bg-gray-800 text-white hover:bg-gray-700"
                  }`}
                >
                  Sign Up to Subscribe
                </button>
              </SignedOut>

              <SignedIn>
                <button
                  onClick={() => handleSelectPlan(plan.planType)}
                  disabled={
                    loading === plan.planType ||
                    (subscription && subscription.planType === plan.planType)
                  }
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 mb-8 ${
                    plan.popular
                      ? "bg-purple-500 text-white hover:bg-purple-600 disabled:bg-purple-300"
                      : "bg-gray-800 text-white hover:bg-gray-700 disabled:bg-gray-600"
                  } disabled:cursor-not-allowed`}
                >
                  {loading === plan.planType
                    ? "Processing..."
                    : subscription && subscription.planType === plan.planType
                    ? "Current Plan"
                    : "Subscribe Now"}
                </button>
              </SignedIn>

              <ul className="space-y-3">
                {plan.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-start text-gray-300 text-sm"
                  >
                    <Check className="w-5 h-5 text-purple-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center text-gray-400 text-sm">
          <p>All plans include secure data storage and regular backups</p>
          <p className="mt-2">
            Need help choosing?{" "}
            <a href="#" className="text-purple-500 hover:text-purple-400">
              Contact us
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
