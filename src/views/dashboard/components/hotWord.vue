<!--
 * @Descripttion: 热门词频
 * @version:
 * @Author: kdsec
 * @Date: 2021-09-03 10:34:58
 * @LastEditors: kdsec
 * @LastEditTime: 2021-09-03 16:54:14
-->
<template>
  <div class="hotWord">
    <Card title="热门词频">
      <a-tabs default-active-key="1">
        <a-tab-pane v-for="el in tabList" :key="el.data_source" class="datatab" :tab="el.data_source">
          <tag-cloud v-if="el.tagCloudData.length > 0" :id="el.data_source" style="text-align: center;" :tag-list="el.tagCloudData" />
          <a-empty v-else />
        </a-tab-pane>
      </a-tabs>
    </Card>
  </div>
</template>
<script>
import Card from '@/components/card'
import TagCloud  from '@/components/chart/EchartsTagCloud'
import taskApi from '@/api/task'

export default {
  name: 'HotWord',
  components: {
    Card,
    TagCloud
  },
  props: {
    dataSource: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      id: 38,
      // tab
      tabList: [
        {
          data_source: null,
          tagCloudData: []
        }
      ]
    }
  },
  watch: {
    dataSource(newdataSource) {
      this.dataSource = newdataSource
      this.getPopularWord()
    }
  },
  created() {},
  mounted() {
    this.getPopularWord()
  },
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
    getPopularWord() {
      taskApi.stat_config(this.id).then(res => {
        if (res.data.code === 200) {
          this.tabList = []
          res.data.data.forEach(item => {
            const tagCloudData = []
            item.words.forEach(element => {
              tagCloudData.push(
                {
                  'value': element.doc_count, 'name': element.key
                }
              )
            })
            this.tabList.push({ data_source: this.formatDataSource(item.data_source), tagCloudData: tagCloudData })
          })
        } else {
          this.$message.error('获取历史数据词云失败！')
        }
      }).catch(() => {
        this.$message.error('获取历史数据词云失败！')
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
