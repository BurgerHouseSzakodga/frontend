import Header from "../components/Header";

import "swiper/css";
import PopularItem from "../components/PopularItem";
import AllMenuWithCategory from "../components/AllItems";


const Home = () => {
  return (
    <div className="home">
      <Header />
      <PopularItem />
  
    </div>
  );
};

export default Home;
