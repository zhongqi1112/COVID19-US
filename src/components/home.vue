<template>
  <v-container>
    <v-row class="text-center justify-center">

      <v-col class="xs-12" cols="12">
        <p class="display-2 font-weight-bold mb-3">
          {{ title }}
        </p>
      </v-col>

      <v-col class="xs-12 red--text" cols="12">
        <p class="font-weight-regular">
          New
        </p>
        <h2 class="display-3 font-weight-bold mb-3">
          {{ newConfirmed }}
        </h2>
      </v-col>

      <v-col class="xs-12 red--text text--darken-4" cols="12">
        <p class="subheading font-weight-regular">
          Confirmed
        </p>
        <h2 class="display-3 font-weight-bold mb-3">
          {{ totalConfirmed }}
        </h2>
      </v-col>

      <v-col class="xs-12 green--text" cols="12">
        <p class="subheading font-weight-regular">
          Recovered
        </p>
        <span class="display-3 font-weight-bold mb-3">
          {{ totalRecovered }}
        </span>
        <span style="font-size:26px">
          {{ recoveredRate }}%
        </span>
      </v-col>

      <v-col class="xs-12 blue-grey--text text--darken-3" cols="12">
        <p class="subheading font-weight-regular">
          Deceased
        </p>
        <span class="display-3 font-weight-bold mb-3">
          {{ totalDeaths }}
        </span>
        <span style="font-size:26px">
          {{ deathRate }}%
        </span>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
const _ = require('lodash')

export default {
  name: 'Home',
  props: [
    'today',
    'yesterday',
  ],
  data: () => ({
    title: 'COVID-19 U.S.'
  }),
  computed: {
    newConfirmed: function () {
      const hoursPerDay = 24
      const minutesPerHour = 60
      var newConfirmed = 0
      var currentTime = new Date()
      var utcZero = hoursPerDay - currentTime.getTimezoneOffset() / minutesPerHour
      // if local time pass UTC 00:00 then the new case is summation of today and yesterday
      // because the database is updated at UTC 00:00
      if (currentTime.getHours() >= utcZero) {
        // TODO: 3 is a magic number to control if add yesterday data to new cases
        if (this.today.todayCases > this.yesterday.todayCases / 3) {
          newConfirmed = this.numberWithCommas(this.today.todayCases)
        } else {
          if (!_.isUndefined(this.today.todayCases) && !_.isUndefined(this.yesterday.todayCases)) {
            newConfirmed = this.numberWithCommas(this.today.todayCases + this.yesterday.todayCases)
          }
        }
      } else {
        newConfirmed = this.numberWithCommas(this.today.todayCases)
      }
      return newConfirmed
    },
    totalConfirmed: function () {
      return this.numberWithCommas(this.today.cases)
    },
    totalRecovered: function () {
      return this.numberWithCommas(this.today.recovered)
    },
    totalDeaths: function () {
      return this.numberWithCommas(this.today.deaths)
    },
    recoveredRate: function () {
      return this.calculateRate(this.today.recovered, this.today.cases, 2)
    },
    deathRate: function () {
      return this.calculateRate(this.today.deaths, this.today.cases, 2)
    },
  },
  methods: {
    /**
     * @description convert an integer to a string with commas
     * @param value integer number
     */
    numberWithCommas (number) {
      var value = 0
      if (!_.isUndefined(number)) {
        //value = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        value = _.replace(_.toString(number), /\B(?=(\d{3})+(?!\d))/g, ',')
      }
      return value
    },
    /**
     * @description calculate the rate in decimal number
     * @param numerator numerator of rate
     * @param denominator denominator of rate
     * @param decimal decimal of rate
     */
    calculateRate (numerator, denominator, decimal) {
      var rate = 0
      if (!_.isUndefined(numerator) && !_.isUndefined(denominator)) {
        rate = (numerator / denominator * 100).toFixed(decimal)
      }
      return rate
    }
  }
}
</script>

<style scoped>
/* remove margin from p tag */
.v-application p {
  margin-bottom: 0px !important;
}
</style>
