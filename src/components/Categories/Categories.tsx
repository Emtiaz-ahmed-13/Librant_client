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
    <div className="mb-16">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Browse by <span className="text-indigo-600">Category</span>
      </h2>

      <Row gutter={[16, 16]} justify="center">
        {isLoading ? (
          // Skeleton loader
          Array(6)
            .fill(null)
            .map((_, index) => (
              <Col xs={12} sm={8} md={6} lg={4} key={index}>
                <Card className="h-36 text-center">
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
          categories.map((category: CategoryItem) => (
            <Col xs={12} sm={8} md={6} lg={4} key={category._id}>
              <Link to={`/books/category/${category._id}`}>
                <Card
                  hoverable
                  className="h-36 text-center transition-all duration-300 border border-gray-200 hover:border-indigo-400 hover:shadow-md"
                >
                  <div className="text-4xl mb-2">
                    {category.icon || getCategoryIcon(category.name)}
                  </div>
                  <div className="font-medium text-gray-700">
                    {category.name}
                  </div>
                </Card>
              </Link>
            </Col>
          ))
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
