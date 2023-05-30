import {randomFromTo, randomDelay} from '@/shared/shared';

import {createAsyncThunk} from '@reduxjs/toolkit';
import {UserResponseType, FolderProps, FileProps} from './userTypes';
import {name} from './sliceName';

//TODO: don't doing that in real project
export const getTempFolder = (() => {
  let id = 0;

  return (): FolderProps => {
    return {
      id: ++id,
      name: 'Folder 1',
      people: randomFromTo(1253, 4582),
      files: []
    };
  };
})();

//TODO: don't doing that in real project
export const getTempFile = (() => {
  return (): FileProps => {
    return {
      small: `https://picsum.photos/210/112?r=${randomFromTo(1, 1000000000)}`,
      big: `https://picsum.photos/1280/720?r=${randomFromTo(1, 1000000000)}`
    };
  };
})();

const tempDataAuth: UserResponseType = {
  id: 42,
  name: 'Peter',
  role: 'Admin',
  experience: 142,
  courses: {
    completed: 3,
    total: 15
  },
  maxFolders: 15,
  books: {
    completed: 3,
    total: 19
  },
  foldersList: [
    {...getTempFolder(), ...{files: [getTempFile(), getTempFile(), getTempFile(), getTempFile(), getTempFile()]}},
    {
      ...getTempFolder(),
      ...{
        files: [getTempFile(), getTempFile(), getTempFile(), getTempFile(), getTempFile(), getTempFile()]
      }
    },
    {
      ...getTempFolder(),
      ...{
        files: [
          getTempFile(),
          getTempFile(),
          getTempFile(),
          getTempFile(),
          getTempFile(),
          getTempFile(),
          getTempFile(),
          getTempFile(),
          getTempFile(),
          getTempFile(),
          getTempFile(),
          getTempFile(),
          getTempFile(),
          getTempFile(),
          getTempFile(),
          getTempFile(),
          getTempFile(),
          getTempFile(),
          getTempFile(),
          getTempFile(),
          getTempFile(),
          getTempFile(),
          getTempFile(),
          getTempFile(),
          getTempFile(),
          getTempFile(),
          getTempFile(),
          getTempFile(),
          getTempFile(),
          getTempFile(),
          getTempFile(),
          getTempFile(),
          getTempFile(),
          getTempFile(),
          getTempFile(),
          getTempFile(),
          getTempFile(),
          getTempFile(),
          getTempFile(),
          getTempFile(),
          getTempFile(),
          getTempFile(),
          getTempFile(),
          getTempFile(),
          getTempFile(),
          getTempFile(),
          getTempFile(),
          getTempFile(),
          getTempFile(),
          getTempFile(),
          getTempFile(),
          getTempFile(),
          getTempFile(),
          getTempFile(),
          getTempFile(),
          getTempFile(),
          getTempFile(),
          getTempFile(),
          getTempFile(),
          getTempFile(),
          getTempFile(),
          getTempFile(),
          getTempFile(),
          getTempFile(),
          getTempFile(),
          getTempFile(),
          getTempFile(),
          getTempFile(),
          getTempFile(),
          getTempFile(),
          getTempFile(),
          getTempFile()
        ]
      }
    }
  ]
};

const fetchAuthPrefix = name('auth');
export const fetchAuth = createAsyncThunk<
  UserResponseType,
  undefined,
  {
    rejectValue: string;
  }
>(fetchAuthPrefix, async (_, {rejectWithValue}) => {
  try {
    await randomDelay();
    return tempDataAuth;
  } catch (error) {
    return rejectWithValue('OPS... ERROR...');
  }
});

const fetchRefreshPrefix = name('refresh');
export const fetchRefresh = createAsyncThunk<
  UserResponseType,
  undefined,
  {
    rejectValue: string;
  }
>(fetchRefreshPrefix, async (_, {rejectWithValue}) => {
  try {
    await randomDelay();
    return tempDataAuth;
  } catch (error) {
    return rejectWithValue('OPS... ERROR...');
  }
});

const fetchExpPrefix = name('exp');
export const fetchExp = createAsyncThunk<
  {ex: number},
  undefined,
  {
    rejectValue: string;
  }
>(fetchExpPrefix, async (_, {rejectWithValue}) => {
  try {
    return {
      ex: randomFromTo(100, 250)
    };
  } catch (error) {
    return rejectWithValue('OPS... ERROR...');
  }
});

const fetchFolderPrefix = name('folder');
export const fetchFolder = createAsyncThunk<
  FolderProps,
  undefined,
  {
    rejectValue: string;
  }
>(fetchFolderPrefix, async (_, {rejectWithValue}) => {
  try {
    return getTempFolder();
  } catch (error) {
    return rejectWithValue('OPS... ERROR...');
  }
});

const fetchFilePrefix = name('file');
export const fetchFile = createAsyncThunk<
  {
    id: number;
    file: FileProps;
  },
  number,
  {
    rejectValue: string;
  }
>(fetchFilePrefix, async (folderID, {rejectWithValue}) => {
  try {
    return {
      id: folderID,
      file: getTempFile()
    };
  } catch (error) {
    return rejectWithValue('OPS... ERROR...');
  }
});
