<!--
 * @Descripttion: 首页顶部统计
 * @version:
 * @Author: kdsec
 * @Date: 2021-09-03 10:03:37
 * @LastEditors: kdsec
 * @LastEditTime: 2021-09-03 10:07:05
-->
<template>
  <div class="statistics">
    <a-row :gutter="20">
      <a-col :sm="24" :md="12" :xl="6">
        <div class="card-panel">
          <div class="search">
            <a-icon type="search" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              检索总量
            </div>
            <div class="total">
              <countTo :start-val="startVal" :end-val="statisticsData.num_search_records" :duration="1000"></countTo>
            </div>
          </div>
        </div>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6">
        <div class="card-panel">
          <div class="menu">
            <a-icon type="menu" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              线索总量
            </div>
            <div class="total">
              <countTo :start-val="startVal" :end-val="statisticsData.num_info_clues" :duration="1000"></countTo>
            </div>
          </div>
        </div>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6">
        <div class="card-panel">
          <div class="profile">
            <a-icon type="profile" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              事件总量
            </div>
            <div class="total">
              <countTo :start-val="startVal" :end-val="statisticsData.num_unarchived_cases" :duration="1000"></countTo>
            </div>
          </div>
        </div>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6">
        <div class="card-panel">
          <div class="container">
            <a-icon type="container" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              案件总量
            </div>
            <div class="total">
              <countTo :start-val="startVal" :end-val="statisticsData.num_archived_cases" :duration="1000"></countTo>
            </div>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import countTo from 'vue-count-to'

export default {
  name: 'Statistics',
  components: {
    countTo
  },
  props: {
    statisticsData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      startVal: 0
    }
  },
  created() {},
  mounted() {},
  methods: {}
}
</script>
<style lang="less" scoped>
.statistics {
  .card-panel {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 30px 0 20px;
    height: 180px;
    font-size: 30px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
    margin-bottom: 8px;
    border-radius: 4px;
    .search {
      font-size: 80px;
      color: #40c9c6;
    }
    .menu {
      font-size: 80px;
      color: #36a3f7;
    }
    .profile {
      font-size: 80px;
      color: #f4516c;
    }
    .container {
      font-size: 80px;
      color: #34bfa3
    }
    .card-panel-description {
      font-weight: bold;
      text-align: right;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }
      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
</style>
