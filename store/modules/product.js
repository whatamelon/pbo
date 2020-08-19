import {
  addToSavedProductsAPI,
  deleteFromSavedProductsAPI,
  getSavedProductsAPI,
  getItemProductsAPI,
  getAllProductsAPI,
  getFollowModelProductsAPI,
  getPopularKeywordsAPI,
  getKeywordProductsAPI,
  getFitProductsAPI,
  getProductFitsAPI
} from "@/api/product";

const product = {
  state() {
    return {
      PRODUCT_LIST: [],
      PRODUCT_INFO: null,
      ITEM_PRODUCTS: [],
      ALL_PRODUCTS: [],
      KEYWORD_PRODUCTS:[],
      FIT_PRODUCTS:[],
      PRODUCT_FITS:[],
      KEYWORD_NAME:"",
      FOLLOW_MODEL_PRODUCTS: [],
      POPULAR_KEYWORDS:[],
      SAVED_PRODUCTS: [],
      OFSET_SAVED_PRODUCTS:0,
      OFFSET: 0,
      TOTAL_CNT:0,
      RECENT_PRODUCTS: [],
    };
  },

  getters: {
    PRODUCT_LIST: state => {
      return state.PRODUCT_LIST;
    },

    PRODUCT_INFO: state => {
      return state.PRODUCT_INFO;
    },

    KEYWORD_NAME: state => {
      return state.KEYWORD_NAME;
    },

    FIT_PRODUCTS: state => {
      return state.FIT_PRODUCTS;
    },

    PRODUCT_FITS: state => {
      return state.PRODUCT_FITS;
    },

    KEYWORD_PRODUCTS: state => {
      return state.KEYWORD_PRODUCTS;
    },

    FOLLOW_MODEL_PRODUCTS: state => {
      return state.FOLLOW_MODEL_PRODUCTS;
    },

    POPULAR_KEYWORDS: state => {
      return state.POPULAR_KEYWORDS;
    },

    ITEM_PRODUCTS: state => {
      return state.ITEM_PRODUCTS;
    },

    ALL_PRODUCTS: state => {
      return state.ALL_PRODUCTS;
    },

    SAVED_PRODUCTS: state => {
      return state.SAVED_PRODUCTS;
    },

    TOTAL_CNT: state => {
      return state.TOTAL_CNT;
    },

    OFFSET: state => {
      return state.OFFSET;
    },

    OFSET_SAVED_PRODUCTS: state => {
      return state.OFSET_SAVED_PRODUCTS;
    },
  },

  mutations: {
    SET_PRODUCT_LIST(state, payload) {
      state.PRODUCT_LIST = payload;
    },

    SET_PRODUCT_INFO(state, payload) {
      state.PRODUCT_INFO = payload;
    },

    SET_ITEM_PRODUCTS(state, payload) {
      state.ITEM_PRODUCTS = payload;
    },

    SET_ALL_PRODUCTS(state, payload) {
      state.ALL_PRODUCTS = payload;
    },

    SET_KEYWORD_NAME(state, payload) {
      state.KEYWORD_NAME = payload;
    },

    SET_FIT_PRODUCTS(state, payload) {
      state.FIT_PRODUCTS = payload;
    },

    SET_PRODUCT_FITS(state, payload) {
      state.PRODUCT_FITS = payload;
    },

    SET_KEYWORD_PRODUCTS(state, payload) {
      state.KEYWORD_PRODUCTS = payload;
    },

    SET_FOLLOW_MODEL_PRODUCTS(state, payload) {
      state.FOLLOW_MODEL_PRODUCTS = payload;
    },

    SET_POPULAR_KEYWORDS(state, payload) {
      state.POPULAR_KEYWORDS = payload;
    },

    SET_SAVED_PRODUCTS(state, payload) {
      state.SAVED_PRODUCTS = payload;
    },


    ADD_SAVED_PRODUCTS(state, payload) {
      state.SAVED_PRODUCTS = state.SAVED_PRODUCTS.concat(payload);
    },

    ADD_TO_SAVED_PRODUCTS(state, payload) {
      state.SAVED_PRODUCTS.push(payload);
    },

    DELETE_FROM_SAVED_PRODUCTS(state, payload) {
      const index = state.SAVED_PRODUCTS.findIndex(
        item => item.itemId === payload
      );
      state.SAVED_PRODUCTS.splice(index, 1);
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
  },

  actions: {
    setProductList({ commit }, productList) {
      commit("SET_PRODUCT_LIST", productList);
    },

    resetProductList({ commit }) {
      commit("SET_PRODUCT_LIST", []);
    },

    setProductInfo({ commit }, product) {
      commit("SET_PRODUCT_INFO", product);
      console.log(product);
    },

    resetFitProducts({ commit }) {
      commit("SET_FIT_PRODUCTS", []);
    },

    setKeywordName({ commit }, payload) {
      commit("SET_KEYWORD_NAME", payload);
    },
    
    getFitProducts: ({ getters, commit, dispatch }) =>
    new Promise(async (resolve, reject) => {
      const categories = {
        firstCategory: getters.FIRST_CATEGORY
      };
        const params = {
          offset: getters.OFFSET,
          limit: getters.LIMIT,
          option: getters.FOLLOW_OPTION,
          fit1: getters.FIT1,
          sortOrder: getters.SORT_ORDER == '' || getters.SORT_ORDER == 'de' ? 'dr' : getters.SORT_ORDER,
          priceRange: getters.PRICE_RANGE
        };


      try {
        const response = await getFitProductsAPI(categories, params);
        if (response.status === 200) {
          const items = response.result.totCnt;
          const remainder = items%30;
          const totalPages = items/30;
          console.log(totalPages)
          if(remainder == 0) {
            dispatch("setTotalPageNumber", totalPages);
          }
          else {
            dispatch("setTotalPageNumber", Math.ceil(totalPages));
          }
          commit("SET_FIT_PRODUCTS", response.result.itemList);
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
    
    getProductFits: ({ commit, dispatch }, product) =>
      new Promise(async (resolve, reject) => {
        try {
          const response = await getProductFitsAPI(product.itemId);
          if (response.status === 200) {
            var fitsArray = [];
            response.result.fit1.forEach(function(i){
              switch(i) {
                case "ws":
                  const newWS = i.replace(i, "어깨가 넓어요");
                  fitsArray.push({"name": newWS});
                break;
                case "tc":
                  const newTC = i.replace(i, "종아리가 굵어요");
                  fitsArray.push({"name": newTC});
                break;
                case "fb":
                  const newFB = i.replace(i, "배가 좀 나왔어요");
                  fitsArray.push({"name": newFB});
                break;
                case "tt":
                  const newTT = i.replace(i, "허벅지가 좀 있는 편이에요");
                  fitsArray.push({"name": newTT});
                break;
                case "ns":
                  const newNS = i.replace(i, "어깨가 좁아요");
                  fitsArray.push({"name": newNS});
                break;
                case "tf":
                  const newTF = i.replace(i, "팔뚝에 살이 많아요");
                  fitsArray.push({"name": newTF});
                break;
                case "sn":
                  const newSN = i.replace(i, "목이 짧은 편이에요");
                  fitsArray.push({"name": newSN});
                break;
                case "sl":
                  const newSL = i.replace(i, "다리가 짧아요");
                  fitsArray.push({"name": newSL});
                break;
                case "np":
                  const newNP = i.replace(i, "골반이 좁아요");
                  fitsArray.push({"name": newNP});
                break;
                case "bb":
                  const newBB = i.replace(i, "가슴이 커요");
                  fitsArray.push({"name": newBB});
                break;
                case "tb":
                  const newTB = i.replace(i, "가슴이 작아요");
                  fitsArray.push({"name": newTB});
                break;
                case "cl":
                  const newCL = i.replace(i, "다리가 굽었어요");
                  fitsArray.push({"name": newCL});
                break;
                case "lf":
                  const newLF = i.replace(i, "얼굴이 길어요");
                  fitsArray.push({"name": newLF});
                break;
                case "af":
                  const newAF = i.replace(i, "얼굴이 각졌어요");
                  fitsArray.push({"name": newAF});
                break;
                case "rf":
                  const newRF = i.replace(i, "얼굴이 동그래요");
                  fitsArray.push({"name": newRF});
                break;
                case "sb":
                  const newSB = i.replace(i, "마른체형이에요");
                  fitsArray.push({"name": newSB});
                break;
              }
            });
            commit("SET_PRODUCT_FITS", fitsArray);
            console.log(fitsArray)
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

    getFollowModelProducts: ({ getters, commit, dispatch }) =>
      new Promise(async (resolve, reject) => {
        const categories = {
          firstCategory: getters.FIRST_CATEGORY,
          secondCategory: getters.ACTIVE_SECOND_CATEGORY.code
        };

        const params = {
          offset: getters.OFFSET,
          limit: getters.LIMIT,
          height: localStorage.getItem("height"),
          heightRange: getters.HEIGHT_RANGE,
          sortOrder: getters.SORT_ORDER,
          priceRange: getters.PRICE_RANGE
        };

        try {
          const response = await getFollowModelProductsAPI(categories, params);
          if (response.status === 200) {
            const items = response.result.totCnt;
            const remainder = items%30;
            const totalPages = items/30;
            console.log(totalPages)
            if(remainder == 0) {
              dispatch("setTotalPageNumber", totalPages);
            }
            else {
              dispatch("setTotalPageNumber", Math.ceil(totalPages));
            }
            commit("SET_FOLLOW_MODEL_PRODUCTS", response.result.itemList);
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

      getKeywordProducts: ({ getters, commit, dispatch }, keyword) =>
        new Promise(async (resolve, reject) => {
          const params = {
            offset: getters.OFFSET,
            limit: getters.LIMIT,
            heightRange: getters.HEIGHT_RANGE,
            sortOrder: getters.SORT_ORDER,
            priceRange: getters.PRICE_RANGE
          };
  
          try {
            const response = await getKeywordProductsAPI(keyword, params);
            if (response.status === 200) {
              const items = response.result.totCnt;
              const remainder = items%30;
              const totalPages = items/30;
              console.log(totalPages)
              if(remainder == 0) {
                dispatch("setTotalPageNumber", totalPages);
              }
              else {
                dispatch("setTotalPageNumber", Math.ceil(totalPages));
              }
              commit("SET_KEYWORD_PRODUCTS", response.result.itemList);
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

    getItemProducts: ({ getters, commit, dispatch }) =>
      new Promise(async (resolve, reject) => {
        const categories = {
          firstCategory: getters.FIRST_CATEGORY,
          secondCategory: getters.ACTIVE_SECOND_CATEGORY.code
        };

        const params = {
          offset: getters.OFFSET,
          height: localStorage.getItem("height"),
          limit: getters.LIMIT,
          heightRange: getters.HEIGHT_RANGE,
          sortOrder: getters.SORT_ORDER,
          priceRange: getters.PRICE_RANGE
        };

        try {
          const response = await getItemProductsAPI(categories, params);
          if (response.status === 200) {
            const items = response.result.totCnt;
            commit("SET_TOTAL_CNT", items);
            const remainder = items%30;
            const totalPages = items/30;
            console.log(totalPages)
            if(remainder == 0) {
              dispatch("setTotalPageNumber", totalPages);
            }
            else {
              dispatch("setTotalPageNumber", Math.ceil(totalPages));
            }
            commit("SET_ITEM_PRODUCTS", response.result.itemList);
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

      getAllProducts: ({ getters, commit, dispatch }) =>
        new Promise(async (resolve, reject) => {
          const params = {
            offset: getters.OFFSET,
            limit: getters.LIMIT,
            cat1: getters.FIRST_CATEGORY,
            cat2: getters.ACTIVE_SECOND_CATEGORY.code,
            qid: getters.Q_INFO.qitemId,
            fit1: getters.FIT1,
            option: getters.FOLLOW_OPTION,
            keyword: getters.KEYWORD_NAME,
            heightRange: getters.HEIGHT_RANGE,
            height: localStorage.getItem("height"),
            sortOrder: getters.SORT_ORDER,
            priceRange: getters.PRICE_RANGE
          };
  
          try {
            const response = await getAllProductsAPI(params);
            if (response.status === 200) {
              const items = response.result.totCnt;
              commit("SET_TOTAL_CNT", items);
              const remainder = items%30;
              const totalPages = items/30;
              console.log(totalPages)
              if(remainder == 0) {
                dispatch("setTotalPageNumber", totalPages);
              }
              else {
                dispatch("setTotalPageNumber", Math.ceil(totalPages));
              }
              commit("SET_ALL_PRODUCTS", response.result.itemList);
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

      getPopularKeywords: ({ commit },limit) =>
        new Promise(async (resolve, reject) => {
  
          try {
            const response = await getPopularKeywordsAPI(limit);
            if (response.status === 200) {
              commit("SET_POPULAR_KEYWORDS", response.result.keywordList);
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

    resetSavedProducts({ commit }) {
      commit("SET_SAVED_PRODUCTS", []);
    },

    getSavedProducts: ({ commit, getters, dispatch }) =>
      new Promise(async (resolve, reject) => {
        const params = {
          offset: 0,
          limit: 30
        };
        try {
          const response = await getSavedProductsAPI(params);
          if (response.status === 200) {
            commit("SET_SAVED_PRODUCTS", response.result.itemList);
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

    addSavedProducts: ({ getters, commit, dispatch }) =>
      new Promise(async (resolve, reject) => {
        const params = {
          offset: getters.OFFSET,
          limit: 30
        };

        try {
          const response = await getSavedProductsAPI(params);
          if (response.status === 200) {
            commit("ADD_SAVED_PRODUCTS", response.result.itemList);
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

    addToSavedProducts: ({ commit, dispatch }, product) =>
      new Promise(async (resolve, reject) => {
        try {
          const response = await addToSavedProductsAPI(product.itemId);
          if (response.status === 200) {
            commit("ADD_TO_SAVED_PRODUCTS", product);
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

    deleteFromSavedProducts: ({ dispatch }, product) =>
      new Promise(async (resolve, reject) => {
        try {
          const response = await deleteFromSavedProductsAPI(product.itemId);

          if (response.status === 200) {
            await dispatch("resetOffset");
            await dispatch("resetSavedProducts");
            await dispatch("getSavedProducts");
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

    setOffset({ commit }, payload) {
      commit("SET_OFFSET", payload);
    },

    setOffsetSavedProducts({ commit }, payload) {
      commit("SET_OFFSET_AVED_PRODUCTS", payload);
    },

    resetOffset({ commit }) {
      commit("SET_OFFSET", 0);
    },

     }
};

export default product;
