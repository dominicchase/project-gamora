import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: { cart: [] },
  reducers: {
    setCart(state, action) {
      state.cart = action.payload;
    },
    removeGameFromCart(state, action) {
      const filteredCart = state.cart.filter(
        (gameCart) => gameCart.game._id !== action.payload
      );

      state.cart = filteredCart;
    },
  },
});

export const { removeGameFromCart, setCart } = cartSlice.actions;
