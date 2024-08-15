import { configureStore } from "@reduxjs/toolkit";
import imagesReducer from "./imagesSlice";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";


const persistConfig = {
  key: "root",
  storage,
  whitelist: ["images"], 
};

const persistedReducer = persistReducer(persistConfig, imagesReducer);

export const store = configureStore({
  reducer: {
    images: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});

export const persistor = persistStore(store);