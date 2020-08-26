<template>
<transition>

    <main class="home-container">

    <div class="ol-filter">
      <span>날짜</span>
      <date-picker v-model="time3"  range type="date" placeholder="날짜를 선택해주세요." value-type="format"></date-picker>
    </div>

    <div @click="getOrderList2()" >
      <span>리스트 불러오기</span>
    </div>

      <table>
        <thead>
          <th>주문번호</th>
          <th>주문날짜</th>
          <th>주문자 이름</th>
          <th>주문자 유저 아이디</th>
          <th>결제 금액</th>
          <th>주문 상태</th>
        </thead>
        <tbody>
          <tr
            v-for="order in getList"
            :key="order.orderId"
            class="category"
          >
            <td @click="getOrderId(order.orderId)" class="ol-td">{{ order.orderId }}</td>
            <td class="ol-td">{{ order.crDate }}</td>
            <td class="ol-td">{{ order.name }}</td>
            <td class="ol-td">{{ order.userId }}</td>
            <td class="ol-td">{{ order.priceTotal }}</td>
            <td class="ol-td">{{ order.stateTitle }}</td>
          </tr>
        </tbody>
      </table>

    </main>
</transition>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
  import DatePicker from 'vue2-datepicker';
  import 'vue2-datepicker/index.css';

export default {
    components: {
      DatePicker
      // OrderList
    },

  transition (to) {
    if (localStorage.getItem("backButton")){
    return 'slideLeft'
    }
    else if (
              to.name == "curate-id" ||
              to.name == "curate-height" ||
              to.name == "curate-follow" ||
              to.name == "curate-bodytype" ||
              to.name == "saved") {
    return 'slideRight'
    }
    else if(to.name == "model" ||
    to.name == "home" ||
    to.name == "mypage" ||
    localStorage.getItem("previousPage") == "product-id" ||
    localStorage.getItem("previousPage") == "model-id") {
      return "nothing"
    }
  },

  data() {
    return {
      orderId: '10081',
      time3: null,
    };
  },

   computed: {
    ...mapGetters([
      "IMAGE_URL",
      "ORDER_LIST",
      "ORDER_ITEM_LIST"
    ]),
  getList() {
    return this.$store.getters.ORDER_LIST;
  }
  },

    
  async asyncData({ store, to }) {
  
     await store.dispatch("getOrderList")
  },

created() {

    //  console.log(this.orderId)
    window.addEventListener("scroll", this.homeBottom);
},

  beforeMount() {
  },

mounted() {
    this.$store.dispatch("setLogo","hasLogo");
},

methods:{

 async getOrderId(i) {
     await this.$store.dispatch("getOrderItemList",i)
  },

  async getOrderList2() {
    console.log(this.time3);
    var i = this.time3[0].replace(/-/gi,"").slice(2);
    var j = this.time3[1].replace(/-/gi,"").slice(2);

    console.log(i);
    console.log(j);

  }
},

  beforeRouteLeave(to, from, next) {
      window.removeEventListener("scroll", this.homeBottom);
    localStorage.setItem("routerStack",this.$route.path);
    next();
  }
}
</script>

<style lang="scss" scoped>

table{
width:100%;
text-align: center;
margin-bottom: 100px;
}

th{
  padding : 2% 4%;
}

tr {
  border: 1px solid #000000;
}

td {
  padding : 2% 4%;
}

.ol {
&-td {
    font-size: 9pt;
  }

  &-filter{
    padding: 3% 2% 0 2%;
  }

  &-filter > span {
    padding: 0 2% 0 0;
  }
}

</style>