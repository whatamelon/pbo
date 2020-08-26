<template>
  <main class="size-input-container" id="size-info">

    <main class="size-input">

      <div class="input">
        <input
          v-model="loginForm.adminId"
          class="input__bottom"
          type="text"
        />
      </div>

      <div class="input">
        <input
          v-model="loginForm.passWd"
          class="input__bottom"
          type="text"
        />
      </div>

      <div class="button-container">
        <button
          class="button"
          @click="clickButton"
        >
          <span>시작하기</span>
        </button>
      </div>

      <AppAlert
        ref="appAlert"
        :alert-message="'로그인 실패'"
      ></AppAlert>
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
      loginForm : {
        adminId: 'test1',
        passWd: '11111111',
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
      this.loginForm.passWd2 = this.loginForm.passWd;
       await this.$store.dispatch("adminLogin", this.loginForm).then(() => {
          console.log('22')
            location.replace(document.URL + "home");
        })
        .catch(() => {
        this.$refs.appAlert.showAlert();
        })
  },
  },
  beforeRouteLeave(to, from, next) {
    next();
  }
};
</script>

<style lang="scss" scoped>
.size-input {
  padding: 35% 0 0 0;
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
    font-size: 2em;
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
  padding: 25% 0 0 0;
  border-radius: 0;
  color: #000;
  &__bottom {
    border: 0;
    border-bottom: 5px solid #000;
    border-radius: 0;
    padding: 0;
    background: transparent;
    font-weight: 600;
    font-size: 1.8em;
    outline: 0;
    width: 90px;
    margin-left: 35px;
    margin-top: 15px;
    text-align: center;
    color: #000;
  }
  &__cm {
    font-weight: 600;
    font-size: 2em;
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
  bottom: 30%;
  border-radius: 5px;
  font-size: 1em;
  font-weight: 600;
  height: 50px;
  color: #fff;
  position: fixed;
  background-color: #000;
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
.canvas {
  height: 100vh;
  width: 100vw;
  background-image: linear-gradient(to top, #eb3349, #f45c43);
  position: absolute;
  overflow: hidden;
  max-width:-webkit-fill-available;
}
.bubble {
  display: block;
  border-radius: 100%;
  opacity: 0.8;
  position: absolute;
}
.bubble:nth-child(1) {
  background: radial-gradient(
    ellipse at center,
    #b8c6c6 0%,
    #30b3d3 46%,
    #20628c 100%
  );
  width: 100px;
  height:100px;
  left: 10vw;
  bottom: 100vh;
  -webkit-animation: move1 infinite 5s;
  animation: move1 infinite 5s;
}
@-webkit-keyframes move1 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 100vh;
    -webkit-transform: translate(10px, 0);
    transform: translate(10px, 0);
    opacity: 0;
  }
}
@keyframes move1 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 100vh;
    -webkit-transform: translate(10px, 0);
    transform: translate(10px, 0);
    opacity: 0;
  }
}
.bubble:nth-child(2) {
  background: radial-gradient(
    ellipse at top right,
    #b8c6c6 0%,
    #30b3d3 46%,
    #20628c 100%
  );
  width: 100px;
  height: 100px;
  left: 10vw;
  bottom: 100vh;
  -webkit-animation: move2 infinite 10s;
  animation: move2 infinite 10s;
}
@-webkit-keyframes move2 {
  0% {
    bottom: -50px;
  }
  100% {
    bottom: 100vh;
    -webkit-transform: translate(-150px, 0);
    transform: translate(-150px, 0);
    opacity: 0;
  }
}
@keyframes move2 {
  0% {
    bottom: -50px;
  }
  100% {
    bottom: 100vh;
    -webkit-transform: translate(-150px, 0);
    transform: translate(-150px, 0);
    opacity: 0;
  }
}
.bubble:nth-child(3) {
  background: radial-gradient(
    ellipse at center,
    #b8c6c6 0%,
    #30b3d3 46%,
    #20628c 100%
  );
  width: 100px;
  height: 100px;
  left: 10vw;
  bottom: 100vh;
  -webkit-animation: move3 infinite 7s;
  animation: move3 infinite 7s;
}
@-webkit-keyframes move3 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 100vh;
    -webkit-transform: translate(150px, 0);
    transform: translate(150px, 0);
    opacity: 0;
  }
}
@keyframes move3 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 100vh;
    -webkit-transform: translate(150px, 0);
    transform: translate(150px, 0);
    opacity: 0;
  }
}
.bubble:nth-child(4) {
  background: radial-gradient(
    ellipse at top right,
    #b8c6c6 0%,
    #30b3d3 46%,
    #20628c 100%
  );
  width: 100px;
  height: 100px;
  left: 50vw;
  bottom: 100vh;
  -webkit-animation: move4 infinite 9s;
  animation: move4 infinite 9s;
}
@-webkit-keyframes move4 {
  0% {
    bottom: -50px;
  }
  100% {
    bottom: 100vh;
    -webkit-transform: translate(125px, 0);
    transform: translate(125px, 0);
    opacity: 0;
  }
}
@keyframes move4 {
  0% {
    bottom: -50px;
  }
  100% {
    bottom: 100vh;
    -webkit-transform: translate(125px, 0);
    transform: translate(125px, 0);
    opacity: 0;
  }
}
.bubble:nth-child(5) {
  background: radial-gradient(
    ellipse at center,
    #b8c6c6 0%,
    #30b3d3 46%,
    #20628c 100%
  );
  width: 90px;
  height: 90px;
  left: 70vw;
  bottom: 120vh;
  -webkit-animation: move5 infinite 8s;
  animation: move5 infinite 8s;
}
@-webkit-keyframes move5 {
  0% {
    bottom: -200px;
  }
  100% {
    bottom: 120vh;
    -webkit-transform: translate(1px, 0);
    transform: translate(1px, 0);
    opacity: 0;
  }
}
@keyframes move5 {
  0% {
    bottom: -200px;
  }
  100% {
    bottom: 120vh;
    -webkit-transform: translate(1px, 0);
    transform: translate(1px, 0);
    opacity: 0;
  }
}
.bubble:nth-child(6) {
  background: radial-gradient(
    ellipse at top right,
    #b8c6c6 0%,
    #30b3d3 46%,
    #20628c 100%
  );
  width: 100px;
  height: 100px;
  left: 80vw;
  bottom: 100vh;
  -webkit-animation: move6 infinite 10s;
  animation: move6 infinite 10s;
}
@-webkit-keyframes move6 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 100vh;
    -webkit-transform: translate(-120px, 0);
    transform: translate(-120px, 0);
    opacity: 0;
  }
}
@keyframes move6 {
  0% {
    bottom: -100px;
  }
  100% {
    bottom: 100vh;
    -webkit-transform: translate(-120px, 0);
    transform: translate(-120px, 0);
    opacity: 0;
  }
}
</style>