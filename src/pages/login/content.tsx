import { Button, Input } from 'antd'
import './style/index.less'

function Login() {
    return (
        <div className="P-login">
            <img src={""} alt="" className="logo" />
            <div className="ipt-con">
                <Input placeholder="账号" />
            </div>
            <div className="ipt-con">
                <Input.Password placeholder="密码" />
            </div>
            <div className="ipt-con">
                <Button type="primary" block={true}>
                    登录
                </Button>
            </div>
        </div>
    )
}

export default Login