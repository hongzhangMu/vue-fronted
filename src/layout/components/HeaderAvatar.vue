<!--
 * @Descripttion:
 * @version:
 * @Author: kdsec
 * @Date: 2021-08-27 14:33:50
 * @LastEditors: kdsec
 * @LastEditTime: 2021-09-07 13:29:37
-->
<template>
  <div class="headerAvatar">
    <a-dropdown class="dropdown flexRowCenter button">
      <span style="margin-right: 15px;cursor: pointer">
        <SvgIcon name="lang" />
      </span>

      <a-menu slot="overlay">
        <a-menu-item
          v-for="(item, index) in languageList"
          :key="index"
          icon="*"
          :disabled="lang === item.key"
          @click="handleChangeLanguage(item.key)"
        >{{ item.name }}</a-menu-item>
      </a-menu>
    </a-dropdown>
    <a-dropdown>
      <div class="header-avatar" style="cursor: pointer">
        <a-avatar class="avatar" shape="circle" :src="avatar" />
        <span class="name">{{ username }}</span>
      </div>
      <a-menu slot="overlay" :class="['avatar-menu']">
        <a-menu-item @click="logout">
          <a-icon style="margin-right: 8px;" type="poweroff" />
          <span>退出登录</span>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'
// import userApi from '@/api/user'

export default {
  name: 'HeaderAvatar',
  data() {
    return {
      languageList: []
    }
  },
  computed: {
    ...mapGetters({ avatar: 'avatar', username: 'username' }),
    lang() {
      return this.$store.getters['app/lang']
    }
  },
  created() {},
  mounted() {
    this.getLangList()
  },
  methods: {
    async logout() {
      // userApi.logout()
      await this.$store.dispatch('user/logout')
      this.$router.push('/login')
    },
    // 获取现有语言信息
    getLangList() {
      var messages = this.$i18n.messages
      Object.keys(messages).forEach(key => {
        this.languageList.push({
          key: key,
          name: messages[key].lang.name
        })
      })
    },
    // 点击切换语言
    handleChangeLanguage(lang) {
      this.$store.dispatch('app/changeLang', lang)
    }
  }
}
</script>

<style lang="less">
.headerAvatar {
  height: 100%;
  display: flex;
  align-items: center;
  color: #fff;
}
.header-avatar{
  display: inline-flex;
  .avatar, .name{
    align-self: center;
  }
  .avatar{
    margin-right: 8px;
  }
  .name{
    font-size: 16px;
    font-weight: 500;
  }
}
.avatar-menu{
  width: 150px;
}
</style>
