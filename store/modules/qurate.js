import { 
    getQurateListAPI,
    getQurateInfoAPI,
    getQuratorInfoAPI,
    getQuratorQurationAPI
} 
from "@/api/qurate";

const QURATE = {
  state() {
    return {
      QURATE_TOTCNT: "",
      QURATE_LISTCNT: "",
      Q_LIST: [],
      Q_POP_LIST:[],
      Q_NEW_LIST:[],
      Q_INFO: "",
      Q_OFFSET: 0,
      Q_MODEL_LIST:[],
      Q_CAT_LIST:[],
      Q_KINDS:"",
      Q_USER_ID:'',
      Q_USER_NAME:'',
      Q_USER_DEPARTMENT:'',
      Q_USER_IMG_LINK_TITLE:'',
      Q_USER_MY_EXP:'',
      Q_USER_STYLE_EXP:'',
      Q_USER_LIKE_BRAND:'',
      Q_USER_INFO:[],
      Q_USER_TAG_LIST:[],
      Q_USER_IMG_LIST:[],
      Q_USER_SNS:[],
      Q_USER_LSTYLE:[],
      Q_USER_DSTYLE:[],
      Q_USER_QU_LIST:[],
      QURATE_HISTORY_LIST:[],
    };
  },

  getters: {
    QURATE_TOTCNT: state => {
      return state.QURATE_TOTCNT;
    },

    QURATE_LISTCNT: state => {
      return state.QURATE_LISTCNT;
    },
    
    Q_LIST: state => {
      return state.Q_LIST;
    },
    
    Q_POP_LIST: state => {
      return state.Q_POP_LIST;
    },
    
    Q_NEW_LIST: state => {
      return state.Q_NEW_LIST;
    },
    
    Q_INFO: state => {
      return state.Q_INFO;
    },

    Q_OFFSET: state => {
      return state.Q_OFFSET;
    },

    Q_MODEL_LIST: state => {
      return state.Q_MODEL_LIST;
    },

    Q_CAT_LIST: state => {
      return state.Q_CAT_LIST;
    },

    Q_KINDS: state => {
      return state.Q_KINDS;
    },

    Q_USER_ID: state => {
      return state.Q_USER_ID;
    },

    Q_USER_NAME: state => {
      return state.Q_USER_NAME;
    },

    Q_USER_DEPARTMENT: state => {
      return state.Q_USER_DEPARTMENT;
    },

    Q_USER_IMG_LINK_TITLE: state => {
      return state.Q_USER_IMG_LINK_TITLE;
    },

    Q_USER_MY_EXP: state => {
      return state.Q_USER_MY_EXP;
    },

    Q_USER_STYLE_EXP: state => {
      return state.Q_USER_STYLE_EXP;
    },

    Q_USER_LIKE_BRAND: state => {
      return state.Q_USER_LIKE_BRAND;
    },

    Q_USER_INFO: state => {
      return state.Q_USER_INFO;
    },

    Q_USER_TAG_LIST: state => {
      return state.Q_USER_TAG_LIST;
    },

    Q_USER_IMG_LIST: state => {
      return state.Q_USER_IMG_LIST;
    },

    Q_USER_SNS: state => {
      return state.Q_USER_SNS;
    },

    Q_USER_LSTYLE: state => {
      return state.Q_USER_LSTYLE;
    },

    Q_USER_DSTYLE: state => {
      return state.Q_USER_DSTYLE;
    },

    Q_USER_QU_LIST: state => {
      return state.Q_USER_QU_LIST;
    },

    QURATE_HISTORY_LIST: state => {
      return state.QURATE_HISTORY_LIST;
    },
  },

  mutations: {
    SET_QURATE_TOTCNT(state, payload) {
      state.QURATE_TOTCNT = payload;
    },

    SET_QURATE_LISTCNT(state, payload) {
      state.QURATE_LISTCNT = payload;
    },
    
    SET_Q_LIST(state, payload) {
      state.Q_LIST = payload;
    },
    
    ADD_Q_LIST(state, payload) {
        state.Q_LIST = state.Q_LIST.concat(payload);
    },
    
    SET_Q_POP_LIST(state, payload) {
      state.Q_POP_LIST = payload;
    },
    
    SET_Q_NEW_LIST(state, payload) {
      state.Q_NEW_LIST = payload;
    },

    SET_Q_INFO(state, payload) {
      state.Q_INFO = payload;
    },

    SET_Q_OFFSET(state, payload) {
      state.Q_OFFSET = payload;
    },

    SET_Q_MODEL_LIST(state, payload) {
      state.Q_MODEL_LIST = payload;
    },

    SET_Q_CAT_LIST(state, payload) {
      state.Q_CAT_LIST = payload;
    },

    SET_Q_KINDS(state, payload) {
      state.Q_KINDS = payload;
    },

    SET_Q_USER_ID(state, payload) {
      state.Q_USER_ID = payload;
    },

    SET_Q_USER_NAME(state, payload) {
      state.Q_USER_NAME = payload;
    },

    SET_Q_USER_DEPARTMENT(state, payload) {
      state.Q_USER_DEPARTMENT = payload;
    },

    SET_Q_USER_IMG_LINK_TITLE(state, payload) {
      state.Q_USER_IMG_LINK_TITLE = payload;
    },

    SET_Q_USER_MY_EXP(state, payload) {
      state.Q_USER_MY_EXP = payload;
    },

    SET_Q_USER_STYLE_EXP(state, payload) {
      state.Q_USER_STYLE_EXP = payload;
    },

    SET_Q_USER_LIKE_BRAND(state, payload) {
      state.Q_USER_LIKE_BRAND = payload;
    },

    SET_Q_USER_INFO(state, payload) {
      state.Q_USER_INFO = payload;
    },

    SET_Q_USER_TAG_LIST(state, payload) {
      state.Q_USER_TAG_LIST = payload;
    },

    SET_Q_USER_IMG_LIST(state, payload) {
      state.Q_USER_IMG_LIST = payload;
    },

    SET_Q_USER_SNS(state, payload) {
      state.Q_USER_SNS = payload;
    },

    SET_Q_USER_LSTYLE(state, payload) {
      state.Q_USER_LSTYLE = payload;
    },

    SET_Q_USER_DSTYLE(state, payload) {
      state.Q_USER_DSTYLE = payload;
    },

    SET_Q_USER_QU_LIST(state, payload) {
      state.Q_USER_QU_LIST = payload;
    },

    SET_QURATE_HISTORY_LIST(state, payload) {
      state.QURATE_HISTORY_LIST = payload;
    },

    ADD_TO_QURATE_HISTORY(state, payload) {
      state.QURATE_HISTORY_LIST.push(payload);
    },
  },

  actions: {
    setQoffset({ commit }, payload) {
        commit("SET_Q_OFFSET", payload);
    },

    getQurateList: ({ getters, commit }) =>
    new Promise(async (resolve, reject) => {
      const params = {
        offset: getters.Q_OFFSET,
        limit: 10,
      };
      try {
        const response = await getQurateListAPI(params);
        if (response.status === 200) {
          commit("SET_QURATE_TOTCNT", response.result.totCnt);
          commit("SET_QURATE_LISTCNT", response.result.listCnt);
          commit("SET_Q_LIST", response.result.qitemList);
          commit("SET_Q_POP_LIST", response.result.qpopList);
          commit("SET_Q_NEW_LIST", response.result.qnewList);
        }
        resolve(response);
      } catch (error) {
        reject(error);
      }
    }),
    
    addQurateList: ({ getters, commit }) =>
    new Promise(async (resolve, reject) => {
      const params = {
        offset: getters.Q_OFFSET,
        limit: 10,
      };
      try {
        const response = await getQurateListAPI(params);
        if (response.status === 200) {
          commit("SET_QURATE_TOTCNT", response.result.totCnt);
          commit("SET_QURATE_LISTCNT", response.result.listCnt);
          commit("ADD_Q_LIST", response.result.qitemList);
        }
        resolve(response);
      } catch (error) {
        reject(error);
      }
    }),

    getQurateInfo: ({ getters, commit },itemID) =>
    new Promise(async (resolve, reject) => {
      try {
        const response = await getQurateInfoAPI(itemID);
        if (response.status === 200) {
          commit("SET_Q_MODEL_LIST", response.result.qmodelList);
          commit("SET_Q_CAT_LIST", response.result.catList);
        }
        resolve(response);
      } catch (error) {
        reject(error);
      }
    }),
    
    setQPageInfo({ commit }, params) {
          commit("SET_Q_INFO", params);
    },
    
    setQKind({ commit }, params) {
          commit("SET_Q_KINDS", params);
    },

    
    getQuratorInfo: ({ getters, commit }, quserId) =>
    new Promise(async (resolve, reject) => {
      try {
        const response = await getQuratorInfoAPI(quserId);
        if (response.status === 200) {
          commit("SET_Q_USER_ID", response.result.quserId);
          commit("SET_Q_USER_NAME", response.result.name);
          commit("SET_Q_USER_DEPARTMENT", response.result.department);
          commit("SET_Q_USER_IMG_LINK_TITLE", response.result.imgLinkTitle);
          var modiShoulder = '';
          var modiPelvis = '';
          if(response.result.sizeShoulder == '매우 좁은편' || response.result.sizeShoulder == '매우 넓은편') {
            var modiSh1 = response.result.sizeShoulder.split(" ");
            modiShoulder = modiSh1[0] + "\n" + modiSh1[1];
          } else {
            modiShoulder = response.result.sizeShoulder;
          }

          if(response.result.sizePelvis== '매우 좁은편' || response.result.sizePelvis == '매우 넓은편') {
            var modiPe = response.result.sizePelvis.split(" ");
            modiPelvis = modiPe[0] + "\n" + modiPe[1];
          } else {
            modiPelvis = response.result.sizePelvis;
          }

          const ob1 = {key: '키',value:response.result.sizeHeight};
          const ob2 = {key: '상의',value:response.result.sizeTop};
          const ob3 = {key: '하의',value:response.result.sizeBottom};
          const ob4 = {key: '신발',value:response.result.sizeFoot};
          const ob5 = {key: '어깨',value:modiShoulder};
          const ob6 = {key: '골반',value:modiPelvis};
          var thisUserInfo = [];
          thisUserInfo.push(ob1);
          thisUserInfo.push(ob2);
          thisUserInfo.push(ob3);
          thisUserInfo.push(ob4);
          thisUserInfo.push(ob5);
          thisUserInfo.push(ob6);
          commit("SET_Q_USER_INFO", thisUserInfo);
          console.log(thisUserInfo);
          commit("SET_Q_USER_MY_EXP", response.result.myExp);
          commit("SET_Q_USER_STYLE_EXP", response.result.styleExp);
          commit("SET_Q_USER_LIKE_BRAND", response.result.likeBrand);
          commit("SET_Q_USER_TAG_LIST", response.result.tagList);
          commit("SET_Q_USER_IMG_LIST", response.result.imgList);
          commit("SET_Q_USER_SNS", response.result.snsList);
          commit("SET_Q_USER_LSTYLE", response.result.styleLikeList);
          commit("SET_Q_USER_DSTYLE", response.result.styleDislikeList);
        }
        resolve(response);
      } catch (error) {
        reject(error);
      }
    }),

    getQuratorQurationAPI: ({ getters, commit },quserId) =>
    new Promise(async (resolve, reject) => {
      try {
        const response = await getQuratorQurationAPI(quserId);
        if (response.status === 200) {
          commit("SET_Q_USER_QU_LIST", response.result.qitemList);
        }
        resolve(response);
      } catch (error) {
        reject(error);
      }
    }),

    addQurateHistory({ commit, getters }, params) {
      commit("ADD_TO_QURATE_HISTORY", params);
      console.log('추가한다~~~~~'+params);
    },

    resetQurateHistory({ commit }) {
      commit("SET_QURATE_HISTORY_LIST", []);
    }

  }
};

export default QURATE;
