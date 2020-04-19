<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          COVID-19 U.S.
        </h1>
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
          Infected
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
      yesterdayConfirmed: 0,
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
          var yesterday = null
          var currentTime = new Date()
          var timezone = currentTime.getTimezoneOffset() / this.minutesPerHour
          // fecth today data
          var todayData = await fetch('https://corona.lmao.ninja/v2/countries/USA')
          var today = await todayData.json()
          // if pass utc 00:00 then fect yesterday data
          if (currentTime.getHours() >= this.hoursPerDay - timezone) {
            var yesterdayData = await fetch('https://corona.lmao.ninja/v2/countries/USA?yesterday=true')
            yesterday = await yesterdayData.json()
            this.yesterdayConfirmed = yesterday.todayCases
          }
          // assign data
          this.newConfirmed = today.todayCases + this.yesterdayConfirmed
          this.updated = today.updated
          this.totalConfirmed = today.cases
          this.totalRecovered = today.recovered
          this.totalDeaths = today.deaths
        } catch(e) {
          console.error(e)
        }
      }
    }
  }
</script>
