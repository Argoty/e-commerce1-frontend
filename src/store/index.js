import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: false,
    snackbar: {
      message: "",
      type: "",
    },

    isAuthenticated: false,
    isAdmin: false,
    token: '',
    currentUser: {},

    title: "E-commerce",
  },
  getters: {
  },
  mutations: {
    initializeStore(state) {
      if (localStorage.getItem('token')) {
        state.token = localStorage.getItem("token");
        state.isAuthenticated = true;
        state.currentUser = JSON.parse(localStorage.getItem("currentUser"));

        if (state.currentUser.role.includes("admin")) {
          state.isAdmin = true
        } else {
          state.isAdmin = false
        }
      } else {
        state.token = '';
        state.isAuthenticated = false;
        state.isAdmin = false
        state.currentUser = {}
      }
    },
    

    setToken(state, payload) {
      state.token = payload.token;
      state.isAuthenticated = true;
      state.currentUser = payload.user

      if (state.currentUser.role.includes("admin")) {
        state.isAdmin = true;
      } else {
        state.isAdmin = false
      }
    },


    removeToken(state) {
      localStorage.removeItem("token");
      localStorage.removeItem("currentUser");
      
      state.token = '';
      state.isAuthenticated = false;
      state.isAdmin = false;
      state.currentUser = {};
    },

    setIsLoading(state, status) {
      state.isLoading = status;
    },
    setSnackbar(state, payload) {
      state.snackbar = payload;
    },
  },
  actions: {
  },
  modules: {
  }
})
