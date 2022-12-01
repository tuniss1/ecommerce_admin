import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  orderId: '',
  cart: {},
  bill: {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    company: '',
    region: '',
    district: '',
    ward: '',
    address: '',
    orderComment: '',
    paymentMethod: 'vnpay',
  },
  shipping: {
    orderCode: '',
    totalFee: 0,
    expectedDeliveryTime: '',
  },
  totalPrice: 0,
}

const CheckoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    resetCheckout: (state, action) => {
      const { orderId, cart, bill, shipping, totalPrice } = initialState
      state.orderId = orderId
      state.cart = cart
      state.bill = bill
      state.shipping = shipping
      state.totalPrice = totalPrice
    },
    addItem: (state, action) => {
      if (state.cart[action.payload.id]) {
        state.cart[action.payload.id].quantity += action.payload.quantity
      } else {
        state.cart[action.payload.id] = action.payload
      }
      state.totalPrice += action.payload.price * action.payload.quantity
      state.totalPrice = Number(state.totalPrice.toFixed(2))
    },
    incQuantityById: (state, action) => {
      // action.payload = id
      const itemId = action.payload
      if (state.cart[itemId]) {
        state.cart[itemId].quantity += 1
        state.totalPrice += state.cart[itemId].price
        state.totalPrice = Number(state.totalPrice.toFixed(2))
      }
    },
    decQuantityById: (state, action) => {
      // action.payload = id
      const itemId = action.payload
      if (state.cart[itemId]) {
        state.cart[itemId].quantity -= 1
        state.totalPrice -= state.cart[itemId].price
        state.totalPrice = Number(state.totalPrice.toFixed(2))
      }
    },
    updateQuantityById: (state, action) => {
      // action.payload = { id, quantity }
      const itemId = action.payload.id
      if (state.cart[itemId]) {
        state.totalPrice -= state.cart[itemId].price * state.cart[itemId].quantity
        state.cart[itemId].quantity = action.payload.quantity
        state.totalPrice += state.cart[itemId].price * state.cart[itemId].quantity
        state.totalPrice = Number(state.totalPrice.toFixed(2))
      }
    },
    removeItemById: (state, action) => {
      // action.payload = id
      const itemId = action.payload
      if (state.cart[itemId]) {
        state.totalPrice -= state.cart[itemId].price * state.cart[itemId].quantity
        state.totalPrice = Number(state.totalPrice.toFixed(2))
        delete state.cart[itemId]
      }
    },
    updateBillingAndShipping: (state, action) => {
      state.orderId = action.payload.orderId
      state.bill = action.payload.bill
      state.shipping = action.payload.shipping
      state.totalPrice = state.totalPrice + action.payload.shipping.totalFee
      state.totalPrice = Number(state.totalPrice.toFixed(2))
    },
  },
})

export const resetCheckout = () => async (dispatch, getState) => {
  dispatch(CheckoutSlice.actions.resetCheckout())
}

export const addItem = (item) => async (dispatch, getState) => {
  dispatch(CheckoutSlice.actions.addItem(item))
}

export const incQuantityById = (itemId) => async (dispatch, getState) => {
  dispatch(CheckoutSlice.actions.incQuantityById(itemId))
}

export const decQuantityById = (itemId) => async (dispatch, getState) => {
  dispatch(CheckoutSlice.actions.decQuantityById(itemId))
}

export const updateQuantityById = (item) => async (dispatch, getState) => {
  dispatch(CheckoutSlice.actions.updateQuantityById(item))
}

export const removeItemById = (itemId) => async (dispatch, getState) => {
  dispatch(CheckoutSlice.actions.removeItemById(itemId))
}

export const updateBillingAndShipping = (item) => async (dispatch, getState) => {
  dispatch(CheckoutSlice.actions.updateBillingAndShipping(item))
}

export default CheckoutSlice
