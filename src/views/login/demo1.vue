<!--
 * @Descripttion:
 * @version:
 * @Author: kdsec
 * @Date: 2021-04-06 10:10:09
 * @LastEditors: kdsec
 * @LastEditTime: 2021-09-14 16:39:52
-->
<template>
  <div class="login">
    <div class="layout">
      <div class="header">
        <div class="top">
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
      loading: false,
      headerIngUrl: require('@/assets/img/top.png'),
      footerImgUrl: require('@/assets/img/footer.png')
    }
  },

  methods: {
  }
}
</script>

<style lang="less" scoped>
.login{
  position: relative;
  height: 100vh;
  width: 100%;
  .layout {
    height: 100vh;
    width: 100%;
    background-image: url('~@/assets/img/top.png'), url('~@/assets/img/footer.png');
    background-position: top center, bottom center;
    background-repeat: no-repeat, no-repeat;
    // background-size: 100% auto, 100% auto;
    .titlecenter {
      color: #fff;
      font-size: 2em;
      text-align: center;
      padding-top: 1.2em;
    }
    .footercenter {
      color: #fff;
      font-size: 1em;
      text-align: center;
      margin-bottom: 4em;
    }
    .bottom {
      height: calc(100vh - 6em);
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
    }
    .main {
      height: 100vh;
      width: 100%;
      position: fixed;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: -8em;
      .panel {
        width: 100%;
        background: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 21em;
      }
      .panel-inner{
        width: 468px;
        text-align: center;
        border: 2px solid transparent;
        z-index: 99;
        background: #fff;
        height: 21em;
      }
    }
  }
}
</style>
