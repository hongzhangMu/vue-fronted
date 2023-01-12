<!--
 * @Descripttion:
 * @version:
 * @Author: kdsec
 * @Date: 2021-04-06 10:10:09
 * @LastEditors: kdsec
 * @LastEditTime: 2021-09-14 15:54:35
-->
<template>
  <div class="login">
    <div class="layout">
      <div class="header">
        <div class="top">
          <!-- <img :src="headerIngUrl"> -->
          <div class="titlecenter">标题</div>
        </div>
      </div>
      <!-- <div class="main">
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
            <a-button style="width: 100%;margin-top: 24px" size="large" type="primary">
              登录
            </a-button>
          </a-form-model-item>
        </a-form-model>
      </div> -->
      <div class="footer">
        <div class="bottom">
          <!-- <img :src="footerImgUrl"> -->
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
      footerImgUrl: require('@/assets/img/footer.png')
    }
  },

  methods: {
  }
}
</script>

<style lang="less" scoped>
@fit: contain;
.login{
  position: relative;
  height: 100vh;
  .layout {
    height: 100vh;
    width: 100%;
    background: top center url('~@/assets/img/top.png')  no-repeat;
    background-size: 100% auto;
    .footer {
      height: calc(100vh - 21px);
      background: bottom center url('~@/assets/img/footer.png') no-repeat;
      background-size: 100% auto;
      z-index: 999;
      width:100%;
    }
    .titlecenter, .footercenter{
      text-align: center;
      // font-size: 1em;
    }
    .bottom{
      height: calc(100vh - 21px);
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
    }
  }
}
// @media screen and (max-width: 598px) {
//   .login .layout .header .titlecenter {
//     font-size: 18px;
//     font-weight: 500;
//   }
// }
</style>
