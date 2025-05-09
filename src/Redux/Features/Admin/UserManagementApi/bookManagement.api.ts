import { baseApi } from "../../../api/baseApi";

const bookManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBooks: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          Object.entries(args).forEach(([key, value]) => {
            if (Array.isArray(value)) {
              value.forEach((val) => params.append(key, val));
            } else {
              params.append(key, value as string);
            }
          });
        }
        return {
          url: `/books/get-all-books`,
          method: "GET",
          params,
        };
      },
      providesTags: ["Books"],
    }),

    getSingleBook: builder.query({
      query: (id) => ({
        url: `/books/get-book/${id}`,
        method: "GET",
      }),
      providesTags: (_, __, id) => [{ type: "Books", id }],
    }),

    publishBook: builder.mutation({
      query: (data) => ({
        url: "/books/create-new-book",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Books"],
    }),

    getNumberOfCategories: builder.query({
      query: () => ({
        url: "/books/category",
        method: "GET",
      }),
      providesTags: ["Categories"],
    }),

    getAuthors: builder.query({
      query: () => ({
        url: "/books/authors",
        method: "GET",
      }),
      providesTags: ["Books"],
    }),

    deleteABook: builder.mutation({
      query: (params) => ({
        url: `/books/delete-book/${params}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Books"],
    }),

    updateBookData: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/books/update-book/${id}`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: (_, __, { id }) => ["Books", { type: "Books", id }],
    }),

    // Updated endpoints to directly match backend API routes
    getFeaturedBooks: builder.query({
      query: () => ({
        url: `/books/featured`,
        method: "GET",
      }),
      providesTags: ["Books"],
    }),

    getNewArrivals: builder.query({
      query: () => ({
        url: `/books/new-arrivals`,
        method: "GET",
      }),
      providesTags: ["Books"],
    }),

    getBooksByCategory: builder.query({
      query: (category) => ({
        url: `/books/category/${category}`,
        method: "GET",
      }),
      providesTags: (_, __, category) => [
        "Books",
        { type: "Categories", id: category },
      ],
    }),

    searchBooks: builder.query({
      query: (searchTerm) => ({
        url: `/books/get-all-books`,
        method: "GET",
        params: { searchTerm },
      }),
      providesTags: ["Books"],
    }),
  }),
});

export const {
  useGetAllBooksQuery,
  useGetSingleBookQuery,
  usePublishBookMutation,
  useGetNumberOfCategoriesQuery,
  useGetAuthorsQuery,
  useDeleteABookMutation,
  useUpdateBookDataMutation,
  useGetFeaturedBooksQuery,
  useGetNewArrivalsQuery,
  useGetBooksByCategoryQuery,
  useSearchBooksQuery,
} = bookManagementApi;
