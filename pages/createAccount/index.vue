<template>

        <div class="model-list" style="background-color:#fff">
            <div class="select-title-container">
                <span class="select-title1">픽키 회원가입</span>
            </div>
                <div class="input-container">
                    <div class="input-title">
                    이메일 
                    </div>
                    <div class="input">
                    <input
                        placeholder="이메일"
                        v-model="group1.mail"
                        class="input__bottom"
                        type="text"
                    />
                    </div>
                </div>

                <div class="input-container">
                    <div class="input-title">
                    비밀번호
                    </div>
                    <div class="input">
                    <input
                    maxlength="11"
                    placeholder="( 8~20자 / 영문 + 숫자 )"
                        v-model="group1.passWd"
                        class="input__bottom"
                        type="text"
                    />
                    </div>
                </div>
                <div class="input-container">
                    <div class="input-title">
                    비밀번호 확인
                    </div>
                    <div class="input">
                    <input
                    maxlength="4"
                    placeholder="비밀번호 확인"
                        v-model="group1.passWd2"
                        class="input__bottom"
                        type="text"
                    />
                    </div>
                </div>

                <div class="step-buttons">
                    <button class="step-buttons-container" @click="goAny(1)" >확인</button>
                </div>
    </div>

</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
layout: "blank",

components:{
},
data() {
      return{
        group1 : {
            mail: '',
            passWd: '',
            passWd2: '',
        },
      }
},
  computed: {
    ...mapGetters([
      "IMAGE_URL",
    ]),

    postCodeBody() {
        return this.postCode1 == '' ? '주소 입력' : '주소 다시 입력';
    }
        },

async asyncData({ store }) {
},

created() {
  
},

mounted() {

},

methods: {
    goAny(i) {
        var res = confirm( '픽키 회원가입이 완료되었습니다! \n 바로 픽키 정보등록을 하실래요?' );

        if(res == true) {
            this.$router.push('/register');
        } else {
            location.replace(window.location.origin + "/home");
        }
    },

},

beforeRouteLeave(to, from, next) {
    next();
}
}
</script>
<style lang="scss" scoped>
.step{
    display: flex;
    justify-content: space-around;
    margin-top: 5%;

    &-buttons{
        margin-bottom: 50px;
        margin-top: 50px;
        justify-content: center;
        display: flex;
        &-container{
            border: 2px solid #000;
            border-radius: 5px;
            margin: 0 10px;
            width: 90%;
            height: 40px;
            background-color: #fff;
            color: #000;
            font-size: 1em;
            text-align: center;
            padding: 8px 0;
        }
    }
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
        color: $primary;
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
    color: #000;
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


.input {
  align-items: flex-end;
  display: flex;
  justify-content: center;
  // padding: 25% 0 0 0;
  border-radius: 0;
  color: #000;
&-container{
  display: flex;
  margin-top: 5%;
}

&-title{
  margin-left: 7%;
  font-size: 1.1em;
  font-weight: 800;
  width: 120px;
  // text-align:center;
}

  &__bottom {
    border: 0;
    border-bottom: 5px solid #000;
    border-radius: 0;
    padding: 0;
    background: transparent;
    font-weight: 600;
    font-size: 1em;
    outline: 0;
    width: 200px;
    text-align: center;
    color: #000;
  }

}

</style>