import axios from 'axios'
var request = axios.create({
  baseURL: 'http://develop.gangwaninfo.com:9999'
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response.data
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

const get = (url, data) => request.get(url, {
  params: data
})

const post = (url, data) => request.post(url, data)

export {
  get,
  post
}
