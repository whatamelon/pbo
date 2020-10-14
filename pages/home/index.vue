<template>

    <main class="home-container">

   

  <GoUpButton></GoUpButton>

    <div class="infoN__container" v-if="this.$store.getters.IS_INFO">
      <p class="infoN__title">아직 프로필을 등록 하지 않으셨군요? 🤭<br/>프로필 등록하고 픽키 활동을 해보세요!</p>

      <div class="infoN__goRegister" @click="goRegister">프로필 등록하러 가기!</div>
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
      "IMAGE_URL",
    ]),

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