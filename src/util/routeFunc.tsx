import React, {useContext} from 'react';
import { Spin } from 'antd';
import { Navigate } from 'react-router-dom';
import {AuthContext} from "@/router/authcomp";

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

export const AuthComp = (props: any) => {
  const { children } = props;
  const auth = useContext(AuthContext);

  // 如果登录就放行
  if (auth?.user) {
    return children;
  } else {
    // 如果没有登录就重定向到Login登录页
    return <Navigate to="/login" replace />;
  }
};
