<template>
  <main class="size-input-container" id="size-info">

    <main class="size-input">

    <div class="hello">
      반가워요!👋 <br/> 피클링 픽키센터 입니다!
    </div>

      <div class="input-container">
        <div class="input-title">
          이메일
        </div>
        <div class="input">
          <input
          placeholder="이메일"
            v-model="loginForm.userId"
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
          placeholder="영문 + 숫자 ( 8~20자 )"
            v-model="loginForm.passWd"
            class="input__bottom"
            type="text"
          />
        </div>
      </div>

      <AppAlert
        ref="appAlert"
        :alert-message="this.alertMsg"
      ></AppAlert>

      <div class="button-container">
        <button
          class="button"
          @click="clickButton"
        >
          <span>로그인</span>
        </button>
      </div>


      <div class="button-container">
        <button
          class="button2"
          @click="clickButton2(0)"
        >
          <span>회원가입</span>
        </button>
      </div>

      <div class="button-container">
        <button
          class="button2"
          @click="clickButton2(1)"
        >
          <span>픽키 등록!</span>
        </button>
      </div>

    </main>
  </main>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import AppAlert from "@/components/App/AppAlert";
export default {
  layout: "blank",
  components: {
    AppAlert
  },
  data() {
    return {
      alertMsg:'',
      loginForm : {
        userId: 'q1@pickling.kr',
        passWd: 'q1234567',
        passWd2: "",
      }
    };
  },

  computed: {
    ...mapGetters([
    ]),
},

   async asyncData({ next }) {

function getFormatDate(date){
    var year = date.getFullYear();              //yyyy
    var month = (1 + date.getMonth());          //M
    month = month >= 10 ? month : '0' + month;  //month 두자리로 저장
    var day = date.getDate();                   //d
    day = day >= 10 ? day : '0' + day;          //day 두자리로 저장
    return  year + '' + month + '' + day;       //'-' 추가하여 yyyy-mm-dd 형태 생성 가능
}

var x = new Date();

if(!localStorage.getItem("tokenExpire")) {

} else {

    if (localStorage.getItem("tokenExpire") < getFormatDate(x)) {
      console.log('dd')
      var i = new Date();
      console.log(i)
    } else {
      console.log(localStorage.getItem("tokenExpire"))
      var i = new Date();
      console.log(i)
      next("/home");
    }

}
  },
  created() {
    console.log('dd');
  },

  mounted(){
  },
  methods: {
    async clickButton() {
       await this.$store.dispatch("adminLogin", this.loginForm).then((response) => {
          if(response == 200) {
            location.replace(document.URL + "home");
          } else if(response == 401) {
          this.alertMsg = "틀린 비밀번호 입니다.";
           this.$refs.appAlert.showAlert();
          } else if(response == 404) {
          this.alertMsg = "없는 사용자 입니다. 이메일을 확인해주세요.";
           this.$refs.appAlert.showAlert();
          }else {
          this.alertMsg = "네트워크를 확인해주세요.";
           this.$refs.appAlert.showAlert();
          }
        })
        .catch((e) => {
          console.log(e)
          this.alertMsg = "네트워크를 확인해주세요.";
           this.$refs.appAlert.showAlert();
        })
  },

    async clickButton2(i) {
      if(i ==0) {
        this.$router.push("createAccount");
       console.log('회원가입ㄱ!')
      } else {
        this.$router.push('/register');
      }
  },
  },
  beforeRouteLeave(to, from, next) {
    next();
  }
};
</script>

<style lang="scss" scoped>
.hello{
  text-align: center;
  font-size: 2em;
  font-weight: 900;
  margin-bottom: 15%;
}

.size-input {
  padding: 20% 0 0 0;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  max-width: 500px;
  height: 100vh;
  overflow: hidden;
  &__container {
    display: flex;
    flex-direction: column;
    text-align: center;
  }
  &__title {
    margin: 5px 0;
    font-size: 1.5em;
    font-weight: 800;
    letter-spacing: -1px;
    color: #000;
  }
  &__subtitle {
    margin: 8px 0;
    font-size: 1.1em;
    font-weight: 500;
    letter-spacing: -1px;
    color: #000;
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
  margin-left: 10%;
  margin-right: 10px;
  font-size: 1.5em;
  font-weight: 800;
  width: 100px;
  // text-align:center;
}

  &__bottom {
    border: 0;
    border-bottom: 5px solid #000;
    border-radius: 0;
    padding: 0;
    background: transparent;
    font-weight: 600;
    font-size: 1.1em;
    outline: 0;
    width: 200px;
    text-align: center;
    color: #000;
  }
  &__cm {
    font-weight: 600;
    font-size: 1.5em;
    color: $black;
    margin-top: 15px;
    color: #000;
  }
}
.button-container {
  width: 100%;
  display: flex;
  justify-content: center;
}
.button {
  padding: 10px;
  width: 90%;
  left:5%;
  bottom: 20%;
  border-radius: 5px;
  font-size: 1em;
  font-weight: 600;
  height: 50px;
  color: #fff;
  margin-top:30%;
  background-color: #000;
  &--active {
    border: 0;
    background-color: $primary;
    color: $white;
  }
}
.button2 {
  padding: 10px;
  width: 90%;
  left:5%;
  bottom: 20%;
  border-radius: 5px;
  font-size: 1em;
  font-weight: 600;
  height: 50px;
  color: $primary;
  margin-top:10%;
  border: 3px solid $primary;
  background-color: #fff;
  &--active {
    border: 0;
    background-color: $primary;
    color: $white;
  }
}
.image-container {
  // position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 500px;
}
.image {
  width: 100%;
  opacity: 0.5;
}
</style>