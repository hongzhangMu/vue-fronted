<template>
  <div class="dashboard">
    <div id="container" style="height:230px,width: 230px"></div>
  </div>
</template>
<script>
import dataJSON from './relatedInfo.json'
import Highcharts from 'highcharts/highstock'
import HighchartsMore from 'highcharts/highcharts-more'
import HighchartsDrilldown from 'highcharts/modules/drilldown'
import Highcharts3D from 'highcharts/highcharts-3d'
HighchartsMore(Highcharts)
HighchartsDrilldown(Highcharts)
Highcharts3D(Highcharts)
export default {
  name: 'Dashboard',
  components: {

  },
  props: {

  },
  data() {
    return {

    }
  },
  created() {

  },
  mounted() {
    const data = []
    dataJSON.articles.forEach((e, i) => {
      data.push(
        {
          name: e?.content_json?.title || `标题${i + 1}`,
          value: Math.floor(Math.random() * 1000),
          sliceName: e?.content_json?.title.length > 5 ? (e?.content_json?.title.slice(0, 5) + '...') : e?.content_json?.title || `标题${i + 1}`
        }
      )
    })

    Highcharts.chart('container', {
      chart: {
        type: 'packedbubble',
        height: '230px',
        minWidth: '400px'
      },
      title: {
        text: ''
      },
      tooltip: {
        useHTML: true,
        headerFormat: '',
        pointFormat: '<b>{point.name}:</b> {point.value}'
      },
      legend: {
        enabled: false
      },
      credits: {
        enabled: false// 不显示LOGO
      },
      plotOptions: {
        packedbubble: {
          minSize: '30%',
          maxSize: '120%',
          zMin: 0,
          zMax: 1000,
          layoutAlgorithm: {
            splitSeries: false,
            gravitationalConstant: 0.02,
            bubblePadding: 15
          },
          dataLabels: {
            enabled: true,
            allowOverlap: true, // 设置允许重叠
            format: '{point.sliceName}: {point.value}',
            // formatter: function() {
            //   return ("<span class='chart-label'>" + this.name + this.y + this.z  + '</span>')
            // },
            filter: {
              property: 'y',
              operator: '>',
              value: 0 // > 0 显示label
            },
            style: {
              color: 'black',
              textOutline: 'none',
              fontWeight: 'normal'
            },
            animation: {
              duration: 0
            }
          }
        }
      },
      series: [{
        name: '',
        data: data
      }]
    })
  },
  methods: {

  }
}
</script>
<style lang="less" scoped>
#container {
	// min-width: 320px;
	// max-width: 320px;
	// margin: 0 auto;
}
</style>
