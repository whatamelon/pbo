<template>
  <div class="layout-container">
    <div class="mobile-container">
      <div class="header-space"></div>

      <!-- <div v-if="$nuxt.isOffline" class="offline">
        <h1>오프라인이시네요!</h1>
        <h3>인터넷 연결을 확인해주세요.</h3>
      </div> -->

      <AppBottomNav></AppBottomNav>
      <v-app>
        <nuxt />
      </v-app>
    </div>
  </div>
</template>

<script>
import AppBottomNav from "@/components/App/AppBottomNav";

export default {
  components: {
    AppBottomNav
  },
};

</script>

<style lang="scss" scoped>
.layout-container {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  background-color: #f1f1f1;
  height: 100%;
  overflow-x: hidden;
}

.mobile-container {
  max-width: 500px;
  width: 500px;
  background-color: white;
  min-height: 100%;
}

.header-space {
  height: 50px;
}

.offline {
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  align-items: center;
  padding: 20px;
  text-align: center;
  height: 100vh;
  color: $primary;
}
</style>
