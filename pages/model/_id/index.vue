<template>
<transition>
  <main class="model-detail-container" id="model-detail-page">

    <b-alert
      class="alert"
      :show="dismissCountDown"
      variant="light"
      @dismissed="dismissCountDown = 0"
      @dismiss-count-down="countDownChanged"
    >
      {{ alertMessage }}
    </b-alert>

    <div class="main-image-container">
      <div class="main__image__skeleton"></div>
      <img src="/app/back_btn.png" class="back-button" @click="goToBackPage">
      <div class="main-image"  :style="mainImage" ></div>
    </div>

    <div class="model-main">
    <div class="model-profile1">
      <span class="model-description1">{{ model.modelExp }}</span>
    </div>

    <div class="model-profile">
      <img
        class="model-profile__profile-image"
        :src="IMAGE_URL + model.imgFaceFile"
      />

      <div class="model-profile__flex">
        <div class="model-profile__info">
          <span class="model-profile__name">{{ model.name }}</span>
          <span class="model-profile__height">{{ model.height }}cm</span>
          <span v-if="model.shopList[0]" class="model-profile__shop">{{
            model.shopList[0].name || "쇼핑몰 이름"
          }}</span>
        </div>
        <div class="model-profile__tags">
          <span
            v-for="style in model.styleList"
            :key="style"
            class="model-profile__tag"
            >{{ style }}</span
          >
        </div>
      </div>
    </div>

    <div class="model-profile-sentence" id="modelSentence">
      <div class="balloon" id="sentenceBalloon">
        <span v-html="modelIntroSentence">
          </span>
      </div>
    </div>

    <div class="model-body-info">
      <div class="model-body-info__item">
        <span class="model-body-info__type">키</span>
        <div class="model-body-info__icons">
          <img src="/icons/height.jpg" />
        </div>
        <span class="model-body-info__value">{{ MODEL.height }}cm</span>
      </div>
      <div class="model-body-info__item">
        <span class="model-body-info__type">어깨</span>
        <div class="model-body-info__icons">
          <img src="/icons/shoulder.jpg" />
        </div>
        <span class="model-body-info__value">{{ shoulder }}</span>
      </div>
      <div class="model-body-info__item">
        <span class="model-body-info__type">골반</span>
        <div class="model-body-info__icons">
          <img src="/icons/pelvis.jpg" />
        </div>
        <span class="model-body-info__value">{{ pelvis }}</span>
      </div>
      <div class="model-body-info__item">
        <span class="model-body-info__type">상의</span>
        <div class="model-body-info__icons">
          <img src="/icons/top.jpg" />
        </div>
        <span class="model-body-info__value">{{ MODEL.topValue }}</span>
      </div>
      <div class="model-body-info__item">
        <span class="model-body-info__type">하의</span>
        <div class="model-body-info__icons">
          <img src="/icons/pants.jpg" />
        </div>
        <span class="model-body-info__value">{{ MODEL.bottomValue }}</span>
      </div>
      <div class="model-body-info__item">
        <span class="model-body-info__type">신발</span>
        <div class="model-body-info__icons">
          <img src="/icons/shoe.jpg" />
        </div>
        <span class="model-body-info__value">{{ MODEL.footValue }}</span>
      </div>
    </div>
    
    <div class="styling-images-container">
      <div ref="vueViewer" v-viewer class="styling-images" @click="clickViewer">
        <!-- <div class="style__image__skeleton__container">
          <div class="style__image__skeleton"
                  v-for="n in 10"></div>
        </div> -->
        <img
          v-for="model in modelImages"
          :key="model.imgFile"
          :src="IMAGE_URL + model.imgFile"
          alt=""
        />
      </div>
    </div>

    <div class="button-container">
      <div class="button-containerScroll" ref="modelButtons"
              :class="{
                    'button-containerScroll--show': this.isAtTopPage,
                    'button-containerScroll--hide': !this.isAtTopPage
                    }">
          <img 
           v-show="this.isAtTopPage"
          src="/app/arrow_left.png" 
          class="back-button--container"
          @click="goToBackPage"
          />
          <div class="twoButton-container" 
                  :class="{
                    'twoButton-container__widthModi': this.isAtTopPage,
                    }">
            <button class="bubbly-button" 
                            id="likeButtonClick"
                            @click="modelLikeButton"
                            v-on:click="model.likePoint++"
                            >
              <i class="fas fa-heart"></i>
              <p id="likePointValue" onclick ="animateButton">{{model.likePoint}}</p>
              <p id="likeSentence" onclick ="animateButton">예뻐요</p>
            </button>
            <button
              class="button-follow"
              :class="{ 'button--secondary': isFollowing }"
              @click="followModel"
            >
              <i v-if="!isFollowing" class="material-icons followIcon">person_add</i>
              <i v-else class="material-icons followIcon">person_add_disabled</i>
              {{ followButtonMessage }}
            </button>
        </div>
      </div>
    </div>

    <div class="model__masonry">
      <span class="model__masonry__product"
        >
        {{ MODEL.name }} 모델의 상품</span
      >
    </div>

  <div class="masonry__first">
    <no-ssr>
      <div  class="masonry-container">
        <AppProduct2
          v-for="product in MODEL_PRODUCTS"
          :key="product.itemId"
          :product="product"
          class="masonry-item"
        ></AppProduct2>
      </div>
    </no-ssr>
  </div>
    </div>

    <div v-if="isSpinning" class="spinner-continaer">
      <AppSpinner2></AppSpinner2>
    </div>
  </main>
