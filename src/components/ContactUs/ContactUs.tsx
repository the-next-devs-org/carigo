const ContactUs = () => {
    return (
        <section className="py-20 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12 text-center lg:text-left">
                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                        Kontakta oss
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Vi finns här för dig alla vardagar mellan 8:00 och 17:00.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Carigo Card */}
                    <div className="bg-[#f8fafe] from-green-100 to-green-200 rounded-[24px] p-8 space-y-4 flex flex-col justify-start">
                        <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center">
                            <svg
                                className="w-7 h-7 text-gray-800"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">Carigo</h3>
                        <p className="text-gray-700 leading-relaxed">
                            Logga in på din personliga profil för att hantera ditt lån.
                        </p>
                    </div>

                    {/* Chatt Card */}
                    <div className="bg-white border-2 border-gray-200 rounded-[24px] p-8 space-y-4 flex flex-col justify-start hover:border-[#f8fafe] transition-colors">
                        <div className="w-14 h-14 bg-[#f8fafe] rounded-full flex items-center justify-center">
                            <svg
                                className="w-7 h-7 text-gray-800"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">Chatt</h3>
                        <p className="text-gray-700 font-semibold">Beräknad svarstid</p>
                        <p className="text-gray-600">Mindre än 2 minuter</p>
                    </div>

                    {/* E-post Card */}
                    <div className="bg-white border-2 border-gray-200 rounded-[24px] p-8 space-y-4 flex flex-col justify-start hover:border-[#f8fafe] transition-colors">
                        <div className="w-14 h-14 bg-[#f8fafe] rounded-full flex items-center justify-center">
                            <svg
                                className="w-7 h-7 text-gray-800"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">E-post</h3>
                        <p className="text-gray-700 font-semibold">Beräknad svarstid</p>
                        <p className="text-gray-600">Mindre än 24 timmar</p>
                        <p className="text-gray-800 font-medium">support@carigo.se</p>
                    </div>

                    {/* Telefon Card */}
                    <div className="bg-white border-2 border-gray-200 rounded-[24px] p-8 space-y-4 flex flex-col justify-start hover:border-[#f8fafe] transition-colors">
                        <div className="w-14 h-14 bg-[#f8fafe] rounded-full flex items-center justify-center">
                            <svg
                                className="w-7 h-7 text-gray-800"
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
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">Telefon</h3>
                        <p className="text-gray-700 font-semibold">Beräknad svarstid</p>
                        <p className="text-gray-600">Mindre än 1 minut</p>
                        <p className="text-gray-800 font-medium">020-150 333</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;
