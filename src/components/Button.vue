<template>
  <div
      @click="openWindow"
      class="button"
      :style="{ width: width, height: height }">
    {{text}}
  </div>
</template>

<script>
export default {
  name: "Button",
  props: ['link', 'text', 'width', 'height'],
  methods: {
    openWindow() {
      this.link && window.open(this.link);
    }
  }
}
</script>

<style scoped>
.button {
  background: #0E80D5;
  border-radius: 10px;
  margin: auto 0;
  margin-right: 15px;
  font-size: 14px;
  font-weight: 600;
  color: white;
  line-height: 48px;
}
.button:hover {
  cursor: pointer;
}
</style>