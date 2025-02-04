import { useContext, useRef } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";

import { MenuItemContext } from '../context/contexts';
import MenuItemCard from './MenuItemCrard';
import '../sass/components/popular-items.css';
import "swiper/css";
import "swiper/modules";
import rightIcon from "/assets/right.svg";
import leftIcon from "/assets/left.svg";

function DiscountItem() {
    const { menuItems } = useContext(MenuItemContext);
    
    const swiperRef = useRef(null);

    const handleImage = (direction) => {
        if (direction === 'next') {
            swiperRef.current.swiper.slideNext();
        } else if (direction === 'prev') {
            swiperRef.current.swiper.slidePrev();
        }
    };

    return (
        
        <div className="popular-item-container">
            <h1>Népszerűek</h1>
            <button className="swiper-button prev" onClick={() => handleImage('prev')}>
                <img src={leftIcon} alt="Previous" />
            </button>

            <Swiper
                ref={swiperRef}
                slidesPerView={5}
                spaceBetween={10}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
            >
                {menuItems.map((item) => (
                    <SwiperSlide key={item.id}>
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

            <button className="swiper-button next" onClick={() => handleImage('next')}>
                <img src={rightIcon}  />
            </button>
        </div>
    );
}

export default DiscountItem;
