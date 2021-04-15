import axios from "axios";
import cookie from "js-cookie";

const service = axios.create({
  baseURL: 'http://localhost:80',
  timeout: 5000
})

// 设置拦截器
service.interceptors.request.use(
  config => {
    if (cookie.get('token')) {
      // 把cookie值放入header
      config.headers['token'] = cookie.get('token')
    }
    return config
  }
)

export default service