</transition>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import AppProduct2 from "@/components/App/AppProduct2";
import AppSpinner from "@/components/App/AppSpinner";
import AppSpinner2 from "@/components/App/AppSpinner2";
import NoSSR from "vue-no-ssr";

export default {
  layout: "noHeader",
  components: {
    AppProduct2,
    AppSpinner,
    AppSpinner2,

    "no-ssr": NoSSR
  },
  transition (to) {
    if (localStorage.getItem("backButton")){
    return 'slideLeft'
    }
    else if (to.name == "model-id" ||
              to.name == "product-id") {
    return 'slideRight'
    }
    else if(to.name == "model" ||
    to.name == "home" ||
    to.name == "mypage" ||
    localStorage.getItem("previousPage") == "product-id" ||
    localStorage.getItem("previousPage") == "model-id") {
      return "nothing"
    }
  },
   
   scrollBehavior (to, from, savedPosition) {
  if (savedPosition) {
    return savedPosition
  } else {
    return { x: 0, y: 0 }
  }
},
  data() {
    return {
      mainImage: {
        backgroundImage: `url(${this.$store.getters.IMAGE_URL}${this.$store.getters.MODEL.imgTitleFile})`
      },
      isAtTopPage: false,
      alertMessage: "",
      dismissSecs: 1.5,
      dismissCountDown: 0,
      followButtonMessage: "",
      isSpinning: false,
      modelImages: [],
      modelIntroSentence:"",
      noMoreData:false
    };
  },

  computed: {
    ...mapGetters([
      "IMAGE_URL",
      "IS_LOADING",
      "MODEL_PRODUCTS",
      "MODEL",
    ]),
    
    pelvis() {
      const pelvisCode = this.$store.getters.MODEL.pelvisCode;
      let pelvis;
      switch (pelvisCode) {
        case "00":
          pelvis = "없음";
          break;
        case "p1":
          pelvis = "넓은편";
          break;
        case "p2":
          pelvis = "보통";
          break;
        case "p3":
          pelvis = "좁은편";
          break;
      }

      return pelvis;
    },

    shoulder() {
      const shoulderCode = this.$store.getters.MODEL.shoulderCode;
      let shoulder;
      switch (shoulderCode) {
        case "00":
          shoulder = "없음";
          break;
        case "s1":
          shoulder = "넓은편";
          break;
        case "s2":
          shoulder = "보통";
          break;
        case "s3":
          shoulder = "좁은편";
          break;
      }

      return shoulder;
    }

    
  },

  async asyncData({ store, params, from }) {
    if(from.name == "model-id") {
      localStorage.setItem("direct","1");
    }

    store.dispatch("setFirstCategory", "000");

    const followingModel = await store.getters.FOLLOWING_MODELS.filter(
      model => model.modelId == params.id
    );
    const responseModel = await store.dispatch("getModelInfo", params.id);
    console.log(responseModel.result)
    await store.dispatch("setModel", responseModel.result);

    await store.dispatch("getModelProducts");

    return {
      productList: store.getters.MODEL_PRODUCTS,
      modelId: params.id,
      model: store.getters.MODEL,
      isFollowing: followingModel.length > 0 ? true : false
    };
  },

  created() {

    if(localStorage.getItem("product") == undefined ) {
      localStorage.removeItem("product");
    }
        if(localStorage.getItem('routerStack') == '' ||
              localStorage.getItem('routerStack') == null  ){}
    else if(localStorage.getItem('routerStack').includes('model')) {
      this.$store.dispatch("setCurrentRoute", '/model');
    }
    else if(localStorage.getItem('routerStack').includes('collection')) {
      this.$store.dispatch("setCurrentRoute", '/collection');
    }
    else if(localStorage.getItem('routerStack').includes('home')) {
      this.$store.dispatch("setCurrentRoute", '/home');
    } 
    else if(localStorage.getItem('routerStack').includes('myPage')) {
      this.$store.dispatch("setCurrentRoute", '/myPage');
    }
    else if(localStorage.getItem('routerStack').includes('bodytype')) {
      this.$store.dispatch("setCurrentRoute", '/bodytype');
    } 
    console.log(this.$route.path)
    this.followButtonMessage = this.isFollowing ? "팔로우 취소" : "팔로우";
    this.modelImages = this.$store.getters.MODEL.imgList;
    this.modelIntroSentence = this.$store.getters.MODEL.modelIntro;

      window.addEventListener("scroll", this.handleScroll);

  },

  mounted() {

    if(localStorage.getItem("backButton") == "1") {
      localStorage.removeItem("backButton");
      const recentModelId = JSON.parse(localStorage.recentModelId);
    recentModelId.pop();

    localStorage.setItem("recentModelId", JSON.stringify(recentModelId));

    const recentProductId = JSON.parse(localStorage.recentProductId);
    recentProductId.pop();

    localStorage.setItem("recentProductId", JSON.stringify(recentProductId));
    }
    
    if(!this.$store.getters.MODEL.modelIntro) {
      document.getElementById('modelSentence').style.display="none";
    }

      this.$store.dispatch("setLogo","noLogo");
    this.$store.dispatch("setHeaderTitle", "모델상세");
      
    const headerSpace = document.getElementsByClassName("header-space")[0];
    headerSpace.style.display = "none";

    console.log(this.$store.getters.MODEL);

    const viewerFooter = this.$refs.vueViewer;

    console.log(viewerFooter);

    $(window).scroll(function() {
      var scroll = $(window).scrollTop();
      $(".main-image").css({
        transform: 
        'translate3d(-50%, -'+(scroll/50)+'%, 0) scale('+(100 - scroll/50)/100+')',
      });
    });
  },

  
methods: {
    ...mapActions(["followModel", "unfollowModel","openModal"]),

    hideSentence () {
       localStorage.getItem("model");
      const model2 = JSON.parse(localStorage.getItem("model"));
      console.log(model2);
      localStorage.setItem("modelIntro" ,model.modelIntro);

      if (localStorage.getItem("modelIntro") == null) {
        document.getElementById("modelSentence").style.display = "none";
      }
    },

    goToBackPage() {
      if(localStorage.getItem('direct')) {
        this.$router.push("/model");
      }
      else if(
        localStorage.getItem('previousPage') == 'model' ||
        localStorage.getItem('previousPage') == 'home' ||
        localStorage.getItem('previousPage') == 'follow' ||
        localStorage.getItem('previousPage') == 'curate-id' ||
        localStorage.getItem('previousPage') == 'curate-follow' ||
        localStorage.getItem('previousPage') == 'curate-height' ||
        localStorage.getItem('previousPage') == 'curate-bodytype'
        ) {
        localStorage.setItem("backButton","1");
        this.$router.go(-1);
      }
      else if (localStorage.getItem('previousPage') == 'product-id'){

        const recentProductId = JSON.parse(localStorage.recentProductId);
        const newSetProduct = recentProductId[recentProductId.length -1];

       if (recentProductId != 0) {
        this.$store.dispatch("setProductInfo", newSetProduct);
        localStorage.setItem("product", JSON.stringify(newSetProduct));
        localStorage.setItem('cat1',newSetProduct.cat1);
        localStorage.setItem('cat2',newSetProduct.cat2);

        const recentModelId = JSON.parse(localStorage.recentModelId);
        const newSetModel = recentModelId[recentModelId.length-2];
        console.log("상품에서뒤로와서모델세팅새로할거에요");
        console.log(newSetModel);
        console.log(newSetModel.modelId);

        this.$store.dispatch("setModel", newSetModel);
        this.$store.dispatch("getModelInfo", newSetModel.modelId);
      
        localStorage.setItem("backButton","1");

        
        this.$router.go(-1);
       }
       else {
        const recentModelId = JSON.parse(localStorage.recentModelId);
        const newSetModel = recentModelId[recentModelId.length -2];

        this.$store.dispatch("setModel", newSetModel);
      
        localStorage.setItem("backButton","1");
        this.$router.go(-1);
       }

      }
    },

    async handleScroll() {
      if(window.scrollY >= 930) {
          this.$refs.modelButtons.style.position = "fixed";
          // this.$refs.modelButtons.style.top = "0px";
          this.$refs.modelButtons.style.zIndex = "4";
          this.isAtTopPage = true;
      }
      else {
          this.$refs.modelButtons.style.position = "relative";
          this.$refs.modelButtons.style.top = null;
          this.isAtTopPage = false;
      }

      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
        !this.isSpinning &&
        !this.noMoreData
      ) {
        this.isSpinning = true;
        await this.getMoreProducts();
      }
      else {

      }
    },

    getMoreProducts() {
      return new Promise(async (resolve, reject) => {
        try {
            await this.$store.dispatch(
              "setOffsetModelProduct",
              this.$store.getters.OFFSET_MODEL_PRODUCT + 30
            );
            const response = await this.$store.dispatch("addModelProducts");
            const products = response.result.itemList;
            if (products.length == 0) {
              this.noMoreData = true;
            }
            this.isSpinning = false;
            resolve();
        } catch (error) {
          this.isSpinning = false;
          reject(error);
        }
      });
    },

    goToModelPage() {
      this.$router.push("/model");
    },
    clickViewer() {
      console.log("viewer clicked");
      const viewerFooter = this.$refs.vueViewer;

      console.log(viewerFooter);

      setTimeout(() => {
        const viewerTitle = document.getElementsByClassName("viewer-title")[0];
        const viewerToolbar = document.getElementsByClassName(
          "viewer-toolbar"
        )[0];

        console.log(document.getElementsByClassName("viewer-footer"));
        viewerTitle.style.display = "none";
        viewerToolbar.style.display = "none";
      }, 50);
    },

    followModel() {
      if (this.isFollowing) {
        this.$store.dispatch("unfollowModel", this.model.modelId);
      } else if (!this.isFollowing) {
        this.$amplitude.getInstance().logEvent("click follow",
         { modelId: this.model.modelId ,clickedPage:"모델상세"});
        this.$store.dispatch("followModel", this.model.modelId);
      }
      this.alertMessage = this.isFollowing ? "팔로우 취소!" : "팔로우 완료♥";
      this.showAlert();
      this.isFollowing = !this.isFollowing;
      this.followButtonMessage = this.isFollowing ? "팔로우 취소" : "팔로우";
    },

    copyToClipboard() {
      this.$amplitude.getInstance().logEvent("click share");

      const url = "https://fitchoo.kr" + $nuxt.$route.path;
      this.$copyText(url).then(() => {
        this.alertMessage = "URL 복사 완료!";
        this.showAlert();
      });
    },

    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },

    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },

   modelLikeButton (modelLikeValue) {
     this.$amplitude.getInstance().logEvent("click likes");
      var animateButton = function(e) {
      e.preventDefault;
      e.target.classList.remove('animate');
      e.target.classList.add('animate');
      setTimeout(function(){
        e.target.classList.remove('animate');
      }, 300);
    };
    const likeButtonClick = document.getElementById("likeButtonClick");
    likeButtonClick.classList.add("animate");
    setTimeout(function(){
    likeButtonClick.classList.remove("animate");
      }, 300);

    const bubblyButtons = document.getElementsByClassName("bubbly-button");
    for (var i = 0; i < bubblyButtons.length; i++) {
      bubblyButtons[i].addEventListener('click', animateButton, false);
    }
      var modelLikeValue;
      modelLikeValue = document.getElementById("likePointValue").innerHTML;

      if ( modelLikeValue%5 == 0) {
        document.getElementById("likeSentence").innerHTML = "예뻐요";
      }
     if ( modelLikeValue%5 == 1) {
       document.getElementById("likeSentence").innerHTML = "하트뿅뿅";
      }
      if ( modelLikeValue%5 == 2) {
        document.getElementById("likeSentence").innerHTML = "알라븅";
      }
      if ( modelLikeValue%5 == 3) {
        document.getElementById("likeSentence").innerHTML = "여신이에요";
      }
      if ( modelLikeValue%5 == 4) {
        document.getElementById("likeSentence").innerHTML = "♥♥♥♥♥";
      }

      const thisModelId = this.$store.getters.MODEL
      this.$store.dispatch("sendModelLike",  thisModelId.modelId);
    }
  },

  beforeRouteLeave(to, from, next) {
    if(to.name == "model" ||
    to.name == "home" ) {
      document.getElementById("modelSentence").style.display = "none";
    }
    else {
      document.getElementById("model-detail-page").style.display = "none";
    }
      this.$store.dispatch("setOffsetModelProduct",0);
      window.removeEventListener("scroll", this.handleScroll);
      window.removeEventListener("scroll", this.handleSticky);
    localStorage.removeItem("modelLikePoint");
    localStorage.removeItem("setModelID");
    localStorage.removeItem("random_model");
    this.$store.dispatch("resetModelProducts");
    this.$store.dispatch("setLogo","hasLogo");
    next();
  }
};
</script>

