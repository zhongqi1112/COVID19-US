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
        <h2 class="display-3 font-weight-bold mb-3">
          {{ totalRecovered }}
        </h2>
      </v-col>

      <v-col class="xs-12 blue-grey--text text--darken-3" cols="12">
        <p class="subheading font-weight-regular">
          Deceased
        </p>
        <h2 class="display-3 font-weight-bold mb-3">
          {{ totalDeaths }}
        </h2>
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
      statesList: []
    }),
    computed: {
      updatedTime: function () {
        var time = new Date(this.updated)
        var updatedDate = time.toLocaleDateString("en-US") + ' ' + time.toLocaleTimeString("en-US") + ' PDT'
        return updatedDate
      },
      states () {
        return this.statesList
      }
    },
    created () {
      this.fetchStatesData()
      this.fetchData()
    },
    methods: {
      async fetchData () {
        try {
          // fecth today data
          var todayData = await fetch('https://corona.lmao.ninja/v2/countries/USA')
          var today = await todayData.json()
          var currentTime = new Date()
          var timezone = currentTime.getTimezoneOffset()
          let yesterdayData = null
          let yesterday = null
          if ((currentTime.getHours() === this.hoursPerDay - timezone && currentTime.getHours() >= this.minutesPerHour / 2) || (currentTime.getHours() > this.hoursPerDay - timezone)) {
            yesterdayData = await fetch('https://corona.lmao.ninja/v2/countries/USA?yesterday=true')
            yesterday = await yesterdayData.json()
            this.yesterdayConfirmed = yesterday.todayCases
          }
          // assign data
          this.updated = today.updated
          this.newConfirmed = this.numberWithCommas(today.todayCases + this.yesterdayConfirmed)
          this.totalConfirmed = this.numberWithCommas(today.cases)
          this.totalRecovered = this.numberWithCommas(today.recovered)
          this.totalDeaths = this.numberWithCommas(today.deaths)
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
      numberWithCommas(n) {
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
  padding: 0 6px;
}

/* decrease padding for table header */
/deep/ div.v-data-table th {
  padding: 0 6px;
}

/* decrease margin for table footter  */
/deep/ div.v-data-footer__pagination {
  margin: 0 4px;
}
</style>
