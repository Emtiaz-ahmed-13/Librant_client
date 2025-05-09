import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { orderApi } from "./orderApi";

export interface ICart {
  productId?: string;
  bookId?: string;
  quantity: number;
  totalPrice: number;
  title: string;
  image?: string;
  price?: number;
  _id?: string;
}

interface CartState {
  items: ICart[];
  orderedItems: ICart[];
  orderId: string | undefined;
  loading: boolean;
  error: string | null;
  totalAmount: number;
}

const initialState: CartState = {
  items: [],
  orderedItems: [],
  orderId: "",
  loading: false,
  error: null,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Local cart operations (when not using API)
    addToCart: (state, action: PayloadAction<ICart>) => {
      const existingProduct = state.items.find(
        (item) =>
          item.bookId === action.payload.bookId ||
          item.productId === action.payload.productId
      );
      if (existingProduct) {
        const index = state.items.findIndex(
          (current) =>
            current.bookId === existingProduct.bookId ||
            current.productId === existingProduct.productId
        );
        state.items[index].quantity += Number(action.payload.quantity);
        state.items[index].totalPrice += Number(action.payload.totalPrice);
      } else {
        state.items.push({
          ...action.payload,
          quantity: Number(action.payload.quantity),
          totalPrice: Number(action.payload.totalPrice),
        });
      }
      state.totalAmount = state.items.reduce(
        (total, item) => total + item.totalPrice,
        0
      );
    },
    updateCartItem: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(
        (item) => item.bookId === id || item.productId === id || item._id === id
      );

      if (item) {
        const unitPrice = item.totalPrice / item.quantity;
        item.quantity = quantity;
        item.totalPrice = unitPrice * quantity;
        state.totalAmount = state.items.reduce(
          (total, item) => total + item.totalPrice,
          0
        );
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) =>
          item.bookId !== action.payload &&
          item.productId !== action.payload &&
          item._id !== action.payload
      );
      state.totalAmount = state.items.reduce(
        (total, item) => total + item.totalPrice,
        0
      );
    },
    addToOrderedList: (state, action: PayloadAction<string>) => {
      state.orderedItems = [...state.items];
      state.orderId = action.payload;
    },
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Handle async operations using the API
    builder
      .addMatcher(
        orderApi.endpoints.getCart.matchFulfilled,
        (state, action) => {
          if (action.payload?.data) {
            state.items = action.payload.data.items || [];
            state.totalAmount = action.payload.data.totalAmount || 0;
          }
          state.loading = false;
          state.error = null;
        }
      )
      .addMatcher(orderApi.endpoints.getCart.matchPending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(orderApi.endpoints.getCart.matchRejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "Failed to fetch cart";
      })
      .addMatcher(
        orderApi.endpoints.addToCart.matchFulfilled,
        (state, action) => {
          if (action.payload?.data) {
            state.items = action.payload.data.items || [];
            state.totalAmount = action.payload.data.totalAmount || 0;
          }
          state.loading = false;
          state.error = null;
        }
      );
  },
});

export const getCart = (state: RootState) => state.cart;

export const {
  addToCart,
  clearCart,
  addToOrderedList,
  updateCartItem,
  removeFromCart,
  setError,
} = cartSlice.actions;

export default cartSlice.reducer;
