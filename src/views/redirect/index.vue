<!--
 * @Descripttion:
 * @version:
 * @Author: kdsec
 * @Date: 2021-08-25 14:38:30
 * @LastEditors: kdsec
 * @LastEditTime: 2021-08-31 16:34:10
-->
<script>
export default {
  created() {
    const { params, query } = this.$route
    const { path } = params
    this.$router.replace({ path: '/' + path, query })
  },
  render: function(h) {
    return h() // avoid warning message
  }
}
</script>
