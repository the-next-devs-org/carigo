import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat text-white py-20"
      style={{ backgroundImage: "url('/hand-phone.png')", }} // 👉 apni image ka sahi path lagana
    >
      {/* Overlay for dark shade (optional) */}
      <div className="absolute bg-black/40"></div>

      <div className="relative max-w-7xl mx-auto px-6 text-center">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold mb-14 text-black">
          Varför välja Carigo AB?
        </h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-center">
          {/* Card 1 */}
          <div className="bg-[#4D4D4D]/90 backdrop-blur-sm rounded-lg p-6 text-left shadow-lg">
            <h3 className="font-semibold text-lg mb-2">
              Erbjud den ultimata användarupplevelsen
            </h3>
            <p className="text-sm opacity-90 leading-relaxed">
              Connecta med Sveriges största aktörer för att erbjuda en
              smidig och modern kundresa.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#4D4D4D]/90 backdrop-blur-sm rounded-lg p-6 text-left shadow-lg">
            <h3 className="font-semibold text-lg mb-2">Lås upp värdet i data</h3>
            <p className="text-sm opacity-90 leading-relaxed">
              Använd insikter från kundresan för att skapa nya
              affärsmöjligheter och öka lönsamheten.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#4D4D4D]/90 backdrop-blur-sm rounded-lg p-6 text-left shadow-lg">
            <h3 className="font-semibold text-lg mb-2">Ta full kontroll</h3>
            <p className="text-sm opacity-90 leading-relaxed">
              Med Carigo kan du hantera alla dina affärsprocesser på ett
              och samma ställe.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-[#4D4D4D]/90 backdrop-blur-sm rounded-lg p-6 text-left shadow-lg">
            <h3 className="font-semibold text-lg mb-2">Bygg lojalitet</h3>
            <p className="text-sm opacity-90 leading-relaxed">
              Automatiserad kommunikation och support ger nöjdare kunder
              och starkare relationer.
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-16">
          <button
            className="bg-[#0B153C] text-white px-8 py-3 rounded-[100px]   transition-colors duration-200 font-medium"
            onClick={() => navigate("/signup")}
          >
            Skapa konto
          </button>
        </div>
      </div>
    </section>
  );
};

export default About;
