<template>
  <v-dialog width="400px" v-model="modal">
    <v-btn class="warning"  slot="activator">Edit</v-btn>

    <v-card>
      <v-container>
        <v-layout row>
          <v-flex xs12>
            <v-card-title>
              <h1 class="text--primary">Edit ad</h1>
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row>
          <v-flex xs12>
            <v-card-text>
              <v-text-field 
                name="title" 
                label="title" 
                type="text"
                v-model="editTitle"
              > </v-text-field>
              <v-textarea 
                name="description" 
                label="description" 
                type="text"
                v-model="editDescription"
              > </v-textarea>              
            </v-card-text>
          </v-flex>
        </v-layout>  
        <v-divider></v-divider>      
        <v-layout row>
          <v-flex xs12>
            <v-card-actions>
              <v-spacer> </v-spacer>
                <v-btn flat @click="onCancel">Cansel</v-btn>
                <v-btn class="success" @click="onSave">Save</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>             
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  export default  {
    props: ['ad'],
    data () {
      return {
        modal: false,
        editTitle: this.ad.title,
        editDescription: this.ad.desc
      }
    },
    methods: {
      onCancel () {
        this.editTitle = this.ad.title
        this.editDescription = this.ad.desc
        this.modal = false

      },
      onSave () {
        if(this.editTitle !== '' && this.editDescription !== '') {
          this.$store.dispatch('updateAd', {
            title: this.editTitle,
            desc: this.editDescription,
            id: this.ad.id   
          })
        }  
        this.modal = false
      }
    }
  }
</script>