<template>
  <div class="loader">
    <img
        v-if="show"
        src="../assets/icons/loader.svg"
        alt="loader">
  </div>
</template>

<script>
export default {
  name: "Loader",
  props: ['show']
}
</script>

<style scoped>
.loader {
  position: fixed;
  top: 45vh;
  left: 45vw;

}
</style>