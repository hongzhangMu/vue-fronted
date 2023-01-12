<template>
  <div :key="refresh" :style="{height}">
    <div id="jsmind_container"></div>
    <div style="display:none">
      <input id="image-chooser" class="file" type="file" accept="image/*" />
    </div>
  </div>
</template>

<script>
import './jsmind.css'
import _jm from './jsmind.js'
import './jsmind.draggable.js'
import './jsmind.screenshot.js'
import './jsmind.menu.js'
import resize from './resize'
export default {
  name: 'JsMindTree',
  mixins: [resize],
  props: {
    values: {
      type: Object,
      required: true
    },
    options: {
      type: Object,
      default: () => {}
    },
    height: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      jm: {},
      refresh: 1,
      value: {},
      // 默认配置
      default_options: {
        container: 'jsmind_container',
        editable: true, // 是否启用编辑
        theme: 'primary', // 主题
        mode: 'full', // 显示模式
        support_html: true, // 是否支持节点里的HTML元素
        view: {
          engine: 'canvas', // 思维导图各节点之间线条的绘制引擎
          hmargin: 100, // 思维导图距容器外框的最小水平距离
          vmargin: 50, // 思维导图距容器外框的最小垂直距离
          line_width: 1, // 思维导图线条的粗细
          line_color: '#000' // 思维导图线条的颜色
        },
        layout: {
          hspace: 30, // 节点之间的水平间距
          vspace: 20, // 节点之间的垂直间距
          pspace: 13 // 节点与连接线之间的水平间距（用于容纳节点收缩/展开控制器）
        },
        default_event_handle: {
          enable_mousedown_handle: true,
          enable_click_handle: true,
          enable_dblclick_handle: false,
          enable_mousewheel_handle: true
        },
        menuOpts: {
          showMenu: true,
          injectionList: [
            { target: 'edit', text: '编辑节点',
              callback: function(node) {
                console.log('编辑节点', node)
              }
            },
            { target: 'addChild', text: '添加子节点',
              callback: function(node) {
                console.log('添加子节点', node)
              }
            },
            { target: 'addAnode', text: '添加一个节点',
              callback: (node) => {
                console.log(node)
              },
              defaultFn: (node) => {
                console.log(node)
              },
              fn: (nodeid, text) => {
                console.log('text: ', text)
                console.log('nodeid: ', nodeid)
                console.log('this: ', this)
                var selected_node = this.jm.get_selected_node()
                console.log('selected_node: ', selected_node)
                if (!!selected_node && !selected_node.isroot) {
                  var node = this.jm.add_node(selected_node, nodeid, text)

                  if (node) {
                    this.jm.select_node(nodeid)
                    this.jm.begin_edit(nodeid)
                  }
                  // node topic修改
                  // 自己的method
                }
              }
            },
            { target: 'addBrother', text: '添加兄弟节点',
              callback: function(node) {
                console.log('添加兄弟节点', node)
              }
            },
            { target: 'delete', text: '删除节点',
              callback: function(node, next) {
                console.log('删除节点', node)
              }
            },
            { target: 'screenshot', text: '下载导图',
              callback: function(node, next) {
                console.log(node)
              }
            },
            { target: 'showAll', text: '展开全部节点',
              callback: function(node, next) {
                console.log(node)
              }
            },
            { target: 'hideAll', text: '收起全部节点',
              callback: function(node, next) {
                console.log(node)
              }
            }
          ]
        },
        shortcut: {
          enable: true, // 是否启用快捷键
          handles: {
            SavePNG() {
              this.jm.screenshot.shootDownload()
            }
          }, // 命名的快捷键事件处理器
          mapping: {
          // 快捷键映射
            addchild: 45, // <Insert>
            addbrother: 13, // <Enter>
            editnode: 113, // <F2>
            delnode: 46, // <Delete>
            toggle: 32, // <Space>
            left: 37, // <Left>
            up: 38, // <Up>
            right: 39, // <Right>
            down: 40 // <Down>
            // SavePNG: jsMind.key.ctrl + 83
          }
        }
      }
    }
  },
  watch: {
    options() {
      this.$nextTick(() => {
        this.refresh++
      })
    }
  },
  mounted() {
    // this.init()
  },
  updated() {
    // this.init()
  },
  methods: {
    init(values) {
      // if (this.jm.get_data) {
      //   this.value = this.jm.get_data()
      // } else {
      this.value = values
      // }
      const options = Object.assign(this.default_options, this.options)
      // this.jm = window.jsMindRisk.show(options, this.value)
      this.jm = _jm.show(options, this.value)
    }
  }
}
</script>
<style scoped>
#jsmind_container {
  height: 100%;
}
::v-deep jmexpander {
  line-height: 7px;
}
::v-deep jmnodes jmnode input{color:#000;}
::v-deep jmnode { box-shadow: none; }
::v-deep jmnodes.theme-info jmnode { background-color: #1890ff; border-color: #1890ff; }
::v-deep jmnodes.theme-info jmnode:hover{ background-color:#9fbcf1; border-color:#9fbcf1; }
::v-deep jmnodes.theme-info jmnode.selected{ background-color:#FEAF12; color:#fff; }

</style>
