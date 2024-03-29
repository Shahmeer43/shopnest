import { createSlice, configureStore } from "@reduxjs/toolkit";

let productSlice = createSlice({
  name: "products",
  initialState: {
    data: { message: null, products: [] },
  },
  reducers: {
    save(state, action) {
      state.data = action.payload;
    },
  },
});

const store = configureStore({
  reducer: productSlice.reducer,
});

export const productAction = productSlice.actions;
export default store;
