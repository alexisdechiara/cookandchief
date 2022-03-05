<template lang="html">

  <section id="home" class="p-12">
    <h1 class="text-6xl font-medium text-center mb-6">Bienvenue sur Cook<span class="text-yellow-500 font-extrabold">&</span>Chief</h1>
    <div class="text-gray-600 body-font overflow-hidden">
      <div class="container px-5 py-16 mx-auto">
        <div class="divide-y-2 divide-gray-100">
          <div class="py-8 flex flex-wrap items-center md:flex-nowrap" v-for="recipe in recipes" :key="recipe.id">
            <img class="h-48 object-contain w-64 md:mb-0 flex-shrink-0 flex flex-col aspect-square object-cover rounded-md" :src="recipe.image ? recipe.image : 'https://via.placeholder.com/900'" :alt="recipe.name">
            <div class="md:flex-grow p-4">
              <h2 class="text-2xl font-medium text-gray-900 capitalize title-font mb-2">{{recipe.name}}</h2>
              <p class="leading-relaxed">{{recipe.description}}</p>
              <router-link :to="{ name: 'Recipe', params: { id: recipe._id }}" class="text-yellow-500 inline-flex items-center mt-4">Learn More
                <svg class="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

  export default  {
    name: 'home',
    props: [],
    data() {
      return {
        recipes : []
      }
    },
    mounted() {
      if(!this.$store.state.jwt) {
        console.log("Not connected");
        this.$router.push('/login');
      } else {
        this.$store.dispatch("setRecipes").then(e => {
              if (e) {
                console.log("Recettes récupérés");
                this.recipes = this.$store.getters["recipes"];
              } else {
                console.log("Erreur lors de la récupération des recettes");
              }
            }
        );
      }
    },
}

</script>
