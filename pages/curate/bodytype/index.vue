<template>
    <main class="cp-main">

        <img class="cp-mainImage" :src="IMAGE_URL+Q_INFO.imgItemFile" />
        <div class="ci-coverUp">
            <div class="ci-coverUpLeft">
                <img class="ci-modelPic" :src="IMAGE_URL+Q_INFO.imgFaceFile"/>
            </div>
            <div class="ci-coverUpCenter">
                <span class="ci-curated">Curated by</span>
                <span class="ci-curatedName">{{ Q_INFO.quserName }}</span>
            </div>
            <div class="ci-coverUpRight">
                <span class="ci-update"><i class="material-icons updateIcon">update</i> 상품 업데이트 <span >{{ modiTime(Q_INFO.itemupDate) }}</span></span>
            </div>
        </div>

        <div class="ci-info">
            <span class="ci-title">{{ Q_INFO.title }}</span>
            <span class="ci-subTitle">{{ Q_INFO.body }}</span>
        </div>


        <div id="curateScroll"></div>

    <div class="buttons-container" ref="filterContainer" id="buttonContainer">
        <div class="buttons-subcontainer">
          <FilterButton></FilterButton>
        </div>
      </div>

    <div class="tc-container">상품수 <span class="tc-number">{{ separateThousand(TOTAL_CNT) }}</span>개</div>

    <div>
        <div v-if="isSorry" class="sorry-container">
          <img
            class="sorry__image"
            src="/app/sorrybutIloveyou.png"
            alt="/app/sorrybutIloveyou.png"
          />
          <h4 class="sorry__message">해당 상품이 없어요ㅠㅠ</h4>
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
            :qurate="Q_INFO"
            class="masonry-product"
          ></AppProduct>
        </div>
      </div>

    <ItemPagination></ItemPagination>
    <ItemFilterPopUp></ItemFilterPopUp>
    <ItemPageSheet></ItemPageSheet>

    </main>
