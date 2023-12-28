import { memo, useCallback, useEffect, useState, useContext } from 'react';
import { DownOutlined, UpOutlined, MailTwoTone } from '@ant-design/icons';
import './style/index.less';
import { Outlet } from 'react-router-dom';
import { SourceLayoutPrefix, SourceHeaderPrefix, SourceContainerPrefix } from '@/constant/styles/index';
import { getUserConfig } from '@/api/content';
import { AuthContext } from '@/router/authcomp';
import leftAdvertise from '@/assert/image/masha5-1.gif';
import rightAdvertise from '@/assert/image/masha5-2.png';
import { Interface } from 'readline';

interface UserInfoType {
  avatar: string;
  level: number;
  post: number;
  signature: string;
}

const Layout = memo(() => {
  const prefix = SourceLayoutPrefix;
  const headerPrefix = SourceHeaderPrefix;
  const containerPrefix = SourceContainerPrefix;
  const auth = useContext(AuthContext);
  //当前登录的用户名称
  const [username, setUsername] = useState<string>(auth?.username || '');
  //个人信息栏显隐状态
  const [profileHide, setProfileHide] = useState<boolean>(false);
  //当前右侧tab栏选中值
  const [tabChoice, setTabChoice] = useState<string>('discuss');
  //当前用户信息集合
  const [userInfo, setUserInfo] = useState<UserInfoType>({
    avatar: '',//用户头像
    level: 1,//用户等级
    post: 0,//用户帖子数
    signature: '',//用户签名
  });

  useEffect(() => {
    const params = {};
    getUserConfig(params).then((res) => {});
  }, []);

  //个人信息栏收缩按钮点击回调
  const onShrinkClick = useCallback(() => {
    setProfileHide((pre) => !pre);
  }, []);

  //当前右侧tab栏选中内容改变回调
  const onChangeTab = useCallback((type: string = '') => {
    return () => {
      setTabChoice(type);
    };
  }, []);

  //左侧广告图片点击事件回调
  const onAdvertiseLeft = useCallback(() => {
    window.open('https://www.masadora.jp/dg');
  }, []);

  //右侧广告图片点击事件回调
  const onAdvertiseRight = useCallback(() => {
    window.open('https://www.masadora.jp/digitalOrder');
  }, []);

  //导航栏渲染
  const navigationRender = useCallback(() => {
    return (
      <div className={`${headerPrefix}-navigation`}>
        <div className={`${headerPrefix}-navigation-left`}>
          <div className={`${headerPrefix}-navigation-left-shrink`} onClick={onShrinkClick}>
            {profileHide ? <DownOutlined /> : <UpOutlined />}
          </div>
          <div className={`${headerPrefix}-navigation-left-account`}>{username}</div>
          <div className={`${headerPrefix}-navigation-left-email`}>
            <MailTwoTone />
          </div>
          <div className={`${headerPrefix}-navigation-left-setting`}>设置</div>
          <div className={`${headerPrefix}-navigation-left-loginout`}>退出</div>
        </div>
        <div className={`${headerPrefix}-navigation-right`}>
          <div
            className={`${headerPrefix}-navigation-right-discuss ${tabChoice === 'discuss' ? 'choice' : ''}`}
            onClick={onChangeTab('discuss')}
          >
            讨论区
          </div>
          <div
            className={`${headerPrefix}-navigation-right-search ${tabChoice === 'search' ? 'choice' : ''}`}
            onClick={onChangeTab('search')}
          >
            搜索
          </div>
          <div
            className={`${headerPrefix}-navigation-right-shield ${tabChoice === 'shield' ? 'choice' : ''}`}
            onClick={onChangeTab('shield')}
          >
            屏蔽设置
          </div>
          <div
            className={`${headerPrefix}-navigation-right-mission ${tabChoice === 'mission' ? 'choice' : ''}`}
            onClick={onChangeTab('mission')}
          >
            社区论坛任务
          </div>
        </div>
      </div>
    );
  }, [profileHide, username, tabChoice]);

  //个人信息渲染
  const prefileRender = useCallback(() => {
    const {avatar, level, post, signature} = userInfo;
    return (
      <div className={`${headerPrefix}-profile`}>
        <div className={`${headerPrefix}-profile-left`}>
          <div className={`${headerPrefix}-profile-left-avatar`}>
            <img src={avatar} alt="头像"></img>
          </div>
          <div className={`${headerPrefix}-profile-left-container`}>
            <div className={`${headerPrefix}-profile-left-container-top`}>
              <div className={`${headerPrefix}-profile-left-container-top-info`}></div>
              <div className={`${headerPrefix}-profile-left-container-top-theme`}></div>
              <div className={`${headerPrefix}-profile-left-container-top-reply`}></div>
              <div className={`${headerPrefix}-profile-left-container-top-add`}></div>
            </div>
            <div className={`${headerPrefix}-profile-left-container-bottom`}>
              <div className={`${headerPrefix}-profile-left-container-bottom`}>
                <div className={`${headerPrefix}-profile-left-container-bottom-pre`}></div>
                <div className={`${headerPrefix}-profile-left-container-bottom-mid`}></div>
                <div className={`${headerPrefix}-profile-left-container-bottom-tail`}></div>
              </div>
            </div>
          </div>
        </div>
        <div className={`${headerPrefix}-profile-right`}></div>
      </div>
    );
  }, [userInfo]);

  //广告区域渲染
  const advertiseRender = useCallback(() => {
    return (
      <div className={`${headerPrefix}-advertise`}>
        <div className={`${headerPrefix}-advertise-left`} onClick={onAdvertiseLeft}>
          <img src={leftAdvertise} alt="图片1"></img>
        </div>
        <div className={`${headerPrefix}-advertise-right`} onClick={onAdvertiseRight}>
          <img src={rightAdvertise} alt="图片2"></img>
        </div>
      </div>
    );
  }, []);

  return (
    <div className={prefix}>
      <div className={headerPrefix}>
        {navigationRender()}
        {!profileHide && prefileRender()}
        {advertiseRender()}
      </div>
      <div className={containerPrefix}>
        <Outlet></Outlet>
      </div>
    </div>
  );
});

export default Layout;
