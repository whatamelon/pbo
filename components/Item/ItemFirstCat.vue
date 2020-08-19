<template>
  <div class="category-container__first"
        ref="categoryContainerFirst"
        :class="{ 'plusPadding': ITEM_FIRST_FILTER == 'allItem' }"
  >
    <div
      ref="horizontalCategory"
      class="category-container"
      id="category__container__top"
    >
      <label
        v-for="category in activeCategories"
        :key="category.code"
        class="category"
        :class="{ 'category--active': FIRST_CATEGORY == category.code }"
        @click="changeCategory(category)"
        id="category__label"
      >
        <span>{{ category.name }}</span>
      </label>
    </div>
    <div class="category-space"
    ref="categorySpace"
    id="categorySpace"></div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      activeCategories: [],
      blah: [],
      categories: [
        { code: "000", name: "전체" },
        { code: "001", name: "아우터" },
        { code: "002", name: "상의" },
        { code: "005", name: "드레스" },
        { code: "004", name: "스커트" },
        { code: "003", name: "바지" },
        { code: "006", name: "신발" },
        { code: "007", name: "가방" },
        { code: "008", name: "잡화" },
        { code: "009", name: "쥬얼리" },
        { code: "010", name: "비치웨어" },
        { code: "011", name: "란제리/파자마" }
      ],

      all: [{ code: "000", name: "전체" }],

      outer: [
        {
          code: "000",
          name: "전체"
        },
        {
          code: "001",
          name: "코트"
        },
        {
          code: "002",
          name: "자켓"
        },
        {
          code: "003",
          name: "점퍼"
        },
        {
          code: "004",
          name: "가디건"
        }
      ],

      upper: [
        {
          code: "000",
          name: "전체"
        },
        {
          code: "001",
          name: "티셔츠"
        },
        {
          code: "002",
          name: "니트"
        },
        {
          code: "003",
          name: "블라우스/셔츠"
        },
        {
          code: "004",
          name: "후드/맨투맨"
        },
        {
          code: "005",
          name: "나시"
        }
      ],

      pants: [
        {
          code: "000",
          name: "전체"
        },
        {
          code: "001",
          name: "청바지"
        },
        {
          code: "002",
          name: "슬랙스"
        },
        {
          code: "003",
          name: "숏팬츠"
        },
        {
          code: "004",
          name: "레깅스"
        },
        {
          code: "005",
          name: "롱팬츠"
        }
      ],

      skirt: [{ code: "000", name: "전체" }],

      dress: [{ code: "000", name: "전체" }],

      shoes: [{ code: "000", name: "전체" }],

      bag: [{ code: "000", name: "전체" }],

      accesories: [{ code: "000", name: "전체" }],

      jewelry: [
        { code: "000", name: "전체" },
        {
          code: "001",
          name: "귀걸이"
        },
        {
          code: "002",
          name: "목걸이/팔찌"
        },
        {
          code: "003",
          name: "반지"
        },
        {
          code: "004",
          name: "기타"
        }
      ],

      beachwear: [{ code: "000", name: "전체" }],

      lingerie: [{ code: "000", name: "전체" }]
    };
  },

  computed: {
    ...mapGetters([
      "FIRST_CATEGORY", 
      "ACTIVE_FIRST_CATEGORY",
      "ITEM_FIRST_FILTER"
      ])
  },

  created() {
    if (process.browser && this.$route.name.includes("model")) {
      window.addEventListener("scroll", this.handleSticky);
    }

      this.activeCategories = this.categories;

  },
  methods: {
    ...mapActions(["setModelFirstCategory"]),

     async changeCategory(category) {
        this.$store.dispatch("setOffset", 0); 
       this.$store.dispatch("setPageNumber", 1);
       this.$store.dispatch("setFirstCategory", category.code);   
       this.$store.dispatch("setActiveFirstCategory", category.code);
      this.$store.dispatch("resetFilter");


switch (category.code) {
                case "000":
                  if(this.$store.getters.ITEM_FIRST_FILTER == "myHeight") {
                    this.$amplitude
                    .getInstance()
                    .logEvent("click categories", { categoriesName: "전체", itemsTitle: "내키의상품" });
                  }
                  else if(this.$store.getters.ITEM_FIRST_FILTER == "allItem") {
                    this.$amplitude
                    .getInstance()
                    .logEvent("click categories", { categoriesName: "전체", itemsTitle: "전체상품" });
                  }
                  else if(this.$store.getters.ITEM_FIRST_FILTER == "followModel") {
                    this.$amplitude
                    .getInstance()
                    .logEvent("click categories", { categoriesName: "전체", itemsTitle: "팔로우한모델상품" });
                  }
                    await this.$store.dispatch("setSecondCategory", this.all);
                    await this.$store.dispatch("setActiveSecondCategory", this.all[0]);
                break;
                case "001":
                  if(this.$store.getters.ITEM_FIRST_FILTER == "myHeight") {
                    this.$amplitude
                    .getInstance()
                    .logEvent("click categories", { categoriesName: "아우터", itemsTitle: "내키의상품" });
                  }
                  else if(this.$store.getters.ITEM_FIRST_FILTER == "allItem") {
                    this.$amplitude
                    .getInstance()
                    .logEvent("click categories", { categoriesName: "아우터", itemsTitle: "전체상품" });
                  }
                  else if(this.$store.getters.ITEM_FIRST_FILTER == "followModel") {
                    this.$amplitude
                    .getInstance()
                    .logEvent("click categories", { categoriesName: "아우터", itemsTitle: "팔로우한모델상품" });
                  }
                    await this.$store.dispatch("setSecondCategory", this.outer);
                    await this.$store.dispatch("setActiveSecondCategory", this.outer[0]);
                break;
                case "002":
                  if(this.$store.getters.ITEM_FIRST_FILTER == "myHeight") {
                    this.$amplitude
                    .getInstance()
                    .logEvent("click categories", { categoriesName: "상의", itemsTitle: "내키의상품" });
                  }
                  else if(this.$store.getters.ITEM_FIRST_FILTER == "allItem") {
                    this.$amplitude
                    .getInstance()
                    .logEvent("click categories", { categoriesName: "상의", itemsTitle: "전체상품" });
                  }
                  else if(this.$store.getters.ITEM_FIRST_FILTER == "followModel") {
                    this.$amplitude
                    .getInstance()
                    .logEvent("click categories", { categoriesName: "상의", itemsTitle: "팔로우한모델상품" });
                  }
                    this.$store.dispatch("setSecondCategory", this.upper);
                    this.$store.dispatch("setActiveSecondCategory", this.upper[0]);
                break;
                case "003":
                  if(this.$store.getters.ITEM_FIRST_FILTER == "myHeight") {
                    this.$amplitude
                    .getInstance()
                    .logEvent("click categories", { categoriesName: "바지", itemsTitle: "내키의상품" });
                  }
                  else if(this.$store.getters.ITEM_FIRST_FILTER == "allItem") {
                    this.$amplitude
                    .getInstance()
                    .logEvent("click categories", { categoriesName: "바지", itemsTitle: "전체상품" });
                  }
                  else if(this.$store.getters.ITEM_FIRST_FILTER == "followModel") {
                    this.$amplitude
                    .getInstance()
                    .logEvent("click categories", { categoriesName: "바지", itemsTitle: "팔로우한모델상품" });
                  }
                    this.$store.dispatch("setSecondCategory", this.pants);
                    this.$store.dispatch("setActiveSecondCategory", this.pants[0]);
                break;
                case "004":
                  if(this.$store.getters.ITEM_FIRST_FILTER == "myHeight") {
                    this.$amplitude
                    .getInstance()
                    .logEvent("click categories", { categoriesName: "스커트", itemsTitle: "내키의상품" });
                  }
                  else if(this.$store.getters.ITEM_FIRST_FILTER == "allItem") {
                    this.$amplitude
                    .getInstance()
                    .logEvent("click categories", { categoriesName: "스커트", itemsTitle: "전체상품" });
                  }
                  else if(this.$store.getters.ITEM_FIRST_FILTER == "followModel") {
                    this.$amplitude
                    .getInstance()
                    .logEvent("click categories", { categoriesName: "스커트", itemsTitle: "팔로우한모델상품" });
                  }
                    this.$store.dispatch("setSecondCategory", this.skirt);
                    this.$store.dispatch("setActiveSecondCategory", this.skirt[0]);
                break;
                case "005":
                  if(this.$store.getters.ITEM_FIRST_FILTER == "myHeight") {
                    this.$amplitude
                    .getInstance()
                    .logEvent("click categories", { categoriesName: "드레스", itemsTitle: "내키의상품" });
                  }
                  else if(this.$store.getters.ITEM_FIRST_FILTER == "allItem") {
                    this.$amplitude
                    .getInstance()
                    .logEvent("click categories", { categoriesName: "드레스", itemsTitle: "전체상품" });
                  }
                  else if(this.$store.getters.ITEM_FIRST_FILTER == "followModel") {
                    this.$amplitude
                    .getInstance()
                    .logEvent("click categories", { categoriesName: "드레스", itemsTitle: "팔로우한모델상품" });
                  }
                    this.$store.dispatch("setSecondCategory", this.dress);
                    this.$store.dispatch("setActiveSecondCategory", this.dress[0]);
                break;
                case "006":
                  if(this.$store.getters.ITEM_FIRST_FILTER == "myHeight") {
                    this.$amplitude
                    .getInstance()
                    .logEvent("click categories", { categoriesName: "신발", itemsTitle: "내키의상품" });
                  }
                  else if(this.$store.getters.ITEM_FIRST_FILTER == "allItem") {
                    this.$amplitude
                    .getInstance()
                    .logEvent("click categories", { categoriesName: "신발", itemsTitle: "전체상품" });
                  }
                  else if(this.$store.getters.ITEM_FIRST_FILTER == "followModel") {
                    this.$amplitude
                    .getInstance()
                    .logEvent("click categories", { categoriesName: "신발", itemsTitle: "팔로우한모델상품" });
                  }
                    this.$store.dispatch("setSecondCategory", this.shoes);
                    this.$store.dispatch("setActiveSecondCategory", this.shoes[0]);
                break;
                case "007":
                  if(this.$store.getters.ITEM_FIRST_FILTER == "myHeight") {
                    this.$amplitude
                    .getInstance()
                    .logEvent("click categories", { categoriesName: "가방", itemsTitle: "내키의상품" });
                  }
                  else if(this.$store.getters.ITEM_FIRST_FILTER == "allItem") {
                    this.$amplitude
                    .getInstance()
                    .logEvent("click categories", { categoriesName: "가방", itemsTitle: "전체상품" });
                  }
                  else if(this.$store.getters.ITEM_FIRST_FILTER == "followModel") {
                    this.$amplitude
                    .getInstance()
                    .logEvent("click categories", { categoriesName: "가방", itemsTitle: "팔로우한모델상품" });
                  }
                    this.$store.dispatch("setSecondCategory", this.bag);
                    this.$store.dispatch("setActiveSecondCategory", this.bag[0]);
                break;
                case "008":
                  if(this.$store.getters.ITEM_FIRST_FILTER == "myHeight") {
                    this.$amplitude
                    .getInstance()
                    .logEvent("click categories", { categoriesName: "잡화", itemsTitle: "내키의상품" });
                  }
                  else if(this.$store.getters.ITEM_FIRST_FILTER == "allItem") {
                    this.$amplitude
                    .getInstance()
                    .logEvent("click categories", { categoriesName: "잡화", itemsTitle: "전체상품" });
                  }
                  else if(this.$store.getters.ITEM_FIRST_FILTER == "followModel") {
                    this.$amplitude
                    .getInstance()
                    .logEvent("click categories", { categoriesName: "잡화", itemsTitle: "팔로우한모델상품" });
                  }
                    this.$store.dispatch("setSecondCategory", this.accesories);
                    this.$store.dispatch("setActiveSecondCategory", this.accesories[0]);
                break;
                case "009":
                  if(this.$store.getters.ITEM_FIRST_FILTER == "myHeight") {
                    this.$amplitude
                    .getInstance()
                    .logEvent("click categories", { categoriesName: "쥬얼리", itemsTitle: "내키의상품" });
                  }
                  else if(this.$store.getters.ITEM_FIRST_FILTER == "allItem") {
                    this.$amplitude
                    .getInstance()
                    .logEvent("click categories", { categoriesName: "쥬얼리", itemsTitle: "전체상품" });
                  }
                  else if(this.$store.getters.ITEM_FIRST_FILTER == "followModel") {
                    this.$amplitude
                    .getInstance()
                    .logEvent("click categories", { categoriesName: "쥬얼리", itemsTitle: "팔로우한모델상품" });
                  }
                    this.$store.dispatch("setSecondCategory", this.jewelry);
                    this.$store.dispatch("setActiveSecondCategory", this.jewelry[0]);
                break;
                case "010":
                  if(this.$store.getters.ITEM_FIRST_FILTER == "myHeight") {
                    this.$amplitude
                    .getInstance()
                    .logEvent("click categories", { categoriesName: "비치웨어", itemsTitle: "내키의상품" });
                  }
                  else if(this.$store.getters.ITEM_FIRST_FILTER == "allItem") {
                    this.$amplitude
                    .getInstance()
                    .logEvent("click categories", { categoriesName: "비치웨어", itemsTitle: "전체상품" });
                  }
                  else if(this.$store.getters.ITEM_FIRST_FILTER == "followModel") {
                    this.$amplitude
                    .getInstance()
                    .logEvent("click categories", { categoriesName: "비치웨어", itemsTitle: "팔로우한모델상품" });
                  }
                    this.$store.dispatch("setSecondCategory", this.beachwear);
                    this.$store.dispatch("setActiveSecondCategory", this.beachwear[0]);
                break;
                case "011":
                  if(this.$store.getters.ITEM_FIRST_FILTER == "myHeight") {
                    this.$amplitude
                    .getInstance()
                    .logEvent("click categories", { categoriesName: "란제리&파자마", itemsTitle: "내키의상품" });
                  }
                  else if(this.$store.getters.ITEM_FIRST_FILTER == "allItem") {
                    this.$amplitude
                    .getInstance()
                    .logEvent("click categories", { categoriesName: "란제리&파자마", itemsTitle: "전체상품" });
                  }
                  else if(this.$store.getters.ITEM_FIRST_FILTER == "followModel") {
                    this.$amplitude
                    .getInstance()
                    .logEvent("click categories", { categoriesName: "란제리&파자마", itemsTitle: "팔로우한모델상품" });
                  }
                    this.$store.dispatch("setSecondCategory", this.lingerie);
                    this.$store.dispatch("setActiveSecondCategory", this.lingerie[0]);
                break;
            }


            this.$store.dispatch("getAllProducts");
    }
  }
};
</script>

<style lang="scss" scoped>
.plusPadding{
  padding-top:10px;
}
.category-container {
  z-index: 3;
  margin: 0;
  padding: 0;
  border-bottom: 1px solid $light-grey;
  white-space: nowrap;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: -ms-autohiding-scrollbar;
  position: absolute;
  left: 4px;
  right: auto;
  width: 100%;
  max-width: 500px;
  text-align: left;
  background-color: $white;

  &::-webkit-scrollbar {
    display: none;
  }
}

.fix {
  position: fixed;
  z-index: 6;
}

.fix-model {
  position: fixed;
  z-index: 6;
}

.category {
  margin: 0 12px;
  padding: 10px 0;
  border: none;
  width: auto;
  font-size: 0.85em;
  font-weight: 400;
  background: transparent;
  color: $grey;
  box-shadow: none;
  z-index: 2;

  &:visited,
  &:hover,
  &:active,
  &:focus {
    color: #000;
    font-weight: 800;
  }

  &--active {
    color: #000;
    border-bottom: 2px solid #000;
    font-weight: 800;
  }
}

.category-space {
  height: 40px;
}
</style>