</template>
<script>
import FilterButton from "@/components/Item/FilterButton";
import ItemFilterPopUp from "@/components/Item/ItemFilterPopUp";
import ItemCatPopUp from "@/components/Item/ItemCatPopUp";
import ItemPagination from "@/components/Item/ItemPagination";
import ItemPageSheet from "@/components/Item/ItemPageSheet";
import AppProduct from "@/components/App/AppProduct";
import { mapGetters } from "vuex";
export default {
    
  components: {
    AppProduct,
    FilterButton,
    ItemPagination,
    ItemPageSheet,
    ItemFilterPopUp,
    ItemCatPopUp
  },

  transition (to) {
    if (localStorage.getItem("backButton")){
    return 'slideLeft'
    }
    else if (to.name == "model-id" ||
              to.name == "product-id" ||
              to.name == "curate-id" ||
              to.name == "curate-height" ||
              to.name == "curate-follow" ||
              to.name == "curate-bodytype" ||
              to.name == "saved") {
    return 'slideRight'
    }
    else if(to.name == "model" ||
    to.name == "home" ||
    to.name == "exhibition" ||
    localStorage.getItem("previousPage") == "product-id" ||
    localStorage.getItem("previousPage") == "model-id"
    ) {
      return "nothing"
    }
  },

  computed: {
    ...mapGetters([
      "ALL_PRODUCTS",
      "TOTAL_CNT",
      "Q_INFO",
      "Q_MODEL_LIST",
      "IMAGE_URL"
    ]),

    isSorry() {
      return this.$store.getters.ALL_PRODUCTS.length == 0 ? true : false;
    },
  },
  
    data() {
        return{
        }
    },

    async asyncData({ store }) {
        const height = store.getters.USER_HEIGHT;
        if(localStorage.getItem("previousPage")=="product-id"||
        localStorage.getItem("previousPage")=="model-id"){
        }
        else{
            await store.dispatch("getQurateInfo", store.getters.Q_INFO.qitemId);
            store.dispatch("setSecondCategory", [{ code: "000", name: "전체" }]);
            store.dispatch("setFirstCategory", '000');
            store.dispatch("setActiveSecondCategory", { code: "000", name: "전체" });
            store.dispatch("setActiveFirstCategory", { code: "000", name: "전체" });
            store.dispatch("setOffset", 0);
            store.dispatch("setPageNumber", 1);
            store.dispatch("getAllProducts");
        }


    },

    created() {
        this.$store.dispatch("setHeaderTitle", this.$store.getters.Q_INFO.title);
        this.$store.dispatch("setLogo","noLogo");

        window.addEventListener("scroll",this.filterSticky);
    },

    methods: {
       async filterSticky() {
        const buttonContainer = document.getElementById('buttonContainer');
        const curateIN = document.getElementById('curateScroll').offsetTop;
        if(window.pageYOffset > curateIN) {
            buttonContainer.classList.add("sticky");
        }
        else {
            buttonContainer.classList.remove("sticky");
        }
        },
        
    modiTime(time) {
        var thisTime = new Date();
        if (window.AppType == "android" || window.AppType == "android3") {
            var timeFix = (new Date(time)).getTime();
        }
        if(window.AppType == "ios2" || window.AppType == "ios3"){
            var time2 = time.slice(0,10);
            var time3 = time.slice(-10,-2);
            var time6 = time2+"T"+time3+"Z";
            var timeFix = (new Date(time6)).getTime();
        }
        else {
            var timeFix = (new Date(time)).getTime();
        }
        const thisMonth = thisTime.getMonth() + 1;
        const thisDay = thisTime.getDate();
        const thisHour = thisTime.getHours();

        const qMonth = time.substring(5,7);
        const qDay = time.substring(8,10);
        const qHour = time.substring(11,13);
        var timeFix = (new Date(time)).getTime()

        if(thisMonth != qMonth) {
            var dateGap = Math.ceil((thisTime.getTime()-timeFix)/(1000*3600*24));
            time = dateGap;
            return time + "일전";
        } else if(thisDay != qDay) {
            return thisDay - qDay + "일전";
        } 
        else {
            var timeGap = Number(thisHour)- Number(qHour);
            time = timeGap;
            if(time == 0) {
                return time +1 +"시간전";
            }
            else{
                return time + "시간전";
            }
        }

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
    },
    
  beforeRouteLeave(to, from, next) {
    this.$store.dispatch("setSecondCategory", [{ code: "000", name: "전체" }]);
    this.$store.dispatch("setFirstCategory", '000');
    this.$store.dispatch("setActiveSecondCategory", { code: "000", name: "전체" });
    this.$store.dispatch("setActiveFirstCategory", { code: "000", name: "전체" });
    window.removeEventListener("scroll", this.filterSticky);
    next();
  }
    
}
</script>
<style lang="scss" scoped>
.sticky{
    position:fixed;
    width:100%;
    top:50px;
}

.cp{
    &-main{
        width:100%;
        background-color: #fff;
    }

    &-mainImage{
        width:100%;
        height:auto;
        background-color : #ececec;
    }
}

.ci{
    &-coverUp{
        padding: 5% 4% 5% 13px;
        display: flex;
    }

    &-coverUpLeft{
        margin:auto 0;
    }

    &-modelPic{
        border-radius: 50%;
        width: 40px;
        height: 40px;
    }

    &-coverUpCenter{
        display: grid;
        margin-left: 2%;
    }

    &-curated{
        font-size: 0.8em;
        font-weight: 500;
        color:#888;
    }

    &-curatedName{
        font-size: 0.9em;
        font-weight: 800;
        color:#000;
        margin-top: 2px;
    }

    &-coverUpRight{
        position: relative;
        right:0%;
        margin-left: auto;
        margin-top: auto;
    }

    &-update{
        font-size: 0.9em;
        font-weight: 800;
        color:#888;
    }

    &-info{
        padding:3% 4% 5% 13px; 
        width:100%;
        display: grid;
        border-bottom: 7px solid #ececec;
    }

    &-title{
        font-size: 1.4em;
        font-weight: 800;
        margin-bottom: 3%;
    }

    &-subTitle{
        font-size: 1em;
        font-weight:500;
        color:#888;
        line-height: 1.7;
        word-break: break-all;
    }
}

.updateIcon{
    font-size: 1.2em;
    font-weight: 800;
    color:#888;
    position: relative;
    top:2px;
}

.cpm{
    &-models{
        padding: 5% 0 5% 13px;
        border-bottom: 10px solid #ececec;
    }

    &-title{
        font-size: 1em;
        font-weight: 500;
    }

    &-length{
        font-size: 1em;
        font-weight: 800;
    }

    &-container{
        overflow: -moz-scrollbars-none;
        width : 104% !important;
        display:flex;
        overflow-x: auto;
        overflow-y: hidden;
        margin:4.5% 0 0 -13px;
        padding-left: 13px;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none;
        &::-webkit-scrollbar {
            display : none;
            width:0px;
        }
    }

    &-model{
        display: grid;
        margin-right: 4%;
    }

    &-modelPic{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-bottom: 7px;
    }

    &-modelName{
        font-size: 0.8em;
        font-weight: 500;
        color:#888;
        text-align: center;
    }
}

.buttons-container {
  padding: 3% 0 3% 2%;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  z-index: 5;
  background-color: #fff;
  width: 100%;
}

.buttons-subcontainer {
  display: flex;
  align-items: center;
}

.tc{
    &-container{
        margin: 1% 0 1% 13px;
        font-size: 0.8em;
        font-weight: 500;
        color:#888;
    }
    &-number{
        font-size: 0.85em;
        font-weight: 800;
        color:#000;
    }
}

.masonry-container {
  padding: 10px 2% 35% 2%;
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