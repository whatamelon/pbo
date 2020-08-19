<template>
    <button class="plusButton" @click="openbodytypeModal">
        <p class="plusButton__exp">피드백<br/>남기기</p>
    </button>
</template>

<script>
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions([
      "openBodytypeSheet",
      "openBodytypeModal",
    ]),

    openbodytypeModal(event) {
      event.preventDefault();
      event.stopPropagation();
      this.$amplitude.getInstance().logEvent("click floatingbutton", { contents : "피드백남기기"});
      this.$store.dispatch("openBodytypeSheet");
    }
  }
};
</script>

<style lang="scss" scoped>
.plusButton{
    width:65px;
    height:65px;
    position: fixed;
    background-color: $primary;
    justify-content: center;
    border-radius: 50px;
    right: 5%;
    bottom: 150px;
  box-shadow: 0 0px 5px 5px rgba(255, 3, 62, 0.2);
  z-index: 100;
    &__exp{
        font-weight: 800;
        color:#fff;
        font-size: 0.85em;
        margin: 2px 0 0 0px !important;
    }
}
</style>
