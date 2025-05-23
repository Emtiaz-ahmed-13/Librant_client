import { Checkbox, CheckboxProps, Select, message } from "antd";
import Search from "antd/es/input/Search";
import { useEffect, useState } from "react";
import {
  useGetAllBooksQuery,
  useGetAuthorsQuery,
  useGetNumberOfCategoriesQuery,
} from "../../../Redux/Features/Admin/UserManagementApi/bookManagement.api";
import { IBook, IResponseBook } from "../../../Types/global";
import Card from "../../../components/Card/Card";
import CardSkeleton from "../../../components/CardSkeleton/CardSkeleton";

interface IParams {
  [key: string]: string[] | undefined | string;
}

// Fix for broken image URLs from backend
const fixImageUrl = (url: string | undefined) => {
  if (!url) return undefined;
  // Fix for incorrectly formatted ibb.co URLs
  if (url.includes("i.ibb.co.com")) {
    return url.replace("i.ibb.co.com", "i.ibb.co");
  }
  return url;
};

// Convert IResponseBook to IBook with fixed images
const convertToBookWithFixedImages = (book: IResponseBook): IBook => {
  return {
    _id: book._id,
    title: book.title,
    author: book.author,
    price: book.price,
    quantity: book.quantity || 0,
    category: book.category,
    inStock: book.inStock,
    description: book.description,
    image: fixImageUrl(book.image || book.imageUrl),
  };
};

