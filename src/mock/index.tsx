import { AnyObject } from 'antd/es/_util/type';
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

//模拟首页获取new module data接口
Mock.mock(domain + 'getHomeNewModuleData', function () {
  let result = [
    { title: '最新讨论', listData: ['如果你的真的很大', '有女友,妻子的各位', '斑竹啥时候', '有没有大佬', '绝剑女校'] },
    { title: '最新回复', listData: ['如果你的真的很大', '有女友,妻子的各位', '斑竹啥时候', '有没有大佬', '绝剑女校'] },
    { title: '同人音声', listData: ['如果你的真的很大', '有女友,妻子的各位', '斑竹啥时候', '有没有大佬', '绝剑女校'] },
    { title: '提问求物', listData: ['如果你的真的很大', '有女友,妻子的各位', '斑竹啥时候', '有没有大佬', '绝剑女校'] },
  ];
  return result;
});

//模拟获取各类table data接口
Mock.mock(domain + 'getSourceTableData', function (params: AnyObject = {}) {
  const {body = ""} = params;
  const result: any = {};

  switch(JSON.parse(body)?.type) {
    case 'diffuse':
      result.tableData = [
        {key: '1', number: '22', plate: 'CG资源', latest: '活久见', path: '/cg'},
        {key: '2', number: '33', plate: '同人音声', latest: '负债字长', path: '/music'},
        {key: '3', number: '55', plate: '实用动画', latest: '也谈人', path: '/animation'},
        {key: '4', number: '66', plate: '实用漫画', latest: '香蕉也不行了', path: '/comic'},
        {key: '5', number: '77', plate: '游戏资源', latest: '天赐', path: '/game'},
        {key: '6', number: '88', plate: 'COSPLAY', latest: '风你哦没人', path: '/cosplay'},
      ]

      result.dataIndex = [
        'plate',
        'number',
        'latest',
      ]
  }

  return result;
});
