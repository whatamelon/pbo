<template>
<div>
    <div class="app-bottom-backdrop"
    v-show="SHOW_BOTTOM_SHEET"
    @click="closeBottomSheet"></div>
  <div
    class="app-bottom-sheet"
    :class="{
       'app-bottom-sheet--show__bodytypePage': SHOW_BOTTOM_SHEET && isbodytype,
      'app-bottom-sheet--show': SHOW_BOTTOM_SHEET && !isBodyTypePage,
      'app-bottom-sheet--hide': !SHOW_BOTTOM_SHEET
    }"
  >
  <div class="filter-topSpace">
    <i class="fas fa-times fliterOut" @click="closeBottomSheet"></i>
  </div>

  <div class="filter-container">
    <div class="sortfilter">
      <h5 class="sortfilter__name">정렬</h5>

      <div class="button-container">
        <button
          v-for="sortOrder in sortOrders"
          :key="sortOrder.sortOrder"
          class="button"
          :class="{
            'button--active': TEMPORARY_SORT_ORDER === sortOrder.sortOrder
          }"
          @click="setTemporarySortOrder(sortOrder.sortOrder)"
        >
          {{ sortOrder.name }}
        </button>
      </div>
    </div>

    <div class="pricefilter">
      <h5 class="sortfilter__name">가격</h5>
      
      <div class="button-container">
          <button
          v-for="priceRange in priceRanges"
          :key="priceRange.priceRange"
          class="button"
          :class="{
            'button--active': TEMPORARY_PRICE_RANGE === priceRange.priceRange
          }"
          @click="setTemporaryPriceRange(priceRange.priceRange)"
        >
          {{ priceRange.name }}
        </button>
      </div>
    </div>
    
    <div class="bodytypefilter" v-show="isbodytype">
      <h5 class="sortfilter__name">체형</h5>
      
      <div class="button-containerBodytype">
          <button
          v-for="fit1 in fit1s"
          :key="fit1.fit1"
          class="buttonBodyType"
          :class="{
            'buttonBodyType--active': TEMPORARY_FIT1 === fit1.fit1
          }"
          @click="setTemporaryFit1(fit1)"
        >
          {{ fit1.name }}
        </button>
      </div>
    </div>


    <div class="bottom-container">
      <button class="resetButton" @click="reset">
        <i class="fas fa-redo-alt resetIcon"></i>
      </button>
      <button class="applyButton" @click="applyChanges">
        <span>적용</span>
      </button>
    </div>
  </div>
  </div>
