<template>
  <div
    class="bodytype-bottom-sheet"
    :class="{
      'bodytype-bottom-sheet--show': SHOW_BODYTYPE_SHEET,
      'bodytype-bottom-sheet--hide': !SHOW_BODYTYPE_SHEET
    }"
  >
    <div class="header">
      <i class="material-icons close" @click="closeBodytypeSheet">
        close
      </i>
    </div>

<div class="bodytype-modal__first" >
  <img src="/app/We_need_yourfeedback.png" class="feedbackImg"/>
        <div class="bodytype-modal__title">이런 건 좋다. 이런 건 좀 아니다.</div>
            <span class="bodytype-modal__subTitle">체형별 추천을 사용해보신 후,
                 <br/>좋았던 부분이나, 개선할 부분이 있다면, 얼마든지 알려주세요!
                 <br/>서비스 개발에 적극반영하겠습니다. :)
            </span>
            <form class="bodytype-form">
             <textarea 
                    cols="20" 
                    rows="3" 
                    maxlength="150"
                    v-model="suggestForm.value1" 
                    autofocus 
                    required 
                    wrap="hard" 
                    class="bodytype-modal__contents"
                    name="bodytypeInput"
            ></textarea>
            </form>
        <button class="submitbodytype" @click="submitbodytype">체형 고민 등록</button>
    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
        suggestForm : {
          height: this.$store.getters.USER_HEIGHT,
          eventCode: "q20001",
          value1: "",
          value2:""
        },
    };
  },

  computed: {
    ...mapGetters([
      "SHOW_BODYTYPE_SHEET"
    ])
  },

  methods: {
    ...mapActions([
      "openBodytypeSheet"
    ]),

    submitbodytype(){
        const userSuggest = JSON.parse(JSON.stringify(this.suggestForm));
        console.log(userSuggest)
        this.$store.dispatch("pushUserSuggest", userSuggest);
      this.$store.dispatch("closeBodytypeSheet");
      this.$store.dispatch("openBodytypeModal");
      window.scroll( {
         top : 0,
         left : 0
       });
    },

    closeBodytypeSheet() {
      this.$store.dispatch("closeBodytypeSheet");
    }
  }
};
</script>

<style lang="scss" scoped>
.feedbackImg{
  width:240px;
  margin: 10% auto 3% auto;
}

.noShow {
  display: none;
}

.submitbodytype{
    height:45px;
    background-color: $primary;
    color:#fff;
    font-weight:800;
    font-size:0.9em;
    border-radius: 9px;
    margin-bottom:70px;
}

.bodytype-bottom-sheet {
  padding: 10px 15px;
  width: 100%;
  max-width: 500px;
  height: 100vh;
  position: absolute;
  top: 100vh;
  display: flex;
  flex-direction: column;
  background-color: $white;
  z-index: 200;
  transition: 0.4s;
  overflow: hidden;
  overflow-y: scroll !important;
  position: fixed;
  width: 100%;

  &--show {
    top: 0;
  }

  &--hide {
    top: 100vh;
  }
}

.header {
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  z-index: 11;
  height:20px;
}

.close {
  font-size: 1.8em;
  position: absolute;
  right: 15px;
  color: #000;
  top:10px;
}

.bodytype-modal{
    position:absolute;
    width:90%;
    height:360px;
    z-index:4;
    background-color: #ffffff;
    top:19%;
    text-align: center;
    left:5%;
    border-radius: 10px;
    &__first{
        display:grid;
        text-align: center;
    }

    &__second{
        padding:0 8%;
        display: grid;
    }

    &__title{
        font-size:1.5em;
        font-weight: 800;
        margin: 0 auto;
        letter-spacing: -0.5px;
    }

    &__subTitle{
        font-size:0.9em;
        color:#a9a9a9;
        margin:3% 0 0 0;
        line-height: 22px;
    }

    &__contents{
        width:100%;
        height:220px;
        border: 1px solid #ececec;
        margin:7% 0;
        font-size: 0.9em;
        border-radius: 15px;
        padding:10px;
        resize:none;
    }
}


@media all and (min-height : 800px){
    .bodytype-modal__contents{
        height:300px;
    }
}

@media all and (max-height : 570px){
    .bodytype-modal__contents{
        height:180px;
    }
    .bodytype-modal__title{
      font-size: 1.2em;
    }
    .bodytype-modal__subTitle{
      font-size: 0.7em;
      line-height: 15px;
    }
    .feedbackImg{
      width: 190px;
    }
}
</style>
