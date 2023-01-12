/*
 * @Descripttion:
 * @version:
 * @Author: kdsec
 * @Date: 2022-06-06 16:23:57
 * @LastEditors: kdsec
 * @LastEditTime: 2022-06-08 14:47:51
 */
import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'
import { message } from 'ant-design-vue'

export function export_pdf(title = '报告', dom, options) {
  return new Promise((resolve, reject) => {
    const canvasdom = document.createElement('canvas') // 创建一个canvas节点
    canvasdom.width = options?.width ?? dom.scrollWidth // 定义canvas 宽度 * 缩放
    canvasdom.height = options?.height ?? dom.clientHeight // 定义canvas高度 *缩放
    canvasdom.style.width = (options?.width ?? dom.scrollWidth) + 'px'
    canvasdom.style.height = (options?.height ?? dom.clientHeight) + 'px'
    dom.style.backgroundColor = '#fff'
    canvasdom.getContext('2d').scale(1, 1) // 获取context,设置scale
    // 解决透明背景转图片后变成黑色
    canvasdom.getContext('2d').fillStyle = '#fff'
    canvasdom.getContext('2d').fillRect(0, 0, canvasdom.width, canvasdom.height)

    html2Canvas(dom, Object.assign({
      allowTaint: false,
      taintTest: false,
      logging: false,
      scrollY: 0,
      scrollX: 0,
      useCORS: true,
      dpi: 192, // window.devicePixelRatio * 4, // 将分辨率提高到特定的DPI 提高四倍
      scale: 1, // 按比例增加分辨率
      canvas: canvasdom,
      background: '#FFF'
    }, options)).then((canvas) => {
      console.log('canvas: ', canvas)
      var pdf = new JsPDF('p', 'mm', 'a4')    // A4纸，纵向
      var ctx = canvas.getContext('2d')
      var a4w = 190; var a4h = 277    // A4大小，210mm x 297mm，四边各保留10mm的边距，显示区域190x277
      var imgHeight = Math.floor(a4h * canvas.width / a4w)    // 按A4显示比例换算一页图像的像素高度
      var renderedHeight = 0

      while (renderedHeight < canvas.height) {
        var page = document.createElement('canvas')
        page.width = canvas.width
        page.height = Math.min(imgHeight, canvas.height - renderedHeight)// 可能内容不足一页

        // 用getImageData剪裁指定区域，并画到前面创建的canvas对象中
        page.getContext('2d').putImageData(ctx.getImageData(0, renderedHeight, canvas.width, Math.min(imgHeight, canvas.height - renderedHeight)), 0, 0)
        pdf.addImage(page.toDataURL('image/jpeg', 1.0), 'JPEG', 10, 10, a4w, Math.min(a4h, a4w * page.height / page.width))    // 添加图像到页面，保留10mm边距

        renderedHeight += imgHeight
        if (renderedHeight < canvas.height) {
          pdf.addPage()// 如果后面还有内容，添加一个空页
        }
      }
      // 保存文件
      pdf.save(title + '.pdf')
      message.success('导出成功')
      resolve()
    }).catch(() => {
      message.error('导出失败')
      reject()
    })
  })
}
