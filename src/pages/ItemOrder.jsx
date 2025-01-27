import React from 'react'
import MenuItemCard from '../components/MenuItemCrard'

  const { menuItems } = useContext(MenuItemContext);

function ItemOrder() {
  return (
    <div>
      <MenuItemCard/>
    </div>
  )
}

export default ItemOrder
