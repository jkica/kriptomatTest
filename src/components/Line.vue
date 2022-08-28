<template>
  <LineChartGenerator
      :chart-options="chartOptions"
      :chart-data="chartData"
      :chart-id="chartId"
      :dataset-id-key="datasetIdKey"
      :plugins="plugins"
      :css-classes="cssClasses"
      :styles="styles"
      :width="width"
      :height="height"
  />
</template>

<script>
import {Line as LineChartGenerator} from 'vue-chartjs/legacy'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement
} from 'chart.js'
import axios from "axios";

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    CategoryScale,
    PointElement
)

export default {
  name: 'LineChart',
  components: {
    LineChartGenerator
  },
  props: {
    chartId: {
      type: String,
      default: 'line-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 400
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      default: () => {
      }
    },
    plugins: {
      type: Array,
      default: () => []
    },
    item: {
      type: Object,
      default: () => {
      }
    }
  },
  data() {
    return {
      data1: null,
      chartData: {
        labels: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December'
        ],
        datasets: [
          // {
          //   label: '24h',
          //   backgroundColor: '#0E80D5',
          //   data: this.data1
          // },
          // {
          //   label: '1W',
          //   backgroundColor: '#0E80D5',
          //   data: this.data1
          // },
          // {
          //   label: '1M',
          //   backgroundColor: '#0E80D5',
          //   data: this.data1
          // },
          // {
          //   label: '1Y',
          //   backgroundColor: '#0E80D5',
          //   data: this.data1
          // },
          // {
          //   label: 'ALL',
          //   backgroundColor: '#0E80D5',
          //   data: this.data1
          // }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,

      }
    }
  },
  mounted() {
  },
  watch: {
    item(item) {
      if (item) {
        const d = new Date();
        const coinId = item.id;
        const today = Math.floor(Date.now() / 1000);
        const yearAgo = Math.floor((d.setFullYear(d.getFullYear()-1)) / 1000);
        // const twoYearsAgo = Math.floor((d.setFullYear(d.getFullYear()-2)) / 1000);

        console.log(coinId, today, yearAgo)

        console.log(axios)
        axios
            .get(`${process.env.VUE_APP_API_URL}/coins/${coinId}/market_chart/range?vs_currency=eur&from=${yearAgo}&to=${today}`)
            .then(res => {
              console.log(res.data.prices.map(banana => banana[1]))
              this.data1 = res.data.prices.map(banana => banana[1]);

              this.chartData = {
                ...this.chartData,
                datasets: [{
                  label: '€',
                  backgroundColor: '#0E80D5',
                  data: res.data.prices.map(banana => banana[1])
                }]
              }
            })
      }
    }
  }
}
</script>
