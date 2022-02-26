<template lang="html">

  <section id="recipe" class="container relative  py-16 px-64 flex flex-col">
      <div class="flex h-64 w-full rounded-lg bg-white shadow-md">
        <img class="h-full object-cover rounded-t-lg md:rounded-none md:rounded-l-lg" :src="recipe.image ? recipe.image : 'https://via.placeholder.com/900'"  :alt="recipe.name"/>
        <div class="p-6 flex flex-col justify-start">
          <contenteditable tag="p" class="text-gray-900 text-4xl font-medium mb-4" :class="isEditable ? 'cursor-pointer' : 'cursor-auto'	" :contenteditable="isEditable" v-model="recipe.name" :noNL="true"/>
          <contenteditable tag="p" class="text-gray-700 text-xl mb-4" :class="isEditable ? 'cursor-pointer' : 'cursor-auto'	" :contenteditable="isEditable" v-model="recipe.description" :noNL="true"/>
          <input type="text" v-if="isEditable" class="form-control block w-full py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="imageUrl" v-model="recipe.image" placeholder="URL de l'image"/>
        </div>
      </div>
    <contenteditable tag="div" class="w-full max-w-none mt-8 p-4" :class="isEditable ? 'cursor-pointer' : 'cursor-auto'	" :contenteditable="isEditable" v-model="recipe.ingredients" :noNL="true"/>
    <contenteditable tag="div" class="w-full max-w-none mt-8 p-4 rounded-xl bg-slate-50 prose prose-slate prose-headings:block prose-headings:text-indigo-500" :class="isEditable ? 'cursor-pointer' : 'cursor-auto'	" :contenteditable="isEditable" v-model="recipe.steps"/>
    <div class="fixed bottom-0 right-0 m-8" :class="isEditable ? 'cursor-pointer' : 'cursor-auto'	" v-if="isCreator">
      <button type="button" class="inline-flex items-center rounded-full px-2 mr-1 bg-red-600 text-white leading-normal uppercase shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out w-12 h-12">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-8 mx-auto" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
        </svg>
      </button>
      <button type="button" v-on:click="isEditable = !isEditable" class="inline-flex flex-row items-center rounded-full px-4 ml-1 bg-blue-600 text-white leading-normal uppercase shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out h-12">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-8" viewBox="0 0 20 20" fill="currentColor">
          <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
          <path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd" />
        </svg>
        <span v-if="!isEditable">Modifier</span>
        <span v-else>Sauvegarder</span>
      </button>
    </div>
  </section>
</template>

<script>
  import contenteditable from 'vue-contenteditable'
  export default  {
    name: 'Recipe',
    components: contenteditable,
    props: [],
    data() {
      return {
        recipe : {},
        user: {},
        isCreator: false,
        isEditable: false,
      }
    },
    created() {
      if(!this.$store.state.jwt) {
        console.log("Not connected");
        this.$router.push('/login');
      } else {
        this.$store.dispatch("setCurrentRecipe", this.$route.params.id).then(e => {
              if (e) {
                console.log("Recettes récupérés");
                this.recipe = this.$store.getters['currentRecipe'];
                this.user = this.$store.getters['user'];
                this.isCreator = this.checkCreator();
              } else {
                console.log("Erreur lors de la récupération de la recette");
              }
            }
        );
      }
    },
    methods: {
      checkCreator() {
        let creator = this.recipe['created by'];
        return creator[0]._id === this.user._id;
      },
    }
}

</script>
