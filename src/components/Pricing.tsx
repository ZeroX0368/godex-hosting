import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom'; // PERUBAHAN: Import Link

const currencies = {
  USD: { symbol: '$', name: 'US Dollar', rate: 1 },
  INR: { symbol: '₹', name: 'Indian Rupee', rate: 83.5 },
  EUR: { symbol: '€', name: 'Euro', rate: 0.92 },
};

// PERUBAHAN: Menambahkan properti 'link' untuk setiap paket
const pricingPlans = [
  {
    title: 'Bot Hosting',
    image: '/discord.jpeg',
    priceUSD: 0.39,
    features: ['ECC Memory', 'Fast Performance', 'Low Latency', 'Advanced security', 'Managed services'],
    buttonText: 'Order Now',
    popular: true,
    link: '/discord',
  },
  {
    title: 'Game Servers',
    image: '/minecraft.jpeg',
    priceUSD: 1.57,
    features: ['Instant deployment', 'DDoS protection', '24/7 support', 'Custom configurations', 'Mod support'],
    buttonText: 'View More',
    popular: false,
    link: '/minecraft',
  },
  {
    title: 'VPS Hosting',
    image: '/vps.jpeg',
    priceUSD: 4.49,
    features: ['Full root access', 'SSD storage', '99.9% uptime', 'Multiple OS options', 'Backup included'],
    buttonText: 'Order Now',
    popular: false,
    link: '/vps',
  },
];

const Pricing = () => {
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const currentCurrency = currencies[selectedCurrency as keyof typeof currencies];

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12"
        >
          <div className="text-center md:text-left">
            <h2 className="text-4xl sm:text-5xl font-bold text-white">Simple Pricing <span className="text-blue-400">Plans</span></h2>
            <p className="text-lg text-gray-400 mt-2 max-w-2xl">Choose the perfect plan for your needs. All plans include our core features with no hidden fees.</p>
          </div>
          <div className="relative inline-block text-left">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="bg-gray-800 border border-gray-700 text-white font-semibold py-2 px-4 rounded-lg inline-flex items-center"
            >
              <span className="mr-2">{currentCurrency.symbol} {selectedCurrency} - {currentCurrency.name}</span>
              <ChevronDown size={20} />
            </button>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 z-10"
              >
                <div className="py-1">
                  {Object.entries(currencies).map(([code, { symbol, name }]) => (
                    <a key={code} href="#" onClick={(e) => { e.preventDefault(); setSelectedCurrency(code); setIsDropdownOpen(false); }}
                      className="text-gray-300 block px-4 py-2 text-sm hover:bg-gray-700"
                    >
                      {symbol} {code} - {name}
                    </a>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl overflow-hidden group hover:border-blue-500 transition-all duration-300`}
            >
              {plan.popular && (<div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white text-xs font-bold px-4 py-1.5 rounded-full">Most Popular</div>)}
              <div className="h-40 bg-cover bg-center" style={{ backgroundImage: `url(${plan.image})` }}>
                <div className="h-full w-full bg-black/50 flex items-end p-6">
                    <h3 className="text-2xl font-bold text-white">{plan.title}</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-400">Starting at</p>
                <p className="text-5xl font-bold text-white my-2">{currentCurrency.symbol}{(plan.priceUSD * currentCurrency.rate).toFixed(2)}<span className="text-lg font-medium text-gray-400">/month</span></p>
                <ul className="space-y-3 my-8">
                  {plan.features.map((feature) => (<li key={feature} className="flex items-center text-gray-300"><Check className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" /><span>{feature}</span></li>))}
                </ul>
                {/* PERUBAHAN: Membungkus button dengan Link */}
                <Link to={plan.link}>
                    <button className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300">
                        {plan.buttonText}
                    </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;