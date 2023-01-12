<!--
 * @Descripttion:
 * @version:
 * @Author: kdsec
 * @Date: 2021-08-20 09:14:11
 * @LastEditors: kdsec
 * @LastEditTime: 2022-06-13 16:22:43
-->
<template>
  <a-config-provider :locale="locale" :get-popup-container="popContainer">
    <router-view />
  </a-config-provider>
</template>
<script>
import { enquireScreen } from './utils/util'
import { mapState, mapMutations } from 'vuex'
import themeUtil from '@/utils/themeUtil'
// import { getI18nKey } from '@/utils/routerUtil'

export default {
  name: 'App',
  data() {
    return {
      locale: {}
    }
  },
  computed: {
    ...mapState('setting', ['layout', 'theme', 'weekMode', 'lang'])
  },
  watch: {
    weekMode(val) {
      this.setWeekModeTheme(val)
    },
    lang(val) {
      this.setLanguage(val)
      this.setHtmlTitle()
    },
    $route() {
      this.setHtmlTitle()
    },
    'theme.mode': function(val) {
      const closeMessage = this.$message.info(`您选择了主题模式 ${val}, 正在切换...`)
      themeUtil.changeThemeColor(this.theme.color, val).then(closeMessage)
    },
    'theme.color': function(val) {
      const closeMessage = this.$message.info(`您选择了主题色 ${val}, 正在切换...`)
      themeUtil.changeThemeColor(val, this.theme.mode).then(closeMessage)
    },
    'layout': function() {
      window.dispatchEvent(new Event('resize'))
    }
  },
  created() {
    this.setHtmlTitle()
    this.setLanguage(this.lang)
    enquireScreen(isMobile => this.setDevice(isMobile))
  },
  mounted() {
    this.setWeekModeTheme(this.weekMode)
  },
  methods: {
    ...mapMutations('setting', ['setDevice']),
    setWeekModeTheme(weekMode) {
      if (weekMode) {
        document.body.classList.add('week-mode')
      } else {
        document.body.classList.remove('week-mode')
      }
    },
    setLanguage(lang) {
      // this.$i18n.locale = lang
      //   switch (lang) {
      //     case 'CN':
      this.locale = require('ant-design-vue/es/locale-provider/zh_CN').default
      //       break
      //     case 'HK':
      //       this.locale = require('ant-design-vue/es/locale-provider/zh_TW').default
      //       break
      //     case 'US':
      //     default:
      //        this.locale = require('ant-design-vue/es/locale-provider/en_US').default
      //       break
      //   }
    },
    setHtmlTitle() {
      const route = this.$route
      const key = route.path === '/dashboard' ? null : route.name
      document.title = process.env.VUE_APP_NAME + (key ? ' | ' + key : '')
    },
    popContainer() {
      return document.getElementById('popContainer')
    }
  }
}
</script>

<style lang="less">
// * {
//   margin: 0;
//   padding: 0;
// }
// #app {
//   font-family: Avenir, Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
// }

// #nav {
//   padding: 30px;

//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>
