<template>
  <div class="w-full flex flex-wrap">

    <!-- Login Section -->
    <div class="w-full md:w-1/2 flex flex-col">

      <div class="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
        <p class="text-center text-4xl font-bold mt-8">Connexion</p>
        <form class="flex flex-col pt-3 md:pt-8" v-on:submit="login" method="POST">

          <div class="flex flex-col pt-4">
            <label for="email" class="form-label inline-block mb-1 text-gray-700">Adresse courriel</label>
            <input type="email" id="email" class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-yellow-600 focus:ring-yellow-600 focus:outline-none">
          </div>

          <div class="flex flex-col pt-4">
            <label for="password" class="form-label inline-block mb-1 text-gray-700">Mot de passe</label>
            <input type="password" id="password" class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-yellow-600 focus:ring-yellow-600 focus:outline-none">
          </div>

          <button type="submit" class="p-2 mt-8 w-full inline-block px-6 py-2.5 bg-yellow-500 text-white font-medium text-md leading-normal uppercase rounded shadow-md hover:bg-yellow-600 hover:shadow-lg focus:bg-yellow-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-800 active:shadow-lg transition duration-150 ease-in-out">Se connecter</button>
        </form>
        <div class="text-center pt-12 pb-12">
          <div>Vous n'avez pas de compte ? <router-link to="/register" class="underline font-semibold">S'inscrire</router-link></div>
        </div>
      </div>

    </div>

    <!-- Image Section -->
    <div class="w-1/2 shadow-2xl">
      <img class="object-cover w-full h-screen hidden md:block" src="https://source.unsplash.com/IXUM4cJynP0" alt="">
    </div>
  </div>
</template>

<script>

export default {
  name: "login",
  methods: {
    login(e) {
      e.preventDefault()
      let email = e.target.elements.email.value
      let password = e.target.elements.password.value
      let data = {
        "email": email,
        "password": password
      }
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
