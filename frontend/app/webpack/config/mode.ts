import {TDeviceFirst} from './types';

export const isDev = process.env.NODE_ENV === 'development';
export const isProd = process.env.NODE_ENV === 'production';
export const isWebPackDevServer = process.env.TYPE_SERVER_ENV === 'webpackDevServer';
export const deviceFirst: TDeviceFirst = 'mobile-first';
