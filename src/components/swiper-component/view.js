/**
 * swiper组件-业务逻辑
 * @Author: AndyPan
 * @CreateDate: 2019年4月25日15:39:36
 * @LastUpdateDate: 2019年4月25日15:39:39
 * @Remarks: 备注
*/

import wepy from 'wepy'

export default class TemplateComponent extends wepy.component {
  // 接收外部传入的参数
  props = {
    // 自定义class
    class: { type: String },
    // swiper数据集合
    dataset: { type: Array, default: [] },
    // 宽度
    width: { type: String },
    // 高度
    height: { type: String },
    // 自动播放
    autoplay: { type: Boolean, default: true },
    // 是否显示面板指示点
    'indicator-dots': { type: Boolean, default: false }
  }
  // 模板(绑定)数据
  data = {
    // true/false变量
    boolTrue: true,
    boolFalse: false,
    // 样式字符串
    styleString: null,
    // 总数
    idxAll: 1,
    // 当前
    idx: 1,
    // 图片链接地址
    picAll: [],
    thisWebView: null
  }
  // 用于监听组件之间的通信与交互事件的事件处理函数集合
  events = {}

  watch = {
    dataset (newValue, oldValue) {
      this.idxAll = (this.dataset || []).length
      for (let item of this.dataset) {
        this.picAll.push(item.picture || item.imgSrc)
      }
      this.$apply()
    }
  }

  methods = {
    swiperItemChange(e) {
      let detail = e.detail
      this.idx = detail.current + 1
      this.$apply()
    },
    tapSwiperItem(e) {
      let dataset = e.currentTarget.dataset || {}
      let link = dataset.link
      let currentImg = dataset.img
      // 图片预览
      wx.previewImage({
        current: currentImg,
        urls: this.picAll
      })
      if (link) {
        this.thisWebView = link
        this.$apply()
      }
    }
  }

  onLoad() {
    let width = this.width
    let height = this.height

    this.styleString = (width ? ('width:' + (width.indexOf('rpx') != -1 || width.indexOf('%') != -1 ? width : width + 'rpx') + ';') : '') +
                        (height ? ('height:' + (height.indexOf('rpx') != -1 || height.indexOf('%') != -1 ? height : height + 'rpx') + ';') : '')

    // 获取总数
    this.idxAll = (this.dataset || []).length
    this.$apply()
  }
}
