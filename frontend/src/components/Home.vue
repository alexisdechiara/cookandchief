<template lang="html">

  <section class="home">
    <h1>Hello</h1>
  </section>

</template>

<script>

  export default  {
    name: 'home',
    props: [],
    mounted: function () {
      if(!this.$store.state.jwt) {
        console.log("Not connected");
        this.$router.push('/login');
      }
    }
}

</script>
