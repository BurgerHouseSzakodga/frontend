import { useContext, useRef } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { MenuItemContext } from '../context/contexts';
import MenuItemCard from './MenuItemCrard';
import "swiper/css";
import "swiper/css/navigation";
import rightIcon from "/assets/right.svg";
import leftIcon from "/assets/left.svg";

function DiscountItems() {
    const { menuItems = [] } = useContext(MenuItemContext);
    const swiperRef = useRef(null);

    // Filter items with discounts
    const discountedItems = menuItems.filter(item => item.discount_amount > 0);

    const handleImage = (direction) => {
        if (!swiperRef.current?.swiper) return;
        
        if (direction === 'next') {
            swiperRef.current.swiper.slideNext();
        } else if (direction === 'prev') {
            swiperRef.current.swiper.slidePrev();
        }
    };

    return (
        <div className="popular-items">
            <div className="popular-items-title">
                <h2>Akciós termékek</h2>
            </div>

            <div className="popular-items-slider">
                <button className="swiper-button prev" onClick={() => handleImage('prev')}>
                    <img src={leftIcon} alt="Previous" />
                </button>

                <Swiper
                    ref={swiperRef}
                    modules={[Autoplay, Navigation]}
                    breakpoints={{
                        320: { slidesPerView: 1 },
                        640: { slidesPerView: 2 },
                        768: { slidesPerView: 3 },
                        1024: { slidesPerView: 4 },
                    }}
                    spaceBetween={10}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                >
                    {discountedItems.length > 0 ? (
                        discountedItems.map((item) => (
                            <SwiperSlide key={item.id}>
                                <MenuItemCard
                                    image={item.image_path}
                                    name={item.name}
                                    description={item.description}
                                    category_id={item.category_id}
                                    price={item.price}
                                    discountAmount={item.discount_amount}
                                />
                            </SwiperSlide>
                        ))
                    ) : (
                        <SwiperSlide>
                            <div className="no-items">
                                Jelenleg nincsenek akciós termékek
                            </div>
                        </SwiperSlide>
                    )}
                </Swiper>

                <button className="swiper-button next" onClick={() => handleImage('next')}>
                    <img src={rightIcon} alt="Next" />
                </button>
            </div>
        </div>
    );
}

export default DiscountItems;