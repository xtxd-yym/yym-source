import { Route, Routes, Navigate } from 'react-router-dom';
import Layout from '@/pages/layout';
import Home from "@/pages/home";
import Login from "@/pages/login";
import {lazyLoad, AuthComp} from "@/util/routeFunc";



// 全局路由
const MainRouters = () => {
  return (
    <Routes>
      <Route path="/" element={AuthComp(lazyLoad(Layout), true)}>
        <Route path="/" element={<Navigate to="/home" />}></Route>
        <Route path="/home" element={lazyLoad(Home)}></Route>
      </Route>
      <Route path="/login" element={lazyLoad(Login)}></Route>
      <Route path="*" element={<Navigate to="/" />}></Route>
    </Routes>
  );
};

export default MainRouters;
