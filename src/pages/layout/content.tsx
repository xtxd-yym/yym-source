import { Button } from 'antd'
import './style/index.less'
import { Outlet } from 'react-router-dom';

const Layout = () => {

    return (
        <div className="P-home">
            <h1>Layout</h1>
            <div className="ipt-con">
                <Button type="primary">返回登录</Button>
            </div>
            <div>
                <Outlet></Outlet>
            </div>
        </div>
    )
}

export default Layout;