<template>
  <div class="layout-container">
    <div class="mobile-container">
      <v-app>
        <nuxt />
      </v-app>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.layout-container {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  background-color: $white;
  min-height: 100vh;
  height: 100%;
}

.mobile-container {
  max-width: 500px;
  width: 500px;
  background-color: $primary;
  min-height: 100vh;
  height: 100%;
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
