import React, { useContext, useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { Link, useNavigate } from 'react-router-dom';
import { MenuItemContext } from '../context/contexts';
import rightIcon from "/assets/right.svg";
import leftIcon from "/assets/left.svg";
import 'swiper/css';
import 'swiper/css/navigation';


function DiscountItems() {
  const { discountedItems } = useContext(MenuItemContext);
  const [items, setItems] = useState([]);
  const swiperRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setItems(discountedItems);
  }, [discountedItems]);

  const handleImage = (direction) => {
    if (direction === 'next') {
      swiperRef.current.swiper.slideNext();
    } else if (direction === 'prev') {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="popular-item-container">
      <h1 className='cim'>Akciós termékek</h1>
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
        {items.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="item-card">
              <img src={item.image_path} alt={item.name} />
              <h3>{capitalizeFirstLetter(item.name)}</h3>
              <p className="original-price">{item.price} Ft</p>
              <p className="discounted-price">{item.price - item.discount_amount} Ft</p>
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

export default DiscountItems;