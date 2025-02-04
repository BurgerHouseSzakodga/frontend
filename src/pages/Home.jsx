import Header from "../components/Header";

import "swiper/css";
import PopularItem from "../components/PopularItem";;
import DiscountItems from "../components/DiscountItems";


const Home = () => {
  return (
    <div className="home">
      <Header />
      <PopularItem />
      <DiscountItems/>
    </div>
  );
};

export default Home;
