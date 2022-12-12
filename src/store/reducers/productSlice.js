import { createSlice } from "@reduxjs/toolkit";
import { deleteObject, getDownloadURL, uploadBytes } from "firebase/storage";
import { imageRef } from "src/lib/firebase";
import { createProduct as BEcreateProduct, getProductList, updateProduct } from "src/utils/api";

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
    setList(state, action) {
      state.products = { ...action.payload };
    },
    removeProductByCachId(state, action) {
      const temp = { ...state.products };
      delete temp[action.payload];
      state.products = { ...temp };
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
    if (!productSlice[product._id]) products[product._id] = { ...product };
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

export const createProduct = (product, callback) => async (dispatch, getState) => {
  const images = product.images;
  const promisesImgToDel = [];
  const promisesImgToAdd = [];

  const imageToSaveLst = [];
  const dataToHold = [];

  for (const image of images) {
    const storageUrl = image.ref ? image.ref : `public/product/${image.id}${image.format}`;
    const storageImgRef = imageRef(storageUrl);

    if (image.isDeleted && !image.isSubmitDeleted) {
      promisesImgToDel.push(deleteObject(storageImgRef));
    }
    if (!image.isNew && !image.isDeleted)
      if (image.id) {
        dataToHold.push({ id: image.id, url: image.url, ref: image.storageUrl });
      } else {
        dataToHold.push({ url: image.url });
      }
    if (image.isNew && !image.isDeleted) {
      promisesImgToAdd.push(
        uploadBytes(storageImgRef, image.file).then(async () => {
          await getDownloadURL(storageImgRef).then((value) => {
            dataToHold.push({ id: image.id, url: value, ref: storageUrl });
          });
        })
      );
    }
  }
  await Promise.all(promisesImgToDel)
    .then(() => {
      console.log("delete all successful");
    })
    .catch((e) => {
      callback("Something goes wrong!!!", "error");
      console.log("error" + e);
    });
  await Promise.all(promisesImgToAdd)
    .then(() => {
      console.log("add all images successful");
    })
    .catch((e) => {
      callback("Something goes wrong!!!", "error");
      console.log("error" + e);
    });

  const res = await BEcreateProduct({ ...product, images: dataToHold }).then(({ data }) => data);
  dispatch(ProductSlice.actions.setProductByCacheId(res));
  callback("Add product successful!!!", "success");
};

export const update = (product, callback) => async (dispatch, getState) => {
  console.log("update");
  const images = product.images;
  const promisesImgToDel = [];
  const promisesImgToAdd = [];

  const dataToHold = [];

  for (const image of images) {
    const storageUrl = image.ref ? image.ref : `public/product/${image.id}${image.format}`;
    const storageImgRef = imageRef(storageUrl);

    if (image.isDeleted && !image.isSubmitDeleted) {
      promisesImgToDel.push(deleteObject(storageImgRef));
    }
    if (!image.isNew && !image.isDeleted)
      if (image.id) {
        dataToHold.push({ id: image.id, url: image.url, ref: image.storageUrl });
      } else {
        dataToHold.push({ url: image.url });
      }
    if (image.isNew && !image.isDeleted) {
      promisesImgToAdd.push(
        uploadBytes(storageImgRef, image.file).then(async () => {
          await getDownloadURL(storageImgRef).then((value) => {
            dataToHold.push({ id: image.id, url: value, ref: storageUrl });
          });
        })
      );
    }
  }
  await Promise.all(promisesImgToDel)
    .then(() => {
      console.log("delete all successful");
    })
    .catch((e) => {
      callback("Something goes wrong!!!", "error");
      console.log("error" + e);
    });
  await Promise.all(promisesImgToAdd)
    .then(() => {
      console.log("add all images successful");
    })
    .catch((e) => {
      callback("Something goes wrong!!!", "error");
      console.log("error" + e);
    });

  const res = await updateProduct({ ...product, images: dataToHold }).then(({ data }) => data);
  dispatch(ProductSlice.actions.setProductByCacheId(res));
  callback("Update product successful!!!", "success");
};

export const remove = (id) => async (dispatch, getState) => {
  dispatch(ProductSlice.actions.removeProductByCachId(id));
};

export default ProductSlice;
