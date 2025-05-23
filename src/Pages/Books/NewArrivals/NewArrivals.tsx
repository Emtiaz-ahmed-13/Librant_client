import { RocketOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Card, Col, Empty, Row, Skeleton, Tag, message } from "antd";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useGetNewArrivalsQuery } from "../../../Redux/Features/Admin/UserManagementApi/bookManagement.api";
import { IBook } from "../../../Types/global";

const NewArrivals = () => {
  const {
    data: newArrivalsData,
    isLoading,
    error,
  } = useGetNewArrivalsQuery(undefined);

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
            New Arrivals
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
          New Arrivals
        </h1>
        <div className="bg-red-50 dark:bg-red-900/20 p-8 rounded-xl max-w-xl mx-auto shadow-sm">
          <p className="text-red-600 dark:text-red-400 mb-4 text-lg">
            Sorry, we couldn't load the new arrivals at this time.
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

  const books = newArrivalsData?.data || [];

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 px-4 py-1 rounded-full text-sm font-medium mb-4">
            <RocketOutlined className="mr-2" />
            Just Landed
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Fresh Off The Press
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto mb-6 rounded-full" />
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover the latest additions to our carefully curated collection
          </p>
        </motion.div>

        {books.length === 0 ? (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={
              <span className="text-gray-500 dark:text-gray-400 text-lg">
                No new arrivals available at the moment
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
                <div className="group relative">
                  <Card
                    hoverable
                    className="h-full border-0 overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 dark:bg-slate-800 dark:hover:shadow-blue-900/20"
                    cover={
                      <div className="relative h-72 overflow-hidden">
                        <div className="absolute top-3 left-3 z-10">
                          <div className="flex items-center bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                            <RocketOutlined className="mr-1" /> NEW ARRIVAL
                          </div>
                        </div>
                        <div className="absolute top-3 right-3 z-10">
                          <Tag
                            color="green"
                            className="px-2 py-1 rounded-full border-0"
                          >
                            In Stock
                          </Tag>
                        </div>
                        <img
                          alt={book.title}
                          src={
                            book.image ||
                            "https://via.placeholder.com/300x450?text=No+Image"
                          }
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    }
                    bodyStyle={{ padding: "20px" }}
                  >
                    <div className="mb-4">
                      <h3 className="font-bold text-xl text-gray-800 dark:text-white line-clamp-2 mb-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        {book.title}
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">
                        by {book.author}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded text-xs font-medium text-blue-700 dark:text-blue-300">
                          New Release
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Added: {new Date().toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-6">
                      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
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
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        <div className="mt-16 text-center">
          <Link to="/all-books">
            <Button
              type="primary"
              size="large"
              className="px-8 py-6 h-auto text-base bg-gradient-to-r from-indigo-600 to-blue-500 border-0 shadow-md hover:shadow-lg"
            >
              Browse All Books
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewArrivals;
