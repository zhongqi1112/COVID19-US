<template>
  <v-container>
    <v-row class="text-center justify-center">
      <v-col class="xs-12" cols="12">
        <p class="display-2 font-weight-bold mb-3">
          COVID-19 U.S.
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

      <v-col class="xs-12" cols="12">
        <v-data-table
          :mobile-breakpoint="0"
          :headers="headers"
          :items="states"
          :items-per-page="10"
          :sort-by="['cases']"
          :sort-desc="[true]"
          class="elevation-1"
        ></v-data-table>
      </v-col>

      <v-col class="xs-12" cols="12">
        <div>Updated: {{ updatedTime }}</div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'Home',
    data: () => ({
      minutesPerHour: 60,
      hoursPerDay: 24,
      yesterdayConfirmed: 0,
      updated: 0,
      newConfirmed: 0,
      totalConfirmed: 0,
      totalRecovered: 0,
      totalDeaths: 0,
      recoveredRate: 0,
      deathRate: 0,
      headers: [
        {
          text: 'States',
          align: 'start',
          sortable: false,
          value: 'state',
        },
        { text: 'Confirmed', value: 'cases' },
        { text: 'Active', value: 'active' },
        { text: 'Tests', value: 'tests' },
        { text: 'Tests / Million', value: 'testsPerOneMillion' }
      ],
      statesList: [],
      polling: null,
      pollingTime: 30000 // 3 minutes
    }),
    computed: {
      updatedTime: function () {
        var time = new Date(this.updated)
        var updatedDate = time.toLocaleDateString("en-US") + ' ' + time.toLocaleTimeString("en-US")
        return updatedDate
      },
      states () {
        return this.statesList
      }
    },
    created () {
      this.fetchData()
      this.fetchStatesData()
      this.pollingData()
    },
    beforeDestroy () {
      clearInterval(this.polling)
    },
    methods: {
      async fetchData () {
        try {
          // fecth today data
          var todayData = await fetch('https://corona.lmao.ninja/v2/countries/USA')
          var today = await todayData.json()
          // assign data
          this.updated = today.updated
          //this.newConfirmed = this.numberWithCommas(today.todayCases)
          this.totalConfirmed = this.numberWithCommas(today.cases)
          this.totalRecovered = this.numberWithCommas(today.recovered)
          this.totalDeaths = this.numberWithCommas(today.deaths)
          this.recoveredRate = (today.recovered / today.cases * 100).toFixed(2)
          this.deathRate = (today.deaths / today.cases * 100).toFixed(2)
          // fetch yesterday data
          var currentTime = new Date()
          var timezone = currentTime.getTimezoneOffset() / this.minutesPerHour
          // if ((currentTime.getHours() === (this.hoursPerDay - timezone) && currentTime.getMinutes() >= this.minutesPerHour / 2) || (currentTime.getHours() > this.hoursPerDay - timezone)) {
          if (currentTime.getHours() >= this.hoursPerDay - timezone) {
            var yesterdayData = await fetch('https://corona.lmao.ninja/v2/countries/USA?yesterday=true')
            var yesterday = await yesterdayData.json()
            if (today.todayCases > yesterday.todayCases / 2) {
              this.newConfirmed = this.numberWithCommas(today.todayCases)
            } else {
              this.newConfirmed = this.numberWithCommas(today.todayCases + yesterday.todayCases)
            }
          } else {
            this.newConfirmed = this.numberWithCommas(today.todayCases)
          }
        } catch(e) {
          console.error(e)
        }
      },
      /**
       * @description Get US State Totals
       */
      async fetchStatesData () {
        try {
          var statesData = await fetch('https://corona.lmao.ninja/v2/states?sort=cases')
          var states = await statesData.json()
          this.statesList = states
        } catch(e) {
          console.error(e)
        }
      },
      pollingData () {
        this.polling = setInterval(() => {
          this.fetchData()
          this.fetchStatesData()
        }, this.pollingTime)
      },
      numberWithCommas (n) {
        return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      }
    }
  }
</script>

<style scoped>
/* remove margin from p tag */
.v-application p {
  margin-bottom: 0px !important;
}

/* remove margin from  column*/
.v-application .xs-12 {
  margin-bottom: 0px !important;
}

/* decrease padding for table body */
/deep/ div.v-data-table td {
  padding: 0 3px;
}

/* decrease padding for table header */
/deep/ div.v-data-table th {
  padding: 0 3px;
}

/* decrease margin for table footter  */
/deep/ div.v-data-footer__pagination {
  margin: 0 4px;
}
</style>
