import { SearchOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="relative bg-gradient-to-r from-indigo-900 to-purple-900 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern
              id="grid"
              width="8"
              height="8"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 8 0 L 0 0 0 8"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 text-center md:text-left text-white mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Discover Your Next{" "}
              <span className="text-indigo-300">Favorite Book</span>
            </h1>
            <p className="mt-6 text-lg text-indigo-100 max-w-md md:max-w-xl">
              Librant offers thousands of books across all genres. Find
              bestsellers, new releases, and classics all in one place.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center md:justify-start gap-4">
              <Link to="/books">
                <Button
                  type="primary"
                  size="large"
                  className="min-w-[150px] h-12 text-base bg-white text-indigo-700 border-white hover:bg-indigo-100 hover:text-indigo-800 hover:border-indigo-100"
                >
                  Browse Books
                </Button>
              </Link>
              <Link to="/search">
                <Button
                  size="large"
                  icon={<SearchOutlined />}
                  className="min-w-[150px] h-12 text-base border-indigo-300 text-white hover:text-white hover:border-indigo-200"
                >
                  Search Books
                </Button>
              </Link>
            </div>
          </div>

          <div className="w-full md:w-1/2 flex justify-center md:justify-end relative">
            <div className="relative w-72 h-96 md:w-80 md:h-[28rem] bg-white rounded-lg shadow-2xl overflow-hidden transform rotate-3 transition-transform hover:rotate-0 duration-300">
              <img
                src="https://images-na.ssl-images-amazon.com/images/I/81YzHKeWq7L.jpg"
                alt="Featured Book"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                <h3 className="text-white font-bold">New Release</h3>
                <p className="text-indigo-200 text-sm">Start reading today</p>
              </div>
            </div>
            {/* Decorative books in background */}
            <div className="absolute -bottom-5 -left-10 w-64 h-80 bg-purple-600 rounded-lg transform -rotate-6 opacity-70 hidden md:block" />
            <div className="absolute -top-5 -right-10 w-64 h-80 bg-indigo-500 rounded-lg transform rotate-12 opacity-70 hidden md:block" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
