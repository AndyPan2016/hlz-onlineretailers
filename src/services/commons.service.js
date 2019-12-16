/*
 * @Description:首页接口服务
 * @Author: huyanhai
 * @since: 2019-08-12 16:14:38
 * @lastTime: 2019-08-13 18:06:24
 */
import { BaseService } from './base.service'

let serviceArys = [
  { service: 'hotelBanquetReserve', remark: '预约酒店' },
  { service: 'shopWechatAuthVerify', remark: '登录凭证校验(小程序)' },
  { service: 'memberInfo', remark: '用户信息' },
  { service: 'hotelBanquetInfo', remark: '酒店宴会信息' },
  // 接口名：hotelBanquetBinding    变更为  activityBinding (2019年6月10日15:01:37)
  // {service: 'hotelBanquetBinding', remark: '酒店宴会绑定'},
  { service: 'activityBinding', remark: '酒店宴会绑定' },
  { service: 'activityGameList', remark: '活动列表' },
  { service: 'activityGameControl', remark: '活动控制' },
  { service: 'hotelBanquetHallRoute', remark: '酒店宴会厅活动' },
  { service: 'shopWechatBindingMobile', remark: '绑定手机号' },
  { service: 'activityInfo', remark: '活动信息' },
  { service: 'hotelTrackAdd', remark: '酒店足迹' },
  { service: 'memberQuery', remark: '用户信息查询' }
]

export const commonsService = BaseService.structureService(serviceArys)
