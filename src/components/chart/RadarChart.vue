<!--
 * @Descripttion: 雷达图
 * @version:
 * @Author: kdsec
 * @Date: 2021-08-16 10:57:11
 * @LastEditors: kdsec
 * @LastEditTime: 2021-09-10 08:40:00
-->
<template>
  <div class="RadarChart">
    <div :id="id" :style="{width: '100%', height: height + 'px'}"></div>
  </div>
</template>
<script>
import resize from '@/utils/resize'

export default {
  name: 'RadarChart',
  components: {},
  mixins: [resize],
  props: {
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      default: ''
    },
    indicator: {
      type: Array,
      default: () => []
    },
    value: {
      type: Array,
      default: () => []
    },
    height: {
      type: Number,
      default: 460 - 24 - 1
    }
  },
  data() {
    return {
      chart: null
    }
  },
  created() {},
  mounted() {},
  methods: {
    drawRadarChart() {
      this.$nextTick(() => {
        if (this.chart !== null) {
          this.chart.dispose()
        }
        this.chart = require('echarts').init(document.getElementById(this.id))
        this.chart.setOption({
          // backgroundColor: '#344b58',
          tooltip: {
            trigger: 'axis'
          },
          radar: [
            {
              indicator: this.indicator,
              center: ['50%', '50%'],
              radius: 96,
              axisName: {
                show: true, // 是否显示工艺等文字
                formatter: null, // 工艺等文字的显示形式
                color: '#000', // 工艺等文字颜色
                fontSize: 14
              }
            }
          ],
          series: [
            {
              type: 'radar',
              itemStyle: {
                color: '#87ee55'
              },
              tooltip: {
                trigger: 'item'
              },
              areaStyle: {
                color: '#87ee55'
              },
              data: [
                {
                  value: this.value,
                  name: this.name
                }
              ]
            }
          ]
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>

</style>
