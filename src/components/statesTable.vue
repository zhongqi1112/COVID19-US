<template>
  <v-container>
    <v-row class="text-center justify-center">
      <v-col class="xs-12" cols="12">
        <v-data-table
          :mobile-breakpoint="0"
          :headers="headers"
          :items="statesList"
          :items-per-page="5"
          :sort-by="['cases']"
          :sort-desc="[true]"
          class="elevation-1"
        ></v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'StatesTable',
  props: [
    'statesList',
  ],
  data: () => ({
    headers: [
      {
        text: 'State',
        align: 'start',
        sortable: false,
        value: 'state',
      },
      { text: 'Confirmed', value: 'cases' },
      { text: 'Active', value: 'active' },
      { text: 'Deceased', value: 'deaths' },
    ]
  })
}
</script>

<style scoped>
/* reset padding of table*/
.container {
  padding: 0px 12px;
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
