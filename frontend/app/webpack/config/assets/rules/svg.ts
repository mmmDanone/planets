import {RuleSetRule} from 'webpack';
import svgrLoader from '../loaders/svgr';
import svgToMiniDataURI from 'mini-svg-data-uri';

export default (): RuleSetRule => {
  return {
    test: /\.svg$/,
    oneOf: [
      {
        issuer: /\.[jt]sx?$/,
        resourceQuery: '',
        use: [svgrLoader()]
      },
      {
        issuer: /\.[jt]sx?$/,
        resourceQuery: /url/,
        type: 'asset/resource',
        generator: {
          filename: 'static/images/svg/[contenthash][ext]'
        }
      },
      {
        issuer: {not: /\.[jt]sx?$/},
        resourceQuery: '',
        type: 'asset/resource',
        generator: {
          filename: 'static/images/svg/[contenthash][ext]'
        }
      },
      {
        issuer: {not: /\.[jt]sx?$/},
        resourceQuery: /uri/,
        type: 'asset/inline',
        generator: {
          dataUrl: (content: any) => svgToMiniDataURI(content.toString())
        }
      }
    ]
  };
};
