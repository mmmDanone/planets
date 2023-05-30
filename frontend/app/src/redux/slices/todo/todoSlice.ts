import {createSlice} from '@reduxjs/toolkit';
import {ITodoState} from './todoTypes';
import {fetchTodo} from './asyncActions';
import {name} from './sliceName';

const initialState: ITodoState = {
  todos: [],
  isLoading: true,
  error: ''
};

export const todoSlice = createSlice({
  name: name(),
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodo.pending, (state) => {
        state.error = '';
        state.isLoading = true;
      })
      .addCase(fetchTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = '';
        state.todos = action.payload;
      })
      .addCase(fetchTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'OPS... UNKNOWN ERROR...';
      });
  }
});

export const actions = todoSlice.actions;
