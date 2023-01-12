<!--
 * @Descripttion:
 * @version:
 * @Author: kdsec
 * @Date: 2021-08-27 14:33:50
 * @LastEditors: kdsec
 * @LastEditTime: 2021-09-08 13:53:25
-->
<template>
  <a-dropdown>
    <div class="header-avatar" style="cursor: pointer">
      <a-avatar class="avatar" size="small" shape="circle" :src="avatar" />
      <span class="name">{{ username }}</span>
    </div>
    <a-menu slot="overlay" :class="['avatar-menu']">
      <a-menu-item v-show="false">
        <a-icon type="user" />
        <span>个人中心</span>
      </a-menu-item>
      <a-menu-item v-show="false">
        <a-icon type="setting" />
        <span>设置</span>
      </a-menu-item>
      <a-menu-divider v-show="false" />
      <a-menu-item @click="logout">
        <a-icon style="margin-right: 8px;" type="poweroff" />
        <span>退出登录</span>
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>

<script>
import { mapGetters } from 'vuex'
// import userApi from '@/api/user'

export default {
  name: 'HeaderAvatar',
  computed: {
    ...mapGetters({ avatar: 'avatar', username: 'username' })
  },
  methods: {
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less">
  .header-avatar{
    display: inline-flex;
    .avatar, .name{
      align-self: center;
    }
    .avatar{
      margin-right: 8px;
    }
    .name{
      font-weight: 500;
    }
  }
  .avatar-menu{
    width: 150px;
  }

</style>
