<template>
    <div class="st-container">
        <div class="st-one" v-for="i in divide"
                :class="{ '__active': i.no == heightSelect }"
                @click="switchTab(i.no)">
            {{ i.name }}
        </div>
    </div>    
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
    computed: {
        ...mapGetters([
            "SAVED_TAB_FILTER",
        ]),

        heightSelect() {
            return this.$store.getters.SAVED_TAB_FILTER;
        }
    },
    data() {
        return {
            divide : [
                { 
                    name : "찜",
                    no : 1
                },
                { 
                    name : "최근 본 상품",
                    no : 2
                }
            ]
        }
    },

    created() {
    },

    methods: {
        switchTab(no) {
            console.log(no)
            window.scrollTo(0,0);
            this.$store.dispatch("setSavedTabFilter", no);
        }
    }
}
</script>
<style lang="scss" scoped>
.st{
    &-container{
        width:100%;
        display: flex;
        padding:3% 0;
        justify-content: space-evenly;
        background-color: #fff;
    }

    &-one{
        position: relative;
        width:45%;
        height:36px;
        background-color: #ececec;
        color:#888;
        border-radius: 7px;
        border: 1px solid #ececec;
        font-size: 0.8em;
        font-weight: 800;
        text-align: center;
        padding: 2.2% 0;
    }

    &-one.__active{
        background-color: $primary;
        color:#fff;
        border: 1px solid $primary;
    }

}
</style>