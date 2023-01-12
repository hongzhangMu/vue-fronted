<!--
 * @Descripttion: PageHeader
 * @version:
 * @Author: kdsec
 * @Date: 2021-09-03 09:33:53
 * @LastEditors: kdsec
 * @LastEditTime: 2021-09-08 15:27:53
-->
<template>
  <div class="pageHeader">
    <div class="top">
      <div>
        <img alt="logo" class="logo" src="@/assets/img/logo.png" />
        <span class="empty"></span>
        <span class="name">{{ $store.state.setting.systemName }}</span>
      </div>
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
  padding: 15px @padding;
  height: @titleHeight;
  .top {
    display: flex;
    align-items: center;
    height: @titleHeight - 30px;
    .logo {
      height: 44px;
      margin-right: 16px;
    }
    & > div {
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
    right: @padding;
  }
}
@media screen and (max-width: 470px) {
  .userInfo {
    display: none;
  }
}
@media screen and (max-width: 336px) {
  .top .empty {
    &:after{
      content: '...'
    }
  }
  .top .name {
    display: none;
  }
}
</style>
