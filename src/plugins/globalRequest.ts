import {extend} from 'umi-request'
import {message} from "antd";
import {history} from "umi";
import {stringify} from "querystring";


/**
 * 配置Request请求时的默认参数
 */
const request = extend({
  credentials: 'include',//默认是否带上cookie
  prefix: process.env.NODE_ENV === 'production' ? 'http://thisdcw.fun' : undefined
  // requestType:'form'
})

/**
 * 所有请求拦截器
 */
request.interceptors.request.use((url, options): any => {
  console.log(`do request url = ${url}`)

  return {
    url,
    options: {
      ...options,
      headers: {}
    }
  }
})

/**
 * 所有响应拦截器
 */
request.interceptors.response.use(async (response, options): Promise<any> => {
  const res = await response.clone().json();
  if (res.code === 200) {
    return res.data;
  }
  if (res.code === 40100) {
    message.error('请先登录')
    history.replace({
      pathname: '/user/login',
      search: stringify({
        redirect: location.pathname,
      })
    })
  } else {
    message.error(res.description)
  }
  return res.data;
})

export default request;
