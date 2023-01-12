<!--
 * @Descripttion: 饼图
 * @version:
 * @Author: kdsec
 * @Date: 2021-08-18 09:06:42
 * @LastEditors: kdsec
 * @LastEditTime: 2021-09-10 15:57:08
-->
<template>
  <div class="pie">
    <div :id="id" :style="{width: '100%', height: height + 'px'}"></div>
  </div>
</template>
<script>
import resize from '@/utils/resize'

export default {
  name: 'Pie',
  components: {},
  mixins: [resize],
  props: {
    id: {
      type: String,
      required: true
    },
    height: {
      type: Number,
      default: 300
    },
    name: {
      type: String,
      default: ''
    },
    value: {
      type: Array,
      default: () => []
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
    initPie() {
      this.$nextTick(() => {
        if (this.chart !== null) {
          this.chart.dispose()
        }
        this.chart = require('echarts').init(document.getElementById(this.id))
        this.chart.setOption({
          title: {
            text: this.name,
            left: 'center'
          },
          // tooltip: {
          //   trigger: 'item'
          // },
          // legend: {
          //   top: '10%',
          //   left: 'center'
          // },
          series: [
            {
              name: this.name,
              type: 'pie',
              radius: ['55%', '70%'],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 5,
                borderColor: '#fff',
                borderWidth: 2
                // color() {
                //   return (
                //     `rgb(${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)})`
                //   )
                // }
              },
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '20',
                  fontWeight: 'bold',
                  // formatter: '{b} \n {d}%'
                  formatter: '{name|{b}}' + '\n\r' + '{count|{d}%}',
                  rich: {
                    name: {
                      fontSize: 35,
                      fontFamily: '微软雅黑',
                      color: '#454c5c'
                    },
                    count: {
                      fontFamily: '微软雅黑',
                      fontSize: 16,
                      color: '#6c7a89',
                      lineHeight: 30
                    }
                  }
                }
              },
              labelLine: {
                show: false
              },
              data: this.value
            }
          ]
        })
        this.chart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: 0
        })
        let seriesIndex
        let dataIndex
        this.chart.on('mouseover', (e) => {
          seriesIndex = e.seriesIndex === 0 ? undefined : e.seriesIndex
          dataIndex = e.dataIndex ? undefined : e.dataIndex
          // 取消默认高亮
          this.chart.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: 0
          })
          // 鼠标悬停位置高亮
          this.chart.dispatchAction({
            type: 'highlight',
            seriesIndex: e.seriesIndex,
            dataIndex: e.dataIndex
          })
        })
        // 鼠标移出后默认高亮
        this.chart.on('mouseout', (e) => {
          this.chart.dispatchAction({
            type: 'downplay',
            seriesIndex: seriesIndex,
            dataIndex: dataIndex
          })
          this.chart.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: 0
          })
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>
</style>
