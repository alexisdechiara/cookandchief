<template>
  <div class="w-full flex flex-wrap">

    <div class="w-full flex flex-wrap">

      <!-- Register Section -->
      <div class="w-full md:w-1/2 flex flex-col">

        <div class="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
          <p class="text-center text-4xl font-bold mt-8">Inscription</p>
          <form class="flex flex-col pt-3 md:pt-8" v-on:submit="register" method="POST">

            <div class="flex flex-col pt-4">
              <label for="firstname" class="form-label inline-block mb-1 text-gray-700">Prénom</label>
              <input type="text" required id="firstname" placeholder="Jean" class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-amber-500 focus:ring-amber-500 focus:outline-none" />
            </div>

            <div class="flex flex-col pt-4">
              <label for="lastname" class="form-label inline-block mb-1 text-gray-700">Nom</label>
              <input type="text" required id="lastname" placeholder="Dupond" class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-amber-500 focus:ring-amber-500 focus:outline-none" />
            </div>

            <div class="flex flex-col pt-4">
              <label for="email" class="form-label inline-block mb-1 text-gray-700">Adresse de courriel</label>
              <input type="email" required id="email" placeholder="votre@mail.com" :class="emailError || alreadyExists ? 'border-red-600' : 'border-gray-300'" class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-amber-500 focus:ring-amber-500 focus:outline-none" />
              <span v-if="alreadyExists" class="text-xs text-red-500 w-100 block mt-1">Cet addresse de courriel est déjà utilisé</span>
              <span v-else-if="emailError" class="text-xs text-red-500 w-100 block mt-1">L'addresse de courriel doit avoir un domaine</span>
            </div>

            <div class="flex flex-col pt-4">
              <label for="password" class="form-label inline-block mb-1 text-gray-700">Mot de passe</label>
              <input type="password" required id="password" placeholder="··········" class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid rounded transition ease-in-out m-0 border-gray-300 focus:text-gray-700 focus:bg-white focus:border-amber-500 focus:ring-amber-500 focus:outline-none" />
            </div>

            <button type="submit" class="p-2 mt-8 w-full inline-block px-6 py-2.5 bg-amber-400 text-white font-medium text-md leading-normal uppercase rounded shadow-md hover:bg-amber-500 hover:shadow-lg focus:bg-amber-500 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-amber-500 active:shadow-lg transition duration-150 ease-in-out"> S'inscrire </button>
          </form>
          <div class="text-center pt-12 pb-12">
            <div>Déjà un compte ? <router-link to="/login" class="underline decoration-2 hover:text-amber-400 hover:decoration-amber-400 transition ease-in-out delay-75 font-semibold">Se connecter</router-link></div>
          </div>
        </div>

      </div>

      <!-- Image Section -->
      <div class="w-1/2 shadow-2xl">
        <img class="object-cover w-full h-screen hidden md:block" src="/img/background.jpg"/>
      </div>
    </div>

  </div>
</template>

<script>

import dao from '../api/userDao'

export default {
  name: "register",
  data() {
    return {
      emailError: false,
      passwordError: false,
      alreadyExists: false,
    }
  },
  methods: {
    register(e) {
      e.preventDefault()
      const firstname = e.target.elements.firstname.value
      const lastname = e.target.elements.lastname.value
      const email = e.target.elements.email.value
      const password = e.target.elements.password.value
      this.emailError = !new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g).test(email)
      console.log(this.emailError)
      if(!this.emailError) {
        const userRegistration = {
          "firstname" : firstname,
          "lastname" : lastname,
          "email" : email,
          "password" : password
        }
        dao.register(userRegistration).then(e => {
          if(!e.data.exists){
            console.log("User created")
            const userLogin = {
              "email" : email,
              "password" : password
            }
            setTimeout(() => { this.login(userLogin) }, 1000);
          } else {
            console.log("User already exists")
            this.alreadyExists = true
          }
        }).catch(e => {
          console.error(e)
        })
      }
    },
    login(data) {
      this.$store.dispatch('connectUser', data).then(e => {
            if (e) {
              this.$router.push('/')
            } else {
              console.log("Error login")
            }
          }
      )
    }
  }
};
</script>
