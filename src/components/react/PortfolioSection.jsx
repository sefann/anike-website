import { useState } from 'react';
import PortfolioFilter from './PortfolioFilter.jsx';

export default function PortfolioSection({ items }) {
  const [filteredItems, setFilteredItems] = useState(items);
  
  const handleFilterChange = (filtered) => {
    setFilteredItems(filtered);
  };
  
  return (
    <>
      <PortfolioFilter items={items} onFilterChange={handleFilterChange} />
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <a
            key={item.id}
            href={`/projects/${item.slug}`}
            className="group block overflow-hidden rounded-2xl bg-gray-100 aspect-[4/3] relative"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <span className="text-sm text-primary font-medium">{item.category}</span>
                <h3 className="text-xl font-semibold mt-2">{item.title}</h3>
              </div>
            </div>
          </a>
        ))}
      </div>
    </>
  );
}

