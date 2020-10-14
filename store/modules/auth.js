import { signInAPI , signUpAPI, logoutAPI} from "@/api/auth";

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
            function getFormatDate(date){
              var year = date.getFullYear();              //yyyy
              var month = (1 + date.getMonth());          //M
              month = month >= 10 ? month : '0' + month;  //month 두자리로 저장
              var day = date.getDate();                   //d
              day = day >= 10 ? day : '0' + day;          //day 두자리로 저장
              return  year + '' + month + '' + day;       //'-' 추가하여 yyyy-mm-dd 형태 생성 가능
          }
            const response = await signInAPI(payload);
            console.log(response.result);
            if (response.status === 200) {
              commit("SET_ADMIN_ROLE", response.result.role);
              localStorage.setItem('token', response.result.authToken);
              var x = new Date();
              var y = getFormatDate(x);
              localStorage.setItem('tokenExpire', y);
            } 
            resolve(response.status);
          } catch (e) {
            reject(e);
          }
        }),
  
        signup: ({ commit }, payload) =>
        new Promise(async (resolve, reject) => {
          try {
            function getFormatDate(date){
              var year = date.getFullYear();              //yyyy
              var month = (1 + date.getMonth());          //M
              month = month >= 10 ? month : '0' + month;  //month 두자리로 저장
              var day = date.getDate();                   //d
              day = day >= 10 ? day : '0' + day;          //day 두자리로 저장
              return  year + '' + month + '' + day;       //'-' 추가하여 yyyy-mm-dd 형태 생성 가능
          }
            const response = await signUpAPI(payload);
            console.log(response.result);
            if (response.status === 200) {
              commit("SET_ADMIN_ROLE", response.result.role);
              localStorage.setItem('token', response.result.authToken);
              var x = new Date();
              var y = getFormatDate(x);
              localStorage.setItem('tokenExpire', y);
            } 
            resolve(response.status);
          } catch (e) {
            reject(e);
          }
        }),

        logout: ({ commit }) =>
        new Promise(async (resolve, reject) => {
          try {
            const response = await logoutAPI();
            resolve(response.status);
          } catch (e) {
            reject(e);
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