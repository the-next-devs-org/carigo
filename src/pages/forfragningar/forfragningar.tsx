import React, { useState } from 'react';
import { Send, Clock, CheckCircle, TrendingUp, Info } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  iconBgColor: string;
}

interface InquiryCardProps {
  name: string;
  date: string;
  customer?: string;
  amount?: string;
  headerColor: string;
  borderColor: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, iconBgColor }) => (
  <div className="bg-white rounded-lg p-4 shadow-sm flex items-center justify-between">
    <div>
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
    <div className={`${iconBgColor} p-3 rounded-lg`}>
      {icon}
    </div>
  </div>
);

const InquiryCard: React.FC<InquiryCardProps> = ({ name, date, customer, amount, headerColor, borderColor }) => (
  <div className={`bg-white rounded-lg border-2 ${borderColor} overflow-hidden h-32 flex flex-col`}>
    <div className={`${headerColor} px-4 py-3 flex items-center justify-between flex-shrink-0`}>
      <h3 className="font-semibold text-gray-900 text-sm">{name}</h3>
      <button className="text-gray-400 hover:text-gray-600">
        <Info size={16} />
      </button>
    </div>
    <div className="px-4 py-3 space-y-1 flex-grow">
      <p className="text-xs text-gray-600">{date}</p>
      {customer && <p className="text-xs text-gray-500">{customer}</p>}
      {amount && <p className="text-sm font-semibold text-gray-900 mt-2">{amount}</p>}
    </div>
  </div>
);

const Forfragningar: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('Alla');

  const filters = [
    { label: 'Filter', type: 'dropdown' },
    { label: 'Förväntad kallelse 1', type: 'dropdown' },
    { label: 'Alla', type: 'button' },
    { label: 'Handläggare', type: 'dropdown' },
    { label: 'Alla', type: 'button' },
    { label: 'Otalarmerat', type: 'dropdown' },
    { label: 'Alla', type: 'button' },
    { label: 'Kalkylerad', type: 'button' }
  ];

  const inquiries = [
    {
      id: 1,
      category: 'Nya Inkomen',
      count: 3,
      headerColor: 'bg-blue-100',
      borderColor: 'border-blue-200',
      items: [
        { name: 'Lina Karlsson', date: '2024-11-18 till 2024-11-15', customer: 'Liten Kunden' },
        { name: 'Erik Berg', date: '2024-11-18 till 2024-11-15' },
        { name: 'Maria Lind', date: '2024-11-18 till 2024-11-15', customer: 'Liten Kunden' },
        { name: 'Maria Lind', date: '2024-11-18 till 2024-11-15', customer: 'Liten Kunden' }
      ]
    },
    {
      id: 2,
      category: 'Behandlen',
      count: 4,
      headerColor: 'bg-yellow-100',
      borderColor: 'border-yellow-200',
      items: [
        { name: 'Jonas Nord', date: '2024-11-15 till 2024-11-15' },
        { name: 'Sara Kort', date: '2024-11-15 till 2024 Kanske!' },
        { name: 'Lars Karlsson', date: 'Omsak toeke kankap!', amount: '6 800 SEK' },
        { name: 'Tina Elofsson', date: 'Omsak toeke kankap!', amount: '6 800 SEK' }
      ]
    },
    {
      id: 3,
      category: 'Bokade',
      count: 2,
      headerColor: 'bg-green-100',
      borderColor: 'border-green-200',
      items: [
        { name: 'Karin Streed', date: 'Omsak tolle', customer: 'bokap!' },
        { name: 'Karin Streed', date: '2024-11-18 till 2024-11-15' },
        { name: 'Iser Elofsson', date: 'Omsak toeke kankap!', amount: '6 800 SEK' },
        { name: 'Per Jonsson', date: 'Omsak toeke kankap!', amount: '6 800 SEK' }
      ]
    },
    {
      id: 4,
      category: 'Bokade',
      count: 2,
      headerColor: 'bg-green-200',
      borderColor: 'border-green-300',
      items: [
        { name: 'Karin Smed', date: 'Omsak toelle till 2024-11-15', customer: 'Omsak toelle till känge!' },
        { name: 'Sara Stort', date: 'Omsak toelle till känge!' },
        { name: 'Iser Elofsson', date: 'Omsak toeke kankap!', amount: '6 800 SEK' },
        { name: 'Per Jonsson', date: 'Omsak toeke kankap!', amount: '2 800 SEK' }
      ]
    }
  ];

  return (
    <div className="p-6 space-y-5 bg-gray-50 min-h-screen">
      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Nya Förfrågningar"
          value="7"
          icon={<Send size={24} className="text-blue-600" />}
          iconBgColor="bg-blue-100"
        />
        <StatCard
          title="Behandlas"
          value="12"
          icon={<Clock size={24} className="text-yellow-600" />}
          iconBgColor="bg-yellow-100"
        />
        <StatCard
          title="Bokade"
          value="4"
          icon={<CheckCircle size={24} className="text-green-600" />}
          iconBgColor="bg-green-100"
        />
        <StatCard
          title="Offerförlinje Månad"
          value="85 000 SEK"
          icon={<TrendingUp size={24} className="text-green-600" />}
          iconBgColor="bg-green-100"
        />
      </div>

      {/* Heading */}
      <h2 className="text-2xl font-bold text-gray-900">Förfrågningar</h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {filters.map((filter, index) => (
          <button
            key={index}
            onClick={() => setActiveFilter(filter.label)}
            className="px-3 py-1.5 rounded text-sm bg-white text-gray-600 border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Inquiry Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {inquiries.map((column) => (
          <div key={column.id} className="space-y-3">
            <div className="flex items-center gap-2 mb-3">
              <h3 className="font-semibold text-gray-900 text-sm">{column.category}</h3>
              <span className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full text-xs font-medium">
                {column.count}
              </span>
            </div>
            {column.items.map((item, index) => (
              <InquiryCard
                key={index}
                {...item}
                headerColor={column.headerColor}
                borderColor={column.borderColor}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forfragningar;