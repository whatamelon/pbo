<template>
<transition>

    <main class="home-container">
      <table>
        <thead>
          <th>주문번호</th>
          <th>주문날짜</th>
          <th>주문자 이름</th>
          <th>결제 금액</th>
          <th>주문 상태</th>
        </thead>
        <tbody>
          <tr
            v-for="order in getList"
            :key="order.orderId"
            class="category"
          >
            <td>{{ order.orderId }}</td>
            <td>{{ order.crDate }}</td>
            <td>{{ order.name }}</td>
            <td>{{ order.priceTotal }}</td>
            <td>{{ order.stateTitle }}</td>
          </tr>
        </tbody>
      </table>

    </main>
</transition>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    components: {
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
      orderId: '10081'
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
     await store.dispatch("getOrderItemList",10081)
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

</style>