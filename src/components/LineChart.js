import { Line, mixins } from 'vue-chartjs';
import moment from 'moment';
const { reactiveProp } = mixins;

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
  extends: Line,
  mixins: [reactiveProp],
  props: ['chartData', 'dateList'],
  mounted() {
    console.log('mtd priceArray2', this.chartData, this.dateList);
    this.gradient = this.$refs.canvas
      .getContext('2d')
      .createLinearGradient(0, 0, 0, 450);
    this.gradient2 = this.$refs.canvas
      .getContext('2d')
      .createLinearGradient(0, 0, 0, 450);

    this.gradient.addColorStop(0, 'rgba(255,0,0,0.5)');
    this.gradient.addColorStop(0.5, 'rgba(255,0,0,.25)');
    this.gradient.addColorStop(1, 'rgba(255,0,0,0)');

    this.gradient2.addColorStop(0, 'rgba(0,231,255,.9)');
    this.gradient2.addColorStop(0.5, 'rgba(0,231,255,.25)');
    this.gradient2.addColorStop(1, 'rgba(0,231,255,0)');

    this.renderChart(this.chartData, {
      responsive: true,
      maintainAspectRatio: false
    });
  },

  watch: {
    data() {
      this._chart.destroy();
      this.renderChart(this.chartData, {
        responsive: true,
        maintainAspectRatio: false
      });
    }
  }
};
