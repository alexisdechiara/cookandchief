<template lang="html">
  <footer id="footerComponent" v-if="isConnected()">
    <footer class="bg-gray-200 text-center lg:text-left">
      <div class="p-1 text-center text-gray-700">
        © 2021 Copyright:
        <span class="text-gray-800">Alexis De Chiara & Zacharie Serra</span>
      </div>
    </footer>
  </footer>
</template>

<script lang="js">

  export default  {
    name: 'footer',
    props: [],
    methods: {
      isConnected() {
        return this.$store.getters["jwt"] != null;
      },
    }
}
</script>
