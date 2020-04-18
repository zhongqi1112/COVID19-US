<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          COVID-19 US TODAY
        </h1>

        <p class="subheading font-weight-regular">
          Real-time data of COVID-19
        </p>
      </v-col>

      <v-col
        class="mb-5 red--text"
        cols="12"
      >
        <p class="subheading font-weight-regular">
          New
        </p>
        <h2 class="headline font-weight-bold mb-3">
          {{info.NewConfirmed}}
        </h2>
      </v-col>

      <v-col
        class="mb-5 red--text text--darken-4"
        cols="12"
      >
        <p class="subheading font-weight-regular">
          Infected
        </p>
        <h1 class="headline font-weight-bold mb-3">
          {{ info.TotalConfirmed}}
        </h1>
      </v-col>

      <v-col
        class="mb-5 green--text"
        cols="12"
      >
        <p class="subheading font-weight-regular">
          Recoverd
        </p>
        <h2 class="headline font-weight-bold mb-3">
          {{ info.TotalRecovered}}
        </h2>
      </v-col>

      <v-col
        class="mb-5 blue-grey--text text--darken-3"
        cols="12"
      >
        <p class="subheading font-weight-regular">
          Deceased
        </p>
        <h2 class="headline font-weight-bold mb-3">
          {{info.TotalDeaths}}
        </h2>
      </v-col>

      <v-col
        class="mb-5"
        cols="12"
      >
        <p class="mb-3">
          Updated: {{info. Date}}
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'Home',
    data: () => ({
      info: null
    }),
    beforeCreate () {
      fetch('https://api.covid19api.com/summary')
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.info = data.Countries.find(country => country.Slug == 'united-states')
        });
    }
  }
</script>
