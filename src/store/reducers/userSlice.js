import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
  id: null,
  firstName: '',
  lastName: '',
  username: '',
  authorization: {},
}

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      const {
        user: { _id, firstName, lastName, username },
        authorization,
      } = action.payload
      state.id = _id
      state.firstName = firstName
      state.lastName = lastName
      state.username = username
      state.authorization = authorization
    },
    resetUser(state, action) {
      const {
        user: { _id, firstName, lastName, username },
        authorization,
      } = action.payload
      state.id = _id
      state.firstName = firstName
      state.lastName = lastName
      state.username = username
      state.authorization = authorization
    },
  },
})

export const setUser = (user) => async (dispatch, getState) => {
  dispatch(UserSlice.actions.setUser(user))
}

export const resetUser = () => async (dispatch, getState) => {
  dispatch(UserSlice.actions.resetUser(initialState))
}

export default UserSlice
