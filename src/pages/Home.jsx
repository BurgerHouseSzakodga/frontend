import Header from "../components/Header";

import "swiper/css";
import PopularItem from "../components/PopularItem";
import AllMenuWithCategory from "../components/AllMenuWithCategory";


const Home = () => {
  return (
    <div className="home">
      <Header />
      <PopularItem />
      <AllMenuWithCategory />
    </div>
  );
};

export default Home;
