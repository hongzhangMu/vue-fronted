<!--
 * @Descripttion: 地图
 * @version:
 * @Author: kdsec
 * @Date: 2021-09-01 10:16:17
 * @LastEditors: kdsec
 * @LastEditTime: 2021-09-10 14:07:34
-->
<template>
  <div class="wordMap">
    <div class="echarts">
      <div id="wordMap" style="width:100%;height: 600px"></div>
    </div>
  </div>
</template>
<script>
import resize from '@/utils/resize'
const echarts = require('echarts/lib/echarts')
import ChinaGeo from './geoJSON_china.json'
import WorldGeo from './geoJSON_world.json'
import 'echarts/lib/component/geo'
import 'echarts/lib/chart/map'

export default {
  name: 'WordMap',
  components: {},
  mixins: [resize],
  props: {},
  data() {
    return {
      chart: null,
      mapType: 'world' // world 为世界地图
    }
  },
  created() {},
  mounted() {
    this.drawWordMap()
  },
  methods: {
    /* 绘制地图 */
    drawWordMap() {
      echarts.registerMap(this.mapType, this.mapType === 'china' ? ChinaGeo : WorldGeo)
      this.$nextTick(() => {
        if (this.chart !== null) {
          this.chart.dispose()
        }
        this.chart = echarts.init(document.getElementById('wordMap'))
        var data = [
          { name: '加拿大', value: 199 },
          { name: '利比亚', value: 42 },
          { name: '俄罗斯', value: 102 }
        ]

        var geoCoordMap = {
          '芬兰': [24.909912, 60.169095],
          '美国': [-100.696295, 33.679979],
          '日本': [139.710164, 35.706962],
          '韩国': [126.979208, 37.53875],
          '瑞士': [7.445147, 46.956241],
          '东南亚': [117.53244, 5.300343],
          '澳大利亚': [135.193845, -25.304039],
          '德国': [13.402393, 52.518569],
          '英国': [-0.126608, 51.208425],
          '加拿大': [-102.646409, 59.994255],
          '利比亚': [13.07, 32.49],
          '俄罗斯': [37.35, 55.45]
        }
        // var max = 480
        // var min = 9 // todo
        // var maxSize4Pin = 100
        // var minSize4Pin = 20

        var convertData = function(data) {
          var res = []
          for (var i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap[data[i].name]
            if (geoCoord) {
              res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
              })
            }
          }
          return res
        }

        this.chart.setOption({
          // 背景色
          // backgroundColor: 'rgb(18,40,109)',
          tooltip: {
            padding: 0,
            enterable: true,
            transitionDuration: 1,
            textStyle: {
              color: '#000',
              decoration: 'none'
            },
            backgroundColor: 'rgba(161, 214, 250, 0.5)',
            borderColor: 'rgba(88, 140, 205)',
            // position: function (point, params, dom, rect, size) {
            //   return [point[0], point[1]];
            // },
            formatter: function(params, ticket, callback) {
              // 根据业务自己拓展要显示的内容
              var res = ''
              var name = params.name
              var value = params.value[params.seriesIndex]
              res = '<span>' + name + '</span><br/>数据：' + value
              return res
            }
          },
          // 图例
          visualMap: {
            show: false,
            min: 0,
            max: 200,
            left: '10%',
            top: 'bottom',
            calculable: true,
            seriesIndex: [1],
            inRange: {
              color: ['#04387b', '#467bc0'] // 蓝绿
            }
          },
          geo: {
            show: true,
            map: this.mapType,
            // 是否允许缩放
            roam: true,
            itemStyle: {
              areaColor: '#e4ebf2' // #023677
              // borderColor: '#1180c7'
            },
            emphasis: {
              // 悬浮背景
              itemStyle: {
                color: 'rgba(161, 214, 250, 0.5)'
              }
            }
          },
          series: [
            {
              name: '散点',
              type: 'scatter',
              coordinateSystem: 'geo',
              data: convertData(data),
              // symbolSize: function(val) {
              //     return val[2] / 10;
              // },
              symbolSize: 10,
              label: {
                formatter: '{b}',
                position: 'right',
                show: false
              },
              emphasis: {
                label: {
                  show: true
                }
              },
              itemStyle: {
                color: '#fff'
              }
            },
            {
              // 标注点
              // name: 'Top 5',
              type: 'effectScatter',
              coordinateSystem: 'geo',
              data: convertData(data.sort(function(a, b) {
                return b.value - a.value
              }).slice(0, 10)),
              symbolSize: function(val) {
                return val[2] / 10
              },
              // symbolSize: 10,
              showEffectOn: 'render',
              rippleEffect: {
                brushType: 'stroke'
              },
              emphasis: {
                scale: true
              },
              label: {
                formatter: '{b}',
                position: 'left',
                show: false
              },
              itemStyle: {
                color: 'rgba(88, 140, 205)',
                shadowBlur: 1,
                shadowColor: 'rgba(88, 140, 205)'
              },
              zlevel: 1
            }]
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>

</style>
