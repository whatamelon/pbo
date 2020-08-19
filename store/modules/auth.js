import { signInAPI } from "@/api/auth";

const ADMIN = {
    state() {
      return {
        ADMIN_ID: "",
        ADMIN_PASSWD: "",
        ADMIN_ROLE:""
      };
    },
  
    getters: {
      ADMIN_ID: state => {
        return state.ADMIN_ID;
      },
  
      ADMIN_PASSWD: state => {
        return state.ADMIN_PASSWD;
      },
  
      ADMIN_ROLE: state => {
        return state.ADMIN_ROLE;
      }
    },
  
    mutations: {
      SET_ADMIN_ID(state, payload) {
        state.ADMIN_ID = payload;
      },
  
      SET_ADMIN_PASSWD(state, payload) {
        state.ADMIN_PASSWD = payload;
      },
  
      SET_ADMIN_ROLE(state, payload) {
        state.ADMIN_ROLE = payload;
      }
    },
  
    actions: {

      adminLogin: ({ commit }, payload) =>
        new Promise(async (resolve, reject) => {
          try {
            const response = await signInAPI(payload);
            console.log(response.result);
            commit("SET_ADMIN_ROLE", response.result.role);
            localStorage.setItem('token', response.result.authToken);
            localStorage.setItem('tokenExpire', new Date());
            resolve();
          } catch (error) {
            reject(error);
          }
        }),
  
        // setUserInfo: ({ commit, dispatch }) =>
        // new Promise(async (resolve, reject) => {
        //   try {
        //     const response = await getUserInfoAPI();
  
        //     commit("SET_USER_EMAIL", response.result.email);
        //     commit("SET_USER_SNSTYPE", response.result.snsType);
        //     commit("SET_USER_HEIGHT", response.result.height);
        //     commit("SET_USER_PUSH", response.result.pushFlag);
        //     commit("SET_USER_ID", response.result.userId);
        //     commit("SET_USER_EVENT_CODE", response.result.eventCode);
  
        //     resolve(response.result);
        //   } catch (error) {
        //     if (error.message.includes("403")) {          
        //       if (window.AppType == "android" || window.AppType == "android3" ) {
        //         window.fcjs_if.doTokenExpire()
        //       }
        //       if(window.AppType == "ios2" || window.AppType == "ios3"){
        //         window.webkit.messageHandlers.doTokenExpire.postMessage("")
        //       }
        //     }
        //     reject(error);
        //   }
        // }),
    }
  };
  
  export default ADMIN;