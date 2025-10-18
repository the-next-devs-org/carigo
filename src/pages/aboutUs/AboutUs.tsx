import { useState } from "react";
import Header from "../../components/LandingPage/Header";
import Footer from "../../components/LandingPage/Footer";
import ContactUs from "../../components/ContactUs/ContactUs";

const AboutUs = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const title = "Alla företag behöver en hjälpande hand då och då";
  const description =
    "Som företagare vet vi hur utmanande det kan vara att navigera genom de långsamma processerna hos traditionella banker. Så vi sa \"Nu får det räcka\" och utvecklade en enkel, snabb och flexibel finansieringslösning anpassad efter dina företagarambitioner.";

  return (
    <div className="bg-[#d5fcd7]">
      <Header />

      {/* Hero Section */}
      <section className="relative w-full h-[100vh]">
        {/* Image */}
        <img
          src="/aboutUsLay.png"
          alt="About Us"
          className="w-full h-full object-contain"
        />

        {/* Overlay */}
        <div className="absolute bg-black/30"></div>

        {/* Content */}
        <div className="absolute top-1/2 left-12 transform -translate-y-1/2 z-10 max-w-lg text-white">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 text-black">
            {title}
          </h1>
          <p className="text-lg sm:text-xl text-black">{description}</p>
        </div>
      </section>

      <section className="py-16 px-6 lg:px-20 bg-[#f8f9fa]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <p className="text-sm text-blue-600 font-semibold uppercase tracking-wide">
              Pro omni animali
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Securitas, in imbre et sole.Trygghet, i vått och torrt
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Nos creavimus cautionem quae omnibus quattuor-pedibus amicis auxilium praebet, sicut illi semper nobis praestant.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Scopus cautionis est fiduciam habere auxilium fore si quid mali accidat. Tamen saepe domini animalium deseri solent, per cautiones arte compositas quae morbos communes ipsius generis excludunt. Volumus adiuvare animal tuum — sive genus sive aetas qualis sit.
            </p>
          </div>

          {/* Image */}
          <div className="relative">
            <img
              src="/aboutcar1.jpg"
              alt="Person with pet"
              className="w-full h-auto rounded-lg shadow-lg object-cover"
            />
          </div>
        </div>
      </section>

      {/* Second Row - Image Left, Text with Button Right */}
      <section className="py-16 px-6 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative order-2 lg:order-1">
            <img
              src="/aboutcar2.jpg"
              alt="Dog on chair"
              className="w-full h-auto rounded-lg shadow-lg object-cover"
            />
          </div>

          {/* Text Content */}
          <div className="space-y-6 order-1 lg:order-2">
            <p className="text-sm text-blue-600 font-semibold uppercase tracking-wide">
              Domus • Contactus Nobiscum
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Contacta Servitium Clientium
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Pro quaestionibus et auxilio de tua assecuratione.
            </p>

            <div className="space-y-3 text-gray-700">
              <p>
                <span className="font-semibold">Horæ Apertæ:</span> Omni die ab hora 08 ad 21.
              </p>
              <p>
                <span className="font-semibold">Tempora Specialia</span> per festos dies observantur.
              </p>
              <p>
                <span className="font-semibold">Inscripto Electronica:</span> salutem@lassie.se
              </p>
              <p>
                <span className="font-semibold">Chatta:</span> Inveni nubem loquendi in pagina aut in applicatione.
              </p>
              <p>
                <span className="font-semibold">Telephonum:</span> Pro quaestionibus de tua assecuratione, nos vocare potes ad numerum infra scriptum.
              </p>
            </div>

            <button className="bg-blue-900 hover:bg-blue-800 text-white font-semibold px-8 py-4 rounded-full transition-colors duration-300 shadow-md">
              010-183 98 18
            </button>
          </div>

        </div>
      </section>

      <section className="py-20 px-6 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <p className="text-sm text-gray-500 font-semibold uppercase tracking-wide">
            Prata med oss!
          </p>
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900">
            Vill du försäkra din hund eller katt?
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
            Överväger du att försäkra ditt djur hos oss? Kul! Om du har du frågor om Lassie, våra försäkringar eller villkor hjälper vi dig gärna. Boka ett telefonsamtal med våra experter så ringer vi upp och ser till att du får svar på alla dina funderingar.
          </p>
          <button className="bg-blue-100 hover:bg-blue-200 text-blue-900 font-semibold px-10 py-4 rounded-full transition-colors duration-300 shadow-md inline-flex items-center gap-3 mt-6">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            Ring mig
          </button>
        </div>
      </section>

      <ContactUs />

      {/* Other sections */}

      <Footer />
    </div>
  );
};

export default AboutUs;
