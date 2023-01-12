<template>
  <div>
    <a-select
      show-search
      :value="obj.value"
      placeholder="input search text"
      style="width: 200px"
      :default-active-first-option="false"
      :show-arrow="false"
      :filter-option="false"
      :not-found-content="null"
      @search="handleSearch"
      @change="handleChange"
    >
      <!-- <a-select :value="obj.value" style="width: 100%" placeholder="Tags Mode" @change="handleChange"> -->
      <a-select-option v-for="(item) in obj.list" :key="item.node_id">
        {{ item.topic }}
      </a-select-option>
    </a-select>

    <a-space>
      <a-button :disabled="zoomOutDisabled" @click="zoomOut">缩小</a-button>
      <a-button :disabled="zoomInDisabled" @click="zoomIn">放大</a-button>
      <a-button @click="addNode">添加节点</a-button>
      <a-button @click="updateNode">编辑节点</a-button>
      <a-button @click="onRemoveNode">删除节点</a-button>
      <a-upload
        accept=".png,.jpg,.jpeg,.bmp"
        :custom-request="handlePreview"
        :file-list="[]"
        list-type="picture"
      >
        <a-button>添加file节点</a-button>
      </a-upload>
      <a-button @click="bgColor">背景颜色</a-button>
      <a-button @click="changeOption">改变布局方向</a-button>
      <span>主题：</span>
      <a-select v-model="theme_value" @change="set_theme">
        <a-select-option value="">default</a-select-option>
        <a-select-option value="primary">primary</a-select-option>
        <a-select-option value="warning">warning</a-select-option>
        <a-select-option value="danger">danger</a-select-option>
        <a-select-option value="success">success</a-select-option>
        <a-select-option value="info">info</a-select-option>
        <a-select-option value="greensea" selected="selected">greensea</a-select-option>
        <a-select-option value="nephrite">nephrite</a-select-option>
        <a-select-option value="baizehole">baizehole</a-select-option>
        <a-select-option value="wisteria">wisteria</a-select-option>
        <a-select-option value="asphalt">asphalt</a-select-option>
        <a-select-option value="orange">orange</a-select-option>
        <a-select-option value="pumpkin">pumpkin</a-select-option>
        <a-select-option value="pomegranate">pomegranate</a-select-option>
        <a-select-option value="clouds">clouds</a-select-option>
        <a-select-option value="asbestos">asbestos</a-select-option>
      </a-select>
      <a-button type="" @click="screen_shot">保存</a-button>
      <a-button @click="onClouds">treedata</a-button>
      <a-button @click="sendMessage">sendMessage</a-button>
      <a-button @click="gotoGraph">gotoGraph</a-button>
    </a-space>
    <!-- <js-mind v-show="isShow" ref="jsMind" :values="mind" :options="options" height="600px"></js-mind> -->
    <JsMindTree
      v-if="isShow"
      ref="riskAnalysisMind"
      :values="mind"
      :options="options"
      height="600px"
    />
    <a-drawer
      size="1000px"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose"
    >
      <a-tree
        :data="treeData"
        show-checkbox
        :props="replaceFields"
      ></a-tree>
    </a-drawer>
  </div>
</template>

<script>
import { sendYuriMsg } from '@/utils/yuri-msg.js'

