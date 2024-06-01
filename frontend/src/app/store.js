import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 
import authReducer from '../features/auth/authSlice'
import usersReducer from '../features/users/userSlice'
import tasksReducer from '../features/tasks/tasksSlice'

const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  tasks: tasksReducer
})

const persistConfig = {
  key: 'root',
  storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export const persistor = persistStore(store)
