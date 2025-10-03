import LandingShowCaseABill from "./landing-showcase-abill";
import LandingShowCaseCbill from "./landing-showcase-cbill";
import LandingShowCasePBill from "./landing-showcase-pbill";

const LandingShowCase = () => {
  return (
    <>
      <section id="showcase" className="py-20 px-8 relative">
        <h2 className="text-5xl font-bold text-center mb-16 gradient-text">
          See It In Action
        </h2>

        <div className="max-w-7xl mx-auto space-y-20">
          <LandingShowCaseCbill />

          <LandingShowCasePBill />

          <LandingShowCaseABill />
        </div>
      </section>
    </>
  );
};
export default LandingShowCase;