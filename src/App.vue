<template>
  <v-app>
    <v-content>
      <Home
        :today='loadToday'
        :yesterday='loadYesterday'
        :states='loadStates'/>
    </v-content>
  </v-app>
</template>

<script>
import Home from './components/home';

export default {
  name: 'App',
  components: {
    Home,
  },
  data: () => ({
    loadToday: [],
    loadYesterday: [],
    loadStates: [],
    polling: null,
    pollingTime: 30000 // 3 minutes
  }),
  created() {
    this.fetchData()
    this.pollingData()
  },
  beforeDestroy () {
    clearInterval(this.polling)
  },
  methods: {
    /**
     * @description fetch data from database
     */
    async fetchData() {
      // fecth today data
      var todayData = await fetch('https://corona.lmao.ninja/v2/countries/USA')
      var todayJson = await todayData.json()
      this.loadToday = todayJson
      // fecth yesterday data
      var yesterdayData = await fetch('https://corona.lmao.ninja/v2/countries/USA?yesterday=true')
      var yesterdayJson = await yesterdayData.json()
      this.loadYesterday = yesterdayJson
      // fecth states data
      var statesData = await fetch('https://corona.lmao.ninja/v2/states?sort=cases')
      var statesJson = await statesData.json()
      this.loadStates = statesJson
    },
    /**
     * @description poll data periodically
     */
    pollingData () {
      this.polling = setInterval(() => {
        this.fetchData()
      }, this.pollingTime)
    },
  }
};
</script>
