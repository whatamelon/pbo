<template>
        <div class="search-suggest-container">

            <div class="sp-container">
                <span class="sp-title">인기 검색어</span>
                <div class="sp-tags">
                    <div class="sp-tag" v-for="tag in popularTags"
                    @click="searchTag(tag.keyword)">{{ tag.keyword }}</div>
                </div>
            </div>
            <div class="sr-container">
                <div class="sr-title-container">
                    <span class="sr-title">최근 검색어</span>
                    <span class="sr-remove" 
                    v-show="RECENT_TAGS"
                    @click="removeTags">검색어 지우기</span>
                </div>
                <div class="sr-tags" v-show="RECENT_TAGS">
                    <div class="sr-tag" v-for="tag in recentTags"
                    @click="searchTag(tag)">{{ tag }}</div>
                </div>
            </div>

        </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
computed: {
    ...mapGetters([
      "RECENT_TAGS"
    ]),

    hasRecentTags() {
      return this.recentTags.length === 0 ? false : true;
    },

    recentTags() {
      return JSON.parse(localStorage.recentTags);
    }
  },

    data() {
        return{
            popularTags:this.$store.getters.POPULAR_KEYWORDS
        }
    },

    mounted() {
        if(this.hasRecentTags) {
         this.$store.dispatch("isRecentTag",true);
        } 
    },

    methods:{
        async removeTags() {
            localStorage.setItem("recentTags", "[]");
            await this.$store.dispatch("isRecentTag",false);
        },

        async searchTag(i) {
            this.$amplitude.getInstance().logEvent("click tags");
            const recentTags = JSON.parse(localStorage.recentTags);     
                if (recentTags.length === 10) {
                recentTags.pop();
                }
                recentTags.unshift(i);
                const newArray = recentTags.filter((item, idx, array) => {
                    return array.indexOf(item) === idx;
                });
                localStorage.recentTags = JSON.stringify(newArray);
        
        await this.$store.dispatch("setKeywordName", i);
        await this.$store.dispatch("setOffset", 0);
        await this.$store.dispatch("setPageNumber", 1);
        
        this.$store.dispatch("getAllProducts");
        this.$store.dispatch("isSearching");
        }
    }
}
</script>
<style lang="scss" scoped>
.search-suggest-container{
    width:100%;
}

.sp{
    &-container{
        width:100%;
        border-bottom: 1px solid #ececec;
        display: grid;
        padding: 7% 0 15% 0;
    }

    &-title{
        font-size: 0.9em;
        font-weight: 800;
        padding: 0 0 0 3%;
    }

    &-tags{
        width:100%;
        display: flex;
        flex-wrap: wrap;
        padding: 2% 0 0 3%;
    }
    &-tag{
        border-radius: 30px;
        padding:7px 12px;
        border: 1px solid #BDBDBD;
        color:#BDBDBD;
        font-size: 0.8em;
        font-weight: 800;
        margin: 3% 2% 0 0;
    }
}

.sr{
    &-container{
        width:100%;
        display: grid;
        padding: 5% 0 15% 3%;
    }

    &-title-container{
        width:100%;
        display: flex;
    }

    &-title{
        font-size: 0.9em;
        font-weight: 800;
        position: absolute;
        left: 3%;
    }

    &-remove{
        font-size: 0.9em;
        font-weight: 800;
        color: #BDBDBD;
        position: absolute;
        right: 3%;
    }

    &-tags{
        width:100%;
        display: flex;
        flex-wrap: wrap;
        padding: 7% 0 0 0;
    }
    &-tag{
        border-radius: 30px;
        padding:7px 12px;
        border: 1px solid #BDBDBD;
        color:#BDBDBD;
        font-size: 0.8em;
        font-weight: 800;
        margin: 3% 2% 0 0;
    }
}
</style>