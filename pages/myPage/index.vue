<template>
<transition>
  <main class="my-page-container">

    <HeightEditModal :title="'내 키를 입력해주세요.'" />

    <b-alert
      class="alert"
      :show="dismissCountDown"
      variant="light"
      @dismissed="dismissCountDown = 0"
      @dismiss-count-down="countDownChanged"
    >
      {{ alertMessage }}
    </b-alert>

    <div class="logged-in">
      <h1 class="logged-in__title">{{ USER_EMAIL }}</h1>
    </div>

    <div class="my-info">
      <h3 class="my-info__height">
        키
      </h3>
      <button class="my-info__button" @click="openModal">
        <span class="material-icons my-info__icon">
          edit
        </span>
        <span>
          {{ USER_HEIGHT }}
        </span>
      </button>
    </div>

    <div class="options-container">
      <div class="option" @click="clickFollowModels">
        내가 팔로우한 모델
      </div>
      <div class="option" @click="clickSaved">
        찜
      </div>
      <!-- <div class="option" @click="clickRecentProduct">
        최근 본 상품
      </div> -->
      <div v-if="USER_SNSTYPE == 'local'" class="option" @click="clickChangePassword">
        비밀번호 변경
      </div>
      <div class="optionDivide" @click="clickContactUs">
        이용 문의
      </div>
      <div class="option" @click="clickTerms">
        이용 약관
      </div>
      <div class="option" @click="clickPrivacy">
        개인 정보 처리 방침
      </div>
      <div class="option" @click="clickRegisterStore">
        모델 등록 문의
      </div>
      <div class="optionDivide">
        <span>알림 설정</span>
        <v-switch v-model="alertSwitch" @change="loging" color="red" class="switch"></v-switch>
      </div>
      <div class="option" @click="logOut">
        로그아웃
      </div>
    </div>
    
        <HomeFooter></HomeFooter>
  </main>
</transition>
</template>

<script>
import InputModal from "@/components/Modal/InputModal";
import HomeFooter from "@/components/Home/HomeFooter";

import { mapGetters, mapActions } from "vuex";

