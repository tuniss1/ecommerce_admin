import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_HOST_API;

export const signIn = async (values) => {
  return await axios
    .post(`${baseUrl}/api/user/login`, values)
    .then((res) => {
      return res.data;
    })
    .catch((e) => console.log(e));
};

export const signUp = async (values) => {
  return await axios
    .post(`${baseUrl}/api/user/createUser`, values)
    .then((res) => {
      return res.data;
    })
    .catch((e) => console.log(e));
};

export const getProduct = async (params) => {
  return await axios
    .get(`${baseUrl}/api/product`, { params: params })
    .then((res) => {
      return res.data;
    })
    .catch((e) => console.log(e));
};

export const getProductDetail = async (params) => {
  return await axios
    .get(`${baseUrl}/api/product/detail`, { params: params })
    .then((res) => {
      return res.data;
    })
    .catch((e) => console.log(e));
};

export const getProductStatus = async (params) => {
  return await axios
    .get(`${baseUrl}/api/product/status`, { params: params })
    .then((res) => {
      return res.data;
    })
    .catch((e) => console.log(e));
};

export const getProductList = async (params) => {
  return await axios
    .get(`${baseUrl}/api/product`, { params: params })
    .then((res) => {
      return res.data;
    })
    .catch((e) => console.log(e));
};

export const truncateProduct = async () => {
  return await axios
    .get(`${baseUrl}/api/product/truncate`)
    .then((res) => {
      return res.data;
    })
    .catch((e) => console.log(e));
};

export const getCategoryList = async (params) => {
  return await axios
    .get(`${baseUrl}/api/category/list`, { params: params })
    .then((res) => {
      return res.data;
    })
    .catch((e) => console.log(e));
};

export const truncateCategory = async (params) => {
  return await axios
    .get(`${baseUrl}/api/category/truncate`)
    .then((res) => {
      return res.data;
    })
    .catch((e) => console.log(e));
};

export const createOrder = async (values) => {
  return await axios
    .post(`${baseUrl}/api/order/create`, values)
    .then((res) => {
      return res.data;
    })
    .catch((e) => console.log(e));
};

export const createPayment = async (values) => {
  return await axios
    .post(`${baseUrl}/api/order/payment`, values)
    .then((res) => {
      return res.data;
    })
    .catch((e) => console.log(e));
};

export const updateOrder = async (values) => {
  return await axios
    .post(`${baseUrl}/api/order/update`, values)
    .then((res) => {
      return res.data;
    })
    .catch((e) => console.log(e));
};

export const getOrders = async (values) => {
  return await axios
    .post(`${baseUrl}/api/order/list`, values)
    .then((res) => {
      return res.data;
    })
    .catch((e) => console.log(e));
};

export const getOrderDetail = async (values) => {
  return await axios
    .post(`${baseUrl}/api/order`, values)
    .then((res) => {
      return res.data;
    })
    .catch((e) => console.log(e));
};
