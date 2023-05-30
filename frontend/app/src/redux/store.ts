import {configureStore} from '@reduxjs/toolkit';

import {userSlice} from './slices/user/userSlice';

export const store = configureStore({
  reducer: {
    [userSlice.name]: userSlice.reducer
  }
});

export const dispatch = store.dispatch;

export type AppRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
