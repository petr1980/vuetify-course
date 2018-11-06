<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <v-card v-if="!loading">
          <v-img :src="ad.src" height="300px"></v-img>
          <v-card-text>
            <h1 class="text-primary">{{ad.title}}</h1>
            <p>{{ad.desc}}</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <edit-ad-modal :ad=ad v-if="isOwnter"></edit-ad-modal>
            <Buy-Modal :ad="ad" style="margin-left:5px"></Buy-Modal>
          </v-card-actions>
        </v-card>
        <div v-else class="text-xs-center pt-5">
        <v-progress-circular
            :width="3"
            color="green"
            indeterminate
        ></v-progress-circular>
        </div>        
      </v-flex>
    </v-layout>
  </v-container>

</template>

<script >
import EditAdModal from './EditAdModal'

export default {
  components: {
    EditAdModal
  },
  props: ['id'],
  data() {
    return {
      
    }
  },
  computed: {
    ad () {
      // мой вариант - без замыкания
      return this.$store.getters.ads.find(ad => ad.id.toString() === this.id)

      // прикол через замыкание - не знаю все слишком сложно
      // let id = +this.id;
      // return this.$store.getters.adById(id)
    },
    loading () {
      return this.$store.getters.loading
    }, 
    isOwnter () {
      let userId = this.$store.getters.user.id
      return this.ad.ownerId === userId
    }
  }
}
</script>
