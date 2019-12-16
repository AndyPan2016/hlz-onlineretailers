export default class tips {
  constructor() {
    this.isLoading = false;
  }

  static success(title, duration = 1000) {
    setTimeout(() => {
      wx.showToast({
        title: title,
        icon: 'success',
        duration: duration,
        mask: true,
        success: res => {}
      })
    }, 200)
    if (duration > 0) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve()
        }, duration)
      })
    }
  }

  static confirm(text, payload = {}, title = '提示') {
    return new Promise((resolve, reject) => {
      wx.showModal({
        title: title,
        content: text,
        showCancel: true,
        cancelText: '取消', // 取消按钮的文字，默认为取消，最多 4 个字符,
        cancelColor: '#666666', // 取消按钮的文字颜色,
        confirmText: '确定', // 确定按钮的文字，默认为取消，最多 4 个字符,
        confirmColor: '#FC4270', // 确定按钮的文字颜色,
        success: res => {
          if (res.confirm) {
            resolve(payload)
          } else if (res.cancel) {
            reject(payload)
          }
        },
        fail: res => {
          reject(payload)
        }
      });
    });
  }

  static toast(title, onHide, icon = 'success') {
    setTimeout(() => {
      wx.showToast({
        title: title, //提示的内容,
        icon: icon, //图标,
        duration: 500, //延迟时间,
        mask: true //显示透明蒙层，防止触摸穿透
      });
    }, 300);
    if (onHide) {
      setTimeout(() => {
        onHide();
      }, 500)
    }
  }

  static alert(title) {
    wx.showToast({
      title: title, // 提示的内容,
      icon: '../images/alert.png', // 图标,
      duration: 1500, // 延迟时间,
      mask: true // 显示透明蒙层，防止触摸穿透,
    });
  }

  static error(title, onHide) {
    wx.showToast({
      title: title, // 提示的内容,
      icon: 'none', // 图标,
      duration: 1500, // 延迟时间,
      mask: true // 显示透明蒙层，防止触摸穿透
    });
    if (onHide) {
      setTimeout(() => {
        onHide()
      }, 500)
    }
  }

  static msg(title, onHide) {
    wx.showToast({
      title: title, // 提示的内容,
      icon: 'none', // 图标,
      duration: 1500, // 延迟时间,
      mask: true // 显示透明蒙层，防止触摸穿透
    });
    if (onHide) {
      setTimeout(() => {
        onHide()
      }, 500)
    }
  }

  static loading(title = '加载中...') {
    if (tips.isLoading) {
      return;
    }
    tips.isLoading = true
    wx.showLoading({
      title: title, // 提示的内容,
      mask: true // 显示透明蒙层，防止触摸穿透
    });
  }

  static loaded() {
    if (tips.isLoading) {
      tips.isLoading = false
      wx.hideLoading();
    }
  }
}

tips.isLoading = false