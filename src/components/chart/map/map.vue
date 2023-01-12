<!--
 * @Descripttion: 地图
 * @version:
 * @Author: kdsec
 * @Date: 2021-09-01 10:16:17
 * @LastEditors: kdsec
 * @LastEditTime: 2021-09-03 17:32:36
-->
<template>
  <div class="map">
    <div class="echarts">
      <div id="map" style="width:100%;height: 436px"></div>
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
  name: 'Map',
  components: {},
  mixins: [resize],
  props: {},
  data() {
    return {
      chart: null,
      mapType: 'china' // world 为世界地图
    }
  },
  created() {},
  mounted() {
    // this.drawBar()
    this.drawEmpty()
  },
  methods: {
    /* 绘制空地图 */
    drawEmpty() {
      echarts.registerMap(this.mapType, this.mapType === 'china' ? ChinaGeo : WorldGeo)
      this.$nextTick(() => {
        if (this.chart !== null) {
          this.chart.dispose()
        }
        this.chart = echarts.init(document.getElementById('map'))
        // 地图上的点
        var chinaGeoCoordMap = {
          '北京市': [116.4551, 40.2539],
          '河北': [114.4995, 38.1006],
          '天津': [117.4219, 39.4189],
          '山西': [112.3352, 37.9413],
          '陕西': [109.1162, 34.2004],
          '甘肃': [103.5901, 36.3043],
          '宁夏': [106.3586, 38.1775],
          '青海': [101.4038, 36.8207]
        }
        // 非攻击点
        var chinaDatas = [
          [{
            name: '河北',
            value: 10
          }],	[{
            name: '天津',
            value: 8
          }],	[{
            name: '山西',
            value: 10
          }],	[{
            name: '陕西',
            value: 1
          }],	[{
            name: '甘肃',
            value: 2
          }],	[{
            name: '宁夏',
            value: 5
          }],	[{
            name: '青海',
            value: 9
          }]
        ]

        var convertData = function(data) {
          var res = []
          for (var i = 0; i < data.length; i++) {
            var dataItem = data[i]
            // 箭头指向
            // var fromCoord = chinaGeoCoordMap[dataItem[0].name]
            // var toCoord = [116.4551, 40.2539]
            var toCoord = chinaGeoCoordMap[dataItem[0].name]
            var fromCoord = [116.4551, 40.2539]
            if (fromCoord && toCoord) {
              res.push([{
                // name: dataItem[0].name,
                coord: fromCoord,
                value: dataItem[0].value
              }, {
                coord: toCoord
              }])
            }
          }
          return res
        }
        var series = [];
        [['北京市', chinaDatas]].forEach((item, i) => {
          // item  数组：['北京市', chinaDatas]
          series.push({
            type: 'lines',
            zlevel: 2,
            // 箭头
            effect: {
              show: true,
              period: 4, // 箭头指向速度，值越小速度越快
              trailLength: 0.02, // 特效尾迹长度[0,1]值越大，尾迹越长重
              symbol: 'arrow', // 箭头图标
              symbolSize: 5 // 图标大小
            },
            // 流向指向线条
            lineStyle: {
              normal: {
                width: 1, // 尾迹线条宽度
                opacity: 1, // 尾迹线条透明度
                curveness: 0.3 // 尾迹线条曲直度
              }
            },
            // item[1] 除被攻击点 chinaDatas
            data: convertData(item[1])
          }, {
            type: 'effectScatter',
            coordinateSystem: 'geo',
            zlevel: 1,
            rippleEffect: { // 涟漪特效
              period: 4, // 动画时间，值越小速度越快
              brushType: 'stroke', // 波纹绘制方式 stroke, fill
              scale: 3 // 波纹圆环最大限制，值越大波纹越大
            },
            label: {
              normal: {
                show: true,
                position: 'right', // 显示位置
                offset: [5, 0], // 偏移设置
                formatter: function(params) { // 圆环显示文字
                  return params.data.name
                },
                fontSize: 13
              },
              emphasis: {
                show: true
              }
            },
            symbol: 'circle',
            // val为data数据 [103.5901, 36.3043, 2]
            symbolSize: function(val) {
              return val[2] // 圆环大小
            },
            itemStyle: {
              show: false,
              color: '#f00'
            },
            data: item[1].map(function(dataItem) {
              return {
                name: dataItem[0].name,
                value: chinaGeoCoordMap[dataItem[0].name].concat([dataItem[0].value]) // [103.5901, 36.3043, 2]
              }
            })
          },
          // 被攻击点
          {
            type: 'scatter',
            coordinateSystem: 'geo',
            zlevel: 2,
            rippleEffect: {
              period: 4,
              brushType: 'stroke',
              scale: 4
            },
            label: {
              show: true,
              position: 'right',
              // offset:[5, 0],
              color: '#0f0',
              formatter: '{b}',
              // color: '#0f0',
              emphasis: {
                show: true,
                color: '#f60'
              }
            },
            symbol: 'pin',
            // 图标大小
            symbolSize: 30,
            data: [{
              name: item[0],
              value: chinaGeoCoordMap[item[0]].concat([10])
            }]
          }
          )
        })
        this.chart.setOption({
          tooltip: {
            trigger: 'item',
            backgroundColor: 'rgba(166, 200, 76, 0.82)',
            borderColor: '#FFFFCC',
            showDelay: 0,
            hideDelay: 0,
            enterable: true,
            transitionDuration: 0,
            extraCssText: 'z-index:100',
            formatter: function(params, ticket, callback) {
              // 鼠标移到线上
              if (params.seriesType === 'lines') return null
              // 根据业务自己拓展要显示的内容
              var res = ''
              var name = params.name
              var value = params.name === '北京市' ? params.value[params.seriesIndex] : params.value[params.seriesIndex + 1]
              res = "<span style='color:#fff;'>" + name + '</span><br/>数据：' + value
              return res
            }
          },
          backgroundColor: '#013954',
          visualMap: { // 图例值控制
            min: 0,
            max: 10,
            calculable: true,
            show: true,
            color: ['#f44336', '#fc9700', '#ffde00', '#ffde00', '#00eaff'],
            textStyle: {
              color: '#fff'
            }
          },
          geo: {
            map: 'china',
            zoom: 1.2,
            label: {
              emphasis: {
                show: false
              }
            },
            roam: true, // 是否允许缩放
            itemStyle: {
              color: 'rgba(51, 69, 89, .5)', // 地图背景色
              borderColor: '#516a89', // 省市边界线00fcff 516a89
              borderWidth: 1,
              emphasis: {
                color: 'rgba(37, 43, 61, .5)' // 悬浮背景
              }
            }
          },
          series: series
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>

</style>
