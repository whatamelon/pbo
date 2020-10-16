import {
    getMyContentsListAPI,
    getBeforeContentsListAPI
} from "@/api/contents";

const CONTENTS = {
    state() {
      return {
        MC_PRODUCT_LIST: [],
        BC_PRODUCT_LIST: [],
        MC_TOT_CNT: 0,
        MC_LIST_CNT:0,
        MC_OFFSET:0,
        MC_LIMIT:30,
        SELECT_ITEM:{},
        SELECT_OPTIONS:{},
      };
    },
  
    getters: {

      MC_PRODUCT_LIST: state => {
            return state.MC_PRODUCT_LIST;
        },

        BC_PRODUCT_LIST: state => {
              return state.BC_PRODUCT_LIST;
          },

        MC_TOT_CNT: state => {
            return state.MC_TOT_CNT;
        },

        MC_LIST_CNT: state => {
            return state.MC_LIST_CNT;
        },

        MC_OFFSET: state => {
            return state.MC_OFFSET;
        },

        MC_LIMIT: state => {
            return state.MC_LIMIT;
        },

        SELECT_ITEM: state => {
            return state.SELECT_ITEM;
        },

        SELECT_OPTIONS: state => {
            return state.SELECT_OPTIONS;
        },
    },
  
    mutations: {

        SET_MC_PRODUCT_LIST(state, payload) {
            state.MC_PRODUCT_LIST = payload;
        },

        SET_BC_PRODUCT_LIST(state, payload) {
            state.BC_PRODUCT_LIST = payload;
        },

        SET_MC_TOT_CNT(state, payload) {
            state.MC_TOT_CNT = payload;
        },

        SET_MC_LIST_CNT(state, payload) {
            state.MC_LIST_CNT = payload;
        },

        SET_MC_OFFSET(state, payload) {
            state.MC_OFFSET = payload;
        },

        SET_MC_LIMIT(state, payload) {
            state.MC_LIMIT = payload;
        },

        SET_SELECT_ITEM(state, payload) {
            state.SELECT_ITEM = payload;
        },

        SET_SELECT_OPTIONS(state, payload) {
            state.SELECT_OPTIONS = payload;
        },
    },
  
    actions: {

        setMcOffset({ commit }, offset) {
            commit("SET_MC_OFFSET", offset);
          },
      
          setMcLimit({ commit }, payload) {
            commit("SET_MC_LIMIT", payload);
          },

        setMcProductList({ commit }, productList) {
            commit("SET_MC_PRODUCT_LIST", productList);
        },
    
        resetMcProductList({ commit }) {
            commit("SET_MC_PRODUCT_LIST", []);
        },

        getMyContentsList: ({ commit }, payload) =>
        new Promise(async (resolve, reject) => {
          try {
            const response = await getMyContentsListAPI(payload);
            console.log(response.result);
            if (response.status === 200) {
              commit("SET_MC_PRODUCT_LIST", response.result.ncontList);
            } 
            resolve(response.status);
          } catch (e) {
            reject(e);
          }
        }),

        getBeforeContentsList: ({ commit }, payload) =>
        new Promise(async (resolve, reject) => {
          try {
            const response = await getBeforeContentsListAPI(payload);
            console.log(response.result);
            if (response.status === 200) {
              commit("SET_BC_PRODUCT_LIST", response.result.nitemList);
            } 
            resolve(response.status);
          } catch (e) {
            reject(e);
          }
        }),
    
        setSelectItem({ commit },payload) {
            commit("SET_SELECT_ITEM", payload);
        },
    
        setSelectOption({ commit },payload) {
            commit("SET_SELECT_OPTIONS", payload);
        },

    }
  };
  
  export default CONTENTS;