import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-orange-500 text-white py-20">
      <div className="max-w-3xl mx-auto px-4 text-center flex flex-col items-center justify-center">
        
        <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
          Affärssystemet för bilhandlare
        </h2>

        <p className="text-lg font-medium mb-8 leading-relaxed">
          Caringo är ett affärssystem utvecklat specifikt för bilhandlare
          som vill arbeta smartare. Här samlar vi allt du behöver på ett och
          samma ställe – från lageröversikt och digitala avtal med
          BankID-signering, till Swish-utbetalningar, automatisk annonsering
          på Blocket och Bytbil, samt detaljerad fordonsinformation om
          ägare, skulder och historik.
        </p>

        <button
          className="bg-white text-orange-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-medium cursor-pointer"
          onClick={() => navigate("/signup")}
        >
          Skapa konto
        </button>
      </div>
    </section>
  );
};

export default About;
