import { createSlice } from "@reduxjs/toolkit";
import { getProductList } from "src/utils/api";

export const initialState = {
  products: {},
  localProducts: {},
  meta_data: {},
};

const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts(state, action) {
      state.products = { ...state.products, ...action.payload };
    },
    setProductByCacheId(state, action) {
      state.products[action.payload._id] = action.payload;
    },
    setMetaData(state, action) {
      state.meta_data = action.payload;
    },
  },
});

const descendingComparator = (a, b, orderBy, listField) => {
  let field = orderBy.split(".")[0]; //1 biến chính là orderby
  let innerField = orderBy.split(".")[1];

  if (listField.includes(field)) {
    a = a[field];
    b = b[field];
    field = innerField;
  }

  //b O orderBy: doctor.name
  if (b[field] < a[field]) {
    return -1;
  }

  if (b[field] > a[field]) {
    return 1;
  }

  return 0;
};

const getComparator = (order, orderBy, listField) => {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy, listField)
    : (a, b) => -descendingComparator(a, b, orderBy, listField);
};

export const fetchProducts = (queries, setLoading) => async (dispatch, getState) => {
  setLoading(true);
  const productSlice = getState().products.products;

  const res = await getProductList(queries).then(({ data }) => data.listRoom);
  const products = {};
  for (const product of res.data) {
    if (!productSlice[product._id]) products[product._id] = product;
  }

  dispatch(ProductSlice.actions.setProducts(products));
  dispatch(
    ProductSlice.actions.setMetaData({
      total_page: res.meta_data.total_page,
      total_records: res.meta_data.total_records,
    })
  );
  setLoading(false);
};

export default ProductSlice;
