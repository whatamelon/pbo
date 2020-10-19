import 
{ 
  getUserInfoAPI, 
  setUserHeightAPI, 
  sendUserInfoAPI,
  sendUserStyleImagesAPI,
  sendUserNickAPI
}
   from "@/api/user";

const USER = {
  state() {
    return {
      IS_INFO:'N',
      USER_NICKNAME: "",
      USER_GRP1: {},
      USER_GRP2: {},
      USER_GRP3: {},
      USER_GRP4: {},
      USER_GRP5: {},
      USER_EMAIL: "",
      USER_HEIGHT: "",
      USER_SNSTYPE: "",
      USER_PUSH : "",
      USER_ID:"",
    };
  },

  getters: {
    IS_INFO: state => {
      return state.IS_INFO;
    },

    USER_NICKNAME: state => {
      return state.USER_NICKNAME;
    },

    USER_GRP1: state => {
      return state.USER_GRP1;
    },

    USER_GRP2: state => {
      return state.USER_GRP2;
    },

    USER_GRP3: state => {
      return state.USER_GRP3;
    },

    USER_GRP4: state => {
      return state.USER_GRP4;
    },

    USER_GRP5: state => {
      return state.USER_GRP5;
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
  },

  mutations: {
    SET_IS_INFO(state, payload) {
      state.IS_INFO = payload;
    },

    SET_USER_NICKNAME(state, payload) {
      state.USER_NICKNAME = payload;
    },

    SET_USER_GRP1(state, payload) {
      state.USER_GRP1 = payload;
    },

    SET_USER_GRP2(state, payload) {
      state.USER_GRP2 = payload;
    },

    SET_USER_GRP3(state, payload) {
      state.USER_GRP3 = payload;
    },

    SET_USER_GRP4(state, payload) {
      state.USER_GRP4 = payload;
    },

    SET_USER_GRP5(state, payload) {
      state.USER_GRP5 = payload;
    },

    SET_USER_NICKNAME(state, payload) {
      state.USER_NICKNAME = payload;
    },

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
  },

  actions: {

    setIsInfo({ commit }, payload) {
      commit("SET_IS_INFO", payload);
    },

    setUserNickName({ commit }, payload) {
      commit("SET_USER_NICKNAME", payload);
    },

    setUsrGrp1({ commit }, payload) {
      commit("SET_USER_GRP1", payload);
    },

    setUsrGrp2({ commit }, payload) {
      commit("SET_USER_GRP2", payload);
    },

    setUsrGrp3({ commit }, payload) {
      commit("SET_USER_GRP3", payload);
    },

    setUsrGrp4({ commit }, payload) {
      commit("SET_USER_GRP4", payload);
    },

    setUsrGrp5({ commit }, payload) {
      commit("SET_USER_GRP5", payload);
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

      getUserInfo: ({ commit, dispatch }) =>
      new Promise(async (resolve, reject) => {
        try {
          const response = await getUserInfoAPI();

          if(response.status == 200) {

            if(response.result.isInfo == 'y') {

              commit("SET_IS_INFO", response.result.isInfo);
              commit("SET_USER_NICKNAME", response.result.nick);
              commit("SET_USER_GRP1", response.result.ugr1);
              commit("SET_USER_GRP2", response.result.ugr2);
              commit("SET_USER_GRP3", response.result.ugr3);
              commit("SET_USER_GRP4", response.result.ugr4);
              commit("SET_USER_GRP5", response.result.ugr5);

              console.log(response.result);

            } else {
              commit("SET_IS_INFO", response.result.isInfo);
            }

          }


          resolve(response.status);
        } catch (error) {
          reject(error);
        }
      }),

    sendUserInfo: ({ getters, commit, dispatch }, payload) =>
      new Promise(async (resolve, reject) => {
        console.log(payload[0])
        console.log(payload[1])
        try {
          const response = await sendUserInfoAPI(payload[0], payload[1]);
          resolve(response.status);
        } catch (error) {
          reject(error);
        }
    }),

    sendUserImage: ({ getters, commit, dispatch }, payload) =>
      new Promise(async (resolve, reject) => {
        console.log(payload[0])
        console.log(payload[1])
        try {
          const response = await sendUserStyleImagesAPI(payload[0], payload[1]);
          resolve(response.status);
        } catch (error) {
          reject(error);
        }
    }),

    sendUserNick: ({ getters, commit, dispatch }, nick) =>
      new Promise(async (resolve, reject) => {
        try {
          const response = await sendUserNickAPI(nick);
          resolve(response.status);
        } catch (error) {
          reject(error);
        }
    }),


  }
};

export default USER;
