import { FireOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Card, Col, Empty, Row, Skeleton, message } from "antd";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useGetFeaturedBooksQuery } from "../../../Redux/Features/Admin/UserManagementApi/bookManagement.api";
import { IBook } from "../../../Types/global";

const Bestsellers = () => {
  const {
    data: featuredBooks,
    isLoading,
    error,
  } = useGetFeaturedBooksQuery(undefined);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Bestsellers
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto mt-4 mb-8 rounded-full" />
        </div>
        <Row gutter={[24, 32]}>
          {[...Array(8)].map((_, index) => (
            <Col xs={24} sm={12} md={8} lg={6} key={index}>
              <Card
                hoverable
                className="h-full overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
              >
                <Skeleton.Image className="w-full h-52" active />
                <Skeleton active paragraph={{ rows: 3 }} />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          Bestsellers
        </h1>
        <div className="bg-red-50 dark:bg-red-900/20 p-8 rounded-xl max-w-xl mx-auto shadow-sm">
          <p className="text-red-600 dark:text-red-400 mb-4 text-lg">
            Sorry, we couldn't load the bestsellers at this time.
          </p>
          <Button
            type="primary"
            danger
            size="large"
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  const books = featuredBooks?.data || [];

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-500 px-4 py-1 rounded-full text-sm font-medium mb-4">
            <FireOutlined className="mr-2" />
            Top Rated
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Bestselling Books
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto mb-6 rounded-full" />
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover our most popular titles loved by readers around the world
          </p>
        </motion.div>

        {books.length === 0 ? (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={
              <span className="text-gray-500 dark:text-gray-400 text-lg">
                No bestsellers available at the moment
              </span>
            }
            className="my-16"
          />
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          >
            {books.map((book: IBook) => (
              <motion.div key={book._id} variants={item}>
                <Card
                  hoverable
                  className="h-full border-0 overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 dark:bg-slate-800 dark:hover:shadow-indigo-900/20"
                  cover={
                    <div className="relative h-72 overflow-hidden">
                      <div className="absolute top-3 left-3 z-10">
                        <div className="flex items-center bg-amber-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                          <FireOutlined className="mr-1" /> BESTSELLER
                        </div>
                      </div>
                      <img
                        alt={book.title}
                        src={
                          book.image ||
                          "https://via.placeholder.com/300x450?text=No+Image"
                        }
                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  }
                  bodyStyle={{ padding: "20px" }}
                >
                  <div className="mb-4">
                    <h3 className="font-bold text-xl text-gray-800 dark:text-white line-clamp-2 mb-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                      {book.title}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">
                      by {book.author}
                    </p>
                    <div className="flex items-center">
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <span key={i} className="text-amber-400 text-sm">
                            ★
                          </span>
                        ))}
                      <span className="text-gray-500 dark:text-gray-400 text-xs ml-2">
                        (120+ reviews)
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-6">
                    <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                      ${book.price?.toFixed(2)}
                    </p>
                    <div className="space-y-2">
                      <Link to={`/books/${book._id}`} className="block">
                        <Button type="default" block>
                          View Details
                        </Button>
                      </Link>
                      <Button
                        type="primary"
                        icon={<ShoppingCartOutlined />}
                        onClick={() =>
                          message.success(`${book.title} added to cart`)
                        }
                        block
                        className="bg-indigo-600 hover:bg-indigo-700"
                      >
                        Add to Cart
                      </Button>
                    </div>
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

export default Bestsellers;
