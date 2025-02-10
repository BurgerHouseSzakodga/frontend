import { useContext, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { MenuItemContext } from '../context/contexts';
import "swiper/css";
import "swiper/css/navigation";
import { Link } from 'react-router-dom';
import "../sass/components/discounts-item.css";

function DiscountItemsCard() {
    const { discountedItems } = useContext(MenuItemContext);
    const [items, setItems] = useState([]);

    useEffect(() => {
        setItems(discountedItems);
    }, [discountedItems]);

    return (
        <div className="discount-items">
            <h2>Akciós termékek</h2>
            <Swiper
                modules={[Navigation, Autoplay]}
                slidesPerView={3}
                spaceBetween={10}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                navigation
            >
                {items.length > 0 ? (
                    items.map((item) => (
                        <SwiperSlide key={item.id}>
                            <div className="item-card">
                                <img src={item.image_path} alt={item.name} />
                                <h3>{item.name}</h3>
                                <p className="original-price">{item.price} Ft</p>
                                <p className="discounted-price">{item.price - item.discount_amount} Ft</p>
                                <Link to={`/item/${item.id}`} className="basket-button">
                                Rendelés
                            </Link>
                            </div>
                          
                        </SwiperSlide>
                    ))
                ) : (
                    <p>Jelenleg nincsenek akciós termékek</p>
                )}
            </Swiper>
        </div>
    );
}

export default DiscountItemsCard;