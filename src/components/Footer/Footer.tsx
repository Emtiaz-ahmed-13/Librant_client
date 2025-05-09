import {
  BookOutlined,
  EnvironmentOutlined,
  FacebookOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  MailOutlined,
  PhoneOutlined,
  SendOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import { Button, Input } from "antd";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-16">
          {/* Column 1 - About */}
          <div>
            <div className="flex items-center mb-6">
              <BookOutlined className="text-2xl mr-2 text-indigo-400" />
              <span className="text-2xl font-bold text-white">
                Libr<span className="text-indigo-400">ant</span>
              </span>
            </div>
            <p className="mb-6 text-gray-400">
              Librant is a premier online bookstore offering a vast collection
              of books across all genres. From bestsellers to rare finds, we
              have something for every reader.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-indigo-400 transition-colors"
              >
                <TwitterOutlined className="text-xl" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-indigo-400 transition-colors"
              >
                <FacebookOutlined className="text-xl" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-indigo-400 transition-colors"
              >
                <InstagramOutlined className="text-xl" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-indigo-400 transition-colors"
              >
                <LinkedinOutlined className="text-xl" />
              </a>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-indigo-400 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/all-books"
                  className="text-gray-400 hover:text-indigo-400 transition-colors"
                >
                  All Books
                </Link>
              </li>
              <li>
                <Link
                  to="/categories"
                  className="text-gray-400 hover:text-indigo-400 transition-colors"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-indigo-400 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-indigo-400 transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Customer Service */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">
              Customer Service
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/faq"
                  className="text-gray-400 hover:text-indigo-400 transition-colors"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  to="/shipping"
                  className="text-gray-400 hover:text-indigo-400 transition-colors"
                >
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/returns"
                  className="text-gray-400 hover:text-indigo-400 transition-colors"
                >
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-gray-400 hover:text-indigo-400 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-gray-400 hover:text-indigo-400 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 - Contact & Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">
              Stay Connected
            </h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center">
                <PhoneOutlined className="mr-3 text-indigo-400" />
                <span>+1 (234) 567-8900</span>
              </li>
              <li className="flex items-center">
                <MailOutlined className="mr-3 text-indigo-400" />
                <span>support@librant.com</span>
              </li>
              <li className="flex items-start">
                <EnvironmentOutlined className="mr-3 text-indigo-400 mt-1" />
                <span>
                  1203 Town Center Drive
                  <br />
                  Arlington, VA 22201
                </span>
              </li>
            </ul>

            <h4 className="text-white font-medium mb-3">
              Subscribe to our newsletter
            </h4>
            <div className="flex">
              <Input placeholder="Your email" className="rounded-r-none" />
              <Button
                type="primary"
                icon={<SendOutlined />}
                className="rounded-l-none bg-indigo-600 border-indigo-600"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-gray-950 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Librant. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-sm text-gray-500 hover:text-indigo-400">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-gray-500 hover:text-indigo-400">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-gray-500 hover:text-indigo-400">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
