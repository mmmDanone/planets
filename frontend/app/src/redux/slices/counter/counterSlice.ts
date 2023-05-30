import {createSlice} from '@reduxjs/toolkit';
import {ICounterState} from './counterTypes';
import {name} from './sliceName';

const initialState: ICounterState = {
  value: 0
};

export const counterSlice = createSlice({
  name: name(),
  initialState: initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    reset: (state) => {
      state.value = 0;
    }
  }
});

export const actions = counterSlice.actions;
