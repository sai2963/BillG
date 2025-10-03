import abillImg from "../../assets/abill.png";
const LandingShowCaseABill = ()=>{
    return(
        <>
        <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <h3 className="text-4xl font-bold mb-6 text-white">
                Add Products Quickly
              </h3>
              <p className="text-xl text-gray-400 mb-6">
                Expand your product catalog with ease. Add new products with all
                the necessary details in a simple, streamlined form.
              </p>
              <ul className="space-y-4">
                {[
                  "Simple product entry form",
                  "Category and brand organization",
                  "Instant availability for billing",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-cyan-500 text-2xl">✓</span>
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1">
              <div className="bg-gradient-to-br from-cyan-600/20 to-purple-600/20 p-2 rounded-2xl border border-cyan-600/50 shadow-2xl shadow-cyan-500/20">
                <div className="bg-black rounded-xl overflow-hidden">
                  <div className="aspect-video bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
                    <img src={abillImg} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
    )
}
export default LandingShowCaseABill