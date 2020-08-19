import {
  getModelsByHeightAPI,
  getNewModelsAPI,
  getModelsLowHeightAPI,
  getModelsMeanHeightAPI,
  getModelsHighHeightAPI,
  getFollowingModelsAPI,
  followModelAPI,
  unfollowModelAPI,
  getModelProductsAPI,
  setModelLikeAPI,
  getRandomModelAPI,
  getStyleModelsAPI,
  getHeightModelsAPI,
  getModelInfoAPI,
  getAllModelsAPI
} from "@/api/model";

const model = {
  state() {
    return {
      ACTIVE_TAB: "models",
      MODEL: null,
      MODELS: [],
      NEW_MODELS:[],
      MODELS_LOW_HEIGHT : [],
      MODELS_MEAN_HEIGHT : [],
      MODELS_HIGH_HEIGHT : [],
      ALL_MODELS : [],
      FOLLOWING_MODELS: [],
      MODEL_PRODUCTS: [],
      OFFSET_MODEL : 0,
      OFFSET_MODEL_PRODUCT : 0,
      OFFSET_MODEL_LOW_HEIGHT : 0,
      OFFSET_MODEL_MEAN_HEIGHT : 0,
      OFFSET_MODEL_HIGH_HEIGHT : 0,
      MODEL_ID : "",
      RANDOM_MODEL :[],
      STYLE_MODELS:[],
      HEIGHT_MODELS:[],
      MODEL_PRODUCTS_NEW:[],
      MODEL_SAME_PRODUCTS:[],
      MODEL_INFO: null
    };
  },

  getters: {
    ACTIVE_TAB: state => {
      return state.ACTIVE_TAB;
    },
    
    MODELS: state => {
      return state.MODELS;
    },

    ALL_MODELS: state => {
      return state.ALL_MODELS;
    },
    
    NEW_MODELS: state => {
      return state.NEW_MODELS;
    },

    MODELS_LOW_HEIGHT: state => {
      return state.MODELS_LOW_HEIGHT;
    },
    
    MODELS_MEAN_HEIGHT: state => {
      return state.MODELS_MEAN_HEIGHT;
    },
    
    MODELS_HIGH_HEIGHT: state => {
      return state.MODELS_HIGH_HEIGHT;
    },

    FOLLOWING_MODELS: state => {
      return state.FOLLOWING_MODELS;
    },

    MODEL: state => {
      return state.MODEL;
    },

    MODEL_PRODUCTS: state => {
      return state.MODEL_PRODUCTS;
    },

    MODEL_ACTIVE_CATEGORY: state => {
      return state.MODEL_ACTIVE_CATEGORY;
    },

    OFFSET_MODEL: state => {
      return state.OFFSET_MODEL;
    },

    OFFSET_MODEL_PRODUCT: state => {
      return state.OFFSET_MODEL_PRODUCT;
    },

    OFFSET_MODEL_LOW_HEIGHT: state => {
      return state.OFFSET_MODEL_LOW_HEIGHT;
    },

    OFFSET_MODEL_MEAN_HEIGHT: state => {
      return state.OFFSET_MODEL_MEAN_HEIGHT;
    },

    OFFSET_MODEL_HIGH_HEIGHT: state => {
      return state.OFFSET_MODEL_HIGH_HEIGHT;
    },

    MODEL_ID: state => {
      return state.MODEL_ID;
    },

    RANDOM_MODEL: state => {
      return state.RANDOM_MODEL;
    },

    STYLE_MODELS: state => {
      return state.STYLE_MODELS;
    },

    HEIGHT_MODELS: state => {
      return state.HEIGHT_MODELS;
    },

    MODEL_PRODUCTS_NEW: state => {
      return state.MODEL_PRODUCTS_NEW;
    },

    MODEL_SAME_PRODUCTS: state => {
      return state.MODEL_SAME_PRODUCTS;
    },

    MODEL_INFO: state => {
      return state.MODEL_INFO;
    }
  },

  mutations: {
    SET_ACTIVE_TAB(state, payload) {
      state.ACTIVE_TAB = payload;
    },

    SET_ALL_MODELS(state, payload) {
      state.ALL_MODELS = payload;
    },

    SET_MODELS(state, payload) {
      state.MODELS = payload;
    },
    
    ADD_MODELS(state, payload) {
      state.MODELS = state.MODELS.concat(payload);
    },

    SET_NEW_MODELS(state, payload) {
      state.NEW_MODELS = payload;
    },

    SET_MODELS_LOW_HEIGHT(state, payload) {
      state.MODELS_LOW_HEIGHT = payload;
    },

    ADD_MODELS_LOW_HEIGHT(state, payload) {
      state.MODELS_LOW_HEIGHT = state.MODELS_LOW_HEIGHT.concat(payload);
    },

    SET_MODELS_MEAN_HEIGHT(state, payload) {
      state.MODELS_MEAN_HEIGHT = payload;
    },

    ADD_MODELS_MEAN_HEIGHT(state, payload) {
      state.MODELS_MEAN_HEIGHT = state.MODELS_MEAN_HEIGHT.concat(payload);
    },

    SET_MODELS_HIGH_HEIGHT(state, payload) {
      state.MODELS_HIGH_HEIGHT = payload;
    },

    ADD_MODELS_HIGH_HEIGHT(state, payload) {
      state.MODELS_HIGH_HEIGHT = state.MODELS_HIGH_HEIGHT.concat(payload);
    },

    SET_FOLLOWING_MODELS(state, payload) {
      state.FOLLOWING_MODELS = payload;
    },

    ADD_FOLLOWING_MODEL(state, payload) {
      state.FOLLOWING_MODELS.push(payload);
    },

    DELETE_FOLLOWING_MODEL(state, payload) {
      const index = state.FOLLOWING_MODELS.findIndex(
        model => model.cid === payload
      );
      state.FOLLOWING_MODELS.splice(index, 1);
    },

    SET_MODEL(state, payload) {
      state.MODEL = payload;
    },

    SET_MODEL_PRODUCTS(state, payload) {
      state.MODEL_PRODUCTS = payload;
    },

    ADD_MODEL_PRODUCTS(state, payload) {
      state.MODEL_PRODUCTS = state.MODEL_PRODUCTS.concat(payload);
    },

    SET_OFFSET_MODEL(state, payload) {
      state.OFFSET_MODEL = payload;
    },

    SET_OFFSET_MODEL_PRODUCT(state, payload) {
      state.OFFSET_MODEL_PRODUCT = payload;
    },

    SET_OFFSET_MODEL_LOW_HEIGHT(state, payload) {
      state.OFFSET_MODEL_LOW_HEIGHT = payload;
    },
    
    SET_OFFSET_MODEL_MEAN_HEIGHT(state, payload) {
      state.OFFSET_MODEL_MEAN_HEIGHT = payload;
    },
    
    SET_OFFSET_MODEL_HIGH_HEIGHT(state, payload) {
      state.OFFSET_MODEL_HIGH_HEIGHT = payload;
    },

    SET_MODEL_ID(state, payload) {
      state.MODEL_ID = payload;
    },

    SET_RANDOM_MODEL(state, payload) {
      state.RANDOM_MODEL = payload;
    },

    SET_STYLE_MODELS(state, payload) {
      state.STYLE_MODELS = payload;
    },

    SET_HEIGHT_MODELS(state, payload) {
      state.HEIGHT_MODELS = payload;
    },

    SET_MODEL_PRODUCTS_NEW(state, payload) {
      state.MODEL_PRODUCTS_NEW = payload;
    },

    SET_MODEL_SAME_PRODUCTS(state, payload) {
      state.MODEL_SAME_PRODUCTS = payload;
    },

    SET_MODEL_INFO(state, payload) {
      state.MODEL_INFO = payload;
    }
  },

  actions: {
    setActiveTab({ commit }, activeTab) {
      commit("SET_ACTIVE_TAB", activeTab);
    },

    setFollowingTab({ commit }) {
      commit("SET_ACTIVE_TAB", "following");
    },

    setModel({ commit }, model) {
      commit("SET_MODEL", model);
      console.log("여기는API_SET_MODEL");
      console.log(model);
    },

    resetModels({ commit }) {
      commit("SET_MODELS", []);
    },

    getModels: ({ getters, commit }) =>
      new Promise(async (resolve, reject) => {
        const params = {
          offset: 0,
          limit: 5
        };
        try {
          const response = await getModelsByHeightAPI(
            localStorage.getItem("height"),
            params
          );
          if (response.status === 200) {
          commit("SET_MODELS", response.result.modelList);
          }
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

      addModels: ({getters, commit }) =>
      new Promise(async (resolve, reject) => {
        const params = {
          offset: getters.OFFSET_MODEL,
          limit: 5
        };
        try {
          const response = await getModelsByHeightAPI( 
            localStorage.getItem("height"),
            params
            );
          if (response.status === 200) {
            console.log(response.result.modelList);
            commit("ADD_MODELS", response.result.modelList);
          }
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
      
      getAllModels: ({ commit }) =>
      new Promise(async (resolve, reject) => {
        const params = {
          offset: 0,
          limit: 200,
          hfrom: 0,
          hto: 298,
          orderby: "HEIGHT_ASC"
        };
        try {
          const response = await getAllModelsAPI(params);
          if (response.status === 200) {
          commit("SET_ALL_MODELS", response.result.modelList);
          }
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

      getNewModels: ({ commit }) =>
      new Promise(async (resolve, reject) => {
        const params = {
          offset: 0,
          limit: 10,
          hfrom: 0,
          hto: 298,
          orderby: "NONE"
        };
        try {
          const response = await getNewModelsAPI(params);
          if (response.status === 200) {
          commit("SET_NEW_MODELS", response.result.modelList);
          }
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

      getModelsLowHeight: ({ commit }) =>
      new Promise(async (resolve, reject) => {
        const params = {
          offset: 0,
          limit: 5,
          hfrom: 0,
          hto: 158,
          orderby: "HEIGHT_ASC"
        };
        try {
          const response = await getModelsLowHeightAPI(
            params
          );
          if (response.status === 200) {
          commit("SET_MODELS_LOW_HEIGHT", response.result.modelList);
          }
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

      addModelsLowHeight: ({ getters , commit }) =>
      new Promise(async (resolve, reject) => {
        const params = {
          offset: getters.OFFSET_MODEL_LOW_HEIGHT,
          limit: 5,
          hfrom: 0,
          hto: 158,
          orderby: "HEIGHT_ASC"
        };

        try {
          const response = await getModelsLowHeightAPI(
            params
          );
          if (response.status === 200) {
          commit("ADD_MODELS_LOW_HEIGHT", response.result.modelList);
          }
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

      getModelsMeanHeight: ({ commit }) =>
      new Promise(async (resolve, reject) => {
        const params = {
          offset: 0,
          limit: 5,
          hfrom: 159,
          hto: 167,
          orderby: "HEIGHT_ASC"
        };
        try {
          const response = await getModelsMeanHeightAPI(
            params
          );
          if (response.status === 200) {
          commit("SET_MODELS_MEAN_HEIGHT", response.result.modelList);
          }
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

      addModelsMeanHeight: ({ getters , commit }) =>
      new Promise(async (resolve, reject) => {
        const params = {
          offset: getters.OFFSET_MODEL_MEAN_HEIGHT,
          limit: 5,
          hfrom: 159,
          hto: 167,
          orderby: "HEIGHT_ASC"
        };

        try {
          const response = await getModelsMeanHeightAPI(
            params
          );
          if (response.status === 200) {
          commit("ADD_MODELS_MEAN_HEIGHT", response.result.modelList);
          }
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

      getModelsHighHeight: ({ commit }) =>
      new Promise(async (resolve, reject) => {
        const params = {
          offset: 0,
          limit: 5,
          hfrom: 168,
          hto: 200,
          orderby: "HEIGHT_ASC"
        };
        try {
          const response = await getModelsHighHeightAPI(
            params
          );
          if (response.status === 200) {
          commit("SET_MODELS_HIGH_HEIGHT", response.result.modelList);
          }
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

      addModelsHighHeight: ({ getters , commit }) =>
      new Promise(async (resolve, reject) => {
        const params = {
          offset: getters.OFFSET_MODEL_HIGH_HEIGHT,
          limit: 5,
          hfrom: 168,
          hto: 200,
          orderby: "HEIGHT_ASC"
        };

        try {
          const response = await getModelsHighHeightAPI(
            params
          );
          if (response.status === 200) {
          commit("ADD_MODELS_HIGH_HEIGHT", response.result.modelList);
          }
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


    setFollowingModels: ({ commit, dispatch }) =>
      new Promise(async (resolve, reject) => {
        const params = {
          offset: 0,
          limit: 9999
        };
        try {
            const response = await getFollowingModelsAPI(params);
            if (response.status === 200) {
              commit("SET_FOLLOWING_MODELS", response.result.modelList);
            }
            resolve(response);
          

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

    followModel: ({ commit, dispatch }, modelId) =>
      new Promise(async (resolve, reject) => {
        try {
          const response = await followModelAPI(modelId);
          if (response.code === 200) {
            commit("ADD_FOLLOWING_MODEL", response.result);
          }
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

    unfollowModel: ({ commit, dispatch }, modelId) =>
      new Promise(async (resolve, reject) => {
        try {
          const response = await unfollowModelAPI(modelId);
          if (response.code === 200) {
            commit("DELETE_FOLLOWING_MODEL", modelId);
          }
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

    getModelProducts: ({ getters, commit, dispatch }) =>
      new Promise(async (resolve, reject) => {
        const categories = {
          firstCategory: "000",
          secondCategory: "000"
        };

        const params = {
          offset: getters.OFFSET_MODEL_PRODUCT,
          modelId: getters.MODEL.modelId,
          limit: getters.LIMIT
        };

        try {
          const response = await getModelProductsAPI(categories, params);
          if (response.status == 200) {
            dispatch("setModelActiveFirstCategory", response.result.catList);
            console.log("스토어카테고리")
            console.log(response.result.catList)
            commit("SET_MODEL_PRODUCTS", response.result.itemList);
          }

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

    addModelProducts: ({ getters, commit }) =>
      new Promise(async (resolve, reject) => {
        const categories = {
          firstCategory: "000",
          secondCategory: "000"
        };

        const params = {
          offset: getters.OFFSET_MODEL_PRODUCT,
          modelId: getters.MODEL.modelId,
          limit: getters.LIMIT
        };

        try {
          const response = await getModelProductsAPI(categories, params);
          if (response.status == 200) {
            commit("ADD_MODEL_PRODUCTS", response.result.itemList);
          }

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

      setOffsetModel({ commit }, payload) {
        commit("SET_OFFSET_MODEL", payload);
      },

      setOffsetModelProduct({ commit }, payload) {
        commit("SET_OFFSET_MODEL_PRODUCT", payload);
      },

      setOffsetModelLowHeight({ commit }, payload) {
        commit("SET_OFFSET_MODEL_LOW_HEIGHT", payload);
      },

      setOffsetModelMeanHeight({ commit }, payload) {
        commit("SET_OFFSET_MODEL_MEAN_HEIGHT", payload);
      },

      setOffsetModelHighHeight({ commit }, payload) {
        commit("SET_OFFSET_MODEL_HIGH_HEIGHT", payload);
      },

    resetModelProducts({ commit }) {
      commit("SET_MODEL_PRODUCTS", []);
    },

    sendModelLike: ({ commit }, modelId) =>
      new Promise(async (resolve, reject) => {
        try {
          await setModelLikeAPI( modelId);
          console.log(modelId);
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

      getRandomModel: ({ getters, commit }) =>
        new Promise(async (resolve, reject) => {
          try {
            const response = await getRandomModelAPI( getters.USER_HEIGHT );
            if (response.status === 200) {
            commit("SET_RANDOM_MODEL", response.result);
            }
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

      getStyleModels: ({ getters, commit }) =>
        new Promise(async (resolve, reject) => {
          const params = {
            offset: 0,
            modelId: getters.MODEL.modelId,
            limit: 10
          };
          try {
            const response = await getStyleModelsAPI( params );
            if (response.status === 200) {
            commit("SET_STYLE_MODELS", response.result.modelList);
            }
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

      getHeightModels: ({ getters, commit }) =>
        new Promise(async (resolve, reject) => {
          const params = {
            offset: 0,
            height: getters.MODEL.height,
            limit: 10
          };
          try {
            const response = await getHeightModelsAPI( params );
            if (response.status === 200) {
            commit("SET_HEIGHT_MODELS", response.result.modelList);
            }
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

        getModelProductsNew: ({ getters, commit, dispatch }) =>
          new Promise(async (resolve, reject) => {
            const categories = {
              firstCategory: "000",
              secondCategory: "000"
            };
    
            const params = {
              offset: 0,
              modelId: getters.MODEL.modelId,
              limit: 10
            };
    
            try {
              const response = await getModelProductsAPI(categories, params);
              if (response.status == 200) {
                // dispatch("setActiveFirstCategory", response.result.catList);
                commit("SET_MODEL_PRODUCTS_NEW", response.result.itemList);
                console.log("여기는MODEL_NEW_PRODUCTS");
                console.log(response.result.itemList);
              }
    
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

        getModelSameProducts: ({ getters, commit, dispatch }) =>
          new Promise(async (resolve, reject) => {
            const categories = {
              firstCategory: localStorage.getItem('cat1'),
              secondCategory: localStorage.getItem('cat2')
            };
    
            const params = {
              offset: 0,
              modelId: getters.MODEL.modelId,
              limit: 10
            };
    
            try {
              const response = await getModelProductsAPI(categories, params);
              if (response.status == 200) {
                // dispatch("setActiveFirstCategory", response.result.catList);
                commit("SET_MODEL_SAME_PRODUCTS", response.result.itemList);
                console.log("여기는MODEL_SAME_PRODUCTS");
                console.log(response.result.itemList);
              }
    
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
          
        getModelInfo: ({ commit }, modelId) =>
          new Promise(async (resolve, reject) => {
            try {
              const response = await getModelInfoAPI( modelId );
              if (response.status === 200) {
                console.log("여기는API_SET_MODEL_INFO");
                console.log(modelId);
                commit("SET_MODEL_INFO", response.result);
                }
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
          })

  }
};

export default model;
