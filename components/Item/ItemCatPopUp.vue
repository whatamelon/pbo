<template>
<div>
    <div class="cat-bottom-backdrop"
    v-show="SHOW_CAT_SHEET"
    @click="closeCatSheet"></div>
  <div
    class="cat-bottom-sheet"
    :class="{ 
      'cat-bottom-sheet--show': SHOW_CAT_SHEET,
      'cat-bottom-sheet--hide': !SHOW_CAT_SHEET
    }"
  >
  <div class="catfilter-topSpace">
    <i class="fas fa-times fliterOut" @click="closeCatSheet"></i>
    </div>

  <div class="catfilter-container">
    <div class="catfilter">
      <h5 class="catfilterName">카테고리</h5>

      <div class="catbutton-container">
        <button
          v-for="category in categories"
          :key="category.code"
          class="catbutton"
          :class="{
            'catbutton--active': ACTIVE_FIRST_CATEGORY.code === category.code,
            'catbutton--disable': getCode.indexOf(category.code) == -1
          }"
          @click="setFirstCat(category)"
        >
          {{ category.name }}
        </button>
      </div>
    </div>

    <div class="catfilter2">
      <div class="catbutton-container">
          <button
          v-for="category in SECOND_CATEGORY"
          :key="category.code"
          class="catbutton"
          :class="{
            'catbutton--active': ACTIVE_SECOND_CATEGORY.code === category.code,
            'catbutton--disable': getSecCode.indexOf(category.code) == -1
          }"
          @click="setSecondCat(category)"
        >
          {{ category.name }}
        </button>
      </div>
    </div>


    <div class="catbottom-container">
      <button class="catresetButton" @click="reset">
        <i class="fas fa-redo-alt catresetIcon"></i>
      </button>
      <button class="catapplyButton" @click="applyChanges">
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

      getCode: [],

      getSecCode: [],

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
      "SHOW_CAT_SHEET",
      "FIRST_CATEGORY",
      "SECOND_CATEGORY",
      "ACTIVE_FIRST_CATEGORY",
      "ACTIVE_SECOND_CATEGORY",
      "Q_CAT_LIST"
    ]),

  },

  created() {
    this.checkCat();
  },

  methods: {
    ...mapActions([
      "openCatSheet",
      "closeCatSheet"
    ]),

    checkCat() { 
      const modiCat = this.$store.getters.Q_CAT_LIST
      const newArray = [];

      this.categories.forEach(category => {
          modiCat.forEach(modiCat => {
            if (category.code == modiCat.cat1) {
              newArray.push(category);
            }
        });
      });
      console.log(newArray)
      const modiArray = newArray.filter((item, index) => newArray.indexOf(item) == index);
      console.log(modiArray)

      modiArray.unshift({ code: "000", name: "전체" });
      this.getCode = modiArray.map(x=>x.code);
      console.log(this.getCode);
    },

    checkCat2(){
      const modiCat2 = this.$store.getters.Q_CAT_LIST
      const newArray2 = [];
        modiCat2.forEach(t => {
          if(t.cat1 == this.$store.getters.ACTIVE_FIRST_CATEGORY.code) {
            newArray2.push(t.cat2);
        }
      });
      newArray2.unshift("000");
      this.getSecCode = newArray2;
      console.log(this.getSecCode)
    },

    async setFirstCat(i) {
      this.getSecCode = [];
      if(this.getCode.indexOf(i.code) == -1) {
        console.log("선택할 수 없음");
      }
      else {
       await this.$store.dispatch("setFirstCategory", i.code);   
       await this.$store.dispatch("setActiveFirstCategory", i);
        await this.$store.dispatch("resetOffset");
        await this.$store.dispatch("setPageNumber", 1);
        switch(i.code) {
            case "000":
                await this.$store.dispatch("setSecondCategory", this.all);
                await this.$store.dispatch("setActiveSecondCategory", this.all[0]);
            break;
            case "001":
                await this.$store.dispatch("setSecondCategory", this.outer);
                await this.$store.dispatch("setActiveSecondCategory", this.outer[0]);
            break;
            case "002":
                await this.$store.dispatch("setSecondCategory", this.upper);
                await this.$store.dispatch("setActiveSecondCategory", this.upper[0]);
            break;
            case "003":
                await this.$store.dispatch("setSecondCategory", this.pants);
                await this.$store.dispatch("setActiveSecondCategory", this.pants[0]);
            break;
            case "004":
                await this.$store.dispatch("setSecondCategory", this.skirt);
                await this.$store.dispatch("setActiveSecondCategory", this.skirt[0]);
            break;
            case "005":
                await this.$store.dispatch("setSecondCategory", this.dress);
                await this.$store.dispatch("setActiveSecondCategory", this.dress[0]);
            break;
            case "006":
                await this.$store.dispatch("setSecondCategory", this.shoes);
                await this.$store.dispatch("setActiveSecondCategory", this.shoes[0]);
            break;
            case "007":
                await this.$store.dispatch("setSecondCategory", this.bag);
                await this.$store.dispatch("setActiveSecondCategory", this.bag[0]);
            break;
            case "008":
                await this.$store.dispatch("setSecondCategory", this.accesories);
                await this.$store.dispatch("setActiveSecondCategory", this.accesories[0]);
            break;
            case "009":
                await this.$store.dispatch("setSecondCategory", this.jewelry);
                await this.$store.dispatch("setActiveSecondCategory", this.jewelry[0]);
            break;
            case "010":
                await this.$store.dispatch("setSecondCategory", this.beachwear);
                await this.$store.dispatch("setActiveSecondCategory", this.beachwear[0]);
            break;
            case "011":
                await this.$store.dispatch("setSecondCategory", this.lingerie);
                await this.$store.dispatch("setActiveSecondCategory", this.lingerie[0]);
            break;
        }
      }
      
    this.checkCat2();
    },

    async setSecondCat(category) {
      if(this.getSecCode.indexOf(category.code) == -1) {

      }
      else {
        await this.$store.dispatch("resetOffset");
        await this.$store.dispatch("setPageNumber", 1);
        await this.$store.dispatch("setActiveSecondCategory", category);
        // await this.$store.dispatch("getAllProducts");
      }
    },

    async reset() {
      await this.$store.dispatch("setFirstCategory", "000");   
      await this.$store.dispatch("setActiveFirstCategory", []);
      await this.$store.dispatch("setSecondCategory", this.all);
      await this.$store.dispatch("setActiveSecondCategory", this.all[0]);
      await this.$store.dispatch("getAllProducts");
    },

    closeCatSheet() {
      this.$store.dispatch("closeCatSheet");
    },

    async applyChanges() {
      this.$store.dispatch("closeCatSheet");
      await this.$store.dispatch("getAllProducts");
    }
  }
};
</script>

