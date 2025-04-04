import Header from "../components/Header";

import "swiper/css";
import PopularItem from "../components/PopularItem";
import DiscountItems from "../components/DiscountItems";
import AboutYouCard from "../components/AboutYou";
import AddressAbout from "../components/AddressAbout";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="home">
      <Header />
      <PopularItem />
      <AboutYouCard />
      <DiscountItems />
      <AddressAbout />
      <Footer />
    </div>
  );
};

export default Home;
