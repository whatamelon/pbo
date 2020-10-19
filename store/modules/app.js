const app = {
  state() {
    return {
      IMAGE_URL: "https://s3.ap-northeast-2.amazonaws.com/image.fitchoo",
      YOUTUBE_KEY: "AIzaSyDtTuarkPKVdydjAaL0jI9m5iUZ0qwVLoM",
      IS_LOADING: false,
      IS_WAIT: false,
      SHOW_MODAL: false,
      SHOW_INTRO_MODAL:false,
      SHOW_LOGIN_ALERT_MODAL: false,
      SHOW_APP_DOWNLOAD_MODAL: false,
      SHOW_LOGIN_MODAL: false,
      SHOW_BOTTOM_SHEET: false,
      SHOW_CAT_SHEET: false,
      SHOW_BODYTYPE_SHEET:false,
      SHOW_UPDATE_MODAL:false,
      SHOW_BODYTYPE_MODAL:false,
      SHOW_REVIEW_MODAL:false,
      SHOW_LOGIN_SHEET: false,
      REVIEW_ID:"1",
      IS_SEARCH: false,
      RECENT_TAGS: false,
      PAGE_NUMBER:1,
      TOTAL_PAGE_NUMBER:0,
      HAS_LOGO: "",
      HEADER_TITLE: "",
      CURRENT_DEVICE: "",
      ACTIVE_FILTER: {
        heightRange: 3,
        sortOrder: "recent",
        priceRange: "all"
      }
    };
  },

  getters: {
    IMAGE_URL: state => {
      return state.IMAGE_URL;
    },

    YOUTUBE_KEY: state => {
      return state.YOUTUBE_KEY;
    },

    IS_LOADING: state => {
      return state.IS_LOADING;
    },

    IS_WAIT: state => {
      return state.IS_WAIT;
    },

    RECENT_TAGS: state => {
      return state.RECENT_TAGS;
    },

    SHOW_MODAL: state => {
      return state.SHOW_MODAL;
    },

    SHOW_INTRO_MODAL: state => {
      return state.SHOW_INTRO_MODAL;
    },

    SHOW_APP_DOWNLOAD_MODAL: state => {
      return state.SHOW_APP_DOWNLOAD_MODAL;
    },

    SHOW_LOGIN_ALERT_MODAL: state => {
      return state.SHOW_LOGIN_ALERT_MODAL;
    },

    SHOW_LOGIN_MODAL: state => {
      return state.SHOW_LOGIN_MODAL;
    },

    SHOW_BOTTOM_SHEET: state => {
      return state.SHOW_BOTTOM_SHEET;
    },

    SHOW_CAT_SHEET: state => {
      return state.SHOW_CAT_SHEET;
    },

    SHOW_UPDATE_MODAL: state => {
      return state.SHOW_UPDATE_MODAL;
    },

    SHOW_BODYTYPE_SHEET: state => {
      return state.SHOW_BODYTYPE_SHEET;
    },

    SHOW_REVIEW_MODAL: state => {
      return state.SHOW_REVIEW_MODAL;
    },

    SHOW_BODYTYPE_MODAL: state => {
      return state.SHOW_BODYTYPE_MODAL;
    },

    SHOW_LOGIN_SHEET: state => {
      return state.SHOW_LOGIN_SHEET;
    },

    REVIEW_ID: state => {
      return state.REVIEW_ID;
    },

    IS_SEARCH: state => {
      return state.IS_SEARCH;
    },

    PAGE_NUMBER: state => {
      return state.PAGE_NUMBER;
    },

    TOTAL_PAGE_NUMBER: state => {
      return state.TOTAL_PAGE_NUMBER;
    },

    HAS_LOGO: state => {
      return state.HAS_LOGO;
    },

    HEADER_TITLE: state => {
      return state.HEADER_TITLE;
    },

    CURRENT_DEVICE: state => {
      return state.CURRENT_DEVICE;
    },

    ACTIVE_FILTER: state => {
      return state.ACTIVE_FILTER;
    }
  },

  mutations: {
    SET_IS_LOADING(state, payload = false) {
      state.IS_LOADING = payload;
    },

    SET_SHOW_MODAL(state, payload) {
      state.SHOW_MODAL = payload;
    },

    SET_RECENT_TAGS(state, payload) {
      state.RECENT_TAGS = payload;
    },

    SET_SHOW_INTRO_MODAL(state, payload) {
      state.SHOW_INTRO_MODAL = payload;
    },

    SET_SHOW_APP_DOWNLOAD_MODAL(state, payload) {
      state.SHOW_APP_DOWNLOAD_MODAL = payload;
    },

    SET_SHOW_LOGIN_ALERT_MODAL(state, payload) {
      state.SHOW_LOGIN_ALERT_MODAL = payload;
    },

    SET_SHOW_LOGIN_MODAL(state, payload) {
      state.SHOW_LOGIN_MODAL = payload;
    },

    SET_SHOW_BOTTOM_SHEET(state, payload) {
      state.SHOW_BOTTOM_SHEET = payload;
    },

    SET_SHOW_CAT_SHEET(state, payload) {
      state.SHOW_CAT_SHEET = payload;
    },

    SET_SHOW_UPDATE_MODAL(state, payload) {
      state.SHOW_UPDATE_MODAL = payload;
    },

    SET_SHOW_BODYTYPE_SHEET(state, payload) {
      state.SHOW_BODYTYPE_SHEET = payload;
    },

    SET_SHOW_BODYTYPE_MODAL(state, payload) {
      state.SHOW_BODYTYPE_MODAL = payload;
    },

    SET_SHOW_REVIEW_MODAL(state, payload) {
      state.SHOW_REVIEW_MODAL = payload;
    },

    SET_SHOW_LOGIN_SHEET(state, payload) {
      state.SHOW_LOGIN_SHEET = payload;
    },

    SET_REVIEW_ID(state, payload) {
      state.REVIEW_ID = payload;
    },

    SET_IS_SEARCH(state, payload) {
      state.IS_SEARCH = payload;
    },

    SET_PAGE_NUMBER(state, payload) {
      state.PAGE_NUMBER = payload;
    },

    SET_TOTAL_PAGE_NUMBER(state, payload) {
      state.TOTAL_PAGE_NUMBER = payload;
    },

    SET_HAS_LOGO(state, payload) {
      state.HAS_LOGO = payload;
    },

    SET_HEADER_TITLE(state, payload) {
      state.HEADER_TITLE = payload;
    },

    SET_CURRENT_DEVICE(state, payload) {
      state.CURRENT_DEVICE = payload;
    },

    SET_ACTIVE_FILTER(state, payload) {
      state.ACTIVE_FILTER = payload;
    }
  },

  actions: {
    nuxtClientInit() {},

    startLoading({ commit }) {
      commit("SET_IS_LOADING", true);
    },

    endLoading({ commit }) {
      commit("SET_IS_LOADING", false);
    },

    startWait({ commit }) {
      commit("SET_IS_WAIT", true);
    },

    endWait({ commit }) {
      commit("SET_IS_WAIT", false);
    },

    openModal({ commit }) {
      commit("SET_SHOW_MODAL", true);
    },

    closeModal({ commit }) {
      commit("SET_SHOW_MODAL", false);
    },
    
    openIntroModal({ commit }) {
      commit("SET_SHOW_INTRO_MODAL", true);
    },

    closeIntroModal({ commit }) {
      commit("SET_SHOW_INTRO_MODAL", false);
    },
    
    openLoginModal({ commit }) {
      commit("SET_SHOW_LOGIN_MODAL", true);
    },

    closeLoginModal({ commit }) {
      commit("SET_SHOW_LOGIN_MODAL", false);
    },

    openBottomSheet({ commit }) {
      commit("SET_SHOW_BOTTOM_SHEET", true);
    },

    closeBottomSheet({ commit }) {
      commit("SET_SHOW_BOTTOM_SHEET", false);
    },

    openCatSheet({ commit }) {
      commit("SET_SHOW_CAT_SHEET", true);
    },

    closeCatSheet({ commit }) {
      commit("SET_SHOW_CAT_SHEET", false);
    },

    updateModal({ commit }, payload) {
      commit("SET_SHOW_UPDATE_MODAL", payload);
    },

    openBodytypeSheet({ commit }) {
      commit("SET_SHOW_BODYTYPE_SHEET", true);
    },

    closeBodytypeSheet({ commit }) {
      commit("SET_SHOW_BODYTYPE_SHEET", false);
    },

    openBodytypeModal({ commit }) {
      commit("SET_SHOW_BODYTYPE_MODAL", true);
    },

   closeBodytypeModal({ commit }) {
        commit("SET_SHOW_BODYTYPE_MODAL", false);
    },

    openReviewModal({ commit }) {
      commit("SET_SHOW_REVIEW_MODAL", true);
    },

   closeReviewModal({ commit }) {
        commit("SET_SHOW_REVIEW_MODAL", false);
    },

    openLoginSheet({ commit }) {
      commit("SET_SHOW_LOGIN_SHEET", true);
    },

    closeLoginSheet({ commit }) {
      commit("SET_SHOW_LOGIN_SHEET", false);
    },

    isSearching({ commit }) {
      commit("SET_IS_SEARCH", true);
    },

    notSearching({ commit }) {
      commit("SET_IS_SEARCH", false);
    },

    setReviewId({ commit }, payload) {
      commit("SET_REVIEW_ID", payload);
    },

    isRecentTag({ commit }, payload) {
      commit("SET_RECENT_TAGS", payload);
    },

    setPageNumber({ commit },payload) {
      commit("SET_PAGE_NUMBER", payload);
    },

    setTotalPageNumber({ commit },payload) {
      console.log(payload);
      commit("SET_TOTAL_PAGE_NUMBER", payload);
    },

    setLogo({ commit }, payload) {
      commit("SET_HAS_LOGO", payload);
    },

    setHeaderTitle({ commit }, payload) {
      commit("SET_HEADER_TITLE", payload);
    },

    setCurrentDevice({ commit }) {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;

      let device;

      if (/windows phone/i.test(userAgent)) {
        device = "Windows Phone";
      } else if (/android/i.test(userAgent)) {
        device = "android";
      } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        device = "ios";
      } else {
        device = "web";
      }

      commit("SET_CURRENT_DEVICE", device);
    },

    setActiveFilter({ commit }, payload) {
      commit("SET_ACTIVE_FILTER", payload);
    }

  }
};

export default app;
