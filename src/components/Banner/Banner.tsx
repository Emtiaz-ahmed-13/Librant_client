import { SearchOutlined, StarOutlined } from "@ant-design/icons";
import { Button, Carousel } from "antd";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";

const BannerSlide = ({
  heading,
  subHeading,
  imageSrc,
  bgClass,
  description,
}: {
  heading: string;
  subHeading: string;
  imageSrc: string;
  bgClass: string;
  description: string;
}) => (
  <div className={`relative ${bgClass} overflow-hidden h-[80vh] md:h-[70vh]`}>
    {/* Enhanced background pattern */}
    <div className="absolute inset-0 opacity-20">
      <svg
        className="w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern
            id="books-pattern"
            width="12"
            height="12"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 12 0 L 0 0 0 12"
              fill="none"
              stroke="white"
              strokeWidth="0.3"
              opacity="0.6"
            />
            <circle cx="6" cy="6" r="0.5" fill="white" opacity="0.4" />
          </pattern>
          <linearGradient id="shimmer" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.2)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#books-pattern)" />
        <rect width="100%" height="100%" fill="url(#shimmer)" />
      </svg>
    </div>

    {/* Floating particles */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white rounded-full opacity-30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 h-full relative z-10">
      <div className="flex flex-col md:flex-row items-center h-full">
        <motion.div
          className="w-full md:w-1/2 text-center md:text-left text-white mb-10 md:mb-0"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="inline-block mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <span className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium border border-white/30">
              <StarOutlined className="mr-2" />
              Bestselling Collection
            </span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {heading}{" "}
            <motion.span
              className="block text-transparent bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {subHeading}
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-xl text-white/90 max-w-md md:max-w-xl leading-relaxed mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            {description}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row justify-center md:justify-start gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <Link to="/all-books">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  type="primary"
                  size="large"
                  className="min-w-[180px] h-14 text-lg font-semibold bg-white text-indigo-700 border-white hover:bg-gray-100 hover:text-indigo-800 hover:border-gray-100 shadow-xl"
                >
                  Browse Books
                </Button>
              </motion.div>
            </Link>
            <Link to="/search">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="large"
                  icon={<SearchOutlined />}
                  className="min-w-[180px] h-14 text-lg font-semibold border-white/50 text-white hover:text-white hover:border-white bg-white/10 backdrop-blur-sm hover:bg-white/20 shadow-xl"
                >
                  Search Books
                </Button>
              </motion.div>
            </Link>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            className="mt-12 flex items-center justify-center md:justify-start space-x-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <div className="text-center">
              <div className="text-2xl font-bold">50K+</div>
              <div className="text-white/80 text-sm">Happy Readers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">10K+</div>
              <div className="text-white/80 text-sm">Books</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">500+</div>
              <div className="text-white/80 text-sm">Authors</div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="w-full md:w-1/2 flex justify-center md:justify-end relative"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          {/* Main book showcase */}
          <motion.div
            className="relative w-80 h-[32rem] md:w-96 md:h-[36rem]"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div
              className="absolute inset-0 bg-white rounded-2xl shadow-2xl overflow-hidden transform rotate-3 z-10"
              whileHover={{ rotate: 0 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={imageSrc}
                alt="Featured Book"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <motion.div
                className="absolute bottom-6 left-6 right-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.6 }}
              >
                <h3 className="text-white font-bold text-xl mb-2">
                  Featured This Month
                </h3>
                <p className="text-white/90 text-sm mb-3">
                  Discover the book everyone's talking about
                </p>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <StarOutlined
                      key={i}
                      className="text-yellow-400 text-sm mr-1"
                    />
                  ))}
                  <span className="text-white/80 text-sm ml-2">4.9/5</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Decorative background books */}
            <motion.div
              className="absolute -bottom-8 -left-12 w-72 h-96 bg-gradient-to-br from-purple-600/80 to-indigo-600/80 rounded-2xl transform -rotate-12 shadow-xl hidden md:block backdrop-blur-sm"
              animate={{
                rotate: [-12, -8, -12],
                y: [0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute -top-8 -right-12 w-72 h-96 bg-gradient-to-br from-pink-500/80 to-rose-500/80 rounded-2xl transform rotate-12 shadow-xl hidden md:block backdrop-blur-sm"
              animate={{
                rotate: [12, 16, 12],
                y: [0, -8, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  </div>
);

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const bannerContent = [
    {
      heading: "Discover Your Next",
      subHeading: "Favorite Book",
      description:
        "Explore thousands of captivating stories, from bestselling novels to hidden literary gems waiting to be discovered.",
      imageSrc:
        "https://images-na.ssl-images-amazon.com/images/I/81YzHKeWq7L.jpg",
      bgClass: "bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800",
    },
    {
      heading: "Explore Award",
      subHeading: "Winning Authors",
      description:
        "Immerse yourself in the brilliant works of acclaimed authors and discover the stories that have shaped literature.",
      imageSrc:
        "https://images-na.ssl-images-amazon.com/images/I/71aLultW5EL.jpg",
      bgClass: "bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900",
    },
    {
      heading: "Find Perfect",
      subHeading: "Summer Reads",
      description:
        "Curated collections of the perfect books for every season, mood, and moment in your reading journey.",
      imageSrc:
        "https://images-na.ssl-images-amazon.com/images/I/A1kNdYXw0GL.jpg",
      bgClass: "bg-gradient-to-br from-blue-900 via-indigo-900 to-teal-800",
    },
  ];

  return (
    <div className="relative overflow-hidden">
      <Carousel
        autoplay
        autoplaySpeed={5000}
        effect="fade"
        dots={false}
        beforeChange={(_, next) => setCurrentSlide(next)}
        className="banner-carousel"
      >
        {bannerContent.map((content, index) => (
          <BannerSlide key={index} {...content} />
        ))}
      </Carousel>

      {/* Enhanced scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-0 right-0 flex justify-center z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center text-white">
          <p className="text-sm mb-2 opacity-90 font-medium">
            Scroll to explore
          </p>
          <motion.div
            className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
            whileHover={{ borderColor: "rgba(255,255,255,0.8)" }}
          >
            <motion.div
              className="w-1 h-3 bg-white rounded-full mt-2"
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Custom carousel indicators */}
      <div className="absolute z-20 bottom-16 right-8 hidden md:flex flex-col space-y-3">
        {bannerContent.map((_, index) => (
          <motion.button
            key={index}
            className={`w-1 h-8 rounded-full transition-all duration-300 ${
              currentSlide === index
                ? "bg-white shadow-lg"
                : "bg-white/40 hover:bg-white/60"
            }`}
            onClick={() => {
              // Custom slide navigation logic would go here
            }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>

      {/* Slide counter */}
      <motion.div
        className="absolute top-8 right-8 z-20 bg-black/20 backdrop-blur-sm rounded-full px-4 py-2 text-white text-sm font-medium hidden md:block"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        {currentSlide + 1} / {bannerContent.length}
      </motion.div>
    </div>
  );
};

export default Banner;
