/*
 * @Description:
 * @Author: huyanhai
 * @since: 2019-08-12 15:41:37
 * @lastTime: 2019-09-05 09:44:30
 * @如果有bug，那肯定不是我的锅
 */
/**
 * 选项卡组件-业务逻辑
 * @Author: AndyPan
 * @CreateDate: 2019年4月23日17:06:48
 * @LastUpdateDate: 2019年4月23日17:06:51
 * @Remarks: 备注
 */

import wepy from 'wepy'
import { Utils } from '@/utils'

export default class TabComponent extends wepy.component {
  // 接收外部传入的参数
  props = {
    // 滚动容器ID（用于获取是否有滚动条）
    scrollerId: { type: String },
    // 选项卡选项
    items: { type: Array },
    // 选项卡类型（auto: 自动(默认，超出可滚动), fixed: 固定(整体宽度100%), static: 静态(固定最大宽度)）
    type: { type: String, default: 'auto' },
    // 模型（default、min、max、simple）
    models: { type: String, default: 'default' },
    // 自定义class
    class: { type: String },
    // 是否充满父级容器
    isFull: { type: Boolean },
    // 是否显示头部阴影
    isHeadShadow: { type: Boolean, default: true },
    // 指定选项卡切换索引
    switchIndex: { type: Number | String, default: 0 },
    // 自定义切换事件
    onSwitch: { type: Function },
    // 自定义滚动到底部事件
    onScrollLower: { type: Function },
    // 自定义滚动到顶部事件
    onScrollUpper: Function,
    // 是否隐藏切换栏
    isHideSwitch: { type: Boolean, default: true },
    // 当前距顶部距离
    scrollTop: { type: Number | String, default: 0 },
    // 是否显示返回顶部
    isShowGoTop: { type: Boolean, default: false },
    // 选中栏目长下划线
    isLongLine: { type: Boolean, default: false },
    // 页面滑动，固定顶部
    isFixedTop: { type: Boolean, default: false },
    modelXHeight: { type: Number, default: null },
    bgOption: { type: Boolean, default: false }
  }
  // 模板(绑定)数据
  data = {
    // temp: '<div class="test" style="border: 1px solid red;"><img src="https://www.baidu.com/img/baidu_jgylogo3.gif" /></div>',
    // 初始化设置选项卡头部宽度
    tabHdWidth: null,
    // 选项卡当前内容
    tabCurrentContent: '',
    // 当前选项卡
    currentTabItem: null,
    scrollTopValue: 0,
    windowHeight: 0,
    scrollTopBar: false,
    scrollThread: null,
    // 排序顺序
    sort: ['asc', 'desc']
  }
  // 用于监听组件之间的通信与交互事件的事件处理函数集合
  events = {}

  /**
   * 渲染视图，初始化视图操作
   */
  renderView() {
    let that = this
    if (this.type == 'auto' || this.type == 'static') {
      let query = wx.createSelectorQuery()
      query
        .select('#j-hd-wrap')
        .boundingClientRect(res => {
          that.tabHdWidth = (res.width + 50) * 2
          that.$apply()
        })
        .exec()
    }
    let propsItems = that.items,
      status
    if (!propsItems) {
      return
    }
    Utils.forEach(propsItems, (item, idx) => {
      if (item.active) {
        status = true
        that.tabCurrentContent = item.content || ''
        that.currentTabItem = item

        if (this.onSwitch) {
          this.onSwitch.call(this.$parent, item, idx)
        }
        // 触发用户事件
        this.$emit('tabSwitch', item, idx)
        return 'break'
      }
    })
    if (!status) {
      let defaultSwitchItem = propsItems[this.switchIndex || 0]
      if (defaultSwitchItem) {
        defaultSwitchItem.active = 'active'
        that.tabCurrentContent = defaultSwitchItem.content || ''
        that.currentTabItem = defaultSwitchItem

        if (this.onSwitch) {
          this.onSwitch.call(this.$parent, defaultSwitchItem, 0)
        }
        // 触发用户事件
        this.$emit('tabSwitch', defaultSwitchItem, 0)
      }
    }
    this.$apply()
  }

