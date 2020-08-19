<template>
  <figure
    v-if="isValid"
    class="app-product"
    @click="toDetailPage()"
    ontouchstart=""
  >
    <div v-if="isNew(product.uploadTime)" class="app-product__new">N</div>
    <div class="app-product__image-background">
      <button
        v-if="!saved"
        class="save-button"
        @click.stop="addToSavedProducts(product)"
      >
        <i class="material-icons save-button__icon">
          favorite
        </i>
      </button>
      <button
        v-if="saved"
        class="save-button"
        @click.stop="deleteFromSavedProducts(product)"
      >
        <i class="material-icons save-button__icon save-button--active">
          favorite
        </i>
      </button>

    <transition>
      <img
      v-show="isLoad"
        class="app-product__image"
        :src="IMAGE_URL + product.imgFile"
        alt="/h2.jpg"
        @error="hideItem"
        @load="loaded"
      />
    </transition>
    </div>

    <div class="app-product__info">      
      <div class="app-product__price">
        {{ separateThousand(product.price) }}
      </div>
      <div class="app-product__name">{{ product.name }}</div>
    </div>

    <div class="app-product__model">
      <div class="app-product__model-name">{{ product.modelName }}</div>
      <div class="app-product__model-height"  v-show="product.modelHeight != '299.0000'">
        {{ recalculatedHeight(product.modelHeight) }}cm
      </div>
    </div>
  </figure>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: {
    product: {
      type: Object,
      required: true
    },

    qurate:{
      type: Object,
      required:true
    }
  },
  
  data() {
    return {
      isValid: true,
      saved: false,
      isLoad: false,
    };
  },
  computed: {
    ...mapGetters([
      "IMAGE_URL",
      "PRICE_RANGE",
      "SORT_ORDER",
      "FIT1"
      ]),

      filterPrice() {
          return this.$store.getters.PRICE_RANGE != '0r100000' ? "가격" : '';
      },

      filterSort() {
          return this.$store.getters.SORT_ORDER != 'de' ? "정렬" : '';
      },

      filterFit() {
          return this.$store.getters.FIT1 != '' ? "체형" : '';
      }
  },

  created() {
    this.isSaved();
  },

  methods: {
    loaded() {
        this.isLoad = true;
      },
    recalculatedHeight(height) {
      height = height.toString().substring(0, 3);
      return height;
    },
    isNew(updatedAt) {
      updatedAt = updatedAt.substring(0, 10);
      const splitUpdatedAt = updatedAt.split("-");
      const year = parseInt(splitUpdatedAt[0]);
      const month = parseInt(splitUpdatedAt[1]);
      const day = parseInt(splitUpdatedAt[2]);
      const timestampParsedUpdatedAt = new Date(year, month - 1, day).getTime();
      const now = new Date().getTime();
      const week = 604800000;
      // const twoDays = 172800000;
      const timePassed = now - timestampParsedUpdatedAt;
      return timePassed <= week ? true : false;
    },

    isSaved() {
      const savedProducts = this.$store.getters.SAVED_PRODUCTS;
      for (let i = 0; i < savedProducts.length; i++) {
        if (savedProducts[i].itemId == this.product.itemId) {
          this.saved = true;
          return;
        }
      }
      return;
    },
    
    separateThousand(price) {
      price = price.toString();
      let index;
      if (price.length == 11) {
        index = 3;
      price = price.slice(0, 6);
      } else if (price.length == 10) {
        index = 2;
      price = price.slice(0, 5);
      } else if (price.length == 9) {
        index = 1;
      price = price.slice(0, 4);
      } else if (price.length == 8) {
        index = 1;
      price = price.slice(0, 3);
      return price;
      } else {
        return price;
      }
      return price.substring(0, index) + "," + price.substring(index);
    },

    hideItem() {
      this.isValid = true;
    },

    addToSavedProducts(product) {
      fbq('track', 'click heart');        
      if (this.$route.name.includes("search")) { 
          this.$amplitude
            .getInstance()
            .logEvent("click heart", { curationName:'noCuration',
              clickedPage: "검색", modelId: product.modelId,
            applyedFilters: '필터이름(' + this.filterPrice +','+ this.filterSort+','+ this.filterFit+')'
          });
        }else if (this.$route.name.includes("curate")) { 
          this.$amplitude
            .getInstance()
            .logEvent("click heart", { curationName: this.qurate.title,
              clickedPage: "큐레이션", modelId: product.modelId,
            applyedFilters: '필터이름(' + this.filterPrice +','+ this.filterSort+','+ this.filterFit+')'
          });
        }
      this.$store.dispatch("addToSavedProducts", product);
      this.saved = true;
    },

    deleteFromSavedProducts(product) {
      this.saved = false;
      this.$store.dispatch("deleteFromSavedProducts", product);
    },
    async toDetailPage() { 
      if (
        this.$route.name.includes("search")) {
        this.$amplitude
          .getInstance()
          .logEvent("click products", { curatorName:'No',
            clickedPage: "검색", modelId: this.product.modelId,
            applyedFilters: '필터이름(' + this.filterPrice +','+ this.filterSort+','+ this.filterFit+')'
          });
        this.$amplitude.getInstance().logEvent("go-shop", { modelId: this.product.modelId, clickedPage: "검색"});
      }else if (
        this.$route.name.includes("curate")) {
        this.$amplitude
          .getInstance()
          .logEvent("click products", { curatorName:this.qurate.quserName,
            clickedPage: "큐레이션", modelId: this.product.modelId,
            applyedFilters: '필터이름(' + this.filterPrice +','+ this.filterSort+','+ this.filterFit+')'
          });
        this.$amplitude.getInstance().logEvent("go-shop", { modelId: this.product.modelId, clickedPage: "큐레이션"});
      }

    //  const itemId = this.product.itemId.toString();
    //   const heart = this.saved ? "1" : "0";
    //   const itemName = this.product.name;
    //   const imgUrl = this.$store.getters.IMAGE_URL + this.product.imgFile;

    //   if (window.AppType == "android" || window.AppType == "android3") {
    //     window.fcjs_if.setItemInfo(itemId, heart, itemName, imgUrl);
    //   }
    //   if(window.AppType == "ios2" || window.AppType == "ios3"){
    //     var message = {
    //       'itemId': itemId,
    //       'heart': heart,
    //       'itemName': itemName,
    //       'imgUrl': imgUrl
    //     };
    //     window.webkit.messageHandlers.setItemInfo.postMessage(message);
    //   }

      if(!localStorage.getItem("click5tm")) {
        localStorage.setItem("click5tm","1");
      }
      else if (localStorage.getItem("click5tm") == "5") {
        var clickitem = localStorage.getItem("click5tm");
        fbq('track', 'click products5tms');
        clickitem++
        localStorage.setItem("click5tm",clickitem);
      }
      else {
        var clickitem = localStorage.getItem("click5tm");
        clickitem++
        localStorage.setItem("click5tm",clickitem);
      }
           const itemId = this.product.itemId.toString();
      const heart = this.saved ? "1" : "0";
      const itemName = this.product.name;
      const imgUrl = this.$store.getters.IMAGE_URL + this.product.imgFile;

      if (window.AppType == "android" || window.AppType == "android3") {
        window.fcjs_if.setItemInfo(itemId, heart, itemName, imgUrl);
      }
      if(window.AppType == "ios2" || window.AppType == "ios3"){
        var message = {
          'itemId': itemId,
          'heart': heart,
          'itemName': itemName,
          'imgUrl': imgUrl
        };
        window.webkit.messageHandlers.setItemInfo.postMessage(message);
      }

      const product = this.product;
      const recentProducts = JSON.parse(localStorage.recentProducts);

      const isIncluded =
        recentProducts.filter(product => product.itemId == this.product.itemId)
          .length === 0
          ? false
          : true;

      if (!isIncluded) {
        if (recentProducts.length === 30) {
          recentProducts.pop();
        }
        recentProducts.unshift(product);
        localStorage.recentProducts = JSON.stringify(recentProducts);
      }
      
        window.open(product.linkUrl);
     


    //   const product = this.product;
    //   const recentProducts = JSON.parse(localStorage.recentProducts);
      
    //   await this.$store.dispatch("getModelInfo", product.modelId);
      
    //   localStorage.setItem('cat1',product.cat1);
    //   localStorage.setItem('cat2',product.cat2);
    //   const isIncluded =
    //     recentProducts.filter(product => product.itemId == this.product.itemId)
    //       .length === 0
    //       ? false
    //       : true;
    //   if (!isIncluded) {
    //     if (recentProducts.length === 30) {
    //       recentProducts.pop();
    //     }
    //     recentProducts.unshift(product);
    //     localStorage.recentProducts = JSON.stringify(recentProducts);
    //   }
    //   this.$store.dispatch("setProductInfo", product);
    //   localStorage.setItem("product", JSON.stringify(product));
      
    //   if (this.$route.name == null ) {
    //     window.open(product.linkUrl);
    //   }
    //  else  if(
    //       this.$route.name.includes("curate") ||
    //       this.$route.name.includes("search")
    //   ) {
    //   this.$store.dispatch("setModel",this.$store.getters.MODEL_INFO);
    //   this.$router.push("/product/" + product.itemId);
    //   }
    //   else {
    //     window.open(product.linkUrl);
    //   }
     
    }
  }
};
</script>

