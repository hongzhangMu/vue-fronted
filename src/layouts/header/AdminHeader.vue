<template>
  <a-layout-header :class="[headerTheme, 'admin-header']">
    <div :class="['admin-header-wide', layout, pageWidth]">
      <div v-if="isMobile || layout === 'head'" :class="['logo', isMobile ? null : 'pc', headerTheme]">
        <img width="32" src="@/assets/img/logo.png" />
        <h1 v-if="!isMobile">{{ systemName }}</h1>
      </div>
      <a-divider v-if="isMobile" type="vertical" />
      <a-icon v-if="layout !== 'head'" class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="toggleCollapse" />
      <div v-if="layout !== 'side' && !isMobile" class="admin-header-menu" :style="`width: ${menuWidth};`">
        <i-menu class="head-menu" :theme="headerTheme" mode="horizontal" :options="menuData" @select="onSelect" />
      </div>
      <div :class="['admin-header-right', headerTheme]">
        <!-- <header-search class="header-item" @active="val => searchActive = val" /> -->
        <!-- <a-tooltip class="header-item" title="自定义标签" placement="bottom">
          <a @click="openCustomLabels">
            <a-icon type="form" />
          </a>
        </a-tooltip>
        <a-tooltip class="header-item" title="小工具" placement="bottom">
          <a @click="openMiniTool">
            <a-icon type="tool" />
          </a>
        </a-tooltip>
        <a-tooltip class="header-item" title="组件配置" placement="bottom">
          <a @click="openSetting">
            <a-icon type="setting" />
          </a>
        </a-tooltip> -->
        <!-- <header-notice class="header-item"/> -->
        <header-avatar v-if="hasToken" class="header-item" />
        <div v-else style="margin-right: 20px;cursor: pointer" @click="goLogin">去登录</div>
        <!-- <a-dropdown class="lang header-item">
            <div>
              <a-icon type="global"/> {{langAlias}}
            </div>
            <a-menu @click="val => setLang(val.key)" :selected-keys="[lang]" slot="overlay">
              <a-menu-item v-for=" lang in langList" :key="lang.key">{{lang.key.toLowerCase() + ' ' + lang.name}}</a-menu-item>
            </a-menu>
          </a-dropdown> -->
      </div>
    </div>
  </a-layout-header>
</template>

<script>
// import HeaderSearch from './HeaderSearch'
// import HeaderNotice from './HeaderNotice'
import HeaderAvatar from './HeaderAvatar'
import IMenu from '@/components/menu/menu'
import { mapState, mapMutations } from 'vuex'
import { getToken } from '@/utils/auth'

export default {
  name: 'AdminHeader',
  components: {
    IMenu,
    HeaderAvatar
    // HeaderNotice
  },
  props: {
    collapsed: {
      type: Boolean,
      default: false
    },
    menuData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      langList: [
        { key: 'CN', name: '简体中文', alias: '简体' },
        { key: 'HK', name: '繁體中文', alias: '繁體' },
        { key: 'US', name: 'English', alias: 'English' }
      ],
      searchActive: false
    }
  },
  computed: {
    ...mapState('setting', ['theme', 'isMobile', 'layout', 'systemName', 'lang', 'pageWidth']),
    headerTheme() {
      if (this.layout === 'side' && this.theme.mode === 'dark' && !this.isMobile) {
        return 'light'
      }
      return this.theme.mode
    },
    langAlias() {
      const lang = this.langList.find(item => item.key === this.lang)
      return lang.alias
    },
    menuWidth() {
      const { layout, searchActive } = this
      const headWidth = layout === 'head' ? '100% - 188px' : '100%'
      const extraWidth = searchActive ? '600px' : '400px'
      return `calc(${headWidth} - ${extraWidth})`
    },
    hasToken() {
      return getToken()
    }
  },
  methods: {
    openSetting() {
      this.$router.push({ name: '组件配置' })
    },
    openCustomLabels() {
      this.$router.push({ name: '自定义标签' })
    },
    openMiniTool() {
      this.$router.push({ name: '小工具' })
    },
    toggleCollapse() {
      this.$emit('toggleCollapse')
    },
    onSelect(obj) {
      this.$emit('menuSelect', obj)
    },
    goLogin() {
      this.$router.push('/login')
    },
    ...mapMutations('setting', ['setLang'])
  }
}
</script>

<style lang="less" scoped>
@import "index";
</style>
