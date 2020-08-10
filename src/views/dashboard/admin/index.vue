<template>
  <div class="dashboard-editor-container">

    <router-link to="/order/createRC/index">
      <el-row>
        <div class="button">새 교환/환불</div>
      </el-row>
    </router-link>
    <panel-group @handleSetLineChartData="handleSetLineChartData" />
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'

export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup
  },
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

.button{
  width: 200px;
  height: 50px;
  background-color: #bdbdbd;
  border-radius: 5%;
  font-size: 20px;
  font-weight: 600;
  text-align: center;
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}
</style>
