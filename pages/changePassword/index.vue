<template>
<transition>
  <main class="login-container">

    <AppSpinner v-if="IS_LOADING" />

    <b-modal
      ref="exitAlertModal"
      v-model="showExitModal"
      centered
      hide-header
      hide-footer
    >
      <div class="exit-alert">
        <p class="exit-alert__title">
          저장되지 않은 정보가 있어요!
        </p>
        <p class="exit-alert__subtitle">
          그래도 나가시겠어요?
        </p>
      </div>

      <div class="exit-button-container">
        <button
          class="modal-button modal-button--unfocused"
          @click="exitModal()"
        >
          예
        </button>
        <button class="modal-button" @click="hideModal">
          아니오
        </button>
      </div>
    </b-modal>

    <form class="login-form">
      <input
        v-model="passwdForm.passwd"
        class="login-form__input"
        type="password"
        required
        placeholder="기존 비밀번호"
      /><i class="fa fa-eye-slash fa-lg passwdeye1"></i>
      <span class="login-form--border-bottom"></span>
      <input
        v-model="passwdForm.newpasswd"
        class="login-form__input"
        type="password"
        required
        placeholder="비밀번호 (영문,숫자 포함 /  8-20자)"
      /><i class="fa fa-eye-slash fa-lg passwdeye2"></i>
      <span class="login-form--border-bottom"></span>
      <input
        v-model="passwdForm.newpasswordConfirm"
        class="login-form__input"
        type="password"
        required
        placeholder="비밀번호 재입력"
      /><i class="fa fa-eye-slash fa-lg passwdeye3"></i>
      <span class="login-form--border-bottom"></span>
    </form>

    <b-alert
      class="login-alert"
      :show="dismissCountDown"
      variant="light"
      @dismissed="dismissCountDown = 0"
      @dismiss-count-down="countDownChanged"
    >
      {{ alertMessage }}
    </b-alert>

    <div class="button-container">
      <button
        class="login-button login-button--primary"
        @click="clickSignUpButton"
      >
        비밀번호 변경
      </button>
    </div>
  </main>
</transition>
</template>

<script>
import AppSpinner from "@/components/App/AppSpinner";

import { mapGetters, mapActions } from "vuex";

import { signUpAPI } from "@/api/auth";

