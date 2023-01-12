<!--
 * @Descripttion:
 * @version:
 * @Author: kdsec
 * @Date: 2021-12-09 10:02:53
 * @LastEditors: kdsec
 * @LastEditTime: 2022-05-04 09:39:27
-->
<template>
  <div class="tinymce">
    <!-- <h1>tinymce</h1> -->
    <editor id="tinymce" v-model="tinymceHtml" :init="init"></editor>
    <div style="margin-top: 10px;">
      <a-button type="primary" @click="saveTinymceHtml">保存</a-button>
    </div>
    <!-- <div v-html="tinymceHtml"></div> -->
  </div>
</template>

<script>
import tinymce from 'tinymce/tinymce'
// import 'tinymce/themes/modern/theme'
import 'tinymce/themes/silver/theme'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/icons/default'
import 'tinymce/plugins/image'
import 'tinymce/plugins/link'
import 'tinymce/plugins/code'
import 'tinymce/plugins/table'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/contextmenu'
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/colorpicker'
import 'tinymce/plugins/textcolor'
export default {
  name: 'Tinymce',
  components: { Editor },
  props: {
    tinymceHtml: {
      type: String,
      default: ''
    },
    tinymceHeight: {
      type: Number,
      default: 752
    }
  },
  data() {
    return {
      init: {
        language_url: 'tinymce/langs/zh_CN.js',
        language: 'zh_CN',
        skin_url: 'tinymce/skins/ui/oxide',
        content_css: 'tinymce/skins/content/default/content.css',
        height: this.tinymceHeight,
        statusbar: true, // 底部的状态栏
        menubar: true, // 最上方的菜单
        branding: false, // 水印“Powered by TinyMCE”
        plugins: 'link lists image code table colorpicker textcolor wordcount contextmenu',
        toolbar:
          'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat',
        file_picker_types: 'file image',
        paste_data_images: true  // 图片是否可粘贴
        // images_upload_handler: (blobInfo, success, failure) => {
        //   console.log('blobInfo: ', blobInfo)
        //   if (blobInfo.blob().size / 1024 / 1024 > 2) {
        //     failure('上传失败，图片大小请控制在 2M 以内')
        //   } else {
        //     const params = new FormData()
        //     params.append('file', blobInfo.blob())
        //     const config = {
        //       headers: {
        //         'Content-Type': 'multipart/form-data'
        //       }
        //     }
        //     this.$axios.post(`/api-upload/uploadimg`, params, config).then(res => {
        //       if (res.data.code === 200) {
        //         success(res.data.msg)  // 上传成功，在成功函数里填入图片路径
        //       } else {
        //         failure('上传失败')
        //       }
        //     }).catch(() => {
        //       failure('上传出错，服务器开小差了呢')
        //     })
        //   }
        // }
      }
    }
  },
  watch: {
    tinymceHtml(tinymce) {
      if (!tinymce) this.tinymceHtml = null
    }
  },
  mounted() {
    tinymce.init({})
  },
  methods: {
    saveTinymceHtml() {
      this.$emit('saveTinymceHtml', this.tinymceHtml)
    }
  }
}
</script>
