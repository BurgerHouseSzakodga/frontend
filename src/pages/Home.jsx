import Header from "../components/Header";

import "swiper/css";
import PopularItem from "../components/PopularItem";
import DiscountItems from "../components/DiscountItems";
import AboutYouCard from "../components/AboutYou";
import AddresAbout from "../components/AddresAbout";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="home">
      <Header />
      <PopularItem />
      <AboutYouCard />
      <DiscountItems />
      <AddresAbout />
      <Footer />
    </div>
  );
};

export default Home;
