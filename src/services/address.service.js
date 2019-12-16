/*
 * @Description:收货地址相关服务
 * @Author: huyanhai
 * @since: 2019-05-21 16:29:29
 * @lastTime: 2019-07-04 18:28:55
 */
import { BaseService } from '@/services/base.service'

let serviceArys = [
  { service: 'addressDelete', remark: '删除地址' },
  { service: 'addressQuery', remark: '查询收货地址' },
  { service: 'addressQueryIsDefault', remark: '查询默认收货地址' },
  { service: 'addressUpdate', remark: '添加/修改 收货地址' },
  { service: 'orderConsigneeInfoList', remark: '分页查询订单收货人' },
  { service: 'orderDistributeList', remark: '查询单地址订单物流详细信息' },
  {
    service: 'invitationGiftConsigneeListQueryByIds',
    remark: '伴手礼领取记录查询'
  }
]

export const addressService = BaseService.structureService(serviceArys)
