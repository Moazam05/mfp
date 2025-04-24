import { createSlice } from "@reduxjs/toolkit";
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

// Calculate cart count and total directly
const calculateCartTotals = (cart, products) => {
  const count = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  const total = products.reduce((total, product) => {
    const quantity = cart[product.id] || 0;
    return total + quantity * product.price;
  }, 0);

  return { count, total };
};

// Initial state setup with cart totals pre-calculated
const getInitialState = () => {
  const cart = loadCartFromLocalStorage();
  const { count, total } = calculateCartTotals(cart, dummyProducts);

  return {
    products: dummyProducts,
    loading: false,
    error: null,
    cart,
    cartCount: count,
    cartTotal: total,
  };
};

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

      // Recalculate cart totals with new products
      const { count, total } = calculateCartTotals(state.cart, action.payload);
      state.cartCount = count;
      state.cartTotal = total;
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

      // Update cart count and total
      const { count, total } = calculateCartTotals(state.cart, state.products);
      state.cartCount = count;
      state.cartTotal = total;

      // Save to localStorage
      localStorage.setItem("cart", JSON.stringify(state.cart));

      // Also save cart state for cross-app communication
      localStorage.setItem(
        "cartState",
        JSON.stringify({
          count: state.cartCount,
          total: state.cartTotal,
          timestamp: Date.now(),
        })
      );

      // Dispatch a custom event for other apps
      try {
        window.dispatchEvent(
          new CustomEvent("cartStateUpdated", {
            detail: { count: state.cartCount, total: state.cartTotal },
          })
        );
      } catch (error) {
        console.error("Error dispatching cart event:", error);
      }
    },

    removeFromCart: (state, action) => {
      const productId = action.payload;
      if (state.cart[productId]) {
        const newCart = { ...state.cart };
        delete newCart[productId];
        state.cart = newCart;

        // Update cart count and total
        const { count, total } = calculateCartTotals(
          state.cart,
          state.products
        );
        state.cartCount = count;
        state.cartTotal = total;

        // Save to localStorage
        localStorage.setItem("cart", JSON.stringify(state.cart));
        localStorage.setItem(
          "cartState",
          JSON.stringify({
            count: state.cartCount,
            total: state.cartTotal,
            timestamp: Date.now(),
          })
        );

        // Dispatch a custom event for other apps
        try {
          window.dispatchEvent(
            new CustomEvent("cartStateUpdated", {
              detail: { count: state.cartCount, total: state.cartTotal },
            })
          );
        } catch (error) {
          console.error("Error dispatching cart event:", error);
        }
      }
    },

    incrementQuantity: (state, action) => {
      const productId = action.payload;
      const product = state.products.find((p) => p.id === productId);

      if (state.cart[productId] && product) {
        // Check if incrementing would exceed available quantity
        if (state.cart[productId] < product.availableQty) {
          state.cart[productId] += 1;

          // Update cart count and total
          const { count, total } = calculateCartTotals(
            state.cart,
            state.products
          );
          state.cartCount = count;
          state.cartTotal = total;

          // Save to localStorage
          localStorage.setItem("cart", JSON.stringify(state.cart));
          localStorage.setItem(
            "cartState",
            JSON.stringify({
              count: state.cartCount,
              total: state.cartTotal,
              timestamp: Date.now(),
            })
          );

          // Dispatch a custom event for other apps
          try {
            window.dispatchEvent(
              new CustomEvent("cartStateUpdated", {
                detail: { count: state.cartCount, total: state.cartTotal },
              })
            );
          } catch (error) {
            console.error("Error dispatching cart event:", error);
          }
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

        // Update cart count and total
        const { count, total } = calculateCartTotals(
          state.cart,
          state.products
        );
        state.cartCount = count;
        state.cartTotal = total;

        // Save to localStorage
        localStorage.setItem("cart", JSON.stringify(state.cart));
        localStorage.setItem(
          "cartState",
          JSON.stringify({
            count: state.cartCount,
            total: state.cartTotal,
            timestamp: Date.now(),
          })
        );

        // Dispatch a custom event for other apps
        try {
          window.dispatchEvent(
            new CustomEvent("cartStateUpdated", {
              detail: { count: state.cartCount, total: state.cartTotal },
            })
          );
        } catch (error) {
          console.error("Error dispatching cart event:", error);
        }
      }
    },

    clearCart: (state) => {
      state.cart = {};
      state.cartCount = 0;
      state.cartTotal = 0;

      // Clear from localStorage
      localStorage.removeItem("cart");
      localStorage.setItem(
        "cartState",
        JSON.stringify({
          count: 0,
          total: 0,
          timestamp: Date.now(),
        })
      );

      // Dispatch a custom event for other apps
      try {
        window.dispatchEvent(
          new CustomEvent("cartStateUpdated", {
            detail: { count: 0, total: 0 },
          })
        );
      } catch (error) {
        console.error("Error dispatching cart event:", error);
      }
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

// Simple selectors - no calculations needed anymore
export const selectProducts = (state) => state.products.products;
export const selectProductById = (state, productId) =>
  state.products.products.find((product) => product.id === productId);
export const selectCart = (state) => state.products.cart;
export const selectLoading = (state) => state.products.loading;
export const selectError = (state) => state.products.error;

// Direct selectors for cart totals - no calculations needed
export const selectCartItemsCount = (state) => state.products.cartCount;
export const selectCartTotal = (state) => state.products.cartTotal;

export default productsSlice.reducer;
