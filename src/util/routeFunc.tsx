import React from 'react';
import { Spin } from 'antd';
import {Navigate} from 'react-router-dom';
export const lazyLoad = (Comp: any) => {
  return (
    <React.Suspense
      fallback={
        <Spin
          size="large"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
      }
    >
      <Comp />
    </React.Suspense>
  );
};

export const AuthComp = (props: any, isLogin: boolean = false) => {
    const { comp:Comp } = props;
  
      // 如果登录就放行
    if (isLogin) return Comp;
  
      // 如果没有登录就重定向到Login登录页
    return <Navigate to="/login" replace/>;
  };



