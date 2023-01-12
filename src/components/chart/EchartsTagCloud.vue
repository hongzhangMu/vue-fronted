<!--
 * @Descripttion: 词云
 * @version:
 * @Author: kdsec
 * @Date: 2021-04-06 10:10:09
 * @LastEditors: kdsec
 * @LastEditTime: 2021-09-09 17:26:45
-->
<template>
  <div>
    <div :id="id" :style="{width: '100%', height: height+'px'}"></div>
  </div>
</template>

<script>
import 'echarts-wordcloud/dist/echarts-wordcloud'
import 'echarts-wordcloud/dist/echarts-wordcloud.min'
import resize from '@/utils/resize'

export default {
  name: 'TagCloud',
  mixins: [resize],
  props: {
    tagList: {
      type: Array,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    height: {
      type: Number,
      default: 460 - 85 - 1
    },
    backgroundColor: {
      type: String,
      default: '#101129'
    }
  },
  data() {
    return {
      chart: null,
      info: null,
      contentdata: {},
      showContent: false
    }
  },
  watch: {
    tagList: function(val) {
      if (val.length > 0) {
        this.initChart()
      }
    }
  },
  mounted() {
    if (this.tagList.length > 0) {
      this.initChart()
    }
  },
  methods: {
    initChart() {
      if (this.chart !== null) {
        this.chart.dispose()
      }
      this.chart = require('echarts').init(document.getElementById(this.id))
      const option = {
        backgroundColor: this.backgroundColor,
        series: [
          {
            type: 'wordCloud',
            // 用来调整词之间的距离
            gridSize: 10,
            // 用来调整字的大小范围
            sizeRange: [14, 60],
            rotationRange: [0, 0],
            // 随机生成字体颜色
            textStyle: {
              color() {
                return (
                  `rgb(${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)})`
                )
              }
            },
            // 位置相关设置
            left: 'center',
            top: 'center',
            right: null,
            bottom: null,
            width: '100%',
            height: '100%',
            // 数据
            data: this.tagList
          }
        ]
      }
      this.chart.setOption(option)
      // this.chart.on("mouseover", (info) => {
      //   this.wordcloudhover(info);
      // });
      // this.chart.on("mousemove", (event) => {
      //   this.showContent = false;
      // });
    },
    wordcloudhover(info) {
      this.showContent = true
      this.info = info
      this.contentdata = {
        name: info.name,
        value: info.value
      }
      this.$nextTick(() => {
        document.getElementById('showContent').style.marginLeft =
          info.event.offsetX + 'px' || info.event.event.clientX + 'px'
        document.getElementById('showContent').style.marginTop =
          info.event.offsetY + 'px' || info.event.event.clientY + 'px'
        console.log('info.event.offsetY: ', info.event.offsetY)
      })
    }
  }
}
</script>
<style lang="less" scoped>
#showContent {
  position: absolute;
  z-index: 9999;
  width: 200px;
  height: 70px;
  line-height: 30px;
  text-align: center;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);
  color: #000;
  border-radius: 3px;
}
li {
  text-align: left;
}
</style>
