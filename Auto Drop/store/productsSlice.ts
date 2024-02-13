import { configureStore, createSlice } from "@reduxjs/toolkit";

// Define a slice for the products
const productsSlice = createSlice({
  name: "pagesProducts",
  // { pages: [ { products: [] } ,page as number]
  initialState: {
    pages: [] as { page: string; products: any[]; lang: string }[],
  },
  reducers: {
    setPageProducts: (state, action) => {
      const { products, page, lang } = action.payload;

      const pageExists = state.pages.find((p) => {
        return p.page === page && p.lang === lang;
      });
      const pageIndex = state.pages.findIndex(
        (p) => p.page === page && p.lang === lang
      );
      if (pageExists) {
        state.pages[pageIndex].products = products;
        state.pages[pageIndex].lang = lang;
        return;
      }
      state.pages.push({ products, page, lang });
    },
    resetPagesProducts: (state) => {
      state.pages = [];
    },
  },
});

export const { setPageProducts, resetPagesProducts } = productsSlice.actions;
export const productsSliceReducer = productsSlice.reducer;
