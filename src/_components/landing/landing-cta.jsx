const LandingCTA = () => {
  return (
    <>
      <section id="contact" className="py-20 px-8 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6 gradient-text">
            Ready to Transform Your Billing?
          </h2>
          <p className="text-xl text-gray-400 mb-10">
            Join businesses already using BillG to streamline their operations
            and grow faster.
          </p>
          <div className="flex gap-6 justify-center flex-wrap">
            <button className="px-12 py-5 text-xl font-semibold rounded-full bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg shadow-purple-500/30 hover:-translate-y-1 hover:shadow-purple-500/50 transition-all duration-300">
              Start Free Trial
            </button>
            
          </div>
        </div>
      </section>
    </>
  );
};
export default LandingCTA