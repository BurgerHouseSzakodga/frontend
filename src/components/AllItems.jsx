import { useState, useContext } from 'react';
import MenuItemCard from './MenuItemCrard';
import { MenuItemContext } from '../context/contexts';
import '../sass/components/all-items.css'


function AllItems() {

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name-asc');  // Changed default to name-asc
  const { menuItems } = useContext(MenuItemContext);

  // Szűrt és rendezett elemek
  const filteredAndSortedItems = menuItems
    .filter(item => selectedCategory === 'all' || item.category_id === parseInt(selectedCategory))
    .sort((a, b) => {
      if (sortBy === 'name-asc') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'name-desc') {
        return b.name.localeCompare(a.name);
      } else if (sortBy === 'price-asc') {
        return a.price - b.price;
      } else if (sortBy === 'price-desc') {
        return b.price - a.price;
      }
      return 0;
    });

  return (
    <div>
      <div className="filters">
        <select 
          value={selectedCategory} 
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">Összes kategória</option>
          <option value="1">Burgerek</option>
          <option value="2">Deszertek</option>
          <option value="3">Italok</option>
        </select>

        <select 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="name-asc">Név szerint (A-Z)</option>
          <option value="name-desc">Név szerint (Z-A)</option>
          <option value="price-asc">Ár szerint növekvő</option>
          <option value="price-desc">Ár szerint csökkenő</option>
        </select>
      </div>

      <div className="menu-items">
        {filteredAndSortedItems.map((item) => (
          <MenuItemCard
            key={item.id}
            image={item.image_path}
            name={item.name}
            description={item.description}
            category_id={item.category_id}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
}

export default AllItems;