import { ReloadOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row, Skeleton } from "antd";
import { Link } from "react-router-dom";
import { useGetAllCategoriesQuery } from "../../Redux/Features/Categories/categoriesApi";

interface CategoryItem {
  _id: string;
  name: string;
  icon?: string;
}

// Map of category names to icons
const categoryIcons: Record<string, string> = {
  Fiction: "📚",
  Science: "🔬",
  SelfDevelopment: "🧠",
  Poetry: "📝",
  Religious: "🙏",
};

const Categories = () => {
  const {
    data: categoriesResponse,
    isLoading,
    error,
    refetch,
  } = useGetAllCategoriesQuery(undefined);

  // Format categories to expected structure
  const categories =
    categoriesResponse?.data?.map((name: string) => ({
      _id: name,
      name: name,
    })) || [];

  // Function to get the appropriate icon for a category
  const getCategoryIcon = (categoryName: string): string => {
    return categoryIcons[categoryName] || "📖"; // Default icon if not found
  };

  return (
    <div className="mb-16 py-16 px-2 bg-gradient-to-br from-white via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-indigo-950 dark:to-slate-900 rounded-3xl shadow-xl">
      <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4 text-center">
        Browse by{" "}
        <span className="text-indigo-600 dark:text-indigo-400">Category</span>
      </h2>
      <div className="w-32 h-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mb-10 rounded-full shadow-lg" />
      <Row gutter={[32, 32]} justify="center">
        {isLoading ? (
          // Skeleton loader
          Array(6)
            .fill(null)
            .map((_, index) => (
              <Col xs={24} sm={12} md={8} lg={6} key={index}>
                <Card className="h-44 flex items-center justify-center rounded-2xl shadow-md bg-white dark:bg-slate-800">
                  <Skeleton active paragraph={{ rows: 1 }} />
                </Card>
              </Col>
            ))
        ) : error ? (
          // Error state with retry options
          <Col span={24}>
            <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200 p-8">
              <p className="text-red-500 mb-4">
                Failed to load categories. The server might be busy or
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
        ) : categories?.length > 0 ? (
          // Categories from API
          <>
            {categories.map((category: CategoryItem) => (
              <Col xs={24} sm={12} md={8} lg={6} key={category._id}>
                <Link to={`/books/category/${category._id}`}>
                  <Card
                    hoverable
                    className="h-44 flex flex-col items-center justify-center transition-all duration-300 border border-indigo-100 dark:border-indigo-800 rounded-2xl shadow-lg bg-white dark:bg-slate-800 group hover:scale-105 hover:shadow-2xl hover:border-indigo-400 dark:hover:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
                  >
                    <div className="text-5xl mb-3 group-hover:scale-125 transition-transform duration-300">
                      {category.icon || getCategoryIcon(category.name)}
                    </div>
                    <div className="font-bold text-lg text-gray-800 dark:text-white group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors">
                      {category.name}
                    </div>
                  </Card>
                </Link>
              </Col>
            ))}
            {categories.length > 8 && (
              <Col span={24} className="text-center mt-8">
                <Button
                  type="primary"
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 border-0 px-8 py-3 rounded-xl text-lg font-bold shadow hover:from-indigo-700 hover:to-purple-700"
                >
                  View All Categories
                </Button>
              </Col>
            )}
          </>
        ) : (
          // No categories found
          <Col span={24}>
            <div className="text-center py-4">
              <p className="text-gray-500">No categories found.</p>
            </div>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default Categories;
