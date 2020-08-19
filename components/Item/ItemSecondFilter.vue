<template>
  <div class="secCategory-container__first"
  ref="secCategoryContainerFirst">
    <div
      ref="horizontalCategory"
      class="secCategory-container"
      id="secCategory__container__top"
    ><label
        v-for="category in categories"
        :key="category.code"
        class="secCategory"
        :class="{ 'secCategory--active': ACTIVE_SECOND_CATEGORY.code == category.code }"
        @click="changeCategory(category)"
        id="category__label"
      >
        <span>{{ category.name }}</span>
      </label>
    </div>
    <div class="secCategory-space"
    ref="secCategorySpace"
    id="secCategorySpace"></div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {

  computed: {
    ...mapGetters([
      "SECOND_CATEGORY",
     "ACTIVE_SECOND_CATEGORY",
      "ITEM_FIRST_FILTER",
      "FIRST_CATEGORY"
     ]),

     categories () {
       return this.$store.getters.SECOND_CATEGORY;
     }
  },

  methods: {

      changeCategory(category) {
      
        this.$store.dispatch("setOffset", 0);
       this.$store.dispatch("setPageNumber", 1);
      this.$store.dispatch("resetFilter");
         this.$store.dispatch("setActiveSecondCategory", category);
       console.log(category.code)   
       
            this.$store.dispatch("getAllProducts");
     window.scrollTo(0,0);
    }
  }
};
</script>

<style lang="scss" scoped>
.secCategory-container {
  z-index: 2;
  margin: 0;
  padding: 0;
  border-bottom: 1px solid $light-grey;
  white-space: nowrap;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: -ms-autohiding-scrollbar;
  position: absolute;
  left: auto;
  right: auto;
  width: 100%;
  max-width: 500px;
  text-align: left;
  background-color: $white;
  &::-webkit-scrollbar {
    display: none;
  }
}


.secCategory {
  margin: 0 15px;
  padding: 10px 0;
  border: none;
  width: auto;
  font-size: 0.85em;
  font-weight: 400;
  background: transparent;
  color: $grey;
  box-shadow: none;
  z-index: 2;

  &:visited,
  &:hover,
  &:active,
  &:focus {
    color: #000;
    font-weight: 800;
  }

  &--active {
    color: #000;
    border-bottom: 2px solid #000;
    font-weight: 800;
  }
}

.secCategory-space {
  height: 40px;
}
</style>
