/**
 * 弹出框组件-业务逻辑
 * @Author: AndyPan
 * @CreateDate: 2019年4月24日17:18:45
 * @LastUpdateDate: 2019年4月24日17:18:57
 * @Remarks: 备注
 */

import wepy from 'wepy'

export default class PopupComponent extends wepy.component {
  // 接收外部传入的参数
  props = {
    // 弹出框标题
    title: { type: String },
    // title文本位置
    titleTextAlign: { type: String, default: 'left' },
    // title下边框
    titleBorder: { type: String, default: 'none' },
    // 弹出框文本内容
    content: { type: String },
    // 弹出框按钮集合
    buttons: {
      type: Array | Boolean,
      default: [
        { type: 'primary', key: 'sure', text: 'sure' },
        { type: 'warn', key: 'no', text: 'no' },
        { type: 'default', key: 'cancel', text: 'cancel' }
      ]
    },
    // 是否自定义内容容器
    isCustomContent: { type: Boolean, default: false },
    // 自定义class
    class: { type: String },
    // 点击背景遮罩层是否关闭弹出框
    isTapMaskClose: { type: Boolean },
    // 是否显示head
    isShowHead: { type: Boolean, default: true },
    // 是否显示foot
    isShowFoot: { type: Boolean, default: true },
    // 弹出框类型(popup.居中弹出框(默认)，downup.从下往上升起弹出框)
    type: { type: String, default: 'popup' },

    // 弹出框打开事件
    onOpen: { type: Function },
    // 弹出框关闭事件
    onClose: { type: Function },
    // 必须用户点击操作才触发
    onCloseByUser: Function,
    // sure类型按钮点击事件
    onSure: { type: Function },
    // no类型按钮点击事件
    onNo: { type: Function },
    // cancel按钮类型事件
    onCancel: { type: Function },
    // 弹窗类型
    dialogType: {
      type: String,
      default: ''
    }
  }
  // 模板(绑定)数据
  data = {
    // 弹出框状态，用于控制弹出框打开或关闭
    popupStatus: 'close'
  }
  // 用于监听组件之间的通信与交互事件的事件处理函数集合
  events = {}

  methods = {
    /**
     * 弹出框遮罩层点击事件
     * @param {Object} e 事件对象
     */
    maskTap(e) {
      if (this.isTapMaskClose) {
        this.methods.close.call(this, e)
      }
    },
    /**
     * 打开弹出框
     * @param {Function} callBack 打开后的回调
     * @param {Number} timeout 多少毫秒后自动关闭
     */
    open(callBack, timeout) {
      if (typeof callBack === 'number') {
        timeout = callBack
        callBack = null
      }

      this.popupStatus = 'open-before'
      this.$apply()

      let that = this
      setTimeout(() => {
        that.popupStatus = 'open'
        that.$apply()
        // 回调
        if (callBack && typeof callBack === 'function') {
          callBack()
        }
        // 自定义事件
        if (that.onOpen) {
          that.onOpen.call(that.$parent)
        }
        // 触发用户事件
        that.$emit('onOpen')
      }, 30)

      // 定时关闭
      if (timeout && typeof timeout === 'number') {
        setTimeout(() => {
          that.methods.close.call(that)
        }, timeout)
      }
    },
    /**
     * 关闭弹出框
     * @param {Function} callBack 关闭后的回调
     * @param {Number} timeout 延迟多少毫秒后关闭（默认为0）
     */
    close(callBack, timeout) {
      let userTap = false
      if (callBack && callBack.name === 'system') {
        userTap = true
      }
      if (typeof callBack === 'number') {
        timeout = callBack
        callBack = null
      }
      timeout = timeout && typeof timeout === 'number' ? timeout : 0

      let that = this
      setTimeout(() => {
        that.popupStatus = null
        that.$apply()
        // 用户点击操作响应事件
        if (userTap) {
          // 自定义事件
          if (that.onCloseByUser) {
            that.onCloseByUser.call(that.$parent)
          }
          // 触发用户事件
          that.$emit('onCloseByUser')
        }
        // 动画消失后关闭
        setTimeout(() => {
          that.popupStatus = 'close'
          that.$apply()

          // 回调
          if (callBack && typeof callBack === 'function') {
            callBack()
          }
          // 自定义事件
          if (that.onClose) {
            that.onClose.call(that.$parent)
          }
          // 触发用户事件
          that.$emit('onClose')
        }, 310)
      }, timeout)
    },
    /**
     * 按钮点击事件
     * @param {Object} e 事件对象
     */
    buttonTap(e) {
      let dataset = e.target.dataset || {}
      let item = dataset.item
      let key = dataset.key
      let eventResult
      // 1.优先响应item中的fn
      if (item) {
        let itemFn = item.fn
        if (itemFn) {
          eventResult = itemFn.call(this.$parent, dataset)
        }
      }

      // 将key的首字母转为大写
      key = key ? key.replace(key.charAt(0), key.charAt(0).toUpperCase()) : null

      // 2.其次，响应on事件
      if (key) {
        // 通过key获取当前按钮事件
        let thisEvent = this['on' + key]
        if (thisEvent) {
          eventResult = thisEvent.call(this.$parent, dataset)
        }
      }

      // 3.最后，触发用户事件
      this.$emit('on' + key, dataset, function(result) {
        eventResult = result
      })

      if (eventResult != false) {
        this.methods.close.call(this, e)
      }
    }
  }

  onLoad() {
    if (this.type == 'downup') {
      // 不显示底部
      this.isShowFoot = false
      this.$apply()
    }
  }
}
