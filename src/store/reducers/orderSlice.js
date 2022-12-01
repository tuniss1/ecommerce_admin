import { createSlice } from "@reduxjs/toolkit";
import { getOrders } from "src/utils/api";

export const initialState = {
  orders: {},
  localOrders: {},
  meta_data: {},
};

const OrderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrders(state, action) {
      state.orders = { ...state.orders, ...action.payload };
    },
    setOrderByCacheId(state, action) {
      state.orders[action.payload._id] = action.payload;
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

export const fetchOrders = (queries, setLoading) => async (dispatch, getState) => {
  setLoading(true);
  const orderSlice = getState().orders.orders;

  const res = await getOrders(queries).then(({ data }) => data.listRoom);
  const orders = {};
  for (const order of res.data) {
    if (!orderSlice[order._id]) orders[order._id] = order;
  }

  dispatch(OrderSlice.actions.setOrders(orders));
  dispatch(
    OrderSlice.actions.setMetaData({
      total_page: res.meta_data.total_page,
      total_records: res.meta_data.total_records,
    })
  );
  setLoading(false);
};

export const setOrderByCacheId = (order) => async (dispatch, getState) => {
  dispatch(OrderSlice.actions.setOrderByCacheId(order));
};

export default OrderSlice;