</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {

  data() {
    return {
      sortOrders: [
        { sortOrder: "dr", name: "최신순" },
        { sortOrder: "pl", name: "가격 낮은순" },
        { sortOrder: "ph", name: "가격 높은순" }
      ],
      priceRanges: [
        { priceRange: "0r3999999", name:"전체" },
        { priceRange: "0r20000", name:"2만원 이하" },
        { priceRange: "20000r50000", name:"2~5만원" },
        { priceRange: "50000r100001", name:"5~10만원" },
        { priceRange: "100000r4000000", name:"10만원 이상" }
      ]
    };
  },

  computed: {
    ...mapGetters([
      "SHOW_BOTTOM_SHEET",
      "USER_HEIGHT",
      "ACTIVE_FILTER",
      "TEMPORARY_SORT_ORDER",
      "TEMPORARY_PRICE_RANGE",
      "PRICE_RANGE",
      "FIT1",
      "TEMPORARY_FIT1",
    ]),
    
    fit1s() {
      var firstCat = this.$store.getters.FIRST_CATEGORY;
    switch (firstCat) {
      case "000":
        return this.fit1s = [
        { fit1: "ws", name:"어깨가 넓어요." },
        { fit1: "tc", name:"종아리가 굵어요." },
        { fit1: "fb", name:"배가 좀 나왔어요." },
        { fit1: "tt", name:"허벅지가 좀 있는 편이에요." },
        { fit1: "ns", name:"어깨가 좁아요." },
        { fit1: "tf", name:"팔뚝에 살이 많아요." },
        { fit1: "sn", name:"목이 짧은 편이에요." },
        { fit1: "sl", name:"다리가 짧아요." },
        { fit1: "np", name:"골반이 좁아요." },
        { fit1: "bb", name:"가슴이 커요." },
        { fit1: "tb", name:"가슴이 작아요." },
        { fit1: "cl", name:"다리가 굽었어요." },
        { fit1: "lf", name:"얼굴이 길어요." },
        { fit1: "af", name:"얼굴이 각졌어요." },
        { fit1: "rf", name:"얼굴이 동그래요." },
        { fit1: "sb", name:"마른체형이에요." }
      ]
      break;
      case "001":
        return this.fit1s = [
        { fit1: "ws", name:"어깨가 넓어요." },
        { fit1: "fb", name:"배가 좀 나왔어요." },
        { fit1: "ns", name:"어깨가 좁아요." },
        { fit1: "tf", name:"팔뚝에 살이 많아요." },
        { fit1: "sn", name:"목이 짧은 편이에요." },
        { fit1: "sl", name:"다리가 짧아요." },
        { fit1: "bb", name:"가슴이 커요." },
        { fit1: "tb", name:"가슴이 작아요." },
        { fit1: "af", name:"얼굴이 각졌어요." },
        { fit1: "rf", name:"얼굴이 동그래요." },
        { fit1: "sb", name:"마른체형이에요." }
      ]
      break;
      case "002":
        return this.fit1s = [
        { fit1: "ws", name:"어깨가 넓어요." },
        { fit1: "fb", name:"배가 좀 나왔어요." },
        { fit1: "ns", name:"어깨가 좁아요." },
        { fit1: "tf", name:"팔뚝에 살이 많아요." },
        { fit1: "sn", name:"목이 짧은 편이에요." },
        { fit1: "sl", name:"다리가 짧아요." },
        { fit1: "bb", name:"가슴이 커요." },
        { fit1: "tb", name:"가슴이 작아요." },
        { fit1: "lf", name:"얼굴이 길어요." },
        { fit1: "af", name:"얼굴이 각졌어요." },
        { fit1: "rf", name:"얼굴이 동그래요." },
        { fit1: "sb", name:"마른체형이에요." }
      ]
      break;
      case "003":
        return this.fit1s = [
        { fit1: "tc", name:"종아리가 굵어요." },
        { fit1: "tt", name:"허벅지가 좀 있는 편이에요." },
        { fit1: "sl", name:"다리가 짧아요." },
        { fit1: "np", name:"골반이 좁아요." },
        { fit1: "cl", name:"다리가 굽었어요." }
      ]
      break;
      case "004":
        return this.fit1s = [
        { fit1: "tc", name:"종아리가 굵어요." },
        { fit1: "fb", name:"배가 좀 나왔어요." },
        { fit1: "tt", name:"허벅지가 좀 있는 편이에요." },
        { fit1: "sl", name:"다리가 짧아요." },
        { fit1: "np", name:"골반이 좁아요." },
        { fit1: "cl", name:"다리가 굽었어요." }
      ]
      break;
      case "005":
        return this.fit1s = [
        { fit1: "ws", name:"어깨가 넓어요." },
        { fit1: "tc", name:"종아리가 굵어요." },
        { fit1: "fb", name:"배가 좀 나왔어요." },
        { fit1: "tt", name:"허벅지가 좀 있는 편이에요." },
        { fit1: "ns", name:"어깨가 좁아요." },
        { fit1: "tf", name:"팔뚝에 살이 많아요." },
        { fit1: "sn", name:"목이 짧은 편이에요." },
        { fit1: "sl", name:"다리가 짧아요." },
        { fit1: "np", name:"골반이 좁아요." },
        { fit1: "bb", name:"가슴이 커요." },
        { fit1: "tb", name:"가슴이 작아요." },
        { fit1: "cl", name:"다리가 굽었어요." },
        { fit1: "lf", name:"얼굴이 길어요." },
        { fit1: "af", name:"얼굴이 각졌어요." },
        { fit1: "rf", name:"얼굴이 동그래요." },
        { fit1: "sb", name:"마른체형이에요." }
      ]
      break;
      case "006":
        return this.fit1s = [
        { fit1: "cl", name:"다리가 굽었어요." }
      ]
      break;
      case "008":
        return this.fit1s = [
        { fit1: "ws", name:"어깨가 넓어요." }
      ]
      break;
      case "009":
        return this.fit1s = [
        { fit1: "tb", name:"가슴이 작아요." },
        { fit1: "af", name:"얼굴이 각졌어요." },
        { fit1: "rf", name:"얼굴이 동그래요." }
      ]
      break;
    }
    },
    
      filterPrice() {
          return this.$store.getters.PRICE_RANGE != '0r4000000' ? "가격" : '';
      },

      filterSort() {
          return this.$store.getters.SORT_ORDER != 'de' ? "정렬" : '';
      },

      filterFit() {
          return this.$store.getters.FIT1 != '' ? "체형" : '';
      },

  isbodytype(){
    return this.$route.name.includes('bodytype') ? true : false;
  },
  },

  methods: {
    ...mapActions([
      "openBottomSheet"
    ]),

    async setTemporarySortOrder(i) {
      if(i == this.$store.getters.TEMPORARY_SORT_ORDER) {
        await this.$store.dispatch("setTemporarySortOrder" ,"de");
      }
      else if(i != this.$store.getters.TEMPORARY_SORT_ORDER) {
        await this.$store.dispatch("setTemporarySortOrder" ,i);
      }
    },
    
    async setTemporaryPriceRange(i) {
      if(i == this.$store.getters.TEMPORARY_PRICE_RANGE) {
        await this.$store.dispatch("setTemporaryPriceRange" ,"0r100000");
      }
      else if(i != this.$store.getters.TEMPORARY_PRICE_RANGE) {
        await this.$store.dispatch("setTemporaryPriceRange" ,i);
      }
    },
    
    async setTemporaryFit1(i) {
      this.$amplitude.getInstance().logEvent("click worry", { worryName: i.name});
      if(i.fit== this.$store.getters.TEMPORARY_FIT1) {
        await this.$store.dispatch("setTemporaryFit1" ,"");
      }
      else if(i.fit != this.$store.getters.TEMPORARY_FIT1) {
        await this.$store.dispatch("setTemporaryFit1" ,i.fit1);
      }
    },


    heightRangeCalculator(range = 0, height = 0) {
      const min = parseInt(height) - range;
      const max = parseInt(height) + range;
      const heightRange = min + "r" + max;

      return heightRange;
    },

    async reset() {
        await this.$store.dispatch("resetOffset");
        await this.$store.dispatch("setPageNumber", 1);
      if(this.$route.name.includes("bodytype")) {
        await this.$store.dispatch("resetBodyTypeFilter");
      }
      else {
        await this.$store.dispatch("resetFilter");
          if(this.$route.name == "search") {
                const result = this.$store.dispatch("getAllProducts");
                if(result.length != 0) {
                    this.$amplitude.getInstance().logEvent("success search");
                  }
                  else {
                    this.$amplitude.getInstance().logEvent("fail search");
                  }
          }
        else {
            this.$store.dispatch("getAllProducts");
        }
      }
     
    },

    closeBottomSheet() {
      this.$store.dispatch("closeBottomSheet");
    },

    async applyChanges() {
      await this.$store.dispatch("resetOffset");
      await this.$store.dispatch("setPageNumber", 1);
      await this.$store.dispatch(
        "setSortOrder",
        this.$store.getters.TEMPORARY_SORT_ORDER
      );
      await this.$store.dispatch(
        "setPriceRange",
        this.$store.getters.TEMPORARY_PRICE_RANGE
      );
      await this.$store.dispatch(
        "setFit1",
        this.$store.getters.TEMPORARY_FIT1
      );
      
      await this.$store.dispatch("getAllProducts");
    if(this.$route.name == 'items') {
      this.$amplitude.getInstance().logEvent("click apply", {
        clickedPage: "상품보기", 
        applyedFilters: '필터이름(' + this.filterPrice +','+ this.filterSort+','+ this.filterFit+')'
      });
    }
    else {
      this.$amplitude.getInstance().logEvent("click apply", {
        clickedPage: "상품보기", 
        applyedFilters: '필터이름(' + this.filterPrice +','+ this.filterSort+','+ this.filterFit+')'
      });
    }
      await this.$store.dispatch("closeBottomSheet");
    }
  }
};
</script>

