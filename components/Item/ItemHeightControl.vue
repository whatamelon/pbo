<template>
    <div class="heightControl-container">
        <button 
        class="heightControl-button"
        v-for="height in heightRanges"
        @click="changeHeight(height.code)"
        :class="{
        'heightControl-button--active': TEMPORARY_HEIGHT_RANGE === height.heightRange
        }"
        >
        {{ height.text }}
        </button>
    </div>    
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
    data() {
        return{
            heightRanges:[],
            height:this.$store.getters.USER_HEIGHT
        }
    },
computed: {
    ...mapGetters([
      "USER_HEIGHT",
      "TEMPORARY_HEIGHT_RANGE",
    ])
  },

    mounted() {
        this.heightRanges = [
        {
            heightRange: this.heightRangeCalculator(0, this.height),
            text: "내 키 " + this.$store.getters.USER_HEIGHT + "cm",
            code: "0"
        },
        {
            heightRange: this.heightRangeCalculator(1, this.height),
            text: "1cm 차이",
            code: "1"
        },
        {
            heightRange: this.heightRangeCalculator(3, this.height),
            text: "3cm 차이",
            code: "3"
        },
        {
            heightRange: this.heightRangeCalculator(5, this.height),
            text: "5cm 차이",
            code: "5"
        }
        ];
    },

    methods:{
    ...mapActions([
      "setTemporaryHeightRange",
    ]),

        heightRangeCalculator(range = 0, height = 0) {
            const min = parseInt(height) - range;
            const max = parseInt(height) + range;
            const heightRange = min + "r" + max;

            return heightRange;
        },
         changeHeight(code) {
             
            this.$store.dispatch("setOffset", 0);
            this.$store.dispatch("setPageNumber", 1);
            this.$store.dispatch("resetFilter");
            switch(code){
                case "0":
                     this.$store.dispatch("setHeightRange", this.heightRangeCalculator(0, this.height));
                     this.$store.dispatch("setTemporaryHeightRange", this.heightRangeCalculator(0, this.height));
                     this.$store.dispatch("getAllProducts");
                break;
                case "1":
                     this.$store.dispatch("setHeightRange", this.heightRangeCalculator(1, this.height));
                     this.$store.dispatch("setTemporaryHeightRange", this.heightRangeCalculator(1, this.height));
                     this.$store.dispatch("getAllProducts");
                break;
                case "3":
                     this.$store.dispatch("setHeightRange", this.heightRangeCalculator(3, this.height));
                     this.$store.dispatch("setTemporaryHeightRange", this.heightRangeCalculator(3, this.height));
                     this.$store.dispatch("getAllProducts");
                break;
                case "5":
                     this.$store.dispatch("setHeightRange", this.heightRangeCalculator(5, this.height));
                     this.$store.dispatch("setTemporaryHeightRange", this.heightRangeCalculator(5, this.height));
                     this.$store.dispatch("getAllProducts");
                break;
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.heightControl{
    &-container{
        width:100%;
        text-align: center;
        border-bottom: 1px solid #ececec;
        border-top: 7px solid #ececec;
    }

    &-button{
        text-align: center;
        border-radius: 7px;
        font-size: 0.8em;
        font-weight: 600;
        width: 22%;
        padding: 2% 0;
        margin: 3% 1%;
        color:#999;
        background-color: #ececec;
    }

    &-button--active{
        text-align: center;
        border-radius: 7px;
        font-size: 0.8em;
        font-weight: 600;
        width: 22%;
        padding: 2% 0;
        margin: 3% 1%;
        background-color:$primary;
        color:#ffffff;
    }
}
</style>