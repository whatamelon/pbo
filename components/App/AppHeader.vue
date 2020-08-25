<template>
  <div>
    <b-nav class="app-header">
      <img class="logo" src="/p_red_logo.png" @click="goToHome" />
      <a v-bind:href="link">링크</a>
    </b-nav>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
        itemTitleArray:[
        {
            title: "followModel",
            text: "팔로우 모델 상품",
        },
        {
            title: "myHeight",
            text: "내 키의 상품",
        },
        {
            title: "allItem",
            text: "전체 상품",
        }
        ],
      link:"madeleine://picklingdev.com?pick=1",
    }
  },

  computed: {
    ...mapGetters([
      "HAS_LOGO",
      "SHOW_ITEM_FIRST_FILTER_SHEET",
      "ITEM_FIRST_FILTER",
      "FOLLOWING_MODELS"
      ]),

    title() {
      return this.$store.getters.HEADER_TITLE;
    },

    itemWatch() {
      return this.$store.getters.ITEM_FIRST_FILTER;
    }
  },

  created() {
      this.$store.dispatch("setItemFirstFilter", "followModel");
  },

  methods: {
    openSearch() {
      this.$router.push("/search");
    },

    goToSaved() {
      this.$amplitude.getInstance().logEvent("click heartList");
      this.$router.push("/saved");
    },

    goToHome() {
      this.$router.push("/home");
    },

    goToBackPage() {
        if (this.$route.name.includes('product')) {
        const thisProductId = JSON.parse(localStorage.getItem("recentProductId"));
        console.log(thisProductId.length)
       if (thisProductId.length == 1) {
                   console.log("프로덕트가 1개야~");
        const recentModelId = JSON.parse(localStorage.getItem("recentModelId"));
        const newSetModel = recentModelId[recentModelId.length -2];

        const recentProductId = JSON.parse(localStorage.getItem("recentProductId"));
        const newSetProduct = recentProductId[recentProductId.length -1];

        if (newSetModel == '' ||
        newSetModel == null) {
          console.log("어디냐");
        localStorage.setItem("backButton","1");
        this.$router.go(-1);
        }
        else {
          console.log("--------------------------------------------");
        this.$store.dispatch("setModel", newSetModel);
        localStorage.setItem("model", JSON.stringify(newSetModel));
        this.$store.dispatch("setProductInfo", newSetProduct);
        localStorage.setItem("product", JSON.stringify(newSetProduct));
      
        localStorage.setItem("backButton","1");
        
        this.$router.go(-1);
        }
       }

       else if (localStorage.getItem("recentProductId") != 0) {

          console.log("응안갔어~");
       const recentModelId = JSON.parse(localStorage.getItem("recentModelId"));
        const newSetModel = recentModelId[recentModelId.length -2];

        const recentProductId = JSON.parse(localStorage.getItem("recentProductId"));
        const newSetProduct = recentProductId[recentProductId.length -2];

        if (newSetModel == '' ||
        newSetModel == null) {
          console.log("어디냐");
        localStorage.setItem("backButton","1");
        this.$router.go(-1);
        }
        else {
          console.log("어디이이야~");
        this.$store.dispatch("setModel", newSetModel);
        localStorage.setItem("model", JSON.stringify(newSetModel));
        this.$store.dispatch("setProductInfo", newSetProduct);
        localStorage.setItem("product", JSON.stringify(newSetProduct));
      
        localStorage.setItem("backButton","1");
        
        this.$router.go(-1);
        }
       }
       else {
          console.log("설마여기를?");
       const recentModelId = JSON.parse(localStorage.getItem("recentModelId"));
        const newSetModel = recentModelId[recentModelId.length -2];

        this.$store.dispatch("setModel", newSetModel);
        localStorage.setItem("model", JSON.stringify(newSetModel));
      
        localStorage.setItem("backButton","1");

        this.$router.go(-1);
       }
      } 
      else {
          console.log("여기는아닐거고");
        localStorage.setItem("backButton","1");
          this.$router.go(-1);
      }
    },
  },

  beforeRouteEnter(to, from, next) {
    this.$store.dispatch("closeItemFirstFilterSheet");
    next();
  }
};
</script>

<style scoped lang="scss">
.redDot{
  border-radius: 50%;
  width:5px;
  height: 5px;
  background-color: $primary;
  position: relative;
  top:-7px;
  margin: 0 auto;
}

.item-titles{

    &--active{
      font-size: 1.3em;
      font-weight: 800;
      color:#000;
      letter-spacing: -1.5px;
      text-align: center;
      display: grid;
      margin:0 10px;
    }

    &--inActive{
      font-size: 1.3em;
      font-weight: 800;
      color:#999;
      letter-spacing: -1.5px;
      display: grid;
      position: relative;
      top: 6px;
      margin:0 10px;
      padding-top:1px;
    }
}
.app-header {
  padding: 8px 10px;
  background-color: $white;
  color: $white;
  position: fixed;
  overflow: hidden;
  height: 50px;
  width: 100%;
  box-shadow: none;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  transform: translate3d(0,0,0) !important;
  z-index: 103;
  box-shadow: 0 0px 10px rgba(0, 0, 0, 0.1);

  &-item{
    font-size: 1.5em;
    border:1.5px solid $primary;
    border-radius: 50%;
    margin: 3px 0 0 10px;
    background-color: $primary;
    color:#fff;
  }

  &-flex{
    display: flex;
  }

}

  .--rotate{
      animation : rotateArrow 0.5s both;
      
      @keyframes rotateArrow{
        from {
            transform: rotate( 0deg );
        }
        to {
            transform: rotate( -180deg );
        }
      }
    }

  .--back{
      animation : backArrow 0.5s both;
      @keyframes backArrow{
        from {
        transform: rotate( -180deg );
        }
        to {
            transform: rotate( 0deg );
        }
      }
  }

.search{
  color:#000;
  position: absolute;
  right:5%;
}

.saved{
  color:#000;
  position: absolute;
  right:5%;
  top:26%;
  font-size: 1.6em;
}

.saved2{
  color:#000;
  position: absolute;
  right:5%;
  top:26%;
  font-size: 1.6em;
}

.logo {
  width: 85px;
  height: auto;
  position: absolute;
  left:5%;
}

.app-header-no-logo {
  padding: 8px 10px;
  border-bottom: solid 1px $light-grey;
  background-color: $white;
  color: $black;
  position: fixed;
  overflow: hidden;
  height: 50px;
  width: 100%;
  max-width: 500px;
  box-shadow: none;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  z-index: 103;
  transform: translate3d(0,0,0);

  &-titles{
      padding: 25px 20px 12px 4px;
  border-bottom: solid 1px $light-grey;
  background-color: $white;
  color: $black;
  position: fixed;
  overflow: hidden;
  height: 60px;
  width: 100%;
  max-width: 500px;
  box-shadow: none;
  display: flex;
  z-index: 103;
    justify-content: flex-start;
    line-height: 0.8;
  }

  &__back {
    font-size: 1.5em;
    position: absolute;
    left: 5px;
    padding:8px;
  }

  &__title {
    margin: 0;
    padding: 0;
    font-weight: 600;
    font-size: 1.1em;
    width:140px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: center;
  }
  &__title2 {
    margin: 0;
    padding: 0;
    font-weight: 600;
    font-size: 1.1em;
    margin-top:5px;
    text-align: center;
  }
}
</style>
