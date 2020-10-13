import Vue from 'vue'
import Meta from 'vue-meta'
import ClientOnly from 'vue-client-only'
import NoSsr from 'vue-no-ssr'
import { createRouter } from './router.js'
import NuxtChild from './components/nuxt-child.js'
import NuxtError from '../layouts/error.vue'
import Nuxt from './components/nuxt.js'
import App from './App.js'
import { setContext, getLocation, getRouteData, normalizeError } from './utils'
import { createStore } from './store.js'

/* Plugins */

import nuxt_plugin_vuetify_d283eb92 from 'nuxt_plugin_vuetify_d283eb92' // Source: ./vuetify.js (mode: 'all')
import nuxt_plugin_bootstrapvue_ccf4b004 from 'nuxt_plugin_bootstrapvue_ccf4b004' // Source: ./bootstrap-vue.js (mode: 'all')
import nuxt_plugin_axios_0bc1ee62 from 'nuxt_plugin_axios_0bc1ee62' // Source: ./axios.js (mode: 'all')
import nuxt_plugin_libmoduleplugin8ff58942_eaf264ea from 'nuxt_plugin_libmoduleplugin8ff58942_eaf264ea' // Source: ./lib.module.plugin.8ff58942.js (mode: 'all')
import nuxt_plugin_templatesplugin86bc744c_528c6b98 from 'nuxt_plugin_templatesplugin86bc744c_528c6b98' // Source: ./templates.plugin.86bc744c.js (mode: 'client')
import nuxt_plugin_vueamplitudeplugin_4cfd9585 from 'nuxt_plugin_vueamplitudeplugin_4cfd9585' // Source: ./vue-amplitude-plugin.js (mode: 'client')
import nuxt_plugin_googletagmanager_0889dd03 from 'nuxt_plugin_googletagmanager_0889dd03' // Source: ./google-tag-manager.js (mode: 'client')
import nuxt_plugin_vuedaumpostcode_e6ba5c72 from 'nuxt_plugin_vuedaumpostcode_e6ba5c72' // Source: ./vue-daum-postcode.js (mode: 'client')
import nuxt_plugin_historypush_2a9379ae from 'nuxt_plugin_historypush_2a9379ae' // Source: ../plugins/history-push (mode: 'all')
import nuxt_plugin_vuemasonry_087bf870 from 'nuxt_plugin_vuemasonry_087bf870' // Source: ../plugins/vue-masonry (mode: 'all')
import nuxt_plugin_routerplugin_481e3bd6 from 'nuxt_plugin_routerplugin_481e3bd6' // Source: ../plugins/router-plugin.js (mode: 'all')
import nuxt_plugin_clipboard_c6a8f1d2 from 'nuxt_plugin_clipboard_c6a8f1d2' // Source: ../plugins/clipboard.js (mode: 'all')
import nuxt_plugin_vuetify_d6afc2c2 from 'nuxt_plugin_vuetify_d6afc2c2' // Source: ../plugins/vuetify.js (mode: 'all')
import nuxt_plugin_amplitude_ffbe75ec from 'nuxt_plugin_amplitude_ffbe75ec' // Source: ../plugins/amplitude.js (mode: 'all')
import nuxt_plugin_vviewer_14000650 from 'nuxt_plugin_vviewer_14000650' // Source: ../plugins/v-viewer.js (mode: 'all')
import nuxt_plugin_swiper_68e7f06e from 'nuxt_plugin_swiper_68e7f06e' // Source: ../plugins/swiper.js (mode: 'all')

// Component: <ClientOnly>
Vue.component(ClientOnly.name, ClientOnly)

// TODO: Remove in Nuxt 3: <NoSsr>
Vue.component(NoSsr.name, {
  ...NoSsr,
  render (h, ctx) {
    if (process.client && !NoSsr._warned) {
      NoSsr._warned = true

      console.warn(`<no-ssr> has been deprecated and will be removed in Nuxt 3, please use <client-only> instead`)
    }
    return NoSsr.render(h, ctx)
  }
})

// Component: <NuxtChild>
Vue.component(NuxtChild.name, NuxtChild)
Vue.component('NChild', NuxtChild)

// Component NuxtLink is imported in server.js or client.js

// Component: <Nuxt>`
Vue.component(Nuxt.name, Nuxt)

Vue.use(Meta, {"keyName":"head","attribute":"data-n-head","ssrAttribute":"data-n-head-ssr","tagIDKeyName":"hid"})

const defaultTransition = {"name":"page","mode":"out-in","appear":true,"appearClass":"appear","appearActiveClass":"appear-active","appearToClass":"appear-to"}

