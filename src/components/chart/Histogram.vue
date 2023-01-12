<!--
 * @Descripttion: 柱状图
 * @version:
 * @Author: kdsec
 * @Date: 2021-08-16 09:59:24
 * @LastEditors: kdsec
 * @LastEditTime: 2021-09-06 13:49:45
-->
<template>
  <div class="Histogram">
    <div class="echarts">
      <div :id="id" :style="{width: '100%', height: height + 'px'}"></div>
    </div>
  </div>
</template>
<script>
import resize from '@/utils/resize'

export default {
  name: 'Histogram',
  components: {},
  mixins: [resize],
  props: {
    id: {
      type: String,
      required: true
    },
    xData: {
      type: Array,
      default: () => []
    },
    yData: {
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
  mounted() {
    // this.drawBar()
  },
  methods: {
    drawBar() {
      this.$nextTick(() => {
        if (this.chart !== null) {
          this.chart.dispose()
        }
        this.chart = require('echarts').init(document.getElementById(this.id))
        this.chart.setOption({
          color: '#1890ff',
          tooltip: {},
          xAxis: {
            data: this.xData,
            axisLabel: {
              interval: 0,
              rotate: 10
            }
          },
          yAxis: {
            axisLabel: {
              margin: 2,
              formatter: function(value) {
                if (value >= 10000 && value < 10000000) {
                  value = value / 10000 + '万'
                } else if (value >= 10000000) {
                  value = value / 10000000 + '千万'
                }
                return value
              }
            }
          },
          series: [{
            type: 'bar',
            data: this.yData,
            label: {
              show: true, // 开启显示
              position: 'top', // 在上方显示
              color: '#323233',
              fontSize: 12
            }
          }],
          grid: {
            left: '10%',
            bottom: '20%'
          }
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>
</style>
