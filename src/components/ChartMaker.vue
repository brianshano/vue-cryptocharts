<template><div>honk {{currencyCalculations}}
<div>
  <make-chart :currency="this.currency" :priceArray1="priceArray1" :priceArray2="priceArray2"></make-chart>
</div></div></template>
<script>
import { Line } from 'vue-chartjs';
import moment from 'moment';
import MakeChart from './LineChart.js';

let dateList = [];
for (let i = 12; i--; i <= 0) {
  let date = moment()
    .subtract(i, 'month')
    .startOf('month')
    .format('MMM');
  dateList.push(date);
  console.log('date', date);
}

export default {
  name: 'chart-maker',
  components: {
    MakeChart
  },
  extends: Line,
  props: ['currency', 'priceArray1', 'priceArray2'],
  data() {
    return {
      dataStore: ''
    };
  },
  methods: {
    createChart() {
      this.gradient = this.$refs.canvas
        .getContext('2d')
        .createLinearGradient(0, 0, 0, 450);
      this.gradient2 = this.$refs.canvas
        .getContext('2d')
        .createLinearGradient(0, 0, 0, 450);

      this.gradient.addColorStop(0, 'rgba(255, 0, 0, 0.5)');
      this.gradient.addColorStop(0.5, 'rgba(255, 0, 0, 0.25)');
      this.gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');

      this.gradient2.addColorStop(0, 'rgba(0, 231, 255, 0.9)');
      this.gradient2.addColorStop(0.5, 'rgba(0, 231, 255, 0.25)');
      this.gradient2.addColorStop(1, 'rgba(0, 231, 255, 0)');
      this.renderChart(
        {
          labels: dateList,
          datasets: [
            {
              label: `${this.currency.key} EUR`,
              borderColor: '#FC2525',
              pointBackgroundColor: 'white',
              borderWidth: 1,
              pointBorderColor: 'white',
              backgroundColor: this.gradient,
              data: this.priceArray2
            },
            {
              label: `${this.currency.key} USD`,
              borderColor: '#05CBE1',
              pointBackgroundColor: 'white',
              pointBorderColor: 'white',
              borderWidth: 1,
              backgroundColor: this.gradient2,
              data: this.priceArray2
            }
          ]
        },
        { responsive: true, maintainAspectRatio: false }
      );
    }
  },
  mounted() {
    console.log('mtd priceArray1', this.priceArray1);
    console.log('mtd priceArray2', this.priceArray2);
    this.createChart('planet-chart', this.planetChartData);
  },

  watch: {
    currency() {
      console.log('watch priceArray1', this.priceArray1);
      console.log('watch priceArray2', this.priceArray2);

      // this.renderChart(
      //   {
      //     labels: dateList,
      //     datasets: [
      //       {
      //         label: `${this.currency.key} EUR`,
      //         borderColor: '#FC2525',
      //         pointBackgroundColor: 'white',
      //         borderWidth: 1,
      //         pointBorderColor: 'white',
      //         backgroundColor: this.gradient,
      //         data: this.priceArray2
      //       },
      //       {
      //         label: `${this.currency.key} USD`,
      //         borderColor: '#05CBE1',
      //         pointBackgroundColor: 'white',
      //         pointBorderColor: 'white',
      //         borderWidth: 1,
      //         backgroundColor: this.gradient2,
      //         data: this.priceArray2
      //       }
      //     ]
      //   },
      //   { responsive: true, maintainAspectRatio: false }
      // );
    },
    priceArray1() {
      console.log('inhere');
    }
  },

  computed: {
    currencyCalculations() {
      console.log('xx IN HERE');
      console.log('endopoint is now', this.currency.key);
      return null;
    }
  }
};
</script>
