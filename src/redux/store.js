import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../redux/slice/CounterSlice'
import authReducer from './slice/AuthSlice'

import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist' 
import { combineReducers } from '@reduxjs/toolkit'

const persistConfig = {
  key: 'root',
  version: 1, 
  storage,
  whitelist: ['auth'],
}

const reducer = combineReducers({
  counter: counterReducer,
  auth: authReducer,
})

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
  reducer: persistedReducer
})
