<template>
<main>
<div class="pagingButton-container">
    <button class="prev-button" 
    @click="movePage('prev')" 
    id="prevButton"
    v-show="this.$store.getters.PAGE_NUMBER != 1"
    >이전</button>

    <button class="page-button" @click="popUpPage">
       {{ pageNumber }}
        <i class="fas fa-chevron-down"></i>
    </button>

    <button class="next-button" 
    @click="movePage('next')" 
    id="nextButton"
    v-show="this.$store.getters.PAGE_NUMBER != this.$store.getters.TOTAL_PAGE_NUMBER"
    >다음</button>
</div>
</main>
</template>
<script>
import { mapGetters } from "vuex";
export default {
    computed: {
    ...mapGetters([
      "PAGE_NUMBER",
      "KEYWORD_NAME",
      "ITEM_PRODUCTS",
      "FOLLOW_MODEL_PRODUCTS"
    ]),

    pageNumber() {
      return this.$store.getters.PAGE_NUMBER;
    },

  },

    methods:{
        
        popUpPage(){
            this.$store.dispatch("openPaginationSheet");
        },

        movePage(i) {
                const pageNum = this.$store.getters.PAGE_NUMBER;
                if(i == "prev") {
                    this.$amplitude.getInstance().logEvent("click pagination");
                    this.$store.dispatch("setOffset", 30*(pageNum-2));
                    this.$store.dispatch("setPageNumber", pageNum-1);
                }
                else if(i == "next") {
                    document.getElementById('prevButton').style.display = "block";
                    this.$amplitude.getInstance().logEvent("click pagination");
                    this.$store.dispatch("setOffset", 30*(pageNum));
                    this.$store.dispatch("setPageNumber", pageNum+1);
                }
                
            this.$store.dispatch("getAllProducts");
                if(this.$route.name == 'search') {
                    window.scrollTo(0,0);
                }
                else {
                    const curateScroll = document.getElementById('curateScroll');
                    curateScroll.scrollIntoView();
                    window.scrollBy(0,-50);
                }
        }
    }
}
</script>
<style lang="scss" scoped>
.pagingButton-container{
    display: flex;
    width:100%;
    height:40px;
    bottom:90px;
    position: absolute;
    justify-content: center;
}

.prev-button{
    color:#fff;
    font-size: 1em;
    font-weight: 800;
    margin: 2% 3% 0 0;
    background-color: #000;
    border-radius: 5px;
    height: 40px;
    padding:1px 20px;
    width:30%;
    position: absolute;
    left:3%;
}

.page-button{
    border:1px solid #000;
    color:#000;
    font-size: 1em;
    font-weight: 800;
    margin: 2% 0 0 0;
    background-color: #fff;
    border-radius: 5px;
    height: 40px;
    padding:1px 20px;
    width:30%;
    position: absolute;
}

.fas.fa-chevron-down{
    margin-left:5px;
}

.next-button{
    color:#fff;
    font-size: 1em;
    font-weight: 800;
    margin: 2% 0 0 3%;
    background-color: #000;
    border-radius: 5px;
    height: 40px;
    padding:1px 20px;
    width:30%;
    position: absolute;
    right:3%;
}

</style>