import ax from '@/utils/request'

export function adminLoginAPI(data) {
  console.log(data)
  return ax({
    url: '/admin/sign',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return ax({
    url: '/vue-element-admin/user/info',
    method: 'get',
    params: { token }
  })
}
