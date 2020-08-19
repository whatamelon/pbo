<template>
    <main class="qI-main">
        <div class="qI-head">
            <div class="qI-head1">
                <div class="qI-backButton-container">
                    <i class="material-icons qI-backButton" @click="goBack()">
                        arrow_back_ios
                    </i>
                </div>
                <div class="qI-headContainer">
                    <img class="qI-headImage" :src="IMAGE_URL + Q_USER_IMG_LINK_TITLE" />
                    <div class="qI-headInfo">
                        <span class="qI-name">{{ Q_USER_NAME }}</span>
                        <div v-for="sns in Q_USER_SNS" class="ql-sns">
                            <img class="qI-instar" src="/app/color_insta.png"  
                            v-if="sns.snsType == 'inst'" @click="goToSNS('inst', sns.snsLink)"/>
                            <img class="qI-instar" src="/app/youtube_icon.png"
                              v-else @click="goToSNS('yout', sns.snsLink)"/>
                        </div>
                    </div>
                    <span class="qI-curator">{{ Q_USER_DEPARTMENT }}</span>
                    <div class="qI-headTag-container">
                        <div v-for="tag in Q_USER_TAG_LIST" class="qI-headTags">#{{ tag }}</div>
                    </div>
                </div>
            </div>
            <div class="qI-head2">
                <div class="qI-bodyInfo">
                    <div class="qI-bodyInfo-index" v-for="info in Q_USER_INFO">
                        <div class="qI-bodyInfo-value" >
                            <span v-html="info.value"></span>
                        </div>
                        <div class="qI-bodyInfo-key"><span>{{ info.key }}</span></div>
                    </div>
                </div>
                <div class="qI-subtitle">{{ Q_USER_MY_EXP }}</div>
            </div>
        </div>

        <div class="qI-middle">
            <span class="photo-title">사진</span>
            <span class="photo-info">{{ Q_USER_STYLE_EXP }}</span>

            <div class="styling-images-container">
                <div ref="vueViewer" v-viewer class="styling-images" @click="clickViewer">
                    <img v-for="img in Q_USER_IMG_LIST" :src="IMAGE_URL + img"/>
                </div>
            </div>

        <div v-show="Q_USER_LSTYLE != null">
            <div class="tag-container">
                <div class="tag-title">자주 입는 스타일</div>
                <div class="tags">
                    <div class="tag"
                    v-for='style in Q_USER_LSTYLE' 
                    :style="{color:modiColor(style.colorText), backgroundColor:modiColor(style.colorBg)}">{{ style.style }}</div>
                </div>
        </div>

        <div v-show="Q_USER_DSTYLE != null">
            <div class="tag-title">절대 안 입는 스타일</div>
            <div class="tags">
                <div class="tag"
                v-for='style in Q_USER_DSTYLE' 
                :style="{color:modiColor(style.colorText), backgroundColor:modiColor(style.colorBg)}">{{ style.style }}</div>
            </div>
        </div>
            <div class="tag-title">좋아하는 브랜드</div>
            <div class="tags">
                <div class="tag" v-for='brand in splitLikeBrand(Q_USER_LIKE_BRAND)' :style="{color:'#888888', backgroundColor:'#ececec'}">{{ brand }}</div>
            </div>
        </div>
        </div>

        <div class="qu-container">
            <div class="qu-title">{{ Q_USER_NAME }}의 큐레이션</div>
            <div class="qu-qurations">

                <HomeCard 
                v-for="curate in Q_USER_QU_LIST" 
                :key="curate.qitemId"
                :curate="curate"
                ></HomeCard>
            </div>
            
        </div>
    </main>
</template>

<script>
import HomeCard from "@/components/Home/HomeCard";
import { mapGetters } from "vuex";
export default {
    
    components: {
      HomeCard,
    },
  layout: "quratorLayout",
  transition (to) {
    if (localStorage.getItem("backButton")){
    return 'slideLeft'
    }
    else if (to.name == "model-id" ||
              to.name == "product-id" ||
              to.name == "curate-id" ||
              to.name == "saved") {
    return 'slideRight'
    }
    else if(to.name == "model" ||
    to.name == "home" ||
    to.name == "exhibition" ||
    localStorage.getItem("previousPage") == "product-id" ||
    localStorage.getItem("previousPage") == "model-id"||
    localStorage.getItem("previousPage").includes("bodytype")) {
      return "nothing"
    }
  },
    data() {
        return {
        }
    },
  computed: {
    ...mapGetters([
        'Q_USER_ID',
        'Q_USER_NAME',
        'Q_USER_DEPARTMENT',
        'Q_USER_IMG_LINK_TITLE',
        'Q_USER_INFO',
        'Q_USER_MY_EXP',
        'Q_USER_STYLE_EXP',
        'Q_USER_LIKE_BRAND',
        'Q_USER_TAG_LIST',
        'Q_USER_IMG_LIST',
        'Q_USER_SNS',
        'Q_USER_LSTYLE',
        'Q_USER_DSTYLE',
      "IMAGE_URL",
      'QURATE_HISTORY_LIST',
      'Q_USER_QU_LIST'
    ]),
  },

    async asyncData({ store }) {
        await store.dispatch("getQuratorInfo", '9');
        await store.dispatch("getQuratorQurationAPI", '9');
    },

    created() {

    },

    mounted() {
        const viewerFooter = this.$refs.vueViewer;
    },

    methods: {
        modiColor(i) {
            return '#'+i;
        },

    splitLikeBrand(brand) {
        var names = brand;
        var nameArr = names.split(',');
        console.log(nameArr);
        return nameArr;
    },

    goToSNS(i, link) {
        if(i == 'inst') {
            this.$amplitude.getInstance().logEvent("click sns", {curatorName: '민또링', snsKind:'인스타그램'});
            window.open("https://www.instagram.com/"+link+"/");
        } else {
            this.$amplitude.getInstance().logEvent("click sns", {curatorName: '민또링', snsKind:'유튜브'});
            window.open("https://www.youtube.com/channel/"+link);
        }
    },


        goBack() {
            const historyArr = this.$store.getters.QURATE_HISTORY_LIST;
            if(historyArr.length ==0 ){
            } else {
                this.$store.dispatch("setQPageInfo", historyArr[historyArr.length-1]);
            }

            localStorage.setItem("backButton","1");
            this.$router.go(-1);
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
    },

    beforeRouteLeave(to, from, next) {

        next();
    }
}
</script>

<style lang="scss" scoped>
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
        display: flex;
        line-height: 1.1;
    }

    &-name{
        font-size: 1.5em;
        font-weight: 800;
        position: relative;
        margin-right: 5%;
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
        justify-content: space-between;
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
        border-bottom: 1px solid #ececec;;
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
        margin: 0 0 8% 0;
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
</style>