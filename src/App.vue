<template>
  <v-app>
    <v-content>
      <Home :today='loadToday' :yesterday='loadYesterday'/>
      <UsaMap :statesList='loadStates'/>
      <StatesTable :statesList='loadStates'/>
      <Footer :today='loadToday'/>
    </v-content>
  </v-app>
</template>

<script>
import Home from './components/home';
import UsaMap from './components/usaMap';
import StatesTable from './components/statesTable';
import Footer from './components/footer';

const DB_URL = 'https://disease.sh/v3/covid-19/'

export default {
  name: 'App',
  components: {
    Home,
    UsaMap,
    StatesTable,
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
      var todayData = await fetch(DB_URL + 'countries/USA')
      var todayJson = await todayData.json()
      this.loadToday = todayJson
    },
    async fetchYesterdayData () {
      // fecth yesterday data
      var yesterdayData = await fetch(DB_URL + 'countries/USA?yesterday=true')
      var yesterdayJson = await yesterdayData.json()
      this.loadYesterday = yesterdayJson
    },
    async fetchStateData () {
      // fecth states data
      var statesData = await fetch(DB_URL + 'states?sort=cases')
      var statesJson = await statesData.json()
      this.loadStates = statesJson
    }
  }
};
</script>
