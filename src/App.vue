<template>
  <v-app>
    <v-content>
      <Home
        :today='loadToday'
        :yesterday='loadYesterday'
        :states='loadStates'/>
      <Footer
        :today='loadToday'/>
    </v-content>
  </v-app>
</template>

<script>
import Home from './components/home';
import Footer from './components/footer';

export default {
  name: 'App',
  components: {
    Home,
    Footer,
  },
  data: () => ({
    loadToday: [],
    loadYesterday: [],
    loadStates: [],
    polling: null,
    pollingTime: 30000 // 3 minutes
  }),
  created() {
    this.track()
    this.fetchData()
    this.pollingData()
  },
  beforeDestroy () {
    clearInterval(this.polling)
  },
  methods: {
    track () {
      this.$ga.page('/')
    },
    /**
     * @description poll data periodically
     */
    pollingData () {
      this.polling = setInterval(() => {
        this.fetchTodayData()
        this.fetchYesterdayData()
      }, this.pollingTime)
    },
    /**
     * @description fetch data from database
     */
    async fetchData () {
      this.fetchTodayData()
      this.fetchYesterdayData()
      this.fetchStateData()
    },
    async fetchTodayData () {
      // fecth today data
      var todayData = await fetch('https://corona.lmao.ninja/v2/countries/USA')
      var todayJson = await todayData.json()
      this.loadToday = todayJson
    },
    async fetchYesterdayData () {
      // fecth yesterday data
      var yesterdayData = await fetch('https://corona.lmao.ninja/v2/countries/USA?yesterday=true')
      var yesterdayJson = await yesterdayData.json()
      this.loadYesterday = yesterdayJson
    },
    async fetchStateData () {
      // fecth states data
      var statesData = await fetch('https://corona.lmao.ninja/v2/states?sort=cases')
      var statesJson = await statesData.json()
      this.loadStates = statesJson
    }
  }
};
</script>
