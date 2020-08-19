<template>
<transition>
  <main class="model-container">

    <ModelHeightSelect></ModelHeightSelect>
    
        <ModelNewModels></ModelNewModels>

    <div class="selectModel-container">
        <div class="model-list">
            <div v-if="MODEL_HEIGHT_FILTER == 1"> 
                <div v-if="MODELS.length == 0" class="noModel">
                    <img
                      class="noModel-img"
                      src="/app/sorrybutIloveyou.png"
                      alt="/app/sorrybutIloveyou.png"
                    />
                    <span class="noModel-ex">나와 같은 키가 없어요ㅠㅠ</span>
                    <span class="noModel-ex">탭을 눌러 내 스타일의 모델을 팔로우해주세요 :D</span>
                </div>
                <ModelMyHeight
                    v-else
                    :model="model"
                    :key="model.modelId"
                    v-for="(model, index) in MODELS">
                </ModelMyHeight>
            </div>
            <div v-else-if="MODEL_HEIGHT_FILTER == 2">
                <ModelMyHeight
                    :model="model"
                    :key="model.modelId"
                    v-for="(model, index) in MODELS_LOW_HEIGHT">
                </ModelMyHeight>
            </div>
            <div v-else-if="MODEL_HEIGHT_FILTER == 3">
                <ModelMyHeight
                    :model="model"
                    :key="model.modelId"
                    v-for="(model, index) in MODELS_MEAN_HEIGHT">
                </ModelMyHeight>
            </div>
            <div v-else>
                <ModelMyHeight
                    :model="model"
                    :key="model.modelId"
                    v-for="(model, index) in MODELS_HIGH_HEIGHT">
                </ModelMyHeight>
            </div>
        </div>
</div>


  </main>
  </transition>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ModelHeightSelect from "@/components/Model/ModelHeightSelect";
import ModelMyHeight from "@/components/Model/ModelMyHeight";
import ModelNewModels from "@/components/Model/ModelNewModels";

