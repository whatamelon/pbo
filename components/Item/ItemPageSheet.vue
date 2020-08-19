<template>
<div>
    <div class="select-page-backdrop" 
    v-show="SHOW_PAGINATION_SHEET"
    @click="closeSheet()"></div>
    <div class="select-page" 
            :class="{
            'select-page--show': SHOW_PAGINATION_SHEET,
            'select-page--hide': !SHOW_PAGINATION_SHEET
            }">
        <div class="select-page__top">
            <span class="select-page__intro">이동하실 페이지를 클릭해주세요.</span>
        </div>        
        <div class="select-page__pages">
            <div class="select-page-pagesContainer">
            <div class="select-page__vertical" 
            v-for="n in totalPages"
            @click="selectPage(n)"
            :class="{
                'select-page__vertical__active': n == PAGE_NUMBER
            }">
            <p>{{ n }}</p></div></div>
        </div>
    </div>
</div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
computed: {
    ...mapGetters([
      "SHOW_PAGINATION_SHEET",
      "PAGE_NUMBER",
      "USER_HEIGHT",
      "TOTAL_PAGE_NUMBER"
    ]),

    totalPages() {
      return this.$store.getters.TOTAL_PAGE_NUMBER;
    },
  },
    methods:{
        selectPage(n){
            this.$amplitude.getInstance().logEvent("click pagination");
            const height = this.$store.getters.USER_HEIGHT;
            this.$store.dispatch("setOffset", 30*(n-1));
            this.$store.dispatch("setPageNumber", n);
            this.$store.dispatch("closePaginationSheet");
            
            this.$store.dispatch("getAllProducts");
                if(this.$route.name == 'search') {
                    window.scrollTo(0,0);
                }
                else {
                    const curateScroll = document.getElementById('curateScroll');
                    curateScroll.scrollIntoView();
                    window.scrollBy(0,-50);
                }
        },
        closeSheet() {
            this.$store.dispatch("closePaginationSheet");
        }
    }
    
}
</script>
<style lang="scss" scoped>
.select-page-backdrop{
    background-color: rgba(0,0,0,0.5);
    height:100%;
    bottom:0;
    position: absolute;
    width: 100%;
    z-index: 998;
}

.select-page{
    width:100%;
    bottom:-230px;
    position: fixed;
  transition: 0.4s;
  z-index: 999;

    &--show{
        bottom:0px;
    }

    &--hide{
        bottom:-230px;
    }

    &__top{
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        background-color: #fff;
        height:50px;
        text-align: center;
        padding-top: 8%;
    }

    &__intro{
        font-size: 0.9em;
        font-weight: 800;
    }

    &__pages{
        background-color:#ffffff;
        padding: 10% 0 16% 0;
        display: flex;
        overflow-x: scroll;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
        &::-webkit-scrollbar {
            display : none;
            width:0px;
        }
    }

    &-pagesContainer{
        display: flex;
        padding:0 10%;
    }

    &__vertical{
        width: 30px;
        height: 30px;
        background: #fff;
        border: 1px solid #000;
        color: #000;
        text-align: center;
        border-radius: 50%;
        line-height: 2em;
        box-sizing: content-box;
        font-size: 15px;
        font-weight: 800;
        margin:0 10px;
          &:visited,
          &:hover,
          &:active,
          &:focus 
          {
         width: 30px;
        height: 30px;
        background: $primary;
        border: 1px solid $primary;
        color: #fff;
        text-align: center;
        border-radius: 50%;
        line-height: 2em;
        box-sizing: content-box;
        font-size: 15px;
        margin:0 10px;
            }
    }

    &__vertical__active{
        width: 30px;
        height: 30px;
        background: $primary;
        border: 1px solid $primary;
        color: #fff;
        text-align: center;
        border-radius: 50%;
        line-height: 2em;
        box-sizing: content-box;
        font-size: 15px;
        margin:0 10px;
    }

    &__vertical p {
        width:30px;
    }
}


</style>