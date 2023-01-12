<!--
 * @Descripttion:各风险分析维度案件统计
 * @version:
 * @Author: kdsec
 * @Date: 2021-09-03 10:34:37
 * @LastEditors: kdsec
 * @LastEditTime: 2021-09-03 16:51:37
-->
<template>
  <div class="CaseStatistics">
    <Card title="各风险分析维度案件统计">
      <Histogram v-if="xData.length > 0" :id="`myHistogram${id}`" :ref="`myHistogram${id}`" :x-data="xData" :y-data="yData" />
      <a-empty v-else />
    </Card>
  </div>
</template>
<script>
import Card from '@/components/card'
import Histogram from '@/components/chart/Histogram'
import taskApi from '@/api/task'

export default {
  name: 'CaseStatistics',
  components: {
    Card,
    Histogram
  },
  props: {
    dataSource: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      id: 36,
      xData: [],
      yData: []
    }
  },
  watch: {
    dataSource(newdataSource) {
      this.dataSource = newdataSource
      this.getDataSource()
    }
  },
  created() {},
  mounted() {},
  methods: {
    formatDataSource(data_source) {
      var temp = data_source
      this.dataSource.forEach(element => {
        if (element.name === data_source) {
          temp =  element.title
        }
      })
      return temp
    },
    getDataSource() {
      taskApi.stat_config(this.id).then(res => {
        if (res.data.code === 200) {
          this.xData = []
          this.yData = []
          res.data.data.forEach(item => {
            this.xData.push(this.formatDataSource(item.data_source))
            this.yData.push(item.count)
            setTimeout(() => {
              this.$refs[`myHistogram${this.id}`].drawBar()
            }, 0)
          })
        } else {
          this.$message.error('获取数据源总量失败！')
        }
      }).catch(() => {
        this.$message.error('获取数据源总量失败！')
      })
    }
  }
}
</script>
<style lang="less" scoped>
.ant-empty {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: @card_body_height - @padding;
}
</style>
