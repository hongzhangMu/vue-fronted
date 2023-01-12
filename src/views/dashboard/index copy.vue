<!--
 * @Descripttion: 首页
 * @version:
 * @Author: kdsec
 * @Date: 2021-09-03 10:01:29
 * @LastEditors: kdsec
 * @LastEditTime: 2021-10-22 14:41:14
-->
<i18n>
{
  "en": {
    "hello": "hello worldddd!",
    "test": {
      "demo": "demoen"
    }
  },
  "zh": {
    "hello": "Hola",
    "test": {
      "demo": "demozh"
    }
  }
}
</i18n>
<template>
  <div class="dashboard">
    <!-- {{ $t('test.demo') }} -->
    <!-- 顶部统计数据展示 -->
    <div><Statistics :statistics-data="statisticsData" /></div>
    <br />
    <!-- 任务列表 -->
    <div><TaskList @getTaskList="getTaskList" /></div>
    <br />
    <!-- 各风险分析维度案件统计 && 热门词频 -->
    <div>
      <a-row :gutter="20">
        <a-col :span="12"><CaseStatistics :data-source="dataSource" /></a-col>
        <a-col :span="12"><HotWord :data-source="dataSource" /></a-col>
      </a-row>
    </div>
  </div>
</template>
<script>
import Statistics from './components/statistics'
import TaskList from '@/views/task'
import CaseStatistics from './components/caseStatistics'
import HotWord from './components/hotWord'
import mainApi from '@/api/main'
import searchApi from '@/api/search'
import { getList } from '@/api/table'

export default {
  name: 'Dashboard',
  components: {
    Statistics,
    TaskList,
    CaseStatistics,
    HotWord
  },
  props: {},
  data() {
    return {
      // 首页顶部统计信息
      statisticsData: {
        num_archived_cases: 0, // 案件总量
        num_info_clues: 0, // 线索总量
        num_search_records: 0, // 检索总量
        num_unarchived_cases: 0 // 事件总量
      },
      // 所有数据源
      dataSource: [],
      // 所有任务
      taskList: []
    }
  },
  created() {
    this.mainStatistics()
    this.getDataSource()
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        console.table(response.data.data.items)
        this.list = response.data.data.items
        console.log('this.list: ', this.list)
        this.list.forEach(element => {
          // console.table(element.obj1)
          // console.table(element.obj2)
          // console.table(element.arr2)
        })
        this.listLoading = false
      })
    },
    mainStatistics() {
      mainApi.statistics().then(res => {
        if (res.data.code === 200) {
          this.statisticsData = { ...res.data.statistics }
        } else {
          this.$message.error('数据统计信息获取失败')
        }
      })
    },
    // 获取数据源
    getDataSource() {
      searchApi.datasource_available_all().then(res => {
        if (res.data.code === 200) {
          this.dataSource = res.data.data.available_topics
        } else {
          this.$message.error(res.data.message)
        }
      })
    },
    getTaskList(value) {
      this.taskList = value.filter(item => {
        return item.flag === 1
      })
    }
  }
}
</script>
<style lang="less" scoped>

</style>
