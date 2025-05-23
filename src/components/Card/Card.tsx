import {
  EyeOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Card as AntCard, Rate, Tooltip, message } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUser } from "../../Redux/Features/Auth/authSlice";
import { useAddToCartMutation } from "../../Redux/Features/Orders/orderApi";
import { useAppSelector } from "../../Redux/hook";
import { IBook } from "../../Types/global";

const Card = ({ book }: { book: IBook }) => {
  const { author, title, price, _id, image } = book;
  const [addToCart, { isLoading }] = useAddToCartMutation();
  const [isHovering, setIsHovering] = useState(false);
  const user = useAppSelector(getUser);
  const navigate = useNavigate();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to the book details page
    e.stopPropagation();

    if (!user) {
      message.info("Please sign in to add items to your cart");
      navigate("/login");
      return;
    }

    try {
      await addToCart({
        bookId: _id,
        quantity: 1,
      }).unwrap();
      message.success("Added to cart successfully");
    } catch (error) {
      message.error("Failed to add to cart");
      console.error(error);
    }
  };

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      message.info("Please sign in to add items to your wishlist");
      navigate("/login");
      return;
    }

    // wishlist functionality would be implemented here
    message.success("Added to wishlist");
  };

  // Default image if none provided
  const bookCover = image || "https://placehold.co/600x400?text=Book+Cover";

  return (
    <Link to={`/books/${_id}`} className="block">
      <AntCard
        hoverable
        className="h-full transition-all duration-300 border-0 overflow-hidden rounded-2xl shadow-md bg-white dark:bg-slate-800 group hover:shadow-xl hover:-translate-y-1 hover:bg-gradient-to-br hover:from-indigo-50 hover:to-purple-50 dark:hover:from-indigo-900/40 dark:hover:to-purple-900/40"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        cover={
          <div className="book-card-image relative">
            {/* Prominent New badge always visible for demo, can be conditional */}
            <div className="absolute top-3 left-3 z-10">
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg tracking-wide">
                NEW
              </span>
            </div>
            <img
              src={bookCover}
              alt={title}
              className="w-full h-64 object-cover rounded-t-2xl group-hover:scale-105 transition-transform duration-500 shadow-sm"
            />
            <div
              className={`absolute top-0 right-0 p-2 flex flex-col gap-2 transition-opacity duration-300 ${
                isHovering ? "opacity-100" : "opacity-0"
              }`}
            >
              <Tooltip title="Add to cart">
                <button
                  className="bg-indigo-600 text-white p-2 rounded-full shadow-md hover:bg-indigo-700 transition-colors border-2 border-white"
                  onClick={handleAddToCart}
                  disabled={isLoading}
                >
                  <ShoppingCartOutlined className="text-lg" />
                </button>
              </Tooltip>
              <Tooltip title="Add to wishlist">
                <button
                  className="bg-white text-indigo-600 p-2 rounded-full shadow-md hover:bg-indigo-100 transition-colors border-2 border-indigo-100"
                  onClick={handleAddToWishlist}
                >
                  <HeartOutlined className="text-lg" />
                </button>
              </Tooltip>
              <Tooltip title="Quick view">
                <Link
                  to={`/books/${_id}`}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white text-indigo-600 p-2 rounded-full shadow-md hover:bg-indigo-100 transition-colors border-2 border-indigo-100 block"
                >
                  <EyeOutlined className="text-lg" />
                </Link>
              </Tooltip>
            </div>
          </div>
        }
        bodyStyle={{ padding: "18px" }}
      >
        <div className="mb-2 flex items-center gap-2">
          <Rate disabled defaultValue={4} className="text-xs text-yellow-500" />
          <span className="text-xs text-gray-400">(120+)</span>
        </div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 line-clamp-1 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors">
          {title}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 mb-2 text-sm">
          {author}
        </p>
        <div className="flex justify-between items-center mt-2">
          <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
            ${price.toFixed(2)}
          </p>
          <button
            className="text-xs px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold shadow hover:from-indigo-700 hover:to-purple-700 transition-all duration-200"
            onClick={handleAddToCart}
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add to cart"}
          </button>
        </div>
      </AntCard>
    </Link>
  );
};

export default Card;
