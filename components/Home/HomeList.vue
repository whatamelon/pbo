<template>
        <div class="list-card"
          @click="goToCard(curate.qitemId)">
            <img :src="IMAGE_URL+curate.imgItemFile" class="list-image"/>
            <div class="list-title">{{ curate.title }}</div>
        </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: {
    curate: {
      type: Object,
      required: true
    },

    type:{
        type: String,
        required:true
    }
  },
computed: {
    ...mapGetters([
      "IMAGE_URL",
    ]),
    },

    methods:{
        goToCard(n){
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

            switch(this.type) {
                case "1" :
                    this.ckind = "인기큐레이션";
                break;
                case "2" :
                    this.ckind = "새로운큐레이션";
                break;
                case "3" :
                  this.ckind = "최근본큐레이션";
                break;
            }
            if(n =="1") {
                this.$router.push("/curate/height");
                this.$amplitude.getInstance().logEvent("click-curation", {
                    clickedPage:'홈',
                    curationName: this.curate.title, curatorName: this.curate.quserName,
                    curationKinds: this.ckind
                });
            } else if( n== "2") {
                this.$router.push("/curate/follow");
                this.$amplitude.getInstance().logEvent("click-curation", {
                    clickedPage:'홈',
                    curationName: this.curate.title, curatorName: this.curate.quserName,
                    curationKinds: this.ckind
                });
            } else if( n== "3") {
                this.$router.push("/curate/bodytype");
                this.$amplitude.getInstance().logEvent("click-curation", {
                    clickedPage:'홈',
                    curationName: this.curate.title, curatorName: this.curate.quserName,
                    curationKinds: this.ckind
                });
            } else {
                this.$router.push("/curate/"+ n);
                this.$amplitude.getInstance().logEvent("click-curation", {
                    clickedPage:'홈',
                    curationName: this.curate.title, curatorName: this.curate.quserName,
                    curationKinds: this.ckind
                });
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.list{
    &-card{
        display: grid;
        position: relative;
        padding:0 1.5%;
    }

    &-image{
        width:200px;
        height:auto;
        border-radius: 10px;
        margin: 4% 0 2% 0;
        box-shadow: 0 0px 12px 0px rgba(0, 0, 0, 0.1);
    }

    &-title{
        font-size: 1em;
        font-weight: 500;
        width:200px;
        position: relative;
        display: block;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        margin-top:6%;
    }
}

.list-card:nth-child(1) {
    margin-left:4%;
}
</style>