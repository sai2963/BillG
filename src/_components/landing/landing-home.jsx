const LandingHome = () => {
  return (
    <>
      <section
        id="home"
        className="min-h-screen flex items-center justify-center text-center px-8 relative"
      >
        <div className="hero-content max-w-4xl">
          <h1 className="text-6xl md:text-7xl font-black mb-6 gradient-text leading-tight">
            Smart Billing Made Simple
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-400">
            Streamline your business with powerful billing and inventory
            management. Create bills, manage products, and track history - all
            in one place.
          </p>
          <div className="flex gap-6 justify-center flex-wrap">
            <button
              onClick={() => scrollToSection("features")}
              className="px-10 py-4 text-lg font-semibold rounded-full bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg shadow-purple-500/30 hover:-translate-y-1 hover:shadow-purple-500/50 transition-all duration-300"
            >
              Get Started
            </button>
            
          </div>
        </div>
      </section>
    </>
  );
};
export default LandingHome;
