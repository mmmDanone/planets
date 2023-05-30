export interface UserResponseType {
  id: number;
  name: string;
  role: string;
  experience: number;
  courses: {
    completed: 3;
    total: 15;
  };
  maxFolders: number;
  books: {
    completed: 3;
    total: 19;
  };
  foldersList: Array<FolderProps>;
}

export interface UserStoreProps {
  user: UserResponseType | null;
  isLogin: boolean;
  isLoading: boolean;
  error: string;
}

export interface FileProps {
  small: string;
  big: string;
}

export interface FolderProps {
  id: number;
  name: string;
  people: number;
  files: Array<FileProps>;
}