export default {
  name: 'Main',
  props: {

  },
  data() {
    return {
      obj: {
        list: [
          {
            node_id: 111,
            topic: '哈哈哈'
          }, {
            node_id: 112,
            topic: '哈哈哈'
          }, {
            node_id: 113,
            topic: '哈哈哈'
          }, {
            node_id: 114,
            topic: '去去去'
          }
        ],
        value: null
      },
      drawer: false,
      direction: 'rtl',
      theme_value: 'info',
      svg: '<i data-v-7764e280="" aria-label="图标: sync" tabindex="-1" class="anticon anticon-sync icon-sync"><svg viewBox="64 64 896 896" data-icon="sync" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" class=""><path d="M168 504.2c1-43.7 10-86.1 26.9-126 17.3-41 42.1-77.7 73.7-109.4S337 212.3 378 195c42.4-17.9 87.4-27 133.9-27s91.5 9.1 133.8 27A341.5 341.5 0 0 1 755 268.8c9.9 9.9 19.2 20.4 27.8 31.4l-60.2 47a8 8 0 0 0 3 14.1l175.7 43c5 1.2 9.9-2.6 9.9-7.7l.8-180.9c0-6.7-7.7-10.5-12.9-6.3l-56.4 44.1C765.8 155.1 646.2 92 511.8 92 282.7 92 96.3 275.6 92 503.8a8 8 0 0 0 8 8.2h60c4.4 0 7.9-3.5 8-7.8zm756 7.8h-60c-4.4 0-7.9 3.5-8 7.8-1 43.7-10 86.1-26.9 126-17.3 41-42.1 77.8-73.7 109.4A342.45 342.45 0 0 1 512.1 856a342.24 342.24 0 0 1-243.2-100.8c-9.9-9.9-19.2-20.4-27.8-31.4l60.2-47a8 8 0 0 0-3-14.1l-175.7-43c-5-1.2-9.9 2.6-9.9 7.7l-.7 181c0 6.7 7.7 10.5 12.9 6.3l56.4-44.1C258.2 868.9 377.8 932 512.2 932c229.2 0 415.5-183.7 419.8-411.8a8 8 0 0 0-8-8.2z"></path></svg></i>',

      mind: {
        meta: {
          name: 'jsMind remote',
          author: 'brccq@qq.com',
          version: '0.2'
        },
        format: 'node_tree',
        data: {
          id: 'root',
          topic: `<i data-v-7764e280="" aria-label="图标: sync" tabindex="-1" class="anticon anticon-sync icon-sync"><svg viewBox="64 64 896 896" data-icon="sync" width="1em" height="1em" fill="currentColor" aria-hidden="true" focusable="false" class=""><path d="M168 504.2c1-43.7 10-86.1 26.9-126 17.3-41 42.1-77.7 73.7-109.4S337 212.3 378 195c42.4-17.9 87.4-27 133.9-27s91.5 9.1 133.8 27A341.5 341.5 0 0 1 755 268.8c9.9 9.9 19.2 20.4 27.8 31.4l-60.2 47a8 8 0 0 0 3 14.1l175.7 43c5 1.2 9.9-2.6 9.9-7.7l.8-180.9c0-6.7-7.7-10.5-12.9-6.3l-56.4 44.1C765.8 155.1 646.2 92 511.8 92 282.7 92 96.3 275.6 92 503.8a8 8 0 0 0 8 8.2h60c4.4 0 7.9-3.5 8-7.8zm756 7.8h-60c-4.4 0-7.9 3.5-8 7.8-1 43.7-10 86.1-26.9 126-17.3 41-42.1 77.8-73.7 109.4A342.45 342.45 0 0 1 512.1 856a342.24 342.24 0 0 1-243.2-100.8c-9.9-9.9-19.2-20.4-27.8-31.4l60.2-47a8 8 0 0 0-3-14.1l-175.7-43c-5-1.2-9.9 2.6-9.9 7.7l-.7 181c0 6.7 7.7 10.5 12.9 6.3l56.4-44.1C258.2 868.9 377.8 932 512.2 932c229.2 0 415.5-183.7 419.8-411.8a8 8 0 0 0-8-8.2z"></path></svg></i>
          jsMind`,
          children: [
            {
              id: 'easy',
              topic: 'Easy',
              direction: 'left',
              expanded: false,
              'background-color': 'red',
              children: [
                { id: 'easy1', topic: 'Easy to show' },
                { id: 'easy2', topic: 'Easy to edit' },
                { id: 'easy3', topic: 'Easy to store' },
                { id: 'easy4', topic: 'Easy to embed' }
              ]
            },
            {
              id: 'open',
              topic: 'Open Source',
              direction: 'right',
              expanded: true,
              children: [
                { id: 'open1', topic: 'on GitHub' },
                { id: 'open2', topic: 'BSD License' }
              ]
            },
            {
              id: 'powerful',
              topic: 'Powerful',
              direction: 'right',
              children: [
                { id: 'powerful1', topic: 'Base on Javascript' },
                { id: 'powerful2', topic: 'Base on HTML5' },
                { id: 'powerful3', topic: 'Depends on you' }
              ]
            },
            {
              id: 'other',
              topic: 'test node',
              direction: 'left',
              children: [
                { id: 'other1', topic: "I'm from local variable" },
                { id: 'other2', topic: 'I can do everything' }
              ]
            }
          ]
        }
      },
      options: {
        container: 'jsmind_container', // [必选] 容器的ID
        editable: true, // [可选] 是否启用编辑
        theme: 'info', // [可选] 主题
        support_html: true
      },
      treeData: [],
      replaceFields: {
        label: 'topic',
        children: 'children'
      },
      isShow: true,
      zoomOutDisabled: false,
      zoomInDisabled: false,
      jsMind: window.jsMind
    }
  },
  async created() {
    // const reqBody = {
    //   caseNumber: 'lerui'
    // }
    const code = 0
    if (code === 0) {
      this.treeData = [
        { 'id': 'root', 'isroot': true, 'topic': 'jsMind' },

        { 'id': 'easy', 'parentid': 'root', 'topic': 'Easy', 'direction': 'left' },
        { 'id': 'easy1', 'parentid': 'easy', 'topic': 'Easy to show' },
        { 'id': 'easy2', 'parentid': 'easy', 'topic': 'Easy to edit' },
        { 'id': 'easy3', 'parentid': 'easy', 'topic': 'Easy to store' },
        { 'id': 'easy4', 'parentid': 'easy', 'topic': 'Easy to embed' },

        { 'id': 'open', 'parentid': 'root', 'topic': 'Open Source', 'expanded': false, 'direction': 'right' },
        { 'id': 'open1', 'parentid': 'open', 'topic': 'on GitHub' },
        { 'id': 'open2', 'parentid': 'open', 'topic': 'BSD License' },

        { 'id': 'powerful', 'parentid': 'root', 'topic': 'Powerful', 'direction': 'right' },
        { 'id': 'powerful1', 'parentid': 'powerful', 'topic': 'Base on Javascript' },
        { 'id': 'powerful2', 'parentid': 'powerful', 'topic': 'Base on HTML5' },
        { 'id': 'powerful3', 'parentid': 'powerful', 'topic': 'Depends on you' }
      ]
    }
  },
  mounted() {
    // this.jm = this.$refs.jsMind.jm
    this.$refs.riskAnalysisMind?.init(this.mind)
    this.jm = this.$refs.riskAnalysisMind.jm
    // this.jm.enable_edit()
  },
  methods: {
    handleChange(value) {
      console.log('value: ', value)
      this.obj.value = value
    },
    handleSearch() {
      this.obj.list = [
        {
          node_id: 111,
          topic: '哈哈哈'
        }, {
          node_id: 111,
          topic: '哈哈哈'
        }, {
          node_id: 111,
          topic: '哈哈哈'
        }
      ]
    },
    sendMessage() {
      sendYuriMsg('ADD_TARGET_RISK', { target: { name: '我是目标' }})
    },
    gotoGraph() {
      this.$router.push({ name: 'graph', params: { graphProp: '我是路由参数' }})
    },
    handleClose() {
      this.drawer = false
    },
    // 缩小
    zoomOut() {
      this.zoomInDisabled = false
      if (this.jm.view.zoomOut()) {
        this.zoomOutDisabled = false
      } else {
        this.zoomOutDisabled = true
      }
    },
    // 放大
    zoomIn() {
      this.zoomOutDisabled = false
      if (this.jm.view.zoomIn()) {
        this.zoomInDisabled = false
      } else {
        this.zoomInDisabled = true
      }
    },
    // 新增节点
    addNode() {
      var selectedNode = this.jm.get_selected_node() // as parent of new node
      console.log('selected_node', selectedNode)
      if (!selectedNode) { this.$message.info('请先选择一个节点'); return }
      var nodeid = this.jsMind.util.uuid.newid()
      var topic = 'new Node'
      this.jm.add_node(selectedNode, nodeid, topic)
    },
    // 编辑节点
    updateNode() {
      var selectedId = this.get_selected_nodeid()
      console.log('update_node-nodeid: ', selectedId)

      if (!selectedId) { this.$message.info('请先选择一个节点'); return }
      var topic = 'update Node'
      this.jm.update_node(selectedId, topic)
    },
    // 删除节点
    onRemoveNode() {
      var selectedId = this.get_selected_nodeid()
      console.log('remove_node-nodeid: ', selectedId)
      if (!selectedId) { this.$message.info('请先选择一个节点'); return }
      this.jm.remove_node(selectedId)
    },
    handlePreview(options) {
      var selected_node = this.jm.get_selected_node() // as parent of new node
      console.log('selected_node: ', selected_node)
      if (!selected_node) {
        this.$message.info('请先选择一个节点')
        return
      }

      // 通过webAPI获得该图片的base64格式
      var reader = new FileReader()
      // reader.readAsArrayBuffer(options.file);
      const file = options.file
      if (file) {
        reader.readAsDataURL(file)
      }
      var that = this
      reader.onload = function() {
        var selected_node = that.jm.get_selected_node()
        var nodeid = that.jsMind.util.uuid.newid()
        var data = {
          'background-image': reader.result,
          'width': '100',
          'height': '100'
        }
        that.jm.add_node(selected_node, nodeid, undefined, data)
      }
      console.log('file: ', file)
    },
    // 改变节点背景颜色
    bgColor() {
      var selectedId = this.get_selected_nodeid()
      if (!selectedId) { this.$message.info('please saect a node first.'); return }
      this.jm.set_node_color(selectedId, '#DC143C', null)
    },
    // 布局方向
    changeOption() {
      if (this.options && this.options.mode === 'side') {
        this.options = {
          mode: 'full'
        }
      } else {
        this.options = {
          mode: 'side'
        }
      }
    },
    screen_shot() {
      this.jm.screenshot.shootDownload()
    },
    onClouds() {
      this.drawer = true
      this.treeData = [this.jm.get_data().data]
      console.log('this.treeData: ', this.treeData)
      console.log('mind:', this.jm.get_meta())
      console.log('45444:', this.jm.get_data())
    },
    // 选择主题颜色
    set_theme() {
      this.jm.set_theme(this.theme_value)
    },
    // 获取选中标签的 ID
    get_selected_nodeid() {
      var selectedNode = this.jm.get_selected_node()
      if (selectedNode) {
        return selectedNode.id
      } else {
        return null
      }
    },
    test() {
      // test
      this.viewdata = [
        {
          '_kikyo': {
            'create_time': '2021-11-04T03:29:44+08:00',
            'data_source': 'zx.file',
            'domain': '科学院科技工作',
            'id': '87e57076cbd784993228b52430b2c5a7751fdd19',
            'keywords': [
              'electrolyzed',
              'water',
              '电解清洗机',
              '清洗机',
              'Journal',
              'vitro',
              'digestion',
              'oxidizing',
              'Chemistry',
              'International',
              'NaCl',
              'acidic',
              'antioxidant',
              '兽药残留',
              'DC24V',
              '2min',
              'Feng',
              'GYU',
              'Science',
              'Technology',
              'Hung',
              'treatment',
              'Xiong',
              'Microbiology',
              'Control',
              'Galvis',
              'Berrio',
              'Perlaza',
              'degradation',
              'fluoroquinolone',
              'antibiotics',
              'active',
              'chlorine',
              'Electrochemical',
              'activity',
              'Stability',
              'total',
              'capacity',
              'kns',
              'cnki',
              'net',
              'kcms',
              'detail',
              '残留降解',
              'L孔雀石',
              'Food',
              '环丙沙星',
              '降解',
              'al',
              '激动剂',
              'Yi',
              '电解'
            ],
            'themes': [],
            'update_time': '2021-12-22T10:21:04.796259+08:00'
          },
          '_meta': null,
          'abstract': null,
          'alarm_producer': [
            '内容泄密检测引擎'
          ],
          'alarm_time': '2021-12-22T10:21:04.796259+08:00',
          'alarm_type': '公告告警',
          'attachment': [
            'http://192.168.124.224:9000/kikyo-files/zx-msg-file/dae63d8281ff9bbf2849fe17f7a4a8e710b28066.pdf'
          ],
          'attachment_name': [
            '1817865.pdf'
          ],
          'attachment_preview': [
            'http://kkfileview.app.kdsec.org/onlinePreview?url=aHR0cDovLzE5Mi4xNjguMTI0LjIyNDo5MDAwL2tpa3lvLWZpbGVzL3p4LW1zZy1maWxlL2RhZTYzZDgyODFmZjliYmYyODQ5ZmUxN2Y3YTRhOGU3MTBiMjgwNjYucGRm'
          ],
          'attributes': [
            {
              'key': '微信ID',
              'value': '4929023246'
            },
            {
              'key': '微信号',
              'value': 'pwrtkhrgil'
            },
            {
              'key': '群号',
              'value': '944048953'
            },
            {
              'key': '发送时间',
              'value': '2021-11-04 03:29:44'
            },
            {
              'key': '发布IP',
              'value': '81.103.101.104'
            }
          ],
          'content': ' 电解对兽药残留的降解作用程永友1刘洪斌2马风伟1 孙一朋3 1.贵阳学院食品与制药工程学院，贵州贵阳550005 2.中国动物疫病预防控制中心，北京100125 3.北京雁栖湾生物技术有限公司，北京100081 摘要：研究以两款市售电解清洗机为实验对象，观察该类清洗机对兽药残留降解能力。用酶联免疫试剂盒和胶体金试纸研究其对青霉素类、磺胺类、氟喹诺酮类、四环素类、β-受体激动剂类化合物等物质的降解效率及影响因素。用HPLC分析电解清洗机对猪肉和猪肝实际样本中兽药残留的作用效果。结果表明：电解清洗机能够有效降解水溶液中青霉素类、磺胺类、β-受体激动剂类化合物。 对恩诺沙星、环丙沙星、氧氟沙星等几种化合物降解效率低。对于50 mg/L孔雀石绿溶液，清洗机一（功率：DC24V/2.5A）降解完全需要6min，而清洗机二（功率：DC24V/5A）仅2min即可降解完全。对于100 mg/L孔雀石绿溶液，100 mg/L NaCl条件下，2min 降解完全；50 mg/L NaCl条件下需要4 min; 25 mg/L NaCl条件下10min仍不能完全降解。在孔雀石绿溶液中添加0.5％血清，清洗机作用10 min仍不能完全降解。猪肉和猪肝样本经电解清洗机作用后，沙丁胺醇、恩诺沙星、环丙沙星、磺胺甲噁唑和磺胺间甲氧嘧啶残留量在80％以上。试验结果表明：电解清洗机作用效果受仪器功率、电解质种类和浓度、血清、样本状态等影响大。电解清洗机用于肉类食品中化合物残留降解，受影响因素多，不能确保有效去除肉产品中兽药残留。 电解清洗机；兽药残留；降解；影响因素 1673-9078(2020)01-281-287 10.13982/j .mfst. 1673-9078.2020. 1.039 Degradation of Veterinary Drug Residues by Electrolysis CHENG Yong-you LIU Hong-binMA Feng-weiSUN Yi-peng 2019-05-12 基金项目：贵阳学院博士科研启动经费(GYU-ZRD [2018] -021)；贵阳市科技局贵阳学院专项资金(GYU-KYZ[2018]01-16)；贵州省科技厅基础研究计划项目（黔科合基础[2019] 1013号） 程永友（1981-），男，讲师，博士研究生，研究方向：食品质量安全 @@[1] 谢军，孙晓红，潘迎捷，等.酸性电解水及其在食品工业中的应用[J].食品工业科技，2010，2:366-368 XIE Jun, SUN Xiao-hong, PAN Ying-jie, et al. Acidic electrolyzed water and its application in the food industry [J]. Science and Technology of Food Industry, 2010, 2:366-368 @@[2] Qi H, Huang Q, Hung Y C. Effectiveness of electrolyzed oxidizing water treatment in removing pesticide residues and its effect on produce quality [J]. Food Chemistry, 2018, 239: 561 @@[3] Xiong K, Liu H J, Liu R, et al. Differences in fungicidal efficiency against aspergillus flavus for neutralized and acidic electrolyzed oxidizing waters [J]. International Journal of Food Microbiology, 2010, 137(1): 67-75 @@[4] Audenaert K, Monbaliu S, Deschuyffeleer N, et al. Neutralized electrolyzed water efficiently reduces Fusarium, spp. in vitro and on wheat kernels but can rrigger Deoxynivalenol (DON) biosynthesis [J]. Food Control, 2012, 23(2):515-521 @@[5] Zhang Q, Xiong K, Tatsumi E, et al. Elimination of aflatoxin B1, in peanuts by acidic electrolyzed oxidizing water [J]. Food Control, 2012, 27(1): 16-20 @@[6] Serna-Galvis E A, Jojoa-Sierra S D, Berrio-Perlaza K E, et al. Structure-reactivity relationship in the degradation of three representative fluoroquinolone antibiotics in water by electrogenerated active chlorine [J]. Chemical Engineering Joumal, 2017, 315:552-561 @@[7] Sema-Galvis E A, Berrio-Perlaza K E, Torres-Palma R A. Electrochemical treatment of penicillin, cephalosporin, and fluoroquinolone antibiotics via active chlorine: evaluation of antimicrobial activity, toxicity, matrix, and their correlation with the degradation pathways [J]. Environ Sci Pollut Res Int, 2017, 24(30): 23771 @@[8] Barhoumi N, Labiadh L, Oturan M A, et al. Electrochemical @@[22] Wootton-Beard P C, Moran A, Ryan L. Stability of the total antioxidant capacity and total polyphenol content of 23 commercially available vegetable juices before and after in vitro digestion measured by FRAP, DPPH, ABTS and Folin-Ciocalteu methods [J]. Food Research International, 2011, 44(1): 217-224 @@[23]马艺超，路飞，马凤鸣，等.体外模拟消化对苦荞面包黄酮及抗氧化的影响[J/OL].中国粮油学报，1-7 [2019-10-22]. http://kns.cnki.net/kcms/detail/11.2864.TS.20190711.1656.00 2.html MA Yi-chao, LU Fei, MA Feng-ming, et al. Effects of simulated digestion in vitro on flavonoids and antioxidant activity of tartary buckwheat bread [J/OL]. Chinese Journal of Cereals and Oils, 1-7 [2019-10-22]. http://kns.cnki.net/ kcms/detail/11.2864.TS.20190711.1656.002.html @@[24] M.-J. Bermúdez-Soto, F.-A. Tomás-Barberán, M.-T. García-Conesa. Stability of polyphenols in chokeberry (Aronia melanocarpa) subjected to in vitro gastric and pancreatic digestion [J]. Food Chemistry, 2007, 102(3): 865-874 @@[25] Bouayed J, DeuBer H, Hoffmann L, et al. Bioaccessible and dialysable polyphenols in selected apple varieties following in vitro digestion vs. their native patterns [J]. Food Chemistry, 2012, 131(4): 1466-1472 @@[26] He Z, Yuan B, Zeng M, et al. Effect of thermal processing and digestive protease on the antioxidant capacity of fruit juice-milk beverage model systems under simulated gastrointestinal digestion [J]. International Journal of Food Science & Technology, 2015, 50(10): 2306-2315 @@[27] Wang Y, Zhang G, Pan J, et al. Novel insights into the inhibitory mechanism of kaempferol on xanthine oxidase J]. Journal of Agricultural and Food Chemistry, 2015, 63(2): 526- 534 @@[28]李瑜.益生菌发酵中药产抗氧化美白成分[D].无锡：江南大学，2018 LI Yu. Antioxidant whitening component produced by probiotic fermentation of traditional Chinese medicine [D]. Wuxi: Jiangnan University, 2018 mineralization of the antibiotic levofloxacin by electro fenton-pyrite process [J]. Chemosphere, 2015, 141:250-257 @@[9] Kim C, Hung Y C, Braekett R E. Efficacy of electrolyzed oxidizing (EO) and chemically modified water on different types of fcodbome pathogens [J]. International Journal of Food Microbiology, 2000, 61(2): 199-207 @@[10] Ding T, Ge Z, Shi J, et al. Impact of slightly acidic electrolyzed water (SAEW) and ultrasound on microbial loads ',
          'create_time': '2021-11-04T03:29:44+08:00',
          'custom_tags': null,
          'data_source': 'zx.file',
          'dip': null,
          'domain': '科学院科技工作',
          'hit_infomation': {
            '标题告警': 1
          },
          'id': '56983c86a80ceea06e6296b792472f8866222c12',
          'info_detail': [
            {
              'properties': [
                {
                  'key': '标题',
                  'value': '1817865.pdf'
                },
                {
                  'key': '摘要',
                  'value': ''
                },
                {
                  'key': '信息类型',
                  'value': ''
                }
              ],
              'title': '信息属性'
            },
            {
              'properties': [
                {
                  'key': '发布者',
                  'value': ''
                },
                {
                  'key': '接收者',
                  'value': ''
                },
                {
                  'key': '发布者ID',
                  'value': ''
                },
                {
                  'key': '所属地域',
                  'value': ''
                }
              ],
              'title': '人员属性'
            },
            {
              'properties': [
                {
                  'key': '渠道类型',
                  'value': '传输'
                },
                {
                  'key': '渠道名称',
                  'value': '专项数据'
                },
                {
                  'key': '来源',
                  'value': 'zx.file'
                }
              ],
              'title': '渠道属性'
            },
            {
              'properties': [
                {
                  'key': '发布时间',
                  'value': '2021-11-04 03:29:44'
                },
                {
                  'key': '采集时间',
                  'value': '2021-11-04T03:29:44+08:00'
                },
                {
                  'key': '分析时间',
                  'value': '2021-12-22T10:21:04.796259+08:00'
                },
                {
                  'key': '风险判定时间',
                  'value': '2022-07-07T16:13:16.611696+08:00'
                }
              ],
              'title': '系统属性'
            }
          ],
          'ip': '81.103.101.104',
          'judge_info': {
            'judge_basic_tag': 'tag1',
            'judge_person': 'root',
            'judge_result': '绝密',
            'judge_time': '2022-07-07T16:13:16.611696+08:00',
            'judge_type': '人工研判'
          },
          'md5': 'da63d2ea0665db3c5f29971aa7d005a6',
          'media_url': 'http://192.168.124.224:9000/kikyo-mail-files/dae63d8281ff9bbf2849fe17f7a4a8e710b28066.pdf',
          'publish_time': '2021-11-04 03:29:44',
          'receiver': null,
          'rule_content': '(CPI|PPI|GDP|GNP|国内生产总值|国民生产总值|新增就业岗位|预期增长目标)',
          'rule_group': '规则组2',
          'rule_id': 8,
          'sender': null,
          'sip': null,
          'snapshot': 'http://192.168.124.224:9000/kikyo-files/zx-msg-file/dae63d8281ff9bbf2849fe17f7a4a8e710b28066.pdf_0.png',
          'source': 'pwrtkhrgil',
          'source_id': '4929023246',
          'subscription': {
            'subscription_person': 'root',
            'subscription_status': 1,
            'subscription_time': '2022-07-11T10:03:58.406810+08:00'
          },
          'tag': [
            '科学院科技工作',
            'electrolyzed',
            'water',
            '电解清洗机',
            '清洗机',
            'Journal'
          ],
          'target_id': '944048953',
          'task_id': 126,
          'title': '',
          'type': '5',
          'update_time': '2021-12-22T10:21:04.796259+08:00',
          'url': 'http://192.168.124.224:9000/kikyo-files/zx-msg-file/dae63d8281ff9bbf2849fe17f7a4a8e710b28066.pdf',
          'website_name': null
        },
        {
          '_kikyo': {
            'create_time': '2021-11-02T23:14:40+08:00',
            'data_source': 'zx.file',
            'domain': null,
            'id': '09581ef5a6edfbb625d124393a90db04a8226753',
            'keywords': [
              '贵州省遵义市',
              '工作表',
              '人民政府副县长',
              '贵州省遵义市播州区'
            ],
            'themes': [],
            'update_time': '2021-12-22T10:16:46.649803+08:00'
          },
          '_meta': null,
          'abstract': null,
          'alarm_producer': [
            '内容泄密检测引擎'
          ],
          'alarm_time': '2021-12-22T10:16:46.649803+08:00',
          'alarm_type': '公文版式告警',
          'attachment': [
            'http://192.168.124.224:9000/kikyo-files/zx-msg-file/161f5cf16c654afa8577822854652405a2790d76.xlsx'
          ],
          'attachment_name': [
            '（贵州省）需要调整学员信息表.xlsx'
          ],
          'attachment_preview': [
            'http://kkfileview.app.kdsec.org/onlinePreview?url=aHR0cDovLzE5Mi4xNjguMTI0LjIyNDo5MDAwL2tpa3lvLWZpbGVzL3p4LW1zZy1maWxlLzE2MWY1Y2YxNmM2NTRhZmE4NTc3ODIyODU0NjUyNDA1YTI3OTBkNzYueGxzeA%3D%3D'
          ],
          'attributes': [
            {
              'key': '微信ID',
              'value': '8275844564'
            },
            {
              'key': '微信号',
              'value': 'rdvw2mh8iz'
            },
            {
              'key': '群号',
              'value': '9272150180'
            },
            {
              'key': '发送时间',
              'value': '2021-11-02 23:14:40'
            },
            {
              'key': '发布IP',
              'value': '233.199.102.215'
            }
          ],
          'content': '工作表1 需要调整学员信息表（县级河（湖）长） 序号姓名身份证号手机号码所属省、自治区、直辖市职务备注 152 韦学令 522732198307293813 13312369618 贵州省黔南州三都县人民政府副县长之前上报电话号码错误。 联络员：贵州省水利厅河湖长制工作处吴学超，联系方式：85938215。 37 付长江 52212419800904201X 18985231603 贵州省遵义市绥阳县人民政府副县长 38 杨庆元 522121196312280055 13595288883 贵州省遵义市播州区政协副主席 39 蒋文欢 522121196212090430 13985612198 贵州省遵义市播州区人大副主任 40 彭勇 522125196612060017 13985646580 贵州省遵义市道真县政协副主席 43 张斌 520203198004210514 13984636427 贵州省六盘水市六枝特区人民政府党组成员、副区长工作表2 工作表3 ',
          'create_time': '2021-11-02T23:14:40+08:00',
          'custom_tags': null,
          'data_source': 'zx.file',
          'dip': null,
          'domain': null,
          'hit_infomation': {
            '公文版式告警': 1
          },
          'id': '3ab7f2bcb1a6083b6f9bde1936a6ce18de6e86c9',
          'info_detail': [
            {
              'properties': [
                {
                  'key': '标题',
                  'value': '（贵州省）需要调整学员信息表.xlsx'
                },
                {
                  'key': '摘要',
                  'value': ''
                },
                {
                  'key': '信息类型',
                  'value': ''
                }
              ],
              'title': '信息属性'
            },
            {
              'properties': [
                {
                  'key': '发布者',
                  'value': ''
                },
                {
                  'key': '接收者',
                  'value': ''
                },
                {
                  'key': '发布者ID',
                  'value': ''
                },
                {
                  'key': '所属地域',
                  'value': ''
                }
              ],
              'title': '人员属性'
            },
            {
              'properties': [
                {
                  'key': '渠道类型',
                  'value': '传输'
                },
                {
                  'key': '渠道名称',
                  'value': '专项数据'
                },
                {
                  'key': '来源',
                  'value': 'zx.file'
                }
              ],
              'title': '渠道属性'
            },
            {
              'properties': [
                {
                  'key': '发布时间',
                  'value': '2021-11-02 23:14:40'
                },
                {
                  'key': '采集时间',
                  'value': '2021-11-02T23:14:40+08:00'
                },
                {
                  'key': '分析时间',
                  'value': '2021-12-22T10:16:46.649803+08:00'
                },
                {
                  'key': '风险判定时间',
                  'value': '2021-12-22T10:16:46.649803+08:00'
                }
              ],
              'title': '系统属性'
            }
          ],
          'ip': '233.199.102.215',
          'judge_info': {
            'judge_basic_tag': 'tag1',
            'judge_person': 'root',
            'judge_result': '内部',
            'judge_time': '2021-12-22T10:16:46.649803+08:00',
            'judge_type': '自动研判'
          },
          'md5': 'da7a513912013eff40a736df19e94940',
          'media_url': 'http://192.168.124.224:9000/kikyo-mail-files/161f5cf16c654afa8577822854652405a2790d76.xlsx',
          'publish_time': '2021-11-02 23:14:40',
          'receiver': null,
          'rule_content': '(中共中央文件|国务院文件|办公厅文件|部文件|委员会文件|中央军委文件|领导小组文件|协调小组文件)',
          'rule_group': '规则组1',
          'rule_id': 2,
          'sender': null,
          'sip': null,
          'snapshot': 'http://192.168.124.224:9000/kikyo-files/zx-msg-file/161f5cf16c654afa8577822854652405a2790d76.xlsx_0.png',
          'source': 'rdvw2mh8iz',
          'source_id': '8275844564',
          'subscription': {
            'subscription_person': 'root',
            'subscription_status': 1,
            'subscription_time': '2022-06-09T17:50:08.471979+08:00'
          },
          'tag': [
            '贵州省遵义市',
            '工作表',
            '人民政府副县长',
            '贵州省遵义市播州区'
          ],
          'target_id': '9272150180',
          'task_id': 122,
          'title': '（贵州省）需要调整学员信息表.xlsx',
          'type': '5',
          'update_time': '2021-12-22T10:16:46.649803+08:00',
          'url': 'http://192.168.124.224:9000/kikyo-files/zx-msg-file/161f5cf16c654afa8577822854652405a2790d76.xlsx',
          'website_name': null
        },
        {
          '_kikyo': {
            'create_time': '2021-11-04T19:05:07+08:00',
            'data_source': 'zx.file',
            'domain': null,
            'id': '6afed018960629b6ef6d31caf299f1f1d091bd7a',
            'keywords': [
              '网上购物',
              '网上商店',
              '信息活动',
              '网上零售业',
              '网上商店界面',
              '信息空间',
              '信息活动模式',
              '中中',
              'GVU',
              'Georgia',
              'Hermes',
              'Novake',
              '购物决策',
              '专业属性',
              '购买决',
              '中中中',
              '界面设计',
              '购买决策',
              'Internet',
              'IDC',
              'Nielsen',
              'Tech',
              'Hoffman',
              'Chatterjel',
              'Alan',
              'evoked',
              '影响网上',
              '电子商务模式',
              '网上购物者',
              '商品类别',
              '购物站点',
              '商店站点',
              '系统交互',
              '网络经验属性',
              '计算机知识',
              '消费者购物决策',
              '信息处理过程',
              '信息搜寻',
              '信息需求',
              '信息收集',
              '决策评判',
              '商品特定',
              '相关信息',
              '消费者网上购物',
              '中中中中',
              '商品信息',
              '购物者',
              'HCI',
              '超媒体',
              '频度',
              '交互',
              '零售业',
              '要花费',
              '购物'
            ],
            'themes': [],
            'update_time': '2021-12-10T11:25:58.212478+08:00'
          },
          '_meta': null,
          'abstract': null,
          'alarm_producer': [
            '内容泄密检测引擎'
          ],
          'alarm_time': '2021-12-10T11:25:58.212478+08:00',
          'alarm_type': '公文版式告警',
          'attachment': [
            'http://192.168.124.224:9000/kikyo-files/zx-msg-file/f29eca757baac9f85747de74bdeb3f27aa6bcfe4.pdf'
          ],
          'attachment_name': [
            '1817809.pdf'
          ],
          'attachment_preview': [
            'http://kkfileview.app.kdsec.org/onlinePreview?url=aHR0cDovLzE5Mi4xNjguMTI0LjIyNDo5MDAwL2tpa3lvLWZpbGVzL3p4LW1zZy1maWxlL2YyOWVjYTc1N2JhYWM5Zjg1NzQ3ZGU3NGJkZWIzZjI3YWE2YmNmZTQucGRm'
          ],
          'attributes': [
            {
              'key': '微信ID',
              'value': '2607984225'
            },
            {
              'key': '微信号',
              'value': 'exkuls29bp'
            },
            {
              'key': '群号',
              'value': '2065461'
            },
            {
              'key': '发送时间',
              'value': '2021-11-04 19:05:07'
            },
            {
              'key': '发布IP',
              'value': '49.172.148.206'
            }
          ],
          'content': " 第一次全国CSCW学术会议论文集(1998北京) 网上购物界面的工程心理学分析李江予张侃 (中国科学院心理研究所 100101) [摘要】网上零售业作为电子商务的形式之一， 极具市场潜力和重要影响。既有的调查发现： 网上商店的界面设计是影响网上零售业发展的重要因素之一；购物者将其不满意的网上购物经验主要归因为网上商店的界面混乱，要在网上商店里面找到所要求的信息不太容易。本文依据HCI(人一计交互)的主要原理，．肌用户、 任务、信息环境及其交互的角度进行分析，归结出可能对网上商店设计产生重要影响的几个因素，以期对网上商店的进一步分析与设计提供一些基础性的参考依据。 【关键词】网上购物购物决策模式 HCI用户 Web信息活动信息结构与表征问题的背景 Internet网或Web网络技术的飞速发展， 推动了电子商务模式的逐步形成与发展，从而形成了新的商业模式和商业机遇，它将对未来企业、国家的经济发展变化和国际竞争力产生重要影响，因此受到了各国政府与企业的高度重视。如Fortune排名的世界前500名大企业有超过的2／3在使用Intranet(余凯，1997a)； 美国政府在极力推行其“网络经济”政策，提出了电子商务基本框架，并与WTO达成网上贸易免征关税一年的协议(wiII Jam J． Clinton，1997)；我国也提出并建立了几个大的网上交易系统。有人预测(IDC，1998)，到2000 年电子商务的交易额将达4500到6000亿美元。 网上零售业作为电予商务的形式之一，预计在 2000年将达60亿到73亿美元(Forrester Research，Link／IDC Jupiter Communications．1996)．在2005年前后，美国的网上零售将达1000亿美元 (Nielsen．1995)． ， 调查显示(GVU，1997)，由于网上购物形式在方便(65％)、获取商业信息(60哟，避免销售人员所带来的压力(55％)和节省时间(53％)等方面独有特性，在欧美，Web的用户中有2／3 的人(68．1“)有过网络订购商品的经验(注： 括号中的数字是对相应项目持赞同意见的被调查者比例)．网上零售对未来电子商务和商业模式将产生深远的影响。 但是，网上零售业远没有达到它应有的额度。与传统零售业相比，比例还很小，用户对网上商店是看的多买的少(Georgia Teeb／Hermes，1995)，许多人有网上订购的经验，但其频度很小(GVU,1997)。这种状况的原因可以归结为如下几个方面； 1．网上购物的障碍。包括足够的网上购物的经验、支付的安全性担心、商业支持系统的复杂性(tt术的、投入与维护等)等(Georgia Tech／Hermes，1995)。 2．网上购物形式缺少翻动商品目录和店内购物的实际体验，也缺少网上购物者的行为特点的知识。(Hoffman，Novake。 Chatterjel，1995)‘ ‘ 3．网上购物的商业模式。网上购物是一种新的商业模式，正在形成中，与传统商业模式相比尚不够成熟和完善；同时也缺乏Web上商务的有效性及其测量的标准。(Hoffman。Novake．1996) 4．网上购物的商品类别的适应性．即： 一些商品适于WEB，而另一些商品则不然(Georgia Tech／Hermes，1995)． 5．界面设计因素．即网上商店界面的功 ·281· 能、对象等信息的组织与表征．这正是本文所要研究的重心．因为现实中的网上购物者要通过网上商店界面找到有用的信息却并不太容易．GvU(1997)的调查显示，人们要花费较多的时间来寻找商品信息(33％的人花15—30分钟的时间寻找信息，27％的人的时间超过30分钟)，而很多情况下却找不到所要的信息(46％ 人称不能找到他们所要找的东西，40％的人要花费5一15分钟的寻找才开始找到有用的信息， 22％的人称只有半数的情况能找到所要找的东西，只有16％的专家和13％的新手总是能找到所要找的东西。)．井将对网上购物的不满意经验归结为购物站点界面的混乱(46％)，与网络速度慢并重。网上商店界面的设计严重影响用户对于商品信息的获取，及对商店站点的偏爱， 而它正是吸引客户对商店站点访问和足够的再访问的重要因素或主要问题(hofman．Novake。 Chatterjel．1995)。 相信随着时间的推移．有关技术和商业机制的问题会很快得以解决(这一点可以近来遍布全球的电子商务热潮中感受到)．而对于商店界面设计的问题，却未受到应有的重视，目前也未见到有对此进行较为系统讨论或研究的，但随着网络技术的发展、电子商务模式的逐步形成，网上商店界面已经和正在成为影响网上购物效果的重要因素，会对网上购物带来有效而极大的消极或积极的作用。 }IcI(Hu=an-computer Interaction，简称人计交互)理论认为，人、计算机技术与通过其问的交互完成的任务，实际上构成一个完整的系统。这里，交互的两端——人与计算机系统 ——各自的物理特征和信息处理特征构成整个系统交互的基础，在此之上的对任务的分析与理解构成交互的模式与目标．需要研究这个系统中所涉及的各要素的特点及其彼此之间的交互特点，才能提高系统的整体效能，满足其可用性要求(usability)(Alan Dix，et．1993)． 本文尝试从}lcI的一般原理和方法论角度，对网上购物的交互和界面设计进行研究，以寻求可能影响网上商店界面设计的重要因素下面将从一个较为宏观的层次，对于网上购物所涉及的人(用户)、任务、信息环境及其之问的交互，分别予以简略分析和讨论． 人这里的人即网上商店的顾客。亦即系统用户．可以从三个方面分别予以简略分析，即用户的自然属性、职业与专业属性、计算机与网络经验属性。 用户的自然属性： 即认知心理学关于人的信息加工的能力特点及其局限性的认识．它主要涉及认知结构与活动等诸多方面理解，直接或间接地影响着不同的Ha分析模型与方法的形成与应用，它们的重要意义在既有的文献里也曾有过较为系统的探讨(Alan D玩眈1993；Jcany,et．19947。相信随着对人认知的理解的深入和完善，HcI的理论与方法也会有较大的发展。 用户的职业与专业属性： 用户的职业与专业属性亦即关于用户的职业与专业分布的人口统计特征，它从另一方面揭示信息系统使用者的群体特征．它不仅对网上销售的策略和市场细分至关重要，而且对于理解网上潜在购物者的知识、认知特征和行为方式大有裨益，尤其是其计算机与网络的经验与知识。不少的组织做过关于Internet用户的平均年龄、职业分布等的调查(GVU，1997： Nielsen Media Rcscarch／Commcrce Net)． 以此为特征的用户群．其消费行为特征、 认知能力特征及其与计算机交互的行为特征都有待于深入研究，它们将对弼上商店的设计产生重大影响。 计算机与网络经验属性： 用户的计算机知识与经验层次，可以将他们耜略地分为三类(Shc．crderman,1997)：首次使用(first-time)、偶尔(intermittent)和经常使用(frequent)计算机的用户，他们对信息系统的要求或者说信息系统的不同特点对于不同用户的重要性与适应性是不同的： 系统概貌 (overview)的有效表征与用户对概貌的形成对首次使用计算机的用户是重要的：系统的结构及其表征、信息空间的特定标志(1endmark) 对偶尔使用者是重要的；而对于经常使用计算机系统的用户来说，提供信息访问的快捷方式 (short-cut to speed repeated task)则可以加速 -282· 任务完成． 用户的计算机知识与经验的另一个侧面即完成特定网络任务的行为频度，具体到购物即用户在特定网上购物站点上实施与购物有关的信息行为的频度．因为用户界面中，对信息对象的不同表征方式，对不同频度计算机应用的任务绩效的影响是不一样的(Arthur E Kl'amcr, 1990)。 任务活动这里的任务即网上购物的任务。网上购物可以插述为用户为完成购物或与之有关的任务而在网上虚拟的购物环境中浏览、搜索相关商品信息，从而为购买决策提供所需的必要信息， 并实践购买决簧和购买．它可以分为两个维度， 即一般的消费者购物决策的信息活动模式和网上购物的信息活动模式． 消费者购物决策的信息活动模式消费心理学家将消费者的购物称作问题解决过程或购买决策的信息处理过程，它可分为三个阶段：需求确定、买前信息搜寻、备选商品的评价(Kofman,1994)。当消费者具有对新的商品的期望时，便产生了需求，即需求确定． 而当确定唯有通过购买并消费商品才能满足这种需求时，于是进入决策过程的下一阶段—— 购买前的信息搜寻．消费者首先在自己的记忆中搜寻可能与所需商品相关的经验，如果没有足够的信息以资决策，他便要在其外部环境中寻找与之相关的信息。但并不是所有的购买决策情景都要求同样程度的信息和信息活动，依据消费者对特定商品类别或特定品牌商品的评判标准与购买倾向的明晰程度，大致可以将购买决箫情景区分为广泛的问题解、有限的问题解决、惯常的问题解决三种问题解决模式，其对信息需求及努力的范围和程度是不同的． 决策处理过程的第三阶段即备择商品的评价，即依据特定的评价标准，对各择商品的不同特性进行评价，从而作出购买的决定。不同的决策策略，其实就是对商品重要特性评判、 取舍的不同方式，所谓的信息收集即是为决策评判提供商品特定属性的信息。尽管消费者需要足够多的信息才能作出一个相对满意而安全的决策，但实际上，他们总是不愿。努力”或 。费力”地进行广泛而深入的信息收集，也不愿意做太多的决策努力，而是一个自以为”足够好。的”满意”决簟。因为较为复杂的决策评判模式需要太多的认知投入，耗费太多的认知资源， 是～个麻烦而费力的过程。 在消费者购买决莆的信息处理过程中，有三个重要的概念起着重要的作用：商品分类、 CVOked-set和购买风险。商品分类即物品评价的过程，评价它与人们所己知物品或事物的特性的类似程度而将商品分为不同的类别。同一类别的商品在特定的特性方面是相同的或类似的．evoked-sot指的是消费者作出购买决策时所考虑的特定类别中的特定的商品品牌(数)， 一般地说， evoked．sc‘容量都很小，只有三到四个品牌，它们在某些方面具有共同的特征． 购买风险，即由于对商品特定的信息不足而带来的可能后果的不确定性。尽管消费者对减少购买风险会有不同的策略，但其实质上还是对相关信息需求满足的问题，其众多的策略实质上是在信息无法满足时的策略。 由此可知，消费者的购买决策过程实际上是一个相关信息搜集与评价分析的过程，它具有不同的行为程度和脑力负荷。 消费者网上购物的信息活动模式消费者网上购物任务活动的另外一个层面，即网络信息空间的认知和任务活动，有三种方式(Shneiderman 1997，Gary Marchionini 1995，Loo and Chung 1991)； 浏览(browsing)：非正式和机会性的，没有特定的日的，较大程度地依赖信息环境。 搜索(exploring)：在一个既定的概念领域内找到新信息。它的三个特点：1．收集到的参考信息有助于达到发现新信息的最终目的；2．用户时常要访问众多不同的信息源；3．用户兴趣的演化依赖于信息背景的变化寻找@arching)；是在大信息量信息集里寻找特定项目并定位于信息的最有效的方式。 在信息空间的活动中，三种任务不是孤立的进行的，而是互动的，用户的任务或意图会在用户的信息活动过程中逐渐变化而渐趋明晰 (Mackinlay,Ramana＆Card，1995)．它们在任务目的性、完成任务的效率、要求的认知负荷、 ·283· 对信息空问标志‘路标)、形成信息空间概貌和任务燕略的有利性等方面的差异可由下表表示； 目的概貌效认知计划， 路标性富负荷策略依赖浏低高低低高中览搜中中中中中高索寻高低高高低低找另一方面，关于超媒体交互的研究发现， 用户在与超媒体系统交互时，有着自己不同的策略倾向(Gray，1990：Hardm",
          'create_time': '2021-11-04T19:05:07+08:00',
          'custom_tags': null,
          'data_source': 'zx.file',
          'dip': null,
          'domain': null,
          'hit_infomation': {
            '标密告警': 1
          },
          'id': '74247e6f7674a8d000559ca48e4700f6090081b2',
          'info_detail': [
            {
              'properties': [
                {
                  'key': '标题',
                  'value': '1817809.pdf'
                },
                {
                  'key': '摘要',
                  'value': ''
                },
                {
                  'key': '信息类型',
                  'value': ''
                }
              ],
              'title': '信息属性'
            },
            {
              'properties': [
                {
                  'key': '发布者',
                  'value': ''
                },
                {
                  'key': '接收者',
                  'value': ''
                },
                {
                  'key': '发布者ID',
                  'value': ''
                },
                {
                  'key': '所属地域',
                  'value': ''
                }
              ],
              'title': '人员属性'
            },
            {
              'properties': [
                {
                  'key': '渠道类型',
                  'value': '传输'
                },
                {
                  'key': '渠道名称',
                  'value': '专项数据'
                },
                {
                  'key': '来源',
                  'value': 'zx.file'
                }
              ],
              'title': '渠道属性'
            },
            {
              'properties': [
                {
                  'key': '发布时间',
                  'value': '2021-11-04 19:05:07'
                },
                {
                  'key': '采集时间',
                  'value': '2021-11-04T19:05:07+08:00'
                },
                {
                  'key': '分析时间',
                  'value': '2021-12-10T11:25:58.212478+08:00'
                },
                {
                  'key': '风险判定时间',
                  'value': '2021-12-10T11:25:58.212478+08:00'
                }
              ],
              'title': '系统属性'
            }
          ],
          'ip': '49.172.148.206',
          'judge_info': {
            'judge_basic_tag': 'tag1',
            'judge_person': 'root',
            'judge_result': '敏感',
            'judge_time': '2021-12-10T11:25:58.212478+08:00',
            'judge_type': '人工研判'
          },
          'md5': '6afed018960629b6ef6d31caf299f1f1',
          'media_url': 'http://192.168.124.224:9000/kikyo-mail-files/f29eca757baac9f85747de74bdeb3f27aa6bcfe4.pdf',
          'publish_time': '2021-11-04 19:05:07',
          'receiver': null,
          'rule_content': '(总书记|习近平|李克强|总理)&(中央经济工作会)&(讲话)',
          'rule_group': '规则组1',
          'rule_id': 17,
          'sender': null,
          'sip': null,
          'snapshot': 'http://192.168.124.224:9000/kikyo-files/zx-msg-file/f29eca757baac9f85747de74bdeb3f27aa6bcfe4.pdf_0.png',
          'source': 'exkuls29bp',
          'source_id': '2607984225',
          'subscription': {
            'subscription_person': 'root',
            'subscription_status': 1,
            'subscription_time': '2022-06-09T16:11:32.796645+08:00'
          },
          'tag': [
            '网上购物',
            '网上商店',
            '信息活动',
            '网上零售业',
            '网上商店界面'
          ],
          'target_id': '2065461',
          'task_id': 126,
          'title': '1817809.pdf',
          'type': '5',
          'update_time': '2021-12-10T11:25:58.212478+08:00',
          'url': 'http://192.168.124.224:9000/kikyo-files/zx-msg-file/f29eca757baac9f85747de74bdeb3f27aa6bcfe4.pdf',
          'website_name': null
        },
        {
          '_kikyo': {
            'create_time': '2021-11-03T04:38:35+08:00',
            'data_source': 'zx.file',
            'domain': '科学院科技工作',
            'id': '001a5e45e08c16d1e446d4facca1ade8fd14320f',
            'keywords': [
              'spondylitis',
              'Rheumatol',
              'ankylosing',
              'American',
              '中华实用诊断',
              '治疗杂志',
              '强直性脊柱炎',
              'Ankylosing',
              'criteria',
              'College',
              'Rheumatology',
              'Spondylitis',
              'Association',
              'Spondyloarthritis',
              'Treatment',
              'Arthritis',
              'Knee',
              'Total',
              '强直性脊柱炎诊断',
              '炎性腰背痛',
              '中国实用医刊',
              '全科医学',
              '风湿病学',
              'BROWN',
              '研究进展',
              'Hip',
              'X线'
            ],
            'themes': [],
            'update_time': '2021-12-10T11:25:54.007046+08:00'
          },
          '_meta': null,
          'abstract': null,
          'alarm_producer': [
            '内容泄密检测引擎'
          ],
          'alarm_time': '2021-12-10T11:25:54.007046+08:00',
          'alarm_type': '标密告警',
          'attachment': [
            'http://192.168.124.224:9000/kikyo-files/zx-msg-file/d4a28e6a8daecf3a9840854c52d1c1bc67ba06b4.pdf'
          ],
          'attachment_name': [
            '1812268.pdf'
          ],
          'attachment_preview': [
            'http://kkfileview.app.kdsec.org/onlinePreview?url=aHR0cDovLzE5Mi4xNjguMTI0LjIyNDo5MDAwL2tpa3lvLWZpbGVzL3p4LW1zZy1maWxlL2Q0YTI4ZTZhOGRhZWNmM2E5ODQwODU0YzUyZDFjMWJjNjdiYTA2YjQucGRm'
          ],
          'attributes': [
            {
              'key': '微信ID',
              'value': '2095216606'
            },
            {
              'key': '微信号',
              'value': 'gztepu4dtz'
            },
            {
              'key': '群号',
              'value': '9170994'
            },
            {
              'key': '发送时间',
              'value': '2021-11-03 04:38:35'
            },
            {
              'key': '发布IP',
              'value': '27.216.131.172'
            }
          ],
          'content': ' 强直性脊柱炎诊断及治疗新进展杜琳郑州大学人民医院河南省人民医院脊柱脊髓外科，郑州 450003 摘要：强直性脊柱炎主要累及中轴骨骼，引起典型的炎性腰背痛，进而造成结构性和功能性损伤，降低患者生活质量。强直性脊柱炎早期无特异表现，易漏诊，延误治疗。早期诊断及治疗有助于改善强直性脊柱炎患者预后。本文就强直性脊柱炎流行病学、临床表现、诊断及治疗方法的研究进展作一综述。 关键词：强直性脊柱炎；炎性腰背痛；肿瘤坏死因子抑制剂 New progress in the diagnosis and treatment of ankylosing spondylitis DU Lin 10.13507/j.issn.1674-3474.2019.07.001 基金项目：河南省科技攻关项目(162102310018)；河南省医学科技攻关计划省部共建项目(SBGJ2018076)；河南省卫生计生科技创新型人才 “51282”工程项目。 @@[1] 王凤娟，周裕晓.强直性脊柱炎的X线及CT影像学诊断[J].中国实用医刊，2014，41(17):26-27. @@[2] REVEILLE J D, BROWN M A. Epidemiology of ankylosing spondylitis: IGAS 2009[J]. J Rheumatol, 2010,37 (12) : 2624- 2625. @@[3] 中华医学会风湿病学分会.强直性脊柱炎诊断及治疗指南[J]. 中华风湿病学杂志，2010，14(8):557-559. @@[4]郭翔，罗锐，张伟.强直性脊柱炎X线表现分析[J].中华实用诊断与治疗杂志，2013，27(2):164-165. @@[5]张缪佳.强直性脊柱炎的诊断与治疗[J].中华全科医学，2015， 13(12):1910-1911. @@[6] RANGANATHAN V, GRACEY E, BROWN M A. Pathogenesis of ankylosing spondylitis: recent advances and future directions[J]. Nat Rev Rheumatol,2017,13(6):359-367. @@[7]朱振军，程田，李碧波，等.人类白细胞抗原-B27与强直性脊柱炎的相关性分析[J].中国实用医刊，2010，37(17):10-11. @@[8]张帆，刘健，端淑杰.Th1/Th2平衡漂移及与强直性脊柱炎关系的研究进展[J].风湿病与关节炎，2016，5(11):66-68. @@[9]孙冬梅.MRI诊断强直性脊柱炎骶髂关节病变价值[J].中华实用诊断与治疗杂志，2016,30(6)：609-610. @@[10]杨晓松.强直性脊柱炎诊疗进展[J].中国全科医学，2017，20 (3):228 -231. @@[11] MONTILLA C, DIAZ-ALVAREZ A, CALERO-PANIAGUA I. Ankylosing spondylitis without axial progression: analysis of associated factors[J]. J Rheumatol,2014,41(12) :2409-2412. @@[12] AMOR B, DOUGADOS M, LISTRAT V, et al. Are classification criteria for spondylarthropathy useful as diagnostic criteria[J]. RevRhumEnglEd,1995,62(1):10-15. @@[13] WARD M M, DEODHAR A, AKL E A, et al. American College of Rheumatology/Spondylitis Association of America/ Spondyloarthritis Research and Treatment Network 2015 Recommendations for the Treatment of Ankylosing Spondylitis and Nonradiographic Axial Spondyloarthritis [J]. Arthritis Rheumatol,2016,68(2) :282-298. @@[14] 李丹慧，汤丽群，陈朝明.强直性脊柱炎的针灸康复治疗进展 [J].针灸临床杂志，2017，33(7):84-87. @@[15] ASLI B, WECHSLER B, LEMAITRE C. Inhibition of tumor necrosis factor alpha and ankylosing spondylitis[J]. N Engl J Med,2003,348(4) :359-361. @@[16] GOODMAN S M, SPRINGER B, GUYATT G. 2017 American College of Rheumatology/American Association of Hip and Knee Surgeons Guideline for the Perioperative Management of Antirheumatic Medication in Patients with Rheumatic Diseases Undergoing Elective Total Hip or Total Knee Arthroplasty[J]. Arthritis Rheumatol, 2017, 69 (8): 1538- 1551. @@[17]张志韧，张宝岑.后路单阶段腰椎椎弓根截骨治疗强直性脊柱炎后凸畸形[ J].中华实用诊断与治疗杂志，2011，25(6):609- 610. 2019-05-15 2019-05-29 ',
          'create_time': '2021-11-03T04:38:35+08:00',
          'custom_tags': null,
          'data_source': 'zx.file',
          'dip': null,
          'domain': '科学院科技工作',
          'hit_infomation': {
            '公文版式告警': 1
          },
          'id': '17828489f377f56909317180b41d21f9c222508f',
          'info_detail': [
            {
              'properties': [
                {
                  'key': '标题',
                  'value': '1812268.pdf'
                },
                {
                  'key': '摘要',
                  'value': ''
                },
                {
                  'key': '信息类型',
                  'value': ''
                }
              ],
              'title': '信息属性'
            },
            {
              'properties': [
                {
                  'key': '发布者',
                  'value': ''
                },
                {
                  'key': '接收者',
                  'value': ''
                },
                {
                  'key': '发布者ID',
                  'value': ''
                },
                {
                  'key': '所属地域',
                  'value': ''
                }
              ],
              'title': '人员属性'
            },
            {
              'properties': [
                {
                  'key': '渠道类型',
                  'value': '传输'
                },
                {
                  'key': '渠道名称',
                  'value': '专项数据'
                },
                {
                  'key': '来源',
                  'value': 'zx.file'
                }
              ],
              'title': '渠道属性'
            },
            {
              'properties': [
                {
                  'key': '发布时间',
                  'value': '2021-11-03 04:38:35'
                },
                {
                  'key': '采集时间',
                  'value': '2021-11-03T04:38:35+08:00'
                },
                {
                  'key': '分析时间',
                  'value': '2021-12-10T11:25:54.007046+08:00'
                },
                {
                  'key': '风险判定时间',
                  'value': '2021-12-10T11:25:54.007046+08:00'
                }
              ],
              'title': '系统属性'
            }
          ],
          'ip': '27.216.131.172',
          'judge_info': {
            'judge_basic_tag': 'tag1',
            'judge_person': 'user2',
            'judge_result': '内部',
            'judge_time': '2021-12-10T11:25:54.007046+08:00',
            'judge_type': '自动研判'
          },
          'md5': '001a5e45e08c16d1e446d4facca1ade8',
          'media_url': 'http://192.168.124.224:9000/kikyo-mail-files/d4a28e6a8daecf3a9840854c52d1c1bc67ba06b4.pdf',
          'publish_time': '2021-11-03 04:38:35',
          'receiver': null,
          'rule_content': '(新疆|援疆工作|维吾尔自治区)&(机场|铁路|水电|资源开发|城市建设|基础设施|矿产)&(发展规划|规划|移民安置)',
          'rule_group': '规则组2',
          'rule_id': 15,
          'sender': null,
          'sip': null,
          'snapshot': 'http://192.168.124.224:9000/kikyo-files/zx-msg-file/d4a28e6a8daecf3a9840854c52d1c1bc67ba06b4.pdf_0.png',
          'source': 'gztepu4dtz',
          'source_id': '2095216606',
          'subscription': {
            'subscription_person': 'root',
            'subscription_status': 1,
            'subscription_time': '2022-06-09T16:11:32.796645+08:00'
          },
          'tag': [
            '科学院科技工作',
            'spondylitis',
            'Rheumatol',
            'ankylosing',
            'American',
            '中华实用诊断'
          ],
          'target_id': '9170994',
          'task_id': 126,
          'title': '1812268.pdf',
          'type': '5',
          'update_time': '2021-12-10T11:25:54.007046+08:00',
          'url': 'http://192.168.124.224:9000/kikyo-files/zx-msg-file/d4a28e6a8daecf3a9840854c52d1c1bc67ba06b4.pdf',
          'website_name': null
        }
      ]
      const checkedIds = this.viewdata.filter(e => e.checked).map(e => e.id)
      this.viewdata.map(e => {
        this.$set(e, 'checked', checkedIds.includes(e.id))
        e.checked = checkedIds.includes(e.id)
        e.isInted = false
        return e
      })
      this.total = this.viewdata.length
      this.handleCheckItem()

      this.loading = false
      this.spinning = false
      return
      // test
    }
  }
}
</script>

<style lang="less" scoped>
::v-deep jmnodes jmnode input{color:#000;}
::v-deep jmnode { box-shadow: none; }
::v-deep jmnodes.theme-info jmnode { background-color: #1890ff; border-color: #1890ff; }
::v-deep jmnodes.theme-info jmnode:hover{ background-color:#9fbcf1; border-color:#9fbcf1; }
::v-deep jmnodes.theme-info jmnode.selected{ background-color:#FEAF12; color:#fff; }
</style>
