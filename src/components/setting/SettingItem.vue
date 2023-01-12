<!--
 * @Descripttion:
 * @version:
 * @Author: kdsec
 * @Date: 2022-06-13 15:51:32
 * @LastEditors: kdsec
 * @LastEditTime: 2022-06-13 16:21:05
-->
<template>
  <div class="setting-item">
    <h3 v-if="title" class="title">{{ title }}</h3>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'SettingItem',
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="less" scoped>
  .setting-item{
    margin-bottom: 24px;
    .title{
      font-size: 14px;
      color: @title-color;
      line-height: 22px;
      margin-bottom: 12px;
    }
  }
</style>
