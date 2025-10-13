import About from "../../components/LandingPage/About";
import Faqs from "../../components/LandingPage/Faqs";
import Features from "../../components/LandingPage/Features";
import Footer from "../../components/LandingPage/Footer";
import Header from "../../components/LandingPage/Header";
import Hero from "../../components/LandingPage/Hero";
import Stats from "../../components/LandingPage/Stats";
import Testimonials from "../../components/LandingPage/Testimonials";

const LandingPage = () => {
  return (
    <div>
      <Header />
      <Hero />
      <About />
      <Stats />
      <Features />
      <Testimonials />
      <Faqs />
      <Footer />
    </div>
  );
};

export default LandingPage;
