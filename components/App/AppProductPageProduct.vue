<template>
  <figure
    class="app2-product"
    @click="toDetailPage(product.linkUrl)"
  >
    <div v-if="isNew(product.uploadTime)" class="app2-product-new">N</div>
    <div class="app2-product-image-background">
      <button
        v-if="!saved"
        class="save-button"
        @click.stop="addToSavedProducts(product)"
      >
        <i class="material-icons save-button-icon">
          favorite
        </i>
      </button>
      <button
        v-if="saved"
        class="save-button"
        @click.stop="deleteFromSavedProducts(product)"
      >
        <i class="material-icons save-button-icon save-button--active">
          favorite
        </i>
      </button>

      <img
        class="app2-product-image"
        :src="IMAGE_URL + product.imgFile"
        alt="/h2.jpg"
        loading="lazy"
      />
    </div>

    <div class="app2-product-info">
      <div class="app2-product-price"
      ref= "priceCustom">
        {{ separateThousand(product.price) }}
      </div>
      <div class="app2-product-name">{{ product.name }}</div>
    </div>

    <div class="app2-product-model">
      <div class="app2-product-model-name">{{ product.modelName }}</div>
      <div class="app2-product-model-height">
        {{ recalculatedHeight(product.modelHeight) }}cm
      </div>
    </div>
  </figure>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      saved: false,
    };
  },

  computed: {
    ...mapGetters(["IMAGE_URL"])
  },

  created() {
    this.isSaved();
  },

  methods: {
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
      if (price.length == 6) {
        index = 3;
      } else if (price.length == 5) {
        index = 2;
      } else if (price.length == 4) {
        index = 1;
      } else {
        return price;
      }
      return price.substring(0, index) + "," + price.substring(index);
    },

    addToSavedProducts(product) {
      this.$amplitude
      .getInstance()
      .logEvent("click heart", { clickedPage: "상품상세", modelId: product.modelId,
            applyedFilters: 'none' });
      fbq('track', 'click heart');
      this.$store.dispatch("addToSavedProducts", product);
      this.saved = true;
    },

    deleteFromSavedProducts(product) {
      this.saved = false;
      this.$store.dispatch("deleteFromSavedProducts", product);
    },

   async toDetailPage() {
          this.$amplitude
          .getInstance()
          .logEvent("click products", { clickedPage: "상품상세", modelId: this.product.modelId,
            applyedFilters: 'none' });
      this.$amplitude.getInstance().logEvent("go-shop", { modelId: this.product.modelId, clickedPage: "상품상세"});
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
     
    }
  }
};
</script>

<style lang="scss">

.app2-product {
  margin: 0 1% 0 2% !important;
  position: relative;
  background: #fefefe;
  border-radius: 4px;
  width: 140px !important;
  transition: opacity 0.4s ease-in-out;
  cursor: pointer;

    &-image {
    width: 140px;
    height: 180px;
    object-fit: cover;
    border-radius:5px;

    &-background {
    background: $light-grey;
    width: 140px;
    height: 180px;
    border-radius:5px;
  }
    }

  &-new {
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

  &-info {
    padding: 7% 7px 0 7px;
    text-align: left;
  }

  &-name {
    font-size: 0.8em;
    color: #BDBDBD;
    font-weight: 400;
    letter-spacing: 0;
    word-break: keep-all;
    word-wrap: break-word;
    display: inline-block;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: 100%;
  }

  &-price {
    font-size: 1.2em;
    color: #000;
    font-weight: 800;
    letter-spacing: 0;
  }

  &-model {
    padding: 1.5% 7px 0 7px;
    display: flex;
    justify-content: space-between;
    font-size: 0.9em;
  }

  &-model-name {
      font-size: 0.8em;
    font-weight: 500;
    padding-top: 3px;
  }

  &-model-height {
      font-size: 0.8em;
    padding-left: 5px;
    font-weight: 800;
    line-height: 1.3;
    background-color: #ececec;
    padding:3px 8px;
    border-radius: 10px;
  }
}


.app2-product:active{
    background-color: #ececec;
  }
.save-button {
  position: absolute;
  width: auto;
  height: auto;
  top: 0;
  right: 0;
  z-index: 1;

  &-icon {
  margin: 5px 5px 20px 20px;
    color: #dddddd;
    font-size: 2em;
  }

  &--active {
    color: $primary;
  }
}
</style>
