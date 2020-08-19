<template>
<div>
        <div class="search-header">
          <img 
          src="/app/arrow_left.png" 
          class="backButton"
          @click="goToBack"
          />
            <div class="search-input-container">
                <i class="material-icons search-icon">search</i>
                <input 
                id="searchInput"
                class="search-input" 
                v-model="search"
                @keyup.enter="submit(search)"
                @focus="cursor()"
                placeholder="상품을 검색해보세요."/>
                <i class="fas fa-times-circle delete" @click="deleteInput"
                    :class="{
                'deleteShow': this.search
                }"></i>
            </div>
        </div>
        <div class="search-headerSpace"></div>
</div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters([
      "IS_SEARCH",
      "KEYWORD_NAME"
    ]),

    search : {
        get: function() {
            return this.$store.getters.KEYWORD_NAME;
        },
        set : function(i) {
            this.$store.dispatch("setKeywordName", i);
        }
    }
  },

    methods:{
        cursor() {
                this.$store.dispatch("notSearching");
        },

        goToBack() {
            this.$router.go(-1);
            this.$store.dispatch("resetFilter");
        },

        deleteInput() {
            this.search="";
            this.$store.dispatch("notSearching");
            this.$store.dispatch("setKeywordName", '');
            this.$store.dispatch("resetFilter");
        },

        async submit(i) {
            if(i ==null || i == '' || i.length > 20) {

            }
            else {
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
                this.$store.dispatch("resetFilter");
                await this.$store.dispatch("setOffset", 0);
                await this.$store.dispatch("setPageNumber", 1);
                const response = await this.$store.dispatch("getAllProducts");
                if(response.result.totCnt != 0) {
                    this.$amplitude.getInstance().logEvent("success search");
                }
                else {
                    this.$amplitude.getInstance().logEvent("fail search");
                }
                this.$store.dispatch("isSearching");
                document.getElementById("searchInput").blur();
            }

        }
    }
}
</script>
<style lang="scss" scoped>
.backButton{
    width:12px;
    height:20px;
    margin: 2.5% 5% 0 2%;
}

.search-icon{
    color:#999;
    margin-right:10px;
}
.delete{
    position: absolute;
    right:8%;
    margin-top:3px;
    color:#BDBDBD;
}
.deleteShow{
    color:#000;
}
.search{
    &-headerSpace{
        height: 50px;
    }
    &-header{
        padding:3% 3% 3% 3%;
        display: flex;
        height: 60px;
        width: 100%;
        position: fixed;
        z-index: 3;
        background-color: #fff;
    }
    &-input{
        margin-top:1px;
        position: absolute;
        font-size: 0.9em;
    }
    &-input-container{
        width:90%;
        background-color: #ececec;
        border-radius: 5px;
        height:38px;
        padding:2.5%;
    }
}
</style>