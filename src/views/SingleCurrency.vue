<template>
  <div class="about">
    <router-link to="/">Go back</router-link>
    <div>
      <Loader :show="busy"></Loader>
      <div v-if="item && !busy">
        <img :src="item.image.small" :alt="`${item.id}-image`">
        {{item.id}}
        {{item.symbol.toUpperCase()}}
        €{{item.market_data.current_price.eur}}
      </div>
      <LineChart
          v-show="!busy"
          :item="item" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import LineChart from '@/components/Line.vue'
import Loader from "@/components/Loader";

export default {
  components: {
    Loader,
    LineChart
  },
  data () {
    return {
      apiUrl: process.env.VUE_APP_API_URL,
      id: this.$route.params.id,
      item: null,
      busy: true
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
          // should wait for api response event from chart to set busy to false, not use timeout
          setTimeout(() => {this.busy  =false}, 500)
        })
  }
}


</script>
