import axios from 'axios'
// import { getToken } from '@/utils/auth'

const ax = axios.create({
  baseURL: 'https://admin.pickling.kr'
})

ax.defaults.timeout = 12000

ax.interceptors.request.use(
  request => {
    request.headers.Authorization = localStorage.getItem('token') ? localStorage.getItem('token') : null
    return request
  },
  error => Promise.reject(error)
)

ax.interceptors.response.use(
  response => {
    const accessToken = response.headers.authorization
    if (accessToken) {
      localStorage.token = accessToken
    }
    response.data.accessToken = accessToken !== null ? accessToken : null
    return response.data
  },
  error => Promise.reject(error)
)

export default ax

// import axios from 'axios'
// import { MessageBox, Message } from 'element-ui'
// import store from '@/store'
// import { getToken } from '@/utils/auth'

// // create an axios instance
// const service = axios.create({
//   baseURL: 'https://admin.pickling.kr',
//   // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
//   // withCredentials: true, // send cookies when cross-domain requests
//   timeout: 12000 // request timeout
// })

// // request interceptor
// service.interceptors.request.use(
//   request => {
//     if (store.getters.token) {
//       // let each request carry token
//       // ['X-Token'] is a custom headers key
//       // please modify it according to the actual situation
//       request.headers.Authorization = getToken()
//     }
//     return request
//   },
//   error => Promise.reject(error)
// )

// // response interceptor
// service.interceptors.response.use(
//   /**
//    * If you want to get http information such as headers or status
//    * Please return  response => response
//   */

//   /**
//    * Determine the request status by custom code
//    * Here is just an example
//    * You can also judge the status by HTTP Status Code
//    */
//   response => {
//     const res = response.data

//     // if the custom code is not 20000, it is judged as an error.
//     if (res.code !== 20000) {
//       console.log('response : ', res)
//       Message({
//         message: res.message || 'Error',
//         type: 'error',
//         duration: 5 * 1000
//       })

//       // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
//       if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
//         console.log('response : ', res)
//         // to re-login
//         MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
//           confirmButtonText: 'Re-Login',
//           cancelButtonText: 'Cancel',
//           type: 'warning'
//         }).then(() => {
//           store.dispatch('user/resetToken').then(() => {
//             location.reload()
//           })
//         })
//       }
//       return Promise.reject(new Error(res.message || 'Error'))
//     } else {
//       console.log('response : ', res)
//       return res
//     }
//   },
//   error => {
//     console.log('err' + error) // for debug
//     Message({
//       message: error.message,
//       type: 'error',
//       duration: 5 * 1000
//     })
//     return Promise.reject(error)
//   }
// )

// export default service
