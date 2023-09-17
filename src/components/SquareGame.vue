<template>
  <button class="square" @click="clickSquare">{{ value }}</button>
</template>

<script>
export default {
  props: ['value'],
  methods: {
    clickSquare() {
      this.$emit('click');
    }
  }
}
</script>

<style scoped>
.square {
  width: 100px;
  height: 100px;
  font-size: 44px;
  background-color: #fff;
  border: 1px solid #999;
  text-align: center;
  line-height: 50px;
}

</style>
