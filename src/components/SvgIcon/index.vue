<!--
 * @Descripttion: SvgIcon
 * @version:
 * @Author: kdsec
 * @Date: 2021-08-20 09:22:40
 * @LastEditors: kdsec
 * @LastEditTime: 2022-07-15 15:18:11
-->
<template>
  <div class="svgIcon">
    <svg :class="svgClass" aria-hidden="true" v-on="$listeners">
      <use :xlink:href="iconName" />
    </svg>
  </div>
</template>
<script>
export default {
  name: 'SvgIcon',
  components: {},
  props: {
    name: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  computed: {
    iconName() {
      return `#icon-${this.name}`
    },
    svgClass() {
      if (this.className) {
        return 'scoped-svg-icon-' + this.className
      } else {
        return 'scoped-svg-icon'
      }
    }
  },
  created() {},
  mounted() {},
  methods: {}
}
</script>
<style lang="less" scoped>
.scoped-svg-icon {
  width: 1.8em;
  height: 1.8em;
  vertical-align: middle;
  fill: currentColor;
  overflow: hidden;
}
</style>
