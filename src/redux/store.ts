import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./usersSlice";
import loadersReducer from "./loadersSlice";
import themeReducer from "./themeSlice";

const store = configureStore({
  reducer: {
    users: usersReducer,
    loaders: loadersReducer,
    theme: themeReducer,
  },
});

export default store;
