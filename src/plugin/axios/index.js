import axios from 'axios'
import util from '@/libs/util'
import { MessageBox } from 'element-ui'

// 创建一个 axios 实例
const service = axios.create({
  timeout: 5000 // 请求超时时间
})

// 信息提示
const messageBox = (message) => {
  util.cookies.remove('token')
  MessageBox.alert(message, '提示', {
    confirmButtonText: '确定',
    type: 'warning',
    callback: action => {
      window.location.href = '/'
    }
  })
}

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在请求发送之前做一些处理
    const token = util.cookies.get('token')
    // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    config.headers['token'] = token
    return config
  },
  error => {
    // 发送失败
    Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    // dataAxios 是 axios 返回数据中的 data
    const dataAxios = response.data
    // 根据 code 进行判断
    return dataAxios
  },
  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400: error.message = '请求错误'; break
        case 401: error.message = '未授权，请登录'; break
        case 403: error.message = '拒绝访问'; break
        case 404: error.message = `请求地址出错: ${error.response.config.url}`; break
        case 408: error.message = '请求超时'; break
        case 500: error.message = '服务器内部错误'; break
        case 501: error.message = '服务未实现'; break
        case 502: error.message = '网关错误'; break
        case 503: error.message = '服务不可用'; break
        case 504: error.message = '网关超时'; break
        case 505: error.message = 'HTTP版本不受支持'; break
        default: break
      }
    }
    return Promise.reject(error)
  }
)

// 返回拦截器
export default service

// 返回一个Promise(发送post请求)
export function fetchPost (url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

// 返回一个Promise(发送get请求)
export function fetchGet (url, param) {
  return new Promise((resolve, reject) => {
    axios.get(url, { params: param })
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

// 返回一个Promise(发送post请求带token)
export function fetchPostToken (url, params) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: url,
      headers: { 'token': util.cookies.get('token') },
      data: params
    }).then(response => {
      if (response.data.code === 1002 || response.data.code === 1003) {
        messageBox(response.data.msg)
      } else {
        resolve(response.data)
      }
    }).catch(error => {
      reject(error)
    })
  })
}

// 返回一个Promise(发送get请求带token)
export function fetchGetToken (url, param) {
  return new Promise((resolve, reject) => {
    axios.get(url, { params: param, headers: { 'token': util.cookies.get('token') } })
      .then(response => {
        if (response.data.code === 1002 || response.data.code === 1003) {
          messageBox(response.data.msg)
        } else {
          resolve(response.data)
        }
      }, err => {
        reject(err)
      }).catch((error) => {
        reject(error)
      })
  })
}

// 返回一个Promise(发送Upload上传请求带token)
export function fetchPostUpload (url, params) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: url,
      headers: {
        'Content-Type': 'multipart/form-data',
        'token': util.cookies.get('token'),
        platform: 2
      },
      data: params
    }).then(response => {
      if (response.data.code === 1002 || response.data.code === 1003) {
        messageBox(response.data.msg)
      } else {
        resolve(response.data)
      }
    }).catch(error => {
      reject(error)
    })
  })
}
