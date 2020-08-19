import 
{ 
  getUserInfoAPI, 
  setUserHeightAPI, 
  userSuggestAPI, 
  setPushFlagAPI
}
   from "@/api/user";

const USER = {
  state() {
    return {
      USER_EMAIL: "",
      USER_HEIGHT: "",
      USER_SNSTYPE: "",
      USER_PUSH : "",
      USER_ID:"",
      USER_EVENT_CODE: [],
      LIKED_PRODUCTS: []
    };
  },

  getters: {
    USER_EMAIL: state => {
      return state.USER_EMAIL;
    },

    USER_HEIGHT: state => {
      return state.USER_HEIGHT;
    },
    
    USER_SNSTYPE: state => {
      return state.USER_SNSTYPE;
    },
    
    USER_PUSH: state => {
      return state.USER_PUSH;
    },
    
    USER_ID: state => {
      return state.USER_ID;
    },
    
    USER_EVENT_CODE: state => {
      return state.USER_EVENT_CODE;
    },

    LIKED_PRODUCTS: state => {
      return state.LIKED_PRODUCTS;
    }
  },

  mutations: {
    SET_USER_EMAIL(state, payload) {
      state.USER_EMAIL = payload;
    },

    SET_USER_HEIGHT(state, payload) {
      state.USER_HEIGHT = payload;
    },
    
    SET_USER_SNSTYPE(state, payload) {
      state.USER_SNSTYPE = payload;
    },
    
    SET_USER_PUSH(state, payload) {
      state.USER_PUSH = payload;
    },
    
    SET_USER_ID(state, payload) {
      state.USER_ID = payload;
    },
    
    SET_USER_EVENT_CODE(state, payload) {
      state.USER_EVENT_CODE = payload;
    },

    SET_LIKED_PRODUCTS(state, payload) {
      state.LIKED_PRODUCTS = payload;
    }
  },

  actions: {

    setEmail({ commit }, payload) {
      commit("SET_USER_EMAIL", payload);
    },

    setHeight({ commit }, payload) {
      commit("SET_USER_HEIGHT", payload);
    },

    sendHeight: ({ commit }, payload) =>
      new Promise(async (resolve, reject) => {
        try {
          await setUserHeightAPI(payload);
          commit("SET_USER_HEIGHT", payload);
          resolve();
        } catch (error) {
          if (error.message.includes("403")) {          
            if (window.AppType == "android" || window.AppType == "android3" ) {
              window.fcjs_if.doTokenExpire()
            }
            if(window.AppType == "ios2" || window.AppType == "ios3"){
              window.webkit.messageHandlers.doTokenExpire.postMessage("")
            }
          }
          reject(error);
        }
      }),

      setUserInfo: ({ commit, dispatch }) =>
      new Promise(async (resolve, reject) => {
        try {
          const response = await getUserInfoAPI();

          commit("SET_USER_EMAIL", response.result.email);
          commit("SET_USER_SNSTYPE", response.result.snsType);
          commit("SET_USER_HEIGHT", response.result.height);
          commit("SET_USER_PUSH", response.result.pushFlag);
          commit("SET_USER_ID", response.result.userId);
          commit("SET_USER_EVENT_CODE", response.result.eventCode);

          resolve(response.result);
        } catch (error) {
          if (error.message.includes("403")) {          
            if (window.AppType == "android" || window.AppType == "android3" ) {
              window.fcjs_if.doTokenExpire()
            }
            if(window.AppType == "ios2" || window.AppType == "ios3"){
              window.webkit.messageHandlers.doTokenExpire.postMessage("")
            }
          }
          reject(error);
        }
      }),

    pushUserSuggest: ({commit},payload) =>
      new Promise(async (resolve, reject) => {
        try {
          console.log(payload)
          const response = await userSuggestAPI(payload);
          resolve(response);
        } catch (error) {
          if (error.message.includes("403")) {          
            if (window.AppType == "android" || window.AppType == "android3" ) {
              window.fcjs_if.doTokenExpire()
            }
            if(window.AppType == "ios2" || window.AppType == "ios3"){
              window.webkit.messageHandlers.doTokenExpire.postMessage("")
            }
          }
          reject(error);
        }
      }),

    setPushFlag: ({commit},payload) =>
      new Promise(async (resolve, reject) => {
        try {
          await setPushFlagAPI(payload);
          console.log(payload)
          commit("SET_USER_PUSH", payload);
          resolve();
        } catch (error) {
          if (error.message.includes("403")) {          
            if (window.AppType == "android" || window.AppType == "android3" ) {
              window.fcjs_if.doTokenExpire()
            }
            if(window.AppType == "ios2" || window.AppType == "ios3"){
              window.webkit.messageHandlers.doTokenExpire.postMessage("")
            }
          }
          reject(error);
        }
      }),
  }
};

export default USER;
