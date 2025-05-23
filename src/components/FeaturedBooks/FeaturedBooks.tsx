import { Button, Card, Col, Rate, Row } from "antd";
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
    <div className="mb-16 py-12 px-2 bg-gradient-to-br from-white via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-indigo-950 dark:to-slate-900 rounded-3xl shadow-xl">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <span className="inline-block bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1.5 rounded-full shadow">
            ⭐ EDITOR'S CHOICE
          </span>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white ml-2">
            Featured{" "}
            <span className="text-indigo-600 dark:text-indigo-400">Books</span>
          </h2>
        </div>
        <Link to="/all-books">
          <Button
            type="primary"
            className="bg-gradient-to-r from-indigo-600 to-purple-600 border-0 px-8 py-3 rounded-xl text-lg font-bold shadow hover:from-indigo-700 hover:to-purple-700"
          >
            View All
          </Button>
        </Link>
      </div>
      <Row gutter={[32, 32]}>
        {isLoading ? (
          Array(4)
            .fill(null)
            .map((_, index) => (
              <Col xs={24} sm={12} md={12} lg={6} key={index}>
                <Card className="h-96 overflow-hidden rounded-2xl shadow-md bg-white dark:bg-slate-800" />
              </Col>
            ))
        ) : error ? (
          <Col span={24}>
            <div className="text-center py-8 bg-gray-50 dark:bg-slate-800 rounded-2xl border border-indigo-100 dark:border-indigo-900 p-8">
              <p className="text-red-500 mb-4">
                Failed to load featured books. The server might be busy or
                temporarily down.
              </p>
              <Button
                type="primary"
                onClick={refetch}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 border-0 font-bold"
              >
                Retry
              </Button>
            </div>
          </Col>
        ) : featuredBooks?.length > 0 ? (
          featuredBooks.map((book: IResponseBook) => (
            <Col xs={24} sm={12} md={12} lg={6} key={book._id}>
              <Link to={`/books/${book._id}`}>
                <Card
                  hoverable
                  className="h-96 overflow-hidden rounded-2xl shadow-lg bg-white dark:bg-slate-800 transition-all duration-300 border border-indigo-100 dark:border-indigo-800 hover:scale-105 hover:shadow-2xl hover:border-indigo-400 dark:hover:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
                  cover={
                    <div className="h-48 overflow-hidden rounded-t-2xl">
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
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 line-clamp-1">
                    {book.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    {book.author}
                  </p>
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
                  <p className="text-indigo-600 dark:text-indigo-400 font-bold">
                    ${book.price.toFixed(2)}
                  </p>
                </Card>
              </Link>
            </Col>
          ))
        ) : (
          <Col span={24}>
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-300">
                No featured books found.
              </p>
            </div>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default FeaturedBooks;
