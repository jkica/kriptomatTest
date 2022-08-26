<template>
  <div class="about">
    <router-link to="/">Go back</router-link>
    <div v-if="item">
      <img :src="item.image.small" :alt="`${item.id}-image`">
      {{item.id}}
      {{item.symbol.toUpperCase()}}
      {{item.market_data.current_price.eur}}€
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data () {
    return {
      apiUrl: process.env.VUE_APP_API_URL,
      id: this.$route.params.id,
      item: null
    }
  },
  methods: {
    getItem () {
      console.log('get')
    },
    setItem () {
      console.log('set')
    }
  },
  created() {
    axios
        .get(`${this.apiUrl}/coins/${this.id}`)
        .then(res => {
          this.item = res.data;
          console.log('banana', res.data)
        })
  }
}


</script>
