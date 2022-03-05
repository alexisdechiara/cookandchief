<template lang="html">
  <header id="header" v-if="isConnected()">
    <nav class="navbar navbar-expand-lg navbar-light relative flex w-full flex-wrap items-center justify-between bg-gray-100 py-2 text-gray-500 shadow-lg hover:text-gray-700 focus:text-gray-700">
      <div class="container-fluid flex w-full flex-wrap items-center justify-between px-6">
        <button class="navbar-toggler focus:outline-none border-0 bg-transparent py-2 px-2.5 text-gray-500 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:ring-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bars" class="w-6" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path fill="currentColor" d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path>
          </svg>
        </button>
        <div class="collapse navbar-collapse flex-grow items-center" id="navbarSupportedContent">
          <router-link class="mt-2 mr-1 flex items-center text-gray-900 hover:text-gray-900 focus:text-gray-900 lg:mt-0" to="/">
            <img src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" style="height: 15px" alt="" loading="lazy"/>
          </router-link>
          <ul class="navbar-nav list-style-none mr-auto flex flex-col pl-0">
            <li class="nav-item p-2">
              <router-link class="nav-link p-0 text-gray-500 hover:text-gray-700 focus:text-gray-700" to="/">Accueil</router-link>
            </li>
            <li class="nav-item p-2">
              <router-link class="nav-link p-0 text-gray-500 hover:text-gray-700 focus:text-gray-700" :to="{ name: 'CreateRecipe'}">Nouvelle recette</router-link>
            </li>
          </ul>
        </div>

        <div class="relative flex text-black items-center">
          <span class="mr-2">{{ getUser().firstname }} {{getUser().lastname}}</span>
          <div class="dropdown relative">
            <a class="dropdown-toggle text-black hidden-arrow flex items-center" id="dropdownMenuButton2" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd" />
              </svg>
            </a>
            <ul class="dropdown-menu absolute left-auto right-0 z-50 float-left m-0 mt-1 hidden hidden min-w-max list-none rounded-lg border-none bg-white bg-clip-padding py-2 text-left text-base shadow-lg" aria-labelledby="dropdownMenuButton2">
              <li><button v-on:click="logout" class="dropdown-item block w-full whitespace-nowrap bg-transparent py-2 px-4 text-sm font-normal text-gray-700 hover:bg-gray-100">Deconnexion</button></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script lang="js">
  export default  {
    name: 'header',
    props: [],
    computed() {

    },
    methods: {
      getUser() {
        return this.$store.getters["user"];
      },
      isConnected() {
        return this.$store.getters["jwt"] != null;
      },
      logout() {
        this.$store.dispatch('disconnectUser').then(this.$router.push('/login')).catch(e => console.error(e))
      }
    }
}
</script>
