const filter = {
  state() {
    return {
      BODYTYPE_CATEGORY :"000",
      MODEL_FIRST_CATEGORY: "000",
      MODEL_ACTIVE_FIRST_CATEGORY: [],
      FIRST_CATEGORY: "000",
      SECOND_CATEGORY: { code: "000", name: "전체" },
      ACTIVE_FIRST_CATEGORY: [],
      ACTIVE_SECOND_CATEGORY: [
        {
          code: "000",
          name: "전체"
        }
      ],
      ONLY_FIRST_CATEGORY_ACTIVE: false,
      PRICE_RANGE: "0r4000000",
      HEIGHT_RANGE: "",
      SORT_ORDER: "de",
      FIT1: "",
      FIT2:"",
      FOLLOW_OPTION:"",
      TEMPORARY_FIT1: "",
      TEMPORARY_PRICE_RANGE: "0r4000000",
      TEMPORARY_HEIGHT_RANGE: "",
      TEMPORARY_SORT_ORDER: "de",
      LIMIT: 30,
      HAS_MORE_DATA: true,
      DROPDOWN_INACTIVE: false,
      ITEM_FIRST_FILTER:"followModel",
      MODEL_HEIGHT_FILTER:1,
      SAVED_TAB_FILTER:1
    };
  },

  getters: {
    BODYTYPE_CATEGORY: state => {
      return state.BODYTYPE_CATEGORY;
    },

    MODEL_FIRST_CATEGORY: state => {
      return state.MODEL_FIRST_CATEGORY;
    },

    FIRST_CATEGORY: state => {
      return state.FIRST_CATEGORY;
    },

    SECOND_CATEGORY: state => {
      return state.SECOND_CATEGORY;
    },

    ACTIVE_FIRST_CATEGORY: state => {
      return state.ACTIVE_FIRST_CATEGORY;
    },

    MODEL_ACTIVE_FIRST_CATEGORY: state => {
      return state.MODEL_ACTIVE_FIRST_CATEGORY;
    },

    ACTIVE_SECOND_CATEGORY: state => {
      return state.ACTIVE_SECOND_CATEGORY;
    },

    ONLY_FIRST_CATEGORY_ACTIVE: state => {
      return state.ONLY_FIRST_CATEGORY_ACTIVE;
    },

    PRICE_RANGE: state => {
      return state.PRICE_RANGE;
    },

    HEIGHT_RANGE: state => {
      return state.HEIGHT_RANGE;
    },

    SORT_ORDER: state => {
      return state.SORT_ORDER;
    },

    FIT1: state => {
      return state.FIT1;
    },

    FIT2: state => {
      return state.FIT2;
    },

    FOLLOW_OPTION: state => {
      return state.FOLLOW_OPTION;
    },

    TEMPORARY_FIT1: state => {
      return state.TEMPORARY_FIT1;
    },

    TEMPORARY_PRICE_RANGE: state => {
      return state.TEMPORARY_PRICE_RANGE;
    },

    TEMPORARY_HEIGHT_RANGE: state => {
      return state.TEMPORARY_HEIGHT_RANGE;
    },

    TEMPORARY_SORT_ORDER: state => {
      return state.TEMPORARY_SORT_ORDER;
    },

    LIMIT: state => {
      return state.LIMIT;
    },

    HAS_MORE_DATA: state => {
      return state.HAS_MORE_DATA;
    },

    DROPDOWN_INACTIVE: state => {
      return state.DROPDOWN_INACTIVE;
    },

    ITEM_FIRST_FILTER: state => {
      return state.ITEM_FIRST_FILTER;
    },

    MODEL_HEIGHT_FILTER: state => {
      return state.MODEL_HEIGHT_FILTER;
    },

    SAVED_TAB_FILTER: state => {
      return state.SAVED_TAB_FILTER;
    }
  },

  mutations: {
    SET_BODYTYPE_CATEGORY(state, payload) {
      state.BODYTYPE_CATEGORY = payload;
    },

    SET_MODEL_FIRST_CATEGORY(state, payload) {
      state.MODEL_FIRST_CATEGORY = payload;
    },

    SET_MODEL_ACTIVE_FIRST_CATEGORY(state, payload) {
      state.MODEL_ACTIVE_FIRST_CATEGORY = payload;
    },

    SET_FIRST_CATEGORY(state, payload) {
      state.FIRST_CATEGORY = payload;
    },

    SET_SECOND_CATEGORY(state, payload) {
      state.SECOND_CATEGORY = payload;
    },

    SET_ACTIVE_FIRST_CATEGORY(state, payload) {
      state.ACTIVE_FIRST_CATEGORY = payload;
    },

    SET_ACTIVE_SECOND_CATEGORY(state, payload) {
      state.ACTIVE_SECOND_CATEGORY = payload;
    },

    SET_ONLY_FIRST_CATEGORY_ACTIVE(state, payload) {
      state.ONLY_FIRST_CATEGORY_ACTIVE = payload;
    },

    SET_PRICE_RANGE(state, payload) {
      state.PRICE_RANGE = payload;
    },

    SET_HEIGHT_RANGE(state, payload) {
      state.HEIGHT_RANGE = payload;
    },

    SET_SORT_ORDER(state, payload) {
      state.SORT_ORDER = payload;
    },

    SET_FIT1(state, payload) {
      state.FIT1 = payload;
    },

    SET_FIT2(state, payload) {
      state.FIT2 = payload;
    },

    SET_FOLLOW_OPTION(state, payload) {
      state.FOLLOW_OPTION = payload;
    },

    SET_TEMPORARY_FIT1(state, payload) {
      state.TEMPORARY_FIT1 = payload;
    },

    SET_TEMPORARY_PRICE_RANGE(state, payload) {
      state.TEMPORARY_PRICE_RANGE = payload;
    },

    SET_TEMPORARY_HEIGHT_RANGE(state, payload) {
      state.TEMPORARY_HEIGHT_RANGE = payload;
    },

    SET_TEMPORARY_SORT_ORDER(state, payload) {
      state.TEMPORARY_SORT_ORDER = payload;
    },

    SET_HAS_MORE_DATA(state, payload) {
      state.HAS_MORE_DATA = payload;
    },

    SET_DROPDOWN_INACTIVE(state, payload) {
      state.DROPDOWN_INACTIVE = payload;
    },

    SET_ITEM_FIRST_FILTER(state, payload) {
      state.ITEM_FIRST_FILTER = payload;
    },

    SET_MODEL_HEIGHT_FILTER(state, payload) {
      state.MODEL_HEIGHT_FILTER = payload;
    },

    SET_SAVED_TAB_FILTER(state, payload) {
      state.SAVED_TAB_FILTER = payload;
    }
  },

  actions: {
    setBodytypeCategory: ({ commit }, payload) =>
      new Promise(resolve => {
        commit("SET_BODYTYPE_CATEGORY", payload);
        resolve();
      }),

    setModelFirstCategory: ({ commit }, payload) =>
      new Promise(resolve => {
        commit("SET_MODEL_FIRST_CATEGORY", payload);
        resolve();
      }),

    setModelActiveFirstCategory: ({ commit }, activeFirstCategories) =>
        new Promise(resolve => {
          commit("SET_MODEL_ACTIVE_FIRST_CATEGORY", activeFirstCategories);
          resolve();
        }),

    setFirstCategory: ({ commit }, payload) =>
      new Promise(resolve => {
        commit("SET_FIRST_CATEGORY", payload);
        resolve();
      }),

    setSecondCategory: ({ commit }, payload) =>
      new Promise(resolve => {
        commit("SET_SECOND_CATEGORY", payload);
        resolve();
      }),

    setActiveFirstCategory: ({ commit }, activeFirstCategories) =>
      new Promise(resolve => {
        commit("SET_ACTIVE_FIRST_CATEGORY", activeFirstCategories);
        resolve();
      }),

    setActiveSecondCategory: ({ commit }, payload) =>
      new Promise(resolve => {
        commit("SET_ACTIVE_SECOND_CATEGORY", payload);
        resolve();
      }),

    setOnlyFirstCategoryActive({ commit }, payload) {
      commit("SET_ONLY_FIRST_CATEGORY_ACTIVE", payload);
    },

    setPriceRange: ({ commit }, payload) =>
      new Promise(resolve => {
        const minimumPrice = payload.substring(0, payload.indexOf("r"));
        let maximumPrice = payload.substring(
          payload.indexOf("r") + 1,
          payload.length
        );
        console.log(maximumPrice)
        if (maximumPrice == 100000) {
          maximumPrice = 4000000;
        }
        const priceRange = minimumPrice + "r" + maximumPrice;
        commit("SET_PRICE_RANGE", priceRange);
        resolve();
      }),

      setHeightRange: ({ commit }, payload) =>
      new Promise(resolve => {
        commit("SET_HEIGHT_RANGE", payload);
        resolve();
      }),
      
    setSortOrder: ({ commit }, payload) =>
      new Promise(resolve => {
        commit("SET_SORT_ORDER", payload);
        resolve();
      }),
      
    setFit1: ({ commit }, payload) =>
      new Promise(resolve => {
        commit("SET_FIT1", payload);
        resolve();
    }),
      
    setFit2: ({ commit }, payload) =>
    new Promise(resolve => {
      commit("SET_FIT2", payload);
      resolve();
    }),
    
    setFollowOption: ({ commit }, payload) =>
      new Promise(resolve => {
        commit("SET_FOLLOW_OPTION", payload);
        resolve();
    }),

    setTemporaryPriceRange: ({ commit }, payload) =>
      new Promise(resolve => {
        commit("SET_TEMPORARY_PRICE_RANGE", payload);
        resolve();
      }),

    setTemporaryFit1: ({ commit }, payload) =>
    new Promise(resolve => {
      commit("SET_TEMPORARY_FIT1", payload);
      resolve();
    }),

    setTemporaryHeightRange: ({ commit }, payload) =>
    new Promise(resolve => {
      commit("SET_TEMPORARY_HEIGHT_RANGE", payload);
      resolve();
    }),

    setTemporarySortOrder: ({ commit }, payload) =>
      new Promise(resolve => {
        commit("SET_TEMPORARY_SORT_ORDER", payload);
        resolve();
      }),

    resetBodyTypeFilter({ commit }) {
      commit("SET_TEMPORARY_SORT_ORDER", "dr");
      commit("SET_PRICE_RANGE", "0r100000");
      commit("SET_TEMPORARY_PRICE_RANGE", "0r100000");
      commit("SET_SORT_ORDER", "dr");
    },

    resetFilter({ commit }) {
      commit("SET_TEMPORARY_SORT_ORDER", "de");
      commit("SET_PRICE_RANGE", "0r100000");
      commit("SET_TEMPORARY_PRICE_RANGE", "0r100000");
      commit("SET_SORT_ORDER", "de");
      commit("SET_TEMPORARY_FIT1", "");
      commit("SET_FIT1", "");
      commit("SET_FIT2", "");
      commit("SET_FOLLOW_OPTION", "");
    },

    setHasMoreData: ({ commit }, payload) =>
      new Promise(resolve => {
        commit("SET_HAS_MORE_DATA", payload);
        resolve();
      }),

    setDropdownInactive: ({ commit }, payload) =>
      new Promise(resolve => {
        commit("SET_DROPDOWN_INACTIVE", payload);
        resolve();
      }),
      
    setItemFirstFilter({ commit }, payload) {
      commit("SET_ITEM_FIRST_FILTER", payload);
    },
      
    setModelHeightFilter({ commit }, payload) {
      commit("SET_MODEL_HEIGHT_FILTER", payload);
    },
      
    setSavedTabFilter({ commit }, payload) {
      commit("SET_SAVED_TAB_FILTER", payload);
    },
  }
};

export default filter;
