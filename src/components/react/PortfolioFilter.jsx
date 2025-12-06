import { useState } from 'react';
import { motion } from 'framer-motion';

export default function PortfolioFilter({ items, onFilterChange }) {
  const [activeFilter, setActiveFilter] = useState('all');
  
  // Extract unique categories
  const categories = ['all', ...new Set(items.map(item => item.category))];
  
  const handleFilter = (category) => {
    setActiveFilter(category);
    const filtered = category === 'all' 
      ? items 
      : items.filter(item => item.category === category);
    onFilterChange(filtered);
  };
  
  return (
    <div className="flex flex-wrap gap-4 justify-center mb-12">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleFilter(category)}
          className={`px-6 py-2 rounded-full font-medium transition-all ${
            activeFilter === category
              ? 'bg-gradient-brand text-white shadow-lg'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </button>
      ))}
    </div>
  );
}