export default {

  components: {
    AppSpinner
  },

  transition (to, from) {
    if (localStorage.getItem("backButton")){
    return 'slideLeft'
    }
    else if (from.name == "mypage") {
    return 'slideRight'
    }
    else if(to.name == "model" ||
    to.name == "home" ||
    to.name == "collection" ||
    to.name == "exhibition" ||
    localStorage.getItem("previousPage") == "exhibition-id" ||
    localStorage.getItem("previousPage") == "product-id" ||
    localStorage.getItem("previousPage") == "model-id") {
      return "nothing"
    }
  },

  data() {
    return {
      passwdForm: {
        passwd: "",
        newpasswd: "",
        newpasswordConfirm:""
      },
      alertMessage: "",
      dismissSecs: 3,
      dismissCountDown: 0,
      showExitModal: false
    };
  },

  computed: {
    ...mapGetters([
      "IS_LOADING",
      "USER_HEIGHT", 
      "USER_EMAIL"
    ])
  },

  created() {
    this.$store.dispatch("setCurrentRoute", this.$route.path);
    setTimeout(() => {
      this.$store.dispatch("endLoading");
    }, 800);
  },

  mounted() {
    this.$store.dispatch("setHeaderTitle", "비밀번호 변경");
      this.$store.dispatch("setLogo","noLogo");

    $(document).ready(function(){
    $('.passwdeye1').on('click',function(){
        $('input').toggleClass('active');
        if($('input').hasClass('active')){
            $(this).attr('class',"fa fa-eye fa-lg passwdeye1")
            .prev('input').attr('type',"text");
        }else{
            $(this).attr('class',"fa fa-eye-slash fa-lg passwdeye1")
            .prev('input').attr('type','password');
        }
    });
  });

    $(document).ready(function(){
    $('.passwdeye2').on('click',function(){
        $('input').toggleClass('active');
        if($('input').hasClass('active')){
            $(this).attr('class',"fa fa-eye fa-lg passwdeye2")
            .prev('input').attr('type',"text");
        }else{
            $(this).attr('class',"fa fa-eye-slash fa-lg passwdeye2")
            .prev('input').attr('type','password');
        }
    });
  });

      $(document).ready(function(){
    $('.passwdeye3').on('click',function(){
        $('input').toggleClass('active');
        if($('input').hasClass('active')){
            $(this).attr('class',"fa fa-eye fa-lg passwdeye3")
            .prev('input').attr('type',"text");
        }else{
            $(this).attr('class',"fa fa-eye-slash fa-lg passwdeye3")
            .prev('input').attr('type','password');
        }
    });
  });
  },

  methods: {
    ...mapActions(["login"]),
    hideModal() {
      this.showExitModal = false;
    },

    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },

    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },

    exitModal() {
      this.showExitModal = false;
      this.form = {
        email: "",
        passwd: "",
        passwordConfirm: ""
      };
      this.status = "login";
    },

    async clickSignUpButton() {
      const form = this.passwdForm;
      const checkNumber = form.newpasswd.search(/[0-9]/g);
      const checkEnglish = form.newpasswd.search(/[a-z]/ig);
      const checkSC = form.newpasswd.search(/[\{\}\[\]\/?.,;:|\)*~`!^\-+<>@\#$%&\\\=\(\'\"]/gi);
      const checkKorean = form.newpasswd.search(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/ig);

      if (form.newpasswd !== form.newpasswordConfirm) {
        this.alertMessage = "비밀번호가 일치하지 않습니다.";
        this.showAlert();
        return;
      } else if (form.newpasswd.length < 8 || form.passwd.length > 20) {
        this.alertMessage = "8자리 이상, 20자리 이하의 비밀번호를 사용해주세요.";
        this.showAlert();
        return;
      } else if(checkNumber <0 || checkEnglish <0){
        this.alertMessage = "영문과 숫자를 각각 최소 1자는 사용해주세요.";
        this.showAlert();
        return;
      } else if(checkSC > 0 || checkKorean > 0){
        this.alertMessage = "한글이나 특수문자는 사용할 수 없습니다.";
        this.showAlert();
        return;
      }
      
      const reTypePasswdForm = {
        email : this.$store.getters.USER_EMAIL,
        passwd : form.passwd,
        passwd2 : form.newpasswd,
      }      
      console.log(reTypePasswdForm)
      
      const response = await this.$store.dispatch("changePassword", reTypePasswdForm);

      if (response.status === 503) {
        this.alertMessage = "기존 비밀번호가 틀렸습니다. 다시 입력해주세요.";
        this.showAlert();
      }
      else if (response.status === 404) {
        this.alertMessage = "없는 회원입니다. 로그아웃 후 다시 회원가입해주세요.";
        this.showAlert();
      }
      else {
        alert("변경되셨습니다!");
        localStorage.setItem("backButton","1");
        this.$router.push("/myPage");
      }
    },

  },

  beforeRouteLeave(to, from, next) {
      this.$store.dispatch("setLogo","hasLogo");
    next();
  }
};
</script>

<style scoped lang="scss">
.login-container {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  height: 100%;
}

.login-alert {
  color: $primary;
  position: absolute;
  width: 100%;
  text-align: center;
  left: 50%;
  transform: translate(-50%, -50%);
  word-break: keep-all;
  word-wrap: break-word;
}

.exit-alert {
  text-align: center;

  &__title {
    margin: 20px 0 10px 0;
    font-size: 1.5em;
    font-weight: 800;
    color: $black;
    word-break: keep-all;
  }

  &__subtitle {
    margin: 10px 0;
    padding-bottom: 10px;
    font-size: 1em;
    font-weight: normal;
    color: gray;
    word-break: keep-all;
  }
}

.exit-button-container {
  display: flex;
  justify-content: space-between;
}

.modal-button {
  width: 48%;
  color: $white;
  background-color: $dark-grey;
  height: 45px;
  border: 0;
  border-radius: 0;
  font-size: 1.1em;
  font-weight: bold;
  display: block;
  margin: 0 auto;

  &--unfocused {
    color: #8d8d8d;
    background-color: #d9d9d9;
  }

  &:focus,
  &:hover {
    border: 2px solid inherit;
  }
}

.fc-title {
  width: 100%;
  padding: 50px 10px 0 10px;
  text-align: center;

  &__logo {
    width: 50%;
    height: auto;
  }

  h4 {
    padding-top: 0.7em;
    font-size: 1em;
    // color: $grey;
  }
}

.login-form {
  padding: 10px 0 10px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;

  &__input {
    width: 100%;
    margin: 15px 0 0 0;
    padding: 0px 20px !important;
    height: 40px;
    max-width: 500px;
    // border-bottom: 1px solid $grey;
    // border-radius: 5px;
    font-size: 1em;
  }

  &__check {
    margin: 10px 20px;
    padding: 0.5em 0;
    display: flex;
    align-items: center;
    align-content: center;
  }

  &__status {
    margin: 10px 20px;
    text-align: left;
    font-size: 1em;
    font-weight: 600;
  }

  &--border-bottom {
    margin: 0 20px 10px 20px;
    border-bottom: 1px solid $grey;
  }
}

.button-container {
  width: 100%;
  display: flex;
  justify-content: center;
}

.login-button {
  margin: 20px;
  padding: 10px;
  width: 100%;
  border: 1px solid $black;
  border-radius: 4px;
  color: $white;
  font: 1em;
  font-weight: 600;

  &--primary {
    background-color: $black;
  }

  &--facebook {
    border: 1px solid $facebook;
    background-color: $facebook;
  }

  &--image {
    width: 200px;
  }
}

.bottom-container {
  padding: 20px;

  &__left {
    float: left;
  }

  &__right {
    float: right;
    font-weight: 600;
  }
}

.terms {
  padding: 20px 40px;
  font-size: 0.9em;
  text-align: center;

  a {
    text-decoration-line: underline;
    color: $primary;
  }
}

.passwdeye{
  position: absolute;
  left:86%;
  color:#777;
  &1{
  position: absolute;
  left:86%;
  color:#777;
    top:39px;
  }
  &2{
  position: absolute;
  left:86%;
  color:#777;
    top:104px;
  }
  &3{
  position: absolute;
  left:86%;
  color:#777;
    top:170px;
  }
}
</style>
