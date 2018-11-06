<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h1 class="text--secontary mb-3">My adds</h1>
        <v-card 
          class="elevation-10 mb-3"
          v-for="ad in myAds"
          :key="ad.id"
        >
          <v-layout row>
            <v-flex xs4>
              <v-card-media
                :src="ad.src"
                height="160px"
              ></v-card-media>
            </v-flex>
            <v-flex xs8>
              <v-card-text>
                <h2 class="text--primary">{{ad.title}}</h2>
                <p>{{ad.desc}} </p>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="info" :to="/ad/ + ad.id">Open</v-btn>
              </v-card-actions>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script >
export default {
  data() {
    return {
    }
  },
  computed: {
    myAds () {
      return this.$store.getters.myAds
    }
  }
}
</script>
