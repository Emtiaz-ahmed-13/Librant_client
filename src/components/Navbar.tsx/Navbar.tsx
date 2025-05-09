import {
  BookOutlined,
  HeartOutlined,
  MenuOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Badge, Button, Drawer, Menu, Popover } from "antd";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getUser } from "../../Redux/Features/Auth/authSlice";
import { ICart, getCart } from "../../Redux/Features/Orders/cartSlice";
import { useAppSelector } from "../../Redux/hook";
import UserDropdown from "../UserDropdown/UserDropdown";

const Navbar = () => {
  const navigate = useNavigate();
  const user = useAppSelector(getUser);
  const { items } = useAppSelector(getCart);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalPrice = items.reduce((total, item) => total + item.totalPrice, 0);

  const cartContent = (
    <div className="w-80 p-2">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">
        Your Cart
      </h3>
      <div className="max-h-80 overflow-y-auto">
        {items.length > 0 ? (
          <>
            {items.map((item, idx) => (
              <CartItem key={idx} product={item} />
            ))}
            <div className="border-t mt-4 pt-4 flex justify-between items-center">
              <span className="font-semibold text-gray-800">Total:</span>
              <span className="text-indigo-600 font-bold">
                ${Number(totalPrice).toFixed(2)}
              </span>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <Button onClick={() => navigate("/cart")}>View Cart</Button>
              <Button type="primary" onClick={() => navigate("/checkout")}>
                Checkout
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-6">
            <div className="text-5xl text-gray-300 mb-4 flex justify-center">
              <ShoppingCartOutlined />
            </div>
            <p className="text-gray-500 mb-4">Your cart is empty</p>
            <Button type="primary" onClick={() => navigate("/all-books")}>
              Browse Books
            </Button>
          </div>
        )}
      </div>
    </div>
  );

  const navItems = [
    { key: "home", label: "Home", path: "/" },
    { key: "books", label: "All Books", path: "/all-books" },
    { key: "categories", label: "Categories", path: "/categories" },
    { key: "about", label: "About", path: "/about" },
    { key: "contact", label: "Contact", path: "/contact" },
  ];

  return (
    <div className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top bar */}
      <div className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white text-xs py-2 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div>Free shipping on orders over $35</div>
          <div className="flex gap-4">
            <span>Support: support@librant.com</span>
            <span>|</span>
            <span>+1 234 567 8900</span>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <BookOutlined className="text-2xl mr-2 text-indigo-600" />
          <span
            className="text-2xl font-bold cursor-pointer"
            onClick={() => navigate("/")}
          >
            Libr<span className="text-indigo-600">ant</span>
          </span>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex">
          <ul className="flex space-x-8">
            {navItems.map((item) => (
              <li key={item.key}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    isActive
                      ? "text-indigo-600 font-medium border-b-2 border-indigo-600 pb-1"
                      : "text-gray-700 hover:text-indigo-600 font-medium"
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* User actions */}
        <div className="flex items-center gap-4">
          <button
            className="text-gray-700 hover:text-indigo-600 hidden md:block"
            onClick={() => navigate("/search")}
          >
            <SearchOutlined className="text-xl" />
          </button>

          <button className="text-gray-700 hover:text-indigo-600 hidden md:block">
            <HeartOutlined className="text-xl" />
          </button>

          <Popover
            content={cartContent}
            trigger="click"
            placement="bottomRight"
            overlayClassName="cart-popover"
          >
            <Badge count={items.length} offset={[-5, 5]} color="#4f46e5">
              <button className="text-gray-700 hover:text-indigo-600">
                <ShoppingCartOutlined className="text-xl" />
              </button>
            </Badge>
          </Popover>

          {user ? (
            <UserDropdown />
          ) : (
            <Button
              type="primary"
              onClick={() => navigate("/login")}
              className="hidden md:block"
            >
              Sign In
            </Button>
          )}

          <button
            className="text-gray-700 md:hidden"
            onClick={() => setMobileMenuOpen(true)}
          >
            <MenuOutlined className="text-xl" />
          </button>
        </div>
      </div>

      {/* Mobile menu drawer */}
      <Drawer
        title={
          <div className="flex items-center">
            <BookOutlined className="text-xl mr-2 text-indigo-600" />
            <span className="text-xl font-bold">Librant</span>
          </div>
        }
        placement="right"
        onClose={() => setMobileMenuOpen(false)}
        open={mobileMenuOpen}
        width={280}
      >
        <div className="flex flex-col h-full">
          <div className="flex-grow">
            <Menu mode="vertical" className="border-0">
              {navItems.map((item) => (
                <Menu.Item
                  key={item.key}
                  onClick={() => {
                    navigate(item.path);
                    setMobileMenuOpen(false);
                  }}
                >
                  {item.label}
                </Menu.Item>
              ))}
            </Menu>

            <div className="mt-6 space-y-4">
              <Button
                type="primary"
                onClick={() => {
                  navigate("/search");
                  setMobileMenuOpen(false);
                }}
                icon={<SearchOutlined />}
                block
              >
                Search
              </Button>

              {!user && (
                <Button
                  onClick={() => {
                    navigate("/login");
                    setMobileMenuOpen(false);
                  }}
                  block
                >
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default Navbar;

const CartItem = ({ product }: { product: ICart }) => {
  return (
    <div className="flex items-center gap-3 py-3 border-b">
      <img
        src={"/assets/img1.png"}
        alt={"Book cover"}
        className="w-12 h-16 object-cover rounded shadow-sm"
      />
      <div className="flex-grow min-w-0">
        <h4 className="text-sm font-medium text-gray-800 truncate">
          {product.title}
        </h4>
        <div className="flex items-center text-xs text-gray-500 mt-1">
          <span>Qty: {product.quantity}</span>
          <span className="mx-2">·</span>
          <span className="font-medium text-indigo-600">
            ${product.totalPrice.toFixed(2)}
          </span>
        </div>
      </div>
      <button className="text-gray-400 hover:text-red-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};
