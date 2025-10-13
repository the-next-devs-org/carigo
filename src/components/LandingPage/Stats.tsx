import { Globe, Award, Phone } from "lucide-react";

const Stats = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12 text-center">
          
          {/* Item 1 */}
          <div>
            <div className="w-16 h-16 bg-gray-900 rounded-full mx-auto mb-6 flex items-center justify-center">
              <Globe className="h-8 w-8 text-white" />
            </div>
            <h3 className="font-bold text-xl mb-3">Global reach</h3>
            <p className="text-gray-600 text-lg">
              2,000+ SIXT stations in over 105 countries
            </p>
          </div>

          {/* Item 2 */}
          <div>
            <div className="w-16 h-16 bg-gray-900 rounded-full mx-auto mb-6 flex items-center justify-center">
              <Award className="h-8 w-8 text-white" />
            </div>
            <h3 className="font-bold text-xl mb-3">Distinctive fleet</h3>
            <p className="text-gray-600 text-lg">
              From high-class convertibles to premium SUVs
            </p>
          </div>

          {/* Item 3 */}
          <div>
            <div className="w-16 h-16 bg-gray-900 rounded-full mx-auto mb-6 flex items-center justify-center">
              <Phone className="h-8 w-8 text-white" />
            </div>
            <h3 className="font-bold text-xl mb-3">Exceptional service</h3>
            <p className="text-gray-600 text-lg">
              Stress-free, reliable, no hidden costs
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Stats;
