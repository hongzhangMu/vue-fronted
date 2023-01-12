<!--
 * @Descripttion: table
 * @version:
 * @Author: kdsec
 * @Date: 2021-09-01 16:48:28
 * @LastEditors: kdsec
 * @LastEditTime: 2021-09-02 10:07:43
-->
<template>
  <div class="table">
    <a-table
      :loading="loading"
      :row-key="rowKey"
      :pagination="false"
      :columns="columns"
      :scroll="isScroll ? { y: 400 } : {}"
      :data-source="tableList"
    >
      <span slot="rank" slot-scope="record">
        <a-badge status="success" :text="record" />
      </span>
      <div slot="expandedRowRender" slot-scope="record" style="margin: 0">
        {{ record }}
      </div>
    </a-table>
  </div>
</template>
<script>
export default {
  name: 'Table',
  components: {},
  props: {
    tableList: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    },
    columns: {
      type: Array,
      default: () => []
    },
    rowKey: {
      type: [String, Number],
      default: 0
    },
    isScroll: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {}
}
</script>
<style lang="less" scoped>
.table {
  &::v-deep .ant-table-body{
    .beauty-scroll() !important;
  }
}

</style>
