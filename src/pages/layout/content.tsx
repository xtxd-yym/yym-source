import { memo, useCallback, useEffect, useState, useContext } from 'react';
import { Popover } from 'antd';
import { DownOutlined, UpOutlined, MailTwoTone, PlusOutlined, EditFilled, CaretRightFilled } from '@ant-design/icons';
import './style/index.less';
import { Outlet, useNavigate } from 'react-router-dom';
import { SourceLayoutPrefix, SourceHeaderPrefix, SourceContainerPrefix } from '@/constant/styles/index';
import { getUserConfig } from '@/api/content';
import { AuthContext } from '@/router/authcomp';
import leftAdvertise from '@/assert/image/masha5-1.gif';
import rightAdvertise from '@/assert/image/masha5-2.png';
import defaultAvatar from '@/assert/image/a3.gif';

interface UserInfoType {
  avatar: string;
  level: number;
  post: number;
  signature: string;
}

interface WebsiteInfoType {
  id: string;
  title: string;
  value: string;
}

interface HotModuleType {
  name: string;
  link: string;
}

const Layout = memo(() => {
  const prefix = SourceLayoutPrefix;
  const headerPrefix = SourceHeaderPrefix;
  const containerPrefix = SourceContainerPrefix;
  const navigate = useNavigate();

  const auth = useContext(AuthContext);
  //当前登录的用户名称
  const [username, setUsername] = useState<string>(auth?.username || '');
  //个人信息栏显隐状态
  const [profileHide, setProfileHide] = useState<boolean>(false);
  //当前右侧tab栏选中值
  const [tabChoice, setTabChoice] = useState<string>('discuss');
  //当前用户信息集合
  const [userInfo, setUserInfo] = useState<UserInfoType>({
    avatar: defaultAvatar, //用户头像
    level: 1, //用户等级
    post: 0, //用户帖子数
    signature: '', //用户签名
  });
  //热门板块导航合集
  const [hotModule, setHotModule] = useState<HotModuleType[]>([]);
  //当前网站信息集合
  const [websiteInfo, setWebsiteInfo] = useState<WebsiteInfoType[]>([]);

  useEffect(() => {
    const params = {};
    getUserConfig(params)
      .then((res) => {
        if (res?.status === 200) {
          const { userinfo = {}, websietInfo = [], hotModule = [] } = res.data || {};
          setUsername(userinfo.username || '');
          setUserInfo({
            avatar: userinfo.avatar || '',
            level: userinfo.level,
            post: userinfo.post,
            signature: userinfo.signature || '',
          });
          setWebsiteInfo(websietInfo);
          setHotModule(hotModule);
        } else {
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  //退出按钮点击回调
  const loginOut = useCallback(() => {
    localStorage.setItem("isLogin", "false");
    localStorage.removeItem("username");
    auth?.changeIsLogin(false);
    navigate('/login');
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
          <div className={`${headerPrefix}-navigation-left-loginout`} onClick={loginOut}>退出</div>
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
    const { avatar, level, post, signature } = userInfo;
    return (
      <div className={`${headerPrefix}-profile`}>
        <div className={`${headerPrefix}-profile-left`}>
          <div className={`${headerPrefix}-profile-left-avatar`}>
            <img src={avatar} alt="头像"></img>
          </div>
          <div className={`${headerPrefix}-profile-left-container`}>
            <div className={`${headerPrefix}-profile-left-container-top`}>
              <div
                className={`${headerPrefix}-profile-left-container-top-info`}
              >{`等级:Lv.${level}, 帖子:${post}`}</div>
              <div className={`${headerPrefix}-profile-left-container-top-theme`}>我的主题</div>
              <div className={`${headerPrefix}-profile-left-container-top-reply`}>我的回复</div>
              <div className={`${headerPrefix}-profile-left-container-top-add`}>
                <Popover
                  title={''}
                  content={
                    <div className={`${headerPrefix}-profile-left-container-top-add-popup`}>
                      <div className={`${headerPrefix}-profile-left-container-top-add-popup-first`}>个人首页</div>
                      <div className={`${headerPrefix}-profile-left-container-top-add-popup-second`}>我的收藏</div>
                      <div className={`${headerPrefix}-profile-left-container-top-add-popup-third`}>好友近况</div>
                    </div>
                  }
                >
                  <PlusOutlined />
                </Popover>
              </div>
            </div>
            <div className={`${headerPrefix}-profile-left-container-bottom`}>
              <div className={`${headerPrefix}-profile-left-container-bottom-pre`}>
                {signature || '您还没有设置个性签名'}
              </div>
              <div className={`${headerPrefix}-profile-left-container-bottom-mid`} title={'编辑'}>
                <EditFilled />
              </div>
            </div>
          </div>
        </div>
        <div className={`${headerPrefix}-profile-right`}>
          {tabChoice !== 'discuss' ? (
            <>
              <div className={`${headerPrefix}-profile-right-title`}>热门板块:</div>
              <div className={`${headerPrefix}-profile-right-container`}>
                {hotModule.map((item) => (
                  <div className={`${headerPrefix}-profile-right-container-module`}>
                    <div className={`${headerPrefix}-profile-right-container-module-icon`}>
                      <CaretRightFilled />
                    </div>
                    <div className={`${headerPrefix}-profile-right-container-module-name`}>{item?.name || ''}</div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className={`${headerPrefix}-profile-right-container`}>
              {websiteInfo.map((item) => (
                <div className={`${headerPrefix}-profile-right-container-website ${item?.id || ''}`}>
                  <div className={`${headerPrefix}-profile-right-container-websiteInfo-title`}>{item?.title || ''}</div>
                  <div className={`${headerPrefix}-profile-right-container-websiteInfo-value`}>{item?.value || ''}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }, [userInfo, hotModule, websiteInfo, tabChoice]);

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
