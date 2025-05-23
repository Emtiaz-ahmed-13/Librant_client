import {
  BookOutlined,
  DownOutlined,
  HeartOutlined,
  MenuOutlined,
  MoonOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  SunOutlined,
} from "@ant-design/icons";
import { Badge, Button, Drawer, Menu, Popover } from "antd";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { getUser } from "../../Redux/Features/Auth/authSlice";
import { ICart, getCart } from "../../Redux/Features/Orders/cartSlice";
import { useAppSelector } from "../../Redux/hook";
import { useTheme } from "../../lib/ThemeProvider";
import UserDropdown from "../UserDropdown/UserDropdown";

const Navbar = () => {
  const navigate = useNavigate();
  const user = useAppSelector(getUser);
  const { items } = useAppSelector(getCart);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  const totalPrice = items.reduce((total, item) => total + item.totalPrice, 0);

  const cartContent = (
    <div className="w-80 p-2 dark:bg-slate-800 dark:text-white">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white border-b pb-2 dark:border-gray-700">
        Your Cart
      </h3>
      <div className="max-h-80 overflow-y-auto">
        {items.length > 0 ? (
          <>
            {items.map((item, idx) => (
              <CartItem key={idx} product={item} />
            ))}
            <div className="border-t mt-4 pt-4 flex justify-between items-center dark:border-gray-700">
              <span className="font-semibold text-gray-800 dark:text-gray-200">
                Total:
              </span>
              <span className="text-indigo-600 dark:text-indigo-400 font-bold">
                ${Number(totalPrice).toFixed(2)}
              </span>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <Button
                onClick={() => navigate("/cart")}
                className="dark:border-gray-600 dark:text-gray-300"
              >
                View Cart
              </Button>
              <Button type="primary" onClick={() => navigate("/checkout")}>
                Checkout
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-6">
            <div className="text-5xl text-gray-300 dark:text-gray-600 mb-4 flex justify-center">
              <ShoppingCartOutlined />
            </div>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Your cart is empty
            </p>
            <Button type="primary" onClick={() => navigate("/all-books")}>
              Browse Books
            </Button>
          </div>
        )}
      </div>
    </div>
  );

  // Mega menu content
  const categoriesMegaMenu = (
    <div className="w-full p-6 bg-white dark:bg-slate-800 shadow-xl rounded-b-lg">
      <div className="grid grid-cols-3 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4 text-indigo-800 dark:text-indigo-400 border-b border-indigo-100 dark:border-indigo-900 pb-2">
            Popular Genres
          </h3>
          <ul className="space-y-2">
            <li>
              <a
                href="/genre/fiction"
                className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                Fiction
              </a>
            </li>
            <li>
              <a
                href="/genre/non-fiction"
                className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                Non-Fiction
              </a>
            </li>
            <li>
              <a
                href="/genre/mystery"
                className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                Mystery & Thriller
              </a>
            </li>
            <li>
              <a
                href="/genre/scifi"
                className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                Science Fiction
              </a>
            </li>
            <li>
              <a
                href="/genre/fantasy"
                className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                Fantasy
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4 text-indigo-800 dark:text-indigo-400 border-b border-indigo-100 dark:border-indigo-900 pb-2">
            Special Collections
          </h3>
          <ul className="space-y-2">
            <li>
              <a
                href="/collections/bestsellers"
                className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                Bestsellers
              </a>
            </li>
            <li>
              <a
                href="/collections/award-winners"
                className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                Award Winners
              </a>
            </li>
            <li>
              <a
                href="/collections/new-releases"
                className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                New Releases
              </a>
            </li>
            <li>
              <a
                href="/collections/classics"
                className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                Classics
              </a>
            </li>
            <li>
              <a
                href="/collections/staff-picks"
                className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
              >
                Staff Picks
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4 text-indigo-800 dark:text-indigo-400 border-b border-indigo-100 dark:border-indigo-900 pb-2">
            Featured
          </h3>
          <div className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-lg">
            <img
              src="https://images-na.ssl-images-amazon.com/images/I/81YzHKeWq7L.jpg"
              alt="Featured Book"
              className="w-24 h-36 mx-auto mb-3 object-cover rounded shadow-md"
            />
            <p className="text-center text-indigo-700 dark:text-indigo-400 font-medium">
              Book of the Month
            </p>
            <Button
              type="primary"
              className="mt-2 w-full"
              onClick={() => navigate("/books/featured")}
            >
              Explore
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const navItems = [
    { key: "home", label: "Home", path: "/" },
    { key: "books", label: "All Books", path: "/all-books" },
    {
      key: "categories",
      label: (
        <Popover
          content={categoriesMegaMenu}
          trigger="hover"
          placement="bottom"
          overlayClassName="w-full max-w-4xl"
        >
          <span className="flex items-center">
            Categories <DownOutlined className="ml-1 text-xs" />
          </span>
        </Popover>
      ),
      path: "/categories",
    },
    { key: "bestsellers", label: "Bestsellers", path: "/bestsellers" },
    { key: "new-arrivals", label: "New Arrivals", path: "/new-arrivals" },
    { key: "blog", label: "Blog", path: "/blog" },
    { key: "about", label: "About", path: "/about" },
    { key: "contact", label: "Contact", path: "/contact" },
  ];

  return (
    <div className="sticky top-0 z-50 bg-white dark:bg-slate-900 shadow-md">
      {/* Main navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <BookOutlined className="text-2xl mr-2 text-indigo-600 dark:text-indigo-400" />
          <span
            className="text-2xl font-bold cursor-pointer text-gray-900 dark:text-white"
            onClick={() => navigate("/")}
          >
            Libr
            <span className="text-indigo-600 dark:text-indigo-400">ant</span>
          </span>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden lg:flex">
          <ul className="flex space-x-6">
            {navItems.map((item) => (
              <li key={item.key} className="relative group">
                {typeof item.label === "string" ? (
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      isActive
                        ? "text-indigo-600 dark:text-indigo-400 font-medium border-b-2 border-indigo-600 dark:border-indigo-400 pb-1"
                        : "text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium"
                    }
                  >
                    {item.label}
                  </NavLink>
                ) : (
                  item.label
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* User actions */}
        <div className="flex items-center gap-4">
          <button
            className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <SunOutlined className="text-xl" />
            ) : (
              <MoonOutlined className="text-xl" />
            )}
          </button>

          <button
            className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hidden md:block"
            onClick={() => navigate("/search")}
          >
            <SearchOutlined className="text-xl" />
          </button>

          <button className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hidden md:block">
            <HeartOutlined className="text-xl" />
          </button>

          <Popover
            content={cartContent}
            trigger="click"
            placement="bottomRight"
            overlayClassName="cart-popover"
          >
            <Badge count={items.length} offset={[-5, 5]} color="#4f46e5">
              <button className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
                <ShoppingCartOutlined className="text-xl" />
              </button>
            </Badge>
          </Popover>

          {user ? (
            <UserDropdown />
          ) : (
            <div className="hidden md:flex items-center gap-3">
              <Link to="/login">
                <Button
                  type="default"
                  className="border-indigo-600 text-indigo-600 hover:bg-indigo-50 dark:border-indigo-400 dark:text-indigo-400 dark:hover:bg-indigo-900/20"
                >
                  Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button
                  type="primary"
                  className="bg-indigo-600 hover:bg-indigo-700 border-0"
                >
                  Sign Up
                </Button>
              </Link>
            </div>
          )}

          <button
            className="text-gray-700 dark:text-gray-300 lg:hidden"
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
            <BookOutlined className="text-xl mr-2 text-indigo-600 dark:text-indigo-400" />
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
            <Menu mode="vertical" className="border-0 dark:bg-slate-900">
              {navItems.map((item) =>
                typeof item.label === "string" ? (
                  <Menu.Item
                    key={item.key}
                    onClick={() => {
                      navigate(item.path);
                      setMobileMenuOpen(false);
                    }}
                    className="dark:text-gray-300"
                  >
                    {item.label}
                  </Menu.Item>
                ) : (
                  <Menu.SubMenu
                    key={item.key}
                    title="Categories"
                    className="dark:text-gray-300"
                  >
                    <Menu.Item key="fiction" className="dark:text-gray-300">
                      Fiction
                    </Menu.Item>
                    <Menu.Item key="non-fiction" className="dark:text-gray-300">
                      Non-Fiction
                    </Menu.Item>
                    <Menu.Item key="mystery" className="dark:text-gray-300">
                      Mystery & Thriller
                    </Menu.Item>
                    <Menu.Item key="scifi" className="dark:text-gray-300">
                      Science Fiction
                    </Menu.Item>
                    <Menu.Item key="fantasy" className="dark:text-gray-300">
                      Fantasy
                    </Menu.Item>
                  </Menu.SubMenu>
                )
              )}
            </Menu>

            <div className="mt-6 space-y-4">
              <Button
                onClick={toggleTheme}
                icon={isDarkMode ? <SunOutlined /> : <MoonOutlined />}
                block
              >
                {isDarkMode ? "Light Mode" : "Dark Mode"}
              </Button>

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
                  className="mb-3"
                >
                  Sign In
                </Button>
              )}

              {!user && (
                <Button
                  type="primary"
                  onClick={() => {
                    navigate("/register");
                    setMobileMenuOpen(false);
                  }}
                  block
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 border-0"
                >
                  Sign Up
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
    <div className="flex items-center gap-3 py-3 border-b dark:border-gray-700">
      <img
        src={"/assets/img1.png"}
        alt={"Book cover"}
        className="w-12 h-16 object-cover rounded shadow-sm"
      />
      <div className="flex-grow min-w-0">
        <h4 className="text-sm font-medium text-gray-800 dark:text-white truncate">
          {product.title}
        </h4>
        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
          <span>Qty: {product.quantity}</span>
          <span className="mx-2">·</span>
          <span className="font-medium text-indigo-600 dark:text-indigo-400">
            ${product.totalPrice.toFixed(2)}
          </span>
        </div>
      </div>
      <button className="text-gray-400 hover:text-red-500 dark:hover:text-red-400">
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
