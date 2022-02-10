<template>
  <section id="app" class="flex h-screen flex-col">
    <Header />
    <Body />
    <Footer />
  </section>
</template>

<script>
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";

export default {
  name: "App",
  components: {
    Header,
    Body,
    Footer,
  },
};
</script>
