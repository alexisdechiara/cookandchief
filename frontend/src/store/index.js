import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    jwt : ''
  },
  mutations: {
      updateJwt(state, jwt) {
        state.jwt = jwt;
      }
  },
  actions: {
    connectUser({commit}, user) {
            return axios.post("http://localhost:1337/login", user)
            .then((response) => {
              commit("updateJwt", response.data.jwt);
              return true;
            })
            .catch((errors) => {
              return false;
            })
    }
  },
  modules: {},
});
