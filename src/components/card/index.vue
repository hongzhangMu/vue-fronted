<!--
 * @Descripttion: Card
 * @version:
 * @Author: kdsec
 * @Date: 2021-09-01 09:16:28
 * @LastEditors: kdsec
 * @LastEditTime: 2021-09-10 14:19:46
-->
<template>
  <div class="card">
    <a-card :title="title">
      <a-spin :spinning="loading">
        <slot></slot>
      </a-spin>
    </a-card>
  </div>
</template>
<script>
export default {
  name: 'Card',
  components: {},
  props: {
    title: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
    }
  },
  created() {},
  mounted() {},
  methods: {}
}
</script>
<style lang="less" scoped>
.card {
  .card_body()
}
</style>
