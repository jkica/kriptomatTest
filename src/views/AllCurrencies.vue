<template>
  <div class="home">
    <h1>This is all currencies page</h1>
    <input
        v-model="searchString"
        class="search"
        type="text"
        placeholder="search">
    <div>
      <div
          v-for="item in filteredItems || items"
          :key="item.id"
          @click="redirect(item.id)">
        <Card :item="item"/>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Card from '@/components/Card.vue'
import axios from 'axios';

export default {
  name: 'AllCurrencies',
  components: {
    Card
  },
  data() {
    return {
      apiUrl: process.env.VUE_APP_API_URL,
      apiError: null,
      items: null,
      filteredItems: null,
      searchString: ''
    }
  },
  watch: {
    searchString: {
      handler(val) {
        this.filteredItems = this.items.filter(item => item.name.toLowerCase().includes(val.toLowerCase()))
      },
      immediate: false
    },
    apiError: {
      handler(apiDown) {
        !apiDown && axios
            .get(`${this.apiUrl}/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=50&page=1&sparkline=false`)
            .then(res => this.items = res.data.sort(function (a, b) { return b.market_cap - a.market_cap }))
      },
      immediate: false
    }
  },
  created() {
    this.checkApiStatus();
  },
  mounted() {

  },
  methods: {
    redirect(id) {
      this.$router.push(`/single/${id}`)
    },
    checkApiStatus() {
      axios.get(`${this.apiUrl}/ping`).then(res => this.apiError = res.status !== 200)
    }
  }
}
</script>

<style>
.search {
  margin-bottom: 20px;
}
</style>
