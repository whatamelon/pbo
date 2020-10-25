<template>

    <main class="home-container">

   

  <GoUpButton></GoUpButton>

    <div class="infoN__container" v-if="this.plzLogout == true">
      <p class="infoN__title">페이지가 안나오시나요? <br/> 로그아웃 후 로그인을 해보세요.</p>
    </div>

    <div class="infoN__container" v-else-if="this.$store.getters.IS_INFO == 'n'">
      <p class="infoN__title">아직 프로필을 등록 하지 않으셨군요? 🤭<br/>프로필을 등록하고 활동을 시작해보세요!</p>

      <div class="infoN__goRegister" @click="goRegister">프로필 등록하러 가기!</div>
    </div>
    <div v-else>
      <p class="infoN__title" style="margin-top:30px">반갑습니다! {{ this.$store.getters.USER_GRP1.nameReal }}님 👋</p>
      <p class="infoN__title">{{ this.hello }}</p>

              <div class="qI-head">
            <div class="qI-head1">
                <div class="qI-headContainer">
                    <img class="qI-headImage" :src="IMAGE_URL + USER_GRP5.imgLinkTitle" />
                    <div class="qI-headInfo">
                        <p class="qI-name">{{ USER_NICKNAME }}</p>
                        <div class="ql-sns">
                            <img class="qI-instar" src="/app/color_insta.png"  v-show="USER_GRP1.isInst == 'y'"/>
                            <img class="qI-instar" src="/app/youtube_icon.png"v-show="USER_GRP1.isYout == 'y'"/>
                        </div>
                    </div>
                </div>
            </div>
            <div class="qI-head2">
                <div class="qI-bodyInfo">
                    <div class="bodyInfo__container">
                        <span class="bodyInfo__value1">{{ USER_GRP2.sizeHeight }}</span>
                        <span class="bodyInfo__key">키</span>
                    </div>
                    <div class="bodyInfo__container">
                        <span class="bodyInfo__value1">{{ USER_GRP2.sizeTop }}</span>
                        <span class="bodyInfo__key">상의</span>
                    </div>
                    <div class="bodyInfo__container">
                        <span class="bodyInfo__value1">{{ USER_GRP2.sizeBottom }}</span>
                        <span class="bodyInfo__key">하의</span>
                    </div>
                    <div class="bodyInfo__container">
                        <span class="bodyInfo__value1">{{ USER_GRP2.sizeFoot }}</span>
                        <span class="bodyInfo__key">신발</span>
                    </div>
                    <div class="bodyInfo__container">
                        <span class="bodyInfo__value2">{{ USER_GRP2.sizeShoulder }}</span>
                        <span class="bodyInfo__key">어깨</span>
                    </div>
                    <div class="bodyInfo__container">
                        <span class="bodyInfo__value2">{{ USER_GRP2.sizePelvis }}</span>
                        <span class="bodyInfo__key">골반</span>
                    </div>
                </div>
                <div class="qI-subtitle">{{ USER_GRP2.myExp }}</div>
            </div>
        </div>

        <div class="qI-middle">
            <span class="photo-title">사진</span>
            <span class="photo-info">{{ USER_GRP2.styleExp }}</span>

            <div class="styling-images-container">
                <div ref="vueViewer" v-viewer class="styling-images" @click="clickViewer">
                    <img v-for="img in USER_GRP5.imgLink" :src="IMAGE_URL + img"/>
                </div>
            </div>

            <div class="tag-container">
                <div class="tag-title">자주 입는 스타일</div>
                <div class="tags">
                    <div class="tag" style="background-color:#0091ff; color: #fff;"
                    v-for='style1 in splitLikeBrand(USER_GRP3.styleLike)' 
                    >{{ style1 }}</div>
                </div>

            <div class="tag-title">절대 안 입는 스타일</div>
            <div class="tags">
                <div class="tag"style="background-color:#ff4866; color: #fff;"
                v-for='style2 in splitLikeBrand(USER_GRP3.styleDislike)' 
               >{{ style2 }}</div>
            </div>

            <div class="tag-title">좋아하는 브랜드</div>
            <div class="tags">
                <div class="tag"
                 v-for='brand in splitLikeBrand(USER_GRP3.likeBrand)' 
                 :style="{color:'#888888', backgroundColor:'#ececec'}">{{ brand }}</div>
            </div>
            <div class="tag-title">자주 가는 쇼핑몰</div>
            <div class="tags">
                <div class="tag" 
                v-for='brand in splitLikeBrand(USER_GRP3.likeMall)'
                 :style="{color:'#888888', backgroundColor:'#ececec'}">{{ brand }}</div>
            </div>

        </div>
        </div>

        <div class="changeProfileButton" @click="goToChangeProfile">
            프로필 수정하기
        </div>


    </div>

    <!-- <div @click="getChannelID">api 가져오기</div> -->

    </main>
