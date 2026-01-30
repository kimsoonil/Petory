import HeroSection from "../_components/landing/HeroSection";
import FeatureSection from "../_components/landing/FeatureSection";
import CTASection from "../_components/landing/CTASection";
import Footer from "../_components/landing/Footer";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <FeatureSection />
      <CTASection />
      <Footer />
    </main>
  );
}
