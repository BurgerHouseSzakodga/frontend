import { useContext, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import { MenuItemContext } from "../context/contexts";
import "../sass/components/popular-item.css";
import "swiper/css";
import "swiper/css/navigation";
import rightIcon from "/assets/right.svg";
import leftIcon from "/assets/left.svg";

function PopularItem() {
  const { popularItems } = useContext(MenuItemContext);
  const swiperRef = useRef(null);
  const handleImage = (direction) => {
    if (direction === "next") {
      swiperRef.current.swiper.slideNext();
    } else if (direction === "prev") {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="popular-item-container">
      <h1 className="cim">Népszerűek</h1>
      <button
        className="swiper-button prev"
        onClick={() => handleImage("prev")}
      >
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
          nextEl: ".swiper-button.next",
          prevEl: ".swiper-button.prev",
        }}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          480: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          1200: {
            slidesPerView: 5,
            spaceBetween: 10,
          },
        }}
      >
        {popularItems.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="item-card">
              {
                item.discount_amount > 0 && (
                  <div className="discount-badge">-{item.discount_amount}%</div>
                )
              }
              <img src={item.image_path} alt={item.name} />
              <h3 className="itemName">{capitalizeFirstLetter(item.name)}</h3>
              {item.discount_amount > 0 ? (
                <>
                  <p className="order-price">{item.price} Ft</p>
                  <p className="actual-price">{item.actual_price}  Ft</p>
                </>
              ) : (
                <>
                  <br />
                  <p className="price">{item.price} Ft</p>
                </>
              )
              }
              <Link to={`/item/${item.id}`} className="basket-button">
                Rendelés
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        className="swiper-button next"
        onClick={() => handleImage("next")}
      >
        <img src={rightIcon} alt="Next" />
      </button>
    </div>
  );
}

export default PopularItem;
