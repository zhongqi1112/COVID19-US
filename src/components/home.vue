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
          24052
        </h2>
      </v-col>

      <v-col
        class="mb-5 red--text text--darken-4"
        cols="12"
      >
        <p class="subheading font-weight-regular">
          Cases
        </p>
        <h1 class="headline font-weight-bold mb-3">
          669,405
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
          53,725
        </h2>
      </v-col>

      <v-col
        class="mb-5 blue-grey--text text--darken-3"
        cols="12"
      >
        <p class="subheading font-weight-regular">
          Deaths
        </p>
        <h2 class="headline font-weight-bold mb-3">
          34,255
        </h2>
      </v-col>

      <v-col
        class="mb-5"
        cols="12"
      >
        <p class="headline font-weight-bold mb-3">
          Updated: 04/14/2020 14:42 PDT
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'HelloWorld',

    data: () => ({
      ecosystem: [
        {
          text: 'vuetify-loader',
          href: 'https://github.com/vuetifyjs/vuetify-loader',
        },
        {
          text: 'github',
          href: 'https://github.com/vuetifyjs/vuetify',
        },
        {
          text: 'awesome-vuetify',
          href: 'https://github.com/vuetifyjs/awesome-vuetify',
        },
      ],
      importantLinks: [
        {
          text: 'Documentation',
          href: 'https://vuetifyjs.com',
        },
        {
          text: 'Chat',
          href: 'https://community.vuetifyjs.com',
        },
        {
          text: 'Made with Vuetify',
          href: 'https://madewithvuejs.com/vuetify',
        },
        {
          text: 'Twitter',
          href: 'https://twitter.com/vuetifyjs',
        },
        {
          text: 'Articles',
          href: 'https://medium.com/vuetify',
        },
      ],
      whatsNext: [
        {
          text: 'Explore components',
          href: 'https://vuetifyjs.com/components/api-explorer',
        },
        {
          text: 'Select a layout',
          href: 'https://vuetifyjs.com/layout/pre-defined',
        },
        {
          text: 'Frequently Asked Questions',
          href: 'https://vuetifyjs.com/getting-started/frequently-asked-questions',
        },
      ],
    }),
  }
</script>
