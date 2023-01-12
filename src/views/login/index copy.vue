<!--
 * @Descripttion: 登录页面
 * @version:
 * @Author: kdsec
 * @Date: 2021-08-23 10:11:51
 * @LastEditors: kdsec
 * @LastEditTime: 2021-09-03 11:32:55
-->
<template>
  <div class="login">
    <div class="bg">
      <div class="main">
        <div class="title">网络xm风险分析</div>
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
            <a-button type="primary" @click="onSubmit">
              登录
            </a-button>
          </a-form-model-item>
        </a-form-model>
        <div class="copyright">
          Copyright<a-icon type="copyright" />{{ copyright }}
        </div>
      </div>
    </div>
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
        username: 'root',
        password: '123456'
      },
      redirect: undefined,
      otherQuery: {}
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
  created() {},
  mounted() {},
  methods: {
    onSubmit() {
      this.$refs.loginInfoForm.validate(valid => {
        if (valid) {
          this.$store.dispatch('user/login', this.loginInfo)
            .then(() => {
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
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
.login {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: auto;
  .bg {
    background-image: url('~@/assets/img/bg.jpg');
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-position-x: center;
    background-size: cover;
    .main {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      .form {
        background: #ddd9;
        width: 35%;
        padding: 20px;
        text-align: left;
        ::v-deep .ant-btn-primary{
          width: 100%;
        }
        ::v-deep .ant-input-affix-wrapper .ant-input-prefix {
          color: #d9d9d9;
        }
      }
      .title {
        font-size: 40px;
        font-weight: bold;
        margin-top: 20px;
        letter-spacing: 5px;
      }
      .copyright{
        color: #ddd; // @text-color-second;
        font-size: 14px;
        margin-bottom: 10px;
        i {
            margin: 0 4px;
        }
      }
    }
  }
}
</style>
