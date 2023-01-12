<!--
 * @Descripttion: list
 * @version:
 * @Author: kdsec
 * @Date: 2021-09-01 16:48:50
 * @LastEditors: kdsec
 * @LastEditTime: 2021-09-10 10:31:29
-->
<template>
  <div class="list">
    <a-list
      ref="alistData"
      class="alist"
      size="large"
      :row-key="rowKey"
      :loading="loading"
      item-layout="vertical"
      :data-source="listData"
    >
      <!-- <div slot="footer"><b>ant design vue</b> footer part</div> -->
      <a-list-item slot="renderItem" key="item.id" slot-scope="item">
        <!-- 列表item底部操作按钮组 -->
        <template slot="actions">
          <div style="margin-top:5px;text-align:left">
            <span v-for="aa in item.tag" :key="aa" style="font-size:12px;margin-right:3px">
              <a-icon type="tags" />
              {{ aa }}
            </span>
            <font v-for="bb in item.filters" :key="bb" style="font-size:12px" color="green">
              <a-icon type="tags" />
              {{ bb }}
            </font>
            <div>
              <template v-for="(tag, index) in item.custom_tags">
                <a-tooltip v-if="tag.length > 20" :key="tag" :title="tag">
                  <a-tag :key="tag" :closable="index !== 0" @close="handleCloseTag(item,tag)">
                    {{ `${tag.slice(0, 20)}...` }}
                  </a-tag>
                </a-tooltip>
                <a-tag v-else :key="tag" :closable="index !== 0" @close="handleCloseTag(item,tag)">
                  {{ tag }}
                </a-tag>
              </template>
              <a-input
                v-if="item.inputVisible"
                :id="item.id"
                :ref="item.id"
                v-model="inputValue"
                type="text"
                size="small"
                :style="{ width: '78px' }"
                @change="handleInputChange"
                @blur="handleInputConfirm(item)"
              />
              <a-tag v-else style="background: #fff; borderStyle: dashed;" @click="showInput(item)">
                <a-icon type="plus" /> New Tag
              </a-tag>
            </div>
            <div>
              <a-checkable-tag :checked="item.status==1" @change="handleAttention(item)">
                <a-icon type="meh" />关注
              </a-checkable-tag>
              <a-checkable-tag :checked="item.status==2" @change="handleUp(item)">
                <a-icon type="frown" />上报
              </a-checkable-tag>
              <a-checkable-tag :checked="item.status==3" @change="analysis(item)">
                <a-icon type="experiment" />分析
              </a-checkable-tag>
              <a-checkable-tag @change="handleSearch(item)">
                <a-icon type="search" />搜索
              </a-checkable-tag>
              <a-checkable-tag @change="detailClick(item)">
                <a-icon type="unordered-list" />详情
              </a-checkable-tag>
              <a-checkable-tag>
                <a-icon type="unordered-list" />
                <a-popconfirm title="确认不再关注?" @confirm="rejectAttention(item)">
                  不再关注
                </a-popconfirm>
              </a-checkable-tag>
            </div>
          </div>

        </template>
        <!-- 描述 + 标题 + 头像 -->
        <a-list-item-meta>
          <template slot="title" :href="item.href">
            <a-tag v-if="item.website_name" color="cyan">
              {{ item.website_name }}
            </a-tag>
            <a
              :id="'listTitle' + item.id"
              :href="item.url"
              target="_blank"
              style="font-size:16px;font-weight:bold"
              v-html="(item.title === null ? '': item.title+' ')"
            />
            <a-tag v-if="item.create_time != null && item.create_time != undefined" color="cyan">
              {{ item.create_time }}
            </a-tag>
            <div v-if="(item.attachment_name && item.attachment_name.length > 0)">
              <a-button icon="eye" type="primary" size="small" style="float:right;" @click="previewAndDownload(item)">
                预览
              </a-button>
            </div>
          </template>
        </a-list-item-meta>
        <!-- 正文 -->
        <a-popover :mouse-enter-delay="1">
          <template slot="content">
            <div style="width: 80vw;height: 60vh;">
              <div style="text-align: center; width: 80vw;height: 60vh;transform: scale(1);transform-origin: 0 0;overflow:scroll">
                <h2>
                  <text-highlight :queries="[]" highlight-class="highlight" highlight-style="background:none;color:red">
                    {{ item.title }}
                  </text-highlight>
                </h2>
                <div style="text-align: left;white-space: pre-line;word-wrap: break-word;word-break: break-all;">
                  <text-highlight :queries="[]" highlight-class="highlight" highlight-style="background:none;color:red" style="text-align: left;white-space: pre-line;word-wrap: break-word;word-break: break-all;">
                    {{ item.content }}
                  </text-highlight>
                </div>
              </div>
            </div>
          </template>
          <div class="description">
            <a-row :gutter="10">
              <a-col :span="(item.attachment&&item.attachment[0]&& (/\.(png|jpg|gif|jpeg|webp)$/).test(item.attachment[0])) ? 4 : 0"><img v-if="item.attachment" width="100%" height="150px" :src="item.attachment[0]" alt=""></a-col>
              <a-col :span="(item.attachment&&item.attachment[0]&& (/\.(png|jpg|gif|jpeg|webp)$/).test(item.attachment[0])) ? 20 : 24">
                <text-highlight highlight-class="highlight" :queries="[]" highlight-style="background:none;color:red">
                  {{ (item.content.length >= 0 && 300 >= item.content.length) ? item.content : `${item.content.slice(0,300)}...` }}
                </text-highlight>
                <div v-if="item.remark">
                  备注: {{ item.remark }}
                </div>
              </a-col>
            </a-row>
          </div>
        </a-popover>
        <!-- <div v-if="datasource.name !== 'origin.mail'">
          <a>{{ item.data_source }}</a>
          <span v-if="item && item.url"> 发布在 </span>
          <a v-if="item && item.url && item.url.length>100" @click="gotoHref(item.url)">{{ item.url.slice(0,100) }}...</a>
          <a v-else @click="gotoHref(item.url)">{{ item.url }}</a>
        </div>
        <div v-else-if="item._source != undefined">
          from <a v-if="item._source.mail_from" style="word-break: break-all">{{ item._source.mail_from && item._source.mail_from.slice(0,100) }}{{ item._source.mail_from && item._source.mail_from.length>100?'...':'' }}</a>
          to <a v-if="item._source.mail_to" style="word-break: break-all">{{ (item._source.mail_to_open || false)?item._source.mail_to:item._source.mail_to.slice(0,100) }}</a>
          <a v-show="item._source.mail_to && item._source.mail_to.length>100" @click="flipMailTo(item._source)">{{ ((item._source.mail_to_open || false)?'收起':'展开') }}</a>
        </div> -->
      </a-list-item>
    </a-list>
    <a-pagination
      v-model="current"
      :total="total"
      change-current
      :page-size="pageSize"
      @change="changeCurrent"
    >
    </a-pagination>
  </div>
