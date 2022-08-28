<template>
  <div class="home">
    <div class="panels">
      <div class="panel-1">
        <div class="panel-1-header">
          <span class="panel-1-header-title">Cryptocurrency prices</span>
          <div class="search">
            <img class="header-logo" src="../assets/icons/search.svg" alt="search">
            <input
                v-model="searchString"
                type="text"
                placeholder="Search">
          </div>
        </div>
        <div class="panel-1-body">
          <div class="panel-1-body-header">
            <span
                @click="setSortBy('name')"
                class="panel-1-body-header-1">
              Currency <img src="../assets/icons/sort.svg" alt="sort">
            </span>
            <span
                @click="setSortBy('change')"
                class="panel-1-body-header-2">
              24h% <img src="../assets/icons/sort.svg" alt="sort">
            </span>
            <span
                @click="setSortBy('price')"
                class="panel-1-body-header-3">
              Price <img src="../assets/icons/sort.svg" alt="sort">
            </span>
          </div>
          <div
              v-for="item in filteredItems || items"
              :key="item.id"
              class="panel-1-body-item"
              @click="redirect(item.id)">
            <Card :item="item"/>
          </div>
        </div>
      </div>

      <div class="panel-2">
        <h1>Favorites</h1>
      </div>
    </div>
    <div>

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
      searchString: '',
      sortBy: {
        type: 'name',
        direction: 'asc'
      }
    }
  },
  watch: {
    searchString: {
      handler(val) {
        console.warn(val)
        if (val.length === 0) {
          this.filteredItems = null;
        }
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
    },
    sortBy: {
      handler(by) {
        this.filteredItems ? this.sortFiltered(by) : this.sort(by);
      },
      immediate: false
    },
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
    },
    setSortBy(type) {
      let direction = this.sortBy.type === type ?
          this.sortBy.direction === 'asc' ? 'desc' : 'asc' :
          this.sortBy.direction;

      this.sortBy = {type, direction}
    },
    sort(by) {
      if (by.type === 'name') {
        by.direction === 'asc' ?
            this.items = this.items.sort(function (a, b) { return ('' + a.name).localeCompare(b.name) }) :
            this.items = this.items.reverse(function (a, b) { return ('' + a.name).localeCompare(b.name) });
      }
      if (by.type === 'change') {
        by.direction === 'asc' ?
            this.items = this.items.sort(function (a, b) { return b.price_change_24h - a.price_change_24h }) :
            this.items = this.items.sort(function (a, b) { return a.price_change_24h - b.price_change_24h });
      }
      if (by.type === 'price') {
        by.direction === 'asc' ?
            this.items = this.items.sort(function (a, b) { return b.current_price - a.current_price }) :
            this.items = this.items.sort(function (a, b) { return a.current_price - b.current_price });
      }
    },
    sortFiltered(by) {
      if (by.type === 'name') {
        by.direction === 'asc' ?
            this.filteredItems = this.filteredItems.sort(function (a, b) { return ('' + a.name).localeCompare(b.name) }) :
            this.filteredItems = this.filteredItems.reverse(function (a, b) { return ('' + a.name).localeCompare(b.name) });
      }
      if (by.type === 'change') {
        by.direction === 'asc' ?
            this.filteredItems = this.filteredItems.sort(function (a, b) { return b.price_change_24h - a.price_change_24h }) :
            this.filteredItems = this.filteredItems.sort(function (a, b) { return a.price_change_24h - b.price_change_24h });
      }
      if (by.type === 'price') {
        by.direction === 'asc' ?
            this.filteredItems = this.filteredItems.sort(function (a, b) { return b.current_price - a.current_price }) :
            this.filteredItems = this.filteredItems.sort(function (a, b) { return a.current_price - b.current_price });
      }
    },
  }
}
</script>

<style>
.search {
  display: inline-flex;
  height: 48px;
  width: 339px;
  margin-top: 14px;
}
.search img {
  padding: 14px;
  background: white;
}
.search input {
  height: 48px;
  width: 339px;
  border: none;
}
.search input:focus {
  outline: none;
}
.search input {
  height: 48px;
  width: 339px;
  border: none;
}
.search::placeholder {
  padding-left: 20px;
  padding-right: 20px;
  font-size: 14px;
}
.panels {
  display: flex;
  width: 80vw;
  margin: 0 auto;
}
.panel-1 {
  flex-grow: 4;
  height: 70vh;
  border-radius: 20px;
  background: #FBFBFB;
}
.panel-1-header {
  display: flex;
  justify-content: space-between;
  height: 80px;
  padding-left: 30px;
  padding-right: 30px;
}
.panel-1-header-title {
  font-size: 18px;
  line-height: 80px;
  font-weight: 600;
}
.panel-1-body {
  max-height: calc(100% - 80px);
  overflow: auto;
  padding-left: 30px;
  padding-right: 30px;
}
.panel-1-body::-webkit-scrollbar {
  display: none;
  background: white;
}
.panel-1-body-header {
  height: 43px;
  width: 100%;
  background: #0E80D5;
}
.panel-1-body-header span {
  display: inline-block;
  height: 43px;
  line-height: 43px;
  color: white;
  font-weight: 400;
}
.panel-1-body-header span img:hover {
  cursor: pointer;
}
.panel-1-body-header span img {
  height: 13px;
}
.panel-1-body-header-1 {
  width: 50%;
  text-align: start;
  text-indent: 20px;
}
.panel-1-body-header-2 {
  width: 25%;
  text-align: center;
}
.panel-1-body-header-3 {
  width: 25%;
  text-align: center;
}
.panel-1-body-item {

}
.panel-2 {
  flex-grow: 3;
  border-radius: 20px;
  background: #FBFBFB;
  margin-left: 20px;
}
</style>
