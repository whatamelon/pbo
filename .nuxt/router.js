import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _07879a24 = () => interopDefault(import('../pages/askfollowing/index.vue' /* webpackChunkName: "pages/askfollowing/index" */))
const _29b2a6a1 = () => interopDefault(import('../pages/changePassword/index.vue' /* webpackChunkName: "pages/changePassword/index" */))
const _5386e680 = () => interopDefault(import('../pages/contact/index.vue' /* webpackChunkName: "pages/contact/index" */))
const _76c29e60 = () => interopDefault(import('../pages/contents/index.vue' /* webpackChunkName: "pages/contents/index" */))
const _2214759e = () => interopDefault(import('../pages/createAccount/index.vue' /* webpackChunkName: "pages/createAccount/index" */))
const _51bb0ac8 = () => interopDefault(import('../pages/curate/index.vue' /* webpackChunkName: "pages/curate/index" */))
const _669b26fa = () => interopDefault(import('../pages/editContents/index.vue' /* webpackChunkName: "pages/editContents/index" */))
const _4e24779f = () => interopDefault(import('../pages/editProfile/index.vue' /* webpackChunkName: "pages/editProfile/index" */))
const _30636965 = () => interopDefault(import('../pages/flutterBridge/index.vue' /* webpackChunkName: "pages/flutterBridge/index" */))
const _21570b67 = () => interopDefault(import('../pages/follow/index.vue' /* webpackChunkName: "pages/follow/index" */))
const _3f1f4456 = () => interopDefault(import('../pages/home/index.vue' /* webpackChunkName: "pages/home/index" */))
const _37460dde = () => interopDefault(import('../pages/makeContents/index.vue' /* webpackChunkName: "pages/makeContents/index" */))
const _f38cec6e = () => interopDefault(import('../pages/model/index.vue' /* webpackChunkName: "pages/model/index" */))
const _25613191 = () => interopDefault(import('../pages/myPage/index.vue' /* webpackChunkName: "pages/myPage/index" */))
const _5ce5ebae = () => interopDefault(import('../pages/order/index.vue' /* webpackChunkName: "pages/order/index" */))
const _7e7c6a28 = () => interopDefault(import('../pages/privacy/index.vue' /* webpackChunkName: "pages/privacy/index" */))
const _71cdbecf = () => interopDefault(import('../pages/product/index.vue' /* webpackChunkName: "pages/product/index" */))
const _132d6cc4 = () => interopDefault(import('../pages/qurator/index.vue' /* webpackChunkName: "pages/qurator/index" */))
const _04036d19 = () => interopDefault(import('../pages/register/index.vue' /* webpackChunkName: "pages/register/index" */))
const _654ddfa7 = () => interopDefault(import('../pages/saved/index.vue' /* webpackChunkName: "pages/saved/index" */))
const _400526c4 = () => interopDefault(import('../pages/search/index.vue' /* webpackChunkName: "pages/search/index" */))
const _f8f00ab2 = () => interopDefault(import('../pages/terms/index.vue' /* webpackChunkName: "pages/terms/index" */))
const _43078d59 = () => interopDefault(import('../pages/curate/bodytype/index.vue' /* webpackChunkName: "pages/curate/bodytype/index" */))
const _13838b6e = () => interopDefault(import('../pages/curate/follow/index.vue' /* webpackChunkName: "pages/curate/follow/index" */))
const _11630564 = () => interopDefault(import('../pages/curate/height/index.vue' /* webpackChunkName: "pages/curate/height/index" */))
const _040490aa = () => interopDefault(import('../pages/qurator/6/index.vue' /* webpackChunkName: "pages/qurator/6/index" */))
const _da3b2b28 = () => interopDefault(import('../pages/qurator/7/index.vue' /* webpackChunkName: "pages/qurator/7/index" */))
const _27c71d2d = () => interopDefault(import('../pages/qurator/8/index.vue' /* webpackChunkName: "pages/qurator/8/index" */))
const _86a86024 = () => interopDefault(import('../pages/qurator/9/index.vue' /* webpackChunkName: "pages/qurator/9/index" */))
const _0b0181b3 = () => interopDefault(import('../pages/curate/_id/index.vue' /* webpackChunkName: "pages/curate/_id/index" */))
const _6392cf98 = () => interopDefault(import('../pages/model/_id/index.vue' /* webpackChunkName: "pages/model/_id/index" */))
const _8a064b8c = () => interopDefault(import('../pages/product/_id/index.vue' /* webpackChunkName: "pages/product/_id/index" */))
const _43e0a0ef = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/askfollowing",
    component: _07879a24,
    name: "askfollowing"
  }, {
    path: "/changePassword",
    component: _29b2a6a1,
    name: "changePassword"
  }, {
    path: "/contact",
    component: _5386e680,
    name: "contact"
  }, {
    path: "/contents",
    component: _76c29e60,
    name: "contents"
  }, {
    path: "/createAccount",
    component: _2214759e,
    name: "createAccount"
  }, {
    path: "/curate",
    component: _51bb0ac8,
    name: "curate"
  }, {
    path: "/editContents",
    component: _669b26fa,
    name: "editContents"
  }, {
    path: "/editProfile",
    component: _4e24779f,
    name: "editProfile"
  }, {
    path: "/flutterBridge",
    component: _30636965,
    name: "flutterBridge"
  }, {
    path: "/follow",
    component: _21570b67,
    name: "follow"
  }, {
    path: "/home",
    component: _3f1f4456,
    name: "home"
  }, {
    path: "/makeContents",
    component: _37460dde,
    name: "makeContents"
  }, {
    path: "/model",
    component: _f38cec6e,
    name: "model"
  }, {
    path: "/myPage",
    component: _25613191,
    name: "myPage"
  }, {
    path: "/order",
    component: _5ce5ebae,
    name: "order"
  }, {
    path: "/privacy",
    component: _7e7c6a28,
    name: "privacy"
  }, {
    path: "/product",
    component: _71cdbecf,
    name: "product"
  }, {
    path: "/qurator",
    component: _132d6cc4,
    name: "qurator"
  }, {
    path: "/register",
    component: _04036d19,
    name: "register"
  }, {
    path: "/saved",
    component: _654ddfa7,
    name: "saved"
  }, {
    path: "/search",
    component: _400526c4,
    name: "search"
  }, {
    path: "/terms",
    component: _f8f00ab2,
    name: "terms"
  }, {
    path: "/curate/bodytype",
    component: _43078d59,
    name: "curate-bodytype"
  }, {
    path: "/curate/follow",
    component: _13838b6e,
    name: "curate-follow"
  }, {
    path: "/curate/height",
    component: _11630564,
    name: "curate-height"
  }, {
    path: "/qurator/6",
    component: _040490aa,
    name: "qurator-6"
  }, {
    path: "/qurator/7",
    component: _da3b2b28,
    name: "qurator-7"
  }, {
    path: "/qurator/8",
    component: _27c71d2d,
    name: "qurator-8"
  }, {
    path: "/qurator/9",
    component: _86a86024,
    name: "qurator-9"
  }, {
    path: "/curate/:id",
    component: _0b0181b3,
    name: "curate-id"
  }, {
    path: "/model/:id",
    component: _6392cf98,
    name: "model-id"
  }, {
    path: "/product/:id",
    component: _8a064b8c,
    name: "product-id"
  }, {
    path: "/",
    component: _43e0a0ef,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
