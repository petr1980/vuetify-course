<template>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md6>
            <v-card class="elevation-8">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Login</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form ref="form" v-model="valid" validation>
                  <v-text-field 
                    prepend-icon="person" 
                    name="email" 
                    label="email" 
                    type="email"
                    :rules="emailRules"
                    v-model="email"
                  ></v-text-field>
                  <v-text-field 
                    id="password" 
                    prepend-icon="lock" 
                    name="password" 
                    label="Password" 
                    type="password"
                    :counter="6"
                    :rules="passwordRules"
                    v-model="password"
                  > </v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn 
                  color="primary"
                  @click="onSubmit"
                  :loading="loading"
                  :disabled="!valid || loading"
                >Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>  
</template>

<script >
export default {
  data() {
    return {
      email: "",
      password: "",
      valid: false,
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ],
      passwordRules: [
        v => !!v || "password is required",
        v => (v && v.length >= 6) || "password must be equar or mo 6 characters"
      ]
    };
  },
  created () {
    if(this.$route.query['loginError']){
      this.$store.dispatch('setError', 'You should log in')
    }
  },
  methods: {
    onSubmit() {
      if (this.$refs.form.validate()) {
        const user = {
          email: this.email,
          password: this.password
        }
        this.$store.dispatch('loginUser', user)
            .then(() => {
              this.$router.push('/')
            })
            .catch(err => console.log(err))
      }
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  }
};
</script>
