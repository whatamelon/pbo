<template>

        <div class="model-list" style="background-color:#fff">
            <div class="select-title-container">

                <span class="material-icons" @click="goBack">
                arrow_back_ios
                </span>
                <span class="select-title1">픽키 회원가입</span>
            </div>
            <br/>
            <br/>
            <br/>
            <br/>
                <div class="input-container">
                    <div class="input-title">
                    이메일 
                    </div>
                    <div class="input">
                    <input
                        placeholder="이메일"
                        v-model="loginForm.mail"
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
                    maxlength="20"
                    placeholder="( 8~20자 / 영문 + 숫자 )"
                        v-model="loginForm.passWd"
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
                    maxlength="20"
                    placeholder="비밀번호 확인"
                        v-model="loginForm.passWd2"
                        class="input__bottom"
                        type="text"
                    />
                    </div>
                </div>
            <br/>
            <br/>

                <div class="step-buttons">
                    <button class="step-buttons-container" @click="clickButton" >확인</button>
                </div>
    </div>

</template>
<script>
import { mapGetters, mapActions } from "vuex";
import AppAlert from "@/components/App/AppAlert";

export default {
layout: "blank",

components:{
    AppAlert
},

  data() {
    return {
      alertMsg:'',
      loginForm : {
        mail: 'q1@pickling.kr',
        passWd: 'q1234567',
        passWd2: "",
      }
    };
  },
  computed: {
    ...mapGetters([
      "IMAGE_URL",
    ]),
        },

async asyncData({ store }) {
},

created() {
  
},

mounted() {

},

methods: {

    goBack() {
        this.$router.go(-1);
    },

    async clickButton() {
        if(this.loginForm.mail.trim() == '') {
            alert('이메일을 입력해주세요.');
        } else if(this.loginForm.passWd.trim().length < 8) {
            alert('비밀번호는 최소 8자 이상 입력해주세요.');
        } else if(this.loginForm.passWd2.trim().length < 8) {
            alert('비밀번호 확인은 최소 8자 이상 입력해주세요.');
        }else if(this.loginForm.passWd2.trim() != this.loginForm.passWd.trim() ) {
            alert('비밀번호와 비밀번호확인이 다릅니다. 한 번 더 확인해주세요.');
        } else {
        await this.$store.dispatch("signup", this.loginForm).then((response) => {
            if(response == 200) {
                    var res = confirm( '픽키 회원가입이 완료되었습니다! \n 바로 픽키 정보등록을 하실래요?' );

                    if(res == true) {
                        this.$router.push('/register');
                    } else {
                        location.replace(window.location.origin + "/home");
                    }
            } else if(response == 401) {
            this.alertMsg = "사용할 수 없는 이메일 입니다. 다른 이메일을 선택해주세요.";
            this.$refs.appAlert.showAlert();
            } else {
            this.alertMsg = "네트워크를 확인해주세요.";
            this.$refs.appAlert.showAlert();
            }
            })
            .catch((e) => {
            console.log(e)
            this.alertMsg = "네트워크를 확인해주세요.";
            this.$refs.appAlert.showAlert();
            })
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
        text-align: start;
        background-color: #fff;
        padding: 10% 0 3% 5%;
    }

    &1{
        font-size: 1.8em;
        font-weight: 800;
        color: $primary;
        margin-left: 20%;
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
    border-bottom: 2px solid #000;
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