export default {
  head() {
    return {
      script: [
        {
          src: "https://connect.facebook.net/en_US/sdk.js",
          defer: true
        },
        {
          src: "/js/google-login.js"
        }
      ]
    };
  },
  transition (to) {
    if (localStorage.getItem("backButton")){
    return 'slideLeft'
    }
    else if (to.name == "recentproduct" ||
              to.name == "privacy" ||
              to.name == "saved" ||
              to.name == "terms" ||
              to.name == "follow" ||
              to.name == "contact" ||
              to.name == "changepassword") {
    return 'slideRight'
    }
    else if(to.name == "model" ||
    to.name == "home" ||
    to.name == "myPage" ||
    localStorage.getItem("previousPage") == "product-id" ||
    localStorage.getItem("previousPage") == "model-id") {
      return "nothing"
    }
  },

  components: {
      HomeFooter,
    HeightEditModal: InputModal,
  },

  data() {
    return {
      alertSwitch: true,
      alertMessage:"",
      dismissSecs: 1.5,
      dismissCountDown: 0,
    };
  },

  computed: {
    ...mapGetters([
    "USER_HEIGHT", 
    "USER_EMAIL",
    "USER_SNSTYPE",
    "USER_PUSH"
    ])
  },

  async asyncData({ store, next }) {

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
    await store.dispatch("setUserInfo");
    await store.dispatch("setFollowingModels");
    await store.dispatch("getSavedProducts");
  },

  created() {
    const user_id = JSON.stringify(this.$store.getters.USER_ID);
    if(user_id != null || user_id != '') {
      this.$amplitude.getInstance().setUserId(user_id);
      console.log(user_id)
    }
    const userFollowings = {
      followingModels: this.$store.getters.FOLLOWING_MODELS.length
    };
    const userSavedproducts = {
      savedProducts: this.$store.getters.SAVED_PRODUCTS.length
    };
    this.$amplitude.getInstance().setUserProperties(userFollowings);
    this.$amplitude.getInstance().setUserProperties(userSavedproducts);

    localStorage.removeItem("backButton");

        const recentModelId = JSON.parse(localStorage.recentModelId);
        recentModelId.length = 0;
        localStorage.recentModelId = JSON.stringify(recentModelId);

         const recentProductId = JSON.parse(localStorage.recentProductId);
        recentProductId.length = 0;
        localStorage.recentProductId = JSON.stringify(recentProductId);

    this.$amplitude.getInstance().logEvent("page view mypage");

    this.$store.dispatch("setCurrentRoute", this.$route.path);
  },

  beforeMount() {
    if(localStorage.getItem("previousPage")=="search") {
        this.$store.dispatch("notSearching");
    }
    else if(localStorage.getItem("previousPage")=="items") {
      this.$store.dispatch("resetFilter");
    }
  },

  mounted() {

      if(this.$store.getters.USER_PUSH == "y"){
        this.alertSwitch = true; 
      }
      if(this.$store.getters.USER_PUSH == "n"){
        this.alertSwitch = false; 
      }

      this.$store.dispatch("setLogo","hasLogo");
  },

  methods: {
    ...mapActions(["openModal"]),

    loging(){
          if (this.alertSwitch == true) {
            this.alertMessage = "알림이 켜졌습니다.";
            this.showAlert();
            this.$store.dispatch("setPushFlag", "y");
          } 
          if (this.alertSwitch == false) {
            this.alertMessage = "알림이 꺼졌습니다.";
            this.showAlert();
            this.$store.dispatch("setPushFlag", "n");
          }
    },

    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },

    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },

    clickFollowModels() {
      this.$router.push("/follow");
    },

    clickSaved() {
      this.$router.push("/saved");
    },

    clickContactUs() {
      this.$router.push("/contact");
    },

    clickRecentProduct() {
      this.$router.push("/recentproduct");
    },

    clickPrivacy() {
      this.$router.push("/privacy");
    },

    clickTerms() {
      this.$router.push("/terms");
    },

    clickChangePassword() {
      this.$router.push("/changepassword");
    },

    clickRegisterStore() {
      window.open(
        "https://docs.google.com/forms/d/e/1FAIpQLScYAJi1qkBJZRFbs0zOachwXMJQNCQ2aiFqLk-KRDbryaJ-aA/viewform?usp=sf_link"
      );
    },

    logOut() {
      this.$store.dispatch("logout");
    }
  },

  beforeRouteLeave(to, from, next) {
    localStorage.setItem("routerStack",this.$route.path);
    next();
  }
};
</script>

<style lang="scss" scoped>
.switch{
  position: relative;
  right:-70%;
  top:0px;
}

.my-page-container {
  background-color: $white;
  height: 100%;
  min-height: 100vh;
}

.not-logged-in {
  padding: 30px 0 10px 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  text-align: center;

  &__title {
    margin: 10px 0;
    font-size: 1.6em;
    font-weight: 600;
  }

  &__subtitle {
    margin: 10px 0;
    font-size: 0.8em;
    color: $grey;
  }

  &__button {
    margin: 10px;
    padding: 15px 25px;
    border-radius: 4px;
    background-color: $primary;
    color: $white;
    font-weight: 600;
    font-size: 1.1em;
  }
}

.logged-in {
  padding: 50px 30px 30px 30px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  text-align: center;

  &__title {
    margin: 10px 0;
    font-size: 1.2em;
    font-weight: 600;
  }
}

.my-info {
  padding: 20px;
  width: 100%;
  height: 62px;
  display: flex;
  align-items: baseline;
  align-content: center;
  justify-content: space-between;

  &__height {
    font-size: 1em;
  }

  &__icon {
    margin-right: 5px;
    font-size: 1.2em;
  }

  &__button {
    padding: 5px 15px;
    border: 1px solid $grey;
    border-radius: 4px;
    font-size: 1em;
    font-weight: 600;

    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
  }
}

.options-container {
  width: 100%;
}

.option {
  padding: 20px;
  height: 62px;
  border-top: 1px solid $light-grey;
  width: 100%;
}

.optionDivide {
  padding: 20px;
  height: 70px;
  border-top: 10px solid $light-grey;
  width: 100%;
  display:flex;
}

.myPageBottom{
  width: 100%;
  height:100px;
  background-color: #ececec;
}

.alert {
  color: #ffffff;
  text-align: center;
  margin: 0;
  padding: 10px 0;
  position: fixed;
  top: 50%;
  width: 250px;
  font-size: 1em;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 5;
  border-radius: 10px;
  background-color: #000000;
  border-color: #000000;
}
</style>
