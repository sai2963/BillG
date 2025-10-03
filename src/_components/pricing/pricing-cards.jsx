import { Check, Zap, TrendingUp, Sparkles } from 'lucide-react';
const PricingCards = ({plans}) => {
  return <>
  <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-gray-900 rounded-2xl p-8 border transition-all duration-300 hover:scale-105 ${
                plan.popular
                  ? 'border-purple-500 shadow-lg shadow-purple-500/20'
                  : 'border-gray-800 hover:border-gray-700'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="bg-purple-500 text-white text-xs font-semibold px-3 py-1 rounded-full inline-block mb-4">
                  MOST POPULAR
                </div>
              )}

              {/* Icon */}
              <div className={`inline-flex p-3 rounded-lg mb-6 ${
                plan.popular ? 'bg-purple-500 text-white' : 'bg-gray-800 text-gray-400'
              }`}>
                {plan.icon}
              </div>

              {/* Plan Name */}
              <h3 className="text-xl font-semibold text-white mb-4">{plan.name}</h3>

              {/* Price */}
              <div className="mb-1">
                <span className="text-4xl font-bold text-white">{plan.price}</span>
                <span className="text-gray-400 ml-2">{plan.duration}</span>
              </div>

              {/* Billing Info */}
              <p className="text-sm text-gray-500 mb-6">{plan.billingInfo}</p>

              {/* CTA Button */}
              <button
                className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 mb-8 ${
                  plan.popular
                    ? 'bg-purple-500 text-white hover:bg-purple-600'
                    : 'bg-gray-800 text-white hover:bg-gray-700'
                }`}
              >
                Get Started
              </button>

              {/* Features */}
              <ul className="space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start text-gray-300 text-sm">
                    <Check className="w-5 h-5 text-purple-500 mr-3 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
  </>;
};
export default PricingCards