<template>
  <div
    class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="w-full max-w-md space-y-8">
      <div>
        <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow"/>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Connexion</h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Ou {{ " " }}
          <router-link to="/register" class="font-medium text-indigo-600 hover:text-indigo-500">inscription ?</router-link>
        </p>
      </div>
      <form class="mt-8 space-y-6" action="#" method="POST">
        <input type="hidden" name="remember" value="true" />
        <div class="-space-y-px rounded-md shadow-sm">
          <div>
            <label for="email-address" class="sr-only">Adresse courriel</label>
            <input id="email-address" name="email" type="email" autocomplete="email" required="" class="focus:outline-none relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="Adresse courriel"/>
          </div>
          <div>
            <label for="password" class="sr-only">Mot de passe</label>
            <input id="password" name="password" type="password" autocomplete="current-password" required="" class="focus:outline-none relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="Mot de passe"/>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"/>
            <label for="remember-me" class="ml-2 block text-sm text-gray-900">Se souvenir</label>
          </div>
        </div>

        <div>
          <button type="submit" class="group focus:outline-none relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Valider</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
};
</script>
