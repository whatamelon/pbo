<template>
    <div class="newModel-container">
        <div class="newModel-head">
            <span class="hashtag">#</span>
            <span class="newModel-title">새롭게 등록된 모델</span>
        </div>
        <div class="newModel-vertical-container">
            <div class="newModel-model-container"
            v-for="model in NEW_MODELS"
            :key="model.modelId"
            @click="toDetailPage(model)">
                <div class="newModel-new">N</div>
                <div class="newModel-imgSkeleton"></div>
                <img
                    class="newModel-img"
                    :src="IMAGE_URL + model.imgList[0].imgFile"
                    alt="..."
                    loading="lazy"
                  />
                <div class="newModel-name">{{ model.name }}</div>
                <div class="newModel-info">
                    <div class="newModel-height">{{ model.height }}cm</div>
                    <div class="newModel-shop">{{ model.shopList[0].name }}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
    data() {
        return{

        }
    },

    computed: {
    ...mapGetters([
      "IMAGE_URL",
      "NEW_MODELS"
    ])
  },

  methods:{
      toDetailPage(model) {
        this.$amplitude.getInstance().logEvent("click slides", { contents: "모델"});
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
.hashtag{
    color:$primary;
    font-size: 1.3em;
    font-weight: 800;        
    animation-name : fade_newModelHash;
        animation-duration: 0.2s;
        animation-delay: 1s;
        animation-fill-mode: both;
        @keyframes fade_newModelHash {
            0% {
            background-color : #ececec;
            color:#ececec;
            }
            100% {
            background-color : transparent;
            color:$primary;
            }
        }
}

.newModel{
    &-container{
        border-top: 7px solid #ececec;
        border-bottom: 7px solid #ececec;
        padding:5% 0;
        background-color: #fff;
        margin-top: 17%;
    }

    &-head{
        margin: 0 0 0 5%;
        width:50%;
        animation-name : fade_newModelHead;
        animation-duration: 0.2s;
        animation-delay: 1s;
        animation-fill-mode: both;
        @keyframes fade_newModelHead {
            0% {
            background-color : #ececec;
            color:#ececec;
            }
            100% {
            background-color : transparent;
            }
        }
    }

    &-title{
        margin-left: -3px;
        padding:3px;
        font-size: 1.2em;
        font-weight: 800;
        letter-spacing: -1.5px;
    }

    &-vertical-container{
        overflow: -moz-scrollbars-none;
        width : 103% !important;
        display:flex;
        overflow-x: auto;
        overflow-y: hidden;
        margin:5% 0 0 -12px;
        padding-left: 12px;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none;
        &::-webkit-scrollbar {
            display : none;
            width:0px;
        }
    }

    &-model-container{
        position: relative;
        margin: 0 0 0 4%;
        text-align: center;
    }

    &-new{
        position: absolute;
        margin: 11px;
        padding: 4px 8px;
        border-radius: 50%;
        font-size: 0.7em;
        font-weight: 700;
        z-index: 4;
        color:#ececec;
        background-color : #ec3e39;
        animation-name : fade_new;
        animation-duration: 0.2s;
        animation-delay: 1s;
        animation-fill-mode: both;
        @keyframes fade_new {
            0% {
            background-color : #ececec;
            color:#ececec;
            }
            100% {
            background-color : #ec3e39;
            color:#ffffff;
            }
        }
    }

    &-imgSkeleton{
        position: absolute;
        width:123px;
        height: 123px;
        top:-1px;
        left:-1px;
        border-radius: 50%;
        animation-name : fade_newSkeleton;
        animation-duration: 0.2s;
        animation-delay: 1s;
        animation-fill-mode: both;
        @keyframes fade_newSkeleton {
            0% {
            background-color : #ececec;
            }
            100% {
            background-color : transparent;
            }
        }
    }

    &-img {
        width:120px;
        height: auto;
        border-radius: 50%;
    }

    &-name{
        font-size: 1em;
        font-weight: 800;
        margin-top:8%;        
        animation-name : fade_newName;
        animation-duration: 0.2s;
        animation-delay: 1s;
        animation-fill-mode: both;
        @keyframes fade_newName {
            0% {
            background-color : #ececec;
            color:#ececec;
            }
            100% {
            background-color : transparent;
            color:#000000;
            }
        }
    }

    &-info{
        display: flex;
        justify-content: center;
        margin-top:2%;
        line-height: 21px;   
    }

    &-height{
        font-size: 1em;
        font-weight: 800;
        animation-name : fade_newHeight;
        animation-duration: 0.2s;
        animation-delay: 1s;
        animation-fill-mode: both;
        @keyframes fade_newHeight {
            0% {
            background-color : #ececec;
            color:#ececec;
            }
            100% {
            background-color : transparent;
            color:#000000;
            }
        }
    }

    &-shop{
        font-size: 0.8em;
        font-weight: 800;
        color:#999999;
        margin-left: 10px;
        animation-name : fade_newShop;
        animation-duration: 0.2s;
        animation-delay: 1s;
        animation-fill-mode: both;
        @keyframes fade_newShop {
            0% {
            background-color : #ececec;
            color:#ececec;
            }
            100% {
            background-color : transparent;
            color:#999999;
            }
        }
    }
}

</style>