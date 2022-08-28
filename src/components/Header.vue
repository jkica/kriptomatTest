<template>
  <div class="header">
    <img
        @click="openWindow('https://kriptomat.io/')"
        class="header-logo"
        src="../assets/logo.svg"
        alt="logo">
      <Button
          :link="'https://kriptomat.io/register'"
          :text="'Kriptomat account'"
          :height="'48px'"
          :width="'343px'"/>
  </div>
</template>

<script>
import Button from "@/components/Button";
export default {
  name: "Header",
  components: {Button},
  methods: {
    openWindow (url) {
      window.open(url);
    }
  }
}
</script>

<style scoped>
.header {
  display: inline-flex;
  justify-content: space-between;
  width: 100%;
  height: 100px;
  background: #FBFBFB;
  margin-bottom: 40px;
}
.header-logo {
  margin: auto 0;
  margin-left: 15px;
  height: 70px;
}
img:hover {
  cursor: pointer;
}
</style>