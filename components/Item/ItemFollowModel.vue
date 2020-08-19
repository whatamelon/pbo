<template>
    <div class="fm-container">
        <div class="fm-header">
            <span class="fm-header__length">{{ FOLLOWING_MODELS.length }}명 팔로우중</span>
            <span class="fm-header__all" @click="goToFollow">전체보기 ></span>
        </div>
        <div class="fm-models">
            <div class="fm-models__plus">
                <div class="fm-models__plus__icon" @click="goToModels">
                    <i class="material-icons plusFollow">add</i>
                </div>
                <span class="fm-models__plus__exp">팔로우 추가</span>
            </div>
            <div class="fm-model__models" 
            v-for="model in FOLLOWING_MODELS"
            :key="model.modelId"
            @click="goToModel(model)"
            >
                <img 
                class="fm-model__models__img" 
                :src="IMAGE_URL + model.imgFaceFile"
                />
                <span class="fm-model__models__name">{{ model.name }}</span>
            </div>
        </div>
    </div>    
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
data() {
    return{
    }
},
computed: {
    ...mapGetters([
      "USER_HEIGHT",
      "FOLLOWING_MODELS",
      "IMAGE_URL"
    ])
  },

methods:{
    goToFollow() {
        this.$router.push("/follow");
    },
    goToModels() {
        this.$amplitude.getInstance().logEvent("click addModel");
        this.$router.push("/model");
    },
    goToModel(model){
        this.$amplitude
        .getInstance()
        .logEvent("click model-profile", { modelId: model.modelId , clickedModelPage: "큐레이션" });

        this.$store.dispatch("setModel", model);
        const recentModelId = JSON.parse(localStorage.recentModelId);
        recentModelId.push(model);
        localStorage.recentModelId = JSON.stringify(recentModelId);
        this.$router.push("/model/" + model.modelId);
    }
}
}
</script>
<style lang="scss" scoped>
.fm-container{
    width:100%;
    margin-top:10px;
}
.fm-header{
    display: flex;
    padding:2% 3% 1% 4%;

    &__title{
        font-size: 1em;
        font-weight: 800;
    }
    &__length{
        font-size: 0.8em;
        color:#222;
        line-height: 2.4;
    }
    &__all{
        font-size: 0.8em;
        color:#222;
        line-height: 2.5;
        position:absolute;
        right:3%;
    }
}

.fm-models{
        width : 103% !important;
        display:flex;
        overflow-x: auto;
        overflow-y: hidden;
        margin:0 0 0 -12px;
        padding: 0 0 2.5% 22px;
        border-bottom: 7px solid #ececec;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none;
        &::-webkit-scrollbar {
            display : none;
            width:0px;
        }
}
.plusFollow{
    font-size: 3em;
    color:#fff;
    font-weight:800;
    text-align: center;
    align-content: center;
    align-items: center;
    justify-content: center;
    line-height: 1.5;
}
.fm-models__plus{
    margin:0 1%;
    text-align: center;
    &__icon{
        border-radius: 50%;
        background-color: $primary;
        width:60px;
        height:60px;
        margin:0 auto 5px auto;
    }
    &__exp{
        font-size: 0.8em;
        color:#222;
        white-space: pre;
    }
}

.fm-model__models{
    display: grid;
    margin:0 1%;
    &__img{
        width:60px;
        height:60px;
        border-radius: 50%;
    }
    
    &__name{
        font-size: 0.8em;
        color:#222;
        text-align: center;
        margin-top:8px;
        white-space: pre;
    }
}
</style>