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
          Recoverd
        </p>
        <h2 class="display-3 font-weight-bold mb-3">
          {{ totalRecovered }}
        </h2>
      </v-col>

      <v-col
        class="mb-5 blue-grey--text text--darken-4"
        cols="12"
      >
        <p class="subheading font-weight-regular">
          Deceased
        </p>
        <h2 class="display-3 font-weight-bold mb-3">
          {{ totalDeaths }}
        </h2>
      </v-col>

      <v-col
        class="mb-5"
        cols="12"
      >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'Home',
    data: () => ({
      newConfirmed: 0,
      totalConfirmed: 0,
      newRecovered: 0,
      totalRecovered: 0,
      newDeaths: 0,
      totalDeaths: 0
    }),
    beforeCreate () {
      fetch('https://coronavirus-19-api.herokuapp.com/countries/USA')
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.newConfirmed = data.todayCases
          this.totalConfirmed = data.cases
          this.totalRecovered = data.recovered
          this.totalDeaths = data.deaths
        })
    }
  }
</script>
