import { BookOutlined } from "@ant-design/icons";
import { Divider, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Gauge,
  Gift,
  Heart,
  Home,
  Library,
  LogOut,
  Mail,
  MessageSquare,
  Settings,
  ShoppingBag,
  ShoppingCart,
  Tag,
  Ticket,
  TrendingUp,
  User,
  Users,
} from "lucide-react";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getUser, logOut } from "../../Redux/Features/Auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../Redux/hook";

const Sidebar: React.FC = () => {
  const user = useAppSelector(getUser);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  // Define admin menu items
  const adminMenuItems = [
    {
      key: "admin/dashboard",
      icon: <Gauge size={18} />,
      label: "Dashboard",
    },
    {
      key: "admin/books",
      icon: <BookOpen size={18} />,
      label: "Books Management",
    },
    {
      key: "admin/categories",
      icon: <Library size={18} />,
      label: "Categories",
    },
    {
      key: "admin/orders",
      icon: <ShoppingBag size={18} />,
      label: "Orders",
    },
    {
      key: "admin/customers",
      icon: <Users size={18} />,
      label: "Customers",
    },
    {
      key: "admin/coupons",
      icon: <Ticket size={18} />,
      label: "Coupons",
    },
    {
      key: "admin/newsletter",
      icon: <Mail size={18} />,
      label: "Newsletter",
    },
    {
      key: "admin/offers",
      icon: <Tag size={18} />,
      label: "Special Offers",
    },
    {
      key: "admin/analytics",
      icon: <TrendingUp size={18} />,
      label: "Analytics",
    },
    {
      key: "admin/reviews",
      icon: <MessageSquare size={18} />,
      label: "Reviews",
    },
    {
      key: "admin/settings",
      icon: <Settings size={18} />,
      label: "Settings",
    },
  ];

  // Define user menu items
  const userMenuItems = [
    {
      key: "user/dashboard",
      icon: <Gauge size={18} />,
      label: "Dashboard",
    },
    {
      key: "user/orders",
      icon: <ShoppingBag size={18} />,
      label: "My Orders",
    },
    {
      key: "user/wishlist",
      icon: <Heart size={18} />,
      label: "Wishlist",
    },
    {
      key: "user/cart",
      icon: <ShoppingCart size={18} />,
      label: "Shopping Cart",
    },
    {
      key: "user/reviews",
      icon: <MessageSquare size={18} />,
      label: "My Reviews",
    },
    {
      key: "user/profile",
      icon: <User size={18} />,
      label: "Profile",
    },
    {
      key: "user/payment-methods",
      icon: <CreditCard size={18} />,
      label: "Payment Methods",
    },
    {
      key: "user/coupons",
      icon: <Gift size={18} />,
      label: "My Coupons",
    },
  ];

  // Set sidebar items based on user role
  const sideBarItems = user?.role === "admin" ? adminMenuItems : userMenuItems;

  // Get current path to highlight active menu item
  const currentPath = location.pathname.split("/").slice(0, 3).join("/");

  return (
    <Sider
      breakpoint="lg"
      className="bg-white dark:bg-slate-900 shadow-md dark:shadow-slate-800"
      collapsedWidth="0"
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      trigger={null}
      style={{ position: "sticky", height: "100vh", top: 0 }}
      width={250}
    >
      <div className="relative py-6">
        {/* Logo */}
        <div className="flex items-center justify-center mb-6 px-6">
          <BookOutlined className="text-2xl mr-2 text-indigo-600 dark:text-indigo-400" />
          <span className="text-2xl font-bold text-gray-800 dark:text-white">
            Libr
            <span className="text-indigo-600 dark:text-indigo-400">ant</span>
          </span>
        </div>

        {/* Collapse button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-10 bg-white dark:bg-slate-800 p-1.5 rounded-full shadow-md text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 border border-gray-200 dark:border-gray-700 z-50"
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>

        {/* User info */}
        <div className="px-6 mb-6">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
              <span className="text-indigo-700 dark:text-indigo-300 font-semibold text-sm">
                {user?.email?.charAt(0).toUpperCase() || "U"}
              </span>
            </div>
            <div>
              <p className="font-medium text-gray-800 dark:text-white">
                {user?.email?.split("@")[0] || "User"}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                {user?.role || "user"}
              </p>
            </div>
          </div>
        </div>

        <Divider className="my-2 dark:border-gray-700" />

        {/* Menu */}
        <Menu
          className="border-r-0 dark:bg-slate-900 dark:text-white"
          mode="inline"
          selectedKeys={[currentPath]}
          items={sideBarItems.map((item) => ({
            key: item.key,
            icon: item.icon,
            label: <Link to={`/${item.key}`}>{item.label}</Link>,
          }))}
        />

        <Divider className="my-2 dark:border-gray-700" />

        {/* Footer actions */}
        <div className="px-6 absolute bottom-6 w-full">
          <Link
            className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 py-2"
            to="/"
          >
            <Home size={18} />
            <span>Back to Home</span>
          </Link>

          <button
            className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 py-2 w-full text-left"
            onClick={() => dispatch(logOut())}
          >
            <LogOut size={18} />
            <span>Log Out</span>
          </button>
        </div>
      </div>
    </Sider>
  );
};

export default Sidebar;
