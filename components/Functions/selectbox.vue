<template>
    <select
          :value="value"
          class="custom-select"
          @input="clicked"
    >
        <option 
        :disabled="index == 0"
        v-for="(item, index) in items" 
        :value="item.keyword" 
        :key="item.no">{{ item.keyword }}</option>
    </select>
</template>

<script>
    export default {
        name: "SelectBox",

        data() {
            return {

            };
        },

        props: ['value', 'items', 'input_id'],

        methods: {
            clicked($event) {
                this.$emit("input", $event.target.value);
            }
        }

    }

</script>

<style lang="scss">
.custom-select{
    width: 250px;
}
</style>