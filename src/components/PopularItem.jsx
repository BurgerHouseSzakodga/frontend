import { useContext, useRef } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { Link, useNavigate } from 'react-router-dom';
import { MenuItemContext } from '../context/contexts';
import MenuItemCard from './MenuItemCrard';
import '../sass/components/popular-item.css';
import "swiper/css";
import "swiper/css/navigation";
import rightIcon from "/assets/right.svg";
import leftIcon from "/assets/left.svg";

function PopularItem() {
    const { menuItems } = useContext(MenuItemContext);
    const swiperRef = useRef(null);
    const navigate = useNavigate();

    const handleImage = (direction) => {
        if (direction === 'next') {
            swiperRef.current.swiper.slideNext();
        } else if (direction === 'prev') {
            swiperRef.current.swiper.slidePrev();
        }
    };

    const handleOrder = (id) => {
        navigate(`/order/${id}`);
    };

    return (
        <div className="popular-item-container">
            <h1 className='cim'>Népszerűek</h1>
            <button className="swiper-button prev" onClick={() => handleImage('prev')}>
                <img src={leftIcon} alt="Previous" />
            </button>

            <Swiper
                ref={swiperRef}
                modules={[Navigation, Autoplay]}
                slidesPerView={5}
                spaceBetween={10}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                navigation={{
                    nextEl: '.swiper-button.next',
                    prevEl: '.swiper-button.prev',
                }}
            >
                {menuItems.map((item) => (
                    <SwiperSlide key={item.id}>
                        <div className="item-card">
                            <img src={item.image_path} alt={item.name} />
                            <h3>{item.name}</h3>
                            <p>{item.price} Ft</p>
                            <Link to={`/item/${item.id}`} className="basket-button">
                                Rendelés
                            </Link>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <button className="swiper-button next" onClick={() => handleImage('next')}>
                <img src={rightIcon} alt="Next" />
            </button>
        </div>
    );
}

export default PopularItem;