import { Button } from 'antd';
import './style/index.less';
import { useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {AuthContext} from "@/router/authcomp";

const Home = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const loginOut = useCallback(() => {
    localStorage.setItem("isLogin", "false");
    localStorage.removeItem("username");
    auth?.changeIsLogin(false);
    navigate('/login');
  }, []);

  return (
    <div className="P-home">
      <h1>Home Page</h1>
      <div className="ipt-con">
        <Button type="primary" onClick={loginOut}>
          退出登录
        </Button>
      </div>
    </div>
  );
};

export default Home;
