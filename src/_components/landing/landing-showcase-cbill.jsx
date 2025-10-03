import cbillImg from "../../assets/cbill.png";
const LandingShowCaseCbill = () => {
  return (
    <>
      <div className="flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1">
          <h3 className="text-4xl font-bold mb-6 text-white">
            Create Bills Effortlessly
          </h3>
          <p className="text-xl text-gray-400 mb-6">
            Our intuitive interface makes billing a breeze. Search products, add
            customer details, apply discounts, and generate professional bills
            in seconds.
          </p>
          <ul className="space-y-4">
            {[
              "Real-time product search with instant results",
              "Automatic price calculations with discounts",
              "Customer information management",
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="text-purple-500 text-2xl">✓</span>
                <span className="text-gray-300">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1">
          <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 p-2 rounded-2xl border border-purple-600/50 shadow-2xl shadow-purple-500/20">
            <div className="bg-black rounded-xl overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
                <img src={cbillImg} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default LandingShowCaseCbill;