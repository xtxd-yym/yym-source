import axios from 'axios';
import {getAxiosConfig} from "@/api/index";
import { AnyObject } from "antd/es/_util/type";

export const sourceLogin = (params: AnyObject = {}) => {
    const axiosConfig = getAxiosConfig({
        method: 'post',
        url: '/api/login',
        data: params,
    })
    return  axios(axiosConfig);
}