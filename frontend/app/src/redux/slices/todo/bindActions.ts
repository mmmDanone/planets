import {bindActionCreators} from '@reduxjs/toolkit';
import {dispatch} from '@/redux/store';
import {actions} from './todoSlice';
import * as asyncActions from './asyncActions';

export const {fetchTodo} = bindActionCreators({...actions, ...asyncActions}, dispatch);
