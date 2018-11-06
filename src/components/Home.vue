<template>
  <div v-if="!loading">
    <v-container fluid>
      <v-layout row>
        <v-flex xs12>
          <v-carousel>
            <v-carousel-item
              v-for="item in promoAds"
              :key="item.id"
              :src="item.src"
            >
              <div class="car-link">
                <v-btn class="error" :to="'/ad/' + item.id ">{{item.title}}</v-btn>
              </div>
            </v-carousel-item>
          </v-carousel>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container  grid-list-lg>
      <v-layout row wrap>
        <v-flex 
          xs12 sm6 md4
          v-for="item in ads"
          :key="item.id"
        >
          <v-card>
            <v-img
              :src="item.src"
              aspect-ratio="2.75"
            ></v-img>

            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">{{item.title}}</h3>
                <div>{{item.desc}}</div>
              </div>
            </v-card-title>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat :to="'/ad/' + item.id ">Open</v-btn>
              <Buy-Modal :ad="item"></Buy-Modal>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
  <div v-else class="text-xs-center pt-5">
   <v-progress-circular
      :width="3"
      color="green"
      indeterminate
   ></v-progress-circular>
  </div>
</template>

<script>

export default {
  data() {
    return {   }
  },
  computed: {
    promoAds () {
      return this.$store.getters.promoAds
    },
    ads () {
      return this.$store.getters.ads
    },
    loading () {
      return this.$store.getters.loading
    }
  }
};
</script>

<style scoped>
  .car-link {
    position: absolute;
    bottom: 50px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0,0,0,.5);
    padding: 5px 15px;
    border-radius: 5px 5px 0 0;
  }
</style>

