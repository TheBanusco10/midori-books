import { createStore } from 'vuex'

import VueCookies from "vue-cookies";

export default createStore({
  state: {
    user: VueCookies.get('midori-books') || null
  },
  getters: {
    user: state => {
      return state.user
    }
  },
  mutations: {
    setUser: (state, user) => {
      state.user = user;
    }
  },
  actions: {
  },
  modules: {
  }
})
