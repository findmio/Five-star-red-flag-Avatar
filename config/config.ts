import { defineConfig } from 'umi';
import routes from './router';  // 路由
import proxy from './porxy';  // 代理
import extraPostCSSPlugins from './postcssPlugins';  // 额外的 postcss 配置

export default defineConfig({
  routes,
  proxy,
  extraPostCSSPlugins,
  alias: {
    config: '/config',
  },


  fastRefresh: {},
  extraBabelPlugins: [
    [
      "import",
      { "libraryName": "antd-mobile", "libraryDirectory": "es/components", "style": false }
    ]
  ],
  dynamicImport: {
    loading: '@/components/Loading',
  },

  targets: {
    ios: 10,
    chrome: 79,
    ie: false,
    firefox: false,
    safari: false,
    edge: false,
  },

  // 优化项
  mfsu: {},
  mock: false,
  antd: false,
  hash: true,
  ignoreMomentLocale: true,
  nodeModulesTransform: {
    type: 'none',
    exclude: [],
  },
});
