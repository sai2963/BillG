import pbillImg from "../../assets/pbill.png";
const LandingShowCasePBill = () => {
  return (
    <>
      <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
        <div className="flex-1">
          <h3 className="text-4xl font-bold mb-6 text-white">
            Manage Your Inventory
          </h3>
          <p className="text-xl text-gray-400 mb-6">
            Keep track of all your products in one place. View stock levels,
            prices, categories, and brands at a glance.
          </p>
          <ul className="space-y-4">
            {[
              "Complete product catalog with details",
              "Real-time stock quantity tracking",
              "Total inventory value calculation",
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="text-blue-500 text-2xl">✓</span>
                <span className="text-gray-300">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1">
          <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 p-2 rounded-2xl border border-blue-600/50 shadow-2xl shadow-blue-500/20">
            <div className="bg-black rounded-xl overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
                <img src={pbillImg} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default LandingShowCasePBill;