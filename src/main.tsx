import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from '@/App';
import { ConfigProvider } from 'antd';
// import '@/mock';
// 引入Ant Design中文语言包
import zhCN from 'antd/locale/zh_CN';
// 全局样式
import '@/common/styles/frame.styl';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ConfigProvider locale={zhCN}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ConfigProvider>
);
