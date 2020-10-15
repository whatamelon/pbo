<template>

    <main class="home-container">

   

  <GoUpButton></GoUpButton>

    <div class="infoN__container" v-if="this.$store.getters.IS_INFO == 'n'">
      <p class="infoN__title">아직 프로필을 등록 하지 않으셨군요? 🤭<br/>프로필 등록하고 픽키 활동을 해보세요!</p>

      <div class="infoN__goRegister" @click="goRegister">프로필 등록하러 가기!</div>
    </div>
    <div v-else>
      <p class="infoN__title" style="margin-top:30px">반갑습니다! {{ this.$store.getters.USER_GRP1.nameReal }}님 👋</p>
      <p class="infoN__title">{{ this.hello }}</p>
    </div>

    </main>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import HomeList from "@/components/Home/HomeList";
import HomeCard from "@/components/Home/HomeCard";
import GoUpButton from "@/components/App/GoUpButton";

export default {
    components: {
      HomeCard,
      HomeList,
      GoUpButton
    },

  transition (to) {
    if (localStorage.getItem("backButton")){
    return 'slideLeft'
    }
    else if (
              to.name == "curate-id" ||
              to.name == "curate-height" ||
              to.name == "curate-follow" ||
              to.name == "curate-bodytype" ||
              to.name == "saved") {
    return 'slideRight'
    }
    else if(to.name == "model" ||
    to.name == "home" ||
    to.name == "mypage" ||
    localStorage.getItem("previousPage") == "product-id" ||
    localStorage.getItem("previousPage") == "model-id") {
      return "nothing"
    }
  },

  data() {
    return {
    };
  },

   computed: {
    ...mapGetters([
      "IS_INFO",
      "USER_NICKNAME",
      "USER_GRP1",
      "USER_GRP2",
      "USER_GRP3",
      "USER_GRP4",
      "USER_GRP5",
      "IMAGE_URL",
    ]),

    hello() {
      var d = new Date().getHours();
      var hello = '';

      if(6<= d && d < 11) {
        hello = "좋은 아침이에요!"
      } else if(11 <= d && d < 14) {
        hello = "맛있는 점심 드세요!"
      } else if(14 <= d && d < 18) {
        hello = "즐거운 오후되세요!"
      } else if(18 <= d && d < 22) {
        hello = "맛있는 저녁 드세요!"
      } else if(22 <= d && d < 1) {
        hello = "좋은 밤 되세요!"
      } else if(1 <= d&& d  < 6) {
        hello = "은은한 새벽이에요!"
      } else {
        hello = ""
      }
        return hello;
      }

  },

    
  async asyncData({ store, to }) {

    await store.dispatch("getUserInfo");
    store.dispatch("setCurrentRoute", "/home");

  },

created() {
},

  beforeMount() {
  },

mounted() {
    this.$store.dispatch("setLogo","hasLogo");
    localStorage.removeItem("backButton");
},

methods:{

  goRegister() {
        this.$router.push('/register');
  }

},

  beforeRouteLeave(to, from, next) {
    localStorage.setItem("routerStack",this.$route.path);
    next();
  }
}
</script>

<style lang="scss" scoped>
.home-container{
  margin-bottom:100px;
  height:100%;
}

.infoN {
  &__container{
    margin-top: 20%;
  }
  &__title{
    text-align: center;
    margin: 0 auto;
    font-size: 1.2em;
    font-weight: 700;
  }

  &__goRegister{
    margin: 50px auto 0 auto;
    background-color: #fff;
    color: #000;
    border: 2px solid #000;
    border-radius: 5px;
    font-size: 1.1em;
    font-weight: 600;
    text-align: center;
    width: 300px;
    height:50px;
    padding: 10px;
  }
}


</style>