<style lang="scss">
.custom {
  font-size:1.4em !important;
}
.newCustom {
  font-size:1em !important;
  padding: 2px 6px !important;
  margin: 8px !important;
}
.imgCustom {
 height:210px !important;
}
.backCustom {
   height:210px !important;
}
.app-product {
  margin: 0 0 20px 2%;
  position: relative;
  background: #fefefe;
  border: 1px solid #f2f2f2;
  border-radius: 4px;
  width: 47%;
  transition: opacity 0.4s ease-in-out;
  cursor: pointer;
  &__new {
    position: absolute;
    background-color: $primary;
    color: $white;
    margin: 6px;
    padding: 1px 6px 1px 6px;
    border-radius: 4px;
    font-size: 0.7em;
    font-weight: 700;
    z-index: 1;
  }
  &__image-background {
    background: $light-grey;
    width: 100%;
    height: 150px;
    border-radius: 5px;
  }
  &__image {
    width: 100%;
    height: 150px;
    border-radius: 5px;
    object-fit: cover;
    transition: all .3s ease;
    opacity: 1;
  }
  &__image.v-enter {
      opacity: 0;
  }
  &__info {
    padding: 7px 10px 0 7px;
    text-align: left;
  }
  &__name {
    font-size: 0.9em;
    color: #BDBDBD;
    font-weight: 300;
    letter-spacing: 0;
    word-break: keep-all;
    word-wrap: break-word;
    display: inline-block;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: 100%;
  }
  &__price {
    font-size: 1.3em;
    color: #000;
    font-weight: 800;
    letter-spacing: 0;
  }
  &__model {
    padding: 1px 7px;
    display: flex;
    justify-content: space-between;
    font-size: 0.8em;
  }
  &__model-name {
    color: #000;
    padding-top: 3px;
  }
  &__model-height {
    padding-left: 5px;
    font-weight: 800;
    background-color: #ececec;
    padding:3px 8px;
    border-radius: 10px;
  }
}
.app-product:active{
    background-color: #ececec;
  }
.save-button {
  position: absolute;
  width: auto;
  height: auto;
  top: 0;
  right: 0;
  z-index: 1;
  &__icon {
    margin: 5px 5px 25px 25px;
    color: #dddddd;
    font-size: 2em;
  }
  &--active {
    color: $primary;
  }
}
</style>