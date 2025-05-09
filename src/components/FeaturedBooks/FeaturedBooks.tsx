import { ArrowRightOutlined, ReloadOutlined } from "@ant-design/icons";
import { Button, Card, Col, Rate, Row, Skeleton } from "antd";
import { Link } from "react-router-dom";
import { useGetFeaturedBooksQuery } from "../../Redux/Features/Admin/UserManagementApi/bookManagement.api";
import { IResponseBook } from "../../Types/global";

// Fix for broken image URLs from backend
const fixImageUrl = (url: string | undefined) => {
  if (!url) return undefined;
  // Fix for incorrectly formatted ibb.co URLs
  if (url.includes("i.ibb.co.com")) {
    return url.replace("i.ibb.co.com", "i.ibb.co");
  }
  return url;
};

const FeaturedBooks = () => {
  const {
    data: featuredBooksResponse,
    isLoading,
    error,
    refetch,
  } = useGetFeaturedBooksQuery(undefined);

  // Get the actual books data from the response
  const featuredBooks = featuredBooksResponse?.data || [];

  return (
    <div className="mb-16">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">
          Featured <span className="text-indigo-600">Books</span>
        </h2>
        <Link to="/all-books">
          <Button
            type="link"
            className="text-indigo-600 font-medium flex items-center hover:text-indigo-800"
          >
            View All <ArrowRightOutlined className="ml-1" />
          </Button>
        </Link>
      </div>

      <Row gutter={[24, 24]}>
        {isLoading ? (
          // Skeleton loader
          Array(4)
            .fill(null)
            .map((_, index) => (
              <Col xs={24} sm={12} md={12} lg={6} key={index}>
                <Card className="h-96 overflow-hidden">
                  <Skeleton.Image className="w-full h-48" active />
                  <Skeleton active paragraph={{ rows: 3 }} />
                </Card>
              </Col>
            ))
        ) : error ? (
          // Error state with retry option
          <Col span={24}>
            <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200 p-8">
              <p className="text-red-500 mb-4">
                Failed to load featured books. The server might be busy or
                temporarily down.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button
                  type="primary"
                  icon={<ReloadOutlined />}
                  onClick={refetch}
                >
                  Retry
                </Button>
              </div>
            </div>
          </Col>
        ) : featuredBooks?.length > 0 ? (
          // Actual books from API
          featuredBooks.map((book: IResponseBook) => (
            <Col xs={24} sm={12} md={12} lg={6} key={book._id}>
              <Link to={`/books/${book._id}`}>
                <Card
                  hoverable
                  className="h-96 overflow-hidden transition-all duration-300 border border-gray-200 hover:border-indigo-400 hover:shadow-lg"
                  cover={
                    <div className="h-48 overflow-hidden">
                      <img
                        alt={book.title}
                        src={
                          fixImageUrl(book.image) ||
                          fixImageUrl(book.imageUrl) ||
                          "https://placehold.co/600x400?text=Book+Cover"
                        }
                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  }
                >
                  <h3 className="text-lg font-bold text-gray-800 mb-1 line-clamp-1">
                    {book.title}
                  </h3>
                  <p className="text-gray-600 mb-2">{book.author}</p>
                  <div className="flex items-center mb-2">
                    <Rate
                      disabled
                      defaultValue={book.rating || 4}
                      className="text-sm text-yellow-500"
                    />
                    <span className="ml-1 text-sm text-gray-500">
                      ({book.rating || 4})
                    </span>
                  </div>
                  <p className="text-indigo-600 font-bold">
                    ${book.price.toFixed(2)}
                  </p>
                </Card>
              </Link>
            </Col>
          ))
        ) : (
          // No books found
          <Col span={24}>
            <div className="text-center py-8">
              <p className="text-gray-500">No featured books found.</p>
            </div>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default FeaturedBooks;
