<template>

    <main class="home-container">
  <GoUpButton></GoUpButton>

    <div class="infoN__container" v-if="this.$store.getters.IS_INFO == 'n'">
      <p class="infoN__title">아직 프로필을 등록 하지 않으셨군요? 🤭<br/>프로필을 등록하고 활동을 시작해보세요!</p>

      <div class="infoN__goRegister" @click="goRegister">프로필 등록하러 가기!</div>
    </div>
    
    <div class="infoN__container" v-else-if="this.plzLogout == true" style="margin: 50px auto 0 auto;">
      <p class="infoN__title">페이지가 안나오시나요? <br/> 로그아웃 후 로그인을 해보세요.</p>
    </div>
    <div v-else>

  <v-container>
    <v-tabs grow>
      <v-tab 
      v-for="tab in items" 
      :key="tab.id" 
      :ripple="true" 
      @click="tabChage(tab.id)">{{ tab.title }}</v-tab>
      <v-tabs-items v-if="this.switch==1">
          <div class="mcproduct__container"
            v-for="product2 in MC_PRODUCT_LIST"
            :key="product2.nitemId" 
            v-if="MC_PRODUCT_LIST.length !=0"
             @click="goToEditContents(product2)">
            <div class="mcproduct__status"
            :class="{
                    'mcproduct__status-req': product2.status == 'req',
                    'mcproduct__status-fin': product2.status == 'fin',
                    'mcproduct__status-sus': product2.status == 'sus',
                    }">{{ status(product2.status) }}</div>
            <div style="display: flex;">

                <img :src="IMAGE_URL + product2.imgLinkTitle"  class="bcproduct__image" alt="" loading="lazy" v-if="product2.imgLinkTitle != null"/>
                <div v-else class="noImage">
                  대표 이미지가 <br/>없습니다.
                </div>
                <div class="mcproduct__option__container">
                  <span class="mcproduct__name"> {{ product2.title }} </span>

                  <div class="mcproduct__optionContainer">
                     상품 :  {{ product2.nitemName }}
                  </div>
                  <div class="mcproduct__optionContainer">
                    옵션 :  {{ product2.options.replaceAll(",", " | ") }}
                  </div>
                </div>
                <!-- <div class="mcproduct__button__container">
                  <div class="mcproduct__button__edit" @click="goToEditContents(product2)">
                      수정
                  </div>
                </div> -->
            </div>
          </div>
          <div class="noContents" v-else>
            아직 작성한 컨텐츠가 없습니다.
          </div>
      </v-tabs-items>


      <v-tabs-items v-else>
          <div class="bcproduct__container"
            v-for="product in BC_PRODUCT_LIST"
            :key="product.nitemId">
            <div style="display: flex;">

                <img :src="IMAGE_URL + product.imgLink"  class="bcproduct__image" alt="..." loading="lazy"/>
                <div style="display: grid; width:140pxl">
                  <span class="bcproduct__name"> {{ product.name }} </span>

                  <div class="bcproduct__optionContainer">
                      <span v-for="option in product.options" class="bcproduct__options">{{ option.replaceAll("@@@", ' : ') }}</span>
                  </div>
                </div>
            </div>
            <div class="bcproduct__button" @click="goToMakeContents(product)">
                >
            </div>
          </div>
      </v-tabs-items>
    </v-tabs>
  </v-container>
    </div>
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
        mc_product_list : this.$store.getters.MC_PRODUCT_LIST,
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
        ],
    };
  },

   computed: {
    ...mapGetters([
      "IMAGE_URL",
      "MC_OFFSET",
      "BC_PRODUCT_LIST",
      "MC_PRODUCT_LIST",
      "IS_INFO",
    ]),


  },

  async asyncData({ store, to }) {

      var payload = {'offset':0};
      var isTrue = false;
     console.log('dd')

    await store.dispatch("getMyContentsList", payload).then((response) => {
     console.log(response)
        if(response == 200) {
            isTrue= false;
        } else {
            isTrue= true;
        }
    })
    .catch((e) => {
            isTrue= true;
    });
    store.dispatch("setCurrentRoute", "/contents");

    return {
        plzLogout:isTrue,
    };

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
  },

  goToMakeContents(item) {
    this.$store.dispatch('setContentsStatus', 'make');
    this.$store.dispatch('setSelectItem', item);
    this.$router.push("/makeContents");
  },

  goToEditContents(item) {
    console.log(item)
    console.log('dd')
    this.$store.dispatch('setContentsStatus', 'edit');
    this.$store.dispatch('setSelectItem', item);
    this.$router.push("/editContents");
  },

  removeContents(item) {
    console.log(item);
    console.log('remove!');
  },

    status (i) {
      var d = '';
      switch(i) {
        case 'fin':
          d= "승인완료";
          break;
        case 'req':
          d= "승인 대기중";
          break;
        case 'sus':
          d= "작성중";
          break;
      }
      return d;
    }

},

  beforeRouteLeave(to, from, next) {
    localStorage.setItem("routerStack",this.$route.path);
    next();
  }
}
</script>

