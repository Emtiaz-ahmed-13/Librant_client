import { DeleteOutlined, EditOutlined, StarOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Empty,
  Form,
  Input,
  message,
  Modal,
  Rate,
  Skeleton,
  Tabs,
  Tooltip,
} from "antd";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
  show: { opacity: 1, y: 0 },
};

interface Review {
  id: string;
  bookId: string;
  bookTitle: string;
  bookAuthor: string;
  bookImage: string;
  rating: number;
  comment: string;
  date: string;
}

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    // In a real app, you would fetch reviews from an API
    // This is mock data for demonstration
    const fetchReviews = async () => {
      setLoading(true);
      try {
        // Mock API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock data
        setReviews([
          {
            id: "1",
            bookId: "101",
            bookTitle: "The Great Gatsby",
            bookAuthor: "F. Scott Fitzgerald",
            bookImage:
              "https://m.media-amazon.com/images/I/71FTb9X6wsL._AC_UF1000,1000_QL80_.jpg",
            rating: 4,
            comment:
              "A classic tale of wealth, love and betrayal. The prose is beautiful and the characters are memorable.",
            date: "2023-05-15",
          },
          {
            id: "2",
            bookId: "102",
            bookTitle: "To Kill a Mockingbird",
            bookAuthor: "Harper Lee",
            bookImage:
              "https://m.media-amazon.com/images/I/81gepf1eMqL._AC_UF1000,1000_QL80_.jpg",
            rating: 5,
            comment:
              "A powerful story about racial injustice and moral growth. Scout's narrative voice is perfect.",
            date: "2023-06-20",
          },
          {
            id: "3",
            bookId: "103",
            bookTitle: "1984",
            bookAuthor: "George Orwell",
            bookImage:
              "https://m.media-amazon.com/images/I/71kxa1-0mfL._AC_UF1000,1000_QL80_.jpg",
            rating: 3,
            comment:
              "Dystopian masterpiece that remains relevant. The world-building is excellent, though I found some parts dragged a bit.",
            date: "2023-07-05",
          },
        ]);
      } catch (error) {
        message.error("Failed to load reviews");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const handleDeleteReview = (id: string) => {
    // In a real app, you would send a DELETE request to your API
    Modal.confirm({
      title: "Are you sure you want to delete this review?",
      content: "This action cannot be undone.",
      okText: "Yes, delete it",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => {
        setReviews((prev) => prev.filter((review) => review.id !== id));
        message.success("Review deleted successfully");
      },
    });
  };

  const handleEditReview = (review: Review) => {
    setSelectedReview(review);
    form.setFieldsValue({
      rating: review.rating,
      comment: review.comment,
    });
    setEditModalVisible(true);
  };

  const handleEditSubmit = (values: { rating: number; comment: string }) => {
    if (!selectedReview) return;

    // In a real app, you would send a PATCH/PUT request to your API
    setReviews((prev) =>
      prev.map((review) =>
        review.id === selectedReview.id
          ? { ...review, rating: values.rating, comment: values.comment }
          : review
      )
    );

    setEditModalVisible(false);
    setSelectedReview(null);
    form.resetFields();
    message.success("Review updated successfully");
  };

  const filteredReviews =
    activeTab === "all"
      ? reviews
      : activeTab === "high"
      ? reviews.filter((review) => review.rating >= 4)
      : reviews.filter((review) => review.rating < 4);

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            My Reviews
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Manage your book reviews and ratings
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            className="mb-8"
            items={[
              { key: "all", label: "All Reviews" },
              { key: "high", label: "High Ratings (4-5 stars)" },
              { key: "low", label: "Lower Ratings (1-3 stars)" },
            ]}
          />

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, index) => (
                <Card key={index} className="w-full">
                  <div className="flex gap-4">
                    <Skeleton.Image active className="w-20 h-28" />
                    <div className="flex-1">
                      <Skeleton active paragraph={{ rows: 2 }} />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : filteredReviews.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-slate-800 rounded-lg p-8 text-center shadow-md"
            >
              <Empty
                description={
                  <span className="text-gray-600 dark:text-gray-300">
                    {activeTab === "all"
                      ? "You haven't written any reviews yet"
                      : "No reviews match this filter"}
                  </span>
                }
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
              {activeTab === "all" && (
                <Link to="/all-books">
                  <Button type="primary" className="mt-4">
                    Browse Books to Review
                  </Button>
                </Link>
              )}
            </motion.div>
          ) : (
            <motion.div
              className="grid grid-cols-1 gap-6"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {filteredReviews.map((review) => (
                <motion.div key={review.id} variants={item}>
                  <Card
                    className="overflow-hidden dark:bg-slate-800 dark:border-slate-700"
                    hoverable
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      <Link
                        to={`/books/${review.bookId}`}
                        className="w-full md:w-32 flex-shrink-0"
                      >
                        <img
                          src={review.bookImage}
                          alt={review.bookTitle}
                          className="w-full md:w-32 h-40 object-cover rounded-md shadow-md"
                        />
                      </Link>
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2">
                          <div>
                            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-1">
                              {review.bookTitle}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                              by {review.bookAuthor}
                            </p>
                            <div className="flex items-center mb-2">
                              <Rate
                                disabled
                                value={review.rating}
                                className="text-amber-400 text-sm"
                              />
                              <span className="ml-2 text-gray-500 dark:text-gray-400 text-sm">
                                {new Date(review.date).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <div className="flex space-x-2 mt-2 md:mt-0">
                            <Tooltip title="Edit review">
                              <Button
                                icon={<EditOutlined />}
                                onClick={() => handleEditReview(review)}
                                size="small"
                              />
                            </Tooltip>
                            <Tooltip title="Delete review">
                              <Button
                                danger
                                icon={<DeleteOutlined />}
                                onClick={() => handleDeleteReview(review.id)}
                                size="small"
                              />
                            </Tooltip>
                          </div>
                        </div>
                        <p className="text-gray-700 dark:text-gray-200">
                          {review.comment}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>

      <Modal
        title="Edit Your Review"
        open={editModalVisible}
        onCancel={() => {
          setEditModalVisible(false);
          setSelectedReview(null);
          form.resetFields();
        }}
        footer={null}
      >
        {selectedReview && (
          <Form form={form} layout="vertical" onFinish={handleEditSubmit}>
            <div className="flex items-center gap-4 mb-4">
              <img
                src={selectedReview.bookImage}
                alt={selectedReview.bookTitle}
                className="w-16 h-24 object-cover rounded-md"
              />
              <div>
                <h3 className="font-medium">{selectedReview.bookTitle}</h3>
                <p className="text-sm text-gray-500">
                  {selectedReview.bookAuthor}
                </p>
              </div>
            </div>

            <Form.Item
              name="rating"
              label="Your Rating"
              rules={[{ required: true, message: "Please rate this book" }]}
            >
              <Rate character={<StarOutlined />} className="text-amber-400" />
            </Form.Item>

            <Form.Item
              name="comment"
              label="Your Review"
              rules={[{ required: true, message: "Please write your review" }]}
            >
              <TextArea
                rows={4}
                placeholder="Share your thoughts about this book..."
              />
            </Form.Item>

            <div className="flex justify-end gap-2">
              <Button onClick={() => setEditModalVisible(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                Save Changes
              </Button>
            </div>
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default Reviews;