<style lang="scss" scoped>
.fliterOut{
  position: relative;
  right:7%;
  top:35%;
  font-size: 1.5em;
  float: right;
  padding:3%;
}

.noShow {
  display: none;
}

.catfilter-topSpace{
  width:100%;
  height:40px;
}

.catfilter-container {
  -webkit-overflow-scrolling: touch;
  overflow-y: scroll !important;
}

.cat-bottom-backdrop{
    background-color: rgba(0,0,0,0.5);
    bottom:0;
    width: 100%;
    z-index: 104;
    height:100%;
    position: fixed;
}

.cat-bottom-sheet {
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
  min-height: 630px;

  &--show {
    bottom: 0;
  }
  
  &--show__bodytypePage {
    bottom: 0;
    height:calc(48%);
    min-height: 400px;
  }

  &--hide {
    bottom: -1000px;
  }
}

.catfilter {
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

.catfilter {
  padding: 6%;
  border-bottom: 1px solid #ececec;
  min-height: 140px;

  &2{
    padding: 6%;
    border-bottom: 0px;
    min-height: 140px;
  }

  &Name{
    font-size: 1.2em;
    font-weight: 800;
  }
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

.catbutton-container {
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

.catbutton {
  margin:0 4% 3% 0;
  padding: 7px 10px;
  border: 1.5px solid #000;
  border-radius: 6px;
  font-size: 0.8em;
  font-weight: 800;
  word-break: keep-all;
  word-wrap: break-word;
  width: 46%;

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

  &--disable{
    background-color: #ececec;
    color: $white;
  border: 1.5px solid #ececec;
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
.catbutton{
  margin:0 1.5% 0 0;
  padding: 5px 8px;
  font-size: 0.7em;
}
}

.catbottom-container {
  width: 100%;
  max-width: 500px;
  padding: 3%;
  position: absolute;
  display: flex;
  justify-content: space-between;
  z-index: 6;
  bottom:0;
  background-color: #fff;
  min-height: 72px;
  border-top: 1px solid #ececec;
}

.catapplyButton {
  padding: 4% 0;
  border-radius: 5px;
  background-color: $primary;
  color: $white;
  width:83%;
  font-weight: 600
}

.catresetButton{
    padding: 10px 16px;
    background-color: #BDBDBD;
    color:#444;
  border-radius: 5px;
}
.catresetIcon{
  font-weight: 800;
  font-size: 1.2em;
}
</style>
