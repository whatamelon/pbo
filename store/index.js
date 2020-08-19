import Vuex from "vuex";

import app from "@/store/modules/app";
import filter from "@/store/modules/filter";
import model from "@/store/modules/model";
import navigation from "@/store/modules/navigation";
import product from "@/store/modules/product";
import user from "@/store/modules/user";
import qurate from "@/store/modules/qurate";
import auth from "@/store/modules/auth";
import order from "@/store/modules/order";

const store = () => {
  return new Vuex.Store({
    state: {},
    getters: {},
    mutations: {},
    modules: {
      app,
      filter,
      model,
      navigation,
      product,
      user,
      qurate,
      auth,
      order
    }
  });
};

export default store;
