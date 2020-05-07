<template>
  <v-container>
    <v-row class="text-center justify-center">
      <v-col class="xs-12" cols="12">
        <div>Updated: {{ updatedTime }}</div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const _ = require('lodash')

export default {
  name: 'Footer',
  props: [
    'today',
  ],
  computed: {
    updatedTime: function () {
      var updatedTime = ''
      if (!_.isUndefined(this.today.updated)) {
        var time = new Date(this.today.updated)
        updatedTime = time.toLocaleDateString("en-US") + ' ' + time.toLocaleTimeString("en-US")
      }
      return updatedTime
    },
  }
}
</script>


<style scoped>
/* reset padding*/
.container {
  padding: 0px;
}
</style>