  methods = {
    /**
     * 滚动到底部
     * @param {Object} e 事件对象
     */
    lower(e) {
      if (this.onScrollLower) {
        this.onScrollLower.call(this.$parent, e)
      }
      // 触发用户事件
      this.$emit('onScrollLower')
    },
    /**
     * 滚动到顶部
     * @param {Object} e 事件对象
     */
    upper(e) {
      if (this.onScrollUpper) {
        this.onScrollUpper.call(this.$parent, e)
      }
      // 触发用户事件
      this.$emit('onScrollUpper')
    },
    /**
     * 滚动事件
     * @param {*} e
     */
    scroll(e) {
      if (this.scrollThread) {
        clearTimeout(this.scrollThread)
        this.scrollThread = null
      }
      this.scrollTopValue = e.detail.scrollTop
      let that = this
      this.scrollThread = setTimeout(() => {
        if (that.isShowGoTop && that.scrollTopValue >= that.windowHeight) {
          that.scrollTopBar = true
        } else {
          that.scrollTopBar = false
        }
        that.$apply()
      }, 10)
    },
    /**
     * 选项卡切换事件
     * @param {Object} e 事件对象
     */
    tabSwitch(e) {
      let dataset = e.target.dataset || {}
      let dataItem = dataset.item
      let dataIdx = parseInt(dataset.index || 0)
      let that = this
      if (dataItem) {
        if (
          that.models !== 'simple' &&
          that.currentTabItem &&
          (dataItem.key != undefined
            ? dataItem.key == that.currentTabItem.key
            : dataItem.title == that.currentTabItem.title)
        ) {
          return false
        }
        // 保存当前选项卡数据对象
        that.currentTabItem = dataItem

        let propsItems = this.items
        Utils.forEach(propsItems, (item, idx) => {
          if (item.key != undefined) {
            if (item.key == dataItem.key) {
              // 设置当前选择和内容
              item.active = 'active'
              // 记录点击次数
              item.activeCount =
                item.activeCount !== undefined
                  ? parseInt(item.activeCount) + 1
                  : 0
              // 如果有排序功能，设置当前排序类型
              if (item.sort) {
                let dataSort = that.sort
                let thisSortIdx = 0
                if (item.activeCount === 0) {
                  Utils.forEach(dataSort, (sitem, sidx) => {
                    if (sitem === item.sort) {
                      thisSortIdx = sidx
                      return 'break'
                    }
                  })
                  item.activeCount = thisSortIdx
                }
                if (item.activeCount > dataSort.length - 1) {
                  item.activeCount = 0
                }
                item.sort = that.sort[item.activeCount]
              }
              that.tabCurrentContent = dataItem.content
              dataItem = item
            } else {
              item.active = ''
            }
          } else {
            if (item.title == dataItem.title) {
              // 设置当前选择和内容
              item.active = 'active'
              // 记录点击次数
              item.activeCount =
                item.activeCount !== undefined
                  ? parseInt(item.activeCount) + 1
                  : 0
              // 如果有排序功能，设置当前排序类型
              if (item.sort) {
                let dataSort = that.sort
                let thisSortIdx = 0
                if (item.activeCount === 0) {
                  Utils.forEach(dataSort, (sitem, sidx) => {
                    if (sitem === item.sort) {
                      thisSortIdx = sidx
                      return 'break'
                    }
                  })
                  item.activeCount = thisSortIdx
                }
                if (item.activeCount > dataSort.length - 1) {
                  item.activeCount = 0
                }
                item.sort = that.sort[item.activeCount]
              }
              that.tabCurrentContent = dataItem.content
              dataItem = item
            } else {
              item.active = ''
            }
          }
        })
        this.$apply()
      }
      if (this.onSwitch) {
        this.onSwitch.call(this.$parent, dataItem, dataIdx, e)
      }
      // 触发用户事件
      this.$emit('tabSwitch', dataItem, dataIdx)
    },
    /**
     * 返回顶部
     */
    goTop() {
      this.scrollTop = this.scrollTopValue
      let that = this
      setTimeout(() => {
        that.scrollTop = 0
        that.scrollTopBar = false
        that.$apply()
      }, 100)
    }
  }

  onLoad() {
    if (this.items) {
      this.renderView()
    }

    let that = this
    wx.getSystemInfo({
      success: res => {
        that.windowHeight = res.windowHeight
      }
    })

    // let that = this
    // setTimeout(() => {
    //   that.scrollTop = 100
    //   that.$apply()
    // }, 3000)
  }
}
