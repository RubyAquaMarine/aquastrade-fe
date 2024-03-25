"use client";
import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { authSlice } from "@/app/Store/authSlice";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

// Import all slices
import { binanceStreamSlice } from "./binanceStream";
import { loginApi } from "./_api";
import { wssMiddleware } from "./wssMiddleware";
import { marketSlice } from "./market";
import themeReducer, { themeSlice } from "./theme";
import { dbDataWs } from "./dbws";
import klineSlice from "./klineSlice";
import { popupSlice } from "./popup";
/*

configure the store 

*/
export const store = () =>
  configureStore({
    reducer: {
      [authSlice.name]: authSlice.reducer,
      [loginApi.reducerPath]: loginApi.reducer,
      [binanceStreamSlice.name]: binanceStreamSlice.reducer,
      [marketSlice.name]: marketSlice.reducer,
      [themeSlice.name]: themeReducer,
      [dbDataWs.name]: dbDataWs.reducer,
      [klineSlice.name]: klineSlice.reducer,
      [popupSlice.name]: popupSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      }).prepend(loginApi.middleware, wssMiddleware),
  });

export type AppStore = ReturnType<typeof store>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

//  While it's possible to import the RootState and AppDispatch types into each component,
//  it's better to create typed versions of the useDispatch and useSelector hooks for usage in your application.
export const typedDispatch = useDispatch<AppDispatch>;
export const typedUseSelector: TypedUseSelectorHook<AppState> = useSelector;

export const wrapper = createWrapper<AppStore>(store);
