<template>
<div>
    <div class="select-title-container">
        <span class="select-title1">내 스타일의 모델</span>
        <span class="select-title1">최소 <span class="select-title2">3</span>명을 팔로우해주세요.</span>
        <span class="select-title-sub">팔로우한 모델의 상품만 모아볼 수 있어요.</span>
    </div>
    <ModelHeightSelect></ModelHeightSelect>
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
                <ModelSelectFollow
                    v-else
                    :model="model"
                    :key="model.modelId"
                    v-for="(model, index) in MODELS">
                </ModelSelectFollow>
            </div>
            <div v-else-if="MODEL_HEIGHT_FILTER == 2">
                <ModelSelectFollow
                    :model="model"
                    :key="model.modelId"
                    v-for="(model, index) in MODELS_LOW_HEIGHT">
                </ModelSelectFollow>
            </div>
            <div v-else-if="MODEL_HEIGHT_FILTER == 3">
                <ModelSelectFollow
                    :model="model"
                    :key="model.modelId"
                    v-for="(model, index) in MODELS_MEAN_HEIGHT">
                </ModelSelectFollow>
            </div>
            <div v-else>
                <ModelSelectFollow
                    :model="model"
                    :key="model.modelId"
                    v-for="(model, index) in MODELS_HIGH_HEIGHT">
                </ModelSelectFollow>
            </div>
        </div>
    <div class="selectButton"
            :class="{
                'selectButton': this.followModelLength > 0,
                'selectButton-black': this.followModelLength <= 0
            }"
            @click="goToItems">
        <span v-if="this.followModelLength > 0">내 스타일의 모델 <span class="length">{{ this.followModelLength }}</span> 명을 팔로우해주세요.</span>
        <span v-else class="button-black">OK! 시작할 준비가 되었어요.</span>
    </div>
</div>
</div>

</template>
<script>
import { mapGetters, mapActions } from "vuex";
import ModelHeightSelect from "@/components/Model/ModelHeightSelect";
import ModelSelectFollow from "@/components/Model/ModelSelectFollow";
export default {
layout: "blank",

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

components:{
    ModelSelectFollow,
    ModelHeightSelect
},

computed: {
    ...mapGetters([
      "MODELS",
      "MODELS_LOW_HEIGHT",
      "MODELS_MEAN_HEIGHT",
      "MODELS_HIGH_HEIGHT",
      "ALL_MODELS",
      "IMAGE_URL",
      "FOLLOWING_MODELS",
      "MODEL_HEIGHT_FILTER",
    ]),

    followModelLength() {
        return 3 - this.$store.getters.FOLLOWING_MODELS.length;
    },

    heightRanges() {
        const ranges = [];
        for(var i = 150; i <= 175; i++ ) {
            ranges.push(i);
        }
        const filterRange = ranges.filter(function(n) {
            return n != 151 & n != 152 & n != 173;
        });

        return filterRange;
    },
},

async asyncData({ store }) {
    await store.dispatch("getAllModels");
      const params = {
      offset : 0,
      limit : 5
    }
    await store.dispatch("getModelsLowHeight", params);
    await store.dispatch("getModels", params);
    await store.dispatch("getModelsMeanHeight", params);
    await store.dispatch("getModelsHighHeight", params);
    await store.dispatch("setFollowingModels");
},

created() {
  
      this.$amplitude.getInstance().logEvent("pageview askfollowing");
      window.addEventListener("scroll", this.askMoreMyModel);
      window.addEventListener("scroll", this.askMoreLowModel);
      window.addEventListener("scroll", this.askMoreMeanModel);
      window.addEventListener("scroll", this.askMoreHighModel);
},

mounted() {
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
    },
    goToItems() {
      
      this.$amplitude.getInstance().logEvent("click completeFollowing");
        if(this.followModelLength <= 0) {
            this.$router.push("/home");
            this.$store.dispatch("setItemFirstFilter", "followModel");                   
        }
    }
},

beforeRouteLeave(to, from, next) {
    window.removeEventListener("scroll", this.askMoreMyModel);
    window.removeEventListener("scroll", this.askMoreLowModel);
    window.removeEventListener("scroll", this.askMoreMeanModel);
    window.removeEventListener("scroll", this.askMoreHighModel);
    this.$store.dispatch("setOffsetModel", 0);
    this.$store.dispatch("setOffsetModelLowHeight", 0);
    this.$store.dispatch("setOffsetModelMeanHeight", 0);
    this.$store.dispatch("setOffsetModelHighHeight", 0);
    next();
}
}
</script>
<style lang="scss" scoped>
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