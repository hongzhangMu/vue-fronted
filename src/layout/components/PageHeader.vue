<!--
 * @Descripttion: PageHeader
 * @version:
 * @Author: kdsec
 * @Date: 2021-09-03 09:33:53
 * @LastEditors: kdsec
 * @LastEditTime: 2021-09-03 13:55:27
-->
<template>
  <div class="pageHeader">
    <div class="top">
      <div class="header">
        <div class="center-top">
          <h1><img alt="logo" class="logo" src="@/assets/img/logo.png" />{{ $store.state.setting.systemName }}</h1>
        </div>
      </div>
      <div class="desc"></div>
    </div>
    <div class="userInfo"><HeaderAvatar /></div>
  </div>
</template>
<script>
import HeaderAvatar from './HeaderAvatar'

export default {
  name: 'PageHeader',
  components: {
    HeaderAvatar
  },
  props: {},
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {}
}
</script>
<style lang="less" scoped>
.pageHeader {
  position: relative;
  width: 100%;
  padding: 15px 0;
  height: @titleHeight;
  .top {
    text-align: center;
    .header {
      height: 44px;
      line-height: 44px;
      a {
        text-decoration: none;
      }
      .logo {
        height: 44px;
        vertical-align: middle;
        margin-right: 16px;
      }
      .title {
        font-size: 33px;
        color: @title-color;
        font-family: 'Myriad Pro', 'Helvetica Neue', Arial, Helvetica, sans-serif;
        font-weight: 600;
        position: relative;
        top: 2px;
      }
    }
    .desc {
      font-size: 14px;
      color: @text-color-second;
      margin-top: 12px;
      margin-bottom: 100px;
    }
    .center-top {
      width: 100%;
      position: relative;
      top: 0;
      left: 0;
      background: url('~@/assets/img/header.png') bottom no-repeat;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .center-top>h1 {
      color: #cdddf7;
      font-size: 24.5px;
      font-weight: 900;
      letter-spacing: 5px;
    }
  }
  .userInfo {
    position: absolute;
    height: @titleHeight;
    top: 0;
    right: 10px;
  }
}
@media screen and (max-width: 750px) {
  .userInfo {
    display: none;
  }
}
</style>
