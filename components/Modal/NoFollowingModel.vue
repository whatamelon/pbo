<template>
<div>
    <div class="nfm-backdrop"
    v-show="SHOW_NO_FOLLOWING_MODEL_MODAL"
    @click="closeSheet()"></div>
    <div class="nfm-container"
            :class="{
            'nfm-container--show': SHOW_NO_FOLLOWING_MODEL_MODAL,
            'nfm-container--hide': !SHOW_NO_FOLLOWING_MODEL_MODAL
            }">
        <img class="oops" src="/app/oops.png" />
        <div class="nfm-exp">
            <span class="nfm-exp1">팔로우한 모델이 없어요!</span>
            <span class="nfm-exp2">나에게 꼭 맞는 모델을 팔로우 해보세요!</span>
        </div>
        <div class="nfm-buttons">
            <button class="nfm-laterButton" @click="closeSheet">나중에 할래요</button>
            <button class="nfm-goButton" @click="goToModel">모델 찾으러 고고</button>
        </div>
    </div>
</div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
    computed: {
    ...mapGetters([
        "SHOW_NO_FOLLOWING_MODEL_MODAL"
    ])
  },

  methods:{
      closeSheet() {
        this.$store.dispatch("closeNoFollowingModelModal");
      },
    goToModel() {
        this.$router.push("/model");
        this.$store.dispatch("closeNoFollowingModelModal");
    }
  }
}
</script>
<style lang="scss" scoped>
.nfm-backdrop{
    background-color: rgba(0,0,0,0.5);
    height:auto;
    bottom:0;
    position: fixed;
    width: 100%;
    z-index: 104;
    top:-50px;
}

.oops{
    width:50%;
    height:auto;
    margin:22% 0 10% 0;
}


@media all and (max-width : 330px){
.nfm-container {
    &--show{
        bottom:100px !important;
        opacity: 1;
    }
}
}

.nfm-container {
    width:90%;
    height:300px;
    bottom:0px;
    position: fixed;
  transition: 0.4s;
  z-index: 999;
  background-color: #fff;
  border-radius: 10px;
  left: 5%;
  text-align: center;

    &--show{
        bottom:250px;
        opacity: 1;
    }

    &--hide{
        bottom:-310px;
        opacity: 0;
    }
}

.nfm{
    &-exp{
        display: grid;
        line-height: 2;
    }

    &-exp1{
        font-size: 1em;
        font-weight: 800;
    }

    &-exp2{
        font-size: 1em;
        font-weight: 500;
    }

    &-buttons{
        display: flex;
        padding:20px 2% 0 2%;
        justify-content: space-around;
    }

    &-laterButton{
        font-size: 1em;
        font-weight: 800;
        background-color: #ececec;
        color:#999999;
        width:47%;
        height:auto;
        padding:4%;
        border-radius: 7px;
    }

    &-goButton{
        font-size: 1em;
        font-weight: 800;
        background-color: $primary;
        color:#fff;;
        width:47%;
        height:auto;
        padding:4%;
        border-radius: 7px;
    }
}
</style>