<style lang="scss" scoped>
.container{
  padding-top: 0px !important;
}
.home-container{
  margin-bottom:100px;
  height:100%;
}

.infoN {
  &__container{
    margin-top: 20%;
  }
  &__title{
    text-align: center;
    margin: 0 auto;
    font-size: 1.2em;
    font-weight: 700;
  }

  &__goRegister{
    margin: 50px auto 0 auto;
    background-color: #fff;
    color: #000;
    border: 2px solid #000;
    border-radius: 5px;
    font-size: 1.1em;
    font-weight: 600;
    text-align: center;
    width: 300px;
    height:50px;
    padding: 10px;
  }
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
      overflow:hidden;
      text-overflow:ellipsis;
      white-space:nowrap;
      width:130px;
        font-size: 1.1em;
        font-weight: 800;

    }

    &__optionContainer{
      width:130px;
      overflow:hidden;
      text-overflow:ellipsis;
      white-space:nowrap;
        display: grid;
        margin-top: 7px;
    }

    &__options{
        font-size: 0.9em;
        font-weight: 600;
    }

    &__button{
        border-radius: 50px;
        border : 1px solid #000;
        padding:2%;
        width: 40px;
        height:40px;
        text-align: center;
        font-size: 1.3em;
        margin-top: 10%;
    }

    &__image{
      width:100px;
      height:100px;
      margin-right: 10px;
      border-radius: 5px;
    }

}

.mcproduct{
    &__container{
        display: grid;
        width: 90%;
        border: 1px solid #ececec;
        margin: 4% 5%;
        padding : 3%;
        border-radius: 10px;
        justify-content:space-between;
    }

    &__option{
      &__container{
          display: grid; 
          margin-right:20px;
          width: 200px;
          text-align: start;
      }
    }
    &__name{
      overflow:hidden;
      text-overflow:ellipsis;
      white-space:nowrap;
      width:200px;
      font-size: 1.1em;
      font-weight: 800;
      text-align: start;
    }

    &__optionContainer{
      width:200px;
      overflow:hidden;
      text-overflow:ellipsis;
      white-space:nowrap;
      display: grid;
      margin-top: 7px;
      text-align: start;
    }

  &__status{
    font-weight: 800;
    text-align: center;
    padding: 2% 5%;
    border: 1px solid #000;
    border-radius: 5px;
    max-width: 80px;
    font-size: 0.5em;
    margin-bottom: 10px;
    color: #fff;

    &-sus{
      background-color: blue;
        border: 1px solid blue;
    }

    &-req{
      background-color: $primary;
        border: 1px solid $primary;
    }

    &-fin{
      background-color: green;
        border: 1px solid green;
    }
  }

    &__button{

      &__container{
        display: grid;
      }

      &__edit{
        width: 50px;
        height: 35px;
        border-radius: 5px;
        text-align: center;
        padding: 3%;
        border: 1px solid #000;
        padding: 6px 0;
        margin-bottom: 10px;
      }

      &__remove{
        width: 50px;
        height: 35px;
        border-radius: 5px;
        text-align: center;
        padding: 7px 0;
        background-color: $primary;
        color: #fff;
      }
    }
}

.noImage{
  width: 100px;
  height: 100px;
  padding-top: 27px;
  text-align: center;
  margin-right: 10px;
  border: 1px solid #ececec;
  border-radius: 5px;
}

.noContents{
  font-size: 1.4em;
  font-weight: 800;
  text-align: center;
  padding-top: 50px;
}



</style>