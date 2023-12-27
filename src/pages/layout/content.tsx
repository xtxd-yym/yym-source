import { memo, useCallback, useState } from 'react';
import { DownOutlined, UpOutlined, MailTwoTone } from '@ant-design/icons';
import './style/index.less';
import { Outlet } from 'react-router-dom';
import {
  SourceLayoutPrefix,
  SourceHeaderPrefix,
  SourceContainerPrefix,
} from '@/constant/styles/index';

const Layout = memo(() => {
  const prefix = SourceLayoutPrefix;
  const headerPrefix = SourceHeaderPrefix;
  const containerPrefix = SourceContainerPrefix;
  //当前登录的用户名称
  const [username, setUsername] = useState<string>('');
  //个人信息栏显隐状态
  const [profileHide, setProfileHide] = useState<boolean>(false);

  //个人信息栏收缩按钮点击回调
  const onShrinkClick = useCallback(() => {
    setProfileHide((pre) => !pre);
  }, []);

  //导航栏渲染
  const navigationRender = useCallback(() => {
    return (
      <div className={`${headerPrefix}-navigation`}>
        <div className={`${headerPrefix}-navigation-left`}>
          <div
            className={`${headerPrefix}-navigation-left-shrink`}
            onClick={onShrinkClick}
          >
            {profileHide ? <DownOutlined /> : <UpOutlined />}
          </div>
          <div className={`${headerPrefix}-navigation-left-account`}>
            {username}
          </div>
          <div className={`${headerPrefix}-navigation-left-email`}>
            <MailTwoTone />
          </div>
          <div className={`${headerPrefix}-navigation-left-setting`}>设置</div>
          <div className={`${headerPrefix}-navigation-left-loginout`}>退出</div>
        </div>
        <div className={`${headerPrefix}-navigation-right`}></div>
      </div>
    );
  }, [profileHide]);

  return (
    <div className={prefix}>
      <div className={headerPrefix}>
        {navigationRender()}
        <div className={`${headerPrefix}-profile`}></div>
        <div className={`${headerPrefix}-advertise`}></div>
      </div>
      <div className={containerPrefix}>
        <Outlet></Outlet>
      </div>
    </div>
  );
});

export default Layout;
