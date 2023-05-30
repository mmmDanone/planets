import {ICSSMinimizerOptions} from '../types';
import {BasicMinimizerImplementation} from 'css-minimizer-webpack-plugin';
import {Postcss} from 'postcss';

export default <BasicMinimizerImplementation<ICSSMinimizerOptions>>((data, inputMap, minimizerOptions) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const postCSS = require('postcss') as Postcss;
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const postCssCombineMediaQuery = require('postcss-combine-media-query');
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const postCssSortMediaQueries = require('postcss-sort-media-queries');
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const postCssO = require('postcss-csso');
  const [[filename, input]] = Object.entries(data);

  const postCssOptions = {
    from: filename,
    to: filename
  };

  //minimizerOptions.deviceFirst galactic hack xD

  return postCSS([postCssCombineMediaQuery, postCssSortMediaQueries({sort: minimizerOptions.deviceFirst}), postCssO])
    .process(input, postCssOptions)
    .then((result) => {
      return {
        code: result.css,
        warnings: result.warnings()
      };
    });
});
