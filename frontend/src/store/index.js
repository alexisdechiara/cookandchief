import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from 'vuex-persist'

import recipeDao from "../api/recipeDao.js"
import userDao from "../api/userDao.js"

Vue.use(Vuex);

const vuexPersist = new VuexPersist({
  storage: window.localStorage
})

export default new Vuex.Store({
  plugins: [vuexPersist.plugin],
  state: {
    jwt : null,
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
      return userDao.login(user)
      .then((response) => {
        commit("updateJwt", response.data.jwt);
        commit("updateUser", response.data.user);
        return true;
      })
      .catch((errors) => {
        console.error(errors)
        return false;
      })
    },
    disconnectUser({commit}) {
        commit("updateJwt", null);
        commit("updateUser", {});
    },
    setRecipes({commit}) {
      return recipeDao.findAll()
      .then((response) => {
        commit("updateRecipes", response.data);
        return true;
      })
      .catch((errors) => {
        return false;
      })
    },
    setCurrentRecipe({commit},id) {
      return recipeDao.findOne(id)
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
