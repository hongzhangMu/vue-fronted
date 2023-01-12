<!--
 * @Descripttion: 登录页面
 * @version:
 * @Author: kdsec
 * @Date: 2021-08-23 10:11:51
 * @LastEditors: kdsec
 * @LastEditTime: 2023-01-12 12:17:27
-->
<template>
  <div class="login">
    <div class="top">
      <div class="header">
        <div class="center-top">
          <h1><img alt="logo" class="logo" src="@/assets/img/logo.png" />{{ $store.state.setting.systemName }}</h1>
        </div>
      </div>
    </div>
    <div class="login_main_content">
      <div class="panel">
        <div class="panel-inner">
          <a-tabs size="large" :tab-bar-style="{textAlign: 'center'}" style="padding: 0 2px;">
            <a-tab-pane key="1" tab="账户密码登录">
              <a-form-model
                ref="loginInfoForm"
                class="form"
                :model="loginInfo"
                :rules="rules"
                :wrapper-col="{span: 24}"
              >
                <a-form-model-item prop="username">
                  <a-input v-model="loginInfo.username" placeholder="请输入用户名"><a-icon slot="prefix" type="user" /></a-input>
                </a-form-model-item>
                <a-form-model-item prop="password">
                  <a-input-password v-model="loginInfo.password" placeholder="请输入密码"><a-icon slot="prefix" type="lock" /></a-input-password>
                </a-form-model-item>
                <a-form-model-item :wrapper-col="{ span: 24 }">
                  <a-button :loading="loading" style="width: 100%;margin-top: 24px" size="large" type="primary" @click="onSubmit">
                    登录
                  </a-button>
                </a-form-model-item>
              </a-form-model>
            </a-tab-pane>
          </a-tabs>
        </div>
      </div>
      <div class="copyright">
        Copyright<a-icon type="copyright" />{{ copyright }}
      </div>
    </div>
    <vue-particles
      class="particles"
      color="#dedede"
      :particle-opacity="0.7"
      :particles-number="60"
      shape-type="circle"
      :particle-size="4"
      lines-color="#dedede"
      :lines-width="1"
      :line-linked="true"
      :line-opacity="0.5"
      :lines-distance="150"
      :move-speed="3"
      :hover-effect="true"
      hover-mode="grab"
      :click-effect="true"
      click-mode="push"
    >
    </vue-particles>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'Login',
  components: {},
  props: {},
  data() {
    return {
      rules: {
        username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
      },
      loginInfo: {
        username: 'jinjin',
        password: '123456'
      },
      redirect: undefined,
      otherQuery: {},
      loading: false
    }
  },
  computed: {
    ...mapState('setting', ['copyright'])
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
  },
  mounted() {},
  methods: {
    onSubmit() {
      this.$refs.loginInfoForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginInfo)
            .then(() => {
              this.$router.push({ path: '/', query: this.otherQuery })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}
</script>
<style lang="less" scoped>
@topHeight: 33%;
.particles {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}
.login{
  width: 100%;
  height: 100vh;
  background-image: url('~@/assets/img/bg.png');
  background-repeat: no-repeat;
  background-position-x: center;
  // background-position-y: 110px;
  background-size: cover;
  background-color: #142437;
  .top {
    height: @topHeight;
    .header {
      height: 40px;
      line-height: 40px;
      padding-top: 30px;
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
    .center-top > h1 {
      color: #cdddf7;
      font-size: 24.5px;
      font-weight: 900;
      letter-spacing: 5px;
    }
  }
  .login_main_content {
    height: calc(100vh - @topHeight);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .panel {
      width: 468px;
      // margin: 0 auto;
      text-align: center;
      // padding: 0 50px;
      .icon {
        font-size: 24px;
        color: @text-color-second;
        margin-left: 16px;
        vertical-align: middle;
        cursor: pointer;
        transition: color 0.3s;

        &:hover {
          color: @primary-color;
        }
      }
      border: 2px solid transparent;
      border-image: url('~@/assets/img/border.png') 51 38 21 132;
      border-width: 2.125rem 1.583rem .875rem 5.5rem;
      margin-bottom: 1rem;
      .panel-inner{
        margin-top: -2.125rem;
        margin-right: -1.583rem;
        margin-bottom: -.875rem;
        margin-left: -5.5rem;
        padding: .833rem 1rem;
        position: relative;
        z-index: 999;
      }
    }
    .copyright{
      color: #fff;
      font-size: 14px;
      margin-bottom: 10px;
      i {
          margin: 0 4px;
      }
    }
  }

}

</style>
