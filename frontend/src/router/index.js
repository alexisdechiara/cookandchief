import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/Home.vue";
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";
import Recipe from "../components/Recipe.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: '/create',
    alias: "/recipe/create",
    name: "CreateRecipe",
    component: Recipe,
    props: {isNew : true}
  },
  {
    path: "/recipe/:id",
    name: "Recipe",
    component: Recipe,
    props: {isNew : false}
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
