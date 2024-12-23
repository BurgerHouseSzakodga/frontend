import { useContext } from "react";
import MenuItemsTable from "../components/MenuItemsTable";
import { GuestContext } from "../context/contexts";

const ManageMenuItems = () => {
  const { categories } = useContext(GuestContext);

  return (
    <div className="manage-menu-items">
      <form>
        <div>
          <label htmlFor="">Név</label>
          <input type="text" placeholder="Név" />
        </div>
        <div>
          <label htmlFor="">Leírás</label>
          <textarea name="" id="" placeholder="Leírás"></textarea>
        </div>
        <div>
          <label htmlFor="">Ár</label>
          <input type="number" placeholder="Ár" />
        </div>
        <div>
          <label htmlFor="">Kategória</label>
          <select name="" id="">
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="">Kép</label>
          <input type="file" />
        </div>
      </form>
      <MenuItemsTable />
    </div>
  );
};

export default ManageMenuItems;
