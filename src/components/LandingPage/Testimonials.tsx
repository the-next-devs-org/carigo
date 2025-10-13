const Testimonials = () => {
  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative h-80 rounded-2xl overflow-hidden">
          <img 
            src="https://img.sixt.com/1600/5afdbd43-aee2-4177-b4b2-6e0c7d30b996.png" 
            alt="Customer testimonial" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent"></div>
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-2xl px-12">
              <p className="text-3xl md:text-4xl font-light mb-6 leading-relaxed">
                "Good service all the way. Smooth. Brand new car."
              </p>
              <p className="text-xl font-medium">— Annika, Östersund</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
