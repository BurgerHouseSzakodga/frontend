import Header from "../components/Header";
import PopularItem from "../components/PopularItem";
import '../sass/pages/_home.scss'

const Home = () => {
  return (
    <div className="home">
      <Header />
      <PopularItem/> 
    </div>

  );
};

export default Home;
