import { useContext } from 'react'
import {Swiper, SwiperSlide} from "swiper/react"

import { MenuItemContext } from '../context/contexts'
import MenuItemCard from './MenuItemCrard'
import '../sass/pages/popular-items.css'
import "swiper/css"

function PopularItem() {
    const { menuItems } = useContext(MenuItemContext);

    return (
        <div>
            <Swiper>
                {menuItems.map((item) => (
                    <SwiperSlide key={item.id} slidesPerView={3} spaceBetween={50}>
                        <MenuItemCard
                            image={item.image_path}
                            name={item.name}
                            description={item.description}
                            category_id={item.category_id}
                            price={item.price}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default PopularItem
