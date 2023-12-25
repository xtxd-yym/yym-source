//获取url中参数的方法
export const getUrlParams = (url: string = '') => {
  const ret: any = {};
  url.match(/[\?(.*)]/)?.[1]?.split('&')?.forEach((val: string = "") => {
    ret[val.split('=')?.[0]] = val.split('=')?.[1];
  });

  return ret;
};