<style lang="scss" scoped>
.fliterOut{
  position: relative;
  right:7%;
  top:20%;
  font-size: 1.5em;
  float: right;
  padding:3%;
}

.noShow {
  display: none;
}

.filter-topSpace{
  width:100%;
  height:55px;
}

.filter-container {
  -webkit-overflow-scrolling: touch;
  overflow-y: scroll !important;
}

.app-bottom-backdrop{
    background-color: rgba(0,0,0,0.5);
    bottom:0;
    width: 100%;
    z-index: 104;
    height:100%;
    position: fixed;
}

.app-bottom-sheet {
  width: 100%;
  max-width: 500px;
  position: absolute;
  display: flex;
  flex-direction: column;
  background-color: $white;
  z-index: 104;
  transition: 0.4s;
  position: fixed;
  width: 100%;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  height:calc(95%);

  &--show {
    bottom: 0;
    height:420px;
  }
  
  &--show__bodytypePage {
    bottom: 0;
    height:calc(85%);
    min-height: 450px;
  }

  &--hide {
    bottom: -1000px;
  }
}

.sortfilter {
  padding: 0 6% 4% 6%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: flex-start;
  border-bottom: 1px solid #ececec;
  min-height: 135px;

  &__name {
    margin: 0 0 4% 0;
    font-size: 1.2em;
    font-weight: 800;
  }
}

