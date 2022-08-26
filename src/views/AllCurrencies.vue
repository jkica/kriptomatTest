<template>
  <div class="home">
    <h1>This is all currencies page</h1>
    <Card/>
  </div>
</template>

<script>
// @ is an alias to /src
import Card from '@/components/Card.vue'

export default {
  name: 'HomeView',
  components: {
    Card
  }
}
</script>
