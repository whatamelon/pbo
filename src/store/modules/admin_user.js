import { adminLoginAPI } from '@/api/admin_user'
import { getToken, setToken, removeToken } from '@/utils/auth'
// import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  userRole: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_USERROLE: (state, userRole) => {
    state.userRole = userRole
  }
}

const actions = {
  login({ commit }, userInfo) {
    const { adminId, passwd } = userInfo
    new Promise((resolve, reject) => {
      adminLoginAPI({ adminId: adminId, passWd: passwd, passwd2: '' }).then(
        response => {
          commit('SET_TOKEN', response['result']['authToken'])
          commit('SET_USERROLE', response['result']['role'])
          localStorage.setItem('token', response['result']['authToken'])
          console.log(response['result']['authToken'])
          console.log(response['result']['role'])
          setToken(response['result']['authToken'])
          commit('SET_ROLES', 'admin')
          commit('SET_NAME', 'denny')
          resolve()
        }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  }

  // dynamically modify permissions
  // async changeRoles({ commit, dispatch }, role) {
  //   const token = role + '-token'

  //   commit('SET_TOKEN', token)
  //   setToken(token)

  //   const { roles } = await dispatch('getInfo')

  //   resetRouter()

  //   // generate accessible routes map based on roles
  //   const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
  //   // dynamically add accessible routes
  //   router.addRoutes(accessRoutes)

  //   // reset visited views and cached views
  //   dispatch('tagsView/delAllViews', null, { root: true })
  // }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
