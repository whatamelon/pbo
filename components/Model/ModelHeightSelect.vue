<template>
    <div class="divide-container" ref="askContainer">
        <div class="divide-one" v-for="i in divide"
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
        "MODEL_HEIGHT_FILTER",
        ]),

        heightSelect() {
            return this.$store.getters.MODEL_HEIGHT_FILTER;
        }
    },
    data() {
        return {
            divide : [
                { 
                    name : "나와 비슷한 키",
                    no : 1
                },
                { 
                    name : "158cm 이하",
                    no : 2
                },
                { 
                    name : "159~167cm",
                    no : 3
                },
                { 
                    name : "168cm 이상",
                    no : 4
                },
            ]
        }
    },

    created() {
      window.addEventListener("scroll", this.selectScroll);
    },

    mounted() {
        if(this.$route.name=="model") {
            this.$refs.askContainer.style.position = "fixed";
            this.$refs.askContainer.style.top = "50px";
            this.$refs.askContainer.style.zIndex = "5";
        }
    },

    methods: {
        selectScroll() {
                if(this.$route.name=="askfollowing") {
                    if(window.scrollY >= 50) {
                            this.$refs.askContainer.style.position = "fixed";
                            this.$refs.askContainer.style.top = "0px";
                            this.$refs.askContainer.style.zIndex = "5";
                    }
                    else {
                        this.$refs.askContainer.style.position = "relative";
                        this.$refs.askContainer.style.top = null;
                    }
                }
        },

        switchTab(no) {
            console.log(no)
            window.scrollTo(0,0);
            this.$store.dispatch("setModelHeightFilter", no);
        }
    }
}
</script>
<style lang="scss" scoped>
.divide{
    &-container{
        width:100%;
        display: flex;
        padding:4% 3%;
        justify-content: space-evenly;
        background-color: #fff;
    }

    &-one{
        position: relative;
        width:23%;
        height:35px;
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