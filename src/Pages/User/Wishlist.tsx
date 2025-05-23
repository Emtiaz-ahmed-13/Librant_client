import { DeleteOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Card, Empty, message, Skeleton, Tooltip } from "antd";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { addToCart } from "../../Redux/Features/Orders/cartSlice";
import { useAddToCartMutation } from "../../Redux/Features/Orders/orderApi";
import { useAppDispatch, useAppSelector } from "../../Redux/hook";
import { IBook } from "../../Types/global";

// Framer motion animations
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState<IBook[]>([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const [addToCartMutation] = useAddToCartMutation();
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    // In a real app, you would fetch the wishlist items from the API
    // For this demo, we'll simulate loading and then populate with mock data
    const fetchWishlist = async () => {
      setLoading(true);
      try {
        // Mock API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock data - replace with actual API call
        setWishlistItems([
          {
            _id: "1",
            title: "The Great Gatsby",
            author: "F. Scott Fitzgerald",
            price: 12.99,
            image:
              "https://m.media-amazon.com/images/I/71FTb9X6wsL._AC_UF1000,1000_QL80_.jpg",
            quantity: 10,
          },
          {
            _id: "2",
            title: "To Kill a Mockingbird",
            author: "Harper Lee",
            price: 14.99,
            image:
              "https://m.media-amazon.com/images/I/81gepf1eMqL._AC_UF1000,1000_QL80_.jpg",
            quantity: 8,
          },
          {
            _id: "3",
            title: "1984",
            author: "George Orwell",
            price: 11.99,
            image:
              "https://m.media-amazon.com/images/I/71kxa1-0mfL._AC_UF1000,1000_QL80_.jpg",
            quantity: 5,
          },
        ]);
      } catch (error) {
        message.error("Failed to load wishlist");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const handleRemoveFromWishlist = (id: string) => {
    // In a real app, you would call an API to remove the item
    setWishlistItems((prev) => prev.filter((item) => item._id !== id));
    message.success("Removed from wishlist");
  };

  const handleAddToCart = async (book: IBook) => {
    if (!user) {
      message.info("Please sign in to add items to your cart");
      return;
    }

    try {
      const cartItem = {
        bookId: book._id,
        productId: book._id,
        quantity: 1,
        totalPrice: book.price,
        title: book.title,
        image: book.image,
      };

      if (user) {
        // If user is logged in, use the API
        await addToCartMutation({
          bookId: book._id,
          quantity: 1,
        }).unwrap();
      } else {
        // Otherwise, use local state
        dispatch(addToCart(cartItem));
      }

      message.success(`${book.title} added to cart`);
    } catch (error) {
      message.error("Failed to add to cart");
      console.error(error);
    }
  };

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            My Wishlist
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Books you've saved for later
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, index) => (
              <Card key={index} className="w-full h-full">
                <Skeleton.Image active className="w-full h-48" />
                <Skeleton active paragraph={{ rows: 2 }} />
              </Card>
            ))}
          </div>
        ) : wishlistItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-slate-800 rounded-lg p-8 text-center shadow-md"
          >
            <Empty
              description={
                <span className="text-gray-600 dark:text-gray-300">
                  Your wishlist is empty
                </span>
              }
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
            <Link to="/all-books">
              <Button type="primary" className="mt-4">
                Browse Books
              </Button>
            </Link>
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {wishlistItems.map((book) => (
              <motion.div key={book._id} variants={item}>
                <Card
                  hoverable
                  className="h-full transition-all duration-300 border border-gray-200 dark:bg-slate-800 dark:border-slate-700 overflow-hidden hover:border-indigo-400 dark:hover:border-indigo-400"
                  cover={
                    <div className="relative h-64">
                      <img
                        alt={book.title}
                        src={book.image}
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute top-0 right-0 p-2 flex flex-col gap-2">
                        <Tooltip title="Remove from wishlist">
                          <Button
                            danger
                            shape="circle"
                            icon={<DeleteOutlined />}
                            onClick={() => handleRemoveFromWishlist(book._id)}
                            className="shadow-md"
                          />
                        </Tooltip>
                        <Tooltip title="Add to cart">
                          <Button
                            type="primary"
                            shape="circle"
                            icon={<ShoppingCartOutlined />}
                            onClick={() => handleAddToCart(book)}
                            className="shadow-md"
                          />
                        </Tooltip>
                      </div>
                    </div>
                  }
                  bodyStyle={{ padding: "16px" }}
                >
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-1 line-clamp-1">
                    {book.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-2 text-sm">
                    {book.author}
                  </p>
                  <div className="flex justify-between items-center">
                    <p className="text-indigo-600 dark:text-indigo-400 font-bold">
                      ${book.price.toFixed(2)}
                    </p>
                    <Link to={`/books/${book._id}`}>
                      <Button size="small">View Details</Button>
                    </Link>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
