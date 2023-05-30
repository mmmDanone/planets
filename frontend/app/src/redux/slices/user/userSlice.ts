import {createSlice} from '@reduxjs/toolkit';
import {UserStoreProps} from './userTypes';
import {fetchAuth, fetchRefresh, fetchExp, fetchFolder, fetchFile} from './asyncActions';
import {name} from './sliceName';

const initialState: UserStoreProps = {
  user: null,
  isLogin: false,
  isLoading: true,
  error: ''
};

export const userSlice = createSlice({
  name: name(),
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuth.pending, (state) => {
        state.error = '';
        state.isLoading = true;
      })
      .addCase(fetchAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = '';
        state.user = action.payload;
      })
      .addCase(fetchAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'OPS... UNKNOWN ERROR...';
      });

    builder
      .addCase(fetchRefresh.pending, (state) => {
        state.error = '';
        state.isLoading = true;
      })
      .addCase(fetchRefresh.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = '';
        state.user = action.payload;
      })
      .addCase(fetchRefresh.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'OPS... UNKNOWN ERROR...';
      });

    builder.addCase(fetchExp.fulfilled, (state, action) => {
      //TODO: dont doing that
      state.user!.experience =
        state.user!.experience + action.payload.ex > 4999 ? 4999 : state.user!.experience + action.payload.ex;
    });

    builder.addCase(fetchFolder.fulfilled, (state, action) => {
      //TODO: dont doing that
      if (state.user!.foldersList.length >= 15) return;
      state.user!.foldersList.push(action.payload);
    });

    builder.addCase(fetchFile.fulfilled, (state, action) => {
      //TODO: dont doing that
      const index = state.user!.foldersList.findIndex((el) => el.id === action.payload.id);
      state.user!.foldersList[index].files.push(action.payload.file);
    });
  }
});

export const actions = userSlice.actions;
