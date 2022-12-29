import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../src/features/login/loginSlice'

export const store = configureStore({
  reducer: {
    counter:counterReducer
  },
})