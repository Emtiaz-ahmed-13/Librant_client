import { ArrowRightOutlined, ReloadOutlined } from "@ant-design/icons";
import { Button, Tabs } from "antd";
import { Link } from "react-router-dom";
import { useGetNewArrivalsQuery } from "../../Redux/Features/Admin/UserManagementApi/bookManagement.api";
import { IBook, IResponseBook } from "../../Types/global";
import Card from "../Card/Card";
import CardSkeleton from "../CardSkeleton/CardSkeleton";

const { TabPane } = Tabs;

// Fix for broken image URLs from backend
const fixImageUrl = (url: string | undefined) => {
  if (!url) return undefined;
  // Fix for incorrectly formatted ibb.co URLs
  if (url.includes("i.ibb.co.com")) {
    return url.replace("i.ibb.co.com", "i.ibb.co");
  }
  return url;
};

// Convert IResponseBook to IBook with fixed image URLs
const convertToBookWithFixedImages = (book: IResponseBook): IBook => {
  return {
    _id: book._id,
    title: book.title,
    author: book.author,
    price: book.price,
    quantity: book.quantity,
    category: book.category,
    inStock: book.inStock,
    description: book.description,
    image: fixImageUrl(book.image || book.imageUrl),
  };
};

const NewArrival = () => {
  const {
    data: newArrivalsResponse,
    isLoading,
    error,
    refetch,
  } = useGetNewArrivalsQuery(undefined);

  // Get the actual books data from the response
  const newArrivals = newArrivalsResponse?.data || [];

  // Function to filter books by category for the tabs
  const getBooksByCategory = (category: string) => {
    if (!newArrivals) return [];
    return newArrivals.filter(
      (book: IResponseBook) => book.category === category
    );
  };

  // Preprocess books to fix image URLs
  const processedBooks = newArrivals.map(convertToBookWithFixedImages);

  return (
    <div className="mb-16">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">
          New <span className="text-indigo-600">Arrivals</span>
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

      {error ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200 p-8 mb-8">
          <p className="text-red-500 mb-4">
            Failed to load books. The server might be busy or temporarily down.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button type="primary" icon={<ReloadOutlined />} onClick={refetch}>
              Retry
            </Button>
          </div>
        </div>
      ) : (
        <>
          <Tabs
            defaultActiveKey="all"
            centered
            className="mb-8 text-lg"
            tabBarStyle={{
              fontWeight: 500,
              marginBottom: 24,
            }}
          >
            <TabPane tab="All Books" key="all">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8">
                {isLoading ? (
                  <>
                    <CardSkeleton />
                    <CardSkeleton />
                    <CardSkeleton />
                    <CardSkeleton />
                    <CardSkeleton className="hidden md:block" />
                    <CardSkeleton className="hidden md:block" />
                    <CardSkeleton className="hidden lg:block" />
                    <CardSkeleton className="hidden lg:block" />
                  </>
                ) : processedBooks.length > 0 ? (
                  processedBooks.map((book: IBook) => (
                    <Card key={book._id} book={book} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-8">
                    <p className="text-gray-500">No books found.</p>
                  </div>
                )}
              </div>
            </TabPane>
            <TabPane tab="Fiction" key="fiction">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8">
                {isLoading ? (
                  <>
                    <CardSkeleton />
                    <CardSkeleton />
                    <CardSkeleton />
                    <CardSkeleton />
                  </>
                ) : getBooksByCategory("Fiction").length > 0 ? (
                  getBooksByCategory("Fiction").map((book: IResponseBook) => (
                    <Card
                      key={book._id}
                      book={convertToBookWithFixedImages(book)}
                    />
                  ))
                ) : (
                  <div className="col-span-full text-center py-8">
                    <p className="text-gray-500">No fiction books found.</p>
                  </div>
                )}
              </div>
            </TabPane>
            <TabPane tab="Science" key="science">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8">
                {isLoading ? (
                  <>
                    <CardSkeleton />
                    <CardSkeleton />
                    <CardSkeleton />
                    <CardSkeleton />
                  </>
                ) : getBooksByCategory("Science").length > 0 ? (
                  getBooksByCategory("Science").map((book: IResponseBook) => (
                    <Card
                      key={book._id}
                      book={convertToBookWithFixedImages(book)}
                    />
                  ))
                ) : (
                  <div className="col-span-full text-center py-8">
                    <p className="text-gray-500">No science books found.</p>
                  </div>
                )}
              </div>
            </TabPane>
            <TabPane tab="Self Development" key="selfdevelopment">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8">
                {isLoading ? (
                  <>
                    <CardSkeleton />
                    <CardSkeleton />
                    <CardSkeleton />
                    <CardSkeleton />
                  </>
                ) : getBooksByCategory("SelfDevelopment").length > 0 ? (
                  getBooksByCategory("SelfDevelopment").map(
                    (book: IResponseBook) => (
                      <Card
                        key={book._id}
                        book={convertToBookWithFixedImages(book)}
                      />
                    )
                  )
                ) : (
                  <div className="col-span-full text-center py-8">
                    <p className="text-gray-500">
                      No self development books found.
                    </p>
                  </div>
                )}
              </div>
            </TabPane>
            <TabPane tab="Poetry" key="poetry">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8">
                {isLoading ? (
                  <>
                    <CardSkeleton />
                    <CardSkeleton />
                    <CardSkeleton />
                    <CardSkeleton />
                  </>
                ) : getBooksByCategory("Poetry").length > 0 ? (
                  getBooksByCategory("Poetry").map((book: IResponseBook) => (
                    <Card
                      key={book._id}
                      book={convertToBookWithFixedImages(book)}
                    />
                  ))
                ) : (
                  <div className="col-span-full text-center py-8">
                    <p className="text-gray-500">No poetry books found.</p>
                  </div>
                )}
              </div>
            </TabPane>
          </Tabs>
        </>
      )}
    </div>
  );
};

export default NewArrival;
