<template>
  <div id="app">
    <Header/>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Montestrrat-Bold, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
<script>
import Header from "@/components/Header";
export default {
  components: {Header}
}
</script>