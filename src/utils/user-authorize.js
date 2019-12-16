/**
 * 微信用户授权
 * @author AndyPan
 * @createdate 2019年3月31日11:26:52
 * @lastupdatedate 2019年3月31日11:07:03
 * @remark 验证授权登录或判断是否登录等操作
 */

import wepy from 'wepy'
import { STATUS } from '@/configs'
import { Utils } from '@/utils'
// import { AuthorizeService } from '@/services';
import { CommonsService } from '@/services'

export const userAuthorize = {
  /**
   * 通过缓存中是否已经保存了用户信息来判断是否已经登录
   * @returns {Boolean} 是否登录
   */
  isLogin() {
    return wepy.getStorageSync(STATUS.USER_SPECIAL_INFO) || false
  },
  /**
   * 登录操作
   * @param {Object} userInfo 用户信息对象
   * @returns Promise对象
   */
  login(userInfo) {
    return new Promise(async (resolve, reject) => {
      // 获取微信用户信息
      if (userInfo) {
        wepy.setStorageSync(STATUS.USER_INFO, userInfo)
      } else {
        let [userErr, data] = await Utils.promiseTo(wepy.getUserInfo())
        if (userErr) {
          reject(
            new Error(
              '获取用户信息失败, 请在小程序「右上角」-「关于」-「右上角」-「设置」开启权限'
            )
          )
          return
        }
        if (data) {
          userInfo = data.userInfo
          wepy.setStorageSync(STATUS.USER_INFO, userInfo)
          wepy.setStorageSync(STATUS.ENCRYPT_IV, data.iv)
        }
      }
      // 微信登录
      let [loginErr, res] = await Utils.promiseTo(wepy.login())
      if (loginErr) {
        reject(new Error('登录失败'))
        return
      }
      if (res.code) {
        // 获取系统设置, 并保存
        let systemInfo = await wepy.getSystemInfoSync()
        wepy.setStorageSync(STATUS.SYSTEM_INFO, systemInfo)
        CommonsService.shopWechatAuthVerify({
          data: {
            // 小程序登录凭证
            jsCode: res.code,
            // 性别
            gender: userInfo.gender,
            // 用户头像
            avatarUrl: userInfo.avatarUrl,
            // 用户昵称
            nickName: userInfo.nickName
          }
        })
          .then(res => {
            let data = res.data
            // 保存 session_key
            wepy.setStorageSync(STATUS.SESSION_KEY, data.sessionKey)
            // 保存 open_id
            wepy.setStorageSync(STATUS.OPEN_ID, data.openId)
            // 保存登录信息
            wepy.setStorageSync(STATUS.USER_SPECIAL_INFO, data)
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
        // 第三方登录
        // let [rlterr, rlt] = await Utils.promiseTo(CommonsService.shopWechatAuthVerify({
        //     data: {
        //         // 小程序登录凭证
        //         jsCode: res.code,
        //         // 性别
        //         gender: userInfo.gender,
        //         // 用户头像
        //         avatarUrl: userInfo.avatarUrl,
        //         // 用户昵称
        //         nickName: userInfo.nickName
        //     }
        // }))
        // if (rlterr) {
        //     reject(rlterr)
        // }
        // else {
        //     // 保存 session_key
        //     wepy.setStorageSync(STATUS.SESSION_KEY, rlt.sessionKey)
        //     // 保存 open_id
        //     wepy.setStorageSync(STATUS.OPEN_ID, rlt.openId)
        //     // 保存登录信息
        //     wepy.setStorageSync(STATUS.USER_SPECIAL_INFO, rlt)
        //     resolve(rlt)
        // }
      }
    })
  }
}
