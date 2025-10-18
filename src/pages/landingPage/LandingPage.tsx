import ContactUs from "../../components/ContactUs/ContactUs";
import About from "../../components/LandingPage/About";
import Features from "../../components/LandingPage/Features";
import Footer from "../../components/LandingPage/Footer";
import Header from "../../components/LandingPage/Header";
import Hero from "../../components/LandingPage/Hero";
import Stats from "../../components/LandingPage/Stats";

const LandingPage = () => {
  return (
    <div>
      <Header />
      <Hero />
      <About />
      <Stats />
      <Features />
      <ContactUs />
      <Footer />
    </div>
  );
};

export default LandingPage;
