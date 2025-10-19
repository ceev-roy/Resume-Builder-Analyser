// import { createSlice } from '@reduxjs/toolkit'

// const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     token: null,
//     user: null,
//     loading: true
//   },
//   reducers: {
//     login: (state, action) => {
//       state.token = action.payload.token
//       state.user = action.payload.user
//     },
//     logout: (state) => {
//       state.token = '',
//         state.user = null,
//         localStorage.removeItem('token')
//     },
//     setLoading: (state, action) => {
//       state.loading = action.payload
//     }
//   }
// }
// )

// export const { login, logout, setLoading } = authSlice.actions

// export default authSlice.reducer


import { createSlice } from '@reduxjs/toolkit'

// Read from localStorage when app starts
const token = localStorage.getItem('token')
const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: token || null,
    user: user || null,
    loading: false
  },
  reducers: {
    login: (state, action) => {
      state.token = action.payload.token
      state.user = action.payload.user
      localStorage.setItem('token', action.payload.token)
      localStorage.setItem('user', JSON.stringify(action.payload.user))
    },
    logout: (state) => {
      state.token = null
      state.user = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    }
  }
})

export const { login, logout, setLoading } = authSlice.actions
export default authSlice.reducer