<style scoped lang="scss">
.twoButton-container{
  display: flex;
  width:100%;

  &__widthModi{
    width:83%;
    right:3%;
    position:absolute;
  }
}
.followIcon{
  font-size: 19px;
  margin-right: 5px;
}
.style__image__skeleton__container{
  position:absolute;
  display:flex;
}
.style__image__skeleton{
  width:139px;
  height:139px;
  margin:3px 8px 0 -2px;
  animation-name : fadeStyleImage;
      animation-duration: 0.2s;
      animation-delay: 1s;
      animation-fill-mode: both;
      @keyframes fadeStyleImage {
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

.main__image__skeleton {
      width:100%;
      height:300px;
      position: absolute;
      animation-name : fadeCarousel;
      animation-duration: 0.2s;
      animation-delay: 1s;
      animation-fill-mode: both;
      @keyframes fadeCarousel {
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


i {
  z-index : 4 !important;
}

.fa-user-check {
  margin-right: 10px;
}

p { 
  margin: 0px 10px;
  padding-bottom : 3px;
}


//  예뻐요 버튼 시작

$fuschia: #ff0081;
$button-bg: $fuschia;
$button-text-color: #fff;
$baby-blue: #f8faff;

body{
  font-size: 16px;
  font-family: 'Helvetica', 'Arial', sans-serif;
  text-align: center;
  background-color: $baby-blue;
}
.bubbly-button{
  font-family: 'Helvetica', 'Arial', sans-serif;
  font-size: 0.9em;
  font-weight: 600;
  padding: 1em 2em;
  -webkit-appearance: none;
  appearance: none;
  background-color: $button-bg;
  color: $button-text-color;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  position: relative;
  transition: transform ease-in 0.1s, box-shadow ease-in 0.25s;
  -webkit-transition: -webkit-transform ease-in 0.1s, box-shadow ease-in 0.25s;
  box-shadow: 0 2px 25px rgba(255, 0, 130, 0.5);
  width : 49%;
  margin-right:5px;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  position: relative;
  
  &:focus {
    outline: 0;
  }
  
  &:before, &:after{
    position: absolute;
    content: '';
    display: block;
    width: 140%;
    height: 100%;
    left: -20%;
    // z-index: -1000;
    transition: all ease-in-out 0.5s !important;
    -webkit-transition: all ease-in-out 0.5s !important;
    background-repeat: no-repeat;
  }
  
  &:before{
    display: none;
    top: -75%;
    background-image:  
      radial-gradient(circle, $button-bg 20%, transparent 20%),
    radial-gradient(circle,  transparent 20%, $button-bg 20%, transparent 30%),
    radial-gradient(circle, $button-bg 20%, transparent 20%), 
    radial-gradient(circle, $button-bg 20%, transparent 20%),
    radial-gradient(circle,  transparent 10%, $button-bg 15%, transparent 20%),
    radial-gradient(circle, $button-bg 20%, transparent 20%),
    radial-gradient(circle, $button-bg 20%, transparent 20%),
    radial-gradient(circle, $button-bg 20%, transparent 20%),
    radial-gradient(circle, $button-bg 20%, transparent 20%);
  background-size: 10% 10%, 20% 20%, 15% 15%, 20% 20%, 18% 18%, 10% 10%, 15% 15%, 10% 10%, 18% 18%;
  //background-position: 0% 80%, -5% 20%, 10% 40%, 20% 0%, 30% 30%, 22% 50%, 50% 50%, 65% 20%, 85% 30%;
  }
  
  &:after{
    display: none;
    bottom: -75%;
    background-image:  
    radial-gradient(circle, $button-bg 20%, transparent 20%), 
    radial-gradient(circle, $button-bg 20%, transparent 20%),
    radial-gradient(circle,  transparent 10%, $button-bg 15%, transparent 20%),
    radial-gradient(circle, $button-bg 20%, transparent 20%),
    radial-gradient(circle, $button-bg 20%, transparent 20%),
    radial-gradient(circle, $button-bg 20%, transparent 20%),
    radial-gradient(circle, $button-bg 20%, transparent 20%);
  background-size: 15% 15%, 20% 20%, 18% 18%, 20% 20%, 15% 15%, 10% 10%, 20% 20%;
  //background-position: 5% 90%, 10% 90%, 10% 90%, 15% 90%, 25% 90%, 25% 90%, 40% 90%, 55% 90%, 70% 90%;
  }
 
  &:active{
    transform: scale(0.9);
    -webkit-transform: scale(0.9);
    background-color: darken($button-bg, 5%);
    box-shadow: 0 2px 25px rgba(255, 0, 130, 0.2);
  }
  
  &.animate{
    &:before{
      display: block;
      animation: topBubbles ease-in-out 0.5s forwards;
      -webkit-animation: topBubbles ease-in-out 0.5s forwards;
    }
    &:after{
      display: block;
      animation: bottomBubbles ease-in-out 0.5s forwards;
      -webkit-animation: bottomBubbles ease-in-out 0.5s forwards;
    }
  }
}


@-webkit-keyframes topBubbles {
  0%{
    background-position: 5% 90%, 10% 90%, 10% 90%, 15% 90%, 25% 90%, 25% 90%, 40% 90%, 55% 90%, 70% 90%;
  }
    50% {
      background-position: 0% 80%, 0% 20%, 10% 40%, 20% 0%, 30% 30%, 22% 50%, 50% 50%, 65% 20%, 90% 30%;}
 100% {
    background-position: 0% 70%, 0% 10%, 10% 30%, 20% -10%, 30% 20%, 22% 40%, 50% 40%, 65% 10%, 90% 20%;
  background-size: 0% 0%, 0% 0%,  0% 0%,  0% 0%,  0% 0%,  0% 0%;
  }
}

@-webkit-keyframes bottomBubbles {
  0%{
    background-position: 10% -10%, 30% 10%, 55% -10%, 70% -10%, 85% -10%, 70% -10%, 70% 0%;
  }
  50% {
    background-position: 0% 80%, 20% 80%, 45% 60%, 60% 100%, 75% 70%, 95% 60%, 105% 0%;}
 100% {
    background-position: 0% 90%, 20% 90%, 45% 70%, 60% 110%, 75% 80%, 95% 70%, 110% 10%;
  background-size: 0% 0%, 0% 0%,  0% 0%,  0% 0%,  0% 0%,  0% 0%;
  }
}

@keyframes topBubbles {
  0%{
    background-position: 5% 90%, 10% 90%, 10% 90%, 15% 90%, 25% 90%, 25% 90%, 40% 90%, 55% 90%, 70% 90%;
  }
    50% {
      background-position: 0% 80%, 0% 20%, 10% 40%, 20% 0%, 30% 30%, 22% 50%, 50% 50%, 65% 20%, 90% 30%;}
 100% {
    background-position: 0% 70%, 0% 10%, 10% 30%, 20% -10%, 30% 20%, 22% 40%, 50% 40%, 65% 10%, 90% 20%;
  background-size: 0% 0%, 0% 0%,  0% 0%,  0% 0%,  0% 0%,  0% 0%;
  }
}

@keyframes bottomBubbles {
  0%{
    background-position: 10% -10%, 30% 10%, 55% -10%, 70% -10%, 85% -10%, 70% -10%, 70% 0%;
  }
  50% {
    background-position: 0% 80%, 20% 80%, 45% 60%, 60% 100%, 75% 70%, 95% 60%, 105% 0%;}
 100% {
    background-position: 0% 90%, 20% 90%, 45% 70%, 60% 110%, 75% 80%, 95% 70%, 110% 10%;
  background-size: 0% 0%, 0% 0%,  0% 0%,  0% 0%,  0% 0%,  0% 0%;
  }
}

i {
  z-index:999;
}

.app-productCase2 {
  &__price {
    font-size: 1.4em;
  }

  &__image-background {
    height: 190px;
  }

  &__img {
    height: 190px;
  }
}

.model-detail-container {
  height: 100%;
  min-height: 100vh;
  padding-bottom: 20%;
  background-color: $white;
  overflow-y : hidden;
}

.alert {
  color: $primary;
  text-align: center;
  margin: 0;
  padding: 10px 0;
  position: fixed;
  top: 50%;
  width: 250px;
  font-size: 1em;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 3px 5px 10px #888888;
  z-index: 5;
}

.model {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  &__image {
    margin: 15px 0 15px 15px;
    width: 120px;
    height: 150px;
    object-fit: cover;
    border-radius: 10px;
  }

  &__model-info-container {
    margin: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 150px;
    width: 60%;
  }

  &__name {
    margin: 0;
    font-size: 1em;
    font-weight: 600;
  }
}

.model-info-container {
  padding: 10px 0;
  // width: 50%;
  // max-width: 500px;

  display: flex;
  justify-content: space-between;
}

.model-info {
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 0.7em;
  font-weight: 500;
  background-color: $white;
  border-radius: 4px;
  width: 49%;

  &__divider {
    padding: 5px 0;
    display: flex;
    justify-content: flex-start;
    align-content: center;
    align-items: center;
  }

  &__name {
    padding: 2px 0;
    width: 30%;
  }

  &__value {
    padding: 2px 0;
    width: 40%;
    min-width: 50px;
    background-color: $light-grey;
    border-radius: 10px;
    text-align: center;
    font-weight: 600;
    color: $grey;
  }
}

.button-container {
  padding-bottom: 20px;
  width: 100%;
  display: flex;
  background-color:#fff;
    &Scroll {
      width: 100%;
      background-color:#fff;
      display: flex;
      padding: 3% 12px;
      height:70px;
    }

    &Scroll--show{
       animation: showModelButtons ease-in-out 0.5s forwards;
      padding: 3% 0;
    }

    &Scroll--hide{
       animation: hideModelButtons ease-in-out 0.5s forwards;
      padding: 3% 12px;
    }

  }

@keyframes showModelButtons {
 from {
top:-50px
  }
  to{
top:0px
  }
}


@keyframes hideModelButtons {
 from {
top:0px
  }
  to{
    
  }
}


.button {
  margin-right: 5px;
  padding: 12px 0px;
  border-radius: 5px;
  width: 49%;
  background-color: $primary;
  color: $white;
  font-size: 0.9em;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;

  &__icon {
    margin-right: 5px;
    font-size: 1.2em;
  }

  &-follow {
    margin-left: 5px;
    padding: 12px 5px;
    border-radius: 5px;
    width: 49%;
    background-image: linear-gradient(to right, #eb3349, #f45c43);
    color: $white;
    font-size: 0.9em;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    position: relative;
  }

  &--secondary {
    background-color: $dark-grey;
  }
}

.masonry-container {
  margin: 20px 0 0 0;
  padding-bottom: 3%;
  width: 100%;
  justify-content: space-between;
}

.masonry-item {
  margin: 0 0 16px 3.5%;
  border: 0;
  font-size: 0.8em;
  width: 45%;
  transition: opacity 0.2s ease, box-shadow 0.2s ease;
  display: inline-block;
}

.more-button-container {
  width: 100%;
  display: flex;
  justify-content: center;
}

.more-button {
  padding: 7px 14px;
  border: 2px solid $grey;
  border-radius: 4px;
  font-size: 1em;
  font-weight: 600;
  color: $grey;
}

.spinner-continaer {
  padding-bottom: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
}

.model-main {
  position : relative;
  margin-top:300px;
  background-color: #FFFFFF;
  z-index: 3;
}

.main-image-container {
  width: 100%;
  max-width: 500px;
  height: auto;
  // position : fixed;
}

.main-image {
  width: 110%;
  height: 310px;
  background-color : #ececec;
  background-position: center;
  background-size:cover;
  background-repeat: no-repeat;
  position:fixed;
  z-index:1;
  transform: translateX(-50%);
	top: 0%;
	left: 50%;
  max-width: 200%;
}



.back-button {
  top: 12px;
  position: fixed;
  left: 7px;
  width: 35px;
  height: 35px;
  padding: 5px;
  z-index:2;
  animation-name : backButton;
      animation-duration: 0.2s;
      animation-delay: 1s;
      animation-fill-mode: both;
      @keyframes backButton {
        0% {
          opacity:0;
        }
        100% {
          opacity:1;
        }
      }

  &--modify {
    font-weight: 800;
    width:15px;
  }

  &--container{
    margin-top: 15px;
    position:absolute;
    left:6%;
    width:11px;
  }
}

.balloon 
  {
	z-index:100;
	position: relative;
	height: auto;
	padding: 5% 3%;
	background: #f1f1f1;
	border-radius: 5px;
	border: #f1f1f1 solid 1px;
	position: absolute;
	font-size: 13px;
	text-align: center;
  width:95%;
	}
	
	.balloon:after 
	{
	content: '';
	position: absolute;
	border-style: solid;
	border-width: 0 8px 20px 8px;
	border-color: #f1f1f1 transparent;
	display: block;
	width: 0;
	z-index: 1;
	top: -20px; 
	left: 17px; 
	}
	
	.balloon:before 
	{
	content: '';
	position: absolute;
	border-style: solid;
	border-width: 0 8px 20px 8px;
	border-color: #f1f1f1 transparent;
	display: block;
	width: 0;
	z-index: 0;
	top: -20px;
	left: 17px;
	}


.model-profile {
  padding: 10px 10px;
  display: flex;

  &-sentence {
      padding: 10px 10px;
      display: flex;
      margin-top : 3%;
      margin-bottom: 20%;
  }

  &__profile-image {
    margin-right: 10px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
    object-position: -20% 0;
  }

  &__info {
    padding: 0 5px;
    width: 160px;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }

  &__name {
    margin-right: 10px;
    margin-bottom: 5px;
    font-size: 1em;
    font-weight: 700;
  }

  &__height {
    margin-right: 10px;
    font-size: 0.9em;
    font-weight: 700;
  }

  &__shop {
    margin-right: 10px;
    color: $grey;
    font-size: 0.8em;
    font-weight: 500;
  }

  &__tags {
    padding: 0 5px;
    width: 160px;
    display: flex;
    justify-content: flex-start;
    align-items: baseline;
  }

  &__tag {
    margin-right: 5px;
    border-radius: 5px;
    padding: 2px 5px;
    background-color: $light-grey;
    color: #666666;
    font-size: 0.8em;
    font-weight: 700;
  }
}

.model-body-info {
  padding: 10px 10px;
  width: 100%;
  max-width: 500px;
  display: flex;
  justify-content: space-around;

  &__item {
    width: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  &__type {
    margin-bottom: 3px;
    color: $grey;
    font-size: 0.8em;
  }

  &__icon {
    margin-bottom: 3px;
    font-size: 1.2em;
  }

  &__value {
    font-size: 0.8em;
    font-weight: 700;
  }
  &__icons > img {
    width: 40px;
  }
}

.model-profile1 {
  padding: 20px 10px 10px 10px;
}

.model-description1 {
  top: 200px;
  left: 20px;
  font-size: 1.7em;
  color: #000000;
  font-weight: 700;
  letter-spacing: -0.03em;
  text-indent: 0px !important;
  text-align: left !important;
}

.model-description {
  //이 페이지에는 사용하지 않음.
  position: absolute;
  top: 200px;
  left: 20px;
  font-size: 1.2em;
  color: $white;
  font-weight: 700;
}

.styling-images-container {
  padding: 0 0 0 10px;
  height: 150px;
  margin-bottom: 10px;
  margin-top: 20px;
  // position:relative;

  span {
    color: $primary;
    font-weight: 700;
    font-size: 1em;
  }

  &__name {
    color: $dark-grey !important;
    margin-bottom: 20px;
  }
}

.styling-images {
  padding: 0 0 0 14px;
  white-space: nowrap;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
  position: absolute;
  right: 2px;
  width: 100%;
  background-color: $white;

  &::-webkit-scrollbar {
    display: none;
  }

  img {
    margin: 5px 10px 0 0;
    width: 135px;
    height: 135px;
    object-fit: cover;
    border-radius: 8px;
    z-index: 1;
    position : relative;
  }
}

.model__masonry {
  border-top : 10px solid #ececec;
  padding-top : 20px;
  &__product {
    padding: 0px 10px;
    height: 150px;
    margin-bottom: 40px;

    color: $primary;
    font-weight: 700;
    font-size: 1em;

    color: $dark-grey !important;
  }
}
</style>