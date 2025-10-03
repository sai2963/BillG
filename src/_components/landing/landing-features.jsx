const LandingFeatures = () => {
  return (
    <>
      <section id="features" className="py-20 px-8 relative">
        <h2 className="text-5xl font-bold text-center mb-16 gradient-text">
          Powerful Features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {[
            {
              icon: "📄",
              title: "Create Bills",
              desc: "Generate professional bills with customer details, product selection, and automatic discount calculations.",
            },
            {
              icon: "📦",
              title: "Product Management",
              desc: "Add, edit, and organize your product inventory with prices, stock quantities, and categories.",
            },
            {
              icon: "📊",
              title: "Inventory Tracking",
              desc: "View complete product inventory with real-time stock levels and total inventory value.",
            },
            {
              icon: "🔍",
              title: "Smart Search",
              desc: "Quickly find products and bills with intelligent search across categories, brands, and names.",
            },
            {
              icon: "💰",
              title: "Discount Management",
              desc: "Apply flexible discounts with automatic calculations and see real-time pricing updates.",
            },
            {
              icon: "📜",
              title: "Bill History",
              desc: "Access complete billing history with detailed transaction records and customer information.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white/5 border border-purple-600/30 rounded-3xl p-8 backdrop-blur-lg hover:-translate-y-3 hover:border-purple-600 hover:shadow-xl hover:shadow-purple-500/30 hover:bg-white/8 transition-all duration-300"
            >
              <div className="text-5xl mb-4 gradient-text">{feature.icon}</div>
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};
export default LandingFeatures;