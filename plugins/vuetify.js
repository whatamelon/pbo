import Vue from 'vue'
import Vuetify, {
    VSnackbar,
    VIcon,
    VDialog,
    VCard,
    VCardTitle,
    VCardText,
    VCardActions,
    VSpacer,
    VBtn,
    VToolbar,
    VToolbarTitle,
    VAlert
  } from 'vuetify/lib'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify, {
    components: {
        VSnackbar,
        VIcon,
        VDialog,
        VCard,
        VCardTitle,
        VCardText,
        VCardActions,
        VSpacer,
        VBtn,
        VToolbar,
        VToolbarTitle,
        VAlert
      }
})

// const opts = {}

// export default new Vuetify(opts)