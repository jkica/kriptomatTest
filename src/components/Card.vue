<template>
  <div class="card">
    <span style="vertical-align: middle; width: 50%; text-align: start; text-indent: 20px;">
      <img style="vertical-align: middle" height="30px" width="30px" :src="item.image" :alt="`${item.id}-image`">
      {{item.name}}
      {{item.symbol.toUpperCase()}}
    </span>
    <span
        :class="isPositive ? 'positive' : 'negative'"
        style="width: 25%; text-align: center;">
      {{ isPositive ? '&#9650;' : '&#9660;' }}
      {{ item.price_change_24h.toFixed(2) }}%
    </span>
    <span
        style="width: 25%; text-align: center;">
      €{{item.current_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}
    </span>


  </div>
</template>

<script>
export default {
  name: 'Card',
  props: ['item'],
  data() {
    return {
      isPositive: Math.sign(this.item.price_change_24h) === 1
    }
  }
}
</script>

<style scoped>
/*.card {*/
/*  border: 1px solid black;*/
/*  padding: 5px 0;*/
/*  width: 500px;*/
/*  margin: 0 auto;*/
/*  margin-bottom: 5px;*/
/*}*/
.card {
  height: 52px;
  width: 100%;
  background: white;
  border-bottom: 1px solid rgba(0, 0, 0, .05);
  line-height: 52px;
}
.card span {
  display: inline-block;
}
.card:hover {
  cursor: pointer;
  background: gainsboro;
}
.positive {
  color: #0DEAA9;
}
.negative {
  color: #FF9696;
}
</style>