.pricefilter {
  padding: 6%;
  border-bottom: 1px solid #ececec;
  min-height: 140px;
}

.bodytypefilter {
  padding: 6% 6% 8% 6%;
  min-height: 493px;
}

.header {
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;

  &__title {
    margin: 0;
    text-align: center;
    font-size: 1em;
    font-weight: 700;
    letter-spacing: -1px;
  }
}

.button-container {
  padding-top: 2%;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  min-height: 40px;

  &Bodytype {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  }
}

.button {
  margin:0 2% 3% 0;
  padding: 7px 10px;
  border: 1.5px solid #000;
  border-radius: 6px;
  font-size: 0.8em;
  font-weight: 800;
  word-break: keep-all;
  word-wrap: break-word;
  width:31%;

 &BodyType {
    margin: 2% 1%;
    padding: 7px 10px;
    border: 1.5px solid #000;
    border-radius: 6px;
    font-size: 0.8em;
    font-weight: 800;
    height:36px;
    width:48%;
 }

  &--active {
    background-color: #000;
    color: $white;
  }

  &BodyType--active {
    background-color: #000;
    color: $white;
  }

  &--full {
    width: 100%;
  }
}

@media all and (max-width : 330px){
.button{
  margin:0 1.5% 0 0;
  padding: 5px 8px;
  font-size: 0.7em;
}
}

.bottom-container {
  width: 100%;
  max-width: 500px;
  padding: 3%;
  position: sticky;
  display: flex;
  justify-content: space-between;
  z-index: 6;
  bottom:0;
  background-color: #fff;
  min-height: 72px;
  border-top: 1px solid #ececec;
}

.applyButton {
  padding: 4% 0;
  border-radius: 5px;
  background-color: $primary;
  color: $white;
  width:83%;
  font-weight: 600
}

.resetButton{
    padding: 10px 16px;
    background-color: #BDBDBD;
    color:#444;
  border-radius: 5px;
}
.resetIcon{
  font-weight: 800;
  font-size: 1.2em;
}
</style>
