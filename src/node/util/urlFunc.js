//获取url中参数的方法
export const getUrlParams = (url = '') => {
  const ret = {};

  url
    .match(/(.*)/)?.[1]
    ?.split('&')
    ?.forEach((val = '') => {
      ret[val.split('=')?.[0]] = val.split('=')?.[1];
    });

  return ret;
};
