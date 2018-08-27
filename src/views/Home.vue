<template>
  <div class="chart-component">
    <!-- <div class="">BTC | ETH | LTC | IOTA</div> -->
    <ul class="currency-list">
      <li v-for="loopCurrency in this.currencyGroups" class="currency-item" v-on:click="setCurrency(loopCurrency)">{{ loopCurrency.name }}</li>
    </ul>
    <button v-on:click="setTimePeriods('Monthly')">12 Months</button>
    <button v-on:click="setTimePeriods('Weekly')">7 Days</button>

    <div class="container">
      <div class="Chart__list">
        <div class="Chart">
          <h2>{{currencyDisplayName}} ({{currencyDisplayKey}}) Price Last 12 months</h2>
          <section v-if="errored">
            <p>We're sorry, we're not able to retrieve this information at the moment, please try back later</p>
          </section>
          <section v-else>
            <div v-if="loading"><img src="../assets/loader.gif"/></div>
            <div v-else class="value">
              <span class="lighten">
              </span>
                <line-example :chart-data="datacollection" :key="currency.key" :dateList="dateList"></line-example>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LineExample from '../components/LineChart.js';
import axios from 'axios';
import moment from 'moment';
let dateListMonths = [];
for (let i = 12; i--; i <= 0) {
  let date = moment()
    .subtract(i, 'month')
    .startOf('month')
    .format('MMM');
  dateListMonths.push(date);
}

let selectedTitle = 'testTiel';

export default {
  name: 'chart',
  components: {
    LineExample
  },
  data() {
    return {
      currencyGroups: [
        { key: 'BTC', name: 'Bitcoin' },
        { key: 'ETH', name: 'Ethereum' },
        { key: 'LTC', name: 'Litecoin' },
        { key: 'IOTA', name: 'Iota' },
        { key: 'DOGE', name: 'Doge' },
        { key: 'XMR', name: 'Monero' },
        { key: 'ZEC', name: 'ZCash' },
        { key: 'REP', name: 'Augur' },
        { key: 'DADI', name: 'Dadi' },
        { key: 'NANO', name: 'Nano' },
        { key: 'EOS', name: 'Eos' }
      ],
      fiatListings: ['EUR', 'USD'],
      dayAggregate: 30,
      returnLimit: 11,
      priceObject1: null,
      priceObject2: null,
      priceArray1: null,
      priceArray2: null,
      loading: false,
      isLoaded: false,
      errored: false,
      currency: { key: 'BTC', name: 'Bitcoin' },
      currencyDisplayName: '',
      currencyDisplayKey: '',
      datacollection: {},
      dateList: dateListMonths
    };
  },
  methods: {
    setTimePeriods: function(frequency) {
      if (frequency === 'Weekly') {
        this.dayAggregate = 1;
        this.returnLimit = 6;
        this.dateList = ['1', '2', '3', '4', '5', '6', '7'];
      } else if (frequency === 'Monthly') {
        this.dayAggregate = 30;
        this.returnLimit = 11;
        this.dateList = dateListMonths;
      }
      this.setCurrency(this.currency);
    },
    setCurrency: function(currency) {
      console.log('gotData', this.gotData);
      this.currency = currency;
      let dayAggregate = this.dayAggregate;
      let returnLimit = this.returnLimit;
      this.currencyDisplayName = currency.name;
      this.currencyDisplayKey = currency.key;
      this.priceArray1 = [11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11, 11];
      this.priceArray2 = this.priceArray1;

      const apiHost = 'https://min-api.cryptocompare.com/';
      const endpoint1 = `data/histoday?fsym=${
        currency.key
      }&tsym=EUR&limit=${returnLimit}&aggregate=${dayAggregate}&e=CCCAGG`;
      const endpoint2 = `data/histoday?fsym=${
        currency.key
      }&tsym=USD&limit=${returnLimit}&aggregate=${dayAggregate}&e=CCCAGG`;

      axios
        .get(`${apiHost}${endpoint1}`)
        .then(response => {
          this.priceObject1 = response.data.Data;
          this.loading = false;
          let strippedDown = this.priceObject1.map(data => {
            return data.close;
          });

          console.log(Object.values(strippedDown));
          this.priceArray1 = Object.values(strippedDown);
          this.datacollection = {
            labels: this.dateList,
            datasets: [
              {
                label: `EUR`,
                borderColor: '#FC2525',
                pointBackgroundColor: 'white',
                borderWidth: 1,
                pointBorderColor: 'white',
                backgroundColor: this.gradient,
                data: this.priceArray1
              },
              {
                label: `USD`,
                borderColor: '#05CBE1',
                pointBackgroundColor: 'white',
                pointBorderColor: 'white',
                borderWidth: 1,
                backgroundColor: this.gradient2,
                data: this.priceArray2
              }
            ]
          };
        })
        .catch(error => {
          console.error(error);
          return Promise.reject(error);
        });

      axios
        .get(`${apiHost}${endpoint2}`)
        .then(response => {
          this.priceObject2 = response.data.Data;
          this.loading = false;
          let strippedDown = this.priceObject2.map(data => {
            return data.close;
          });

          console.log(Object.values(strippedDown));
          this.priceArray2 = Object.values(strippedDown);
          this.datacollection = {
            labels: this.dateList,
            datasets: [
              {
                label: `EUR`,
                borderColor: '#FC2525',
                pointBackgroundColor: 'white',
                borderWidth: 1,
                pointBorderColor: 'white',
                backgroundColor: this.gradient,
                data: this.priceArray1
              },
              {
                label: `USD`,
                borderColor: '#05CBE1',
                pointBackgroundColor: 'white',
                pointBorderColor: 'white',
                borderWidth: 1,
                backgroundColor: this.gradient2,
                data: this.priceArray2
              }
            ]
          };
        })
        .catch(error => {
          console.error(error);
          return Promise.reject(error);
        });
    }
  },
  created() {
    let currency = this.currency;
    this.loading = true;
    console.log(
      'set currency',
      currency.name,
      this.dayAggregate,
      this.returnLimit
    );

    this.setCurrency(currency);
  }
};
</script>

<style scoped lang="scss">
@import '../styles/settings.scss';
.chart-component {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}
.container {
  max-width: 800px;
  margin: 0 auto;
  color: rgb(0, 255, 0);
}

ul.currency-list {
  list-style-type: none;
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  margin: 0;
  padding: 0;
  flex-wrap: wrap;
}

.currency-item {
  padding: 0.5rem;
  border-radius: 10%;
  border: 1px solid rgba(128, 128, 128, 0.39);
  background-color: #ececec;
  cursor: pointer;
  &:hover {
    background-color: $button-hover;
    transition: background-color 80ms ease-in;
  }
}
</style>
