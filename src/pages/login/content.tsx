import { useCallback, useState, useContext, memo } from 'react';
import { Button, Input, Form, Radio, RadioChangeEvent, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import './style/index.less';
import { SourceLoginPrefix } from '@/constant/styles/index';
import { sourceLogin } from '@/api/content';
import {AuthContext} from "@/router/authcomp";

interface FieldType {}

const Login = memo(() => {
  const prefix = SourceLoginPrefix;
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  //账号类型单选check框值
  const [usernameType, setUsernameType] = useState<string>('username');

  //账号类型改变回调
  const onUsernameTypeChange = useCallback((e: RadioChangeEvent) => {
    setUsernameType(e.target.value);
  }, []);

  const submit = useCallback(() => {
    form.validateFields().then(
      () => {
        const params = {
          usernameType,
          username: form.getFieldsValue()?.username || '',
          password: form.getFieldsValue()?.password || '',
        };
        sourceLogin(params)
          .then((res: any = {}) => {
            if (res.status === 200 && res.data) {
              localStorage.setItem("isLogin", "true");
              localStorage.setItem("username", res.data?.username || "");
              auth?.changeIsLogin(!!res.data?.isLogin);
              !!res.data?.isLogin && auth?.changeUsername(res.data?.username || "");
              navigate('/home');
            } else {
              Modal.error({
                title: '登陆失败， 用户名或密码错误！',
              });
            }
          })
          .catch(() => {
            Modal.error({
              title: '登陆失败！',
            });
          });
      },
      () => {}
    );
  }, [usernameType]);

  return (
    <div className={prefix}>
      <div className={`${prefix}-title`}>{'南+ South Plus 提示信息'}</div>
      <div className={`${prefix}-container`}>
        <div className={`${prefix}-container-info`}>
          <div className={`${prefix}-container-info-top`}>
            {'您没有登录或者您没有权限访问此页面，可能有如下几个原因:'}
          </div>
          <div className={`${prefix}-container-info-tips`}>
            <div className={`${prefix}-container-info-tips-first`}>
              {'1.Member only knows'}
            </div>
            <div className={`${prefix}-container-info-tips-second`}>
              {'2.您还不是论坛会员,请先登录论坛'}
            </div>
          </div>
        </div>
        <div className={`${prefix}-container-form`}>
          <Form
            name="login"
            labelCol={{ span: 12 }}
            wrapperCol={{ span: 12 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            autoComplete="off"
            form={form}
            labelAlign="left"
          >
            <Form.Item<FieldType>
              label={
                <Radio.Group
                  onChange={onUsernameTypeChange}
                  value={usernameType}
                >
                  <Radio value={'username'}>用户名</Radio>
                  <Radio value={'UID'}>UID</Radio>
                  <Radio value={'Email'}>Email</Radio>
                </Radio.Group>
              }
              name="username"
              rules={[{ required: true, message: '此项必填' }]}
            >
              <div className={`${prefix}-container-form-user`}>
                <Input />
              </div>
            </Form.Item>
            <Form.Item<FieldType>
              label="密码"
              name="password"
              rules={[{ required: true, message: '此项必填' }]}
            >
              <Input.Password />
            </Form.Item>
            {/* <Form.Item<FieldType>
              name="remember"
              valuePropName="checked"
              wrapperCol={{ offset: 8, span: 16 }}
            >
              <Checkbox>记住我的选择</Checkbox>
            </Form.Item> */}
            <Form.Item wrapperCol={{ offset: 12, span: 12 }}>
              <Button type="primary" onClick={submit}>
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
});

export default Login;
