import {
  EyeOutlined,
  HeartOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Card as AntCard, Badge, Rate, Tooltip, message } from "antd";
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
        className="h-full transition-all duration-300 border border-gray-200 overflow-hidden hover:border-indigo-400"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        cover={
          <div className="book-card-image relative">
            <Badge.Ribbon
              text="New"
              color="#4f46e5"
              className="opacity-90"
              style={{ display: Math.random() > 0.7 ? "block" : "none" }}
            >
              <img
                src={bookCover}
                alt={title}
                className="w-full h-64 object-cover"
              />
            </Badge.Ribbon>
            <div
              className={`absolute top-0 right-0 p-2 flex flex-col gap-2 transition-opacity duration-300 ${
                isHovering ? "opacity-100" : "opacity-0"
              }`}
            >
              <Tooltip title="Add to cart">
                <button
                  className="bg-white text-indigo-600 p-2 rounded-full shadow-md hover:bg-indigo-100 transition-colors"
                  onClick={handleAddToCart}
                  disabled={isLoading}
                >
                  <ShoppingCartOutlined className="text-lg" />
                </button>
              </Tooltip>
              <Tooltip title="Add to wishlist">
                <button
                  className="bg-white text-indigo-600 p-2 rounded-full shadow-md hover:bg-indigo-100 transition-colors"
                  onClick={handleAddToWishlist}
                >
                  <HeartOutlined className="text-lg" />
                </button>
              </Tooltip>
              <Tooltip title="Quick view">
                <Link
                  to={`/books/${_id}`}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white text-indigo-600 p-2 rounded-full shadow-md hover:bg-indigo-100 transition-colors block"
                >
                  <EyeOutlined className="text-lg" />
                </Link>
              </Tooltip>
            </div>
          </div>
        }
        bodyStyle={{ padding: "16px" }}
      >
        <div className="mb-2">
          <Rate disabled defaultValue={4} className="text-xs text-yellow-500" />
        </div>
        <h3 className="text-lg font-bold text-gray-800 mb-1 line-clamp-1">
          {title}
        </h3>
        <p className="text-gray-600 mb-2 text-sm">{author}</p>
        <div className="flex justify-between items-center">
          <p className="text-indigo-600 font-bold">${price.toFixed(2)}</p>
          <button
            className="text-xs px-2 py-1 bg-indigo-50 text-indigo-600 rounded hover:bg-indigo-100 transition-colors"
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
