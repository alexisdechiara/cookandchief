<template lang="html">

  <section id="recipe" class="container relative  py-16 px-64 flex flex-col">
    <div class="flex h-64 w-full rounded-lg bg-white shadow-md">
      <img class="w-1/3 object-cover rounded-t-lg md:rounded-none md:rounded-l-lg"
           :src="recipe.image ? recipe.image : 'https://via.placeholder.com/512x512'" :alt="recipe.image"/>
      <div class="p-6 flex flex-col justify-start">
        <contenteditable tag="p" class="text-gray-900 text-4xl font-medium mb-4"
                         :class="isEditable ? 'hover:bg-amber-100 focus:border-1 focus:border-amber-500 focus:ring-amber-500 focus:rounded-md' : 'cursor-auto'	" :contenteditable="isEditable"
                         v-model="recipe.name" :noNL="true"/>
        <contenteditable tag="p" class="text-gray-700 text-xl mb-4"
                         :class="isEditable ? 'hover:bg-amber-100 focus:border-1 focus:border-amber-500 focus:ring-amber-500 focus:rounded-md' : 'cursor-auto'	" :contenteditable="isEditable"
                         v-model="recipe.description" :noNL="true"/>
        <input type="text" v-if="isEditable"
               class="form-control block w-full py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-amber-500 focus:ring-amber-500 focus:outline-none"
               id="imageUrl" v-model="recipe.image" placeholder="URL de l'image"/>
      </div>
    </div>
    <contenteditable tag="div" class="w-full max-w-none mt-8 p-4"
                     :class="isEditable ? 'hover:bg-amber-100 focus:border-1 focus:border-amber-500 focus:ring-amber-500 focus:rounded-md' : 'cursor-auto'" :contenteditable="isEditable"
                     v-model="recipe.ingredients" :noNL="true"/>
    <contenteditable tag="div"
                     class="w-full max-w-none mt-8 p-4 rounded-lg bg-slate-50 prose prose-slate prose-headings:block prose-headings:text-indigo-500"
                     :class="isEditable ? 'hover:bg-amber-100 focus:border-1 focus:border-amber-500 focus:ring-amber-500 focus:rounded-md' : 'cursor-auto'	" :contenteditable="isEditable"
                     v-model="recipe.steps"/>
    <div class="fixed bottom-0 right-0 m-8" :class="isEditable ? 'hover:bg-amber-100  focus:ring-amber-500 focus:rounded-md' : 'cursor-auto'	" v-if="isCreator">
      <button type="button" v-on:click="deleteRecipe" data-mdb-ripple="true" data-mdb-ripple-color="light"
              class="inline-flex items-center rounded-md px-2 mr-1 bg-red-600 text-white leading-normal uppercase shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out w-10 h-10">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 mx-auto" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clip-rule="evenodd"/>
        </svg>
      </button>
      <button type="button" v-on:click="editRecipe" data-mdb-ripple="true" data-mdb-ripple-color="light"
              class="inline-flex flex-row items-center rounded-md px-4 ml-1 bg-blue-600 text-white leading-normal uppercase shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out h-10">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6" viewBox="0 0 20 20" fill="currentColor">
          <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"/>
          <path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"/>
        </svg>
        <span class="w-20 px-1 text-sm" v-if="!isEditable">Modifier</span>
        <span class="w-20 px-1 text-xs" v-else>Sauvegarder</span>
      </button>
    </div>
    <div class="fixed bottom-0 right-0 m-8" v-if="isNew">
      <button type="button" v-on:click="createRecipe" data-mdb-ripple="true" data-mdb-ripple-color="light" class="inline-flex items-center justify-center rounded-md px-2 mr-1 bg-green-600 text-white leading-normal uppercase shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out w-9 h-9">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4" viewBox="0 0 418 512" fill="currentColor">
          <path d="M433.1 129.1l-83.9-83.9C342.3 38.32 327.1 32 316.1 32H64C28.65 32 0 60.65 0 96v320c0 35.35 28.65 64 64 64h320c35.35 0 64-28.65 64-64V163.9C448 152.9 441.7 137.7 433.1 129.1zM224 416c-35.34 0-64-28.66-64-64s28.66-64 64-64s64 28.66 64 64S259.3 416 224 416zM320 208C320 216.8 312.8 224 304 224h-224C71.16 224 64 216.8 64 208v-96C64 103.2 71.16 96 80 96h224C312.8 96 320 103.2 320 112V208z"/>
        </svg>
      </button>
    </div>
  </section>
</template>

<script>
import contenteditable from 'vue-contenteditable'
import recipeDao from '../api/recipeDao.js'

export default {
  name: 'Recipe',
  components: contenteditable,
  props: {
    isNew: Boolean,
    edit: Boolean
  },
  data() {
    return {
      recipe: {},
      user: {},
      isCreator: false,
      isEditable: false,
    }
  },
  mounted() {
    if (!this.$store.state.jwt) {
      this.$router.push('/login');
    }
    this.user = this.$store.getters['user'];
    if (this.isNew) {
      this.recipe = {
        "name": "Titre de la recette",
        "description": "Merci de mettre une petite description",
        "ingredients": "Ensembles des ingrédients",
        "steps": "Les étapes de la préparation de la recette",
        "created by": this.user
      }
      this.isEditable = true
    } else {
      this.$store.dispatch("setCurrentRecipe", this.$route.params.id).then(e => {
            if (e) {
              this.recipe = this.$store.getters['currentRecipe'];
              this.isCreator = this.checkCreator();
            } else {
              this.$router.push('/');
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
    deleteRecipe() {
      recipeDao.remove(this.recipe._id).then(setTimeout(() => { this.$router.push('/') }, 1000)).catch(e => console.error(e))
    },
    editRecipe() {
      if (this.isEditable)
        recipeDao.update(this.recipe._id, this.recipe).then(this.isEditable = false).catch(e => console.error(e))
      else
        this.isEditable = true
    },
    createRecipe() {
      recipeDao.create(this.recipe).then(this.$router.push('/')).catch(e => console.error(e))
    }
  }
}
</script>
