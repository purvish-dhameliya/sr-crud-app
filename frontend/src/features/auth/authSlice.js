
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  user: null,
  token: localStorage.getItem('token') || null,
  loading: false,
  error: null
}

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/users/register',
        userData
      )
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data.message)
    }
  }
)

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/users/login',
        userData
      )
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data.message)
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      localStorage.removeItem('token')
      state.user = null
      state.token = null
    },
    loadUser: state => {
      const token = localStorage.getItem('token')
      if (token) {
        const user = JSON.parse(atob(token.split('.')[1]))
        state.user = user
        state.token = token
      }
    }
  },
  extraReducers: builder => {
    builder
      .addCase(registerUser.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.token = action.payload.token
        localStorage.setItem('token', action.payload.token)
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(loginUser.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.token = action.payload.token
        localStorage.setItem('token', action.payload.token)
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export const { logout, loadUser } = authSlice.actions
export default authSlice.reducer
