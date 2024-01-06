import axios from 'axios';
import { getAxiosConfig } from '@/api/index';
import { AnyObject } from 'antd/es/_util/type';

//账号登录请求
export const sourceLogin = (params: AnyObject = {}) => {
  const axiosConfig = getAxiosConfig({
    method: 'post',
    url: '/api/login',
    data: params,
  });
  return axios(axiosConfig);
};

//获取当前用户设置请求
export const getUserConfig = (params: AnyObject = {}) => {
  const axiosConfig = getAxiosConfig({
      method: 'get',
      url: '/api/getUserConfig',
      data: params,
  })
  return  axios(axiosConfig);
}

//获取首页new Module数据
export const getHomeNewModuleData = (params: AnyObject = {}) => {
  const axiosConfig = getAxiosConfig({
      method: 'get',
      url: '/api/getHomeNewModuleData',
      data: params,
  })
  return  axios(axiosConfig);
}

//获取各类table数据
export const getSourceTableData = (params: AnyObject = {}) => {
  const axiosConfig = getAxiosConfig({
      method: 'post',
      url: '/api/getSourceTableData',
      data: params,
  })
  return  axios(axiosConfig);
}