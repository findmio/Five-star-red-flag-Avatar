const { NODE_ENV } = process.env;

export const baseURL = NODE_ENV === 'development' ? '/api' : '/api';

export default {
  [baseURL]: {
    'target': 'http://lixinmiao.com:3000',
    'changeOrigin': true,
    'pathRewrite': { '^/api': '' },
  },
}