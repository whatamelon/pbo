<template>

<div id="app" v-cloak>
  <v-client-table :columns="columns" v-model="data" :options="options">
    <a slot="uri" slot-scope="props" target="_blank" :href="props.row.uri" class="glyphicon glyphicon-eye-open"></a>

    <div slot="child_row" slot-scope="props">
      The link to {{props.row.name}} is <a :href="props.row.uri">{{props.row.uri}}</a>
    </div>

    <div slot="name" slot-scope="{row, update, setEditing, isEditing, revertValue}">
      <span @click="setEditing(true)" v-if="!isEditing()">
        <a>{{row.name}}</a>
      </span>
      <span v-else>
        <input type="text" v-model="row.name">
        <button type="button" class="btn btn-info btn-xs" @click="update(row.name); setEditing(false)">Submit</button>
       <button type="button" class="btn btn-default btn-xs" @click="revertValue(); setEditing(false)">Cancel</button>
      
      </span>

    </div>

  </v-client-table>
</div>


</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
data() {
    return{
        columns: ['name', 'code', 'uri'],
        data: getList(),
        options: {
        headings: {
            name: 'Country Name',
            code: 'Country Code',
            uri: 'View Record'
        },
        editableColumns:['name'],
        sortable: ['name', 'code'],
        filterable: ['name', 'code']
        }
    }
},
computed: {
    ...mapGetters([
      "USER_HEIGHT",
      "FOLLOWING_MODELS",
      "IMAGE_URL",
      "ORDER_LIST"
    ])
  },

methods:{
    getList() {
        return this.$store.getters.ORDER_LIST;
    },

    goToFollow() {
        this.$router.push("/follow");
    },
    goToModels() {
        this.$amplitude.getInstance().logEvent("click addModel");
        this.$router.push("/model");
    },
    goToModel(model){
        this.$amplitude
        .getInstance()
        .logEvent("click model-profile", { modelId: model.modelId , clickedModelPage: "큐레이션" });

        this.$store.dispatch("setModel", model);
        const recentModelId = JSON.parse(localStorage.recentModelId);
        recentModelId.push(model);
        localStorage.recentModelId = JSON.stringify(recentModelId);
        this.$router.push("/model/" + model.modelId);
    }
}
}
</script>
<style lang="scss" scoped>#app {
  width: 95%;
  margin: 0 auto;
}

.VuePagination {
  text-align: center;
}

.vue-title {
  text-align: center;
  margin-bottom: 10px;
}

.vue-pagination-ad {
  text-align: center;
}

.glyphicon.glyphicon-eye-open {
  width: 16px;
  display: block;
  margin: 0 auto;
}

th:nth-child(3) {
  text-align: center;
}

.VueTables__child-row-toggler {
  width: 16px;
  height: 16px;
  line-height: 16px;
  display: block;
  margin: auto;
  text-align: center;
}

.VueTables__child-row-toggler--closed::before {
  content: "+";
}

.VueTables__child-row-toggler--open::before {
  content: "-";
}

[v-cloak] {
  display:none;
}
</style>