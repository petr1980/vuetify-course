<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h1 class="text--secondary mb-3">Create new ad</h1>
          <v-form ref="form" v-model="valid" validation class="mb-3">
            <v-text-field 
              name="title" 
              label="ad title" 
              type="text"
              :rules="[v => !!v || 'title is required']"
              v-model="title"
            ></v-text-field>
            <v-textarea 
              name="description" 
              label="description" 
              type="text"
              :rules="[v => !!v || 'description is required']"
              v-model="desc"
            > </v-textarea>
          </v-form>
        <v-layout row mb-3>
          <v-flex xs12>
            <v-btn class="warning m-0" @click="triggerUpload"
            > Upload
              <v-icon right dark>cloud_upload</v-icon>
            </v-btn>
            <input 
              ref="fileInput" 
              type="file" 
              style="display:none" 
              accept="image/*"
              @change="onFileChange"
            >
          </v-flex>
        </v-layout>

        <v-layout row>
          <v-flex xs12>
            <img :src="imageSrc" height="100px" v-if="imageSrc">
          </v-flex>
        </v-layout>       
        <v-layout row>
          <v-flex xs12>
            <v-switch 
              color="success"
              label="add promo" 
              v-model="promo"
            >
            </v-switch>
          </v-flex>
        </v-layout>    
        <v-layout row mb-3>
          <v-flex xs12>
            <v-spacer></v-spacer>
            <v-btn
              :loading="loading"
              :disabled="!valid || !image || loading"
              class="success"
              @click="createAd"
            > create ad
            </v-btn>
          </v-flex>
        </v-layout>           

      </v-flex>
    </v-layout>

  </v-container>
</template>

<script >
export default {
  data() {
    return {
      title: '',
      desc: '',
      promo: false,
      valid: false,
      image: null,
      imageSrc: ''
    }
  },
  methods: {
    createAd() {
      if(this.$refs.form.validate() && this.image) {
        let ad = {
          title: this.title,
          desc: this.desc,
          promo: this.promo,
          src: this.image
        }

        this.$store.dispatch('createAda', ad)
            .then(() => {
              this.$router.push('/list')
            })
            .catch(() => {} )
      }
    },
    triggerUpload () {
      this.$refs.fileInput.click()
    },
    onFileChange (e) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onload = e => {
        this.imageSrc =   reader.result
        this.image = file
      }
      reader.readAsDataURL(file)
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  }
}
</script>
