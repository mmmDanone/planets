import {bindActionCreators} from '@reduxjs/toolkit';
import {dispatch} from '@/redux/store';
import {actions} from './userSlice';
import * as asyncActions from './asyncActions';

export const {fetchAuth, fetchRefresh, fetchExp, fetchFolder, fetchFile} = bindActionCreators(
  {...actions, ...asyncActions},
  dispatch
);
