import {bindActionCreators} from '@reduxjs/toolkit';
import {dispatch} from '@/redux/store';
import {actions} from './counterSlice';

export const {increment, decrement, reset} = bindActionCreators(actions, dispatch);
