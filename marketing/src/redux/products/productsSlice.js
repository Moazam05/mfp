import { createSlice, createSelector } from "@reduxjs/toolkit";
import { dummyProducts } from "../../constants/data";

// Load initial cart from localStorage if available
const loadCartFromLocalStorage = () => {
  try {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : {};
  } catch (error) {
    console.error("Error loading cart from localStorage:", error);
    return {};
  }
};

const getInitialState = () => ({
  // In a real app, you'd start with an empty array and fetch products from API
  products: dummyProducts,
  loading: false,
  error: null,
  cart: loadCartFromLocalStorage(),
});

const productsSlice = createSlice({
  name: "products",
  initialState: getInitialState(),
  reducers: {
    // Product loading actions (for when you fetch from API)
    fetchProductsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProductsSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
    fetchProductsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Cart actions
    addToCart: (state, action) => {
      const productId = action.payload;
      // If product already in cart, increment by 1, otherwise add with quantity 1
      state.cart[productId] = (state.cart[productId] || 0) + 1;
      // Save to localStorage
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    removeFromCart: (state, action) => {
      const productId = action.payload;
      if (state.cart[productId]) {
        const newCart = { ...state.cart };
        delete newCart[productId];
        state.cart = newCart;
        // Save to localStorage
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },

    incrementQuantity: (state, action) => {
      const productId = action.payload;
      const product = state.products.find((p) => p.id === productId);

      if (state.cart[productId] && product) {
        // Check if incrementing would exceed available quantity
        if (state.cart[productId] < product.availableQty) {
          state.cart[productId] += 1;
          // Save to localStorage
          localStorage.setItem("cart", JSON.stringify(state.cart));
        }
      }
    },

    decrementQuantity: (state, action) => {
      const productId = action.payload;

      if (state.cart[productId]) {
        if (state.cart[productId] > 1) {
          // If quantity > 1, just decrease by 1
          state.cart[productId] -= 1;
        } else {
          // If quantity = 1, remove item from cart
          const newCart = { ...state.cart };
          delete newCart[productId];
          state.cart = newCart;
        }
        // Save to localStorage
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },

    clearCart: (state) => {
      state.cart = {};
      localStorage.removeItem("cart");
    },
  },
});

// Export actions
export const {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = productsSlice.actions;

// Selectors
export const selectProducts = (state) => state.products.products;
export const selectProductById = (state, productId) =>
  state.products.products.find((product) => product.id === productId);
export const selectCart = (state) => state.products.cart;
export const selectLoading = (state) => state.products.loading;
export const selectError = (state) => state.products.error;

// Memoized selectors
export const selectCartItemsCount = createSelector([selectCart], (cart) =>
  Object.values(cart).reduce((sum, qty) => sum + qty, 0)
);

export const selectCartTotal = createSelector(
  [selectCart, selectProducts],
  (cart, products) => {
    return products.reduce((total, product) => {
      const quantity = cart[product.id] || 0;
      return total + quantity * product.price;
    }, 0);
  }
);

export default productsSlice.reducer;
