import { configureStore, createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
type PageType = {
  page: string;
  products: any[];
  lang: string;
};

type InitialStateType = {
  pages: PageType[];
  currentSelectedProducts: any;
  currentProductsList: any;
  reloadPage: boolean;
  reloadProducts: boolean;
  loadingProductTable: boolean;
  resetRowSelection: boolean;
};
interface SetKeyValueActionPayload {
  key:
    | "pages"
    | "currentSelectedProducts"
    | "currentProductsList"
    | "reloadPage"
    | "reloadProducts"
    | "allowButtonAction"
    | "loadingProductTable"
    | "resetRowSelection"
  value: any;
}
// Define a slice for the products
const productsSlice = createSlice({
  name: "pagesProducts",
  // { pages: [ { products: [] } ,page as number]
  initialState: {
    pages: [],
    currentSelectedProducts: {},
    currentProductsList: [],
    reloadPage: false,
    reloadProducts: false,
    allowButtonAction: true,
    loadingProductTable: false,resetRowSelection:false
  } as InitialStateType,
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
    setKeyValue: (state, action: PayloadAction<SetKeyValueActionPayload>) => {
      const { key, value } = action.payload;
      //@ts-ignore
      state[key] = value;
    },
  },
});

export const { setPageProducts, resetPagesProducts, setKeyValue } =
  productsSlice.actions;
export const productsSliceReducer = productsSlice.reducer;
