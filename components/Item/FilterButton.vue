<template>
<div>
<div class="filter-container" v-if="!isbodytype">
  <button class="filter-button" @click="openCat" v-show="!isSearch"
    :class="{
       'filter-button__active': FIRST_CATEGORY != '000'
       }">
    <span>{{ catName }}</span>
  </button>
  <button class="filter-button" @click="openFilterSort"
    :class="{
       'filter-button__active': SORT_ORDER != 'de'
       }">
    <span>{{ sortOrder }}</span>
  </button>
    <button class="filter-button" @click="openFilterPrice"
        :class="{
       'filter-button__active': PRICE_RANGE != '0r100000' && PRICE_RANGE != '0r3999999'
       }">
    <span>{{ priceRange }}</span>
  </button>
</div>

<div class="filter-container" v-else>
  <div class="dotContainer">
      <button class="filter-button" @click="openFilterBodytype"
          :class="{
        'filter-button__active': FIT1 != ''
        }">
      <span>{{ fit1 }}</span>
    </button>
    <div class="redDot"></div>
  </div>
  <button class="filter-button" @click="openFilterSort"
    :class="{
       'filter-button__active': SORT_ORDER != 'de'
       }">
    <span>{{ sortOrder }}</span>
  </button>
    <button class="filter-button" @click="openFilterPrice"
        :class="{
       'filter-button__active': PRICE_RANGE != '0r100000' && PRICE_RANGE != '0r3999999'
       }">
    <span>{{ priceRange }}</span>
  </button>
