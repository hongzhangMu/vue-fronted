<!--
 * @Descripttion:
 * @version:
 * @Author: kdsec
 * @Date: 2021-08-27 14:34:07
 * @LastEditors: kdsec
 * @LastEditTime: 2021-08-27 14:44:17
-->
<template>
  <div class="head-info">
    <span>{{ title }}</span>
    <p>{{ content }}</p>
  </div>
</template>

<script>
export default {
  name: 'HeadInfo',
  props: ['title', 'content', 'bordered']
}
</script>

<style lang="less" scoped>
  .head-info{
    text-align: center;
    padding: 0 24px;
    flex-grow: 1;
    flex-shrink: 0;
    align-self: center;
    span{
      color: @text-color-second;
      display: inline-block;
      font-size: 14px;
      margin-bottom: 4px;
    }
    p{
      color: @text-color;
      font-size: 24px;
      margin: 0;
    }
  }
</style>
