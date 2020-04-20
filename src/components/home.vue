<template>
  <v-container>
    <v-row class="text-center justify-center">
      <v-col class="mb-5" cols="12">
        <p class="display-2 font-weight-bold mb-3">
          COVID-19 U.S.
        </p>
      </v-col>

      <v-col class="mb-5 red--text" cols="12">
        <p class="font-weight-regular">
          New
        </p>
        <h2 class="display-3 font-weight-bold mb-3">
          {{ newConfirmed }}
        </h2>
      </v-col>

      <v-col class="mb-5 red--text text--darken-4" cols="12">
        <p class="subheading font-weight-regular">
          Confirmed
        </p>
        <h2 class="display-3 font-weight-bold mb-3">
          {{ totalConfirmed }}
        </h2>
      </v-col>

      <v-col class="mb-5 green--text" cols="12">
        <p class="subheading font-weight-regular">
          Recovered
        </p>
        <h2 class="display-3 font-weight-bold mb-3">
          {{ totalRecovered }}
        </h2>
      </v-col>

      <v-col class="mb-5 blue-grey--text text--darken-3" cols="12">
        <p class="subheading font-weight-regular">
          Deceased
        </p>
        <h2 class="display-3 font-weight-bold mb-3">
          {{ totalDeaths }}
        </h2>
      </v-col>

      <v-col class="mb-5" cols="12">
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
      newRecovered: 0,
      totalRecovered: 0,
      newDeaths: 0,
      totalDeaths: 0,
      headers: [
        {
          text: 'States',
          align: 'start',
          sortable: false,
          value: 'state',
        },
        { text: 'Confirmed', value: 'cases' },
        { text: 'Test', value: 'tests' },
        { text: 'Deceased', value: 'deaths' }
      ],
      states: [
        {
          "state": "New York",
          "cases": 247215,
          "todayCases": 6174,
          "deaths": 18298,
          "todayDeaths": 627,
          "active": 205030,
          "tests": 617555,
          "testsPerOneMillion": 31478
        },
        {
          "state": "New Jersey",
          "cases": 85301,
          "todayCases": 3881,
          "deaths": 4202,
          "todayDeaths": 132,
          "active": 79828,
          "tests": 172543,
          "testsPerOneMillion": 19426
        },
        {
          "state": "Massachusetts",
          "cases": 38077,
          "todayCases": 1705,
          "deaths": 1706,
          "todayDeaths": 146,
          "active": 28253,
          "tests": 162241,
          "testsPerOneMillion": 23754
        },
        {
          "state": "Pennsylvania",
          "cases": 32734,
          "todayCases": 1003,
          "deaths": 1237,
          "todayDeaths": 135,
          "active": 30847,
          "tests": 158854,
          "testsPerOneMillion": 12419
        },
        {
          "state": "California",
          "cases": 31430,
          "todayCases": 712,
          "deaths": 1175,
          "todayDeaths": 28,
          "active": 28905,
          "tests": 246400,
          "testsPerOneMillion": 6294
        },
        {
          "state": "Michigan",
          "cases": 31424,
          "todayCases": 633,
          "deaths": 2391,
          "todayDeaths": 83,
          "active": 25796,
          "tests": 113800,
          "testsPerOneMillion": 11429
        },
        {
          "state": "Illinois",
          "cases": 30357,
          "todayCases": 1197,
          "deaths": 1290,
          "todayDeaths": 31,
          "active": 28461,
          "tests": 143318,
          "testsPerOneMillion": 11178
        }
      ]
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
      numberWithCommas(n) {
        return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      }
    }
  }
</script>
