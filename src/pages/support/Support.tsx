import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import Header from "../../components/LandingPage/Header";
import Footer from "../../components/LandingPage/Footer";

const Support = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const supportCards = [
    { title: "Report a Damage" },
    { title: "Parking Fines" },
    { title: "Invoice Inquiry" },
    { title: "Book Wash" },
    { title: "Terminate Agreement - Business" },
    { title: "Terminate Agreement - Private" },
    { title: "Request Car Change" },
    { title: "Other Questions" },
    { title: "Contact us anytime", subtitle: "010 456 39 39" }
  ];

  const faqs = [
    {
      question: "Why should we choose a subscription instead of leasing?",
      answer: "A subscription offers more flexibility than traditional leasing. You can cancel or modify your subscription with shorter notice periods, and maintenance, insurance, and other services are typically included in one monthly payment."
    },
    {
      question: "Can I subscribe to a car outside of Stockholm?",
      answer: "Yes, we offer car subscriptions in multiple cities across the country. Contact us to check availability in your area."
    },
    {
      question: "Is service and maintenance included?",
      answer: "Yes, service and maintenance are included in your monthly subscription fee. This covers regular maintenance, tire changes, and necessary repairs."
    },
    {
      question: "Where can I pick up the car?",
      answer: "You can pick up your car at one of our designated locations. We'll provide you with the exact address and pickup instructions once your subscription is confirmed."
    },
    {
      question: "Can I get the car without charging?",
      answer: "Our electric vehicles come fully charged at pickup. For ongoing charging, you'll receive a charging card and access to our network of charging stations."
    },
    {
      question: "I am unsure if a subscription is right for me?",
      answer: "We're happy to help you understand if a subscription fits your needs. Contact our customer service team to discuss your specific situation and requirements."
    },
    {
      question: "How many use your car can?",
      answer: "Multiple drivers can use the car as long as they are registered and approved on your subscription agreement. All drivers must meet our age and license requirements."
    },
    {
      question: "Is your service more expensive than leasing, and why?",
      answer: "While the monthly cost might be slightly higher, our service includes insurance, maintenance, roadside assistance, and flexibility that traditional leasing doesn't offer, making it more cost-effective overall."
    },
    {
      question: "What are the terms of the agreement?",
      answer: "Our agreements are flexible with various term lengths available. The minimum subscription period is typically 1-3 months, and you can cancel with 30 days notice."
    },
    {
      question: "Can I have my own dedicated parking space in Vällingby?",
      answer: "Parking arrangements depend on your location and availability. Contact us to discuss parking options in Vällingby."
    },
    {
      question: "What is the included mileage?",
      answer: "Each subscription includes a specific monthly mileage allowance. The exact amount depends on your chosen plan, typically ranging from 1,000 to 3,000 km per month."
    },
    {
      question: "What is the commitment period?",
      answer: "The minimum commitment period varies by plan, typically 1-3 months. After this period, you can continue month-to-month or cancel with 30 days notice."
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="relative z-30">
        <Header />
      </div>


      {/* Support Cards Grid */}
      <div className="max-w-7xl mx-auto px-6 pt-32 pb-16">
        <div className="">
          <div className="max-w-screen-xpad mx-auto">
            <div className="mb-10 space-y-2">
              <h1 className="whitespace-pre-wrap font-sans text-[32px] leading-[125%] -tracking-[0.03em] font-bold">
                Support
              </h1>
              <p className="whitespace-pre-wrap font-sans text-[18px] leading-[140%] -tracking-[0.02em] font-medium">
                For you with Aimo Subscription
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {supportCards.map((card, index: number) => (
            <div
              key={index}
              className="border border-gray-200 rounded-[24px] p-6 hover:border-gray-300 transition-colors cursor-pointer flex flex-col justify-center items-center min-h-40"
            >
              <h3 className="text-base font-normal text-gray-900 text-center">
                {card.title}
              </h3>
              {card.subtitle && (
                <p className="text-sm text-gray-600 text-center mt-1">
                  {card.subtitle}
                </p>
              )}
            </div>
          ))}
        </div>

      </div>

      {/* FAQ Section */}
      <div className="max-w-6xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Frequently Asked Questions and Answers
        </h2>

        <div className="space-y-2">
          {faqs.map((faq, index: number) => (
            <div
              key={index}
              className={`bg-[#f3f5f7] border-b border-gray-200 rounded-[12px] overflow-hidden transition-all duration-300 ${openFaq === index ? "bg-[#f3f5f7]" : "bg-white"
                }`}
            >
              <button
                onClick={() => toggleFaq(index)}
                className="bg-[#f3f5f7] w-full py-4 px-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="text-sm font-normal text-gray-900 pr-8">
                  {faq.question}
                </span>
                <span className="flex-shrink-0">
                  {openFaq === index ? (
                    <Minus className="w-5 h-5 text-gray-600" />
                  ) : (
                    <Plus className="w-5 h-5 text-gray-600" />
                  )}
                </span>
              </button>

              <div
                className={`px-4 overflow-hidden transition-all duration-300 ${openFaq === index ? "max-h-96 py-4" : "max-h-0"
                  }`}
              >
                <p className="text-sm text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Support;
