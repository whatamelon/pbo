<template>
<transition>

    <main class="home-container">

    <div class="review-modal" 
    id="reviewModal"
    v-show="SHOW_REVIEW_MODAL == true">


        <div class="review-modal__second" v-if="REVIEW_ID == '1'">
            <img src="/app/black_logo_big.png" class="fitchooLogo"/>
            <span class="goMin1">어때요?</span>
            <span class="goMin2">FITCHOO 사용해보니 어떠세요?</span>
            <div class="modalButtons">
              <button class="modalClose2" @click="modalGo('3')">그냥 그래요</button>
              <button class="modalGo" @click="modalGo('1')">잘 쓰고 있어요</button>
            </div>
        </div>

        <div class="review-modal__second" v-else-if="REVIEW_ID == '2'">
            <img src="/app/reviewGet.png" class="reviewGet"/>
            <span class="goMin1">앱 리뷰를 남겨주세요.</span>
            <span class="goMin2">FITCHOO팀에게 큰 힘이 될 거예요!</span>
            <div class="modalButtons">
              <button class="modalClose2" @click="modalClose2('1')">다음에 할래요</button>
              <button class="modalGo" @click="modalGo('2')">리뷰를 남길래요</button>
            </div>
        </div>

        <div class="review-modal__second" v-else>
            <img src="/app/We_need_yourfeedback.png" class="feedGet"/>
            <span class="goMin1">피드백을 남겨주세요.</span>
            <span class="goMin2">사용하시면서 개선이 필요한 부분을 가감없이 알려주세요.<br/>
            서비스 개발에 적극 반영할게요!
            </span>
            <form class="reviewForm">
             <textarea 
                    cols="20" 
                    rows="3" 
                    maxlength="150"
                    v-model="suggestForm.value1" 
                    autofocus 
                    required 
                    wrap="hard" 
                    class="review-feedBack"
                    name="bodytypeInput"
            ></textarea>
            </form>
            <div class="modalButtons2">
              <button class="modalGo2" @click="sendFeedBack">피드백 보내기</button>
              <button class="modalClose" @click="modalClose2('2')">다음에 할래요</button>
            </div>
        </div>

    </div>
    <div class="modalBackdrop" v-show="SHOW_REVIEW_MODAL == true"></div>
   

<GoUpButton></GoUpButton>
<div v-show="!isRecentList">
        <div class="home-title">최근 본 큐레이션😎</div>
        <div class="list-container">
        <HomeList
            v-for="curate in recentQs" 
            :key="curate.qitemId"
            :curate="curate"
            :type="'3'">
          </HomeList>
          </div>
</div>
          
        <div class="home-title">인기 큐레이션😍</div>
        <div class="list-container">
        <HomeList
            v-for="curate in Q_POP_LIST" 
            :key="curate.qitemId"
            :curate="curate"
            :type="'1'">
          </HomeList>
          </div>
          
        <div class="home-title">새로운 큐레이션🤗</div>
        <div class="list-container">
        <HomeList
            v-for="curate in Q_NEW_LIST" 
            :key="curate.qitemId"
            :curate="curate"
            :type="'2'">
          </HomeList>
          </div>

          <div class="home-newQurators">
            <div class="home-quratorTitle">큐레이터</div>
            <div v-for="num in randomNumArr">
                <img :src="modiImg(num)" class="home-quratorImg" @click="goToQurator(num)"/>
            </div> 
            </div>

        <div class="home-title2">큐레이션 둘러보기😜</div>

        <HomeCard 
          v-for="curate in Q_LIST" 
          :key="curate.qitemId"
          :curate="curate"
        ></HomeCard>

    </main>
</transition>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import HomeList from "@/components/Home/HomeList";
import HomeCard from "@/components/Home/HomeCard";
import GoUpButton from "@/components/App/GoUpButton";

