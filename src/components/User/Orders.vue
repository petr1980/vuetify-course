<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 class="text-xs-center pt-5" v-if="loading">
      <v-progress-circular
        :width="3"
        color="green"
        indeterminate
       ></v-progress-circular>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 v-else-if="!loading && orders.length !== 0">
        <h1 class="text--secondary mb-3">Orders</h1>
  
        <v-list subheader   two-line>
          <v-list-tile 
            v-for="order in orders"
            :key="order.id"
          >
            <v-list-tile-action>
              <v-checkbox  
                @change="markDown(order)"
                :input-value="order.done"
                color="success darken-1"
              ></v-checkbox>
            </v-list-tile-action>
            <v-list-tile-content @click="invites = !invites">
              <v-list-tile-title>{{order.name}}</v-list-tile-title>
              <v-list-tile-sub-title>{{order.phone}}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn 
                :to="'/ad/' + order.adId"
                class="primary"
                color="success darken-1"
              >Open</v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-flex>
      <v-flex xs12 class="text-xs-center pt-5" v-else>
          <h1 class="text--secondary">You no have any orders</h1>
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
  created () {
    return this.$store.dispatch('fetchOrder')
  },
  methods: {
    markDown(order) {
      this.$store.dispatch('markOrderDone', order.id)
      .then(() => {
        order.done = !order.done
      })
      .catch((error) => {})
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    orders () {
      return this.$store.getters.orders
    }
  }
}
</script>
