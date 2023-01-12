<!--
 * @Descripttion: layout
 * @version:
 * @Author: kdsec
 * @Date: 2021-09-03 09:29:50
 * @LastEditors: kdsec
 * @LastEditTime: 2021-09-07 16:56:47
-->
<template>
  <div class="layout">
    <a-layout :class="['admin-layout', 'beauty-scroll']">
      <div class="header"><PageHeader /></div>
      <a-layout class="admin-layout-main beauty-scroll">
        <a-layout-content class="admin-layout-content"> <!--  :style="`min-height: ${minHeight}px;`" -->
          <div style="position: relative" class="main_content">
            <router-view></router-view>
          </div>
        </a-layout-content>
        <a-layout-footer style="padding: 0px">
          <page-footer :link-list="footerLinks" :copyright="copyright" />
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </div>
</template>
<script>
import PageHeader from './components/PageHeader'
import PageFooter from './components/PageFooter'
import { mapState } from 'vuex'

export default {
  name: 'Layout',
  components: {
    PageHeader,
    PageFooter
  },
  props: {},
  data() {
    return {
      minHeight: window.innerHeight - 90 - 45
    }
  },
  computed: {
    ...mapState('setting', ['footerLinks', 'copyright'])
  },
  created() {},
  mounted() {},
  methods: {}
}
</script>
<style lang="less" scoped>
.layout {
  width: 100%;
  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 999;
    background-color: #142437;

  }
  // .ant-layout {
  //   top: 45px;
  // }
  .admin-layout-main {
    top: @titleHeight;
    .admin-layout-content {
      .view-height();
      .main_content {
        padding: @padding @padding 0;
      }
    }
  }
}
</style>