</template>

<script>
import axios from "axios";
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
    };
  },

   computed: {
    ...mapGetters([
      "IS_INFO",
      "USER_NICKNAME",
      "USER_GRP1",
      "USER_GRP2",
      "USER_GRP3",
      "USER_GRP4",
      "USER_GRP5",
      "IMAGE_URL",
      "YOUTUBE_KEY"
    ]),

    hello() {
      var d = new Date().getHours();
      var hello = '';

      if(6<= d && d < 11) {
        hello = "좋은 아침이에요!"
      } else if(11 <= d && d < 14) {
        hello = "맛있는 점심 드세요!"
      } else if(14 <= d && d < 18) {
        hello = "즐거운 오후되세요!"
      } else if(18 <= d && d < 22) {
        hello = "맛있는 저녁 드세요!"
      } else if(22 <= d && d < 1) {
        hello = "좋은 밤 되세요!"
      } else if(1 <= d&& d  < 6) {
        hello = "은은한 새벽이에요!"
      } else {
        hello = ""
      }
        return hello;
      }

  },

    
  async asyncData({ store, to }) {
      var isTrue = false;

    await store.dispatch("getUserInfo").then((response) => {
        if(response == 200) {
            isTrue= false;
        } else {
            isTrue= true;
        }
    })
    .catch((e) => {
            isTrue= true;
    })
    store.dispatch("setCurrentRoute", "/home");

    return {
        plzLogout:isTrue,
    };
  },

created() {
},

  beforeMount() {
  },

mounted() {
    this.$store.dispatch("setLogo","hasLogo");
    localStorage.removeItem("backButton");
        const viewerFooter = this.$refs.vueViewer;
},

methods:{

  goRegister() {
        this.$router.push('/register');
  },

    splitLikeBrand(brand) {
        var names = brand;
        var nameArr = names.split(',');
        return nameArr;
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

        goToChangeProfile() {
            this.$router.push('/editProfile');
        }

  // getChannelID() {

  //       var ax = axios.create();

  //       ax.defaults.timeout = 12000;
  //       var returns = ax.get(`https://www.googleapis.com/youtube/v3/channels/`, { 
  //         'part': 'snippet, id',                              
  //         'forUsername': '옥개 나라',                         
  //         'key': 'AIzaSyDtTuarkPKVdydjAaL0jI9m5iUZ0qwVLoM'
  //         }
  //     );

  //         console.log(returns);
  // },

  
},

  beforeRouteLeave(to, from, next) {
    localStorage.setItem("routerStack",this.$route.path);
    next();
  }
}
</script>

<style lang="scss" scoped>
.home-container{
  margin-bottom:100px;
  height:100%;
  max-width: 500px;
  width: 100%;
}

.infoN {
  &__container{
    margin-top: 20%;
  }
  &__title{
    text-align: center;
    margin: 0 auto;
    font-size: 1.2em;
    font-weight: 700;
  }

  &__goRegister{
    margin: 50px auto 0 auto;
    background-color: #fff;
    color: #000;
    border: 2px solid #000;
    border-radius: 5px;
    font-size: 1.1em;
    font-weight: 600;
    text-align: center;
    width: 300px;
    height:50px;
    padding: 10px;
  }
}

