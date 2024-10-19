import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "./services/apislice";
import { setupListeners } from "@reduxjs/toolkit/query";
import AuthSlice from "./slices/AuthSlice";

// Import New Slice Above

const store = configureStore({
  reducer: {
    auth: AuthSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([apiSlice.middleware]),
});

setupListeners(store.dispatch);
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
