import {
  getOrderListAPI,
  getOrderItemListAPI
} from "@/api/order";

const order = {
  state() {
    return {
      ORDER_LIST:[],
      ORDER_ID:"",
      DATE_FROM: "200701",
      DATE_TO: "200825",
      OFFSET: 0,
      TOTAL_CNT:0,
      ORDER_ITEM_LIST:[]
    };
  },

  getters: {
    ORDER_LIST: state => {
      return state.ORDER_LIST;
    },

    ORDER_ID: state => {
      return state.ORDER_ID;
    },
    
    DATE_FROM: state => {
      return state.DATE_FROM;
    },
    
    DATE_TO: state => {
      return state.DATE_TO;
    },

    TOTAL_CNT: state => {
      return state.TOTAL_CNT;
    },

    OFFSET: state => {
      return state.OFFSET;
    },

    ORDER_ITEM_LIST: state => {
      return state.ORDER_ITEM_LIST;
    },

  },

  mutations: {
    SET_ORDER_LIST(state, payload) {
      state.ORDER_LIST = payload;
    },

    SET_ORDER_ID(state, payload) {
      state.ORDER_ID = payload;
    },

    SET_DATE_FROM(state, payload) {
      state.DATE_FROM = payload;
    },

    SET_DATE_TO(state, payload) {
      state.DATE_TO = payload;
    },

    SET_OFFSET(state, payload) {
      state.OFFSET = payload;
    },

    SET_TOTAL_CNT(state, payload) {
      state.TOTAL_CNT = payload;
    },

    SET_OFFSET_SAVED_PRODUCTS(state, payload) {
      state.OFFSET_SAVED_PRODUCTS = payload;
    },

    SET_ORDER_ITEM_LIST(state, payload) {
      state.ORDER_ITEM_LIST = payload;
    },
  },

  actions: {
    
    getOrderList: ({ getters, commit, dispatch }) =>
    new Promise(async (resolve, reject) => {
        const params = {
          offset: getters.OFFSET,
          limit: 30,
          orderId: getters.ORDER_ID,
          dateFrom: getters.DATE_FROM,
          dateTo: getters.DATE_TO
        };
      try {
        const response = await getOrderListAPI(params);
        if (response.status === 200) {
          const items = response.result.totCnt;
          const remainder = items%30;
          const totalPages = items/30;
          console.log(totalPages)
          console.log(response)
          if(remainder == 0) {
            dispatch("setTotalPageNumber", totalPages);
          }
          else {
            dispatch("setTotalPageNumber", Math.ceil(totalPages));
          }
          commit("SET_ORDER_LIST", response.result.orderList);
        }

        resolve(response);
      } catch (error) {
        reject(error);
      }
    }),

    getOrderItemList: ({ getters, commit, dispatch }, orderId) =>
    new Promise(async (resolve, reject) => {
      try {
        console.log(orderId)
        const response = await getOrderItemListAPI(orderId);
        if (response.status === 200) {
          const items = response.result;
          console.log(items)
          const remainder = items%30;
          const totalPages = items/30;
          console.log(totalPages)
          console.log(response)
          if(remainder == 0) {
            dispatch("setTotalPageNumber", totalPages);
          }
          else {
            dispatch("setTotalPageNumber", Math.ceil(totalPages));
          }
          commit("SET_ORDER_ITEM_LIST", items);
        }

        resolve(response);
      } catch (error) {
        reject(error);
      }
    }),

    setOffset({ commit }, payload) {
      commit("SET_OFFSET", payload);
    },

    resetOffset({ commit }) {
      commit("SET_OFFSET", 0);
    },

     }
};

export default order;
