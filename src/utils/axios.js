import axios from 'axios'
import { Toast } from 'antd-mobile'

console.log('process.NODE_ENV', process.env.NODE_ENV)
axios.defaults.baseURL = process.env.NODE_ENV == 'development' ? '//localhost:7001' : '//47.99.134.126:7002'
axios.defaults.withCredentials = true
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.post['Content-Type'] = 'application/json'

axios.interceptors.response.use(res => {
  if (typeof res.data !== 'object') {
    console.error('数据格式响应错误:', res.data)
    Toast.fail('服务端异常！')
    return Promise.reject(res)
  }
  if (res.data.status != 200) {
    if (res.data.message) Toast.error(res.data.message)
    return Promise.reject(res.data)
  }
  return res.data
})

export default axios
