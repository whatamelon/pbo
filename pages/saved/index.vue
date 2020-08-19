<template>
<transition>
  <div class="saved-container" id="saveContainer">

    <SavedTab></SavedTab>
    <div v-if="SAVED_TAB_FILTER == 1">
      <div v-if="!hasProducts" class="no-match" id="noneSaved">
        <h2 class="no-match__oops">
          찜한게 없네요!
        </h2>

        <button class="no-match__button" @click="goToCollectionPage">
          신상품 보러 가기
        </button>
      </div>

      <no-ssr v-if="hasProducts">
        <div
          transition-duration="0"
          class="masonry-container"
          item-selector=".masonry-item"
        >
          <AppProduct2
            v-for="product in SAVED_PRODUCTS"
            :key="product.itemId"
            :product="product"
            class="masonry-item"
          ></AppProduct2>
        </div>
      </no-ssr>

      <div v-if="isSpinning" class="spinner-continaer">
        <AppSpinner2></AppSpinner2>
      </div>
      </div>

      <div v-else>
        <div v-if="!hasRecentProducts" class="no-match">
          <h2 class="no-match__oops">
            최근에 본 상품이 없네요!
          </h2>

          <button class="no-match__button" @click="goToCollectionPage">
            신상품 보러 가기
          </button>
        </div>

        <no-ssr v-if="hasRecentProducts">
          <div
            transition-duration="0"
            class="masonry-container"
            item-selector=".masonry-item"
          >
            <AppProduct2
              v-for="product in recentProducts"
              :key="product.itemId"
              :product="product"
              class="masonry-item"
            ></AppProduct2>
          </div>
        </no-ssr>
      </div>
  </div>
</transition>
</template>

<script>
import AppProduct2 from "@/components/App/AppProduct2";
import AppSpinner2 from "@/components/App/AppSpinner2";
import SavedTab from "@/components/App/SavedTab";

import NoSSR from "vue-no-ssr";

import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    AppProduct2,
    AppSpinner2,
    SavedTab,
    "no-ssr": NoSSR
  },
  transition (to, from) {
    if (localStorage.getItem("backButton")){
    return 'slideLeft'
    }
    else if (localStorage.getItem("previousPage") == "mypage"||
    localStorage.getItem("previousPage") == "home"||
    localStorage.getItem("previousPage") == "bodytype"||
    localStorage.getItem("previousPage") == "model"||
    localStorage.getItem("previousPage") == "modellow"||
    localStorage.getItem("previousPage") == "modelmean"||
    localStorage.getItem("previousPage") == "modelhigh") {
    return 'slideRight'
    }
    else if(to.name == "model" ||
    to.name == "home" ||
    to.name == "collection" ||
    to.name == "exhibition" ||
    localStorage.getItem("previousPage") == "exhibition-id" ||
    localStorage.getItem("previousPage") == "product-id" ||
    localStorage.getItem("previousPage") == "model-id") {
      return "nothing"
    }
  },

  data() {
    return {
      isSpinning: false,
      isLeftTab: true,
      currentProducts: this.$store.getters.SAVED_PRODUCTS
    };
  },

  computed: {
    ...mapGetters([
      "IS_LOADING",
       "SAVED_PRODUCTS",
       "SAVED_TAB_FILTER"
      ]),
    hasProducts() {
      return this.$store.getters.SAVED_PRODUCTS.length > 0 ? true : false;
    },
    
    hasRecentProducts() {
      return this.recentProducts.length === 0 ? false : true;
    },

    recentProducts() {
      return JSON.parse(localStorage.recentProducts);
    },

    hasMoreData() {
      return this.$store.getters.HAS_MORE_DATA;
    }
  },
  async asyncData({ store, next }) {
    store.dispatch("setHasMoreData", false);
      await store.dispatch("getSavedProducts");
      if (store.getters.SAVED_PRODUCTS.length == 30) {
        store.dispatch("setHasMoreData", true);
      }
  },


  mounted() {
    this.$store.dispatch("setHeaderTitle", "찜");
      this.$store.dispatch("setLogo","noLogo");
  },

  created() {
    
    localStorage.removeItem("product");    
    localStorage.removeItem("model");
    localStorage.removeItem("backButton");

    if (localStorage.getItem("recentModelId") != 0) {
    const recentModelId = JSON.parse(localStorage.recentModelId);
    recentModelId.length = 0;
    localStorage.recentModelId = JSON.stringify(recentModelId);
    }
    else {

    }

    if (localStorage.getItem("recentProductId") != 0) {
    const recentProductId = JSON.parse(localStorage.recentProductId);
    recentProductId.length = 0;
    localStorage.recentProductId = JSON.stringify(recentProductId);
    }
    else {

    }

    this.$store.dispatch("setCurrentRoute", this.$route.path);
    if (process.browser) {
      window.addEventListener("scroll", this.handleScroll);
    }

    this.$amplitude.getInstance().logEvent("page view saved");
  },

  methods: {
    ...mapActions(["setHasMoreData"]),

    async handleScroll() {
      const notExactlyTheBottom = document.body.offsetHeight - 500;

      if (
        window.innerHeight + window.scrollY >= notExactlyTheBottom &&
        this.hasMoreData &&
        !this.isSpinning
      ) {
        this.isSpinning = true;
        await this.getMoreProducts();
      }
    },
    
    getRecentProducts() {
        this.recentProducts = JSON.parse(localStorage.recentProducts);
    },

    goToCollectionPage() {
      this.$router.push("/items");
    },

    getMoreProducts() {
      return new Promise(async (resolve, reject) => {
        try {
          if (this.hasMoreData) {
            await this.$store.dispatch(
              "setOffset",
              this.$store.getters.OFFSET + 30
            );
            const response = await await this.$store.dispatch(
              "addSavedProducts"
            );
            const products = response.result.itemList;
            if (products.length == 0) {
              this.hasMoreData = false;
              this.$store.dispatch("setHasMoreData", false);
            }
          }
          this.isSpinning = false;
          resolve();
        } catch (error) {
          this.isSpinning = false;
          reject(error);
        }
      });
    }
  },

  beforeRouteLeave(to, from, next) {
    if (process.browser) {
      window.removeEventListener("scroll", this.handleScroll);
    }
    this.$store.dispatch("setHasMoreData", true);
    next();
  }
};
</script>

<style lang="scss" scoped>
.saved-container {
  padding-bottom: 20%;
  height: 100%;
  min-height: 100vh;
  background-color: #fff;
}

.no-match {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20% 0;

  &__oops {
    color: $primary;
    font-size: 1.3em;
    font-weight: 600;
  }

  &__button {
    margin-top: 30px;
    padding: 10px 20px;
    font-size: 1em;
    border: 2px solid $grey;
    // background-color: $dark-grey;
    color: $grey;
    font-weight: 600;
    border-radius: 4px;
  }
}


.masonry-container {
  padding: 0 2% 20% 2%;
  width: 100%;
}

.masonry-item {
  margin: 0 1.5% 6% 1.5%;
  border: 0;
  font-size: 0.8em;
  width: 30.3%;
  font-size: 0.8em;
  transition: opacity 0.2s ease, box-shadow 0.2s ease;
  display: inline-block;
}

.more-button-container {
  width: 100%;
  display: flex;
  justify-content: center;
}

.more-button {
  padding: 7px 14px;
  border: 2px solid $grey;
  border-radius: 4px;
  font-size: 1em;
  font-weight: 600;
  color: $grey;
}

.spinner-continaer {
  padding-bottom: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
