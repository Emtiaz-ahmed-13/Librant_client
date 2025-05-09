import { baseApi } from "../../api/baseApi";

const categoriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: () => ({
        url: "/books/categories",
        method: "GET",
      }),
      providesTags: ["Categories"],
    }),

    getSingleCategory: builder.query({
      query: (id) => ({
        url: `/books/category/${id}`,
        method: "GET",
      }),
      providesTags: (_, __, id) => [{ type: "Categories", id }],
    }),

    createCategory: builder.mutation({
      query: (data) => ({
        url: "/books/category",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Categories"],
    }),

    updateCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/books/category/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (_, __, { id }) => [
        "Categories",
        { type: "Categories", id },
      ],
    }),

    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/books/category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Categories"],
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useGetSingleCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApi;
