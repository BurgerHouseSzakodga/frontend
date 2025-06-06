import { useState, useContext } from "react";
import MenuItemCard from "./MenuItemCrard";
import { MenuItemContext } from "../context/contexts";
import { Link } from "react-router-dom";
import "../sass/components/all-items.css";
import Footer from "./Footer";

function AllItems() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name-asc");
  const { menuItems } = useContext(MenuItemContext);

  const filteredAndSortedItems = menuItems
    .filter(
      (item) =>
        selectedCategory === "all" ||
        item.category_id === parseInt(selectedCategory)
    )
    .sort((a, b) => {
      if (sortBy === "name-asc") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "name-desc") {
        return b.name.localeCompare(a.name);
      } else if (sortBy === "price-asc") {
        return a.actual_price - b.actual_price;
      } else if (sortBy === "price-desc") {
        return b.actual_price - a.actual_price;
      }
      return 0;
    });

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const groupedItems = filteredAndSortedItems.reduce((acc, item) => {
    const category = item.category_id;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {});

  const categoryNames = {
    1: "Burgerek",
    2: "Deszertek",
    3: "Italok",
    4: "Köretek",
  };

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
          <option value="4">Köretek</option>
        </select>

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="name-asc">Név szerint (A-Z)</option>
          <option value="name-desc">Név szerint (Z-A)</option>
          <option value="price-asc">Ár szerint növekvő</option>
          <option value="price-desc">Ár szerint csökkenő</option>
        </select>
      </div>

      <div className="menu-items">
        {Object.keys(groupedItems).map((category) => (
          <div key={category} className="category-section">
            <h2>{categoryNames[category]}</h2>
            <div className="category-items">
              {groupedItems[category].map((item) => (
                <div key={item.id} className="menu-item">
                  <MenuItemCard
                    image={item.image_path}
                    name={capitalizeFirstLetter(item.name)}
                    description={item.description}
                    category_id={item.category_id}
                    price={Math.round(item.price)}
                    actual_price={Math.round(item.actual_price)}
                    discount_amount={item.discount_amount}
                  />
                  <Link to={`/item/${item.id}`} className="basket-button">
                    Rendelés
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default AllItems;
