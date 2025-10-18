import React from 'react';
import { Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#F2F2F7] text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Column 1 - Services */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-black">Våra tjänster</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-[#000000b3] hover:text-white transition">Våra bilar</a></li>
              <li><a href="#" className="text-[#000000b3] hover:text-white transition">Om oss</a></li>
              <li><a href="#" className="text-[#000000b3] hover:text-white transition">Support</a></li>
            </ul>
          </div>

          {/* Column 2 - Help */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-black">Kontakt</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-[#000000b3] hover:text-white transition">Telefonnummer</a></li>
              <li><a href="#" className="text-[#000000b3] hover:text-white transition">Mailadress</a></li>
            </ul>
          </div>

          {/* Column 3 - Contact Info */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-black">Villkor</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-[#000000b3] hover:text-white transition">Personuppgifter</a></li>
              <li><a href="#" className="text-[#000000b3] hover:text-white transition">Cookies</a></li>
              <li><a href="#" className="text-[#000000b3] hover:text-white transition">Uthyrningspolicy</a></li>
            </ul>
          </div>

          {/* Column 4 - Company Info */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-black">Carigo AB</h4>
            <p className="text-sm text-[#000000b3] mb-2">Carigo Sverige AB</p>
            <p className="text-sm text-[#000000b3] mb-2">Organisations nr: 556721764</p>
            <p className="text-sm text-[#000000b3] mb-2">Sveavägen 53</p>
            <p className="text-sm text-[#000000b3] mb-6">111 44 Stockholm</p>
            <p className="text-sm text-[#000000b3]">Öppet alla dagar 08-18</p>
          </div>
        </div>

        {/* Social Media & Payment Icons */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a href="#" className="text-[#000000b3] hover:text-white transition">
              <Youtube className="w-5 h-5" />
            </a>
            <a href="#" className="text-[#000000b3] hover:text-white transition">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="text-[#000000b3] hover:text-white transition">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="text-[#000000b3] hover:text-white transition">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>

         
        </div>

        {/* Trust Badge */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div className="text-sm text-[#000000b3] max-w-xl">
            <p>Vårt företag är med väl högkvalificerade på arbetsområden från Carigo.</p>
            <p className="mt-2">Eftersom sätt registrerade du har vårt medlemsskap godkänner att vi får användningspolicys.</p>
          </div>
        </div>

        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold tracking-wider text-black">CARIGO</span>
          </div>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;