<template>
    <div class="hc-container" ref="qcContainer"
          @click="goToCurate(curate.qitemId)">
        <img class="hc-image" :src="IMAGE_URL+curate.imgItemFile"/>
        <div class="hc-cover">
            <div class="hc-coverUp">
                <div class="hc-coverUpLeft">
                    <img class="hc-modelPic" :src="IMAGE_URL+curate.imgFaceFile"/>
                </div>
                <div class="hc-coverUpCenter">
                    <span class="hc-curated">Curated by</span>
                    <span class="hc-curatedName">{{ curate.quserName }}</span>
                </div>
                <div class="hc-coverUpRight">
                    <span class="hc-update"><i class="material-icons updateIcon">update</i> 상품 업데이트 <span >{{ modiTime(curate.itemupDate) }}</span></span>
                </div>
            </div>
            <div class="hc-coverDown">
                <span class="hc-coverTitle">{{ curate.title }}</span>
                <span class="hc-coverSubTitle">{{ curate.body }}</span>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: {
    curate: {
      type: Object,
      required: true
    }
  },

data() {
    return{
    }
},
 computed: {
    ...mapGetters([
      "IMAGE_URL",
    ]),
},

mounted() {
    if(this.$route.name.includes('qurator')) {
        this.$refs.qcContainer.style.width="100%";
        this.$refs.qcContainer.style.marginLeft="0";
        this.$refs.qcContainer.style.marginRight="0";
    }
},

methods: {
    goToCurate(n){
        const qParams = 
            {
                qitemId: this.curate.qitemId,
                qcode: this.curate.qcode,
                clickCnt: this.curate.clickCnt,
                quserName: this.curate.quserName,
                imgItemFile: this.curate.imgItemFile,
                imgFaceFile: this.curate.imgFaceFile,
                itemupDate: this.curate.itemupDate,
                title: this.curate.title,
                body: this.curate.body
            }
            
            const recentQs = JSON.parse(localStorage.recentQ);  

            const isIncluded =
                recentQs.filter(curate => curate.qitemId == this.curate.qitemId)
                .length === 0
                ? false
                : true;


            if (!isIncluded) {
                    if (recentQs.length === 10) {
                    recentQs.pop();
                    }
                    recentQs.unshift(qParams);
                localStorage.recentQ = JSON.stringify(recentQs);
            } else {
                const index = recentQs.findIndex(i=> i.qitemId === n);
                recentQs.splice(index, 1);
                recentQs.unshift(qParams);
                localStorage.recentQ = JSON.stringify(recentQs);
            }

        this.$store.dispatch('addQurateHistory', qParams);
        console.log(this.$store.getters.QURATE_HISTORY_LIST);
        this.$store.dispatch("setQPageInfo", qParams);
        
        if(n =="1") {
            this.$router.push("/curate/height");
            this.$amplitude.getInstance().logEvent("click-curation", {
                    clickedPage:'홈',
                 curationName: this.curate.title, curatorName: this.curate.quserName,
                    curationKinds: "큐레이션둘러보기"
            });
        } else if( n== "2") {
            this.$router.push("/curate/follow");
            this.$amplitude.getInstance().logEvent("click-curation", {
                    clickedPage:'홈',
                 curationName: this.curate.title, curatorName: this.curate.quserName,
                    curationKinds: "큐레이션둘러보기"
            });
        } else if( n== "3") {
            this.$router.push("/curate/bodytype");
            this.$amplitude.getInstance().logEvent("click-curation", {
                    clickedPage:'홈',
                 curationName: this.curate.title, curatorName: this.curate.quserName,
                    curationKinds: "큐레이션둘러보기"
            });
        } else {
            if(this.$route.name.includes('qurator')) {
                this.$amplitude.getInstance().logEvent("click-curation", {
                        clickedPage:'큐레이터페이지',
                    curationName: this.curate.title, curatorName: this.curate.quserName,
                        curationKinds: "큐레이션둘러보기"
                });
            } else {
            this.$amplitude.getInstance().logEvent("click-curation", {
                    clickedPage:'홈',
                 curationName: this.curate.title, curatorName: this.curate.quserName,
                    curationKinds: "큐레이션둘러보기"
            });
            }
            this.$router.push("/curate/"+ n);
        }
    },

    modiTime(time) {
        var thisTime = new Date();
        if (window.AppType == "android" || window.AppType == "android3") {
            var timeFix = (new Date(time)).getTime();
        }
        if(window.AppType == "ios2" || window.AppType == "ios3"){
            var time2 = time.slice(0,10);
            var time3 = time.slice(-10,-2);
            var time6 = time2+"T"+time3+"Z";
            var timeFix = (new Date(time6)).getTime();
        }
        else {
            var timeFix = (new Date(time)).getTime();
        }
        const thisMonth = thisTime.getMonth() + 1;
        const thisDay = thisTime.getDate();
        const thisHour = thisTime.getHours();

        const qMonth = time.substring(5,7);
        const qDay = time.substring(8,10);
        const qHour = time.substring(11,13);

        if(thisMonth != qMonth) {
            var dateGap = Math.ceil((thisTime.getTime()-timeFix)/(1000*3600*24));
            time = dateGap;
            return time+ "일전";
        } else if(thisDay != qDay) {
            return thisDay - qDay + "일전";
        } 
        else {
            var timeGap = Number(thisHour)- Number(qHour);
            time = timeGap;
            if(time == 0) {
                return time +1 +"시간전";
            }
            else{
                return time + "시간전";
            }
        }

    },
}
} 
</script>
<style lang="scss" scoped>
.hc{
    &-container{
        width:90%;
        height:360px;
        border-radius: 10px;
        margin:0 5% 10% 5%;
        box-shadow: 0 0px 20px 0px rgba(0, 0, 0, 0.1);
        background-color: #fff;
    }

    &-image{
        width:100%;
        height:auto;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }
    
    &-coverUp{
        padding: 5% 4% 3% 4%;
        display: flex;
    }

    &-coverUpLeft{
        margin:auto 0;
    }

    &-modelPic{
        border-radius: 50%;
        width: 35px;
        height: 35px;
    }

    &-coverUpCenter{
        display: grid;
        margin-left: 2%;
    }

    &-curated{
        font-size: 0.7em;
        font-weight: 500;
        color:#888;
    }
    
    &-curatedName{
        font-size: 0.8em;
        font-weight: 800;
        color:#000;
        margin-top: 2px;
    }

    &-coverUpRight{
        position: relative;
        right:0%;
        margin-left: auto;
        margin-top: auto;
    }

    &-update{
        font-size: 0.8em;
        font-weight: 800;
        color:#888;
    }

    &-coverDown{
        display: grid;
        padding:0% 4%;
    }

    &-coverTitle{
        font-size: 1.3em;
        font-weight: 800;
        margin-bottom: 2%;
        width:310px;
        position: relative;
        display: block;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }

    &-coverSubTitle{
        font-size: 0.85em;
        font-weight: 500;
        color:#888;
        width:310px;
        position: relative;
        display: block;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }
}

.updateIcon{
    font-size: 1.2em;
    font-weight: 800;
    color:#888;
    position: relative;
    top:2px;
}

@media all and (max-width : 330px){
  .hc {
    &-container{
        height: 320px;
    }

    &-coverTitle {
        width:260px;
    }

    &-coverSubTitle{
        width:260px;
    }
  }
}

@media all and (min-width : 400px){
  .hc {
    &-container{
        height: 390px;
    }

    &-coverTitle {
        width:340px;
    }

    &-coverSubTitle{
        width:340px;
    }
  }
}

</style>