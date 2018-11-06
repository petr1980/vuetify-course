<template>
  <v-snackbar
        :multi-line="true"
        :timeout="5000"
        color="error"
        @input="closeError"
        :value="true"
      >
        {{ error }}
        <v-btn flat dark @click="closeError">
          Close
        </v-btn>
      </v-snackbar>
</template>

<script>
export default {
  data () {
    return {
      error: this.$store.getters.error
    }
  },
  methods: {
    closeError () {
      this.$store.dispatch('clearError')
    }
  }
}
</script>
