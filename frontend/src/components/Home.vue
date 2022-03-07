<template lang="html">

  <section id="home" class="p-12 relative">
    <h1 class="text-6xl font-medium text-center mb-6">Bienvenue sur Cook<span class="text-amber-400 font-extrabold mx-2">&</span>Chief</h1>

    <div v-if="isLoaded">
      <div class="text-gray-600 body-font overflow-hidden">
        <div class="container px-5 py-16 mx-auto">
          <div class="divide-y-2 divide-gray-100">

            <div class="flex flex-row place-items-center mb-3">
              <span class="flex flex-grow uppercase font-semibold">Affichage</span>
              <div class="w-32">
                <select v-model="nbRecipes" v-on:change="load()" class="form-select cursor-pointer appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none">
                  <option selected value="3">3 recettes</option>
                  <option value="5">5 recettes</option>
                  <option value="10">10 recettes</option>
                </select>
              </div>
            </div>


            <div class="relative py-8 flex flex-wrap items-center md:flex-nowrap" v-for="recipe in pagination.data" :key="recipe._id">
              <img class="h-48 object-contain w-64 md:mb-0 flex-shrink-0 flex flex-col aspect-square object-cover rounded-md" :src="recipe.image ? recipe.image : 'https://via.placeholder.com/900'" :alt="recipe.name">
              <div class="md:flex-grow p-4">
                <h2 class="text-2xl font-medium text-gray-900 capitalize title-font mb-2">{{recipe.name}}</h2>
                <p class="leading-relaxed">{{recipe.description}}</p>
                <router-link :to="{ name: 'Recipe', params: { id: recipe._id }}" class="text-amber-400 inline-flex items-center mt-4 hover:text-amber-500 transition ease-in-out delay-75">Voir la recette
                  <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                </router-link>
              </div>
              <div class="absolute bottom-8 right-8">
                <button v-if="isCreator(recipe)" v-on:click="deleteRecipe(recipe)" class="text-red-500 inline-flex items-center mt-4 hover:text-red-600 transition ease-in-out delay-75">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <router-link :to="{ name: 'CreateRecipe'}" type="button" data-mdb-ripple="true" data-mdb-ripple-color="light" class="place-content-center place-items-center fixed bottom-8 right-8 inline-flex rounded-md bg-amber-400 text-white leading-normal uppercase shadow-md hover:bg-amber-500 hover:shadow-lg focus:bg-amber-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-amber-500 active:shadow-lg transition duration-150 ease-in-out w-9 h-9">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
        </svg>
      </router-link>

      <div class="flex justify-center">
        <nav aria-label="Page navigation">
          <ul class="flex list-style-none">
            <li class="page-item">
              <button class="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded"
                      :class="pagination.previousPage === null ? 'text-gray-500 pointer-events-none focus:shadow-none disabled' : 'text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none'"
                      v-on:click="previous()">Précédent</button>
            </li>
            <li class="page-item" v-for="index in pagination.totalPages" :key="index">
              <button class="page-link relative block py-1.5 px-3 rounded border-0 outline-none transition-all duration-300 rounded"
                      :class="index === pagination.page ? 'bg-amber-400 text-white hover:text-white hover:bg-amber-400 shadow-md focus:shadow-md' : 'bg-transparent text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none'"
                      v-on:click="index > pagination.page ? next() : index < pagination.page ? previous() : null ">{{ index }}</button>
            </li>
            <li class="page-item">
              <button class="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded"
                      :class="pagination.nextPage === null ? 'text-gray-500 pointer-events-none focus:shadow-none disabled' : 'text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none'"
                      v-on:click="next()">Suivant</button>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <div id="loading" class="fixed inset-0 bg-gray-200/50 flex items-center justify-center space-x-2" v-else>
      <div class="spinner-border animate-spin inline-block w-64 h-64 border-8 rounded-full text-amber-400" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

  </section>
</template>

<script>
  import recipeDao from '../api/recipeDao.js'
  export default  {
    name: 'Home',
    data() {
      return {
        recipes : [],
        pagination : {},
        user: {},
        isLoaded : false,
        nbRecipes: 3,
      }
    },
    methods : {
      isCreator(recipe) {
        let creator = recipe['created by'];
        return creator[0]._id === this.user._id;
      },
      deleteRecipe(recipe) {
        recipeDao.remove(recipe._id).then(this.load()).catch(e => console.error(e))
      },
      previous() {
        this.pagination = this.paginate(this.recipes, this.pagination.previousPage, this.nbRecipes)
      },
      next() {
        this.pagination = this.paginate(this.recipes, this.pagination.nextPage, this.nbRecipes)
      },
      paginate(items, currentPage, perPageItems) {
        let page = currentPage || 1,
            perPage = perPageItems || 3,
            offset = (page - 1) * perPage,

            paginatedItems = items.slice(offset).slice(0, perPageItems),
            totalPages = Math.ceil(items.length / perPage);

        return {
          page: page,
          perPage: perPage,
          previousPage: page - 1 ? page - 1 : null,
          nextPage: (totalPages > page) ? page + 1 : null,
          total: items.length,
          totalPages: totalPages,
          data: paginatedItems
        };
      },
      load() {
        this.isLoaded = false;
        this.user = this.$store.getters['user'];
        if(!this.$store.state.jwt) {
          console.log("Not connected");
          this.$router.push('/login');
        } else {
          this.$store.dispatch("setRecipes").then(e => {
                if (e) {
                  this.recipes = this.$store.getters["recipes"]
                  this.pagination = this.paginate(this.$store.getters["recipes"],1, this.nbRecipes)
                  this.isLoaded = true;
                } else {
                  console.error("Erreur lors de la récupération des recettes");
                }
              }
          );
        }
      }
    },
    mounted() {
      this.load();
    },
}

</script>
