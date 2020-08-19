<template>
            <div class="model-container">
                <div>
                <div class="model-images">
                    <div class="model-image-container-big">
                        <div class="skeleton-img-big"></div>
                        <img 
                        loading="lazy"
                        alt="/h2.jpg"
                        class="model-image1" 
                        :src="IMAGE_URL + model.imgList[0].imgFile"
                        />
                    </div>
                    <div class="model-images-side">
                        <div class="model-image-container">
                        <div class="skeleton-img-small"></div>
                            <img 
                            loading="lazy"
                            alt="/h2.jpg"
                            class="model-image2" 
                            :src="IMAGE_URL + model.imgList[1].imgFile"
                            />
                        </div>
                        <div class="model-image-container">
                        <div class="skeleton-img-small"></div>
                            <img 
                            loading="lazy"
                            alt="/h2.jpg"
                            class="model-image2" 
                            :src="IMAGE_URL + model.imgList[2].imgFile"
                            />
                        </div>
                    </div>
                </div>
                <div class="model-ex">
                    <span class="model-height">{{ model.height }}cm</span>
                    <span class="model-name">{{ model.name }}</span>
                    <span class="model-shop">{{ model.shopList[0].name }} 모델</span>
                    <div class="button-container">
                        <div class="skeleton-button"
                        @click="followModel(model)"></div>
                        <button
                        class="model-followButton"
                        :class="{ 'model-followButton--secondary': !isFollowed }"
                        @click="followModel(model)"
                        >
                        <div>
                        <i v-if="!isFollowed" class="material-icons followIcon">person_add</i>
                        <i v-else class="material-icons followIcon-cancel">person_add_disabled</i>
                        </div>
                        <div>
                        <span v-if="!isFollowed" class="model-followButton-exFollow">팔로우</span>
                        <span v-else class="model-followButton-exCancel">팔로우 취소</span>
                        </div>
                        </button>
                    </div>
                </div>
            </div>
            </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: {
    model: {
      type: Object,
      required: true
    }
  },
    
  data() {
    return {
        isFollowed: this.model.isFollow == 'true' ? true : false
    };
  },
  computed: {
    ...mapGetters(["IMAGE_URL"]),

    // isFollowed() {
    //     if(this.model.isFollow == 'true') {
    //         return true;
    //     }
    //     else {
    //         return false;
    //     }
    // }
  },


  created() {
  },

  
methods: {

     async followModel(model) {
        if(!this.isFollowed) {
            this.isFollowed = true;
            this.$amplitude.getInstance().logEvent("click follow",
             { modelId: model.modelId ,clickedPage: "도입부팔로잉요청"});
            await this.$store.dispatch("followModel", model.modelId);
            await this.$store.dispatch("setFollowingModels");
            await this.$store.dispatch("getAllModels");
        }
        else {
            this.isFollowed = false;
            await this.$store.dispatch("unfollowModel", model.modelId);
            await this.$store.dispatch("setFollowingModels");
            await this.$store.dispatch("getAllModels");
        }
    }
},
}
</script>
<style lang="scss" scoped>
.button-container{
    position: absolute;
    right:5%;
}

.skeleton{
    &-button {
            z-index: 2;
            width: 102%;
            height: 101%;
            left:-1px;
            border-radius: 5px;
            position: absolute;
            animation-name : fade_button;
            animation-duration: 0.2s;
            animation-delay: 1s;
            animation-fill-mode: both;
            @keyframes fade_button {
                0% {
                background-color : #ececec;
                z-index: 2;
                }
                100% {      
                background-color : transparent;
                z-index: 0;
                }
            }
    }

    &-img-big{
            z-index: 2;
            width: 100%;
            height: 100%;
            border-radius: 5px;
            position: absolute;
            animation-name : fade;
            animation-duration: 0.2s;
            animation-delay: 1s;
            animation-fill-mode: both;
            @keyframes fade {
                0% {
                background-color : #ececec;
                }
                100% {      
                background-color : transparent;
                }
            }
        }
    &-img-small {
         z-index: 2;
         top:-1px;
        width: 97%;
        height: 102%;
        border-radius: 5px;
        position: absolute;
        animation-name : fade;
        animation-duration: 0.2s;
        animation-delay: 1s;
        animation-fill-mode: both;
        @keyframes fade {
            0% {
            background-color : #ececec;
            }
            100% {      
            background-color : transparent;
            }
        }
    }
}

.followIcon{
    font-size: 1.2em;
    color:#fff;
    line-height: 1.3;
    margin-right: 5px;
    &-cancel{
        font-size: 1.2em;
        color:$primary;
        line-height: 1.3;
        margin-right: 5px;
    }
}

.model-followButton{
    z-index:1;
    background-color: transparent;
    border-radius: 5px;
    border: 1px solid $primary;
    width:110px;
    display: flex;
    justify-content: center;
    height: 33px;
    padding:1% 0;

    &--secondary{
        z-index:1;
        background-color: $primary;
        border-radius: 5px;
        border: 1px solid $primary;
        width:110px;
        display: flex;
        justify-content: center;
        height: 33px;
        padding:1% 0;
    }

    &-exFollow{
        font-size: 0.8em;
        color:#fff;
        position: relative;
        bottom: 1px;
        font-weight: 700;
    }

    &-exCancel{
        font-size: 0.8em;
        color:$primary;
        position: relative;
        bottom: 1px;
        font-weight: 700;
    }
}

.model-container:nth-child(1) {
        border-top: 7px solid #ececec;
        padding: 6% 5% 2% 5%;
        overflow-y: hidden;
        width: 100%;
}

.model {
    &-container{
        border-top: 1px solid #ececec;
        padding: 6% 5% 2% 5%;
        overflow-y: hidden;
        width: 100%;
    }
    
    &-images{
        display: flex;
        padding-bottom: 5px;
        width: 100%;
    }

    &-image-container-big{
        width: 66%;
        position: relative;
        overflow-y: hidden;
    }

    &-images-side{
        display: flex;
        width:33.3%;
        flex-direction: column;
        justify-content: space-between;
    }

    &-image-container{
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
        position:relative;
        overflow-y: hidden;
    }

    &-image1{
        width: 99.2%;
        object-fit: cover;
        border-radius: 5px;
        z-index:1;
    }

    &-image2{
        width: 96%;
        object-fit: cover;
        border-radius: 5px;
        z-index:1;
    }

    &-ex{
        display: flex;
        justify-content: flex-start;
        padding: 10px 0 10px 3px;
    }

    &-height{
        font-size: 1.7em;
        font-weight: 800;
        color: #000;
        margin-right: 8px;
        animation-name : fade_height;
        animation-duration: 0.2s;
        animation-delay: 1s;
        animation-fill-mode: both;
        @keyframes fade_height {
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

    &-name{
        font-size: 0.9em;
        font-weight: 800;
        color: #000;
        padding-top:12px;
        margin-right: 6px;
        animation-name : fade_name;
        animation-duration: 0.2s;
        animation-delay: 1s;
        animation-fill-mode: both;
        @keyframes fade_name {
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
        font-size: 0.7em;
        font-weight: 800;
        color: #888;
        padding-top:16px;
        margin-right: 10px;   
        animation-name : fade_shop;
        animation-duration: 0.2s;
        animation-delay: 1s;
        animation-fill-mode: both;
        @keyframes fade_shop {
            0% {
            background-color : #ececec;
            color:#ececec;
            }
            100% {      
            background-color : transparent;
            color: #888;
            }
        }
    }
}
</style>