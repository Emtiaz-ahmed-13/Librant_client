import Banner from "../Banner/Banner";
import Categories from "../Categories/Categories";
import FeaturedBooks from "../FeaturedBooks/FeaturedBooks";
import NewArrival from "../New Arrival/NewArrival";
import Newsletter from "../Newsletter/Newsletter";
import Testimonial from "../Testimonial/Testimonial";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Banner />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Categories />
        <NewArrival />
        <FeaturedBooks />
        <Testimonial />
        <Newsletter />
      </div>
    </div>
  );
};

export default Home;