</div>
</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {

data() {
  return{
  }
},

computed: {
  ...mapGetters([
    "PRICE_RANGE",
    "SORT_ORDER",
    "FIT1",
    "ACTIVE_SECOND_CATEGORY",
    "FIRST_CATEGORY",
    "ACTIVE_FIRST_CATEGORY",
    "SECOND_CATEGORY"
 ]),

 isSearch() {
   return this.$route.name.includes('search') ? true : false;
 },

 isbodytype(){
   return this.$route.name.includes('bodytype') ? true : false;
 },

 catName() {
   if(this.$store.getters.FIRST_CATEGORY == '000') {
     return '전체';
   }
   else if(this.$store.getters.ACTIVE_SECOND_CATEGORY.code == '000') {
     return this.$store.getters.ACTIVE_FIRST_CATEGORY.name;
   }
   else if(this.$store.getters.ACTIVE_SECOND_CATEGORY.name != '') {
     return this.$store.getters.ACTIVE_SECOND_CATEGORY.name;
   }
    else {
     return this.$store.getters.ACTIVE_FIRST_CATEGORY.name;
   }
 },

sortOrder() {
    if(this.$store.getters.SORT_ORDER == "de") {
      return "정렬";
    }
    else if(this.$store.getters.SORT_ORDER == "dr") {
      return "최신순";
    }
    else if(this.$store.getters.SORT_ORDER == "pl") {
        return "가격 낮은순";
    }
    else if(this.$store.getters.SORT_ORDER == "ph") {
        return "가격 높은순";
    }
},

 priceRange() {
      if(this.$store.getters.PRICE_RANGE == '0r3999999' ) {
        return "전체";
      }
      else if(this.$store.getters.PRICE_RANGE == '0r20000' ) {
        return "2만원 이하";
      }
      else if(this.$store.getters.PRICE_RANGE == '20000r50000') {
        return "2~5만원";
      }
      else if(this.$store.getters.PRICE_RANGE == '50000r100001') {
        return "5~10만원";
      }
      else if(this.$store.getters.PRICE_RANGE == '100000r4000000') {
        return "10만원 이상";
      }
      else {
        return "가격";
      }
  },

 fit1() {
      if(this.$store.getters.FIT1 == 'tt' ) {
        return "두꺼운 허벅지 커버 상품";
      }
      else if(this.$store.getters.FIT1 == 'tc') {
        return "두꺼운 종아리 커버 상품";
      }
      else if(this.$store.getters.FIT1 == 'tf') {
        return "두꺼운 팔뚝 커버 상품";
      }
      else if(this.$store.getters.FIT1 == 'fb') {
        return "뱃살 커버 상품";
      }
      else if(this.$store.getters.FIT1 == 'ns') {
        return "좁은 어깨 커버 상품";
      }
      else if(this.$store.getters.FIT1 == 'ws') {
        return "넓은 어깨 커버 상품";
      }
      else if(this.$store.getters.FIT1 == 'sn') {
        return "짧은 목 커버 상품";
      }
      else if(this.$store.getters.FIT1 == 'sl') {
        return "짧은 다리 커버 상품";
      }
      else if(this.$store.getters.FIT1 == 'np') {
        return "좁은 골반 커버 상품";
      }
      else if(this.$store.getters.FIT1 == 'bb') {
        return "큰 가슴 커버 상품";
      }
      else if(this.$store.getters.FIT1 == 'tb') {
        return "작은 가슴 커버 상품";
      }
      else if(this.$store.getters.FIT1 == 'cl') {
        return "굽은 다리 커버 상품";
      }
      else if(this.$store.getters.FIT1 == 'lf') {
        return "긴 얼굴 커버 상품";
      }
      else if(this.$store.getters.FIT1 == 'af') {
        return "각진 얼굴 커버 상품";
      }
      else if(this.$store.getters.FIT1 == 'rf') {
        return "동그란 얼굴 커버 상품";
      }
      else if(this.$store.getters.FIT1 == 'sb') {
        return "마른 몸매 커버 상품";
      }
      else {
        return "체형";
      }
  },

    price() {
      return [
        this.$store.getters.PRICE_RANGE.substring(
          0,
          this.$store.getters.PRICE_RANGE.indexOf("r")
        ),
        this.$store.getters.PRICE_RANGE.substring(
          this.$store.getters.PRICE_RANGE.indexOf("r") + 1,
          this.$store.getters.PRICE_RANGE.length
        )
      ];
    }
  },

  created() {
    const priceRange = this.$store.getters.PRICE_RANGE;
    const minimumPrice = priceRange.substring(0, priceRange.indexOf("r"));
    const maximumPrice = priceRange.substring(
      priceRange.indexOf("r") + 1,
      priceRange.length
    );

    this.price[0] = minimumPrice;
    this.price[1] = maximumPrice;
  },

  methods: {
    ...mapActions(["openBottomSheet"]),

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

    openCat() {
      event.preventDefault();
      event.stopPropagation();
      this.$store.dispatch("openCatSheet");
    },

    openFilterPrice(event) {
      if(this.$store.getters.ITEM_FIRST_FILTER == "myHeight") {
        this.$amplitude
        .getInstance()
        .logEvent("click filters", { clickedFilters: "가격", itemsTitle: "내키의상품" });
      }
      else if(this.$store.getters.ITEM_FIRST_FILTER == "allItem") {
        this.$amplitude
        .getInstance()
        .logEvent("click filters", { clickedFilters: "가격", itemsTitle: "모든상품" });
      }
      else {
        this.$amplitude
        .getInstance()
        .logEvent("click filters", { clickedFilters: "가격", itemsTitle: "팔로우한모델상품" });
      }
      event.preventDefault();
      event.stopPropagation();
      this.$store.dispatch("openBottomSheet");
    },

    openFilterSort(event) {
      if(this.$store.getters.ITEM_FIRST_FILTER == "myHeight") {
        this.$amplitude
        .getInstance()
        .logEvent("click filters", { clickedFilters: "정렬", itemsTitle: "내키의상품" });
      }
      else if(this.$store.getters.ITEM_FIRST_FILTER == "allItem") {
        this.$amplitude
        .getInstance()
        .logEvent("click filters", { clickedFilters: "정렬", itemsTitle: "모든상품" });
      }
      else {
        this.$amplitude
        .getInstance()
        .logEvent("click filters", { clickedFilters: "정렬", itemsTitle: "팔로우한모델상품" });
      }
      event.preventDefault();
      event.stopPropagation();
      this.$store.dispatch("openBottomSheet");
    },

    openFilterBodytype(event) {
      if(this.$store.getters.ITEM_FIRST_FILTER == "myHeight") {
        this.$amplitude
        .getInstance()
        .logEvent("click filters", { clickedFilters: "체형", itemsTitle: "내키의상품" });
      }
      else if(this.$store.getters.ITEM_FIRST_FILTER == "allItem") {
        this.$amplitude
        .getInstance()
        .logEvent("click filters", { clickedFilters: "체형", itemsTitle: "모든상품" });
      }
      else {
        this.$amplitude
        .getInstance()
        .logEvent("click filters", { clickedFilters: "체형", itemsTitle: "팔로우한모델상품" });
      }
      event.preventDefault();
      event.stopPropagation();
      this.$store.dispatch("openBottomSheet");
    },

  }
};
</script>

<style lang="scss" scoped>
.dotContainer{
  display: contents;
}

.redDot{
  border-radius: 50%;
  background-color: $primary;
  width:8px;
  height:8px;
  position: relative;
  z-index: 2;
  right:5%;
  margin-right: -5px;
}

.filter-container{
  display: flex;
}
.filter-button {
  padding: 5px 15px;
  border: 1px solid #ececec;
  background-color: #ececec;
  border-radius: 30px;
  color: #999;
  font-size: 0.8em;
  margin:0 4px;
  font-weight: 800;
  white-space: pre;

  &__active{
    background-color: #000;
    color:#fff;
    border: 1px solid #000;
  }
}
</style>
