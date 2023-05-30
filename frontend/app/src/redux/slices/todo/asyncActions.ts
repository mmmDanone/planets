import axios from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {ITodo} from './todoTypes';
import {name} from './sliceName';

const fetchTodoPrefix = name('fetchTodo');

export const fetchTodo = createAsyncThunk<
  Array<ITodo>,
  undefined,
  {
    rejectValue: string;
  }
>(fetchTodoPrefix, async (_, {rejectWithValue}) => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
    return response.data;
  } catch (error) {
    return rejectWithValue('OPS... ERROR...');
  }
});
