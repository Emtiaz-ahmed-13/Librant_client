import {
  BookOutlined,
  CreditCardOutlined,
  DashboardOutlined,
  HeartOutlined,
  LockOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
  StarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getUser, logOut } from "../../Redux/Features/Auth/authSlice";
import { useGetCustomerOrdersQuery } from "../../Redux/Features/Orders/Order.api";
import { useAppDispatch, useAppSelector } from "../../Redux/hook";
import PaymentMethods from "./PaymentMethods";
import Reviews from "./Reviews";
import UpdatePasswordForm from "./UpdatePasswordForm";
import UserManagement from "./UserManagement";
import Wishlist from "./Wishlist";
// Placeholder: import { useGetWishlistQuery } from "../../Redux/Features/Wishlist/wishlistApi";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

// Dashboard component for user pages
const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const user = useAppSelector(getUser);
  const dispatch = useAppDispatch();
  const { data: ordersData, isLoading: ordersLoading } =
    useGetCustomerOrdersQuery(undefined);
  // Placeholder for wishlist API:
  // const { data: wishlistData, isLoading: wishlistLoading, error: wishlistError } = useGetWishlistQuery(undefined);
  const wishlistCount = 0; // TODO: Replace with wishlistData?.length when API is ready
  const orderCount = ordersData?.data?.length || 0;

  // Handle tab changing
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  // Get user's first name to display in greeting
  const firstName = user?.email ? user.email.split("@")[0] : "User";

  // Dashboard navigation items
  const navItems = [
    { id: "overview", label: "Overview", icon: <DashboardOutlined /> },
    { id: "orders", label: "My Orders", icon: <ShoppingCartOutlined /> },
    { id: "wishlist", label: "Wishlist", icon: <HeartOutlined /> },
    { id: "reviews", label: "My Reviews", icon: <StarOutlined /> },
    { id: "account", label: "My Account", icon: <UserOutlined /> },
    {
      id: "payment-methods",
      label: "Payment Methods",
      icon: <CreditCardOutlined />,
    },
    { id: "password", label: "Password", icon: <LockOutlined /> },
  ];

  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <div className="bg-gray-50 dark:bg-slate-900 min-h-screen">
      {/* Dashboard Header */}
      <motion.div
        className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white dark:from-indigo-800 dark:to-purple-900"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold">Hello, {firstName}!</h1>
              <p className="text-indigo-100 mt-1">
                Welcome to your Librant dashboard
              </p>
            </div>
            <div className="mt-3 md:mt-0">
              <Link
                to="/"
                className="bg-white text-indigo-600 py-2 px-4 rounded-lg text-sm font-medium hover:bg-indigo-50 transition-colors flex items-center shadow-md"
              >
                <BookOutlined className="mr-2" /> Browse Books
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Dashboard Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Sidebar */}
          <motion.div
            className="lg:col-span-1"
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm overflow-hidden sticky top-24">
              {/* User Profile Summary */}
              <motion.div
                className="p-6 border-b border-gray-100 dark:border-gray-700"
                variants={item}
              >
                <div className="text-center">
                  <div className="inline-block rounded-full bg-indigo-100 dark:bg-indigo-900 p-5 mb-3 shadow-sm">
                    <UserOutlined className="text-indigo-600 dark:text-indigo-400 text-xl" />
                  </div>
                  <h3 className="font-semibold text-gray-800 dark:text-white text-lg mt-1">
                    {user?.email || "User"}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm capitalize">
                    {user?.role || "Customer"}
                  </p>
                </div>
              </motion.div>

              {/* Navigation */}
              <nav className="p-3">
                <ul className="space-y-1">
                  {navItems.map((navItem) => (
                    <motion.li key={navItem.id} variants={item}>
                      <button
                        onClick={() => handleTabChange(navItem.id)}
                        className={`w-full text-left px-4 py-3 rounded-md flex items-center text-sm font-medium transition-all duration-200 ${
                          activeTab === navItem.id
                            ? "bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 shadow-sm"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700/50"
                        }`}
                      >
                        <span className="mr-3 text-lg">{navItem.icon}</span>
                        {navItem.label}
                      </button>
                    </motion.li>
                  ))}
                  <motion.li variants={item}>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 rounded-md flex items-center text-sm font-medium text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      <span className="mr-3 text-lg">
                        <LogoutOutlined />
                      </span>
                      Logout
                    </button>
                  </motion.li>
                </ul>
              </nav>
            </div>
          </motion.div>

          {/* Main Content Area */}
          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Tab Content */}
            {activeTab === "overview" && (
              <motion.div
                className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6"
                initial="hidden"
                animate="visible"
                variants={stagger}
              >
                <motion.h2
                  className="text-xl font-bold text-gray-800 dark:text-white mb-6"
                  variants={item}
                >
                  Overview
                </motion.h2>
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
                  variants={item}
                >
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 p-6 rounded-lg transition-transform hover:scale-105 duration-300">
                    <h3 className="text-sm font-medium text-blue-700 dark:text-blue-400 mb-1">
                      Total Orders
                    </h3>
                    <p className="text-3xl font-bold text-blue-800 dark:text-blue-300">
                      {ordersLoading ? (
                        <span className="animate-pulse">...</span>
                      ) : (
                        orderCount
                      )}
                    </p>
                    <p className="text-xs text-blue-600 dark:text-blue-500 mt-2">
                      View your order history
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 p-6 rounded-lg transition-transform hover:scale-105 duration-300">
                    <h3 className="text-sm font-medium text-green-700 dark:text-green-400 mb-1">
                      Wishlist Items
                    </h3>
                    <p className="text-3xl font-bold text-green-800 dark:text-green-300">
                      {/* Replace 0 with wishlistCount when API is ready */}
                      {wishlistCount}
                    </p>
                    <p className="text-xs text-green-600 dark:text-green-500 mt-2">
                      Books you saved for later
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 p-6 rounded-lg transition-transform hover:scale-105 duration-300">
                    <h3 className="text-sm font-medium text-purple-700 dark:text-purple-400 mb-1">
                      Account Status
                    </h3>
                    <p className="text-lg font-medium text-purple-800 dark:text-purple-300 mt-2">
                      Active
                    </p>
                    <p className="text-xs text-purple-600 dark:text-purple-500 mt-2">
                      Your account is in good standing
                    </p>
                  </div>
                </motion.div>

                <motion.div variants={item}>
                  <div className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-900 dark:to-purple-900 rounded-lg p-6 text-white shadow-xl">
                    <h3 className="font-medium text-xl mb-2">
                      Recommended Books
                    </h3>
                    <p className="text-indigo-100 dark:text-indigo-200 mb-4">
                      Discover new titles based on your reading preferences and
                      wishlist
                    </p>
                    <Link
                      to="/all-books"
                      className="inline-block mt-2 bg-white text-indigo-600 px-6 py-2 rounded-md text-sm font-medium hover:bg-indigo-50 transition-colors shadow-sm"
                    >
                      Explore Books
                    </Link>
                  </div>
                </motion.div>

                <motion.div
                  className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"
                  variants={item}
                >
                  <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-gray-700 rounded-lg p-5 shadow-sm">
                    <h3 className="font-medium text-gray-800 dark:text-white mb-3">
                      Recent Activity
                    </h3>
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      <p>No recent activity to show</p>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-gray-700 rounded-lg p-5 shadow-sm">
                    <h3 className="font-medium text-gray-800 dark:text-white mb-3">
                      Your Library
                    </h3>
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      <p>You haven't purchased any books yet</p>
                      <Link
                        to="/all-books"
                        className="text-indigo-600 dark:text-indigo-400 text-sm inline-block mt-2 hover:underline"
                      >
                        Browse our collection
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {activeTab === "orders" && (
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
                  My Orders
                </h2>
                <UserManagement />
              </div>
            )}

            {activeTab === "wishlist" && (
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6">
                <Wishlist />
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6">
                <Reviews />
              </div>
            )}

            {activeTab === "account" && (
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
                  Account Information
                </h2>
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row md:items-center py-4 border-b border-gray-100 dark:border-gray-700">
                    <span className="font-medium text-gray-500 dark:text-gray-400 md:w-1/3">
                      Email
                    </span>
                    <span className="text-gray-800 dark:text-white">
                      {user?.email || "Not available"}
                    </span>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center py-4 border-b border-gray-100 dark:border-gray-700">
                    <span className="font-medium text-gray-500 dark:text-gray-400 md:w-1/3">
                      Role
                    </span>
                    <span className="text-gray-800 dark:text-white capitalize">
                      {user?.role || "Customer"}
                    </span>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center py-4 border-b border-gray-100 dark:border-gray-700">
                    <span className="font-medium text-gray-500 dark:text-gray-400 md:w-1/3">
                      Account ID
                    </span>
                    <span className="text-gray-800 dark:text-white">
                      {user?.id || "Not available"}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "payment-methods" && (
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                <PaymentMethods />
              </div>
            )}

            {activeTab === "password" && (
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
                  Change Password
                </h2>
                <UpdatePasswordForm />
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
