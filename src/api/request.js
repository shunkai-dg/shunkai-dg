import axios from "axios";
import { getToken } from "@/utils/auth";

// baseURL 同域（VUE_APP_BASE_API=''），开发环境由 devServer.proxy 代理 /api
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  withCredentials: true,
  timeout: 30000,
});

// 请求拦截器：注入 Authorization / platform（原产物 app.js b775）
service.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = token;
    }
    config.headers["platform"] = "pc"; // TODO: 以实际抓包值为准
    return config;
  },
  (error) => Promise.reject(error),
);

// 响应拦截器：直接返回 data，responseText 兜底（原产物 app.js b775）
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (
      typeof res === "string" &&
      response.request &&
      response.request.responseText
    ) {
      try {
        return JSON.parse(response.request.responseText);
      } catch (e) {
        return res;
      }
    }
    return res;
  },
  (error) => Promise.reject(error),
);

export default service;
