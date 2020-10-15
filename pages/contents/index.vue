<template>

    <main class="home-container">
  <GoUpButton></GoUpButton>

  <v-container>
    <v-tabs grow>
      <v-tab 
      v-for="tab in items" 
      :key="tab.id" 
      :ripple="true" 
      @click="tabChage(tab.id)">{{ tab.title }}</v-tab>
      <v-tabs-items v-if="this.switch==1">
          {{ this.items[0].text }}
      </v-tabs-items>


      <v-tabs-items v-else>
          <div class="bcproduct__container"
            v-for="product in BC_PRODUCT_LIST"
            :key="product.modelId">
            <div style="display: grid;">
                <span class="bcproduct__name"> {{ product.name }} </span>

                <div class="bcproduct__optionContainer">
                    <span v-for="option in product.options" class="bcproduct__options">{{ option.replaceAll("@@@", ':') }}</span>
                </div>
            </div>
            <div class="bcproduct__button">
                컨텐츠 만들기
            </div>
                <!-- <img
                    class="sameHeight-card-img"
                    :src="IMAGE_URL + product.imgList[0].imgFile"
                    alt="..."
                    loading="lazy"
                /> -->
            </div>
      </v-tabs-items>
    </v-tabs>
  </v-container>
    </main>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import HomeList from "@/components/Home/HomeList";
import HomeCard from "@/components/Home/HomeCard";
import GoUpButton from "@/components/App/GoUpButton";

export default {
    components: {
      HomeCard,
      HomeList,
      GoUpButton
    },

  data() {
    return {
        bc_product_list : this.$store.getters.BC_PRODUCT_LIST,
        switch:1,
        items: [
            {
                title: "내가 만든 컨텐츠",
                text: "This is the first text",
                id: 1
            },
            {
                title: "작성 가능한 컨텐츠",
                text: "This is the second text",
                id: 2
            }
        ]
    };
  },

   computed: {
    ...mapGetters([
      "IMAGE_URL",
      "MC_OFFSET",
      "BC_PRODUCT_LIST"
    ]),

  },

    
  async asyncData({ store, to }) {

      var payload = {'offset':0};

    await store.dispatch("getMyContentsList", payload);
    store.dispatch("setCurrentRoute", "/contents");

  },

created() {
},

  beforeMount() {
  },

mounted() {
    this.$store.dispatch("setLogo","hasLogo");
    localStorage.removeItem("backButton");
},

methods:{

  tabChage(i) {
      this.switch = i;

    var payload = {'offset':0};
        if(i == 2) {
            this.$store.dispatch("getBeforeContentsList", payload);
        } else {
            this.$store.dispatch("getMyContentsList", payload);
        }
  }

},

  beforeRouteLeave(to, from, next) {
    localStorage.setItem("routerStack",this.$route.path);
    next();
  }
}
</script>

<style lang="scss" scoped>
.home-container{
  margin-bottom:100px;
  height:100%;
}

.bcproduct{
    &__container{
        display: flex;
        width: 90%;
        border: 1px solid #ececec;
        margin: 4% 5%;
        padding :5%;
        border-radius: 10px;
        justify-content:space-between;
    }

    &__name{
        font-size: 1.1em;
        font-weight: 800;

    }

    &__optionContainer{
        display: grid;
        margin-top: 7px;
    }

    &__options{
        font-size: 0.9em;
        font-weight: 600;
    }

    &__button{
        border-radius: 10px;
        border : 1px solid #ececec;
        padding: 7% 10px;
    }


}


</style>