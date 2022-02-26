import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export const api = axios.create({
  baseURL: "http://localhost:1337/",
  headers: {
    'Content-type': 'application/json'
  }
})

export default new Vuex.Store({
  state: {
    jwt : '',
    recipes : [],
    currentRecipe: {},
    user: {}
  },
  mutations: {
    updateJwt(state, jwt) {
        state.jwt = jwt;
    },
    updateUser(state, user) {
      state.user = user;
    },
    updateRecipes(state, recipes) {
      state.recipes = recipes;
    },
    updateCurrentRecipe(state, recipe) {
    state.currentRecipe = recipe;
    },
  },
  actions: {
    connectUser({commit}, user) {
            return api.post("/login", user)
            .then((response) => {
              commit("updateJwt", response.data.jwt);
              commit("updateUser", response.data.user);
              return true;
            })
            .catch((errors) => {
              return false;
            })
    },
    setRecipes({commit}) {
      return api.get("/recipes")
      .then((response) => {
        commit("updateRecipes", response.data);
        return true;
      })
      .catch((errors) => {
        return false;
      })
    },
    setCurrentRecipe({commit},id) {
      return api.get("/recipe/" + id)
      .then((response) => {
        commit("updateCurrentRecipe", response.data);
        return true;
      })
      .catch((errors) => {
        return false;
      })
    },
  },
  getters: {
    recipes: function (state) {
      return state.recipes;
    },
    currentRecipe: function (state) {
      return state.currentRecipe;
    },
    user: function (state) {
      return state.user;
    },
    jwt: function (state) {
      return state.jwt;
    },
  },
});
