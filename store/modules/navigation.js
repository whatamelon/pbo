const navigation = {
  state() {
    return {
      CURRENT_ROUTE: "/home",
      PRODUCTS_PAGE: 1,
      activeCategory: "0",
      ACTIVE_CATEGORY: "0",
      PREVIOUS_PAGE: "/",
      SHOW_PAGINATION_SHEET:false,
      SHOW_ITEM_FIRST_FILTER_SHEET:false,
      SHOW_NO_FOLLOWING_MODEL_MODAL:false
    };
  },

  getters: {
    CURRENT_ROUTE: state => {
      return state.CURRENT_ROUTE;
    },

    PRODUCTS_PAGE: state => {
      return state.PRODUCTS_PAGE;
    },

    activeCategory: state => {
      return state.activeCategory;
    },

    ACTIVE_CATEGORY: state => {
      return state.ACTIVE_CATEGORY;
    },

    PREVIOUS_PAGE: state => {
      return state.PREVIOUS_PAGE;
    },

    SHOW_PAGINATION_SHEET: state => {
      return state.SHOW_PAGINATION_SHEET;
    },

    SHOW_ITEM_FIRST_FILTER_SHEET: state => {
      return state.SHOW_ITEM_FIRST_FILTER_SHEET;
    },

    SHOW_NO_FOLLOWING_MODEL_MODAL: state => {
      return state.SHOW_NO_FOLLOWING_MODEL_MODAL;
    }
  },

  mutations: {
    SET_CURRENT_ROUTE(state, payload) {
      state.CURRENT_ROUTE = payload;
    },

    SET_PRODUCTS_PAGE(state, payload) {
      state.PRODUCTS_PAGE = payload;
    },

    SET_ACTIVE_CATEGORY(state, payload) {
      state.ACTIVE_CATEGORY = payload;
    },

    setActiveCategory(state, payload) {
      state.activeCategory = payload;
    },

    SET_PREVIOUS_PAGE(state, payload) {
      state.PREVIOUS_PAGE = payload;
    },

    SET_SHOW_PAGINATION_SHEET(state, payload) {
      state.SHOW_PAGINATION_SHEET = payload;
    },

    SET_SHOW_ITEM_FIRST_FILTER_SHEET(state, payload) {
      state.SHOW_ITEM_FIRST_FILTER_SHEET = payload;
    },

    SET_SHOW_NO_FOLLOWING_MODEL_MODAL(state, payload) {
      state.SHOW_NO_FOLLOWING_MODEL_MODAL = payload;
    }
  },

  actions: {
    setCurrentRoute ({ commit }, payload) {
      commit("SET_CURRENT_ROUTE", payload);
    },

    setProductsPage({ commit }, payload) {
      commit("SET_PRODUCTS_PAGE", payload);
    },

    setActiveCategory({ commit }, payload) {
      commit("SET_ACTIVE_CATEGORY", payload);
    },

    setPreviousPage({ commit }, payload) {
      commit("SET_PREVIOUS_PAGE", payload);
    },

    openPaginationSheet({ commit }) {
      commit("SET_SHOW_PAGINATION_SHEET", true);
    },

    closePaginationSheet({ commit }) {
      commit("SET_SHOW_PAGINATION_SHEET", false);
    },

    openItemFirstFilterSheet({ commit }) {
      commit("SET_SHOW_ITEM_FIRST_FILTER_SHEET", true);
    },

    closeItemFirstFilterSheet({ commit }) {
      commit("SET_SHOW_ITEM_FIRST_FILTER_SHEET", false);
    },

    openNoFollowingModelModal({ commit }) {
      commit("SET_SHOW_NO_FOLLOWING_MODEL_MODAL", true);
    },

    closeNoFollowingModelModal({ commit }) {
      commit("SET_SHOW_NO_FOLLOWING_MODEL_MODAL", false);
    }
  }
};

export default navigation;
