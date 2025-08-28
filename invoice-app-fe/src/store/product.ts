import { createSlice } from "@reduxjs/toolkit";
import { ProductCatalogItem, PRODUCT_CATALOG } from "../api/product"

interface ProductState {
  list: ProductCatalogItem[];
}

const initialState: ProductState = {
  list: PRODUCT_CATALOG,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
});

export default productSlice.reducer;
