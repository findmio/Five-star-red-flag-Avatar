import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import 'antd-mobile/es/global';
import '@/styles/index.less';

export function onRouteChange(props: { matchedRoutes: any }) {
  const { matchedRoutes } = props;
  if (matchedRoutes.length) {
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // 窗口获得焦点时重新获取数据
    },
  },
});

/**
 * react-dom 渲染时的根组件
 */
export function rootContainer(container: any) {
  const App = () => <QueryClientProvider client={queryClient}>{container}</QueryClientProvider>;
  return React.createElement(App, null, container);
}
