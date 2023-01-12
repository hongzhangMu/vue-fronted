<!--
 * @Descripttion:聚类foamtree
 * @version:
 * @Author: kdsec
 * @Date: 2021-09-09 17:33:50
 * @LastEditors: kdsec
 * @LastEditTime: 2022-06-10 15:31:49
-->
<template>
  <div class="foamtree">
    <!-- <a-row>
      <div v-show="showContent">
        <div class="content" :style="{width: `${width}`}">
          <span>{{ contentdata }}</span>
        </div>
      </div>
    </a-row> -->
    <a-spin :spinning="foamTreeLoading">
      <a-dropdown ref="dropDown" :trigger="['contextmenu']" :visible="showTooltip">
        <div @mouseenter="enter" @mouseleave="leave">
          <div :id="id" :style="{width: `${width}`,height: `${height}`}"></div>
        </div>
        <a-menu slot="overlay">
          <a-menu-item v-for="(item,i) in contextMenu" :key="i" @click="handleMethod(item)">
            {{ item.name }}
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </a-spin>
  </div>
</template>
<script>
import { FoamTree } from '@carrotsearch/foamtree'
import _ from 'lodash'
export default {
  name: 'Foamtree',
  components: {
  },
  props: {
    id: {
      type: String,
      required: true
    },
    height: {
      type: String,
      default: `${460 - 24 - 1}px`
    },
    width: {
      type: String,
      default: '100%'
    },
    isCheckedFirst: {
      type: Boolean,
      default: true
    },
    contextMenu: {
      type: Array,
      default: () => {
        return [
          {
            name: '添加',
            method: 'addLabel'
          }, {
            name: '修改',
            method: 'updateLabel'
          }, {
            name: '删除',
            method: 'deleteLabel'
          }
        ]
      }
    }
  },
  data() {
    return {
      // foamtree
      foamtree: null,
      checkTheme: {},
      rightCheckTheme: {},
      foamTreeLoading: true,
      // 是否展示工具列表
      showTooltip: false,
      // 是否为添加标签操作
      addLabelFlag: false,
      showContent: false, // 是否展示内容
      contentdata: null, // 展示的content
      groupLabel: 'label' // 鼠标移入的组
    }
  },
  created() {

  },
  activated() {
    window.addEventListener('resize', this.resizeFoamtree, false)
  },
  deactivated() {
    window.removeEventListener('resize', this.resizeFoamtree, false)
  },
  mounted() {
    window.addEventListener('resize', this.resizeFoamtree, false)
  },
  methods: {
    resizeFoamtree() {
      (_.debounce(() => {
        this.foamtree ? this.foamtree?.resize : () => {}
      }, 300))()
    },
    drawFoamTree(groups = [], addCluster = false) {
      console.log('groups: ', groups)
      const customTheme = [
        {
          type: -1,
          color: '#f3f3f3',
          label: '+添加一级话题',
          weight: 1
        },
        {
          type: -2,
          color: '#ddd',
          label: '未知话题',
          weight: 1
        }
      ]
      if (addCluster) groups = groups.concat(customTheme)
      var _this = this
      if (this.foamtree) {
        this.foamtree.dispose()
      }
      var clickcase
      this.$nextTick(() => {
        this.foamtree = new FoamTree({
          layout: 'relaxed',
          id: this.id,
          dataObject: {
            groups: groups
          },
          groupColorDecorator: function(opts, params, vars) {
            if (params.group.color) {
              vars.groupColor = params.group.color
            }
          },
          relaxationInitializer: 'ordered',
          relaxationVisible: true,          // 显示松弛
          relaxationMaxDuration: 8000,      // 使松弛持续更长时间
          relaxationQualityThreshold: 0.1,
          fadeDuration: 2000,               // 使用简单的淡入
          rolloutDuration: 0,
          pullbackDuration: 0,
          wireframeLabelDrawing: 'always',  // 显示标签动画
          // onGroupHover: function(info) {
          //   if (info.group !== null && info.group.label && info.group.type !== -1 && info.group.type !== -2 &&  _this.showTooltip === false) {
          //     _this.showContent = true
          //     _this.handleGroupMouseMove(info)
          //   } else {
          //     _this.showContent = false
          //   }
          // },
          onGroupDoubleClick: function() {
            clearTimeout(clickcase)
          },
          onGroupClick: function(info) {
            _this.showContent = false
            const keyCode = window.event.button
            window.event.preventDefault()
            if (info.group === null) {
              return
            }
            // 右击
            if (keyCode === 2) {
              _this.rightCheckTheme = info.group

              if (info.group.label[0] === _this.checkTheme.label[0]) {
                _this.showTooltip = true
                // setTimeout(function() {
                //   _this.showTooltip = false
                // }, 3000)
              }
            } else {
              _this.checkTheme = info.group

              // 左击
              _this.showTooltip = false
              if (info.group.type === -1) {
                // 点击添加一级话题
                _this.addLabel()
              } else if (info.group.type === -2) {
                // 点击未知话题
                _this.$emit('handleClickUnknownTheme', info)
              } else {
                // 延时，双击事件触发时单击事件不触发
                clickcase = setTimeout(function() {
                  // 此处为单击事件要执行的代码
                  _this.handelClickFoamTree(info)
                }, 500)
              }
            }
          }
        })
        if (this.isCheckedFirst && groups.length > 0) {
          let index = 0
          if (JSON.stringify(this.checkTheme) !== '{}') {
            index = groups.findIndex(e => e.id === this.checkTheme.id) === -1
              ? 0
              : groups.findIndex(e => e.id === this.checkTheme.id)
          }
          const info = { group: groups[index] }
          console.log('index: ', index)
          this.checkTheme = info.group
          this.foamtree.select(this.foamtree.get('dataObject').groups[index])
          this.handelClickFoamTree(info)
          this.$emit('update:isCheckedFirst', false)
        } else if (this.isCheckedFirst && groups.length === 0) {
          // 联动 目标/话题loading 置为false
          this.$emit('handelClickFoamTree')
        }
        this.foamTreeLoading = false
      })
    },
    updateFoamTree(groups) {
      this.foamTreeLoading = true
      this.foamtree.set({
        dataObject: {
          groups: groups
        }
      })
      let index = 0
      if (JSON.stringify(this.checkTheme) !== '{}' && groups.length > 0) {
        index = groups.findIndex(e => e.id === this.checkTheme.id) === -1
          ? 0
          : groups.findIndex(e => e.id === this.checkTheme.id)
        this.checkTheme = groups[index]
        this.foamtree.select(this.foamtree.get('dataObject').groups[index])
      }
      this.foamTreeLoading = false
    },
    handelClickFoamTree(info) {
      // if (this.foamtree.get('selection').groups.length === 0) this.foamtree.select(info.group)
      if (info.ctrlKey) return
      this.foamtree.select(info.group)
      this.$emit('handelClickFoamTree', info)
    },
    handleMethod(item) {
      console.log('item: ', item)
      this.showContent = false
      this.showTooltip = false
      this.contentdata = null
      if (this.foamtree.get('selection').groups.map(e => e.label).includes(this.rightCheckTheme.label)) {
        this.$emit(item.method, this.foamtree.get('selection').groups)
      } else {
        this.$emit(item.method, [this.checkTheme])
      }
    },
    // 鼠标移入，显示label
    handleGroupMouseMove(info) {
      if (this.showContent) {
        this.groupLabel = info.group.label + info.group.index + info.group.type
        this.contentdata = info.group.label
      }
    },
    // 在聚类组件内鼠标滚动，组织浏览器默认上下滚动事件
    scrollFunction(e) {
      e = e || window.event
      e.preventDefault && e.preventDefault() // 禁止浏览器默认事件
    },
    enter() {
      if (document.addEventListener) { // firefox
        document.addEventListener('DOMMouseScroll', this.scrollFunction, false)
      }
      // 滚动滑轮触发scrollFunction方法  //ie 谷歌
      window.addEventListener('mousewheel', this.scrollFunction, {
        passive: false
      })
    },
    leave() {
      if (document.removeEventListener) {
        document.removeEventListener('DOMMouseScroll', this.scrollFunction)
      }
      window.removeEventListener('mousewheel', this.scrollFunction)
    }
  }
}
</script>
<style lang="less" scoped>
.content {
  position: absolute;
  z-index: 9;
  // width: 100%;
  min-height: 70px;
  background-color: rgba(0,0,0,.35);
  color: #fff;
  padding: 10px;
  max-height: 150px;
  overflow: hidden;
  overflow-y: scroll;
  &::-webkit-scrollbar {display:none}
}
</style>
