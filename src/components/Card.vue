<template>
  <div class="card">
    {{item.id}}
    {{item.name}}
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: ['item']
}
</script>

<style scoped>
.card {
  border: 1px solid black;
  padding: 5px 0;
  width: 500px;
  margin: 0 auto;
  margin-bottom: 5px;
}
.card:hover {
  border: 1px solid blue;
  cursor: pointer;
  background: lightblue;
}
</style>
