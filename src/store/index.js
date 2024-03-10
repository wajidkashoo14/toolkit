// global store
import { configureStore } from "@reduxjs/toolkit";
import todoReducer from './slice/toDoSlice'

const store = configureStore({
  reducer: {
    todo:todoReducer
  },
});

export default store;
