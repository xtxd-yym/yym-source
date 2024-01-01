import Mock from 'mockjs';

const domain = '/api/';

// 模拟login接口
// Mock.mock(domain + 'login', function () {
//     let result = {
//         code: 200,
//         message: 'OK',
//         data: {
//             loginUid: 10000,
//             nickname: '兔子先生',
//             token: 'yyds2023',
//         },
//     }
//     return result
// })

//模拟用户config接口
Mock.mock(domain + 'getUserConfig', function () {
  let result = {
    userinfo: {
      username: 'xtxdyym1',
      avatar: '/src/assert/image/a3.gif',
      level: 1,
      post: 145,
      signature: 'life goes on!',
    },
    websietInfo: [
      { id: 'today', title: '今日:', value: '16970' },
      { id: 'yestoday', title: '昨日:', value: '14548' },
      { id: 'highest', title: '最高日:', value: '35779' },
      { id: 'mardRead', title: '标记已读', value: '' },
      { id: 'newPost', title: '最新帖子', value: '' },
      { id: 'rss', title: 'RSS', value: '' },
      { id: 'theme', title: '主题:', value: '1865573' },
      { id: 'post', title: '帖子:', value: '29295193' },
      { id: 'member', title: '会员:', value: '1970397' },
      { id: 'newMember', title: '新会员', value: 'huan985' },
    ],
    hotModule: [
      { name: '免空资源区', link: '' },
      { name: '茶馆', link: '' },
      { name: '同人音声', link: '' },
      { name: '询问&求物', link: '' },
      { name: '实用动画', link: '' },
      { name: '网赚资源区', link: '' },
    ],
  };
  return result;
});