export default {
    components: {
      HomeCard,
      HomeList,
      GoUpButton
    },

  transition (to) {
    if (localStorage.getItem("backButton")){
    return 'slideLeft'
    }
    else if (
              to.name == "curate-id" ||
              to.name == "curate-height" ||
              to.name == "curate-follow" ||
              to.name == "curate-bodytype" ||
              to.name == "saved") {
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

  data() {
    return {
        quname: '',
        suggestForm : {
          height: this.$store.getters.USER_HEIGHT,
          eventCode: this.userEvent,
          value1: "",
          value2:"finish"
        },
      link:"madeleine://picklingdev.com?pick=1",
      cardSpinning:false,
      moreCards: true,
      height: localStorage.getItem("height"),
      models: this.$store.getters.MODELS,
      sorryMessage:
        "입력하신 키의 모델 상품이 아직 없어요. ㅠㅠ \n 조금만 기다려주세요! 폭풍업뎃중!",
      sorryMessageModel :
        "입력하신 키의 모델이 아직 없어요. ㅠㅠ \n 조금만 기다려주세요! 폭풍업뎃중!"
    };
  },

   computed: {
    ...mapGetters([
      "Q_LIST",
      "Q_POP_LIST",
      "Q_NEW_LIST",
      "Q_RECENT_LIST",
      "RELOAD",
      "REVIEW_ID",
      "SHOW_REVIEW_MODAL",
      "MODELS",
      "USER_EMAIL",
      "USER_HEIGHT",
      "USER_EVENT_CODE",
      "IMAGE_URL",
    ]),

    reviewId() {
      return this.$store.getters.REVIEW_ID;
    },

    randomNumArr() {
      var quratorRandomArr = Array(6,7,8,9);
      quratorRandomArr.sort(function(){
          return Math.random() - Math.random();
      });
      console.log(quratorRandomArr);
      return quratorRandomArr;
    },

    userEvent() {
      const latte = this.$store.getters.USER_EVENT_CODE;
      console.log(latte)
      if(latte == null || latte == "") {
        return 'none';
      }
      else {
      for(const i =0; i < latte.length; i++) {
        if (latte[i] == 'q20r01' || latte[i] == 'q20r02') {
          return latte[i];
          break;
        }
        else {
          return 'none';
          break;
        }
      }
      }
    },

    isRecentList() {
      return JSON.parse(localStorage.getItem("recentQ")) == 0 ? true : false;
    },

    recentQs() {
      return JSON.parse(localStorage.getItem("recentQ"));
    }
  },

    
  async asyncData({ store, to }) {

    function callbackAuthToken(token){
    window.AuthToken = token;
    localStorage.setItem("accessToken", token);
  }

  function callbackHeight(height){    
    window.Height = height;
    const getHeight = JSON.parse(height);
        store.dispatch("setHeight", height);
  }

  window.callbackAuthToken = callbackAuthToken;
  window.callbackHeight = callbackHeight;
    
     await store.dispatch("test");

    await store.dispatch("setUserInfo");
    await store.dispatch("setFollowingModels");
    await store.dispatch("getSavedProducts");
      store.dispatch("resetFilter");

    store.dispatch("setCurrentRoute", "/home");
    const params = {
      offset : 0,
      limit : 10
    }
    if(localStorage.getItem("previousPage")=="curate-id") {
    } else {
      store.dispatch("setQoffset",0);
      await store.dispatch("getQurateList", params);
    }
    
    const height = localStorage.getItem("height");
      function heightRangeCalculator(range = 0, height = 0) {
        const min = parseInt(height) - range;
        const max = parseInt(height) + range;
        const heightRange = min + "r" + max;
        return heightRange;
      }
  },

created() {
    const user_id = JSON.stringify(this.$store.getters.USER_ID);
    if(user_id != null || user_id != '') {
      this.$amplitude.getInstance().setUserId(user_id);
      console.log(user_id)
    }
    const userFollowings = {
      followingModels: this.$store.getters.FOLLOWING_MODELS.length
    };
    const userSavedproducts = {
      savedProducts: this.$store.getters.SAVED_PRODUCTS.length
    };
    this.$amplitude.getInstance().setUserProperties(userFollowings);
    this.$amplitude.getInstance().setUserProperties(userSavedproducts);

    this.$amplitude.getInstance().logEvent("page view home");

    this.$store.dispatch('resetQurateHistory');

    if(localStorage.getItem("updateModal") == "1") {

    } else {
      this.$store.dispatch("updateModal", true);
    }

    if (localStorage.getItem("recentModelId") != 0) {
    const recentModelId = JSON.parse(localStorage.recentModelId);
    recentModelId.length = 0;
    localStorage.recentModelId = JSON.stringify(recentModelId);
    }
    else {}

    if (localStorage.getItem("recentProductId") != 0) {
    const recentProductId = JSON.parse(localStorage.recentProductId);
    recentProductId.length = 0;
    localStorage.recentProductId = JSON.stringify(recentProductId);
    }
    else {}
    if(localStorage.getItem("recentQ")) {
      
    }else {
      localStorage.setItem("recentQ", "[]");
    }

    if(this.userEvent == "q20r01" || this.userEvent == "q20r02") {
          this.$store.dispatch("setReviewId","1");
          this.$store.dispatch("openReviewModal");
          this.$amplitude.getInstance().logEvent("pageview reviewAsk");
        if(this.$store.getters.SHOW_REVIEW_MODAL == true) {
          $('body').addClass('scrollOff').on('scroll touchmove mousewheel', function(e){
              e.preventDefault();
          });
        }
    }
    window.addEventListener("scroll", this.homeBottom);
},

  beforeMount() {
    if(localStorage.getItem("previousPage")=="search") {
        this.$store.dispatch("notSearching");
    }
    else if(localStorage.getItem("previousPage").includes("curate")) {
      this.$store.dispatch("resetFilter");
    }
  },

mounted() {
  console.log(this.userEvent)
    this.$store.dispatch("setLogo","hasLogo");
    localStorage.removeItem("backButton");

},

methods:{

  goToQurator(num) {
    if(num == 6) {
      this.quname = '민송';
    } else if(num == 7){
      this.quname = '하티';
    }else if(num == 8){
      this.quname = '해피소민';
    }  else {
      this.quname = '민또링';
    }
      this.$amplitude.getInstance().logEvent("click curatorProfile", {curatorName: this.quname});
      this.$router.push('/qurator/'+num);
  },

    modiImg(num) {
      return '/qurators/' + num +'.png';
    },

  async homeBottom() {
       if (
            window.innerHeight + window.scrollY >= document.body.offsetHeight-100 &&
            !this.cardSpinning &&
            this.moreCards
       ) {
         this.cardSpinning = true;
         await this.getMoreCards();
        this.$amplitude.getInstance().logEvent("reload curation");
       }
  },
  
    getMoreCards() {
      return new Promise(async (resolve, reject) => {
        try {
            await this.$store.dispatch(
              "setQoffset",
              this.$store.getters.Q_OFFSET + 10
            );
            const response = await this.$store.dispatch("addQurateList");
            const noMoreQList = response.result.qitemList;
            if (noMoreQList.length == 0) {
                this.moreCards = false;
            }
          this.cardSpinning = false;
            resolve();
        } catch (error) {
          this.cardSpinning = false;
          reject(error);
        }
      });
    },

    sendFeedBack(){
      this.$amplitude.getInstance().logEvent("click sendFeedback");
      console.log(this.userEvent)
      if(this.suggestForm.value1 == "") {
        const suggestForm2 = {
          height: this.$store.getters.USER_HEIGHT,
          eventCode: this.userEvent,
          value1: "no",
          value2:""
        };
        const userSuggest3 = JSON.parse(JSON.stringify(suggestForm2));
        console.log(userSuggest3)
      this.$store.dispatch("pushUserSuggest", userSuggest3);
      this.$store.dispatch("closeReviewModal");
      } else {
        const suggestForm3 = {
          height: this.$store.getters.USER_HEIGHT,
          eventCode: this.userEvent,
          value1: this.suggestForm.value1,
          value2:""
        };
        const userSuggest = JSON.parse(JSON.stringify(suggestForm3));
        console.log(userSuggest)
      this.$store.dispatch("pushUserSuggest", userSuggest);
      this.$store.dispatch("closeReviewModal");
      }
    },

    modalGo(no) {
      const reviewCont = document.getElementById("reviewModal");
      if(no =="1") { 
        this.$amplitude.getInstance().logEvent("click good");
        this.$store.dispatch("setReviewId","2");
      } else if(no == "2") {
        this.$amplitude.getInstance().logEvent("click nowWrite");
        const suggestForm5 = {
          height: this.$store.getters.USER_HEIGHT,
          eventCode: this.userEvent,
          value1: "no",
          value2:"finish"
        };
        const userSuggest2 = JSON.parse(JSON.stringify(suggestForm5));
        console.log(userSuggest2)
      this.$store.dispatch("pushUserSuggest", userSuggest2);
        if (window.AppType == "android3" ||window.AppType == "android" ) {
          window.fcjs_if.doReview()
          }
          if(window.AppType == "ios3" || window.AppType == "ios"){
            window.webkit.messageHandlers.doReview.postMessage("")
          }
        this.$store.dispatch("closeReviewModal");
        $('body').removeClass('scrollOff').off('scroll touchmove mousewheel');
      } else {
        this.$amplitude.getInstance().logEvent("click soso");
        reviewCont.classList.add("review-modal2");
        this.$store.dispatch("setReviewId","3");
      }
    },

    modalClose2(no) {
      if(no == "1") {
        this.$amplitude.getInstance().logEvent("click 1stNextTime");
        const suggestForm10 = {
          height: this.$store.getters.USER_HEIGHT,
          eventCode: this.userEvent,
          value1: "no",
          value2:"cancel"
        };
        const userSuggest10 = JSON.parse(JSON.stringify(suggestForm10));
        console.log(userSuggest10)
      this.$store.dispatch("pushUserSuggest", userSuggest10);
      } else {
        this.$amplitude.getInstance().logEvent("click 2ndNextTime");
        const suggestForm3 = {
          height: this.$store.getters.USER_HEIGHT,
          eventCode: this.userEvent,
          value1: "no",
          value2:"cancel"
        };
        const userSuggest7 = JSON.parse(JSON.stringify(suggestForm3));
        console.log(userSuggest7)
      this.$store.dispatch("pushUserSuggest", userSuggest7);
      }
      this.$store.dispatch("closeReviewModal");
      $('body').removeClass('scrollOff').off('scroll touchmove mousewheel');
    }
},

  beforeRouteLeave(to, from, next) {
      window.removeEventListener("scroll", this.homeBottom);
    localStorage.setItem("routerStack",this.$route.path);
    next();
  }
}
</script>

<style lang="scss" scoped>
.scrollOff{
  position:fixed;
  overflow:hidden;
  height:100%;
}
.list-container{
        display: flex;
        overflow: -moz-scrollbars-none;
        width : 103% !important;
        display:flex;
        overflow-x: auto;
        overflow-y: hidden;
        margin:0 0 5% -12px;
        padding-left: 12px;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none;
        &::-webkit-scrollbar {
            display : none;
            width:0px;
        }
}
.home-title{
  padding: 7% 5% 1% 5%;
  font-size: 1.5em;
  font-weight: 800;
}
.home-title2{
  padding: 7% 5% 4% 5%;
  font-size: 1.5em;
  font-weight: 800;
}
.modalBackdrop{
    left:0;
    top:0;
    width:100%;
    height:100%;
    position:fixed;
    background-color:rgba(0, 0, 0, 0.5);
    z-index:105;
}
.review-modal{
    position:fixed;
    width:90%;
    height:330px;
    z-index:106;
    background-color: #ffffff;
    top:15%;
    left:5%;
    border-radius: 10px;
    &__second{
        padding:20% 4% 1% 4%;
        display: grid;
        text-align: center;
    }
}
.review-modal2{
    position:fixed;
    width:90%;
    transition: height 0.2s ease;
    height:530px;
    z-index:106;
    background-color: #ffffff;
    top:8%;
    left:5%;
    border-radius: 10px;
    &__second{
        padding:20% 4% 1% 4%;
        display: grid;
        text-align: center;
    }
}
.review-feedBack{
  width:100%;
  height:150px;
  border-radius: 10px;
  border: 1px solid #ececec;
  position: relative;
  top:-15px;
  padding:5px 0 0 5px;
}
.okgotit{
    width:100%;
    height:auto;
    margin:7% 0 7% 0;
}
.fitchooLogo{
    width:60%;
    height:auto;
    margin:9% auto;
}
.reviewGet{
    width:70%;
    height:auto;
    margin:0 auto;
}
.feedGet{
    width:60%;
    height:auto;
    margin:0 auto;
}
.goMin1{
    font-weight: 800;
    font-size: 1.2em;
    color:#000000;
    margin:2% 0 4% 0;
    text-align: center;
}
.goMin2{
        font-size:0.85em;
        color:#555;
        letter-spacing: -0.5px;
        line-height: 2;
        margin-bottom: 10%;
}
.modalButtons{
  display: flex;
  width:100%;
  justify-content: space-between;
}
.modalButtons2{
  display: grid;
  width:100%;
}
.modalGo{
    width:49%;
    height:45px;
    background-color: $primary;
    color:#fff;
    font-size: 1em;
    font-weight: 800;
    border-radius: 5px;
}
.modalGo2{
    width:100%;
    height:45px;
    background-color: $primary;
    color:#fff;
    font-size: 1em;
    font-weight: 800;
    border-radius: 5px;
    margin-bottom: 3%;
}
.modalClose{
    width:100%;
    height:45px;
    background-color: #ececec;
    color:#a9a9a9;
    font-size: 1.1em;
    font-weight: 800;
    border-radius: 5px;
}
.modalClose2{
    width:49%;
    height:45px;
    background-color: #ececec;
    color:#a9a9a9;
    font-size: 1em;
    font-weight: 800;
    border-radius: 5px;
}

@media all and (min-width : 400px){
  .review-modal{
      height:350px;
  }
  .review-modal2{
      height:550px;
  }
}


.home-container{
  margin-bottom:100px;
}

.home-newQurators{
  display: grid;
  width:100%;
  padding: 5%;
}
.home-quratorImg{
  width: 100%;
  position: relative;
}

.home-quratorTitle{
  font-size: 1.5em;
  font-weight: 800;
}


</style>