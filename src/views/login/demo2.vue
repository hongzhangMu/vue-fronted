<!--
 * @Descripttion:
 * @version:
 * @Author: kdsec
 * @Date: 2021-04-06 10:10:09
 * @LastEditors: kdsec
 * @LastEditTime: 2023-01-12 10:59:59
-->
<template>
  <div class="login">
    <div class="layout">
      <div class="header">
        <div class="top">
          <img :src="headerIngUrl">
          <div class="titlecenter">标题</div>
        </div>
      </div>
      <div class="main">
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
                    <a-button :loading="loading" style="width: 100%;margin-top: 24px" size="large" type="primary">
                      登录
                    </a-button>
                  </a-form-model-item>
                </a-form-model>
              </a-tab-pane>
            </a-tabs>
          </div>
        </div>
      </div>
      <div class="footer">
        <div class="bottom">
          <img :src="footerImgUrl">
          <div class="footercenter">
            <div>介绍</div>
            <div>介绍</div>
            <div>介绍</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Login',
  // components: {CommonLayout},
  data() {
    return {
      rules: {
        username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
      },
      loginInfo: {
        username: 'root',
        password: 'iie!@#$%^'
      },
      headerIngUrl: require('@/assets/img/top.png'),
      footerImgUrl: require('@/assets/img/footer.png'),
      loading: false
    }
  },

  methods: {
  }
}
</script>

<style lang="less" scoped>
.login{
  position: relative;
  .layout {
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    img {
      width: 100%;
    }
    .header {
      position: relative;
      width: 100%;
      img {
        height: 10em;
      }
      .titlecenter {
        position: absolute;
        left: 0;
        top: 50%;
        width: 100%;
        text-align: center;
        margin-top:-20px;
        color: #fff;
        font-size: 30px;
        font-weight: 900;
        letter-spacing: 5px;
      }
    }
    .footer {
      width: 100%;
      position: relative;
      img {
        height: 12em;
      }
      .footercenter {
        position: absolute;
        left: 0;
        top: 50%;
        width: 100%;
        text-align: center;
        margin-top: -18px;
        color: #fff;
        font-size: 12px;
        letter-spacing: 5px;
      }
    }
    .main {
      width: 100%;
      .panel {
        width: 100%;
        background: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .panel-inner{
        width: 468px;
        text-align: center;
        border: 2px solid transparent;
        background: #fff;
      }
    }
  }
}
@media screen and (max-width: 598px) {
  .login .layout .header .titlecenter {
    font-size: 18px;
    font-weight: 500;
  }
}
</style>
