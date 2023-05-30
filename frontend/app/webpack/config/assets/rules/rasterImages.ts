import {RuleSetRule} from 'webpack';

export default (): RuleSetRule => {
  return {
    test: /\.(jpe?g|png|gif|webp)$/,
    type: 'asset/resource',
    generator: {
      filename: 'static/images/raster/[contenthash][ext]'
    }
  };
};
