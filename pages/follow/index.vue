<template>
<transition>
  <main class="model-container">

    <div
      v-if=" FOLLOWING_MODELS.length === 0"
      class="model-follow-no"
    >
    <img src="/app/oops.png" class="oops"/>
      <span class="model-follow-no__text1">팔로우한 모델이 없어요!</span>
      <span class="model-follow-no__text2">나에게 꼭 맞는 모델을 팔로우 해보세요.</span>
    </div>

        <div v-else
        class="model-follow-yes">
          <span class="model-follow-length">{{ FOLLOWING_MODELS.length }} 명 팔로우중</span>
        <div
          v-for="model in FOLLOWING_MODELS"
          :key="model.modelId"
          class="model-follow-container"
           @click="toDetailPage(model)"
        >
            <img
             class="model-follow-image"
             :src="IMAGE_URL + model.imgFaceFile"/>
          <div class="model-follow-info">
            <div class="model-follow-up">
              <span class="model-follow-name">{{ model.name }}</span>
            </div>
            <div class="model-follow-down">
              <span class="model-follow-height">{{ model.height }}cm</span>
              <span class="model-follow-shop">{{ model.shopList[0].name }}</span>
            </div>
          </div>
          <button class="model-follow-cancel" @click.stop="cancelFollow(model)">팔로우 취소</button>
          
        </div>
        </div>
        
          <button class="follow-button" @click="goToFollow">
            {{ follow_message }}
          </button>
  </main>
</transition>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  transition (to, from, name) { 
    if (localStorage.getItem("backButton")){
    return 'slideLeft'
    }
    else if (localStorage.getItem("previousPage") == "mypage") {
    return 'slideRight'
    }
    else if(to.name == "model" ||
    to.name == "home" ||
    to.name == "collection" ||
    to.name == "exhibition" ||
    localStorage.getItem("previousPage") == "exhibition-id" ||
    localStorage.getItem("previousPage") == "product-id" ||
    localStorage.getItem("previousPage") == "model-id") {
      return "nothing"
    }
  },

  data() {
    return{
      follow_message:"모델 팔로우 하러 가기"
    }
  },

  computed: {
    ...mapGetters([
      "IMAGE_URL",
      "FOLLOWING_MODELS"
    ])
  },

  async asyncData({ store, next, from }) {

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

    const params = {
      offset: 0,
      limit: 999
    };
    await store.dispatch("setFollowingModels");
    return {
      following_models : store.getters.FOLLOWING_MODELS
    };
  },

  created() {
    this.$store.dispatch("setCurrentRoute", "/myPage");
    setTimeout(() => {
      this.$store.dispatch("endLoading");
    }, 500);
  },

  mounted() {
    localStorage.removeItem("backButton");
    this.$store.dispatch("setHeaderTitle", "내가 팔로우한 모델");
      this.$store.dispatch("setLogo","noLogo");
  },

  methods: {

    goToFollow() {
      this.$router.push("/model");
    },

    isNew(updatedAt) {
      const timestampParsedUpdatedAt = this.parseTimestamp(updatedAt);
      const now = new Date().getTime();
      const week = 604800000;
      // const twoDays = 172800000;
      const timePassed = now - timestampParsedUpdatedAt;
      const isNew = timePassed <= week ? true : false;

      return isNew;
    },

    toDetailPage(model) {
      this.$amplitude
        .getInstance()
        .logEvent("click model-profile", { modelId: model.modelId , clickedModelPage: "팔로잉모델" });

      this.$store.dispatch("setModel", model);

      const recentModelId = JSON.parse(localStorage.recentModelId);
      recentModelId.push(model);
      localStorage.recentModelId = JSON.stringify(recentModelId);
      
      this.$router.push("/model/" + model.modelId);
    },

    async cancelFollow(model) {
      console.log("이거 누름?")
        await this.$store.dispatch("unfollowModel", model.modelId);
        await this.$store.dispatch("setFollowingModels");
    }
  },

   beforeRouteLeave(to, from, next) {
     if(to.name =="model-id") {

     }
     else {
      this.$store.dispatch("setLogo","hasLogo");
     }

     if(to.name == '' || to.name == null) {
       this.$router.push("/myPage");
        localStorage.setItem("backButton","1");
     }
     next();
  }
};
</script>

<style lang="scss" scoped>
.model-container{
  height:100%;
  min-height: 100vh;
  overflow-y:hidden;
  width:100%;
  max-width: 500px;
}

.oops{
  width:45%;
  height:auto;
  margin:10% auto;
}

.model-follow{
  &-no {
    text-align: center;
    font-size: 1.2em;
    font-weight: 800;
    margin:10% 0;
    display: grid;
  }

  &-no__text1{
    font-size: 1em;
    font-weight: 800;
    line-height: 2;
  }

  &-no__text2{
    font-size: 0.9em;
    font-weight: 500;
    line-height: 2;
  }

  &-yes{
    margin:6% 0 6% 0;
  }

  &-length{
    padding: 0 3.5%;
    font-size: 1.1em;
    font-weight:800;
  }

  &-container{
    border-bottom: 1px solid #ececec;
    display: flex;
    padding:4% 0 4% 3.5%;
    position: relative;
    &:active{
      background-color: #ececec;
    }
  }

  &-info {
    margin-left:4%;
    padding: 2% 0;
    display: grid;
  }

  &-image{
    border-radius: 50%;
    width: 45px;
    height: 45px;
    margin-top:1.4%;
  }

  &-down{
    display: flex;
    margin-top:4%;
  }

  &-height{
    font-size: 0.9em;
    font-weight: 800;
    margin-right:3%;
  }

  &-name{
    font-size: 1em;
    font-weight: 800;
    margin-right:3%;
  }

  &-shop{
    font-size: 0.7em;
    font-weight: 500;
    color:#888888;
    line-height: 1.8;
    margin: 1% 0 0 8%;
  }

  &-cancel{
    position: absolute;
    font-size: 0.8em;
    font-weight: 800;
    background-color: #000;
    color:#fff;
    border-radius: 4px;
    padding: 8px 20px;
    right:5%;
    margin-top:3%;
  }

}

.follow-button{
  width:90%;
  height:50px;
  padding: 2%;
  text-align: center;
  background-color: $primary;
  color:#ffffff;
  font-size: 0.9em;
  font-weight: 800;
  border-radius: 10px;
  position: relative;
  left:5%;
  margin-bottom: 40%;
}
</style>
