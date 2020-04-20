<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4">
        <p class="display-2 font-weight-bold mb-3">
          COVID-19 U.S.
        </p>
      </v-col>

      <v-col
        class="mb-5 red--text"
        cols="12"
      >
        <p class="font-weight-regular">
          New
        </p>
        <h2 class="display-3 font-weight-bold mb-3">
          {{ newConfirmed }}
        </h2>
      </v-col>

      <v-col
        class="mb-5 red--text text--darken-4"
        cols="12"
      >
        <p class="subheading font-weight-regular">
          Confirmed
        </p>
        <h2 class="display-3 font-weight-bold mb-3">
          {{ totalConfirmed }}
        </h2>
      </v-col>

      <v-col
        class="mb-5 green--text"
        cols="12"
      >
        <p class="subheading font-weight-regular">
          Recovered
        </p>
        <h2 class="display-3 font-weight-bold mb-3">
          {{ totalRecovered }}
        </h2>
      </v-col>

      <v-col
        class="mb-5 blue-grey--text text--darken-3"
        cols="12"
      >
        <p class="subheading font-weight-regular">
          Deceased
        </p>
        <h2 class="display-3 font-weight-bold mb-3">
          {{ totalDeaths }}
        </h2>
      </v-col>
      <v-col>
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
      updated: 0,
      newConfirmed: 0,
      totalConfirmed: 0,
      newRecovered: 0,
      totalRecovered: 0,
      newDeaths: 0,
      totalDeaths: 0
    }),
    computed: {
      updatedTime: function () {
        var time = new Date(this.updated)
        var updatedDate = time.toLocaleDateString("en-US") + ' ' + time.toLocaleTimeString("en-US") + ' PDT'
        return updatedDate
      }
    },
    created () {
      this.fetchData()
    },
    methods: {
      async fetchData () {
        try {
          // fecth today data
          var todayData = await fetch('https://corona.lmao.ninja/v2/countries/USA')
          var today = await todayData.json()
          // assign data
          this.updated = today.updated
          this.newConfirmed = this.numberWithCommas(today.todayCases)
          this.totalConfirmed = this.numberWithCommas(today.cases)
          this.totalRecovered = this.numberWithCommas(today.recovered)
          this.totalDeaths = this.numberWithCommas(today.deaths)
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
