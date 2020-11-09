<template>

    <main class="home-container">
  <GoUpButton></GoUpButton>

    <div class="infoN__container" @click="flutterTest('pick:1')">
      <p class="infoN__title"> 요기를 누르시면 픽 1번으로 이동!</p>
    </div>
    <br/>
    <div class="infoN__container" @click="flutterTest('pickv:131')">
      <p class="infoN__title"> 요기를 누르시면 유튜브 픽 131번으로 이동!</p>
    </div>
    <br/>
    <div class="infoN__container" @click="flutterTest('picky:9')">
      <p class="infoN__title"> 요기를 누르시면 9번 픽키로 이동!</p>
    </div>
    <br/>
    <div class="infoN__container" @click="flutterTest('board:1')">
      <p class="infoN__title"> 요기를 누르시면 공지사항으로 이동</p>
    </div>
    <br/>
    <div class="infoN__container" @click="flutterTest('product:5')">
      <p class="infoN__title"> 요기를 누르시면 5번 피클링 상품으로 이동!</p>
    </div>
    <br/>
    <div class="infoN__container" @click="flutterTest('oitem:15')">
      <p class="infoN__title"> 요기를 누르시면 15번 구상품으로 이동!</p>
    </div>
    
    </main>
</template>

<script>
export default {

  data() {
    return {
    };
  },

   computed: {
  },

  async asyncData({ store, to }) {

  },

created() {
},

  beforeMount() {
  },

mounted() {
},

methods:{

flutterTest(i) {
    console.log('postMessage')
    PicklingBridge.postMessage(i);
}

},

  beforeRouteLeave(to, from, next) {
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