import {
  getOrderListAPI,
  getOrderItemListAPI
  // getOrderProcessListAPI,
  // getOrderRequestConfirmListAPI,
  // addOrderProcess
} from '@/api/order'

const state = {
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
  getOrderList({ commit }, params) {
    const { offset, limit, orderId, dateFrom, dateTo } = params
    new Promise((resolve, reject) => {
      getOrderListAPI({
        offset: offset,
        limit: limit,
        orderId: orderId,
        dateFrom: dateFrom,
        dateTo: dateTo
      }).then(
        response => {
          // commit('SET_USERROLE', response['result']['role'])
          console.log(response)
          resolve(response)
        }).catch(error => {
        reject(error)
      })
    })
  },

  getOrderItemList({ commit }, orderId) {
    console.log(orderId)
    new Promise((resolve, reject) => {
      getOrderItemListAPI({
        orderId
      }).then(
        response => {
          // commit('SET_USERROLE', response['result']['role'])
          console.log(response)
          resolve()
        }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
