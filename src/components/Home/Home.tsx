import {
  BookOutlined,
  FireOutlined,
  GiftOutlined,
  HeartOutlined,
  RocketOutlined,
  StarOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import Banner from "../Banner/Banner";
import Categories from "../Categories/Categories";
import FeaturedBooks from "../FeaturedBooks/FeaturedBooks";
import NewArrival from "../New Arrival/NewArrival";
import Newsletter from "../Newsletter/Newsletter";
import Testimonial from "../Testimonial/Testimonial";
import AuthorsSection from "./AuthorsSection";
import BlogSection from "./BlogSection";
import OfferSection from "./OfferSection";

const Home = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);

  // Enhanced animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.25, 0.25, 0.75] },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  // Section header component for consistency
  const SectionHeader = ({
    badge,
    title,
    subtitle,
    badgeColor = "indigo",
    accent = "indigo",
    icon,
  }: {
    badge?: string;
    title: string;
    subtitle: string;
    badgeColor?: string;
    accent?: string;
    icon?: React.ReactNode;
  }) => (
    <motion.div
      className="mb-16 text-center relative"
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Decorative background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 dark:opacity-10">
        <div className="text-9xl text-gray-400 dark:text-gray-600">
          {icon || <BookOutlined />}
        </div>
      </div>

      <div className="relative z-10">
        {badge && (
          <motion.span
            className={`inline-block px-4 py-2 bg-${badgeColor}-100 dark:bg-${badgeColor}-900/30 text-${badgeColor}-700 dark:text-${badgeColor}-300 text-sm font-semibold rounded-full mb-4 shadow-sm`}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {icon && <span className="mr-2">{icon}</span>}
            {badge}
          </motion.span>
        )}

        <motion.h2
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 bg-gradient-to-r from-gray-900 via-indigo-800 to-purple-800 dark:from-white dark:via-indigo-300 dark:to-purple-300 bg-clip-text text-transparent"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {title}
        </motion.h2>

        <div
          className={`w-32 h-1.5 bg-gradient-to-r from-${accent}-500 to-purple-500 mx-auto mb-6 rounded-full shadow-lg`}
        />

        <motion.p
          className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {subtitle}
        </motion.p>
      </div>
    </motion.div>
  );

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-950 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <motion.div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ y: y1 }}
      >
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-indigo-200/20 to-purple-200/20 dark:from-indigo-800/10 dark:to-purple-800/10 rounded-full blur-3xl" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-br from-pink-200/20 to-orange-200/20 dark:from-pink-800/10 dark:to-orange-800/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-br from-teal-200/20 to-cyan-200/20 dark:from-teal-800/10 dark:to-cyan-800/10 rounded-full blur-3xl" />
      </motion.div>

      <motion.div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ y: y2 }}
      >
        <div className="absolute top-60 right-1/4 w-64 h-64 bg-gradient-to-br from-violet-200/15 to-indigo-200/15 dark:from-violet-800/8 dark:to-indigo-800/8 rounded-full blur-2xl" />
      </motion.div>

      {/* Hero Section with enhanced animations */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        className="relative z-10"
      >
        <Banner />
      </motion.div>

      {/* Stats Section */}
      <motion.div
        className="relative z-10 -mt-20 mb-20"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 dark:border-slate-700/50"
            whileHover={{ y: -10 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                {
                  number: "50K+",
                  label: "Happy Readers",
                  icon: <HeartOutlined />,
                  color: "rose",
                },
                {
                  number: "10K+",
                  label: "Books Available",
                  icon: <BookOutlined />,
                  color: "blue",
                },
                {
                  number: "500+",
                  label: "Authors",
                  icon: <StarOutlined />,
                  color: "amber",
                },
                {
                  number: "98%",
                  label: "Satisfaction",
                  icon: <ThunderboltOutlined />,
                  color: "emerald",
                },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                >
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 bg-${stat.color}-100 dark:bg-${stat.color}-900/30 text-${stat.color}-600 dark:text-${stat.color}-400 rounded-2xl mb-4 text-2xl shadow-lg`}
                  >
                    {stat.icon}
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {stat.number}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 font-medium">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Categories Section */}
        <motion.section
          className="py-20"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <SectionHeader
            badge="EXPLORE GENRES"
            title="Browse by Category"
            subtitle="Discover your next favorite read from our carefully curated collection spanning every genre imaginable"
            badgeColor="indigo"
            icon={<BookOutlined />}
          />
          <motion.div
            className="relative"
            whileHover="hover"
            variants={{
              hover: {
                transition: { staggerChildren: 0.1 },
              },
            }}
          >
            <Categories />
          </motion.div>
        </motion.section>

        {/* New Arrivals Section */}
        <motion.section
          className="py-20 relative"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50/80 via-indigo-50/80 to-purple-50/80 dark:from-blue-900/20 dark:via-indigo-900/20 dark:to-purple-900/20 -mx-8 rounded-3xl backdrop-blur-sm border border-white/30 dark:border-slate-700/30 shadow-xl" />
          <div className="relative z-10">
            <SectionHeader
              badge="JUST RELEASED"
              title="Fresh Off The Press"
              subtitle="Be the first to discover our latest additions and newest releases from celebrated authors"
              badgeColor="blue"
              accent="blue"
              icon={<RocketOutlined />}
            />
            <motion.div animate={floatingAnimation} className="relative">
              <NewArrival />
            </motion.div>
          </div>
        </motion.section>

        {/* Featured Books Section */}
        <motion.section
          className="py-20"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <SectionHeader
            badge="RECOMMENDED FOR YOU"
            title="Editor's Choice"
            subtitle="Handpicked selections that our literary experts and readers absolutely love and recommend"
            badgeColor="amber"
            accent="amber"
            icon={<StarOutlined />}
          />
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <FeaturedBooks />
          </motion.div>
        </motion.section>

        {/* Special Offers Section */}
        <motion.section
          className="py-20 relative"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-rose-50/80 via-orange-50/80 to-amber-50/80 dark:from-rose-900/20 dark:via-orange-900/20 dark:to-amber-900/20 -mx-8 rounded-3xl backdrop-blur-sm border border-white/30 dark:border-slate-700/30 shadow-xl" />
          <div className="relative z-10">
            <SectionHeader
              badge="LIMITED TIME OFFERS"
              title="Incredible Deals"
              subtitle="Exclusive discounts and special promotions you absolutely won't want to miss"
              badgeColor="rose"
              accent="rose"
              icon={<GiftOutlined />}
            />
            <motion.div
              className="relative"
              whileHover="hover"
              variants={{
                hover: {
                  transition: { staggerChildren: 0.1 },
                },
              }}
            >
              <OfferSection />
            </motion.div>
          </div>
        </motion.section>

        {/* Featured Authors Section */}
        <motion.section
          className="py-20"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <SectionHeader
            badge="MEET THE AUTHORS"
            title="Literary Masters"
            subtitle="The brilliant minds and creative voices behind our most beloved and bestselling books"
            badgeColor="purple"
            accent="purple"
            icon={<StarOutlined />}
          />
          <motion.div animate={floatingAnimation} className="relative">
            <AuthorsSection />
          </motion.div>
        </motion.section>

        {/* Testimonials Section */}
        <motion.section
          className="py-20 relative"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-50/80 via-teal-50/80 to-cyan-50/80 dark:from-emerald-900/20 dark:via-teal-900/20 dark:to-cyan-900/20 -mx-8 rounded-3xl backdrop-blur-sm border border-white/30 dark:border-slate-700/30 shadow-xl" />
          <div className="relative z-10">
            <SectionHeader
              badge="WHAT READERS SAY"
              title="Reader Love Stories"
              subtitle="Join thousands of satisfied readers who have found their perfect books through our platform"
              badgeColor="emerald"
              accent="emerald"
              icon={<HeartOutlined />}
            />
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Testimonial />
            </motion.div>
          </div>
        </motion.section>

        {/* Blog Section */}
        <motion.section
          className="py-20"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <SectionHeader
            badge="FROM OUR BLOG"
            title="Literary Insights"
            subtitle="Thoughtful articles, author interviews, book reviews, and the latest literary news and trends"
            badgeColor="violet"
            accent="violet"
            icon={<BookOutlined />}
          />
          <motion.div
            className="relative"
            whileHover="hover"
            variants={{
              hover: {
                transition: { staggerChildren: 0.1 },
              },
            }}
          >
            <BlogSection />
          </motion.div>
        </motion.section>

        {/* Newsletter Section */}
        <motion.section
          className="py-20 mb-20 relative"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-100/90 via-purple-100/90 to-pink-100/90 dark:from-indigo-900/40 dark:via-purple-900/40 dark:to-pink-900/40 -mx-8 rounded-3xl backdrop-blur-xl border border-white/40 dark:border-slate-700/40 shadow-2xl" />
          <motion.div
            className="relative z-10"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Newsletter />
          </motion.div>
        </motion.section>
      </div>

      {/* Enhanced Floating CTA */}
      <motion.div
        className="fixed bottom-8 right-8 z-50"
        initial={{ opacity: 0, scale: 0, rotate: -180 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ delay: 3, duration: 0.8, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link to="/all-books">
          <motion.button
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white p-4 rounded-2xl shadow-2xl flex items-center justify-center group transition-all duration-300 backdrop-blur-sm border border-white/20"
            whileHover={{
              boxShadow: "0 20px 40px rgba(79, 70, 229, 0.4)",
            }}
            animate={{
              y: [0, -5, 0],
              transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          >
            <FireOutlined className="text-xl mr-2" />
            <span className="font-semibold">Explore Now</span>
          </motion.button>
        </Link>
      </motion.div>

      {/* Scroll to top button */}
      <motion.div
        className="fixed bottom-8 left-8 z-50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 4, duration: 0.6 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.button
          className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 p-3 rounded-xl shadow-lg border border-gray-200/50 dark:border-slate-700/50 hover:bg-white dark:hover:bg-slate-800 transition-all duration-300"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          whileHover={{
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
          }}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Home;
