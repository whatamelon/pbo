import {
    getMyContentsListAPI,
    getBeforeContentsListAPI,
    sendContentsImageAPI,
    deleteContentsImageAPI,
    getContentsImageAPI,
    changeContentsImageIndexAPI,
    registerContentsAPI,
    changeContentsAPI,
    sendConfirmRequireAPI
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
        CONTS_IMG_TITLE_LINK:'',
        CONTS_IMG_DETAIL_LIST:[],
        CONTS_IMG_FRONT_LIST:[],
        CONTS_IMG_PART_LIST:[],
        NCONTS_ID:'',
        CONTENTS_STATUS:'',
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

        CONTS_IMG_TITLE_LINK: state => {
            return state.CONTS_IMG_TITLE_LINK;
        },

        CONTS_IMG_DETAIL_LIST: state => {
            return state.CONTS_IMG_DETAIL_LIST;
        },

        CONTS_IMG_FRONT_LIST: state => {
            return state.CONTS_IMG_FRONT_LIST;
        },

        CONTS_IMG_PART_LIST: state => {
            return state.CONTS_IMG_PART_LIST;
        },

        NCONTS_ID: state => {
            return state.NCONTS_ID;
        },

        CONTENTS_STATUS: state => {
            return state.CONTENTS_STATUS;
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

        SET_CONTS_IMG_TITLE_LINK(state, payload) {
            state.CONTS_IMG_TITLE_LINK = payload;
        },

        SET_CONTS_IMG_DETAIL_LIST(state, payload) {
            state.CONTS_IMG_DETAIL_LIST = payload;
        },

        SET_CONTS_IMG_FRONT_LIST(state, payload) {
            state.CONTS_IMG_FRONT_LIST = payload;
        },

        SET_CONTS_IMG_PART_LIST(state, payload) {
            state.CONTS_IMG_PART_LIST = payload;
        },

        SET_NCONTS_ID(state, payload) {
            state.NCONTS_ID = payload;
        },

        SET_CONTENTS_STATUS(state, payload) {
            state.CONTENTS_STATUS = payload;
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

        setNcontsID({ commit }, id) {
            commit("SET_NCONTS_ID", id);
        },

        setContentsStatus({ commit }, status) {
            commit("SET_CONTENTS_STATUS", status);
        },

        setSelectItem({ commit },payload) {
            commit("SET_SELECT_ITEM", payload);
        },
    
        setSelectOption({ commit },payload) {
            commit("SET_SELECT_OPTIONS", payload);
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
    

        sendContentsImage: ({ commit }, payload) =>
        new Promise(async (resolve, reject) => {
          try {
            console.log('3')
            console.log(payload)
            const response = await sendContentsImageAPI(payload[0], payload[1], payload[2], payload[3]);
            console.log(response.result);
            resolve(response.status);
          } catch (e) {
            reject(e);
          }
        }),

        deleteContentsImage: ({ commit }, payload) =>
        new Promise(async (resolve, reject) => {
          try {
            const response = await deleteContentsImageAPI(payload[0], payload[1], payload[2]);
            console.log(response.result);
            resolve(response.status);
          } catch (e) {
            reject(e);
          }
        }),

        getContentsImage: ({ commit }, payload) =>
        new Promise(async (resolve, reject) => {
          try {
            const response = await getContentsImageAPI(payload);
            console.log(response.result);
            if (response.status === 200) {
              commit("SET_CONTS_IMG_TITLE_LINK", response.result.imgLinkTitle);
              commit("SET_CONTS_IMG_DETAIL_LIST", response.result.imgListDetail);
              commit("SET_CONTS_IMG_FRONT_LIST", response.result.imgListFront);
              commit("SET_CONTS_IMG_PART_LIST", response.result.imgListPart);
            } 
            resolve(response.status);
          } catch (e) {
            reject(e);
          }
        }),

        changeContentsImageIndex: ({ commit }, payload) =>
        new Promise(async (resolve, reject) => {
          try {
            const response = await changeContentsImageIndexAPI(payload[0], payload[1], payload[2]);
            console.log(response.result);
            resolve(response.status);
          } catch (e) {
            reject(e);
          }
        }),

        registerContents: ({ commit }, payload) =>
        new Promise(async (resolve, reject) => {
          try {
            const response = await registerContentsAPI(payload);
            console.log(response.result);
            if (response.status === 200) {
              commit("SET_NCONTS_ID", response.result);
            }
            resolve(response.status);
          } catch (e) {
            reject(e);
          }
        }),

        changeContents: ({ commit },payload) =>
        new Promise(async (resolve, reject) => {
          try {
            console.log(payload)
            const response = await changeContentsAPI(payload[0], payload[1]);
            console.log(response.result);
            resolve(response.status);
          } catch (e) {
            reject(e);
          }
        }),

        sendConfirmRequire: ({ commit }, id) =>
        new Promise(async (resolve, reject) => {
          try {
            const response = await sendConfirmRequireAPI(id);
            console.log(response.result);
            resolve(response.status);
          } catch (e) {
            reject(e);
          }
        }),

    }
  };
  
  export default CONTENTS;