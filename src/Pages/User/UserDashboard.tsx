import {
  BookOutlined,
  HomeOutlined,
  LockOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getUser } from "../../Redux/Features/Auth/authSlice";
import { useAppSelector } from "../../Redux/hook";
import UpdatePasswordForm from "./UpdatePasswordForm";
import UserManagement from "./UserManagement";

// Dashboard component for user pages
const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("orders");
  const user = useAppSelector(getUser);

  // Handle tab changing
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  // Get user's first name to display in greeting
  const firstName = user?.email ? user.email.split("@")[0] : "User";

  // Dashboard navigation items
  const navItems = [
    { id: "overview", label: "Overview", icon: <HomeOutlined /> },
    { id: "orders", label: "My Orders", icon: <ShoppingCartOutlined /> },
    { id: "account", label: "My Account", icon: <UserOutlined /> },
    { id: "password", label: "Password", icon: <LockOutlined /> },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Dashboard Header */}
      <div className="bg-indigo-600 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-2xl font-bold">Hello, {firstName}!</h1>
              <p className="text-indigo-100 mt-1">
                Welcome to your Librant dashboard
              </p>
            </div>
            <div className="mt-3 md:mt-0">
              <Link
                to="/"
                className="bg-white text-indigo-600 py-2 px-4 rounded-lg text-sm font-medium hover:bg-indigo-50 transition-colors"
              >
                <BookOutlined className="mr-1" /> Browse Books
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* User Profile Summary */}
              <div className="p-4 border-b border-gray-100">
                <div className="text-center">
                  <div className="inline-block rounded-full bg-indigo-100 p-4 mb-2">
                    <UserOutlined className="text-indigo-600 text-xl" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mt-1">
                    {user?.email || "User"}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {user?.role || "Customer"}
                  </p>
                </div>
              </div>

              {/* Navigation */}
              <nav className="p-2">
                <ul>
                  {navItems.map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => handleTabChange(item.id)}
                        className={`w-full text-left px-4 py-3 rounded-md flex items-center text-sm font-medium transition-colors ${
                          activeTab === item.id
                            ? "bg-indigo-50 text-indigo-600"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <span className="mr-3">{item.icon}</span>
                        {item.label}
                      </button>
                    </li>
                  ))}
                  <li>
                    <Link
                      to="/logout"
                      className="w-full text-left px-4 py-3 rounded-md flex items-center text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <span className="mr-3">
                        <LogoutOutlined />
                      </span>
                      Logout
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {/* Tab Content */}
              {activeTab === "overview" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-gray-800">Overview</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-blue-700">
                        Total Orders
                      </h3>
                      <p className="text-2xl font-bold text-blue-800 mt-2">0</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-green-700">
                        Completed Orders
                      </h3>
                      <p className="text-2xl font-bold text-green-800 mt-2">
                        0
                      </p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-purple-700">
                        Account Status
                      </h3>
                      <p className="text-lg font-medium text-purple-800 mt-2">
                        Active
                      </p>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-5 text-white">
                    <h3 className="font-medium text-lg">Recommended Books</h3>
                    <p className="mt-1 text-indigo-100">
                      Explore our new collection of books based on your
                      interests
                    </p>
                    <Link
                      to="/all-books"
                      className="inline-block mt-4 bg-white text-indigo-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-50"
                    >
                      Explore Books
                    </Link>
                  </div>
                </div>
              )}

              {activeTab === "orders" && (
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-4">
                    My Orders
                  </h2>
                  <UserManagement />
                </div>
              )}

              {activeTab === "account" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-gray-800">
                    Account Information
                  </h2>
                  <div className="space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-500 md:w-1/3">
                        Email
                      </span>
                      <span className="text-gray-800">
                        {user?.email || "Not available"}
                      </span>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-500 md:w-1/3">
                        Role
                      </span>
                      <span className="text-gray-800">
                        {user?.role || "Customer"}
                      </span>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-500 md:w-1/3">
                        Account ID
                      </span>
                      <span className="text-gray-800">
                        {user?.id || "Not available"}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "password" && (
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Change Password
                  </h2>
                  <UpdatePasswordForm />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