const AllBooks = () => {
  const [params, setParams] = useState<IParams>({});
  const { data: categoriesResponse, isLoading: categoriesLoading } =
    useGetNumberOfCategoriesQuery(undefined);
  const {
    data: booksResponse,
    refetch,
    isLoading: booksLoading,
    error,
  } = useGetAllBooksQuery(params);
  const { data: authorsResponse, isLoading: authorsLoading } =
    useGetAuthorsQuery(undefined);

  // Get actual data from responses
  const categories = categoriesResponse?.data || [];
  const books = booksResponse?.data?.data || []; // Note: API returns data.data
  const authors = authorsResponse?.data || [];

  // Convert to books with fixed images
  const processedBooks = books.map(convertToBookWithFixedImages);

  useEffect(() => {
    refetch();
  }, [params, refetch]);

  // Handle error if API fails
  useEffect(() => {
    if (error) {
      message.error("Failed to load books. Please try again.");
    }
  }, [error]);

  const onChange: CheckboxProps["onChange"] = (e) => {
    const [name, value] = e.target.value.split("-");

    if (name === "range") {
      if (e.target.checked) {
        const [min, max] = value.split(",");
        setParams((prev) => ({
          ...prev,
          minPrice: min,
          maxPrice: max,
        }));
      } else {
        const removeMinMax = { ...params };
        delete removeMinMax.minPrice;
        delete removeMinMax.maxPrice;
        setParams(removeMinMax);
      }
    }
    setParams((prev) => {
      const newParams: { [key: string]: string | string[] | undefined } = {
        ...prev,
      };

      if (e.target.checked && name !== "range") {
        newParams[name] = [...(newParams[name] || []), value];
      } else {
        if (name !== "range" && Array.isArray(newParams[name])) {
          newParams[name] = Array.from(newParams[name] || [])?.filter(
            (item: string) => item !== value
          );
          if (newParams[name]?.length === 0) {
            delete newParams[name];
          }
        } else if (name !== "range" && !Array.isArray(newParams[name])) {
          newParams[name] = [value];
        }
      }

      return { ...newParams };
    });
  };

  // Handle sorting
  const handleSort = (value: string) => {
    if (value === "h-t-l") {
      setParams((prev) => ({ ...prev, sortBy: "price", sortOrder: "desc" }));
    } else if (value === "l-t-h") {
      setParams((prev) => ({ ...prev, sortBy: "price", sortOrder: "asc" }));
    }
  };

  const isLoading = booksLoading || categoriesLoading || authorsLoading;

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-white dark:from-indigo-950 dark:via-purple-950 dark:to-slate-900 py-12 px-2">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-center text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
          All{" "}
          <span className="text-indigo-600 dark:text-indigo-400">Books</span>
        </h1>
        <div className="w-32 h-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mb-10 rounded-full shadow-lg" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Filter Options */}
          <div className="col-span-1">
            <div className="bg-gradient-to-br from-indigo-100 via-purple-100 to-white dark:from-indigo-900 dark:via-purple-900 dark:to-slate-800 rounded-2xl shadow-xl p-6 border border-indigo-100 dark:border-indigo-900 sticky top-28 z-20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-indigo-700 dark:text-indigo-300 flex items-center gap-2">
                  <span>🔎</span> Filter
                </h3>
                <button
                  onClick={() => setParams({})}
                  className="px-3 py-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-semibold shadow hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 text-xs"
                >
                  Clear All
                </button>
              </div>
              <div className="space-y-6">
                {/* Price Range */}
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-4 border border-indigo-50 dark:border-indigo-900">
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2 mb-3">
                    <span>💰</span> Price Range
                  </h4>
                  <div className="flex flex-col gap-2">
                    <Checkbox
                      className="rounded-full px-3 py-2 text-gray-800 dark:text-gray-100"
                      onChange={onChange}
                      value={"range-0,20"}
                    >
                      $0 - $20
                    </Checkbox>
                    <Checkbox
                      className="rounded-full px-3 py-2 text-gray-800 dark:text-gray-100"
                      onChange={onChange}
                      value={"range-20,50"}
                    >
                      $20 - $50
                    </Checkbox>
                    <Checkbox
                      className="rounded-full px-3 py-2 text-gray-800 dark:text-gray-100"
                      onChange={onChange}
                      value={"range-50,100"}
                    >
                      $50 - $100
                    </Checkbox>
                    <Checkbox
                      className="rounded-full px-3 py-2 text-gray-800 dark:text-gray-100"
                      onChange={onChange}
                      value={"range-100,500"}
                    >
                      $100+
                    </Checkbox>
                  </div>
                </div>
                {/* Availability */}
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-4 border border-indigo-50 dark:border-indigo-900">
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2 mb-3">
                    <span>📦</span> Availability
                  </h4>
                  <div className="flex flex-col gap-2">
                    <Checkbox
                      className="rounded-full px-3 py-2 text-gray-800 dark:text-gray-100"
                      onChange={onChange}
                      value={"inStock-" + true}
                    >
                      In Stock
                    </Checkbox>
                    <Checkbox
                      className="rounded-full px-3 py-2 text-gray-800 dark:text-gray-100"
                      onChange={onChange}
                      value={"inStock-" + false}
                    >
                      Out of Stock
                    </Checkbox>
                  </div>
                </div>
                {/* Author */}
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-4 border border-indigo-50 dark:border-indigo-900">
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2 mb-3">
                    <span>🖊️</span> Author
                  </h4>
                  <div className="flex flex-col gap-2 max-h-40 overflow-y-auto pr-2">
                    {authorsLoading ? (
                      <p className="text-gray-800 dark:text-gray-100">
                        Loading authors...
                      </p>
                    ) : (
                      authors.map((author: { _id: string; count: number }) => (
                        <Checkbox
                          className="rounded-full px-3 py-2 text-gray-800 dark:text-gray-100"
                          key={author._id}
                          onChange={onChange}
                          value={"author-" + author._id}
                        >
                          {author._id} ({author.count})
                        </Checkbox>
                      ))
                    )}
                  </div>
                </div>
                {/* Category */}
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-4 border border-indigo-50 dark:border-indigo-900">
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2 mb-3">
                    <span>🏷️</span> Category
                  </h4>
                  <div className="flex flex-col gap-2 max-h-40 overflow-y-auto pr-2">
                    {categoriesLoading ? (
                      <p className="text-gray-800 dark:text-gray-100">
                        Loading categories...
                      </p>
                    ) : (
                      categories.map(
                        (category: { _id: string; count: number }) => (
                          <Checkbox
                            className="rounded-full px-3 py-2 text-gray-800 dark:text-gray-100"
                            key={category._id}
                            onChange={onChange}
                            value={`category-${category._id}`}
                          >
                            {category._id} ({category.count})
                          </Checkbox>
                        )
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Search And Sort */}
          <div className="col-span-1 md:col-span-3">
            <div className="h-16 w-full bg-white dark:bg-slate-800 border border-indigo-100 dark:border-indigo-900 flex flex-col sm:flex-row justify-between items-center p-4 rounded-2xl shadow mb-6">
              <div className="mx-3 w-full sm:w-auto">
                <Search
                  placeholder="Search Book e.g title"
                  onSearch={(value) =>
                    setParams((prev) => ({ ...prev, searchTerm: value }))
                  }
                  style={{ width: "100%", maxWidth: "300px" }}
                  className="rounded-lg"
                />
              </div>
              <div className="flex justify-between items-center gap-3 mx-3 w-full sm:w-auto mt-2 sm:mt-0">
                <Select
                  style={{ borderRadius: "8px", width: "140px" }}
                  defaultValue="Sort-by"
                  onChange={handleSort}
                  options={[
                    { value: "h-t-l", label: "Price ↓" },
                    { value: "l-t-h", label: "Price ↑" },
                  ]}
                  className="bg-white dark:bg-slate-800 border border-indigo-100 dark:border-indigo-900"
                />
                <span className="text-gray-700 dark:text-gray-200 font-semibold">
                  {processedBooks.length} Books
                </span>
              </div>
            </div>
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 my-4">
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
              </div>
            ) : error ? (
              <div className="text-center py-8 bg-gray-50 dark:bg-slate-800 rounded-2xl border border-indigo-100 dark:border-indigo-900 my-4 shadow">
                <p className="text-red-500 mb-4">
                  Failed to load books. The server might be busy or temporarily
                  down.
                </p>
                <button
                  onClick={() => refetch()}
                  className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold shadow hover:from-indigo-700 hover:to-purple-700 transition-all duration-200"
                >
                  Retry
                </button>
              </div>
            ) : processedBooks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 my-4">
                {processedBooks.map((book: IBook) => (
                  <Card key={book._id} book={book} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 dark:bg-slate-800 rounded-2xl border border-indigo-100 dark:border-indigo-900 my-4 shadow">
                <p className="text-gray-500 dark:text-gray-300">
                  No books found matching your criteria.
                </p>
                <button
                  onClick={() => setParams({})}
                  className="mt-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold shadow hover:from-indigo-700 hover:to-purple-700 transition-all duration-200"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllBooks;