async function createApp (ssrContext) {
  const router = await createRouter(ssrContext)

  const store = createStore(ssrContext)
  // Add this.$router into store actions/mutations
  store.$router = router

  // Create Root instance

  // here we inject the router and store to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = {
    store,
    router,
    nuxt: {
      defaultTransition,
      transitions: [ defaultTransition ],
      setTransitions (transitions) {
        if (!Array.isArray(transitions)) {
          transitions = [ transitions ]
        }
        transitions = transitions.map((transition) => {
          if (!transition) {
            transition = defaultTransition
          } else if (typeof transition === 'string') {
            transition = Object.assign({}, defaultTransition, { name: transition })
          } else {
            transition = Object.assign({}, defaultTransition, transition)
          }
          return transition
        })
        this.$options.nuxt.transitions = transitions
        return transitions
      },

      err: null,
      dateErr: null,
      error (err) {
        err = err || null
        app.context._errored = Boolean(err)
        err = err ? normalizeError(err) : null
        const nuxt = this.nuxt || this.$options.nuxt
        nuxt.dateErr = Date.now()
        nuxt.err = err
        // Used in src/server.js
        if (ssrContext) {
          ssrContext.nuxt.error = err
        }
        return err
      }
    },
    ...App
  }

  // Make app available into store via this.app
  store.app = app

  const next = ssrContext ? ssrContext.next : location => app.router.push(location)
  // Resolve route
  let route
  if (ssrContext) {
    route = router.resolve(ssrContext.url).route
  } else {
    const path = getLocation(router.options.base)
    route = router.resolve(path).route
  }

  // Set context to app.context
  await setContext(app, {
    store,
    route,
    next,
    error: app.nuxt.error.bind(app),
    payload: ssrContext ? ssrContext.payload : undefined,
    req: ssrContext ? ssrContext.req : undefined,
    res: ssrContext ? ssrContext.res : undefined,
    beforeRenderFns: ssrContext ? ssrContext.beforeRenderFns : undefined,
    ssrContext
  })

  const inject = function (key, value) {
    if (!key) {
      throw new Error('inject(key, value) has no key provided')
    }
    if (value === undefined) {
      throw new Error('inject(key, value) has no value provided')
    }

    key = '$' + key
    // Add into app
    app[key] = value

    // Add into store
    store[key] = app[key]

    // Check if plugin not already installed
    const installKey = '__nuxt_' + key + '_installed__'
    if (Vue[installKey]) {
      return
    }
    Vue[installKey] = true
    // Call Vue.use() to install the plugin into vm
    Vue.use(() => {
      if (!Vue.prototype.hasOwnProperty(key)) {
        Object.defineProperty(Vue.prototype, key, {
          get () {
            return this.$root.$options[key]
          }
        })
      }
    })
  }

  if (process.client) {
    // Replace store state before plugins execution
    if (window.__NUXT__ && window.__NUXT__.state) {
      store.replaceState(window.__NUXT__.state)
    }
  }

  // Plugin execution

  if (typeof nuxt_plugin_vuetify_d283eb92 === 'function') {
    await nuxt_plugin_vuetify_d283eb92(app.context, inject)
  }

  if (typeof nuxt_plugin_bootstrapvue_ccf4b004 === 'function') {
    await nuxt_plugin_bootstrapvue_ccf4b004(app.context, inject)
  }

  if (typeof nuxt_plugin_axios_0bc1ee62 === 'function') {
    await nuxt_plugin_axios_0bc1ee62(app.context, inject)
  }

  if (typeof nuxt_plugin_libmoduleplugin8ff58942_eaf264ea === 'function') {
    await nuxt_plugin_libmoduleplugin8ff58942_eaf264ea(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_templatesplugin86bc744c_528c6b98 === 'function') {
    await nuxt_plugin_templatesplugin86bc744c_528c6b98(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_vueamplitudeplugin_4cfd9585 === 'function') {
    await nuxt_plugin_vueamplitudeplugin_4cfd9585(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_googletagmanager_0889dd03 === 'function') {
    await nuxt_plugin_googletagmanager_0889dd03(app.context, inject)
  }

  if (process.client && typeof nuxt_plugin_vuedaumpostcode_e6ba5c72 === 'function') {
    await nuxt_plugin_vuedaumpostcode_e6ba5c72(app.context, inject)
  }

  if (typeof nuxt_plugin_historypush_2a9379ae === 'function') {
    await nuxt_plugin_historypush_2a9379ae(app.context, inject)
  }

  if (typeof nuxt_plugin_vuemasonry_087bf870 === 'function') {
    await nuxt_plugin_vuemasonry_087bf870(app.context, inject)
  }

  if (typeof nuxt_plugin_routerplugin_481e3bd6 === 'function') {
    await nuxt_plugin_routerplugin_481e3bd6(app.context, inject)
  }

  if (typeof nuxt_plugin_clipboard_c6a8f1d2 === 'function') {
    await nuxt_plugin_clipboard_c6a8f1d2(app.context, inject)
  }

  if (typeof nuxt_plugin_vuetify_d6afc2c2 === 'function') {
    await nuxt_plugin_vuetify_d6afc2c2(app.context, inject)
  }

  if (typeof nuxt_plugin_amplitude_ffbe75ec === 'function') {
    await nuxt_plugin_amplitude_ffbe75ec(app.context, inject)
  }

  if (typeof nuxt_plugin_vviewer_14000650 === 'function') {
    await nuxt_plugin_vviewer_14000650(app.context, inject)
  }

  if (typeof nuxt_plugin_swiper_68e7f06e === 'function') {
    await nuxt_plugin_swiper_68e7f06e(app.context, inject)
  }

  // If server-side, wait for async component to be resolved first
  if (process.server && ssrContext && ssrContext.url) {
    await new Promise((resolve, reject) => {
      router.push(ssrContext.url, resolve, () => {
        // navigated to a different route in router guard
        const unregister = router.afterEach(async (to, from, next) => {
          ssrContext.url = to.fullPath
          app.context.route = await getRouteData(to)
          app.context.params = to.params || {}
          app.context.query = to.query || {}
          unregister()
          resolve()
        })
      })
    })
  }

  return {
    store,
    app,
    router
  }
}

export { createApp, NuxtError }
