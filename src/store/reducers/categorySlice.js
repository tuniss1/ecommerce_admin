import { createSlice } from "@reduxjs/toolkit";
import { getCategoryList } from "src/utils/api";

export const initialState = {
  categories: {},
  localCategories: {},
  meta_data: {},
};

const CategorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategories(state, action) {
      state.categories = { ...state.categories, ...action.payload };
    },
    setCategoryByCacheId(state, action) {
      state.categories[action.payload._id] = action.payload;
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

export const fetchCategories = (queries, setLoading) => async (dispatch, getState) => {
  setLoading(true);
  const categorySlice = getState().categories.categories;

  const res = await getCategoryList(queries).then(({ data }) => data.listRoom);
  const categories = {};
  for (const category of res.data) {
    if (!categorySlice[category._id]) categories[category._id] = category;
  }

  dispatch(CategorySlice.actions.setCategories(categories));
  dispatch(
    CategorySlice.actions.setMetaData({
      total_page: res.meta_data.total_page,
      total_records: res.meta_data.total_records,
    })
  );
  setLoading(false);
};

export default CategorySlice;
