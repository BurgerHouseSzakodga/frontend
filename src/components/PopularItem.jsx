import { useContext } from 'react'
import { Swiper, SwiperSlide } from "swiper/react"

import { MenuItemContext } from '../context/contexts'
import MenuItemCard from './MenuItemCrard'
import '../sass/pages/popular-items.css'
import "swiper/css"
import "swiper/modules"

function PopularItem() {
    const { menuItems } = useContext(MenuItemContext);

    return (
        <div>
            <Swiper slidesPerView={5} spaceBetween={10} autoplay={{
                delay: 2500, // Képváltás késleltetése 2.5 másodpercenként
                disableOnInteraction: false, // Az interakciók után is folytatódjon az autoplay
            }}>
                {menuItems.map((item) => (
                    <SwiperSlide key={item.id} >
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
