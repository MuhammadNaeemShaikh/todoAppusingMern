
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  id: "",
  email:"",
  name:""
}

export const loginSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    save: (state,action) => {
        state.id = action.payload.id;
        state.email = action.payload.email;
        state.name = action.payload.name;
    }
  },
})

// Action creators are generated for each case reducer function
export const { save } = loginSlice.actions

export default loginSlice.reducer