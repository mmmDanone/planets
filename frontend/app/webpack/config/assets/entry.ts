import {EntryObject} from 'webpack';
import paths from '../paths';

export default (): EntryObject => {
  return {
    index: paths.mainEntry
  };
};