export default {
  components: {
    ModelHeightSelect,
    ModelMyHeight,
    ModelNewModels
  },

  transition (to) {
    if (localStorage.getItem("backButton")){
    return 'slideLeft'
    }
    else if (to.name == "model-id" ||
              to.name == "saved") {
    return 'slideRight'
    }
    else if(to.name == "model" ||
    to.name == "home" ||
    to.name == "mypage" ||
    localStorage.getItem("previousPage") == "exhibition-id" ||
    localStorage.getItem("previousPage") == "product-id" ||
    localStorage.getItem("previousPage") == "model-id") {
      return "nothing"
    }
  },

  data() {
      return{
          model:"",
          moreMyModel:true,
          moreLowModel:true,
          moreMeanModel:true,
          moreHighModel:true,
          isMySpinning: false,
          isLowSpinning: false,
          isMeanSpinning: false,
          isHighSpinning: false,
      }
  },

  computed: {
    ...mapGetters([
      "USER_HEIGHT",
      "NEW_MODELS",
      "MODELS",
      "MODELS_LOW_HEIGHT",
      "MODELS_MEAN_HEIGHT",
      "MODELS_HIGH_HEIGHT",
      "IMAGE_URL",
      "FOLLOWING_MODELS",
      "MODEL_HEIGHT_FILTER",
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


    const params = {
      offset : 0,
      limit : 5
    }
    if(localStorage.getItem("direct")) {
        await store.dispatch("getModels", params);
    }
    else if (localStorage.getItem("previousPage")=="model-id") {
    }
    else {
    await store.dispatch("getModelsLowHeight", params);
    await store.dispatch("getModels", params);
    await store.dispatch("getModelsMeanHeight", params);
    await store.dispatch("getModelsHighHeight", params);
    }
    const params1 = {
      offset : 0,
      limit : 10
    }
    await store.dispatch("getNewModels", params1);
    store.dispatch("setCurrentRoute", "/model");
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

    if (localStorage.getItem("recentModelId") != 0) {
    const recentModelId = JSON.parse(localStorage.recentModelId);
    recentModelId.length = 0;
    localStorage.recentModelId = JSON.stringify(recentModelId);
    }
    else {
    }
    if (localStorage.getItem("recentProductId") != 0) {
    const recentProductId = JSON.parse(localStorage.recentProductId);
    recentProductId.length = 0;
    localStorage.recentProductId = JSON.stringify(recentProductId);
    }
    else {
    }

    localStorage.removeItem("product");
    localStorage.removeItem("backButton");
    localStorage.removeItem("direct");
    
      window.addEventListener("scroll", this.askMoreMyModel);
      window.addEventListener("scroll", this.askMoreLowModel);
      window.addEventListener("scroll", this.askMoreMeanModel);
      window.addEventListener("scroll", this.askMoreHighModel);
    this.$amplitude.getInstance().logEvent("page view model-list");


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
      this.$store.dispatch("setLogo","hasLogo");
  },
methods: {
    async askMoreMyModel() {
       if (
            window.innerHeight + window.scrollY >= document.body.offsetHeight-100 &&
            !this.isMySpinning &&
            this.moreMyModel &&
            this.$store.getters.MODEL_HEIGHT_FILTER == 1
       ) {
         this.isMySpinning = true;
         await this.getMoreModelsMyHeight();
       }
    },
    async askMoreLowModel() {
       if (
            window.innerHeight + window.scrollY >= document.body.offsetHeight-100 &&
            !this.isLowSpinning &&
            this.moreLowModel &&
            this.$store.getters.MODEL_HEIGHT_FILTER == 2
       ) {
         this.isLowSpinning = true;
         await this.getMoreModelsLow();
       }
    },

    async askMoreMeanModel() {
        if (
            window.innerHeight + window.scrollY >= document.body.offsetHeight-100 &&
            !this.isMeanSpinning &&
            this.moreMeanModel &&
            this.$store.getters.MODEL_HEIGHT_FILTER == 3
       ) {
         this.isMeanSpinning = true;
         await this.getMoreModelsMean();
       }
    },

    async askMoreHighModel() {
       if (
            window.innerHeight + window.scrollY >= document.body.offsetHeight-100 &&
            !this.isHighSpinning &&
            this.moreHighModel &&
            this.$store.getters.MODEL_HEIGHT_FILTER == 4
       ) {
         this.isHighSpinning = true;
         await this.getMoreModelsHigh();
       }
    },
    
    getMoreModelsMyHeight() {
      return new Promise(async (resolve, reject) => {
        try {
            await this.$store.dispatch(
              "setOffsetModel",
              this.$store.getters.OFFSET_MODEL + 5
            );
            const response = await this.$store.dispatch("addModels");
            const noMoreMyModel = response.result.modelList;
            if (noMoreMyModel.length == 0) {
                this.moreMyModel = false;
            }
          this.isMySpinning = false;
            resolve();
        } catch (error) {
          this.isMySpinning = false;
          reject(error);
        }
      });
    },
    
    getMoreModelsLow() {
      return new Promise(async (resolve, reject) => {
        try {
            await this.$store.dispatch(
              "setOffsetModelLowHeight",
              this.$store.getters.OFFSET_MODEL_LOW_HEIGHT + 5
            );
            const response = await this.$store.dispatch("addModelsLowHeight");
            const noMoreLowModel = response.result.modelList;
            if (noMoreLowModel.length == 0) {
                this.moreLowModel = false;
            }
          this.isLowSpinning = false;
            resolve();
        } catch (error) {
          this.isLowSpinning = false;
          reject(error);
        }
      });
    },
    
    getMoreModelsMean() {
      return new Promise(async (resolve, reject) => {
        try {
            await this.$store.dispatch(
              "setOffsetModelMeanHeight",
              this.$store.getters.OFFSET_MODEL_MEAN_HEIGHT + 5
            );
            const response = await this.$store.dispatch("addModelsMeanHeight");
            const noMoreMeanModel = response.result.modelList;
            if (noMoreMeanModel.length == 0) {
                this.moreMeanModel = false;
            }
          this.isMeanSpinning = false;
            resolve();
        } catch (error) {
          this.isMeanSpinning = false;
          reject(error);
        }
      });
    },
    
    getMoreModelsHigh() {
      return new Promise(async (resolve, reject) => {
        try {
            await this.$store.dispatch(
              "setOffsetModelHighHeight",
              this.$store.getters.OFFSET_MODEL_HIGH_HEIGHT + 5
            );
            const response = await this.$store.dispatch("addModelsHighHeight");
            const noMoreHighModel = response.result.modelList;
            if (noMoreHighModel.length == 0) {
                this.moreHighModel = false;
            }
          this.isHighSpinning = false;
            resolve();
        } catch (error) {
          this.isHighSpinning = false;
          reject(error);
        }
      });
    },


    async followModel(model) {
        console.log("눌렀어");
        if(model.isFollow == 'true') {
            console.log("팔로우되있음");
            await this.$store.dispatch("unfollowModel", model.modelId);
        }
        else {
            console.log("팔로우되있지않음");
            await this.$store.dispatch("followModel", model.modelId);
        }
    }
},

beforeRouteLeave(to, from, next) {
  if(to.name == "model-id") {

  }
  else {
    window.removeEventListener("scroll", this.askMoreMyModel);
    window.removeEventListener("scroll", this.askMoreLowModel);
    window.removeEventListener("scroll", this.askMoreMeanModel);
    window.removeEventListener("scroll", this.askMoreHighModel);
    this.$store.dispatch("setOffsetModel", 0);
    this.$store.dispatch("setOffsetModelLowHeight", 0);
    this.$store.dispatch("setOffsetModelMeanHeight", 0);
    this.$store.dispatch("setOffsetModelHighHeight", 0);
  }
    next();
}
};
</script>

<style lang="scss" scoped>
.model-container {
  margin: 0;
  height: 100%;
  min-height: 100vh;
  background-color: $lighter-grey;
  padding-bottom: 20%;
  width: 100%;
  max-width: 500px;
  overflow-y: hidden;
}

.noModel{
  justify-content: center;
  margin: 0 auto;
  display: grid;
  padding: 25% 0;
  &-img{
    width:200px;
    height: auto;
    margin: 10% auto;
  }

  &-ex{
    font-size: 1em;
    font-weight: 500;
    text-align: center;
  }
}

.length {
  color:$primary;
}
.select-title{
    &-container{
        width:100%;
        display: grid;
        text-align: center;
        background-color: #fff;
        padding: 10% 0 3% 0;
    }

    &1{
        font-size: 1.8em;
        font-weight: 800;
    }

    &2{
      color:$primary;
    }

    &-sub{
        font-size: 1em;
        font-weight: 500;
        color: #555;
        padding: 3% 0 1% 0;
    }
}
.button-black{
    color: #fff;
}
.selectButton{
    z-index: 5;
    position: fixed;
    bottom:0;
    height:50px;
    width:100%;
    background-color: #000;;
    padding: 3.5% 8%;
    color: #fff;
    font-size: 1em;
    font-weight: 800;
    text-align: center;

    &-black{
        background-color: $primary;
        font-size: 1em;
        font-weight: 800;
        padding: 3.5% 8%;
        color:#fff;
    }
}
.selectModel-container{
    width:100%;
    height:100%;
    background-color: #fff;
}
.model {
    &-list{
        padding-bottom: 25%;
    }
}

</style>
