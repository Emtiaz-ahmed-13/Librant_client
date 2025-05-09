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
    <div className="w-[90%] mx-auto p-6">
      <h1 className="text-center text-3xl font-bold my-5">All Collection</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Filter Options */}
        <div className="col-span-1 bg-gray-50 rounded-lg p-5">
          <h3 className="text-2xl font-semibold mb-2">Filter</h3>
          <hr />
          <div className="my-3 space-y-3">
            <div className="space-y-2">
              <h4 className="text-lg font-semibold">Price Range</h4>
              <div className="flex flex-col gap-2 px-2">
                <Checkbox onChange={onChange} value={"range-0,20"}>
                  $0 - $20
                </Checkbox>
                <Checkbox onChange={onChange} value={"range-20,50"}>
                  $20 - $50
                </Checkbox>
                <Checkbox onChange={onChange} value={"range-50,100"}>
                  $50 - $100
                </Checkbox>
                <Checkbox onChange={onChange} value={"range-100,500"}>
                  $100+
                </Checkbox>
              </div>
            </div>
            <hr />

            <div className="flex flex-col gap-2">
              <h4 className="text-lg font-semibold">Availability</h4>
              <div className="flex flex-col gap-2 px-2">
                <Checkbox onChange={onChange} value={"inStock-" + true}>
                  In Stock
                </Checkbox>
                <Checkbox onChange={onChange} value={"inStock-" + false}>
                  Out of Stock
                </Checkbox>
              </div>
            </div>
            <hr />

            <div className="flex flex-col gap-2">
              <h4 className="text-lg font-semibold">Author</h4>
              <div className="flex flex-col gap-2 px-2">
                {authorsLoading ? (
                  <p>Loading authors...</p>
                ) : (
                  authors.map((author: { _id: string; count: number }) => (
                    <Checkbox
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
            <hr />

            <div className="flex flex-col gap-2">
              <h4 className="text-lg font-semibold">Category</h4>
              <div className="flex flex-col gap-2 px-2">
                {categoriesLoading ? (
                  <p>Loading categories...</p>
                ) : (
                  categories.map((category: { _id: string; count: number }) => (
                    <Checkbox
                      key={category._id}
                      onChange={onChange}
                      value={`category-${category._id}`}
                    >
                      {category._id} ({category.count})
                    </Checkbox>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Search And Sort */}
        <div className="col-span-1 md:col-span-3">
          <div className="h-14 w-full border border-gray-500/20 flex flex-col sm:flex-row justify-between items-center p-2 rounded-lg">
            <div className="mx-3 w-full sm:w-auto">
              <Search
                placeholder="Search Book e.g title"
                onSearch={(value) =>
                  setParams((prev) => ({ ...prev, searchTerm: value }))
                }
                style={{ width: "100%", maxWidth: "300px" }}
              />
            </div>
            <div className="flex justify-between items-center gap-3 mx-3 w-full sm:w-auto mt-2 sm:mt-0">
              <Select
                style={{ borderRadius: "5px", width: "120px" }}
                defaultValue="Sort-by"
                onChange={handleSort}
                options={[
                  { value: "h-t-l", label: "Price ↓" },
                  { value: "l-t-h", label: "Price ↑" },
                ]}
              />
              <span>{processedBooks.length} Books</span>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-4">
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </div>
          ) : error ? (
            <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200 my-4">
              <p className="text-red-500 mb-4">
                Failed to load books. The server might be busy or temporarily
                down.
              </p>
              <button
                onClick={() => refetch()}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Retry
              </button>
            </div>
          ) : processedBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-4">
              {processedBooks.map((book: IBook) => (
                <Card key={book._id} book={book} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200 my-4">
              <p className="text-gray-500">
                No books found matching your criteria.
              </p>
              <button
                onClick={() => setParams({})}
                className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllBooks;
