/*
 * @Description:
 * @Author: huyanhai
 * @since: 2019-07-25 11:46:51
 * @lastTime: 2019-09-23 10:21:08
 * @如果有bug，那肯定不是我的锅
 */
/**
 * 商品详情接口服务
 * @author AndyPan
 * @createdate 2019年5月20日14:44:53
 * @lastupdatedate 2019年5月20日15:21:19
 * @remark
 */

import { BaseService } from '@/services/base.service'

let serviceArys = [
  { service: 'goodsInfoQuery', remark: '查询商品详情' },
  { service: 'goodsParamQuery', remark: '查询商品参数详情' },
  { service: 'goodsSpecQuery', remark: '查询商品规格详情' },
  { service: 'goodsActivityQuery', remark: '活动列表' },
  { service: 'articleQuery', remark: 'cms查询' },
  { service: 'goodsDiscountQuery', remark: '查询商品折扣信息' },
  { service: 'activityCalculate', remark: '计算满减金额' },
  { service: 'productInfoQuery', remark: '查询货物详情' },
  { service: 'userGoodsHistoryPageQuery', remark: '查询用户浏览记录' },
  { service: 'shopInvitationGiftQuery', remark: '伴手礼领取记录查询' },
  { service: 'orderConfirm', remark: '确认订单信息' }
]

export const goodsDetailService = BaseService.structureService(serviceArys)
