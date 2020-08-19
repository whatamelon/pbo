<template>
    <main class="search-container">

        <SearchHeader></SearchHeader>

      <div v-if="!IS_SEARCH">
        <SearchTags></SearchTags>

      </div>
      
      <div v-else>
        <div class="buttons-container">
        <div class="buttons-subcontainer">
          <FilterButton></FilterButton>
        </div>
      </div>

        <div v-if="isSorry" class="sorry-container">
        <img
          class="sorry__image"
          src="/app/sorrybutIloveyou.png"
          alt="/app/sorrybutIloveyou.png"
        />
        <h4 class="sorry__message">{{ sorryMessage }}</h4>
      </div>

        <div
        v-else
        class="masonry-container"
        id="collectionContainer"
      >
        <AppProduct
          v-for="product in ALL_PRODUCTS"
          :key="product.itemId"
          :product="product"
          class="masonry-product"
        ></AppProduct>
        
      </div>

    <ItemPagination></ItemPagination>

    <ItemFilterPopUp ref="bottomSheet"></ItemFilterPopUp>
    <ItemPageSheet></ItemPageSheet>
      </div>


    </main>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import ItemFilterPopUp from "@/components/Item/ItemFilterPopUp";
import FilterButton from "@/components/Item/FilterButton";
import ItemPagination from "@/components/Item/ItemPagination";
import ItemPageSheet from "@/components/Item/ItemPageSheet";
import SearchHeader from "@/components/Search/SearchHeader";
import SearchTags from "@/components/Search/SearchTags";
import AppProduct from "@/components/App/AppProduct";
export default {
  layout: "noHeader",

  computed: {
    ...mapGetters([
      "IS_SEARCH",
      "SHOW_BOTTOM_SHEET",
      "ALL_PRODUCTS"
    ]),
    
    isSorry() {
      return this.$store.getters.ALL_PRODUCTS.length == 0 ? true : false;
    }
  },

  components:{
      SearchHeader,
      SearchTags,
    AppProduct,
    ItemFilterPopUp,
    FilterButton,
    ItemPagination,
    ItemPageSheet,
  },

  data() {
    return{
      sorryMessage:
        "검색결과가 없어요.ㅠㅠ",
    }
  },

  transition (to,from) {
    if (localStorage.getItem("backButton")){
    return 'slideLeft'
    }
    else if (to.name == "product-id") {
    return 'slideRight'
    }
    else if(to.name == "model" ||
    to.name == "myPage" ||
    localStorage.getItem("previousPage") == "exhibition-id" ||
    localStorage.getItem("previousPage") == "model-id") {
      return "nothing"
    }
  },
  
 async  asyncData({ store }) {
       function callbackAuthToken(token){
    window.AuthToken = token;
    localStorage.setItem("accessToken", token);
  }
   function callbackHeight(height){    
    window.Height = height;
        store.dispatch("setHeight", height);
        localStorage.setItem("height", height);
    }
    window.callbackAuthToken = callbackAuthToken;
    window.callbackHeight = callbackHeight;

     await store.dispatch("test");
    await store.dispatch("getPopularKeywords","10");
  },

  created() {    
    this.$store.dispatch("setQPageInfo", "");
    localStorage.removeItem("backButton");
    this.$amplitude.getInstance().logEvent("page view search");
  },

  mounted() {
    const headerSpace = document.getElementsByClassName("header-space")[0];
    headerSpace.style.display = "none";
  },
  
  beforeRouteLeave(to, from, next) {      
    if(to.name != "product-id") {
      this.$store.dispatch("resetOffset");
      this.$store.dispatch("resetFilter");
    this.$store.dispatch("setKeywordName", '');
    }
    next();
  }
}
</script>
<style lang="scss" scoped>

.search-container {
  background: $white;
  min-height: 800px;
  height: 100%;
  width:100%;
}

.buttons-container {
  padding: 3% 0 1% 2%;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.buttons-subcontainer {
  display: flex;
  align-items: center;
}

.masonry-container {
  padding: 10px 2% 40% 2%;
  width: 100%;
}

.masonry-product {
  margin: 0 1.5% 6% 1.5%;
  border: 0;
  font-size: 0.8em;
  width: 30.3%;
  font-size: 0.8em;
  transition: opacity 0.2s ease, box-shadow 0.2s ease;
  display: inline-block;
}

.block-scroll {
  overflow: hidden;
  overflow-y: scroll !important;
  width: 100%;
}

.spinner-continaer {
  padding-bottom: 100px;
  width: 100%;
  display: flex;
  justify-content: center;
}

.sorry-container {
  padding: 15% 5% 30% 5%;
  color: $grey;
  height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

.sorry {
  &__image {
    width: 200px;
  }

  &__message {
    width: 260px;
    margin: 10px 0;
    text-align: center;
    font-size: 1em;
  }
}
</style>