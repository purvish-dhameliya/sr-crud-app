import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  tasks: [],
  loading: false,
  error: null
}

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth
      const response = await axios.get('http://localhost:5000/api/tasks', {
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

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (taskData, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth
      const response = await axios.post(
        'http://localhost:5000/api/tasks',
        taskData,
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

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ id, taskData }, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth
      const response = await axios.put(
        `http://localhost:5000/api/tasks/${id}`,
        taskData,
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

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (id, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth
      const response = await axios.delete(
        `http://localhost:5000/api/tasks/${id}`,
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

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(fetchTasks.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false
        state.tasks = action.payload
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(createTask.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false
        state.tasks.push(action.payload)
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(updateTask.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false
        state.tasks = state.tasks.map(
          task => (task._id === action.payload._id ? action.payload : task)
        )
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(deleteTask.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false
        state.tasks = state.tasks.filter(task => task._id !== action.meta.arg)
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export default tasksSlice.reducer
