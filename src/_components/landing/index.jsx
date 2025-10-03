import LandingHeader from "./landing-header";
import LandingHome from "./landing-home";
import LandingFeatures from "./landing-features";
import LandingShowCaseCbill from "./landing-showcase-cbill";
import LandingShowCasePBill from "./landing-showcase-pbill";
import LandingShowCaseABill from "./landing-showcase-abill";
import LandingStats from "./landing-stats";
import LandingCTA from "./landing-cta";
import LandingFooter from "./landing-footer";
import LandingShowCase from "./landing-showcase";
export default function Landing() {
  return (
    <div className="bg-black text-white overflow-x-hidden">
      <LandingHeader />

      <LandingHome />

      <LandingFeatures />

      <LandingShowCase />

      <LandingStats />

      <LandingCTA />

      <LandingFooter />
    </div>
  );
}