.qI {
    &-head{

    }
    &-head1{
        display: flex;
    }

    &-backButton-container{
        position: fixed;
        border-radius: 50%;
        width: 30px;
        height:30px;
        background-color: #ffffff;
        margin: 8% 0 0 15px;
        box-shadow: 0px 0px 15px 3px rgba(0, 0, 0, 0.2);
        z-index: 999;
    }

    &-backButton{
        margin: 3px 0 0 7px;
        width:10px;
        height:20px;
        position: relative;
    }

    &-headContainer{
        display: grid;
        justify-content: center;
        text-align: center;
        margin:5% auto;
    }

    &-headImage{
        margin:0 auto 5% auto;
        width:160px;
        height:auto;
    }

    &-headInfo{
        margin: 0 auto 3% auto;
        display: grid;
        line-height: 1.1;
    }

    &-name{
        font-size: 1.5em;
        font-weight: 800;
        position: relative;
        margin-right: 5%;
        width:300px;
    }

    &-sns{
        display: flex;
    }

    &-instar{
        width: 25px;
        height:25px;
        margin: 0 5%;
    }

    &-curator{
        font-size: 0.9em;
        font-weight: 500;
        color: #a9a9a9;
        margin-bottom: 7%;
    }

    &-headTag-container{
        display: flex;
        margin:0 auto 5% auto;
    }

    &-headTags{
        margin: 0 5px;
        border-radius: 10px;
        background-color: #ececec;
        padding: 5px 9px;
        font-weight: 500;
        font-size: 0.9em;
    }


    &-head2{
        display: grid;
    }

    &-bodyInfo{
        display: flex;
        margin:0;
        justify-content: start;
    }

    &-bodyInfo-index{
        margin: 0 5px;
        text-align: center;
    }

    &-bodyInfo-value{
        width:50px;
        height:50px;
        display: table-cell;
        vertical-align: middle;
    }

    &-bodyInfo-value > span {
        font-size: 1.3em;
        font-weight: 800;
    }

    &-bodyInfo-key{
        font-size: 0.9em;
        font-weight: 600;
        color:#a9a9a9;
    }

    &-subtitle{
        padding: 7% 3% 5% 3%;
        font-size: 1em;
        font-weight: 500;
        color:#a9a9a9;
        border-bottom: 1px solid #ececec;
        max-width: 360px;
    }

    &-middle{
        padding: 5% 3%;
        display: grid;
        border-bottom: 1px solid #ececec;
    }
}

.qI-bodyInfo-index:nth-child(5) > .qI-bodyInfo-value > span {
    font-size: 0.9em;
    line-break: strict;
    font-weight: 800;
    vertical-align: middle;
    line-height: 145%;
    display: block;
}
.qI-bodyInfo-index:nth-child(6) > .qI-bodyInfo-value > span {
    font-size: 0.9em;
    line-break: strict;
    font-weight: 800;
    vertical-align: middle;
    line-height: 145%;
    display: block;
}

.photo {
    &-title{
        font-size: 1.2em;
        font-weight: 800;
        margin: 0 0 3% 0;
    }

    &-info{
        font-size: 1em;
        font-weight: 500;
        color:#a9a9a9;
        max-width: 360px;
    }
}

.styling-images {
    display: block;

    &-container{
        margin-top: 3%;
    }

  img {
    margin: 1.5% 1.5% 1.5% 0.5%;
    width: 30.5%;
    height:110px;
    object-fit: cover;
    border-radius: 8px;
    z-index: 1;
    position : relative;
  }
}

.tag{
    display: inline-block;
    margin: 0 2% 2% 0;
    border-radius: 7px;
    padding: 5px 9px;
    font-weight: 500;
    font-size: 0.9em;

    &-container {
        margin: 5% 0;
    }

    &-title {
        font-size: 1.2em;
        font-weight: 800;
        margin: 3% 0 3% 0;
    }

    &s{
        margin: 0 0 20px 0;
    }
}

.qu{
    &-container{
        margin: 5% 3% 10% 3%
    }

    &-title{
        font-size: 1.5em;
        font-weight: 800;
        margin-bottom: 5%;
    }

    &-qurations{

    }
}

.bodyInfo{
    &__container{
        display: grid;
        width: 60px;
    }

    &__value1{
        font-size: 1.4em;
        font-weight: 800;
        text-align: center;
        height:40px;
    }

    &__value2{
        font-size: 0.9em;
        font-weight: 800;
        text-align: center;
        height:40px;
    }


    &__key{
        margin-top: 10px;
        font-size: 0.9em;
        font-weight: 500;
        color:grey;
        text-align: center;
    }
}

.changeProfileButton{
    margin-top: 30px;
    margin-left: 7%;
    width: 86%;
    max-width: 500px;
    text-align: center;
    padding: 3% 0;
    font-size: 1.1em;
    font-weight: 800;
    background-color: #000;
    color:#fff;
    border-radius: 10px;
}

</style>