</template>
<script>
import TextHighlight from 'vue-text-highlight'
import searchApi from '@/api/search'
export default {
  name: 'List',
  components: {
    TextHighlight
  },
  props: {
    listData: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    },
    rowKey: {
      type: [String, Number],
      default: 0
    },
    total: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      // 分页
      current: 1,
      pageSize: 20,

      // 自定义标签
      inputValue: null
    }
  },
  created() {},
  mounted() {},
  methods: {
    // 换页
    changeCurrent(current, pageSize) {
      console.log('changeCurrent..current: ', current)
      this.current = current
      this.$emit('changePage', current)
    },
    // 操作
    handleAttention(item) {
      console.log('item: ', item)
      searchApi.clueFollow().then(res => {

      })
    },
    handleUp(item) {
      console.log('item: ', item)
      searchApi.followSubmit().then(res => {

      })
    },
    analysis(item) {
      console.log('item: ', item)
      searchApi.set_analysis_status_directly().then(res => {

      })
    },
    handleSearch(item) {
      console.log('item: ', item)
    },
    detailClick(item) {
      console.log('item: ', item)
    },
    rejectAttention(item) {
      console.log('item: ', item)
      searchApi.unfellow().then(res => {

      })
    },
    // 自定义标签
    handleCloseTag(item, removedTag) {
      const tags = item.custom_tags.filter(tag => tag !== removedTag)
      console.log('tags: ', tags)
      searchApi.add_custom_tags({ custom_tags: tags, id: item.id, data_source: item.data_source })
        .then(res => {
          if (res.data.code === 200) {
            item.custom_tags = tags
            item.inputVisible = false
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(() => {
          item.inputVisible = false
          this.inputValue = null
        })
    },
    showInput(item) {
      this.$set(item, 'inputVisible', true)
      this.$nextTick(() => {
        document.getElementById(item.id).focus()
        // this.$refs[item.id].focus();
      })
    },
    handleInputChange(e) {
      this.inputValue = e.target.value
    },
    handleInputConfirm(item) {
      console.log('item: ', item.id)
      const inputValue = this.inputValue
      if (inputValue === '')  return
      if (item.custom_tags === null) {
        item.custom_tags = []
      }
      let tags = item.custom_tags
      if (inputValue && tags.indexOf(inputValue) === -1) {
        tags = [...item.custom_tags, inputValue]
        searchApi.add_custom_tags({ custom_tags: tags, id: item.id, data_source: item.data_source })
          .then(res => {
            if (res.data.code === 200) {
              item.custom_tags = tags
              item.inputVisible = false
            } else {
              item.inputVisible = false
              this.$message.error(res.data.message)
            }
            this.inputValue = null
          }).catch(() => {
            item.inputVisible = false
            this.inputValue = null
          })
      } else {
        item.inputVisible = false
      }
    }
  }
}
</script>
<style lang="less" scoped>

</style>
