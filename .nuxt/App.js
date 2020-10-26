import Vue from 'vue'

import {
  getMatchedComponentsInstances,
  promisify,
  globalHandleError
} from './utils'

import NuxtError from '../layouts/error.vue'
import NuxtLoading from './components/nuxt-loading.vue'

import '../node_modules/vuetify/dist/vuetify.css'

import '../node_modules/bootstrap/dist/css/bootstrap.css'

import '../node_modules/bootstrap-vue/dist/bootstrap-vue.css'

import '../assets/main.css'

import '../assets/app.styl'

import _77180f1e from '../layouts/blank.vue'
import _6f6c098b from '../layouts/default.vue'
import _6135b542 from '../layouts/noBottom.vue'
import _6adcfda4 from '../layouts/noHeader.vue'
import _52d00938 from '../layouts/quratorLayout.vue'

const layouts = { "_blank": _77180f1e,"_default": _6f6c098b,"_noBottom": _6135b542,"_noHeader": _6adcfda4,"_quratorLayout": _52d00938 }

export default {
  head: {"title":"인플루언서 센터","script":[{"src":"https:\u002F\u002Fstatic.nid.naver.com\u002Fjs\u002Fnaveridlogin_js_sdk_2.0.0.js","type":"text\u002Fjavascript","charset":"utf-8"},{"src":"https:\u002F\u002Fconnect.facebook.net\u002Fen_US\u002Fsdk.js","defer":true},{"src":"https:\u002F\u002Fapis.google.com\u002Fjs\u002Fplatform.js","type":"text\u002Fjavascript","async":true,"defer":true},{"src":"https:\u002F\u002Fajax.googleapis.com\u002Fajax\u002Flibs\u002Fjquery\u002F1.11.3\u002Fjquery.min.js"},{"src":"\u002F\u002Fwww.googletagmanager.com\u002Fgtm.js?id=GTM-5KW535K&l=dataLayer","async":true}],"meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"},{"name":"HandheldFriendly","content":"true"},{"http-equiv":"pragma","content":"no-cache, no-store, must-revalidate"},{"http-equiv":"cache-control","content":"no-cache"},{"http-equiv":"expires","content":"0"},{"hid":"description","name":"description","content":"내 스타일과 체형의 패션 인싸를 만나보세요."},{"hid":"keywords","name":"keywords","content":"인플루언서, 모델, 쇼핑몰, 패션, 여자쇼핑몰, 키작녀쇼핑몰, 10대여자쇼핑몰, 20대여자쇼핑몰, 30대여자쇼핑몰, 쇼핑몰추천, 여자옷, 키작은여자바지, 여자슬랙스"},{"name":"naver-site-verification","content":"827a9abad2955018531b79ad0f4e3dfa9d983de6"},{"property":"og:type","content":"website"},{"property":"og:title","content":"핏츄 - FITCHOO"},{"property":"og:description","content":"핏츄, 스타일, 체형별 패션 인싸 쇼핑앱"},{"property":"og:image","content":"https:\u002F\u002Ffitchoo.kr\u002Fgraphicimg.jpg"},{"property":"og:url","content":"https:\u002F\u002Ffitchoo.kr"},{"property":"og:locale","content":"ko_kr"},{"name":"msapplication-TileColor","content":"#da532c"},{"name":"theme-color","content":"#ffffff"},{"name":"google-signin-client_id","content":"797072200153-12234jka3idovnqi1sm2qnlefmj86f9h.apps.googleusercontent.com"}],"link":[{"rel":"apple-touch-icon","sizes":"180x180","href":"\u002Fapple-touch-icon.png"},{"rel":"icon","type":"image\u002Fpng","sizes":"32x32","href":"\u002Ffavicon-32x32.png"},{"rel":"icon","type":"image\u002Fpng","sizes":"16x16","href":"\u002Ffavicon-16x16.png"},{"rel":"manifest","href":"\u002Fsite.webmanifest"},{"rel":"stylesheet","href":"https:\u002F\u002Ffonts.googleapis.com\u002Fcss?family=Barlow:400,600|Playfair+Display:700"},{"rel":"canonical","href":"https:\u002F\u002Ffitchoo.kr"},{"rel":"stylesheet","href":"https:\u002F\u002Fuse.fontawesome.com\u002Freleases\u002Fv5.8.1\u002Fcss\u002Fall.css","integrity":"sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf","crossorigin":"anonymous"},{"rel":"stylesheet","type":"text\u002Fcss","href":"\u002F\u002Ffonts.googleapis.com\u002Fcss?family=Roboto:300,400,500,700|Material+Icons"}],"style":[],"noscript":[{"hid":"gtm-noscript","innerHTML":"\u003Ciframe src=\"\u002F\u002Fwww.googletagmanager.com\u002Fns.html?id=GTM-5KW535K&l=dataLayer\" height=\"0\" width=\"0\" style=\"display:none;visibility:hidden\"\u003E\u003C\u002Fiframe\u003E","pbody":true}],"__dangerouslyDisableSanitizersByTagID":{"gtm-noscript":["innerHTML"]}},

  render (h, props) {
    const loadingEl = h('NuxtLoading', { ref: 'loading' })

    if (this.nuxt.err && NuxtError.layout) {
      this.setLayout(
        typeof NuxtError.layout === 'function'
          ? NuxtError.layout(this.context)
          : NuxtError.layout
      )
    }

    const layoutEl = h(this.layout || 'nuxt')
    const templateEl = h('div', {
      domProps: {
        id: '__layout'
      },
      key: this.layoutName
    }, [ layoutEl ])

    const transitionEl = h('transition', {
      props: {
        name: 'layout',
        mode: 'out-in'
      },
      on: {
        beforeEnter (el) {
          // Ensure to trigger scroll event after calling scrollBehavior
          window.$nuxt.$nextTick(() => {
            window.$nuxt.$emit('triggerScroll')
          })
        }
      }
    }, [ templateEl ])

    return h('div', {
      domProps: {
        id: '__nuxt'
      }
    }, [
      loadingEl,

      transitionEl
    ])
  },

  data: () => ({
    isOnline: true,

    layout: null,
    layoutName: ''
  }),

  beforeCreate () {
    Vue.util.defineReactive(this, 'nuxt', this.$options.nuxt)
  },
  created () {
    // Add this.$nuxt in child instances
    Vue.prototype.$nuxt = this
    // add to window so we can listen when ready
    if (process.client) {
      window.$nuxt = this

      this.refreshOnlineStatus()
      // Setup the listeners
      window.addEventListener('online', this.refreshOnlineStatus)
      window.addEventListener('offline', this.refreshOnlineStatus)
    }
    // Add $nuxt.error()
    this.error = this.nuxt.error
    // Add $nuxt.context
    this.context = this.$options.context
  },

  mounted () {
    this.$loading = this.$refs.loading
  },
  watch: {
    'nuxt.err': 'errorChanged'
  },

  computed: {
    isOffline () {
      return !this.isOnline
    }
  },

  methods: {
    refreshOnlineStatus () {
      if (process.client) {
        if (typeof window.navigator.onLine === 'undefined') {
          // If the browser doesn't support connection status reports
          // assume that we are online because most apps' only react
          // when they now that the connection has been interrupted
          this.isOnline = true
        } else {
          this.isOnline = window.navigator.onLine
        }
      }
    },

    async refresh () {
      const pages = getMatchedComponentsInstances(this.$route)

      if (!pages.length) {
        return
      }
      this.$loading.start()

      const promises = pages.map((page) => {
        const p = []

        if (page.$options.fetch) {
          p.push(promisify(page.$options.fetch, this.context))
        }

        if (page.$options.asyncData) {
          p.push(
            promisify(page.$options.asyncData, this.context)
              .then((newData) => {
                for (const key in newData) {
                  Vue.set(page.$data, key, newData[key])
                }
              })
          )
        }

        return Promise.all(p)
      })
      try {
        await Promise.all(promises)
      } catch (error) {
        this.$loading.fail()
        globalHandleError(error)
        this.error(error)
      }
      this.$loading.finish()
    },

    errorChanged () {
      if (this.nuxt.err && this.$loading) {
        if (this.$loading.fail) {
          this.$loading.fail()
        }
        if (this.$loading.finish) {
          this.$loading.finish()
        }
      }
    },

    setLayout (layout) {
      if (!layout || !layouts['_' + layout]) {
        layout = 'default'
      }
      this.layoutName = layout
      this.layout = layouts['_' + layout]
      return this.layout
    },
    loadLayout (layout) {
      if (!layout || !layouts['_' + layout]) {
        layout = 'default'
      }
      return Promise.resolve(layouts['_' + layout])
    }
  },

  components: {
    NuxtLoading
  }
}
