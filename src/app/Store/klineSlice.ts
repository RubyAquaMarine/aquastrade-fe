"use client";
import { createSlice } from "@reduxjs/toolkit";
import { WsResponseTypeKline } from "../types";

//Each slice file should define a type for its initial state value, so that createSlice can correctly infer the type of state in each case reducer.
const initialState: { data: WsResponseTypeKline | undefined } = {
  data: undefined,
};

export const klineSlice = createSlice({
  name: "kline",
  initialState,
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
  },
});
export const { setData } = klineSlice.actions;
export default klineSlice;

/*

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

// Define a type for the slice state
interface CounterState {
  value: number
}



// Define the initial state using that type
const initialStated: CounterState = {
  value: 0,
}


export const counterSlice = createSlice({
  name: 'counter',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.value

export default counterSlice.reducer

*/
