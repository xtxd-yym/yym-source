import { Route, Routes, Navigate } from 'react-router-dom';
import Layout from '@/pages/layout';
import Home from '@/pages/home';
import Login from '@/pages/login';
import Music from '@/pages/music';
import { lazyLoad, AuthComp } from '@/util/routeFunc';
import AuthProvider from '@/router/authcomp';

// 全局路由
const MainRouters = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<AuthComp>{(lazyLoad(Layout))}</AuthComp>}>
          <Route path="/" element={<Navigate to="/home" />}></Route>
          <Route path="/home" element={lazyLoad(Home)}></Route>
          <Route path="/music" element={lazyLoad(Music)}></Route>
        </Route>
        <Route path="/login" element={lazyLoad(Login)}></Route>
        <Route path="*" element={<Navigate to="/" />}></Route>
      </Routes>
    </AuthProvider>
  );
};

export default MainRouters;
