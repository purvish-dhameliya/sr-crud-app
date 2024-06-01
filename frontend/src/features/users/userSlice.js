import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  users: [],
  loading: false,
  error: null
}

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth
      const response = await axios.get('http://localhost:5000/api/users', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data.message)
    }
  }
)

export const createUser = createAsyncThunk(
  'users/createUser',
  async (userData, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth
      const response = await axios.post(
        'http://localhost:5000/api/users/create',
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data.message)
    }
  }
)

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async ({ id, userData }, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth
      const response = await axios.put(
        `http://localhost:5000/api/users/${id}`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data.message)
    }
  }
)

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (id, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth
      await axios.delete(`http://localhost:5000/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return id
    } catch (error) {
      return rejectWithValue(error.response.data.message)
    }
  }
)

const usersSlice = createSlice({
  name: 'users',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false
        state.users = action.payload
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.users.push(action.payload)
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(
          user => user._id === action.payload._id
        )
        if (index !== -1) {
          state.users[index] = action.payload
        }
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(user => user._id !== action.payload)
      })
  }
})

export default usersSlice.reducer
